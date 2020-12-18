import React, {useEffect, useState} from 'react';
import TriviaQuestion from "./TriviaQuestion";

const TriviaMain = () => {
    const [questions, setQuestions] = useState(null);
    const [score, setScore] = useState(0);
    const [sessionToken, setSessionToken] = useState();
    // need to add session token to local storage to avoid the same questions being pulled from API
    //score should also be stored in local storage
    //https://opentdb.com/api_token.php?command=request

    useEffect(() => {
        if (localStorage.getItem("sessionInfo") !== null) {
            setSessionToken(
                JSON.parse(localStorage.getItem("sessionInfo")).token)
        } else {
            fetch("https://opentdb.com/api_token.php?command=request").then(response =>
                response.json().then(res => {
                    console.log(res)
                    localStorage.setItem(
                        "sessionInfo",
                        JSON.stringify({
                            token: res.token,
                        })
                    );
                })
            )
        }
    }, [])


    useEffect(() => {
        let mounted = true;
        fetch(`https://opentdb.com/api.php?amount=10&category=15&token=${sessionToken}`).then(response =>
            response.json().then(res => {
                    if (mounted) {
                        setQuestions(res.results);
                    }
                }
            ))

        return () => {
            mounted = false;
        }

    }, [sessionToken])

    const handleChangeScore = () => {
        setScore(prev => prev + 1);
    }

    // const resetScore = () => {
    //
    // }

    return (
        <>
            <h1>Game Trivia!</h1>
            <h2>Current score: {score}</h2>
            {questions && questions.map((el, index) => {
                return <TriviaQuestion key={index} question={el.question} correct={el.correct_answer}
                                       incorrect={el.incorrect_answers} updateScore={handleChangeScore}/>
            })}
        </>
    );
};

export default TriviaMain;
