export type NoteCategory = 'Study' | 'Projects' | 'Meetings' | 'Personal'

export type NoteSection =
  | 'All Notes'
  | 'Favorites'
  | 'Recently Deleted'

export type NoteColor =
  | 'lavender'
  | 'peach'
  | 'blue'
  | 'mint'
  | 'pink'
  | 'cream'

export interface Note {
  id: number
  title: string
  content: string
  updated: string
  category: NoteCategory
  color: NoteColor
  favorite: boolean
}

export interface NoteDetails {
  title: string
  content: string
  category: NoteCategory
  favorite: boolean
}
