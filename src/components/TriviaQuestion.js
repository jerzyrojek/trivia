import React, {useState, useEffect} from 'react';

const TriviaQuestion = ({question, correct, incorrect, updateScore}) => {
    const Entities = require('html-entities').AllHtmlEntities;
    const entities = new Entities();
    const [chosen, setChosen] = useState(false);

    let allAnswers = [correct, ...incorrect]
        .sort()
        .reverse();
    //Making sure the order of answers is always the same for True/False questions

    useEffect(() => {
        setChosen(false);
        if (allAnswers.length > 2) {
            allAnswers.sort(() => {
                return 0.5 - Math.random()
            });
        }
        //shuffling answers if there are more than 2, so the right one isn't always in the same place
    }, [question])


    const handleOnClick = (e) => {
        setChosen(true);
        if (e.target.value === correct) {
            updateScore();
        } else {
        }
    }


    return (
        <>
            <p>{entities.decode(question)}</p>
            {allAnswers.map((el, index) => {
                return <button disabled={chosen}
                               className={
                                   chosen ?
                                       el === correct ? "goodAnswer" : "wrongAnswer"
                                       : null
                               }
                               value={el} onClick={handleOnClick} key={index}>{entities.decode(el)} </button>
            })}

        </>
    );
};

export default TriviaQuestion;
