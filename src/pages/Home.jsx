import { Link , useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold">Tic-Tac-Toe</h1>
            <h3 className="text-2xl">Let's choose the mode to play</h3>

            <div className="flex space-x-4 mt-4">
                <Link to="/room">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Online</button>
                </Link>
                <Link to="/offline">
                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Offline</button>
                </Link>
                <Link to="/computer">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Computer</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;

