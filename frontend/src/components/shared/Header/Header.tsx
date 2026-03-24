import Link from "next/link"

export const Header = () => {
  return (
    <header className="w-full border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="text-4xl font-medium tracking-tight">
          ex(bags)
        </Link>
      </div>
    </header>
  )
}