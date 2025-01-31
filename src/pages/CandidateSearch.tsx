import { useState, useEffect } from "react";
import CandidateCard from "../components/CandidateCard";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNewCandidates = () => {
    setLoading(true);

    const randomSince = Math.floor(Math.random() * 10000);

    fetch(`https://api.github.com/users?since=${randomSince}&per_page=10`)
      .then((response) => response.json())
      .then((data) => {
        setCandidates(data);
        setCurrentIndex(0);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNewCandidates();
  }, []);

  const saveCandidate = (candidate: Candidate) => {
    console.log("Saving candidate:", candidate);

    const savedCandidates = JSON.parse(
      localStorage.getItem("githubJobCandidates") || "[]"
    );
    if (
      !savedCandidates.some((saved: Candidate) => saved.id === candidate.id)
    ) {
      const updatedCandidates = [...savedCandidates, candidate];
      localStorage.setItem(
        "githubJobCandidates",
        JSON.stringify(updatedCandidates)
      );
    }

    if (currentIndex + 1 >= candidates.length) {
      fetchNewCandidates();
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const skipCandidate = (id: number) => {
    console.log("Skipped:", id);

    if (currentIndex + 1 >= candidates.length) {
      fetchNewCandidates();
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (loading) {
    return <p>Loading candidates...</p>;
  }

  if (candidates.length === 0) {
    return <p>No more candidates available.</p>;
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <CandidateCard
        currentCandidate={candidates[currentIndex]}
        saveCandidate={saveCandidate}
        skipCandidate={skipCandidate}
      />
    </div>
  );
};

export default CandidateSearch;
