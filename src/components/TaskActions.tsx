interface TaskActionsProps {
  completedCount: number;
  onClearCompleted: () => void;
}

export function TaskActions({ completedCount, onClearCompleted }: TaskActionsProps) {
  return (
    <div className="task-actions">
      <button
        type="button"
        className="button-danger"
        disabled={completedCount === 0}
        onClick={onClearCompleted}
      >
        Eliminar completadas ({completedCount})
      </button>
    </div>
  );
}
