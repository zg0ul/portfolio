import ProjectCardSkeleton from "@/components/projects/ProjectCardSkeleton";

export default function Loading() {
  return (
    <main className="topPageMargin relative z-1 container mb-10 min-h-screen">
      <div className="">
        <div className="mb-8 text-center">
          <h1 className="section-title">Projects</h1>
          <p className="section-description">
            Explore my portfolio of projects across different technologies.
          </p>
        </div>

        {/* Category filter skeleton */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`filter-skeleton-${index}`}
              className="bg-navy-700/50 h-10 w-20 animate-pulse rounded-xl"
            />
          ))}
        </div>

        {/* Project cards skeleton */}
        <ProjectCardSkeleton count={6} />
      </div>
    </main>
  );
}
