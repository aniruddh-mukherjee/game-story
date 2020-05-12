import React, { useContext, useState } from 'react';
import { GameContext } from '../context/gameContext';
import "bootstrap/dist/css/bootstrap.min.css";
import { FormGroup, Form, Input, Label, Button } from 'reactstrap';
import firebase from 'firebase/app';
import { v4 } from 'uuid';

const GameInfo = () => {

    const { state } = useContext(GameContext);
    const {game} = state;
    const {gameKey} = state;

    const [comment, setComment] = useState('');
    const [upvote, setUpvote] = useState('');

    const addComment = async () => {
        try{
            firebase.database()
            .ref(`games/${gameKey}/discussions/`)
            .child("comments/")
            .set({
                comment,
                upvote
            })
        } catch(error) {
            console.log(error)
            alert(error)
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        addComment();
        alert("Success");
    }
    

    return(
        <>
            <div className="title-box">
                <p className="title-text">{game?.title}</p>
            </div>
            <div className="t-i-box">
                <div className="trailor">
                <iframe className='trailor-frame' src={`https://www.youtube.com/embed/${game?.videoID}?autoplay=1&controls=0&enablejsapi=1&fs=0&loop=1&modestbranding=1&color=white&iv_load_policy=3&showinfo=0`} frameborder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture"  allowfullscreen></iframe>
                </div>
                <div className="basic-info">
                    <div className="basic-form">
                        <p className="form-label">Available On : <span className="answer">{game?.available}</span> </p>
                        <p className="form-label">Developer : <span className="answer">{game?.developer}</span> </p>
                        <p className="form-label">Released : <span className="answer">{game?.releasedate}</span> </p>
                        <p className="form-label">Genre : <span className="answer">{game?.genre}</span> </p>
                    </div>
                </div>
            </div>
            <div className="main-box">
                <p className="form-label">Storyline:</p>
                <div className="story-out">
                    <p className="story-text">{game?.storyline}</p> 
                </div>
            </div>

            <div className="dis-box">
                <div className="dis-title">
                    <p>Discussions</p>
                </div>

                <div className="add-com-box">
                    <Form onSubmit={handleSubmit} className="add-com-form">
                        <FormGroup>
                            <Label id="comment" className="hidden"></Label>
                            <Input
                                className="story-input"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                type="textarea"
                                placeholder="Add your thoughts..."
                            />
                        </FormGroup>
                        <Button type="submit" className="button-box">
                            <p className="button-text">Submit</p>
                        </Button>
                    </Form>
                </div>

            </div>
        </>
    )
}
export default GameInfo;
