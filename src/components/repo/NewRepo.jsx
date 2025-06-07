import React, { useState } from "react";
import axios from "axios";

const NewRepo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      await axios.post("http://localhost:3002/repo", {
        name,
        description,
        userId,
      });
      alert("Repository created!");
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Error creating repository:", err);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <input
        type="text"
        placeholder="Repository Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Create Repository</button>
    </form>
  );
};

export default NewRepo;
