import NoteCard from './NoteCard.jsx'

function NotesList({ activeSection, notes, searchQuery }) {
  const query = searchQuery.trim()
  const sectionTitle = activeSection === 'All Notes' ? 'My Notes' : activeSection
  let sectionDescription = 'Your ideas, plans, and little reminders.'

  if (query) {
    sectionDescription = `Search results for “${query}”`
  } else if (activeSection === 'Favorites') {
    sectionDescription = 'Notes you have marked as favorites.'
  } else if (activeSection === 'Recently Deleted') {
    sectionDescription = 'Notes you delete will appear here.'
  }

  let emptyTitle = 'No notes found'
  let emptyDescription = 'Try a different search term to find what you’re looking for.'

  if (activeSection === 'Recently Deleted') {
    emptyTitle = 'Nothing in Recently Deleted'
    emptyDescription = 'There are no recently deleted notes yet.'
  } else if (activeSection === 'Favorites' && !query) {
    emptyTitle = 'No favorites yet'
    emptyDescription = 'Favorite a note to find it here.'
  } else if (activeSection === 'Favorites') {
    emptyTitle = 'No matching favorites'
    emptyDescription = `No favorite notes match “${query}”. Try a different search term.`
  }

  return (
    <section aria-labelledby="notes-heading" className="notes-section">
      <div className="section-heading">
        <div>
          <div className="section-title-row">
            <h2 id="notes-heading">{sectionTitle}</h2>
            <span className="notes-total">{notes.length}</span>
          </div>
          <p>{sectionDescription}</p>
        </div>
        <button className="sort-button" type="button">
          Recently updated
          <span aria-hidden="true">⌄</span>
        </button>
      </div>

      {notes.length > 0 ? (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state-icon">⌕</span>
          <h3>{emptyTitle}</h3>
          <p>{emptyDescription}</p>
        </div>
      )}
    </section>
  )
}

export default NotesList
