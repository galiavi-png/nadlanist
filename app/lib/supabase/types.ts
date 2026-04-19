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
    };
  };
}
