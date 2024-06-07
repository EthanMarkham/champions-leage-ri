import { getScoreSheetDetails } from "@/lib/scorecard";
import ScoreCardPage from "@/components/features/ScoreCardPage";
import { parseAndValidateId } from "@/lib/util";

async function fetchScoreSheetGroup(id: string) {
  const numericId = parseAndValidateId(id);
  if (numericId === null) {
    return null;
  }
  const scoreSheetGroup = await getScoreSheetDetails(numericId);
  return scoreSheetGroup;
}

interface ServerProps {
  params: {
    id: string;
  };
}

export default async function ScoreCardPageServer({ params }: ServerProps) {
  const scoreSheetGroup = await fetchScoreSheetGroup(params.id);

  if (!scoreSheetGroup) {
    return <div className="alert alert-error">Oops! Score sheet not found...</div>;
  }

  return <ScoreCardPage scoreSheetGroup={scoreSheetGroup} />;
}
