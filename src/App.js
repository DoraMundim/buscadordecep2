import {FiSearch} from 'react-icons/fi';
import './styles.css';
import {useState} from 'react'; 
import api from './api';


function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState ({});

  async function handleSearch () {
    if (input === '') {
      alert("Preencha algum cep!")
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert ("Ops erro ao buscar");
      setInput("");    
    }
    
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep..." value={input} onChange={(e) => setInput(e.target.value)}/>
        <button className="buttonSearch" onClick={handleSearch}><FiSearch size={25} color="#fff"/></button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>Cep: {cep.cep}</h2>
          <span>{cep.logradouro}</span>  
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.cidade}</span>
        </main>
        )}
      <div>
      </div>  
    </div>
  );
}

export default App;
