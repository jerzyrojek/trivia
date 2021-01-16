import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import TriviaQuestion from "./TriviaQuestion";

const TriviaMain = () => {
    const [questions, setQuestions] = useState(null);
    const [score, setScore] = useState(0);
    const [totalPointsPool, setTotalPointsPool] = useState(null);
    const [answersGiven, setAnswersGiven] = useState(0);
    const [sessionToken, setSessionToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const history = useHistory();


    useEffect(() => {
        if (questions && questions.response_code === 3) {
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
        setTotalPointsPool(10);
        fetch(`https://opentdb.com/api.php?amount=10&category=15&token=${sessionToken}`).then(response =>
            response.json().then(res => {
                    if (mounted) {
                        setIsLoading(false);
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

    const countAnswers = () => {
        setAnswersGiven(prev => prev + 1);
    }

    const validate = () => {
        return answersGiven === totalPointsPool;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);
        let allQuestionsAnswered = validate();
        if (allQuestionsAnswered) {
            history.push({
                pathname: "/results",
                state: {finalScore: score, maxScore: totalPointsPool}
            })
        } else {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
        //could probably use a class to add a fade animation
    }

    return (
        <div className="trivia">
            <div className="trivia__header navbar sticky-top">
                <h1 className="trivia__header-title">Game Trivia!</h1>
                <h2 className="trivia__header-score">Current score: {score}/{totalPointsPool}</h2>
            </div>
            {isLoading ?
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-warning m-5" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div className="trivia__questions container">
                    <form onSubmit={handleSubmit}>
                        {questions && questions.results.map((el, index) => {
                            return <TriviaQuestion key={index} question={el.question} correct={el.correct_answer}
                                                   incorrect={el.incorrect_answers} updateScore={handleChangeScore}
                                                   count={countAnswers}/>
                        })}
                        <div className="trivia__controls">
                            {error && answersGiven < 10 &&
                            <div className="alert alert-danger trivia__controls-error" role="alert">
                                Please answer all of the questions!
                            </div>}
                            <button type="submit" className="btn btn-dark">Finish</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};

export default TriviaMain;
