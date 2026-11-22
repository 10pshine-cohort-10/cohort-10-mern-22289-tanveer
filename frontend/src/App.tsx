import { useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import './App.css'
import CreateNoteModal from './components/CreateNoteModal'
import DashboardHeader from './components/DashboardHeader.jsx'
import Icon from './components/Icon.jsx'
import NotesList from './components/NotesList'
import Sidebar from './components/Sidebar'
import type {
  Note,
  NoteCategory,
  NoteColor,
  NoteDetails,
  NoteSection,
} from './types/note'

const initialNotes: Note[] = [
  {
    id: 1,
    title: 'React study plan',
    content:
      'Review hooks, practice lifting state, and build a small reusable component before Friday.',
    updated: 'Today, 10:42 AM',
    category: 'Study',
    color: 'lavender',
    favorite: true,
  },
  {
    id: 2,
    title: 'Portfolio refresh',
    content:
      'Collect screenshots for the case studies and rewrite the intro to focus on product thinking.',
    updated: 'Yesterday',
    category: 'Projects',
    color: 'peach',
    favorite: false,
  },
  {
    id: 3,
    title: 'Team sync — action items',
    content:
      'Share the latest prototype, confirm the launch checklist, and ask Maya about the new timeline.',
    updated: 'Yesterday',
    category: 'Meetings',
    color: 'blue',
    favorite: true,
  },
  {
    id: 4,
    title: 'Weekend errands',
    content:
      'Pick up groceries, return the library books, and make time for a long walk on Saturday.',
    updated: 'Nov 18, 2026',
    category: 'Personal',
    color: 'mint',
    favorite: false,
  },
  {
    id: 5,
    title: 'Ideas for the capstone',
    content:
      'A simple habit tracker could make a useful project: keep the interface calm and the progress visible.',
    updated: 'Nov 16, 2026',
    category: 'Projects',
    color: 'pink',
    favorite: false,
  },
  {
    id: 6,
    title: 'Books to read',
    content:
      'Add a few thoughtful reads on design systems, creative habits, and building better products.',
    updated: 'Nov 14, 2026',
    category: 'Personal',
    color: 'cream',
    favorite: true,
  },
]

const categoryColors: Record<NoteCategory, NoteColor> = {
  Study: 'lavender',
  Projects: 'peach',
  Meetings: 'blue',
  Personal: 'mint',
}

function App() {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [activeSection, setActiveSection] =
    useState<NoteSection>('All Notes')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] =
    useState<boolean>(false)
  const createNoteTriggerRef = useRef<HTMLButtonElement | null>(null)

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    let sectionNotes = notes

    if (activeSection === 'Favorites') {
      sectionNotes = notes.filter((note) => note.favorite)
    } else if (activeSection === 'Recently Deleted') {
      sectionNotes = []
    }

    if (!query) {
      return sectionNotes
    }

    return sectionNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query),
    )
  }, [activeSection, notes, searchQuery])

  function handleSectionChange(section: NoteSection) {
    setActiveSection(section)
    setIsSidebarOpen(false)
  }

  function handleOpenCreateModal(event: MouseEvent<HTMLButtonElement>) {
    createNoteTriggerRef.current = event.currentTarget
    setIsCreateModalOpen(true)
  }

  function closeCreateModal() {
    setIsCreateModalOpen(false)
    window.requestAnimationFrame(() => {
      createNoteTriggerRef.current?.focus()
    })
  }

  function handleCreateNote(noteDetails: NoteDetails) {
    setNotes((currentNotes) => {
      const nextId =
        currentNotes.reduce(
          (highestId, note) => Math.max(highestId, Number(note.id) || 0),
          0,
        ) + 1

      return [
        {
          ...noteDetails,
          id: nextId,
          updated: new Date().toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
          color: categoryColors[noteDetails.category],
        },
        ...currentNotes,
      ]
    })
    closeCreateModal()
  }

  return (
    <div className="app-shell">
      {isSidebarOpen && (
        <button
          aria-label="Close navigation menu"
          className="sidebar-backdrop"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      )}
      <Sidebar
        activeSection={activeSection}
        isOpen={isSidebarOpen}
        noteCount={notes.length}
        onClose={() => setIsSidebarOpen(false)}
        onSectionChange={handleSectionChange}
      />

      <main className="dashboard-main" id="dashboard">
        <div className="mobile-topbar">
          <button
            aria-label="Open navigation menu"
            className="icon-button mobile-menu-button"
            onClick={() => setIsSidebarOpen(true)}
            type="button"
          >
            <Icon name="menu" />
          </button>
          <span className="mobile-brand">marginnote</span>
          <span className="mobile-avatar" aria-hidden="true">
            T
          </span>
        </div>

        <div className="dashboard-content">
          <DashboardHeader
            onNewNote={handleOpenCreateModal}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
          />
          <NotesList
            activeSection={activeSection}
            notes={filteredNotes}
            searchQuery={searchQuery}
          />
        </div>
      </main>
      {isCreateModalOpen && (
        <CreateNoteModal
          onCancel={closeCreateModal}
          onSave={handleCreateNote}
        />
      )}
    </div>
  )
}

export default App
