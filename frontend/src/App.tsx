import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MapView from './pages/MapView';
import SpotDetail from './pages/SpotDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-warm-white flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/spot/:id" element={<SpotDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App