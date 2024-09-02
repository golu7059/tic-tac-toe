import Icon from '../Icon/icon';

function Card({ gameEnd, player, onPlay, index }) {
  let icon = <Icon />;
  if (player === "x") {
    icon = <Icon name="cross" className="text-red-500" />;
  } else if (player === "o") {
    icon = <Icon name="circle" className="text-green-500" />;
  }

  return (
    <div 
      className={`card flex items-center justify-center rounded-lg shadow-md transition-all duration-300 transform ${
        player ? 'filled cursor-not-allowed opacity-80' : 'hover:shadow-xl hover:scale-105 cursor-pointer'
      } w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 ${
        player === 'o' ? 'bg-red-200' : player === 'x' ? 'bg-green-200' : 'bg-white'
      }`}
      onClick={() => !gameEnd && player === "" && onPlay(index)}
    >
      {icon}
    </div>
  );
}

export default Card;
