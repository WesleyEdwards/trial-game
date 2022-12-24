var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { collection, getDocs } from "../node_modules/firebase/firestore";
import { firebaseDb } from "./Firebase";
export const handleSubmitName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const scoresRef = collection(firebaseDb, "scores");
    const scoresSnapshot = yield getDocs(scoresRef);
});
export const fetchPlayerScores = () => __awaiter(void 0, void 0, void 0, function* () {
    const scoresRef = collection(firebaseDb, "scores");
    const scoresSnapshot = yield getDocs(scoresRef);
    const scoresList = scoresSnapshot.docs.map((doc) => doc.data());
    console.log(scoresList);
    return scoresList;
    //   return [
    //     { name: "John Doe", score: 100 },
    //     { name: "Jane Doe", score: 90 },
    //     { name: "Joe Doe", score: 80 },
    //     { name: "Jill Doe", score: 70 },
    //     { name: "Jack Doe", score: 60 },
    //   ];
});
