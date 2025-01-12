// pages/SavedCandidates.tsx
import { useEffect, useState } from "react";
import CandidateCard from "../components/CandidateCard";
import styles from "./SavedCandidates.module.css";
const SavedCandidates = () => {
    const [savedCandidates, setSavedCandidates] = useState([]);
    useEffect(() => {
        // Load saved candidates from local storage
        const savedCandidates = localStorage.getItem("savedCandidates");
        if (savedCandidates) {
            setSavedCandidates(JSON.parse(savedCandidates));
        }
    }, []);
    const removeFromStorage = (candidateId) => {
        const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== candidateId);
        setSavedCandidates(updatedCandidates);
        localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
    };
    return (<div className={styles["saved-candidates-container"]}>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (<p>No candidates saved yet.</p>) : (<ul className={styles["candidate-list"]}>
          {savedCandidates.map((candidate) => (<CandidateCard key={candidate.id} currentCandidate={candidate} removeFromStorage={removeFromStorage}/>))}
        </ul>)}
    </div>);
};
export default SavedCandidates;
