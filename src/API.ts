export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type questionState = Question & { answer: string[] };

export enum Dificulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (
  amount: number,
  dificulty: Dificulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${dificulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  console.log(data);
  return data.results.map((question: Question) => ({
    ...question,
    answer: [...question.incorrect_answers, question.correct_answer],
  }));
};
