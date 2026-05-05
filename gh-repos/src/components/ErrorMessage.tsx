interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-container">
      <div className="error-frame">
        <span className="error-tag">[ERR]</span>
        <div className="error-body">
          <h3>// connection.failed</h3>
          <p>{message}</p>
          <p className="error-hint">▸ verify handle &amp; retry</p>
        </div>
      </div>
    </div>
  )
}
