export type UserRole = "owner" | "agent";

export interface StoredUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  // agent-only fields
  areas?: string[];
  specialty?: string;
}

const STORAGE_KEY = "nadlanist_user";

export function saveUser(user: StoredUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function loadUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function clearUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}
