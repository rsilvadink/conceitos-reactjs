import React, { useState, useEffect } from 'react';
import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repo ${Date.now()}`,
      url: 'https://github.com/rsilvadink/conceitos-reactjs',
      techs: ['NodeJS', 'React JS'],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const repoIndex = repositories.findIndex(
        (repository) => repository.id === id
      );
      repositories.splice(repoIndex, 1);
      setRepositories([...repositories], repositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button
              type="button"
              onClick={() => handleRemoveRepository(repo.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
