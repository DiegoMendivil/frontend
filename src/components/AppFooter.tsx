interface AppFooterProps {
  courseName: string;
}

export function AppFooter({ courseName }: AppFooterProps) {
  return (
    <footer className="app-footer">
      <div className="app-footer__content">
        <p>Administrador de tareas <span aria-hidden="true">·</span> {courseName}</p>
      </div>
    </footer>
  );
}
