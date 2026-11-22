import Icon from './Icon.jsx'
import type { Note } from '../types/note'

interface NoteCardProps {
  note: Note
}

function NoteCard({ note }: NoteCardProps) {
  return (
    <article className={`note-card note-card-${note.color}`}>
      <div className="note-card-topline">
        <span className="note-category">{note.category}</span>
        <div className="note-card-actions">
          {note.favorite && (
            <span aria-label="Favorite note" className="favorite-indicator">
              <Icon name="favorite" />
            </span>
          )}
          <button
            aria-label={`More options for ${note.title}`}
            className="icon-button note-menu-button"
            type="button"
          >
            <Icon name="dots" />
          </button>
        </div>
      </div>
      <h3>{note.title}</h3>
      <p className="note-preview">{note.content}</p>
      <div className="note-card-footer">
        <span className="note-document-icon">
          <Icon name="note" />
        </span>
        <span>Updated {note.updated}</span>
      </div>
    </article>
  )
}

export default NoteCard
