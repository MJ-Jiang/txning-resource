import { useEffect, useId, useMemo, useRef, useState } from 'react'

export default function ThemeSelect({
  label,
  value,
  onChange,
  options,
  placeholder = '请选择',
  width = '100%',
  disabled = false,
}) {
  const id = useId()
  const rootRef = useRef(null)
  const listRef = useRef(null)

  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() => {
    const idx = options.findIndex((o) => o.value === value)
    return idx >= 0 ? idx : 0
  })

  const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  )

  // click outside to close
  useEffect(() => {
    const onDocDown = (e) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocDown)
    return () => document.removeEventListener('mousedown', onDocDown)
  }, [])

  // keep activeIndex synced
  useEffect(() => {
    const idx = options.findIndex((o) => o.value === value)
    if (idx >= 0) setActiveIndex(idx)
  }, [value, options])

  // scroll active into view when open
  useEffect(() => {
    if (!open) return
    const el = listRef.current?.querySelector(`[data-idx="${activeIndex}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [open, activeIndex])

  const commit = (idx) => {
    const opt = options[idx]
    if (!opt) return
    onChange?.(opt.value)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (disabled) return

    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }

    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, options.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      commit(activeIndex)
      return
    }
  }

  return (
    <div
      className="ts"
      ref={rootRef}
      style={{ width }}
      data-disabled={disabled ? '1' : '0'}
    >
      {label ? (
        <label className="ts-label" htmlFor={`ts-btn-${id}`}>
          {label}
        </label>
      ) : null}

      <button
        id={`ts-btn-${id}`}
        type="button"
        className="ts-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`ts-list-${id}`}
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
      >
        <span className="ts-value">{selected?.label ?? placeholder}</span>
        <span className="ts-caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div className="ts-pop" role="presentation">
          <ul
            id={`ts-list-${id}`}
            ref={listRef}
            className="ts-list"
            role="listbox"
            tabIndex={-1}
            aria-label={label || 'select'}
            onKeyDown={onKeyDown}
          >
            {options.map((opt, idx) => {
              const isSel = opt.value === value
              const isAct = idx === activeIndex
              return (
                <li
                  key={String(opt.value)}
                  role="option"
                  aria-selected={isSel}
                  className={`ts-opt${isSel ? ' is-sel' : ''}${isAct ? ' is-act' : ''}`}
                  data-idx={idx}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(e) => e.preventDefault()} // prevent focus loss before click
                  onClick={() => commit(idx)}
                >
                  <span>{opt.label}</span>
                  {isSel ? (
                    <span className="ts-check" aria-hidden="true">
                      ✓
                    </span>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
