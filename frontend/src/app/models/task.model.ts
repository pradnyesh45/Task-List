export interface Task {
  id?: number;
  status: string;
  task_time: Date;
  creation_date: string;
  entity_name: string;
  task_type: string;
  contact_person: string;
  note?: string;
}
