import { Link, useNavigate } from "react-router-dom";
import { FaGamepad, FaRobot, FaGlobe } from "react-icons/fa";
import { GiTicTacToe } from "react-icons/gi";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-black to-purple-900 p-16">
      {/* Game Title */}
      <div className="text-center mb-12">
        <GiTicTacToe className="text-9xl text-white animate-spin-slow mb-6 drop-shadow-lg animate-pulse" />
        <h1 className="text-6xl font-bold text-white tracking-wider drop-shadow-md">
          Tic-Tac-Toe
        </h1>
        <h3 className="text-xl sm:text-2xl text-gray-300 mt-2">
          Choose a mode to start playing
        </h3>
      </div>

      {/* Game Modes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 max-w-lg w-full ">
        {/* Online Mode */}
        <Link to="/room">
          <button className="bg-blue-500 bg-opacity-90 hover:bg-opacity-100 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center space-x-3 transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl hover:backdrop-blur">
            <FaGlobe className="text-3xl" />
            <span className="text-lg">Online</span>
          </button>
        </Link>

        {/* Offline Mode */}
        <Link to="/offline">
          <button className="bg-orange-500 bg-opacity-90 hover:bg-opacity-100 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center space-x-3 transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl hover:backdrop-blur">
            <FaGamepad className="text-3xl" />
            <span className="text-lg">Offline vs 2</span>
          </button>
        </Link>

        {/* Play vs Computer Mode */}
        <Link to="/computer">
          <button className="bg-green-500 bg-opacity-90 hover:bg-opacity-100 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center space-x-3 transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl hover:backdrop-blur">
            <FaRobot className="text-3xl" />
            <span className="text-lg">play with Computer</span>
          </button>
        </Link>
      </div>

      {/* Footer or Additional Info */}
      <footer className="mt-12 text-gray-400 text-sm sm:text-base">
        <p className="opacity-80 hover:opacity-100 transition-opacity duration-300 font-mono">
          Play, Enjoy, and Have Fun! ✨
        </p>
      </footer>
    </div>
  );
}

export default Home;
