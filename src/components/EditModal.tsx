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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white text-black rounded-xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Editar tarefa</h2>
      <p className="text-sm mb-2">ID da tarefa: {taskId}</p>
      <label className="block mb-2">
        <span className="text-sm font-medium">Tarefa:</span>
        <input
          type="text"
          value={task}
          onChange={onTaskChange}
          className="w-full mt-1 p-2 border rounded-md"
        />
      </label>
      <label className="block mb-4">
        <span className="text-sm font-medium">Data:</span>
        <input
          type="date"
          value={date}
          onChange={onDateChange}
          className="w-full mt-1 p-2 border rounded-md"
        />
      </label>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onSave}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);
