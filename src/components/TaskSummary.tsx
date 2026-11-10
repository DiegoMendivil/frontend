import type { Task } from '../models/task.interface';

interface TaskSummaryProps {
  tasks: Task[];
}

export function TaskSummary({ tasks }: TaskSummaryProps) {
  const completed = tasks.filter(({ status }) => status === 'completed').length;
  const pending = tasks.length - completed;

  return (
    <section className="summary-grid" aria-label="Resumen de tareas">
      <article className="summary-card summary-card--total">
        <span className="summary-card__label">Total de tareas</span>
        <strong>{tasks.length}</strong>
        <span className="summary-card__detail">En tu lista</span>
      </article>
      <article className="summary-card summary-card--pending">
        <span className="summary-card__label">Pendientes</span>
        <strong>{pending}</strong>
        <span className="summary-card__detail">Por completar</span>
      </article>
      <article className="summary-card summary-card--completed">
        <span className="summary-card__label">Completadas</span>
        <strong>{completed}</strong>
        <span className="summary-card__detail">Buen trabajo</span>
      </article>
    </section>
  );
}
