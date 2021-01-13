import React from 'react';
import {useHistory} from "react-router-dom";
import ResultMessage from "./ResultMessage";

const ResultPage = (props) => {
    const history = useHistory();
    const finalScore = props.location.state.finalScore;
    const totalPointsPool = props.location.state.maxScore;
    const playAgain = () => {
        history.push("/")
    }

    return (
        <div className="results">
            <div className="container results__content">
                <h1 className="display-2">You got <span className="text-warning">{finalScore}</span> {finalScore !== 1 ? "points" : "point"}</h1>
                <ResultMessage score={finalScore} maxScore={totalPointsPool}/>
                <button className="btn btn-lg btn-primary" onClick={playAgain}>Play again</button>
            </div>
        </div>
    );
};

export default ResultPage;
