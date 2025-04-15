import { createPortal } from 'react-dom'
import { Edit, Trash } from 'lucide-react'

export default function Menu({ show, position, theme, onEdit, onDelete, onClose }) {
  if (!show) return null

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div
        className={`fixed z-50 w-36 rounded-lg ${theme?.border || ''} border bg-gray-900/95 backdrop-blur-md shadow-xl overflow-hidden`}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <button
          onClick={() => {
            onEdit()
            onClose()
          }}
          className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors"
        >
          <Edit size={14} />
          <span>Modifier</span>
        </button>
        <button
          onClick={() => {
            onDelete()
            onClose()
          }}
          className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Trash size={14} />
          <span>Supprimer</span>
        </button>
      </div>
    </>,
    document.body
  )
} 