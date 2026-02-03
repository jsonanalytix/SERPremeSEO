/**
 * Google Ads Sync Panel Component
 * 
 * Displays Google Ads sync status and provides controls for
 * manual batch sync operations.
 * 
 * @created 2026-02-03 - Google Ads API integration (Phase 2)
 */

'use client'

import { useState, useEffect, useCallback } from 'react'

interface SyncStats {
  pendingSync: number
  alreadySynced: number
  totalWithGclid: number
}

interface SyncStatus {
  configured: boolean
  message: string
  stats?: SyncStats
}

interface SyncResult {
  success: boolean
  message: string
  successCount?: number
  failureCount?: number
  errors?: string[]
}

export default function GoogleAdsSyncPanel() {
  const [status, setStatus] = useState<SyncStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null)
  const [expanded, setExpanded] = useState(false)

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/conversions/sync?stats=true')
      if (response.ok) {
        const data = await response.json()
        setStatus(data)
      }
    } catch (error) {
      console.error('Error fetching sync status:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  const handleSyncAll = async () => {
    setSyncing(true)
    setSyncResult(null)

    try {
      const response = await fetch('/api/admin/conversions/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ syncAll: true }),
      })

      const data = await response.json()
      
      setSyncResult({
        success: response.ok && data.success,
        message: data.message || (response.ok ? 'Sync completed' : 'Sync failed'),
        successCount: data.successCount,
        failureCount: data.failureCount,
        errors: data.errors,
      })

      // Refresh stats
      fetchStatus()
    } catch (error) {
      setSyncResult({
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      })
    } finally {
      setSyncing(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white border border-secondary-200 rounded-xl p-4">
        <div className="animate-pulse flex items-center gap-3">
          <div className="h-8 w-8 bg-secondary-200 rounded-lg" />
          <div className="h-5 w-40 bg-secondary-200 rounded" />
        </div>
      </div>
    )
  }

  if (!status) {
    return null
  }

  return (
    <div className="bg-white border border-secondary-200 rounded-xl overflow-hidden">
      {/* Header - always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {/* Google Ads Icon */}
          <div className={`p-2 rounded-lg ${status.configured ? 'bg-blue-100' : 'bg-secondary-100'}`}>
            <svg 
              className={`w-5 h-5 ${status.configured ? 'text-blue-600' : 'text-secondary-400'}`} 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
            </svg>
          </div>
          
          <div className="text-left">
            <h3 className="font-medium text-secondary-900">Google Ads Sync</h3>
            <p className="text-xs text-secondary-500">
              {status.configured 
                ? `${status.stats?.pendingSync || 0} pending conversions` 
                : 'Not configured'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {status.configured && status.stats && status.stats.pendingSync > 0 && (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
              {status.stats.pendingSync} pending
            </span>
          )}
          
          <svg 
            className={`w-5 h-5 text-secondary-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-secondary-100">
          {status.configured ? (
            <div className="pt-4 space-y-4">
              {/* Stats */}
              {status.stats && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-secondary-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{status.stats.pendingSync}</p>
                    <p className="text-xs text-secondary-500">Pending Sync</p>
                  </div>
                  <div className="text-center p-3 bg-secondary-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{status.stats.alreadySynced}</p>
                    <p className="text-xs text-secondary-500">Synced</p>
                  </div>
                  <div className="text-center p-3 bg-secondary-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{status.stats.totalWithGclid}</p>
                    <p className="text-xs text-secondary-500">With GCLID</p>
                  </div>
                </div>
              )}

              {/* Sync result message */}
              {syncResult && (
                <div className={`p-3 rounded-lg ${syncResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <div className="flex items-center gap-2">
                    {syncResult.success ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <p className="text-sm font-medium">{syncResult.message}</p>
                  </div>
                  {syncResult.successCount !== undefined && (
                    <p className="text-xs mt-1 ml-7">
                      Success: {syncResult.successCount}, Failed: {syncResult.failureCount || 0}
                    </p>
                  )}
                </div>
              )}

              {/* Sync button */}
              <button
                onClick={handleSyncAll}
                disabled={syncing || (status.stats?.pendingSync || 0) === 0}
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {syncing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sync All Pending Conversions
                  </>
                )}
              </button>

              <p className="text-xs text-secondary-500 text-center">
                Syncs all &quot;Won&quot; leads with a Google Click ID to Google Ads
              </p>
            </div>
          ) : (
            <div className="pt-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-amber-800">Configuration Required</p>
                    <p className="text-xs text-amber-700 mt-1">
                      To enable automatic offline conversion tracking, add these environment variables:
                    </p>
                    <ul className="text-xs text-amber-700 mt-2 space-y-0.5 font-mono">
                      <li>• GOOGLE_ADS_CLIENT_ID</li>
                      <li>• GOOGLE_ADS_CLIENT_SECRET</li>
                      <li>• GOOGLE_ADS_DEVELOPER_TOKEN</li>
                      <li>• GOOGLE_ADS_REFRESH_TOKEN</li>
                      <li>• GOOGLE_ADS_CUSTOMER_ID</li>
                      <li>• GOOGLE_ADS_CONVERSION_ACTION_ID</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
