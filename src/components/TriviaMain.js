import React, {useEffect, useState} from 'react';
import TriviaQuestion from "./TriviaQuestion";

const TriviaMain = () => {
    const [questions, setQuestions] = useState(null);
    const [score, setScore] = useState(0);
    const [totalPointsPool, setTotalPointsPool] = useState(10);
    const [sessionToken, setSessionToken] = useState(null);


    useEffect(() => {
        if (questions && questions.response_code === 3) {
            localStorage.removeItem(
                "sessionInfo",
            )
        }
        if(localStorage.getItem("currentScore") !== null) {
            setScore(JSON.parse(localStorage.getItem("currentScore")).points)
        }

        if(localStorage.getItem("total") !== null) {
            setTotalPointsPool(JSON.parse(localStorage.getItem("total")).totalPointsAmount)
        }

        if (localStorage.getItem("sessionInfo") !== null) {
            setSessionToken(
                JSON.parse(localStorage.getItem("sessionInfo")).token)
        } else {
            fetch("https://opentdb.com/api_token.php?command=request").then(response =>
                response.json().then(res => {
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
                    if (mounted) {
                        setQuestions(res);
                    }
                }
            ))

        return () => {
            mounted = false;
        }

    }, [sessionToken, totalPointsPool])

    useEffect(() => {
        localStorage.setItem(
            "currentScore",
            JSON.stringify({
                points: score,
            })
        );

        localStorage.setItem(
            "total",
            JSON.stringify({
                totalPointsAmount: totalPointsPool,
            })
        );

    }, [score, totalPointsPool])

    const handleChangeScore = () => {
        setScore(prev => prev + 1);
    }

    const nextTenQuestions = () => {
        setTotalPointsPool(prev => prev + 10)
    }

    const resetSession = () => {
        localStorage.removeItem(
            "sessionInfo",
        )
        localStorage.setItem(
            "currentScore",
            JSON.stringify({
                points: 0
            })
        )
        localStorage.setItem(
            "total",
            JSON.stringify({
                totalPointsAmount: 10
            })
        )
        setScore(0);
        setTotalPointsPool(10);
        setSessionToken(null);
    }

    return (
        <>
            <h1>Game Trivia!</h1>
            <h2>Current score: {score}/{totalPointsPool}</h2>
            {questions && questions.results.map((el, index) => {
                return <TriviaQuestion key={index} question={el.question} correct={el.correct_answer}
                                       incorrect={el.incorrect_answers} updateScore={handleChangeScore}/>
            })}
            <div style={{display:"flex"}}>
                <button type="button" className="btn btn-primary" onClick={resetSession}>Reset</button>
                <button type="button" className="btn btn-primary" onClick={nextTenQuestions}>Next 10</button>
            </div>
        </>
    );
};

export default TriviaMain;
