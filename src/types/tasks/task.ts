export type Task = {
  id: string;
  task: string;
  date: string;
};

export type TasksProps = {
  filteredTask: Task[];
  remove?: (id: string) => void;
  // put: (id: string) => void;
  openEditModal: (id: string, task: string, date: string) => void;
  openRemoveModal: (id: string, task: string) => void;
};

export type TaskFormProps = {
  handleSubmit: (e: React.FormEvent) => void;
  task: string;
  handleTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  date: string;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string;
  filteredTask: Task[];
  remove?: (id: string) => void;
  // put: (id: string) => void;
  openEditModal: (id: string, task: string, date: string) => void;
  openRemoveModal: (id: string, task: string) => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};
