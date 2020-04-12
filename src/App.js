import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [newRepository, setNewRepository] = useState("");

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("/repositories");
      setRepositories(response.data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: newRepository,
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repositoriesFiltered = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepositories(repositoriesFiltered);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Nome do repositório"
        onChange={(e) => setNewRepository(e.target.value)}
      />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
