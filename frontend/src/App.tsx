import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MapView from './pages/MapView';
import ListView from './pages/ListView';
import Community from './pages/Community';
import SpotDetail from './pages/SpotDetail';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<MapView />} />
          <Route path="/list" element={<ListView />} />
          <Route path="/community" element={<Community />} />
          <Route path="/spot/:id" element={<SpotDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
