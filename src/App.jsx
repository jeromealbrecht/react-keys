"use client"

import { useState, useEffect } from "react"
import TodoItem from "./components/todoItem"
import ReactExplainModal from "./components/ReactExplainModal"
import { Plus, Sparkles, CheckCircle2, Circle, HelpCircle } from "lucide-react"
import { motion as Motion, AnimatePresence } from "framer-motion"
import "./App.css"

function App() {
  const [todos, setTodos] = useState([])
  const [hasSeenExplanation, setHasSeenExplanation] = useState(() => {
    // Récupérer l'état depuis le localStorage au chargement
    const saved = localStorage.getItem('hasSeenExplanation')
    return saved ? JSON.parse(saved) : false
  })
  const [showExplanation, setShowExplanation] = useState(!hasSeenExplanation)
  const [newTodoText, setNewTodoText] = useState("")
  const [theme, setTheme] = useState("purple")

  // Sauvegarder hasSeenExplanation dans le localStorage quand il change
  useEffect(() => {
    localStorage.setItem('hasSeenExplanation', JSON.stringify(hasSeenExplanation))
  }, [hasSeenExplanation])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  // Theme colors
  const themes = {
    purple: {
      primary: "from-purple-600 to-indigo-700",
      secondary: "from-pink-500 to-purple-600",
      accent: "bg-purple-600",
      button: "bg-purple-600 hover:bg-purple-700",
      ring: "ring-purple-500/30",
      border: "border-purple-500/20",
      text: "text-purple-500",
    },
    teal: {
      primary: "from-teal-600 to-emerald-700",
      secondary: "from-cyan-500 to-teal-600",
      accent: "bg-teal-600",
      button: "bg-teal-600 hover:bg-teal-700",
      ring: "ring-teal-500/30",
      border: "border-teal-500/20",
      text: "text-teal-500",
    },
    rose: {
      primary: "from-rose-600 to-pink-700",
      secondary: "from-orange-500 to-rose-600",
      accent: "bg-rose-600",
      button: "bg-rose-600 hover:bg-rose-700",
      ring: "ring-rose-500/30",
      border: "border-rose-500/20",
      text: "text-rose-500",
    },
  }

  const currentTheme = themes[theme]

  useEffect(() => {
    // Add animation when component mounts
    const interval = setInterval(() => {
      const themeKeys = Object.keys(themes)
      const currentIndex = themeKeys.indexOf(theme)
      const nextIndex = (currentIndex + 1) % themeKeys.length
      setTheme(themeKeys[nextIndex])
    }, 30000) // Change theme every 30 seconds

    return () => clearInterval(interval)
  }, [theme])

  const addTodo = () => {
    if (!newTodoText.trim()) return
    const id = Date.now()
    setTodos((prev) => [...prev, { id, text: newTodoText, completed: false }])
    setNewTodoText("")
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const editTodo = (id, newText) => {
    if (!newText.trim()) return
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)))
  }

  // Filter todos based on completion
  const completedTodos = todos.filter((todo) => todo.completed)
  const incompleteTodos = todos.filter((todo) => !todo.completed)

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-950 to-black text-white flex flex-col items-center p-4 md:p-8 transition-all duration-1000`}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-gradient-to-br ${currentTheme.secondary} blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2 animate-blob`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full bg-gradient-to-br ${currentTheme.primary} blur-3xl opacity-20 translate-x-1/3 translate-y-1/3 animate-blob animation-delay-2000`}
        ></div>
        <div
          className={`absolute top-1/2 right-1/4 w-1/4 h-1/4 rounded-full bg-gradient-to-br ${currentTheme.secondary} blur-3xl opacity-20 animate-blob animation-delay-4000`}
        ></div>
      </div>

      {/* Header */}
      <header className="w-full max-w-3xl flex justify-between items-center mb-8 mt-4 px-2">
        <h1
          className={`title-responsive font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${currentTheme.secondary} transition-all duration-1000 [line-height:2]`}
        >
          ReactKey
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const themeKeys = Object.keys(themes)
              const currentIndex = themeKeys.indexOf(theme)
              const nextIndex = (currentIndex + 1) % themeKeys.length
              setTheme(themeKeys[nextIndex])
            }}
            className={`p-2 rounded-full ${currentTheme.border} bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all`}
            title="Changer le thème"
          >
            <Sparkles size={20} />
          </button>
          <button
            onClick={() => {
              setShowExplanation(true)
              setHasSeenExplanation(true)
            }}
            className={`p-2 rounded-full ${currentTheme.border} bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all`}
            title="Voir l'explication"
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </header>

      {/* Add todo form */}
      <div className="w-full max-w-3xl mb-8">
        <div className={`flex gap-2 p-1 rounded-xl ${currentTheme.ring} ring-2 bg-white/5 backdrop-blur-md`}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Que souhaitez-vous ajouter ?"
            className="flex-1 px-4 py-3 rounded-lg bg-transparent text-white placeholder-white/50 focus:outline-none"
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            onClick={addTodo}
            disabled={!newTodoText.trim()}
            className={`px-4 py-3 rounded-lg ${currentTheme.button} text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>
      </div>

      {/* Todo lists */}
      <div className="w-full max-w-3xl space-y-8">
        {/* Incomplete todos */}
        {incompleteTodos.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 ml-2">
              <Circle size={16} className={currentTheme.text} />
              <h2 className="text-xl font-semibold text-white">À faire</h2>
              <span className={`${currentTheme.accent} text-xs font-medium px-2 py-0.5 rounded-full ml-2`}>
                {incompleteTodos.length}
              </span>
            </div>
            <Motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
              <AnimatePresence>
                {incompleteTodos.map((todo) => (
                  <Motion.li key={todo.id} variants={itemVariants} exit="exit" layout>
                    <TodoItem
                      todo={todo}
                      onDelete={deleteTodo}
                      onToggle={toggleTodo}
                      onEdit={editTodo}
                      theme={currentTheme}
                    />
                  </Motion.li>
                ))}
              </AnimatePresence>
            </Motion.ul>
          </div>
        )}

        {/* Completed todos */}
        {completedTodos.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 ml-2">
              <CheckCircle2 size={16} className={currentTheme.text} />
              <h2 className="text-xl font-semibold text-white">Terminé</h2>
              <span className={`${currentTheme.accent} text-xs font-medium px-2 py-0.5 rounded-full ml-2`}>
                {completedTodos.length}
              </span>
            </div>
            <Motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
              <AnimatePresence>
                {completedTodos.map((todo) => (
                  <Motion.li key={todo.id} variants={itemVariants} exit="exit" layout>
                    <TodoItem
                      todo={todo}
                      onDelete={deleteTodo}
                      onToggle={toggleTodo}
                      onEdit={editTodo}
                      theme={currentTheme}
                    />
                  </Motion.li>
                ))}
              </AnimatePresence>
            </Motion.ul>
          </div>
        )}

        {/* Empty state */}
        {todos.length === 0 && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-16 px-6 rounded-xl ${currentTheme.border} border bg-white/5 backdrop-blur-md`}
          >
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-full ${currentTheme.accent} flex items-center justify-center`}
            >
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aucune tâche pour le moment</h3>
            <p className="text-white/60 max-w-md mx-auto">
              Ajoutez votre première tâche en utilisant le champ ci-dessus pour commencer à organiser votre journée.
            </p>
          </Motion.div>
        )}
      </div>

      {/* Modal */}
      {showExplanation && (
        <ReactExplainModal
          onClose={() => {
            setShowExplanation(false)
            setHasSeenExplanation(true)
          }}
          theme={currentTheme}
        />
      )}
    </div>
  )
}

export default App