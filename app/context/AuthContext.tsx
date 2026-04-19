"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { createClient } from "@/app/lib/supabase/client";
import type { Profile, UserRole } from "@/app/lib/supabase/types";

export interface AppUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  areas?: string[];
  specialty?: string;
}

interface AuthContextValue {
  user: AppUser | null;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Singleton client — stable across renders
const supabase = createClient();

function toAppUser(profile: Profile, email: string): AppUser {
  return {
    id: profile.id,
    role: profile.role,
    name: profile.name,
    email,
    phone: profile.phone ?? "",
    areas: profile.areas ?? undefined,
    specialty: profile.specialty ?? undefined,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Guard against setting state after unmount
  const mounted = useRef(true);

  async function resolveUser(authUser: { id: string; email?: string }) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();

    if (!mounted.current) return;
    if (profile) {
      setUser(toAppUser(profile as Profile, authUser.email ?? ""));
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    mounted.current = true;

    // 1. Check existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted.current) return;
      if (session?.user) {
        resolveUser(session.user).finally(() => {
          if (mounted.current) setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    // 2. React to auth state changes (sign in, sign out, token refresh, email confirm)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted.current) return;
        if (session?.user) {
          resolveUser(session.user);
        } else {
          setUser(null);
        }
        // Stop loading spinner once we get any auth event
        setIsLoading(false);
      }
    );

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
