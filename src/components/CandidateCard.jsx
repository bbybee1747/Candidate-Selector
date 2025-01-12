import styles from "./CandidateCard.module.css";

const CandidateCard = ({ currentCandidate, removeFromStorage }) => {

  console.log("Rendering candidate:", currentCandidate);

  const handleRemove = () => {
    removeFromStorage(currentCandidate.id);
  };

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
          <strong>Location:</strong> {currentCandidate.location || "Not available"}
        </p>
        <p>
          <strong>Email:</strong> {currentCandidate.email || "Not available"}
        </p>
        <p>
          <strong>Company:</strong> {currentCandidate.company || "Not available"}
        </p>
        <p>
          <strong>Profile:</strong>{" "}
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            {currentCandidate.html_url || "Not available"}
          </a>
        </p>
      </div>
      <button className={styles["remove-button"]} onClick={handleRemove}>
        Remove
      </button>
    </li>
  );
};

export default CandidateCard;
