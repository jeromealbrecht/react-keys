"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Trash, Edit, X, MoreVertical } from "lucide-react"
import { motion as Motion } from "framer-motion"

export default function TodoItem({ todo, onDelete, onToggle, onEdit, theme }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [showMenu, setShowMenu] = useState(false)
  const inputRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    setEditText(todo.text)
  }, [todo.text])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSubmit = () => {
    onEdit(todo.id, editText)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    } else if (e.key === "Escape") {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  return (
    <>
      <Motion.div
        className={`group relative rounded-xl ${theme.border} border bg-white/5 backdrop-blur-md transition-all hover:bg-white/10`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {isEditing ? (
          <div className="flex items-center p-3">
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white border-b border-white/20 focus:border-white/50 focus:outline-none py-1 px-2"
              autoFocus
            />
            <div className="flex gap-1 ml-2">
              <button onClick={handleSubmit} className={`p-1.5 rounded-lg ${theme.button} text-white`} aria-label="Save">
                <Check size={16} />
              </button>
              <button
                onClick={() => {
                  setEditText(todo.text)
                  setIsEditing(false)
                }}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                aria-label="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center p-3 gap-3">
            <button
              onClick={() => onToggle(todo.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border ${todo.completed ? theme.accent + " border-transparent" : "border-white/30"} flex items-center justify-center hover:border-white/60 transition-colors`}
              aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {todo.completed && <Check size={14} className="text-white" />}
            </button>

            <span className={`flex-1 min-w-0 truncate ${todo.completed ? "line-through text-white/50" : "text-white"}`}>{todo.text}</span>

            <div className="flex-shrink-0" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 rounded-lg opacity-70 hover:opacity-100 focus:opacity-100 bg-white/0 hover:bg-white/10 text-white/70 hover:text-white transition-all"
                aria-label="More options"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        )}
      </Motion.div>

      {/* Menu flottant */}
      {showMenu && (
        <div
          className={`fixed z-50 rounded-lg ${theme.border} border bg-gray-900/95 backdrop-blur-md shadow-xl overflow-hidden`}
          style={{
            top: menuRef.current?.getBoundingClientRect().bottom + 5 + 'px',
            left: menuRef.current?.getBoundingClientRect().right - 144 + 'px', // 144px = w-36
          }}
        >
          <button
            onClick={() => {
              setIsEditing(true)
              setShowMenu(false)
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors"
          >
            <Edit size={14} />
            <span>Modifier</span>
          </button>
          <button
            onClick={() => {
              onDelete(todo.id)
              setShowMenu(false)
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash size={14} />
            <span>Supprimer</span>
          </button>
        </div>
      )}
    </>
  )
}
