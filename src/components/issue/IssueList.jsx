import React, { useEffect, useState } from "react";
import axios from "axios";

const IssueList = ({ repoId }) => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/issue/${repoId}`);
        setIssues(res.data.issues);
      } catch (err) {
        console.error("Error fetching issues:", err);
      }
    };

    if (repoId) fetchIssues();
  }, [repoId]);

  return (
    <div>
      <h3>Issues</h3>
      {issues.map((issue) => (
        <div key={issue._id} style={{ borderBottom: "1px solid gray" }}>
          <p><strong>{issue.title}</strong></p>
          <p>{issue.description}</p>
        </div>
      ))}
    </div>
  );
};

export default IssueList;
