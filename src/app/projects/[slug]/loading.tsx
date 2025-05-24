export default function ProjectLoading() {
  return (
    <main className="topPageMargin relative container min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="relative w-full">
        {/* Header with All Projects Button and Title skeleton */}
        <div className="mb-4 flex items-center">
          {/* All Projects Button skeleton */}
          <div className="bg-navy-700/50 h-10 w-32 animate-pulse rounded-lg" />

          {/* Title skeleton - centered */}
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <div className="bg-neon/20 h-12 w-64 animate-pulse rounded-lg sm:h-14 sm:w-80 md:h-16 md:w-96" />
          </div>
        </div>

        {/* Description and buttons skeleton */}
        <div className="mb-8 text-center">
          {/* Description skeleton */}
          <div className="mx-auto mb-6 space-y-2">
            <div className="bg-foreground/20 mx-auto h-4 w-3/4 animate-pulse rounded" />
            <div className="bg-foreground/20 mx-auto h-4 w-2/3 animate-pulse rounded" />
          </div>

          {/* Action buttons skeleton */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <div className="bg-navy-700/50 h-10 w-24 animate-pulse rounded-lg" />
            <div className="bg-navy-700/50 h-10 w-28 animate-pulse rounded-lg" />
          </div>
        </div>

        {/* Featured image skeleton */}
        <div className="relative mb-8 overflow-hidden rounded-xl">
          <div className="bg-navy-700/50 aspect-video w-full animate-pulse" />
        </div>

        {/* Project details skeleton */}
        <div className="border-navy-600 bg-navy-800/50 mb-8 rounded-xl border p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={`detail-skeleton-${index}`} className="space-y-2">
                <div className="bg-neon/20 h-4 w-20 animate-pulse rounded" />
                <div className="bg-foreground/20 h-4 w-full animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Main Content skeleton */}
          <div className="lg:w-3/5">
            <div className="space-y-6">
              {/* Content blocks */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`content-skeleton-${index}`} className="space-y-3">
                  <div className="bg-foreground/20 h-6 w-1/3 animate-pulse rounded" />
                  <div className="space-y-2">
                    <div className="bg-foreground/20 h-4 w-full animate-pulse rounded" />
                    <div className="bg-foreground/20 h-4 w-5/6 animate-pulse rounded" />
                    <div className="bg-foreground/20 h-4 w-4/5 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:w-2/5 lg:max-w-md">
            <div className="border-navy-600 bg-navy-800/50 sticky top-8 rounded-xl border p-6">
              <div className="mb-4">
                <div className="bg-neon/20 h-5 w-32 animate-pulse rounded" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={`toc-skeleton-${index}`} className="space-y-1">
                    <div className="bg-foreground/20 h-3 w-3/4 animate-pulse rounded" />
                    <div className="ml-4 space-y-1">
                      <div className="bg-foreground/20 h-3 w-1/2 animate-pulse rounded" />
                      <div className="bg-foreground/20 h-3 w-2/3 animate-pulse rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Other projects section skeleton */}
        <section className="mt-24">
          <div className="bg-foreground/20 mb-8 h-8 w-48 animate-pulse rounded" />
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={`nav-skeleton-${index}`}
                className="border-navy-600 bg-navy-800/50 rounded-xl border p-6"
              >
                <div className="bg-navy-700/50 mb-4 aspect-video w-full animate-pulse rounded-lg" />
                <div className="space-y-2">
                  <div className="bg-foreground/20 h-5 w-3/4 animate-pulse rounded" />
                  <div className="bg-foreground/20 h-4 w-full animate-pulse rounded" />
                  <div className="bg-foreground/20 h-4 w-2/3 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
