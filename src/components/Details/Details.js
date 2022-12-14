import { useParams, Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { GameContext } from '../../context/gameContext';
import * as gamesService from '../../services/gameService';
import * as commentService from '../../services/commentService';
import { useNavigate } from 'react-router-dom';


const Details = () => {
    const navigate = useNavigate();
    const { addComment, fetchGameDetails, selectGame, removeGame } = useContext(GameContext);
    const { user } = useContext(AuthContext);
    
    const { gameId } = useParams();

    const currentGame = selectGame(gameId);

    useEffect(() => {

        (async () => {
            const gameDetails = await gamesService.getOne(gameId);
            const gameComments = await commentService.getByGameId(gameId);

            fetchGameDetails(gameId, { ...gameDetails, comments: gameComments.map(x => `${x.user.email}: ${x.text}`) }); 
        })();
    }, [])

    const addCommentHandler = (e) => { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const comment = formData.get('comment');
       
        commentService.create(gameId, comment)
            .then(result => {
                 addComment(gameId, comment)
            });
    };

    const gameDeleteHandler = () => {
        const confirmation = window.confirm('Are you sure you want to delete this game?');
        if(confirmation) {
            gamesService.remove(gameId)
                .then(() => {
                    removeGame(gameId)
                    navigate('/catalogue')
                });
        }
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={currentGame.imageUrl} alt="game pic" />
                    <h1>{currentGame.title}</h1>
                    <span className="levels">MaxLevel: {currentGame.maxLevel}</span>
                    <p className="type">{currentGame.category}</p>
                </div>
                <p className="text">{currentGame.summary}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {currentGame.comments?.map(x =>
                            <li key={x} className="comment">
                                <p>{x}</p>
                            </li>
                        )}
                    </ul>
                        {!currentGame.comments && 
                            <p className="no-comment">No comments.</p>}

                </div>

                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                {user._id === currentGame._ownerId 
                    ? <div className="buttons">
                        <Link to={`/edit/${gameId}`} className="button">
                            Edit
                        </Link>
                        <button onClick={gameDeleteHandler} className="button">
                            Delete
                        </button>
                    </div>
                    : null    
            }
            </div>

                        {/* TODO: the whole create-comment job should be in a nother component! */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                  
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};

export default Details;