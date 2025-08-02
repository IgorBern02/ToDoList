export type InputProps = {
  type: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
  className?: string;
};

export type AddTaskInputProps = {
  taskValue: string;
  onTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateValue: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  errorMessage: string;
};
