type EditModalProps = {
  taskId: string | null;
  task: string;
  date: string;
  onTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSave: () => void;
};

export const EditModal = ({
  taskId,
  task,
  date,
  onTaskChange,
  onDateChange,
  onClose,
  onSave,
}: EditModalProps) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Editar tarefa</h2>
      <p>ID da tarefa: {taskId}</p>
      <label>
        Tarefa:
        <input type="text" value={task} onChange={onTaskChange} />
      </label>
      <label>
        Data:
        <input type="date" value={date} onChange={onDateChange} />
      </label>
      <div style={{ marginTop: "1rem" }}>
        <button type="button" onClick={onSave}>
          Salvar
        </button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  </div>
);
