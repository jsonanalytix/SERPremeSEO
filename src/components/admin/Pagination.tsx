/**
 * Pagination Component
 * 
 * Displays pagination controls for navigating through lead pages.
 * 
 * @created 2026-02-03 - Lead CRM pagination implementation
 */

'use client'

interface PaginationProps {
  page: number
  totalPages: number
  total: number
  perPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, total, perPage, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const startItem = (page - 1) * perPage + 1
  const endItem = Math.min(page * perPage, total)

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      if (page > 3) {
        pages.push('ellipsis')
      }
      
      // Show pages around current
      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (page < totalPages - 2) {
        pages.push('ellipsis')
      }
      
      // Always show last page
      pages.push(totalPages)
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 px-4 py-3 mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Results count */}
        <p className="text-sm text-secondary-600">
          Showing <span className="font-medium">{startItem}</span> to{' '}
          <span className="font-medium">{endItem}</span> of{' '}
          <span className="font-medium">{total}</span> leads
        </p>

        {/* Page navigation */}
        <nav className="flex items-center gap-1">
          {/* Previous button */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm font-medium text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <span className="sr-only">Previous</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page numbers */}
          <div className="hidden sm:flex items-center gap-1">
            {pageNumbers.map((p, idx) => 
              p === 'ellipsis' ? (
                <span key={`ellipsis-${idx}`} className="px-2 py-1 text-secondary-400">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    p === page
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
                  }`}
                >
                  {p}
                </button>
              )
            )}
          </div>

          {/* Mobile page indicator */}
          <span className="sm:hidden px-3 py-1.5 text-sm text-secondary-600">
            Page {page} of {totalPages}
          </span>

          {/* Next button */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm font-medium text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <span className="sr-only">Next</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  )
}
