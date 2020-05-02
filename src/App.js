import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepos(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', { title: `Projeto numero: ${Date.now()}`, url: "qualquer coisa", techs: [] });
    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const items = repos.filter(item => item.id !== id)
    setRepos(items)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => {
          return (
            <li key={repo.id}>{repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
