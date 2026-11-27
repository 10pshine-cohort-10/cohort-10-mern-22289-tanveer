import Icon from './Icon.jsx'

function DashboardHeader({ onNewNote, onSearchChange, searchQuery }) {
  return (
    <header className="dashboard-header">
      <div className="welcome-copy">
        <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
        <h1>Welcome back, Tanveer <span aria-hidden="true">✦</span></h1>
        <p className="welcome-subtitle">
          A calm place to collect your thoughts and keep moving forward.
        </p>
      </div>

      <div className="header-actions">
        <label className="search-field">
          <Icon name="search" />
          <input
            aria-label="Search notes"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search your notes..."
            type="search"
            value={searchQuery}
          />
          <kbd>⌘ K</kbd>
        </label>
        <button
          className="new-note-button"
          onClick={(event) => onNewNote(event)}
          type="button"
        >
          <Icon name="plus" />
          <span>New Note</span>
        </button>
      </div>
    </header>
  )
}

export default DashboardHeader
