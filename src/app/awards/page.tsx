import { Metadata } from "next";
import { getAwardsData } from "@/lib/awards-data";
import AwardsSection from "@/sections/awards/AwardsSection";

export const metadata: Metadata = {
  title: "Honors & Awards",
  description: "My professional honors, awards, and recognitions",
};

export default function AwardsPage() {
  const awards = getAwardsData();

  return (
    <main className="topPageMargin">
      <AwardsSection awards={awards} />
    </main>
  );
}
