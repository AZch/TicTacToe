import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
const Router = require('react-router-dom').BrowserRouter;
const Link = require('react-router-dom').Link;
const Route = require('react-router-dom').Route;
const InputData = require('./pages/InitGame').default;
const Game = require('./pages/game').default;

function Index() {
    return <h2>Home</h2>
}

function About() {
    return <h2>About</h2>
}

function Users() {
    return <h2>Users</h2>
}

function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">InitGame</Link>
                        </li>
                        <li>
                            <Link to="/about/">About</Link>
                        </li>
                        <li>
                            <Link to="{`/game/${game.id}`}">Users</Link>
                        </li>
                    </ul>
                </nav>

                <Route path="/" exact component={InputData} />
                <Route path="/about/" component={About} />
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
