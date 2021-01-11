import React from 'react';
import {useHistory} from "react-router-dom";

const ResultPage = (props) => {
    const history = useHistory();
    const finalScore = props.location.state.finalScore;
    const playAgain = () => {
        history.push("/")
    }

    return (
        <div className="results">
            <div className="container results__content">
                <h1>You scored {finalScore} {finalScore !== 1 ? "points" : "point"}</h1>
                <button className="btn btn-primary" onClick={playAgain}>Play again</button>
            </div>
        </div>
    );
};

export default ResultPage;
