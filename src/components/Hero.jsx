import { motion } from 'framer-motion'
import { Rocket, Map, Sparkles } from 'lucide-react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/80" />

      <div className="relative z-10 container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 ring-1 ring-black/5 shadow-sm">
            <Sparkles className="h-4 w-4 text-sky-600" />
            <span className="text-xs font-medium text-slate-700">TripMind – Your Autonomous Travel Agent</span>
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Plan smarter. Travel faster. <span className="text-sky-600">Book automatically.</span>
          </h1>
          <p className="mt-4 text-slate-600 text-lg md:text-xl max-w-xl">
            An AI travel assistant that understands your intent, compares routes and fares, and books rides for you—hands-free.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#plan"
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 text-white px-5 py-3 font-semibold shadow-lg shadow-sky-600/20 hover:bg-sky-700 transition"
            >
              <Rocket className="h-5 w-5" /> Plan My Trip
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 px-5 py-3 font-semibold ring-1 ring-slate-200 hover:bg-slate-50 transition"
            >
              <Map className="h-5 w-5" /> How it works
            </a>
          </div>
          <div className="mt-6 text-slate-500 text-sm">
            Trusted by frequent commuters and weekend explorers.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative hidden lg:block"
          aria-hidden
        >
          {/* empty right column to let Spline shine */}
        </motion.div>
      </div>
    </section>
  )
}
