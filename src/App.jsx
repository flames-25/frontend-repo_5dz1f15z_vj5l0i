import Hero from './components/Hero'
import Features from './components/Features'
import Demo from './components/Demo'
import PlanWidget from './components/PlanWidget'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 ring-1 ring-black/5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-semibold tracking-tight text-slate-900">TripMind</a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#how" className="hover:text-slate-900">How it works</a>
            <a href="#plan" className="hover:text-slate-900">Plan</a>
          </nav>
          <a href="#plan" className="inline-flex items-center rounded-lg bg-sky-600 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-700 transition">Plan My Trip</a>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <Hero />
        <Features />
        <Demo />
        <PlanWidget />
      </main>

      <Footer />
    </div>
  )
}

export default App
