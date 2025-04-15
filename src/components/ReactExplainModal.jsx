"use client"

import { useState } from "react"
import { motion as Motion } from "framer-motion"
import { X, Code2, AppWindow } from "lucide-react"

export default function ReactExplainModal({ onClose, theme }) {
  const [activeTab, setActiveTab] = useState('app')

  const tabs = {
    app: {
      icon: <AppWindow size={20} />,
      title: "L'Application",
      content: (
        <div className="space-y-4">
          <p>
            ReactKey est une application de gestion de tâches moderne construite avec React et Tailwind CSS. Elle vous permet de :
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Créer, modifier et supprimer des tâches facilement</li>
            <li>Marquer les tâches comme terminées</li>
            <li>Rechercher parmi vos tâches</li>
            <li>Personnaliser l'apparence avec différents thèmes</li>
          </ul>
          <p>
            L'application utilise des animations fluides et un design moderne pour une expérience utilisateur agréable.
          </p>
        </div>
      )
    },
    react: {
      icon: <Code2 size={20} />,
      title: "Concepts React",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Cycle de Vie des Composants</h3>
            <p className="mb-2">
              Chaque composant React traverse différentes phases dans son cycle de vie :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <span className="font-medium">Montage (Mount)</span> : Le composant est créé et ajouté au DOM. React initialise son état et ses props.
              </li>
              <li>
                <span className="font-medium">Mise à jour (Update)</span> : Le composant est re-rendu suite à des changements d'état ou de props.
              </li>
              <li>
                <span className="font-medium">Démontage (Unmount)</span> : Le composant est retiré du DOM. C'est le moment de nettoyer les ressources.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">L'importance des Keys</h3>
            <p>
              Dans cette application, chaque tâche a une <code className="px-1 py-0.5 rounded bg-white/10">key</code> unique basée sur son ID. Les keys sont cruciales en React car elles :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Permettent à React d'identifier chaque élément de manière unique</li>
              <li>Optimisent les performances en évitant des re-rendus inutiles</li>
              <li>Maintiennent l'état correct de chaque élément lors des mises à jour</li>
            </ul>
          </div>
        </div>
      )
    }
  }

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <Motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`relative w-full max-w-2xl rounded-2xl ${theme.border} border bg-gray-900/95 backdrop-blur-md p-6 shadow-xl`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-all"
        >
          <X size={20} />
        </button>

        <h2 className={`text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${theme.secondary}`}>
          Bienvenue sur ReactKey !
        </h2>

        <div className="flex gap-2 mb-6">
          {Object.entries(tabs).map(([key, tab]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === key
                ? `${theme.accent} text-white`
                : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        <div className="text-white/80">
          {tabs[activeTab].content}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-sm text-white/60">
            Vous pouvez toujours revoir ces explications en cliquant sur l'icône d'aide dans la barre de navigation.
          </p>
        </div>
      </Motion.div>
    </Motion.div>
  )
}
