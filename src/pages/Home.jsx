import { Link, useNavigate } from "react-router-dom";
import { FaGamepad, FaRobot, FaGlobe } from "react-icons/fa";
import { GiTicTacToe } from "react-icons/gi";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-900 p-4">
      {/* Game Title */}
      <div className="text-center mb-8">
        <GiTicTacToe className="text-8xl text-white animate-pulse mb-4" />
        <h1 className="text-6xl font-bold text-white tracking-wider">Tic-Tac-Toe</h1>
        <h3 className="text-2xl text-gray-300 mt-2">Choose a mode to play</h3>
      </div>

      {/* Game Modes */}
      <div className="flex space-x-6 mt-6">
        {/* Online Mode */}
        <Link to="/room">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300">
            <FaGlobe className="text-2xl" />
            <span className="text-xl">Online</span>
          </button>
        </Link>

        {/* Offline Mode */}
        <Link to="/offline">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300">
            <FaGamepad className="text-2xl" />
            <span className="text-xl">Offline</span>
          </button>
        </Link>

        {/* Play vs Computer Mode */}
        <Link to="/computer">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300">
            <FaRobot className="text-2xl" />
            <span className="text-xl">Computer</span>
          </button>
        </Link>
      </div>

      {/* Footer or Additional Info */}
      <footer className="mt-12 text-gray-400">
        <p>Play, Enjoy, and Have Fun!</p>
      </footer>
    </div>
  );
}

export default Home;
