// src/app/scorecard/[id]/page.tsx
import ScoreTable from "@/components/scorecard/ScoreTable";
import { getScoreSheetDetails } from "@/lib/scorecard";

interface Params {
  id: string;
}

function parseAndValidateId(id: string | string[] | undefined): number | null {
  if (id === undefined || Array.isArray(id)) {
    console.error("ID should be a single string, received:", id);
    return null;
  }

  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    console.error("ID is not a valid number:", id);
    return null;
  }

  return numericId;
}

async function fetchScoreSheetGroup(id: string) {
  const numericId = parseAndValidateId(id);
  if (numericId === null) {
    return null;
  }
  const scoreSheetGroup = await getScoreSheetDetails(numericId);
  return scoreSheetGroup;
}

export const revalidate = 3600; // revalidate the data at most every hour

export default async function ScoreCardPage({ params }: { params: Params }) {
  const scoreSheetGroup = await fetchScoreSheetGroup(params.id);
  console.log(scoreSheetGroup);

  if (!scoreSheetGroup) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Score Sheet Group: {scoreSheetGroup.roundHash}</h1>
      <ScoreTable
        scoreSheets={scoreSheetGroup.scoreSheets}
        courseName={scoreSheetGroup.event.layout.course.name}
        layoutName={scoreSheetGroup.event.layout.name}
        holes={scoreSheetGroup.event.layout.holes}
      />
      {/* Render event, scoreSheets, and payments as needed */}
    </div>
  );
}

