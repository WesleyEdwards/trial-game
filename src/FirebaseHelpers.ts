import { collection, getDocs } from "../node_modules/firebase/firestore";
import { firebaseDb } from "./Firebase";
import { PlayerScore } from "./models";

export const handleSubmitName = async (name: string) => {
  const scoresRef = collection(firebaseDb, "scores");
  const scoresSnapshot = await getDocs(scoresRef);
};

export const fetchPlayerScores = async (): Promise<PlayerScore[]> => {
  const scoresRef = collection(firebaseDb, "scores");
  const scoresSnapshot = await getDocs(scoresRef);
  const scoresList = scoresSnapshot.docs.map((doc) => doc.data());

  console.log(scoresList);
  return scoresList as PlayerScore[];
  //   return [
  //     { name: "John Doe", score: 100 },
  //     { name: "Jane Doe", score: 90 },
  //     { name: "Joe Doe", score: 80 },
  //     { name: "Jill Doe", score: 70 },
  //     { name: "Jack Doe", score: 60 },
  //   ];
};
