import React, {useEffect, useState} from 'react';
import TriviaQuestion from "./TriviaQuestion";

const TriviaMain = () => {
    const [questions, setQuestions] = useState(null);
    const [score, setScore] = useState(0);
    const [sessionToken, setSessionToken] = useState(null);
    //score should also be stored in local storage

    useEffect(() => {
        if(questions && questions.response_code === 3){
            localStorage.removeItem(
                "sessionInfo",
            )
        }

        if (localStorage.getItem("sessionInfo") !== null) {
            setSessionToken(
                JSON.parse(localStorage.getItem("sessionInfo")).token)
        } else {
            fetch("https://opentdb.com/api_token.php?command=request").then(response =>
                response.json().then(res => {
                    console.log(res)
                    setSessionToken(res.token);
                    localStorage.setItem(
                        "sessionInfo",
                        JSON.stringify({
                            token: res.token,
                        })
                    );
                })
            )
        }
    }, [questions])


    useEffect(() => {
        let mounted = true;
        fetch(`https://opentdb.com/api.php?amount=10&category=15&token=${sessionToken}`).then(response =>
            response.json().then(res => {
                console.log(res)
                    if (mounted) {
                        setQuestions(res);
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
            {questions && questions.results.map((el, index) => {
                return <TriviaQuestion key={index} question={el.question} correct={el.correct_answer}
                                       incorrect={el.incorrect_answers} updateScore={handleChangeScore}/>
            })}
        </>
    );
};

export default TriviaMain;
