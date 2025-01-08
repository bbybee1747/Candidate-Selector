// pages/CandidateSearch.tsx
import { useState, FormEvent } from "react";
import { searchGithubUser } from "../api/API";
import type { Candidate } from "../interfaces/Candidate.interface";
import styles from "./CandidateSearch.module.css";

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    id: "",
    name: null,
    login: "",
    location: null,
    avatar_url: "",
    email: null,
    html_url: "",
    company: null,
  });

  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const saveCandidate = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    const isDuplicate = savedCandidates.some(
      (c: Candidate) => c.id === candidate.id
    );

    if (!isDuplicate) {
      savedCandidates.push(candidate);
      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    }
  };

  async function searchForCandidate(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    if (!searchInput.trim()) {
      setError("Please enter a valid GitHub username.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const candidate = await searchGithubUser(searchInput);
      if (
        candidate &&
        typeof candidate === "object" &&
        !Array.isArray(candidate)
      ) {
        setCurrentCandidate({
          id: candidate.id || null,
          name: candidate.name || null,
          login: candidate.login || "",
          location: candidate.location || null,
          avatar_url: candidate.avatar_url || "",
          email: candidate.email || null,
          html_url: candidate.html_url || "",
          company: candidate.company || null,
        });
      } else {
        throw new Error("Invalid candidate data returned from API.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("Error searching for candidate: " + err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles["candidate-search"]}>
      <h1>Search for a Candidate</h1>
      <form onSubmit={searchForCandidate}>
        <input
          type="text"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Enter GitHub username"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p className={styles["error-message"]}>{error}</p>}
      {currentCandidate.login && (
        <div className={styles["candidate-details"]}>
          <h2>Candidate Details</h2>
          <p>
            <strong>Name:</strong> {currentCandidate.name || "Not available"}
          </p>
          <p>
            <strong>Username:</strong> {currentCandidate.login}
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
            <strong>Avatar:</strong>{" "}
            <img
              src={currentCandidate.avatar_url}
              alt={`${currentCandidate.name || currentCandidate.login} avatar`}
              style={{ width: 100, height: 100, borderRadius: "50%" }}
            />
          </p>
          <p>
            <strong>Profile:</strong>{" "}
            <a
              href={currentCandidate.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {currentCandidate.html_url}
            </a>
          </p>
          <button
            className={styles["save-button"]}
            onClick={() => saveCandidate(currentCandidate)}
          >
            Save
          </button>
          <button
            className={styles["skip-button"]}
            onClick={() =>
              setCurrentCandidate({
                id: "",
                name: null,
                login: "",
                location: null,
                avatar_url: "",
                email: null,
                html_url: "",
                company: null,
              })
            }
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
