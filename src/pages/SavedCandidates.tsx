// pages/SavedCandidates.tsx
import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import CandidateCard from "../components/CandidateCard";
import styles from "./SavedCandidates.module.css";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage on initial render
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("savedCandidates");
      if (savedData) {
        setSavedCandidates(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Failed to parse saved candidates:", error);
      setSavedCandidates([]); // Fallback to an empty state
    }
  }, []);

  // Remove candidate and update localStorage
  const removeFromStorage = (candidateId: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.id !== candidateId
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
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
