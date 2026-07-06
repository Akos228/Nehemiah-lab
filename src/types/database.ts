export type Role = 'DG' | 'COORDINATOR' | 'TEACHER' | 'ACCOUNTANT' | 'SECRETARY';

export interface Profile {
  id: string;
  full_name: string;
  role: Role;
  center_id: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Center {
  id: string;
  name: string;
  location: string;
  created_at: string;
}

export interface Child {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  center_id: string;
  parent_contact: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface Attendance {
  id: string;
  child_id: string;
  date: string;
  check_in: string;
  check_out: string;
  recorded_by: string;
  created_at: string;
}

export interface Evaluation {
  id: string;
  child_id: string;
  teacher_id: string;
  category: string;
  score: string | number;
  comments: string;
  evaluation_date: string;
  created_at: string;
}

export interface Payment {
  id: string;
  child_id: string;
  amount: number;
  payment_date: string;
  proof_url: string;
  status: 'pending' | 'validated' | 'rejected';
  validated_by: string | null;
  created_at: string;
}

export interface Invitation {
  id: string;
  email: string;
  role: Role;
  center_id: string | null;
  token: string;
  expires_at: string;
  status: 'pending' | 'accepted' | 'expired';
  created_by: string;
  created_at: string;
}