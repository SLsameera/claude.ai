import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './styles.css'

type OverviewResponse = {
  platform: {
    version: string
    targetUsers: string
    modules: number
    languages: string[]
    deploymentReady: boolean
    upcomingPhases: string[]
  }
  metrics: { metric: string; current: number; target: number; unit: string }[]
  modules: {
    businesses: number
    marketplace: number
    jobs: number
    services: number
  }
}

type Business = {
  id: string
  name: string
  category: string
  rating: number
  location: string
  verified: boolean
  hours: string
  description: string
}

type MarketplaceItem = {
  id: string
  title: string
  category: string
  price: number
  priceCurrency: string
  condition: 'new' | 'used'
  location: string
  highlights: string[]
}

type JobListing = {
  id: string
  title: string
  company: string
  location: string
  salaryRange: string
  jobType: 'Full-time' | 'Part-time' | 'Remote' | 'Contract'
  postedAt: string
  tags: string[]
}

type ServiceOffering = {
  id: string
  name: string
  provider: string
  category: string
  price: string
  availability: string
  rating: number
  description: string
}

type ErasResponse = {
  overview: {
    minimumWithdrawalLkr: number
    referralCommission: string
    payoutChannels: string[]
    platformShare: string
    userShare: string
  }
  activities: { action: string; points: number; estimatedValueLkr: number }[]
  tiers: { name: string; monthlyRangeLkr: string; perks: string[] }[]
}

type RequestItem = {
  id: string
  title: string
  description?: string
  status: string
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/v1'
})

export default function App() {
  const [overview, setOverview] = useState<OverviewResponse | null>(null)
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [marketplace, setMarketplace] = useState<MarketplaceItem[]>([])
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [services, setServices] = useState<ServiceOffering[]>([])
  const [eras, setEras] = useState<ErasResponse | null>(null)
  const [requests, setRequests] = useState<RequestItem[]>([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    try {
      setLoading(true)
      const [overviewRes, bizRes, marketplaceRes, jobsRes, servicesRes, erasRes, requestsRes] =
        await Promise.all([
          api.get<OverviewResponse>('/overview'),
          api.get<Business[]>('/businesses'),
          api.get<MarketplaceItem[]>('/marketplace'),
          api.get<JobListing[]>('/jobs'),
          api.get<ServiceOffering[]>('/services'),
          api.get<ErasResponse>('/eras'),
          api.get<RequestItem[]>('/requests')
        ])

      setOverview(overviewRes.data)
      setBusinesses(bizRes.data)
      setMarketplace(marketplaceRes.data)
      setJobs(jobsRes.data)
      setServices(servicesRes.data)
      setEras(erasRes.data)
      setRequests(requestsRes.data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Unable to load project data. Please ensure the backend is running on port 4000.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const submitRequest = async () => {
    if (!title.trim()) {
      return
    }

    const res = await api.post<RequestItem>('/requests', {
      title,
      description: desc
    })

    setRequests(prev => [res.data, ...prev])
    setTitle('')
    setDesc('')
  }

  const activeModules = useMemo(() => {
    if (!overview) return []
    return [
      { key: 'Business Directory', value: overview.modules.businesses },
      { key: 'Marketplace Listings', value: overview.modules.marketplace },
      { key: 'Jobs', value: overview.modules.jobs },
      { key: 'Services', value: overview.modules.services }
    ]
  }, [overview])

  if (loading) {
    return (
      <main className="page">
        <div className="loading">Bootstrapping Smart Era Marketplace…</div>
      </main>
    )
  }

  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">E City Era · Smart Era Marketplace</p>
          <h1>AI-powered digital ecosystem for Sri Lanka</h1>
          <p className="subtitle">
            Launch-ready platform blueprint with live commerce, service bookings, ERAS earnings, and AI
            assistance.
          </p>
          <button className="primary" onClick={loadData}>
            Refresh project snapshot
          </button>
        </div>
        <section className="hero-metrics">
          <div>
            <span className="metric-label">Version</span>
            <span className="metric-value">{overview?.platform.version}</span>
          </div>
          <div>
            <span className="metric-label">Modules</span>
            <span className="metric-value">{overview?.platform.modules}</span>
          </div>
          <div>
            <span className="metric-label">Languages</span>
            <span className="metric-value">{overview?.platform.languages.join(' / ')}</span>
          </div>
        </section>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {overview && (
        <section className="card">
          <h2>Program status</h2>
          <p className="muted">Target users: {overview.platform.targetUsers}</p>
          <div className="grid four">
            {overview.metrics.map(metric => (
              <article key={metric.metric} className="stat-card">
                <h3>{metric.metric}</h3>
                <p className="stat-current">
                  {metric.unit === 'ratio'
                    ? `${(metric.current * 100).toFixed(0)}%`
                    : metric.unit === 'minutes'
                    ? `${metric.current} min`
                    : metric.current.toLocaleString()}
                </p>
                <p className="stat-target">
                  Target: {metric.unit === 'ratio' ? `${(metric.target * 100).toFixed(0)}%` : metric.target.toLocaleString()} ({metric.unit})
                </p>
              </article>
            ))}
          </div>
          <div className="roadmap">
            <h3>Upcoming phases</h3>
            <ul>
              {overview.platform.upcomingPhases.map(phase => (
                <li key={phase}>{phase}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="card">
        <h2>Active modules</h2>
        <div className="grid four">
          {activeModules.map(module => (
            <article key={module.key} className="stat-card">
              <h3>{module.key}</h3>
              <p className="stat-current large">{module.value}</p>
              <p className="muted">Sample records configured</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split">
        <article className="card">
          <h2>Business directory</h2>
          <ul className="list">
            {businesses.map(item => (
              <li key={item.id}>
                <div className="list-header">
                  <div>
                    <h3>{item.name}</h3>
                    <p className="muted">{item.category} · {item.location}</p>
                  </div>
                  <span className={`badge ${item.verified ? 'success' : 'muted'}`}>
                    {item.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                <p>{item.description}</p>
                <footer className="list-footer">
                  <span>Rating {item.rating.toFixed(1)}</span>
                  <span>Hours {item.hours}</span>
                </footer>
              </li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>Marketplace insights</h2>
          <ul className="list">
            {marketplace.map(product => (
              <li key={product.id}>
                <div className="list-header">
                  <div>
                    <h3>{product.title}</h3>
                    <p className="muted">{product.category} · {product.location}</p>
                  </div>
                  <span className="price">{new Intl.NumberFormat('en-LK', { style: 'currency', currency: product.priceCurrency }).format(product.price)}</span>
                </div>
                <p>{product.highlights.join(' · ')}</p>
                <footer className="list-footer">
                  <span>{product.condition === 'new' ? 'Brand new' : 'Pre-owned'}</span>
                </footer>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="split">
        <article className="card">
          <h2>Job spotlight</h2>
          <ul className="list">
            {jobs.map(job => (
              <li key={job.id}>
                <div className="list-header">
                  <div>
                    <h3>{job.title}</h3>
                    <p className="muted">{job.company} · {job.location}</p>
                  </div>
                  <span className="badge neutral">{job.jobType}</span>
                </div>
                <p>{job.tags.join(' · ')}</p>
                <footer className="list-footer">
                  <span>{job.salaryRange}</span>
                  <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                </footer>
              </li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>Service bookings</h2>
          <ul className="list">
            {services.map(service => (
              <li key={service.id}>
                <div className="list-header">
                  <div>
                    <h3>{service.name}</h3>
                    <p className="muted">{service.provider} · {service.category}</p>
                  </div>
                  <span className="badge success">{service.rating.toFixed(1)}</span>
                </div>
                <p>{service.description}</p>
                <footer className="list-footer">
                  <span>{service.price}</span>
                  <span>{service.availability}</span>
                </footer>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {eras && (
        <section className="card">
          <h2>ERAS earning engine</h2>
          <div className="grid three">
            <article className="stat-card">
              <h3>Minimum withdrawal</h3>
              <p className="stat-current">LKR {eras.overview.minimumWithdrawalLkr.toLocaleString()}</p>
              <p className="muted">{eras.overview.payoutChannels.join(' · ')}</p>
            </article>
            <article className="stat-card">
              <h3>Revenue split</h3>
              <p className="stat-current">{eras.overview.userShare} to users</p>
              <p className="muted">Platform retains {eras.overview.platformShare}</p>
            </article>
            <article className="stat-card">
              <h3>Referral bonus</h3>
              <p className="stat-current">{eras.overview.referralCommission} commission</p>
              <p className="muted">on successful referrals</p>
            </article>
          </div>
          <div className="grid two">
            <div>
              <h3>Activities</h3>
              <table>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Points</th>
                    <th>Est. value (LKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {eras.activities.map(activity => (
                    <tr key={activity.action}>
                      <td>{activity.action}</td>
                      <td>{activity.points}</td>
                      <td>{activity.estimatedValueLkr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3>Reward tiers</h3>
              <ul className="list">
                {eras.tiers.map(tier => (
                  <li key={tier.name}>
                    <div className="list-header">
                      <h3>{tier.name}</h3>
                      <span className="badge neutral">{tier.monthlyRangeLkr}</span>
                    </div>
                    <p>{tier.perks.join(' · ')}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="card">
        <h2>Launch coordination notes</h2>
        <div className="request-form">
          <input placeholder="Request title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea
            placeholder="What support do you need to move forward?"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
          <button className="primary" onClick={submitRequest} disabled={!title.trim()}>
            Log action item
          </button>
        </div>
        <ul className="list">
          {requests.map(request => (
            <li key={request.id}>
              <div className="list-header">
                <h3>{request.title}</h3>
                <span className="badge neutral">{request.status}</span>
              </div>
              {request.description && <p>{request.description}</p>}
            </li>
          ))}
          {!requests.length && <p className="muted">No launch tasks logged yet. Add your first action item above.</p>}
        </ul>
      </section>

      <footer className="footer">
        <p>
          Smart Era Marketplace starter dashboard · Backend {overview?.platform.version} ·{' '}
          {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}
