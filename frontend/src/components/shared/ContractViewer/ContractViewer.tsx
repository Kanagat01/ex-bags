"use client"

interface ContractViewerProps {
  url: string
}

export const ContractViewer = ({ url }: ContractViewerProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-full h-125 border border-neutral-200">
        <iframe
          src={url}
          className="w-full h-full"
          title="Договор"
        />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-neutral-500 underline hover:text-black transition-colors self-start"
      >
        Открыть в новой вкладке
      </a>
    </div>
  )
}