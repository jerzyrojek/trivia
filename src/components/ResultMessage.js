import React from 'react';

const ResultMessage = ({score, maxScore}) => {
    const pointsPercentage = (score / 100) * maxScore;

    const message = () => {
        if (pointsPercentage <= 0.4) {
            return "It appears you need to play more video games!"
        } else if (pointsPercentage <= 0.7) {
            return "Not bad! That's a very decent score!"
        } else if (pointsPercentage <= 0.9) {
            return "Great score! You've played a lot of games in your life!"
        } else if (pointsPercentage === 1) {
            return "Wow, a perfect score! Congratulations, but you should probably go out more!"
        }
    }

    return (
        <div className="results__content-message">
            <p className="display-4">{message()}</p>
        </div>
    );
};

export default ResultMessage;
