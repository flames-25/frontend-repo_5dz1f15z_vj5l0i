import { motion } from 'framer-motion'
import { Clock, Wallet, Bot, Shield } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: 'Time-Smart Routing',
    desc: 'Analyzes live and static data to get you there faster across metro, cab, bus, and trains.'
  },
  {
    icon: Wallet,
    title: 'Fair Fares',
    desc: 'Compares prices from Uber, Ola, Rapido, and more to find the best deal for you.'
  },
  {
    icon: Bot,
    title: 'Autonomous Booking',
    desc: 'Set your intent once—TripMind handles round trips, daily commutes, and rescheduling.'
  },
  {
    icon: Shield,
    title: 'Private by Design',
    desc: 'Your preferences are stored securely. You control what TripMind remembers.'
  }
]

export default function Features() {
  return (
    <section id="features" className="relative py-20 bg-gradient-to-b from-white to-sky-50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-slate-900"
        >
          Built for busy travelers
        </motion.h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-white rounded-2xl p-6 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition"
            >
              <div className="h-12 w-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
