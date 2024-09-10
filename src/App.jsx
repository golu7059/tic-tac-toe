import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import RoomPage from './pages/RoomPage';
import Game from './pages/Game';
import OfflinePlay from './pages/offlinePlay';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offline" element={<OfflinePlay />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/game/:roomId" element={<Game />} />
      </Routes>
    </Router>
  );
}
export default App;
