import { getScoreSheetDetails } from "@/lib";
import ScoreCardPage from "@/components/features/ScoreCardPage";
import { parseAndValidateId } from "@/utils/util";
import ScoreCardContextWrapper from "@/contexts/ScoreCardContextWrapper";

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

  return (
    <ScoreCardContextWrapper>
      <ScoreCardPage scoreSheetGroup={scoreSheetGroup} />
    </ScoreCardContextWrapper>
  );
}
