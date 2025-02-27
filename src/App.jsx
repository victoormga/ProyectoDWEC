import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';

function Home() {
  return (
    <div className='text-center p-10 bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center relative'>
      <h1 className='text-4xl font-bold mb-4 animate-pulse'>
        Bienvenido al Proyecto
      </h1>
      <p className='text-lg mb-6'>Gestiona tus datos de manera sencilla.</p>
      <Link
        to='/items'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300'
      >
        Ir a Items
      </Link>
      <div className='absolute bottom-0 left-0 w-full h-1/3 error-bg'></div>
    </div>
  );
}

function Items() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!input.trim()) return;
    setItems([...items, input]);
    setInput('');
  };

  const deleteItem = (index) => {
    if (!window.confirm('¿Seguro que quieres eliminar este ítem?')) return;
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className='p-10 bg-gray-100 min-h-screen flex flex-col items-center relative'>
      <h2 className='text-3xl font-semibold mb-4'>Gestión de Ítems</h2>
      <div className='flex space-x-2 mb-4'>
        <input
          className='border p-2 rounded-md shadow-md focus:ring focus:ring-blue-300'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300'
          onClick={addItem}
        >
          Agregar
        </button>
      </div>
      <ul className='w-1/2 bg-white shadow-lg rounded-lg divide-y divide-gray-300 space-y-4'>
        {items.map((item, index) => (
          <li
            key={index}
            className='flex justify-between p-6 hover:bg-gray-200 shadow-md rounded-lg'
          >
            {item}
            <button
              className='text-red-500 hover:text-red-700 font-bold'
              onClick={() => deleteItem(index)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>

      <Link to='/' className='mt-6 text-blue-500 hover:underline'>
        Volver a Inicio
      </Link>
      <div className='absolute bottom-0 left-0 w-full h-1/3 error-bg'></div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/items' element={<Items />} />
      </Routes>
    </Router>
  );
}

export default App;

// Estilos adicionales
const styles = document.createElement('style');
styles.innerHTML = `
  .error-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 33%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f0b608' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  }
`;
document.head.appendChild(styles);
