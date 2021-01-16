import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import TriviaMain from "./components/TriviaMain";
import ResultPage from "./components/ResultPage";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path={ROUTES.HOME} component={TriviaMain}/>
                    <Route path={ROUTES.RESULTS} component={ResultPage}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
