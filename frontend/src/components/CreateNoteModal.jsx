import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

const categories = ['Study', 'Projects', 'Meetings', 'Personal']

function CreateNoteModal({ onCancel, onSave }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Study')
  const [favorite, setFavorite] = useState(false)
  const [errors, setErrors] = useState({ title: '', content: '' })

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  function handleSubmit(event) {
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
              onChange={(event) => {
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
              onChange={(event) => {
                setContent(event.target.value)
                if (errors.content) {
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    content: '',
                  }))
                }
              }}
              placeholder="Write down the details..."
              rows="5"
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
              onChange={(event) => setCategory(event.target.value)}
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
              onChange={(event) => setFavorite(event.target.checked)}
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
