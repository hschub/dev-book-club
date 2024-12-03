export type DragAndDropQuestion_Answer =
  | {
      __typename: "CorrectAnswer";
      label: string;
      position: number;
    }
  | {
      __typename: "IncorrectAnswer";
      id: string;
      label: string;
    };

export type DragAndDropQuestion = {
  __typename: "DragAndDropQuestion";
  id: string;
  prompt: string;
  isWorkingRequired: boolean;
  marks: number;
  durationInSeconds: number;
  answers: Array<DragAndDropQuestion_Answer>;
};

export const exampleQuestion: DragAndDropQuestion = {
  __typename: "DragAndDropQuestion",
  id: "1",
  prompt: "The {{quick}} brown {{fox}} jumps over the lazy {{dog}}.",
  isWorkingRequired: false,
  marks: 1,
  durationInSeconds: 30,
  answers: [
    { __typename: "CorrectAnswer", position: 0, label: "quick" },
    { __typename: "CorrectAnswer", position: 1, label: "fox" },
    { __typename: "CorrectAnswer", position: 2, label: "dog" },
    { __typename: "IncorrectAnswer", id: "b82cedec", label: "cat" },
    { __typename: "IncorrectAnswer", id: "37fede4f", label: "rabbit" },
    { __typename: "IncorrectAnswer", id: "e3b4f1fd", label: "wolf" },
  ],
};

// {
//   kind: 'DragAndDropQuestion.Change',
//   itemIndex: 0,
//   items: [
//     {
//       draggableId: '1',
//       droppableId: '2', // 👈 Selected incorrect position
//       isExtractedFromMarkdown: true, // 👈 Possible correct option
//       value: 'one',
//     },
//     {
//       draggableId: '2',
//       droppableId: '1', // 👈 Selected incorrect position
//       isExtractedFromMarkdown: true, // 👈 Possible correct option
//       value: 'two',
//     },
//     {
//       draggableId: '3',
//       droppableId: '3', // 👈 Selected correct position
//       isExtractedFromMarkdown: true, // 👈 Possible correct option
//       value: 'three',
//     },
//   ],
//   selectedAnswers: ['two', 'one', 'three'],
// },

export const exampleSelectedAnswers = ["", "fox", ""];

export function exampleTest() {
  const sample = makeSample({
    id: "1",
    correct: ["quick", "fox", "dog"],
    incorrect: ["cat", "rabbit", "wolf"],
  });

  const question = sample.question;

  const selectedAnswers = sample.selectedAnswers(["", "fox", ""]);

  console.log(question, selectedAnswers);
}

export function makeSample({
  id,
  correct,
  incorrect,
}: {
  id: string;
  correct: string[];
  incorrect: string[];
}) {
  const prompt = makePrompt(correct);

  const answers: DragAndDropQuestion_Answer[] = [
    ...correct.map(makeCorrectAnswer),
    ...incorrect.map(makeIncorrectAnswer),
  ];

  const question = make({
    id,
    prompt,
    isWorkingRequired: false,
    answers: answers,
  });

  const validAnswers = [...correct, ...incorrect];

  // Example ["", "fox", ""]
  const selectedAnswers = (answers: string[]) => {
    if (answers.length !== correct.length) {
      throw new Error(
        `Invalid number of answers. ${
          correct.length
        } answers are required, choosing from ${answers.join(", ")}`
      );
    }
    for (const answer of answers) {
      const isValidAnswer =
        answer === "" ||
        validAnswers.find((validAnswer) => validAnswer === answer);
      if (!isValidAnswer) {
        throw new Error(
          `Invalid answer "${answer}". Valid answers are ${validAnswers.join(
            ", "
          )}`
        );
      }
    }
    return answers;
  };

  return {
    question,
    selectedAnswers,
  };
}

// type CorrectAnswer = "quick" |  "fox" |  "dog";
// type IncorrectAnswer = "quick" |  "fox" |  "dog";
// type Answer = CorrectAnswers | IncorrectAnswers;

export function makeSample2<
  const T extends {
    id: string;
    correct: string[];
    incorrect: string[];
  },
  CorrectAnswer = T["correct"] extends Array<infer U> ? U : never,
  IncorrectAnswer = T["incorrect"] extends Array<infer U> ? U : never,
  Answer = CorrectAnswer | IncorrectAnswer | ""
>({ id, correct, incorrect }: T) {
  const prompt = makePrompt(correct);

  const answers: DragAndDropQuestion_Answer[] = [
    ...correct.map(makeCorrectAnswer),
    ...incorrect.map(makeIncorrectAnswer),
  ];

  const question = make({
    id,
    prompt,
    isWorkingRequired: false,
    answers,
  });

  const selectedAnswers = (answers: Answer[]) => {
    if (answers.length !== correct.length) {
      throw new Error(
        `Invalid number of answers. ${
          correct.length
        } answers are required, choosing from ${answers.join(", ")}`
      );
    }
    return answers;
  };

  return {
    question,
    selectedAnswers,
  };
}

export function test() {
  const sample = makeSample2({
    id: "1",
    correct: ["zzz", "fox", "dog"],
    incorrect: ["cat", "rabbit", "wolf"],
  });

  const selectedAnswers = sample.selectedAnswers(["zzz", "fox", "dog"]);

  console.log(selectedAnswers);
}

function makePrompt(correctAnswers: string[]) {
  return correctAnswers.map((value) => `{{${value}}}`).join(" ... ");
}

function makeCorrectAnswer(
  word: string,
  index: number
): DragAndDropQuestion_Answer {
  return {
    __typename: "CorrectAnswer",
    position: index,
    label: word,
  };
}

function makeIncorrectAnswer(
  word: string,
  index: number
): DragAndDropQuestion_Answer {
  return {
    __typename: "IncorrectAnswer",
    id: `id-${index}`, // This is normally a UUID from the backend
    label: word,
  };
}

export function make(item?: Partial<DragAndDropQuestion>): DragAndDropQuestion {
  const base: DragAndDropQuestion = {
    __typename: "DragAndDropQuestion",
    id: "",
    prompt: "",
    isWorkingRequired: false,
    marks: 1,
    durationInSeconds: 0,
    answers: [],
  };
  return { ...base, ...item };
}
