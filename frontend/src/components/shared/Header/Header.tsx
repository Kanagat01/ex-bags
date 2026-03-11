import Link from "next/link"

export const Header = () => {
  return (
    <header className="w-full border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-medium tracking-tight">
          Ex-Bags
        </Link>
      </div>
    </header>
  )
}