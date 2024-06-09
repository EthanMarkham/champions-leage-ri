import { useQueryClient } from "react-query";
import useError from "@/hooks/useError";
import { usePlayer } from "@/hooks/usePlayer";
import useScoreCardPageState from "@/hooks/useScoreCardPageState";
import useUserSearch, { UserSearchRecord } from "@/hooks/useUserSearch";
import useSubmitScoreCard from "@/hooks/useSubmitScoreCard";

export { useError, usePlayer, useQueryClient, useScoreCardPageState, useUserSearch, useSubmitScoreCard };

export type { UserSearchRecord };
