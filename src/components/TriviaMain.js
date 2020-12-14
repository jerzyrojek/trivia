import React, {useEffect, useState} from 'react';
import TriviaQuestion from "./TriviaQuestion";

const TriviaMain = () => {
    const [questions, setQuestions] = useState(null);
    // const [sessionToken, setSessionToken] = useState(null);
    // need to add session token to local storage to avoid the same questions being pulled from API
    //https://opentdb.com/api_token.php?command=request

    useEffect(() => {
        let mounted = true;
        fetch("https://opentdb.com/api.php?amount=10&category=15").then(response =>
            response.json().then(res => {
                    if (mounted) {
                        setQuestions(res.results);
                    }
                }
            ))

        return () => {
            mounted = false;
        }

    }, [])

    return (
        <>
            <h1>Hello World!</h1>
            {questions && questions.map((el,index) => {
                return <TriviaQuestion key={index} question={el.question} correct={el.correct_answer} incorrect={el.incorrect_answers}/>
            })}
        </>
    );
};

export default TriviaMain;
