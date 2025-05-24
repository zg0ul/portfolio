"use client";

interface ProjectCardSkeletonProps {
  count?: number;
}

function SingleProjectCardSkeleton() {
  return (
    <div className="group border-navy-600 bg-navy-800 overflow-hidden rounded-xl border shadow-lg backdrop-blur-md">
      <div className="relative flex h-full flex-col">
        {/* Image skeleton */}
        <div className="relative aspect-video w-full overflow-hidden">
          <div className="bg-navy-700/50 absolute inset-0">
            <div className="via-navy-500/20 absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent"></div>
          </div>

          {/* Category badge skeleton */}
          <div className="bg-navy-700/90 absolute bottom-3 left-3 rounded-full px-3 py-1.5 text-sm backdrop-blur-sm">
            <div className="bg-navy-600/50 relative h-4 w-16 overflow-hidden rounded">
              <div className="via-navy-400/30 absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Content area skeleton */}
        <div className="flex flex-1 flex-col p-4">
          {/* Title skeleton */}
          <div className="bg-navy-700/50 relative mb-2 h-6 overflow-hidden rounded">
            <div className="via-navy-500/30 absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent"></div>
          </div>

          {/* Description skeleton */}
          <div className="mb-4 space-y-2">
            <div className="bg-navy-700/30 relative h-4 overflow-hidden rounded">
              <div className="via-navy-500/20 absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent"></div>
            </div>
            <div className="bg-navy-700/30 relative h-4 w-3/4 overflow-hidden rounded">
              <div className="via-navy-500/20 absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent"></div>
            </div>
          </div>

          {/* Technologies skeleton */}
          <div className="mt-auto">
            <div className="mb-4 flex flex-wrap gap-2">
              {[16, 20, 14].map((width, index) => (
                <div
                  key={index}
                  className={`h-6 w-${width} bg-navy-700/50 relative overflow-hidden rounded-full`}
                >
                  <div className="via-navy-500/30 absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent"></div>
                </div>
              ))}
            </div>

            {/* Actions skeleton */}
            <div className="flex items-center justify-between">
              <div className="bg-navy-700/50 relative h-10 w-28 overflow-hidden rounded-lg">
                <div className="via-navy-500/30 absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent"></div>
              </div>

              <div className="flex gap-2">
                {[0, 1].map((index) => (
                  <div
                    key={index}
                    className="bg-navy-700/50 relative h-10 w-10 overflow-hidden rounded-lg"
                  >
                    <div className="via-navy-500/30 absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCardSkeleton({
  count = 6,
}: ProjectCardSkeletonProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <SingleProjectCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
}
