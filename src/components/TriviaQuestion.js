import React from 'react';

const TriviaQuestion = ({question, correct,incorrect}) => {
    const allAnswers = [correct, ...incorrect]
   //need to shuffle answers and decode html to string

    return (
        <>
            <p>{question}</p>
            {allAnswers.map ((el, index) => {
                return <span key={index}>{el}</span>
            })}

        </>
    );
};

export default TriviaQuestion;
