import { useState } from 'react';
import {useParams, Link} from 'react-router-dom';
import Comment from './Comment/Comment';


const Details = ({
    games,
    addComment
}) => {
    const { gameId } = useParams();
    const [comment, setComment] = useState({
        username: '', 
        comment: ''
    });

    const game = games.find(x => x._id === gameId);
    console.log(game)
    
    const addCommentHandler = (ev) => {
        ev.preventDefault();
        const commentObject = `${comment.username}: ${comment.comment}`
        addComment(gameId, commentObject)
        // console.log(commentObject)
        // ev.preventDefault();
        comment.username = ''
        comment.comment = ''
        
    }

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt="game pic"/>
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">{game.summary}</p>
         
         
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments  ? game.comments.map((c , i) => <Comment key={i}  comment={c}/>)
                        : <p className="no-comment">No comments.</p>
                        }    
                    </ul>
                </div>


                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                    <Link to="#" className="button">
                        Edit
                    </Link>
                    <Link to="#" className="button">
                        Delete
                    </Link>
                </div>
            </div>

            
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <input 
                        type="text"
                        name='username'
                        placeholder='Name'
                        onChange={onChange}
                        value={comment.username}
                    />
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment.comment}
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