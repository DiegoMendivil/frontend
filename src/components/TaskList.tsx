import type { Task } from '../models/task.interface';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  emptyMessage: string;
  canDelete: boolean;
  onToggleStatus: (task: Task) => Promise<boolean>;
  onEditTask: (task: Task, title: string) => Promise<boolean>;
  onDeleteTask: (task: Task) => Promise<boolean>;
}

export function TaskList({
  tasks,
  emptyMessage,
  canDelete,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TaskListProps) {
  if (tasks.length === 0) return null;
  const resultLabel = tasks.length === 1 ? '1 tarea' : `${tasks.length} tareas`;

  return (
    <section className="panel" aria-labelledby="task-list-title">
      <div className="section-heading">
        <div>
          <p className="section-heading__eyebrow">Actividades</p>
          <h2 id="task-list-title">Tareas registradas</h2>
        </div>
        <span className="result-count">{resultLabel}</span>
      </div>
      {tasks.length === 0 ? (
        <div className="empty-state" role="status">
          <h3>Sin resultados</h3>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="task-list" role="list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              canDelete={canDelete}
              onToggleStatus={onToggleStatus}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}
