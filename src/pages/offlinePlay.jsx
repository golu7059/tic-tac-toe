import Grid from "../components/Grid/Grid";
import { FaGamepad } from "react-icons/fa";
import { Link } from "react-router-dom";

function OfflinePlay() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      {/* Header */}
      <header className="mb-8 flex flex-col items-center space-y-3 text-center">
        <FaGamepad className="text-6xl sm:text-7xl text-orange-500 animate-pulse" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest">
          Offline Play
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 tracking-wide">
          Challenge yourself in a classic Tic-Tac-Toe game
        </p>
      </header>

      {/* Game Grid */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <Grid numberOfCards={9} />
      </div>

      {/* Back Button */}
      <div className="mt-10">
        <Link to="/">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full flex items-center space-x-2 transition-transform duration-300 transform hover:scale-105">
            <FaGamepad className="text-lg" />
            <span>Back to Home</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OfflinePlay;
