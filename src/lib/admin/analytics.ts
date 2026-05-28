import { BetaAnalyticsDataClient } from '@google-analytics/data'

let client: BetaAnalyticsDataClient | null = null

function getClient() {
  if (!client) {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n')

    if (!email || !privateKey) {
      throw new Error('Google Analytics credentials not configured')
    }

    client = new BetaAnalyticsDataClient({
      credentials: {
        client_email: email,
        private_key: privateKey,
      },
    })
  }
  return client
}

function getPropertyId() {
  const id = process.env.GA4_PROPERTY_ID
  if (!id) throw new Error('GA4_PROPERTY_ID not configured')
  return id
}

export async function fetchAnalyticsData(days: number) {
  const analyticsClient = getClient()
  const propertyId = getPropertyId()
  const property = `properties/${propertyId}`

  const startDate = `${days}daysAgo`
  const endDate = 'today'

  const [trendRes, pagesRes, sourcesRes, devicesRes] = await Promise.all([
    analyticsClient.runReport({
      property,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'date' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'totalUsers' },
      ],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    }),
    analyticsClient.runReport({
      property,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'totalUsers' },
      ],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 10,
    }),
    analyticsClient.runReport({
      property,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    }),
    analyticsClient.runReport({
      property,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    }),
  ])

  const trend = (trendRes[0].rows || []).map((row) => ({
    date: row.dimensionValues?.[0]?.value || '',
    pageviews: Number(row.metricValues?.[0]?.value || 0),
    users: Number(row.metricValues?.[1]?.value || 0),
  }))

  let totalPageviews = 0
  let totalUsers = 0
  for (const t of trend) {
    totalPageviews += t.pageviews
    totalUsers += t.users
  }

  const topPages = (pagesRes[0].rows || []).map((row) => ({
    path: row.dimensionValues?.[0]?.value || '',
    pageviews: Number(row.metricValues?.[0]?.value || 0),
    users: Number(row.metricValues?.[1]?.value || 0),
  }))

  const trafficSources = (sourcesRes[0].rows || []).map((row) => ({
    source: row.dimensionValues?.[0]?.value || '',
    sessions: Number(row.metricValues?.[0]?.value || 0),
  }))

  const devices = (devicesRes[0].rows || []).map((row) => ({
    category: row.dimensionValues?.[0]?.value || '',
    sessions: Number(row.metricValues?.[0]?.value || 0),
  }))

  return {
    overview: { totalUsers, totalPageviews },
    trend,
    topPages,
    trafficSources,
    devices,
  }
}

export async function fetchRealtimeUsers() {
  const analyticsClient = getClient()
  const propertyId = getPropertyId()
  const property = `properties/${propertyId}`

  const [response] = await analyticsClient.runRealtimeReport({
    property,
    metrics: [{ name: 'activeUsers' }],
  })

  const activeUsers = Number(response.rows?.[0]?.metricValues?.[0]?.value || 0)
  return { activeUsers }
}
