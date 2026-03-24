"use client"

import { useEffect, ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md bg-white p-6 flex flex-col rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          {title && <h2 className="text-lg font-medium">{title}</h2>}
          <button
            onClick={onClose}
            className="ml-auto text-sm text-neutral-400 leading-none hover:text-black transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.2695 11.2227" width="1em" height="1em" fill="none">
              <g id="Group 4">
                <path id="Line 2" d="M0 0L13.7735 0" stroke="rgb(0,0,0)" strokeLinecap="round" strokeWidth="1.500000" transform="matrix(0.708848,0.705361,-0.705361,0.708848,0.75293,0.753906)"/>
                <path id="Line 3" d="M0 0L13.7735 0" stroke="rgb(0,0,0)" strokeLinecap="round" strokeWidth="1.500000" transform="matrix(-0.708747,0.705462,-0.705462,-0.708747,10.5156,0.75293)"/>
              </g>
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}