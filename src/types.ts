export interface Task {
  id: string;
  title: string;
  done: boolean;
}

export type FilterType = "all" | "pending" | "done";
