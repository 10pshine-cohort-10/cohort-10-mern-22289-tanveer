import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import Icon from './Icon.jsx'
import type { NoteCategory, NoteDetails } from '../types/note'

const categories: readonly NoteCategory[] = [
  'Study',
  'Projects',
  'Meetings',
  'Personal',
]

interface CreateNoteModalProps {
  onCancel: () => void
  onSave: (noteDetails: NoteDetails) => void
}

interface FormErrors {
  title: string
  content: string
}

function isNoteCategory(value: string): value is NoteCategory {
  return categories.some((category) => category === value)
}

function CreateNoteModal({ onCancel, onSave }: CreateNoteModalProps) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [category, setCategory] = useState<NoteCategory>('Study')
  const [favorite, setFavorite] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormErrors>({
    title: '',
    content: '',
  })
  const modalRef = useRef<HTMLElement | null>(null)
  const titleInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    titleInputRef.current?.focus()

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        onCancel()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const modal = modalRef.current
      if (!modal) {
        return
      }

      const focusableElements = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.hasAttribute('disabled') &&
          element.getAttribute('aria-hidden') !== 'true' &&
          element.tabIndex >= 0,
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        modal.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (
        event.shiftKey &&
        (activeElement === firstElement ||
          !modal.contains(activeElement))
      ) {
        event.preventDefault()
        lastElement.focus()
      } else if (
        !event.shiftKey &&
        (activeElement === lastElement ||
          !modal.contains(activeElement))
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = {
      title: title.trim() ? '' : 'Please enter a note title.',
      content: content.trim() ? '' : 'Please enter note content.',
    }
    setErrors(nextErrors)

    if (nextErrors.title || nextErrors.content) {
      return
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
      category,
      favorite,
    })
  }

  return (
    <div className="modal-backdrop">
      <section
        aria-labelledby="create-note-title"
        aria-modal="true"
        className="create-note-modal"
        ref={modalRef}
        role="dialog"
      >
        <div className="create-note-modal-heading">
          <div>
            <p className="eyebrow">NEW NOTE</p>
            <h2 id="create-note-title">Capture a thought</h2>
            <p className="create-note-subtitle">
              Give your idea a title and a little context.
            </p>
          </div>
          <button
            aria-label="Close create note dialog"
            className="icon-button modal-close-button"
            onClick={onCancel}
            type="button"
          >
            <Icon name="close" />
          </button>
        </div>

        <form className="create-note-form" noValidate onSubmit={handleSubmit}>
          <div className="modal-field">
            <label htmlFor="note-title">Title</label>
            <input
              aria-describedby={errors.title ? 'note-title-error' : undefined}
              aria-invalid={Boolean(errors.title)}
              aria-required="true"
              autoFocus
              id="note-title"
              ref={titleInputRef}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value)
                if (errors.title) {
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    title: '',
                  }))
                }
              }}
              placeholder="Give your note a title"
              type="text"
              value={title}
            />
            {errors.title && (
              <span className="field-error" id="note-title-error" role="alert">
                {errors.title}
              </span>
            )}
          </div>

          <div className="modal-field">
            <label htmlFor="note-content">Content</label>
            <textarea
              aria-describedby={
                errors.content ? 'note-content-error' : undefined
              }
              aria-invalid={Boolean(errors.content)}
              aria-required="true"
              id="note-content"
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                setContent(event.target.value)
                if (errors.content) {
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    content: '',
                  }))
                }
              }}
              placeholder="Write down the details..."
              rows={5}
              value={content}
            />
            {errors.content && (
              <span
                className="field-error"
                id="note-content-error"
                role="alert"
              >
                {errors.content}
              </span>
            )}
          </div>

          <div className="modal-field">
            <label htmlFor="note-category">Category</label>
            <select
              id="note-category"
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                if (isNoteCategory(event.target.value)) {
                  setCategory(event.target.value)
                }
              }}
              value={category}
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <label className="favorite-checkbox">
            <input
              checked={favorite}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFavorite(event.target.checked)
              }
              type="checkbox"
            />
            <span className="favorite-checkbox-mark" aria-hidden="true">
              <Icon name="favorite" />
            </span>
            <span>Mark as favorite</span>
          </label>

          <div className="create-note-actions">
            <button
              className="cancel-note-button"
              onClick={onCancel}
              type="button"
            >
              Cancel
            </button>
            <button className="new-note-button" type="submit">
              <Icon name="plus" />
              <span>Save Note</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default CreateNoteModal
