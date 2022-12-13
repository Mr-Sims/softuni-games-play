import { useParams, Link } from 'react-router-dom';
import Comment from './Comment/Comment';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { GameContext } from '../../context/gameContext';
import * as gamesService from '../../services/gameService';
import * as commentService from '../../services/commentService';

const Details = () => {
    const { addComment, fetchGameDetails, selectGame } = useContext(GameContext)
    const { user } = useContext(AuthContext)
    
    const { gameId } = useParams();

    const currentGame = selectGame(gameId);

    useEffect(() => {
        gamesService.getOne(gameId)
            .then(result=> {
                fetchGameDetails(gameId, result) 
            });
    }, [])

    const addCommentHandler = (e) => { 
        e.preventDefault();
        const formData = new FormData(e.target)
        const comment = formData.get('comment')
       
        commentService.create(gameId, comment)
            .then(result => {
                 addComment(gameId, comment)
            });
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
                            <li className="comment"><p>{x}</p></li>
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
                        <Link to="#" className="button">
                            Delete
                        </Link>
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