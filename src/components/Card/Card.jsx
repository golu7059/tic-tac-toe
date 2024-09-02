import Icon from '../Icon/icon';
import './Card.css';

function Card({ gameEnd, player, onPlay, index }) {
  let icon = <Icon />;
  if (player === "x") {
    icon = <Icon name="cross" />;
  } else if (player === "o") {
    icon = <Icon name="circle" />;
  }
  
  return (
    <div className={`card ${player ? 'filled' : ''}`} onClick={() => !gameEnd && player === "" && onPlay(index)}>
      {icon}
    </div>
  );
}

export default Card;
