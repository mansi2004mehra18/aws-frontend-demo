import React, { useState } from "react";
import axios from "axios";

const NewIssue = ({ repoId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3002/issue`, {
        repoId,
        title,
        description,
      });
      alert("Issue created successfully!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error creating issue:", err);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <input
        type="text"
        placeholder="Issue Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Create Issue</button>
    </form>
  );
};

export default NewIssue;
