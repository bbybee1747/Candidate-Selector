import { useState, useEffect, FormEvent } from "react";
import { searchGithubUser } from "../api/API";
import type { Candidate } from "../interfaces/Candidate.interface";
import styles from "./CandidateSearch.module.css";

const defaultCandidate: Candidate = {
  id: "",
  name: null,
  login: "",
  location: null,
  avatar_url: "",
  email: null,
  html_url: "",
  company: null,
};

const shuffleArray = (array: Candidate[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] =
    useState<Candidate>(defaultCandidate);
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  const [candidateQueue, setCandidateQueue] = useState<Candidate[]>([]);

  const fetchNextCandidate = async () => {
    try {
      setLoading(true);
      setError("");

      if (candidateQueue.length > 0) {
        setCurrentCandidate(candidateQueue.shift()!);
        setCandidateQueue([...candidateQueue]);
        return;
      }

      const response = await fetch(
        "https://api.github.com/search/users?q=repos:>1&per_page=50&sort=joined&order=desc",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GitHub API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const users = data.items;

      if (!users || users.length === 0) {
        throw new Error("No candidates found.");
      }
      const candidates: Candidate[] = await Promise.all(
        users.map(
          (user: { login: string }): Promise<Candidate> =>
            searchGithubUser(user.login)
        )
      );
      setCandidateQueue(shuffleArray(candidates.filter(Boolean)));

      setCandidateQueue(shuffleArray(candidates.filter(Boolean)));
      setCurrentCandidate(candidates[0]);
    } catch (err) {
      console.error("Fetch Next Candidate Error:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = (candidate: Candidate) => {
    const savedKey = "githubJobCandidates";
    const savedCandidates = JSON.parse(localStorage.getItem(savedKey) || "[]");

    if (!savedCandidates.some((c: Candidate) => c.id === candidate.id)) {
      savedCandidates.push(candidate);
      localStorage.setItem(savedKey, JSON.stringify(savedCandidates));
    }

    fetchNextCandidate();
  };

  const searchForCandidate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchInput.trim()) {
      setError("Please enter a valid GitHub username.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const candidate = await searchGithubUser(searchInput);
      if (!candidate) {
        throw new Error("No candidate found with the given username.");
      }
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
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

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
            <strong>Avatar:</strong>
            <img
              src={currentCandidate.avatar_url}
              alt={`${currentCandidate.name || currentCandidate.login} avatar`}
              className={styles.avatar}
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
            onClick={() => {
              window.scrollTo(0, 0);
              fetchNextCandidate();
            }}
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
