export default function Footer() {
  return (
    <footer className="border-t border-white/50 bg-white/50 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <p className="text-sm font-semibold text-slate-900">E-Library</p>
            <p className="text-sm text-slate-500">
              A clean, modern digital library management experience.
            </p>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} E-Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}