type Note = {
  id: string;
  content: string;
};

export type CallType = {
  id: string;
  direction: string;
  from: string;
  to: string;
  duration: number;
  is_archived: boolean;
  call_type: string;
  via: string;
  created_at: string;
  notes: Note[];
};
