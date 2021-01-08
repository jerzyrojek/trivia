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
        }
    }


    return (
        <div className="trivia__questions-item">
            <h3 className="text-light">{entities.decode(question)}</h3>
            {allAnswers.map((el, index) => {
                return <button type="button"
                               disabled={chosen}
                               className={
                                   chosen ?
                                       el === correct ? "btn btn-success" : "btn btn-danger"
                                       : "btn btn-light"
                               }
                               value={el} onClick={handleOnClick} key={index}>{entities.decode(el)} </button>
            })}
        </div>

    );
};

export default TriviaQuestion;
