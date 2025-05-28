"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { FiGithub } from "react-icons/fi";
import { BentoCard } from "@/components/ui/bento-card";
import BentoPill from "./ui/bento-pill";

// Simple contribution cell interface
interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export default function GitHubContributionGraph({ username = "zg0ul" }) {
  const [contributionData, setContributionData] = useState<ContributionDay[]>(
    [],
  );
  const [totalCommits, setTotalCommits] = useState<number>(0);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleWeeks, setVisibleWeeks] = useState<number>(26);

  // Refs for measuring container
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Calculate how many weeks can fit in the container
  const calculateVisibleWeeks = useCallback(() => {
    if (containerRef.current && gridRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Each cell is 16px (size-4) with 4px gap, so each week column is 20px
      const weekWidth = 20;
      // Calculate how many weeks can fit, leaving some padding
      const possibleWeeks = Math.floor((containerWidth - 32) / weekWidth);
      // Use all available contribution data if possible
      const maxWeeks = Math.min(possibleWeeks, 52); // Show up to 1 year
      setVisibleWeeks(maxWeeks);
    }
  }, []);

  // Fetch GitHub contribution data
  useEffect(() => {
    fetch(`/api/github-contributions?username=${username}&y=last`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.contributions) {
          setContributionData(data.contributions);

          // Calculate total contributions
          const total = data.contributions.reduce(
            (sum: number, day: ContributionDay) => sum + day.count,
            0,
          );
          setTotalCommits(total);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch GitHub data:", error);
        setLoading(false);
      });
  }, [username]);

  // Recalculate visible weeks on mount and window resize
  useEffect(() => {
    calculateVisibleWeeks();

    const handleResize = () => {
      calculateVisibleWeeks();
    };

    window.addEventListener("resize", handleResize);

    // Use ResizeObserver for more accurate container size changes
    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleWeeks();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [calculateVisibleWeeks]);

  // Group contributions into weeks for display
  const getContributionWeeks = () => {
    if (!contributionData || contributionData.length === 0) {
      return [];
    }

    // Sort contributions by date (oldest to newest)
    const sortedContributions = [...contributionData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    // Fill any missing dates to ensure we have a complete calendar
    const filledContributions = fillMissingDates(sortedContributions);

    // Group contributions by week (7 days)
    const weeks: ContributionDay[][] = [];
    let week: ContributionDay[] = [];

    filledContributions.forEach((contribution) => {
      const date = new Date(contribution.date);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

      // If this is a Sunday and we already have contributions, start a new week
      if (dayOfWeek === 0 && week.length > 0) {
        weeks.push(week);
        week = [];
      }

      week.push(contribution);

      // If this is a Saturday, start a new week
      if (dayOfWeek === 6) {
        weeks.push(week);
        week = [];
      }
    });

    // Add any remaining days
    if (week.length > 0) {
      weeks.push(week);
    }

    return weeks;
  };

  // Helper to fill in any missing dates in the contribution data
  const fillMissingDates = (
    contributions: ContributionDay[],
  ): ContributionDay[] => {
    if (contributions.length === 0) return [];

    const result: ContributionDay[] = [];
    const startDate = new Date(contributions[0].date);
    const endDate = new Date(contributions[contributions.length - 1].date);
    const dateMap = new Map<string, ContributionDay>();

    // Create a map of existing contributions by date string
    contributions.forEach((contrib) => {
      dateMap.set(contrib.date, contrib);
    });

    // Fill in any missing dates
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const contribution = dateMap.get(dateStr) || {
        date: dateStr,
        count: 0,
        level: 0,
      };
      result.push(contribution);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  };

  const weeks = getContributionWeeks();

  if (loading) {
    // Create placeholder graph that fills available space
    const placeholderWeeks = Array(visibleWeeks)
      .fill(null)
      .map(() =>
        Array(7)
          .fill(null)
          .map(() => ({ level: 0 })),
      );

    return (
      <BentoCard>
        <div className="flex items-center justify-between">
          <BentoPill>
            <FiGithub className="mr-2 inline h-4 w-4 transition-all duration-300" />
            GitHub Contributions
          </BentoPill>
          <div className="text-foreground">
            <span className="animate-pulse text-sm font-medium">
              Loading contributions...
            </span>
          </div>
        </div>

        <div ref={containerRef} className="mt-5 h-full w-full">
          <div className="flex h-full w-full justify-center">
            <div ref={gridRef} className="flex gap-1 pb-2">
              {placeholderWeeks.map((week, weekIndex) => (
                <div
                  key={`placeholder-week-${weekIndex}`}
                  className="flex flex-col justify-start gap-1"
                >
                  {week.map((day, dayIndex) => (
                    <div
                      key={`placeholder-${weekIndex}-${dayIndex}`}
                      className="size-4 animate-pulse rounded-[4px] bg-gray-800"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </BentoCard>
    );
  }

  // Get the weeks to display based on visibleWeeks
  const displayWeeks = weeks.slice(-visibleWeeks);

  return (
    <BentoCard>
      <div className="flex items-center justify-between">
        <BentoPill>
          <FiGithub className="mr-2 inline h-4 w-4 transition-all duration-300" />
          GitHub Contributions
        </BentoPill>
        <div className="text-zinc-200">
          {hoveredDay ? (
            <span className="text-sm font-medium">
              {hoveredDay.count} commits on{" "}
              {new Date(hoveredDay.date).toLocaleDateString()}
            </span>
          ) : (
            <span className="text-sm font-medium">
              {totalCommits} total commits
            </span>
          )}
        </div>
      </div>

      <div ref={containerRef} className="mt-5 h-full w-full">
        {/* GitHub-style contribution grid that fills available space */}
        <div className="flex h-full w-full justify-center">
          <div ref={gridRef} className="flex gap-1 pb-2">
            {displayWeeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex flex-col justify-start gap-1"
              >
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`size-4 cursor-pointer rounded-[4px] border transition-all duration-200 hover:z-10 hover:scale-125 ${
                      day.level === 0
                        ? "border-[#242B30] bg-[#151C23]"
                        : day.level === 1
                          ? "border-[#184527] bg-[#0E3A17]"
                          : day.level === 2
                            ? "border-[#29743C] bg-[#226C2E]"
                            : day.level === 3
                              ? "border-[#3BA550] bg-[#37A043]"
                              : "border-[#5DD66D] bg-[#56D363]"
                    }`}
                    title={`${day.count} contribution${
                      day.count !== 1 ? "s" : ""
                    } on ${new Date(day.date).toLocaleDateString()}`}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="leading-wider text-navy-200/80 p-5 text-lg font-semibold">
        Code, commit, repeat - that's the routine.
      </div>
    </BentoCard>
  );
}
