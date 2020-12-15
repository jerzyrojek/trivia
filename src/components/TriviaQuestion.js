import React from 'react';

const TriviaQuestion = ({question, correct, incorrect}) => {
    const Entities = require('html-entities').AllHtmlEntities;
    const entities = new Entities();
    let allAnswers = [correct, ...incorrect]
        .sort()
        .reverse();
    //Making sure the order of answers is always the same for True/False questions

    allAnswers.forEach(answer => entities.decode(answer));

    if (allAnswers.length > 2) {
        allAnswers = allAnswers.sort(() => {
            return 0.5 - Math.random()
        });
    }
    //shuffling answers if there are more than 2, so the right one isn't always in the same place

    const handleOnClick = (e) => {
        if (e.target.value === correct) {
            console.log("Dobra odpowiedź")
        } else {
            console.log("Zła odpowiedź")
        }
    }


    return (
        <>
            <p>{entities.decode(question)}</p>
            {allAnswers.map((el, index) => {
                return <button value={el} onClick={handleOnClick} key={index}>{el} </button>
            })}

        </>
    );
};

export default TriviaQuestion;
