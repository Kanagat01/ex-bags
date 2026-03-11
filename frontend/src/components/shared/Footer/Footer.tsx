export const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-neutral-500">
        <span>© {new Date().getFullYear()} Ex-Bags</span>
        <span>Платформа приёма люксовых сумок</span>
      </div>
    </footer>
  )
}