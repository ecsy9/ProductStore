import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen transition-colors duration-300" data-theme="synthwave">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;