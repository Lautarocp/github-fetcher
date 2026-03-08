interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-container">
      <span className="error-icon">⚠️</span>
      <div>
        <h3>Error</h3>
        <p>{message}</p>
      </div>
    </div>
  )
}
