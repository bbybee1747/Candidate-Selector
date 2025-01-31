import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import CandidateCard from "../components/CandidateCard";
import styles from "./SavedCandidates.module.css";

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("githubJobCandidates");
      if (savedData) {
        const parsedCandidates: Candidate[] = JSON.parse(savedData);
        if (Array.isArray(parsedCandidates)) {
          setSavedCandidates(parsedCandidates);
        } else {
          console.error(
            "Invalid format in localStorage for githubJobCandidates."
          );
        }
      }
    } catch (error) {
      console.error("Error loading candidates from localStorage:", error);
    }
  }, []);

  const removeFromStorage = (candidateId: number) => {
    setSavedCandidates((prevCandidates) => {
      const updatedCandidates = prevCandidates.filter(
        (candidate) => candidate.id !== candidateId
      );
      localStorage.setItem(
        "githubJobCandidates",
        JSON.stringify(updatedCandidates)
      );
      return updatedCandidates;
    });
  };

  return (
    <div className={styles["saved-candidates-container"]}>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved yet.</p>
      ) : (
        <ul className={styles["candidate-list"]}>
          {savedCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              currentCandidate={candidate}
              removeFromStorage={removeFromStorage}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
