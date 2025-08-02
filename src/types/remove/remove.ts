export type RemoveModalProps = {
  taskId: string | null;
  task: string;
  onClose: () => void;
  onRemove: (id: string) => void;
};
