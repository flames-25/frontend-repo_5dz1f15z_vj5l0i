import { Twitter, Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div>
          <div className="text-xl font-bold">TripMind</div>
          <p className="text-slate-400 mt-2 text-sm">AI that understands how you move.</p>
        </div>
        <nav className="flex items-center gap-6 text-sm justify-center">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#plan" className="hover:text-white">Plan</a>
        </nav>
        <div className="flex items-center md:justify-end gap-4">
          <a href="#" aria-label="Twitter" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"><Twitter className="h-5 w-5" /></a>
          <a href="#" aria-label="GitHub" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"><Github className="h-5 w-5" /></a>
          <a href="mailto:contact@tripmind.ai" aria-label="Email" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"><Mail className="h-5 w-5" /></a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">© {new Date().getFullYear()} TripMind. All rights reserved.</div>
    </footer>
  )
}
