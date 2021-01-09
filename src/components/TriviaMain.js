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

    }, [sessionToken])

    const handleChangeScore = () => {
        setScore(prev => prev + 1);
    }


    const resetSession = () => {
        setScore(0);
    }

    // const validate = () => {
    // need to add validation to see if all answers have been checked before submitting
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Congratulations you scored ${score}!`);
    }

    return (
        <div className="trivia">
            <div className="trivia__header navbar sticky-top">
                <h1 className="trivia__header-title">Game Trivia!</h1>
                <h2 className="trivia__header-score">Current score: {score}/{totalPointsPool}</h2>
            </div>
            <div className="trivia__questions container">
                <form onSubmit={handleSubmit}>
                    {questions && questions.results.map((el, index) => {
                        return <TriviaQuestion key={index} question={el.question} correct={el.correct_answer}
                                               incorrect={el.incorrect_answers} updateScore={handleChangeScore}/>
                    })}
                    <div className="trivia__controls">
                        <button type="button" className="btn btn-primary" onClick={resetSession}>Reset</button>
                        <button type="submit" className="btn btn-primary">Finish</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default TriviaMain;
