// src/app/scorecard/[id]/page.tsx
import ScoreSheetBuilder from "@/components/scorecard/ScoreSheetBuilder";
import ScoreTable from "@/components/scorecard/ScoreTable";
import Badge from "@/components/ui/Badge";
import PageWrapper from "@/components/ui/PageWrapper";
import { getScoreSheetAmountOwed, getScoreSheetDetails } from "@/lib/scorecard";
import { getCurrencyFormatter } from "@/lib/util";
import { Field, Fieldset, Input, Label } from "@headlessui/react";

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
  if (!scoreSheetGroup) {
    return <div>Oops! Score sheet not found...</div>;
  }

  const amountDue = getScoreSheetAmountOwed(scoreSheetGroup);
  const currencyFormatter = getCurrencyFormatter();

  return (
    <PageWrapper className="space-y-4">
      <div className="flex justify-start gap-2">
        <Badge className="text-lg" color="blue" label="Status:">
          {scoreSheetGroup.submitted ? "Submitted" : "Pending"}
        </Badge>

        {amountDue > 0 && (
          <Badge className="text-lg" color="red" label="Amount Due:">
            {currencyFormatter.format(amountDue)}
          </Badge>
        )}
      </div>

      {scoreSheetGroup.submitted && (
        <ScoreTable
          showPos={false}
          scoreSheets={scoreSheetGroup.scoreSheets}
          courseName={scoreSheetGroup.event.layout.course.name}
          layoutName={scoreSheetGroup.event.layout.name}
          holes={scoreSheetGroup.event.layout.holes}
        />
      )}

      {!scoreSheetGroup.submitted && (
        <ScoreSheetBuilder scoreSheets={scoreSheetGroup.scoreSheets} holes={scoreSheetGroup.event.layout.holes} />
      )}

      {/* Render event, scoreSheets, and payments as needed */}
    </PageWrapper>
  );
}
