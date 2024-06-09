import { getScoreSheetDetails, getUserScoresByEventId } from "@/lib/scorecard";
import { getCourses } from "@/lib";

export type ScoreSheetGroupDetails = Awaited<ReturnType<typeof getScoreSheetDetails>>;
export type HoleWithPar = { par: number };
export type HoleWithDistance = { distance: number };
export type ScoreWithScore = { score: number };
export type CourseDetails = { score: number };
export type LayoutDetails = Awaited<ReturnType<typeof getCourses>>[number]["layouts"];
export type ScoreSheetDetails = Awaited<ReturnType<typeof getUserScoresByEventId>>[number]["scoreSheets"][number];