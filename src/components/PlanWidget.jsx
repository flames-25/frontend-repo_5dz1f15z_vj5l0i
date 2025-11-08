import { useState, useMemo } from 'react'
import { Search, DollarSign, Clock, Car, Train, Bike, Plane, CheckCircle2, AlertCircle } from 'lucide-react'

const modeIcon = (mode) => {
  const m = (mode || '').toLowerCase()
  if (m.includes('car') || m.includes('uber') || m.includes('cab') || m.includes('taxi')) return Car
  if (m.includes('train') || m.includes('metro')) return Train
  if (m.includes('bike') || m.includes('rapido')) return Bike
  if (m.includes('flight') || m.includes('plane')) return Plane
  return Car
}

export default function PlanWidget() {
  const backend = import.meta.env.VITE_BACKEND_URL || ''
  const [query, setQuery] = useState('Find the cheapest ride from Connaught Place to Indira Gandhi Airport now')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [routes, setRoutes] = useState([])
  const [bookingId, setBookingId] = useState('')

  const sorted = useMemo(() => {
    const list = Array.isArray(routes) ? [...routes] : []
    return list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
  }, [routes])

  const cheapest = sorted[0]
  const expensive = sorted[sorted.length - 1]

  async function generatePlan(e) {
    e?.preventDefault()
    setLoading(true)
    setError('')
    setBookingId('')
    try {
      const res = await fetch(`${backend}/api/plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      if (!res.ok) throw new Error(`Plan failed: ${res.status}`)
      const data = await res.json()
      setRoutes(Array.isArray(data?.routes) ? data.routes : data)
    } catch (err) {
      setError(err.message || 'Failed to plan')
    } finally {
      setLoading(false)
    }
  }

  async function book(selection) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${backend}/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'demo', query, selection })
      })
      if (!res.ok) throw new Error(`Book failed: ${res.status}`)
      const data = await res.json()
      setBookingId(data?.id || 'success')
    } catch (err) {
      setError(err.message || 'Failed to book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-sky-50/50 to-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="rounded-2xl p-6 md:p-8 bg-white ring-1 ring-slate-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Plan a ride</h2>
          <p className="text-slate-600 mt-1">We compare providers and show you cheapest, premium, and everything in between.</p>

          <form onSubmit={generatePlan} className="mt-6 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="e.g., Get me an Uber from MG Road to Airport at 6 PM"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 text-white px-5 py-3 font-semibold hover:bg-sky-700 disabled:opacity-50"
            >
              {loading ? 'Planning…' : 'Find routes'}
            </button>
          </form>

          {error && (
            <div className="mt-4 flex items-center gap-2 text-sm text-red-600"><AlertCircle className="h-4 w-4" /> {error}</div>
          )}

          {bookingId && (
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600"><CheckCircle2 className="h-4 w-4" /> Booked successfully. Ref: {bookingId}</div>
          )}

          {routes?.length > 0 && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                {cheapest && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <div className="text-sm font-semibold text-emerald-700">Cheapest</div>
                    <RouteCard r={cheapest} onBook={() => book(cheapest)} highlight="emerald" />
                  </div>
                )}
                {expensive && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <div className="text-sm font-semibold text-amber-700">Premium</div>
                    <RouteCard r={expensive} onBook={() => book(expensive)} highlight="amber" />
                  </div>
                )}
              </div>

              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <DollarSign className="h-4 w-4" /> Sorted by price (low to high)
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sorted.map((r, idx) => (
                    <div key={idx} className="rounded-2xl ring-1 ring-slate-200 bg-white p-5">
                      <RouteCard r={r} onBook={() => book(r)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function RouteCard({ r, onBook, highlight }) {
  const Icon = modeIcon(r?.mode || r?.provider)
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${highlight ? `bg-${highlight}-100 text-${highlight}-700` : 'bg-sky-100 text-sky-700'}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">{r?.provider || r?.mode || 'Ride'}</div>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" /> ETA {r?.eta || r?.duration || '—'} • {Array.isArray(r?.legs) ? `${r.legs.length} legs` : 'Direct'}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-slate-900">{formatPrice(r?.price)}</div>
          {r?.distance && <div className="text-xs text-slate-500">{r.distance}</div>}
        </div>
      </div>

      {Array.isArray(r?.legs) && r.legs.length > 0 && (
        <div className="mt-3 space-y-2">
          {r.legs.map((leg, i) => {
            const LIcon = modeIcon(leg.mode || leg.provider)
            return (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="h-6 w-6 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center">
                    <LIcon className="h-3.5 w-3.5" />
                  </div>
                  <span>{leg.mode || leg.provider}</span>
                </div>
                <div className="text-slate-700">{formatPrice(leg.price)}</div>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-4 flex items-center justify-end">
        <button onClick={onBook} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white ${highlight === 'amber' ? 'bg-amber-600 hover:bg-amber-700' : highlight === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-sky-600 hover:bg-sky-700'}`}>
          Book this
        </button>
      </div>
    </div>
  )
}

function formatPrice(p) {
  if (p == null) return '—'
  try {
    const n = Number(p)
    if (Number.isNaN(n)) return String(p)
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  } catch {
    return String(p)
  }
}
