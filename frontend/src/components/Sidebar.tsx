import Icon from './Icon.jsx'
import type { NoteSection } from '../types/note'

const navigationItems: {
  label: NoteSection
  icon: string
}[] = [
  { label: 'All Notes', icon: 'note' },
  { label: 'Favorites', icon: 'favorite' },
  { label: 'Recently Deleted', icon: 'trash' },
]

interface SidebarProps {
  activeSection: NoteSection
  isOpen: boolean
  noteCount: number
  onClose: () => void
  onSectionChange: (section: NoteSection) => void
}

function Sidebar({
  activeSection,
  isOpen,
  noteCount,
  onClose,
  onSectionChange,
}: SidebarProps) {
  return (
    <aside className={`sidebar${isOpen ? ' sidebar-open' : ''}`}>
      <div className="sidebar-heading">
        <a aria-label="Marginnote home" className="brand" href="#dashboard">
          <span className="brand-mark">
            <Icon name="note" />
          </span>
          <span>marginnote</span>
        </a>
        <button
          aria-label="Close navigation menu"
          className="icon-button sidebar-close-button"
          onClick={onClose}
          type="button"
        >
          <Icon name="close" />
        </button>
      </div>

      <p className="sidebar-label">WORKSPACE</p>
      <nav aria-label="Main navigation" className="sidebar-navigation">
        {navigationItems.map((item) => (
          <button
            aria-current={activeSection === item.label ? 'page' : undefined}
            className={`nav-item${activeSection === item.label ? ' nav-item-active' : ''}`}
            key={item.label}
            onClick={() => onSectionChange(item.label)}
            type="button"
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.label === 'All Notes' && (
              <span className="nav-count">{noteCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="profile-summary">
          <span className="profile-avatar" aria-hidden="true">
            T
          </span>
          <span className="profile-copy">
            <strong>Tanveer</strong>
            <span>Personal workspace</span>
          </span>
        </div>
        <button className="nav-item logout-button" type="button">
          <Icon name="logout" />
          <span>Log out</span>
        </button>
        <p className="sidebar-footer">A little space for your thoughts.</p>
      </div>
    </aside>
  )
}

export default Sidebar
