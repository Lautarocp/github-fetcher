export function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-frames">
        <span className="loading-frame">[░░░░░░░░░░]</span>
      </div>
      <p className="loading-text">▸ querying api.github.com</p>
    </div>
  )
}
