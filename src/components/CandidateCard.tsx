// components/CandidateCard.tsx
import { Candidate } from "../interfaces/Candidate.interface";
import styles from "./CandidateCard.module.css";

interface CandidateCardProps {
  currentCandidate: Candidate;
  removeFromStorage: (candidateId: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  currentCandidate,
  removeFromStorage,
}) => {
  return (
    <li className={styles["candidate-card"]}>
      <img
        src={
          currentCandidate.avatar_url ||
          "https://via.placeholder.com/150?text=No+Avatar"
        }
        alt={`Avatar of ${
          currentCandidate.name || currentCandidate.login || "unknown user"
        }`}
        className={styles["candidate-avatar"]}
      />
      <div className={styles["candidate-details"]}>
        <h2>
          {currentCandidate.name || currentCandidate.login || "Unknown User"}
        </h2>
        <p>
          <strong>Username:</strong> {currentCandidate.login || "Not available"}
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
      <button
        className={styles["remove-button"]}
        onClick={() => removeFromStorage(currentCandidate.id)}
        aria-label={`Remove candidate ${
          currentCandidate.name || currentCandidate.login
        }`}
      >
        Remove
      </button>
    </li>
  );
};

export default CandidateCard;
