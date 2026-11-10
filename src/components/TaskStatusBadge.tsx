import type { TaskStatus } from '../models/task.interface';

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const label = status === 'completed' ? 'Completada' : 'Pendiente';

  return <span className="task-status">{label}</span>;
}
