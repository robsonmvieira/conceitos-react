import React, {useState, useEffect} from "react";

import "./styles.css";
import api from './services/api'

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(rep => {
      setRepositories(rep.data)
    })
   
  }, [])
  async function handleAddRepository() {
    const repository = await api.post("repositories", {
      title: "Repository",
      url: "github.com/robsonmaia",
      techs: ["NodeJs"]
    })

    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
     await api.delete(`repositories/${id}`)
     setRepositories(repositories.filter(rep => rep.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(item => 
          <li key={item.id}>
           
            <ul>
              <li>{ item.title}</li>
              <li>likes: { item.likes}</li>
            </ul>
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
          ) 
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
