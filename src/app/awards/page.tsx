import AwardsClient from "@/components/awards/AwardsClient";
import { getAwardsData } from "@/lib/awards-data";

export default function AwardsPage() {
  // Load awards data on the server with await since it's now async
  const awardsData = getAwardsData();

  return <AwardsClient awards={awardsData} />;
}
