import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import CandidateCard from "../components/CandidateCard";
import styles from "./SavedCandidates.module.css";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      try {
        const savedData = localStorage.getItem("githubJobCandidates");
        console.log("Raw data from localStorage:", savedData);
        if (savedData) {
          setSavedCandidates(JSON.parse(savedData));
        } else {
          console.log(
            "No candidates found in localStorage for key githubJobCandidates."
          );
        }
      } catch (error) {
        console.error("Failed to parse githubJobCandidates:", error);
        setSavedCandidates([]);
      }
    } else {
      console.warn("localStorage is not available.");
    }
  }, []);

  const removeFromStorage = (candidateId: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.id !== candidateId
    );
    console.log("Updated candidates:", updatedCandidates);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem(
      "githubJobCandidates",
      JSON.stringify(updatedCandidates)
    );
  };

  return (
    <div className={styles["saved-candidates-container"]}>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved yet.</p>
      ) : (
        <ul className={styles["candidate-list"]}>
          {savedCandidates.map((candidate) => {
            console.log("Rendering candidate:", candidate);
            return (
              <CandidateCard
                key={candidate.id}
                currentCandidate={candidate}
                removeFromStorage={removeFromStorage}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
