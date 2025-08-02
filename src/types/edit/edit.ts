export type EditModalProps = {
  taskId: string | null;
  task: string;
  date: string;
  onTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSave: () => void;
  className?: string;
};
