import styles from "./CandidateCard.module.css";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { Candidate } from "../interfaces/Candidate.interface";

interface CandidateCardProps {
  currentCandidate: Candidate;
  saveCandidate?: (candidate: Candidate) => void;
  skipCandidate?: (id: number) => void;
  removeFromStorage?: (candidateId: number) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  currentCandidate,
  saveCandidate,
  skipCandidate,
  removeFromStorage,
}) => {
  console.log("Rendering candidate:", currentCandidate);

  return (
    <li className={styles["candidate-card"]}>
      <img
        src={currentCandidate.avatar_url || "default-avatar.png"}
        alt={`${currentCandidate.name || currentCandidate.login} avatar`}
        className={styles["candidate-avatar"]}
      />
      <div className={styles["candidate-details"]}>
        <h2>{currentCandidate.name || currentCandidate.login}</h2>
        <p>
          <strong>Username:</strong> {currentCandidate.login || "N/A"}
        </p>
        <p>
          <strong>Location:</strong>{" "}
          {currentCandidate.location || "Not available"}
        </p>
        <p>
          <strong>Email:</strong> {currentCandidate.email || "Not available"}
        </p>
        <p>
          <strong>Company:</strong>{" "}
          {currentCandidate.company || "Not available"}
        </p>
        <p>
          <strong>Profile:</strong>{" "}
          <a
            href={currentCandidate.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {currentCandidate.html_url || "Not available"}
          </a>
        </p>
      </div>
      <div className={styles["action-buttons"]}>
        {saveCandidate && (
          <FaPlusCircle
            className={styles["save-icon"]}
            onClick={() => saveCandidate(currentCandidate)}
          />
        )}
        {skipCandidate && (
          <FaMinusCircle
            className={styles["skip-icon"]}
            onClick={() => skipCandidate(currentCandidate.id)}
          />
        )}
        {removeFromStorage && (
          <button
            className={styles["remove-button"]}
            onClick={() => removeFromStorage(currentCandidate.id)}
          >
            Remove
          </button>
        )}
      </div>
    </li>
  );
};

export default CandidateCard;
