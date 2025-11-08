import { motion } from 'framer-motion'
import { MessageSquare, Route, Car, Train } from 'lucide-react'

const steps = [
  { icon: MessageSquare, title: 'Describe your trip', text: '“Plan my weekend trip to Delhi and back.”' },
  { icon: Route, title: 'Explore routes', text: 'See multi-modal options with time and cost.' },
  { icon: Car, title: 'Compare providers', text: 'Uber, Ola, Rapido and more—side‑by‑side.' },
  { icon: Train, title: 'Book automatically', text: 'One tap to confirm. We handle the rest.' },
]

export default function Demo() {
  return (
    <section id="how" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-slate-900"
        >
          How TripMind works
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl p-6 ring-1 ring-slate-200 bg-slate-50"
            >
              <div className="h-12 w-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{s.text}</p>
            </motion.div>
          ))}
        </div>

        <div id="plan" className="mt-12 mx-auto max-w-2xl">
          <div className="rounded-2xl p-4 md:p-6 ring-1 ring-slate-200 bg-white shadow-sm">
            <div className="text-sm text-slate-500">Try a sample prompt</div>
            <div className="mt-2 rounded-xl border border-slate-200 p-3 text-slate-700 bg-slate-50">
              Find the cheapest route from Delhi to Agra this Saturday at 9 AM
            </div>
            <button className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-sky-600 text-white py-3 font-semibold hover:bg-sky-700 transition">
              Generate demo plan
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
