import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const StandartQuestions = require("./questions/standart");
const Router = require('react-router-dom').BrowserRouter;
const Link = require('react-router-dom').Link;
const Route = require('react-router-dom').Route;
const InputData = require('./pages/InitGame').default;
const Game = require('./pages/game').default;
const openSocket = require('socket.io-client');

const socket = openSocket('http://localhost:8000/');


class AppRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastGame: ''
        };

        socket.on('resultGameMsg', (data) => this.processLastGame(data));

        this.processLastGame = this.processLastGame.bind(this);
    }

    processLastGame(data) {
        data = JSON.parse(data);
        this.setState({
            lastGame: data.msg
        });
    }

    render() {
        const lastGame = this.state.lastGame;
        return (
            <Router>
                <div className="board-row">
                    Last game: {lastGame}
                </div>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Init Game</Link>
                            </li>
                        </ul>
                    </nav>

                    <Route path="/" exact component={InputData}/>
                    <Route path="/game/:id" component={Game}/>
                </div>
            </Router>
        );
    }
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
