import { useMutation, UseMutationResult } from "react-query";

interface SubmitScoreCardData {
  scoreSheetGroupId: number;
  playerMap: { [k: string]: any };
}

const submitScoreCard = async (endpoint: string, data: SubmitScoreCardData): Promise<any> => {
  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

interface UseSubmitScoreCardResult {
  submit: (data: SubmitScoreCardData) => Promise<void>;
  submissionResult: UseMutationResult<any, Error, SubmitScoreCardData>;
}

const useSubmitScoreCard = (endpoint: string): UseSubmitScoreCardResult => {
  const submissionResult = useMutation<any, Error, SubmitScoreCardData>((data) => submitScoreCard(endpoint, data), {});

  const submit = async (data: SubmitScoreCardData) => {
    submissionResult.mutate(data);
  };

  return {
    submit,
    submissionResult,
  };
};

export default useSubmitScoreCard;
