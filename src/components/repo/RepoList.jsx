import React, { useEffect, useState } from "react";
import axios from "axios";

const RepoList = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const res = await axios.get(`http://localhost:3002/repo/user/${userId}`);
        setRepos(res.data.repositories);
      } catch (err) {
        console.error("Error fetching repos:", err);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div>
      <h2>Your Repositories</h2>
      {repos.map((repo) => (
        <div key={repo._id}>
          <h4>{repo.name}</h4>
          <p>{repo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
