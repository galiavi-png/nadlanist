export type UserRole = "owner" | "agent";

export interface Profile {
  id: string;
  role: UserRole;
  name: string;
  phone: string | null;
  areas: string[] | null;
  specialty: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  agent_id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          role: UserRole;
          name: string;
          phone?: string | null;
          areas?: string[] | null;
          specialty?: string | null;
          created_at?: string;
        };
        Update: Partial<Omit<Profile, "id">>;
      };
      leads: {
        Row: Lead;
        Insert: {
          agent_id: number;
          name: string;
          phone: string;
          email: string;
          message: string;
          created_at?: string;
        };
        Update: Partial<Omit<Lead, "id">>;
      };
    };
  };
}
