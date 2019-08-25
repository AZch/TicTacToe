import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
const Router = require('react-router-dom').BrowserRouter;
const Link = require('react-router-dom').Link;
const Route = require('react-router-dom').Route;
const InputData = require('./pages/InitGame').default;
const Game = require('./pages/game').default;


function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">InitGame</Link>
                        </li>
                    </ul>
                </nav>

                <Route path="/" exact component={InputData} />
                <Route path="/game/:id" component={Game} />
            </div>
        </Router>
    );
}




ReactDOM.render(
        <AppRouter/>
    ,
    document.getElementById('root')
);

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
