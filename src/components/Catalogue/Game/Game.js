import { Link } from "react-router-dom";

const Game = ({game}) => {
        return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={game.imageUrl} alt="pic"/>
                <h6>{game.category}</h6>
                <h2>{game.title}</h2>
                <Link to={`/catalogue/${game._id}`} className="details-button">
                    Details
                </Link>
            </div>
        </div>
    );
};

export default Game;