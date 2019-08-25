import React from 'react';
import '../index.css';
const StandartQuestions = require('../questions/standart');

function generateField(size, steps, val = null) {
    let field = new Array(size);
    for (let i = 0; i < field.length; i++) {
        field[i] = new Array(size).fill(val);
    }
    let isX = true;
    console.log('steps:');
    console.log(steps);
    for (let step of steps) {
        field[step.coord_x][step.coord_y] = isX ? 'X' : 'O';
        isX = !isX;
    }
    return field;
}

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: generateField(props.value, props.steps),
            xIsNext: true,
            gameURL: props.gameURL,
            statusGame: 'game...',
            isUserWin: props.isUserWin
        };
    }

    handleClick(i, j) {
        const squares = this.state.squares.slice();
        const gameURL = this.state.gameURL;
        const isUserWin = this.state.isUserWin;
        if (squares[i][j] || isUserWin !== undefined) {
            return;
        }
        squares[i][j] = 'X';
        StandartQuestions.postData(gameURL, {coord_x: i, coord_y: j}).then((coord) => {
            if (coord.data === undefined) {
                squares[coord.coord_x][coord.coord_y] = 'O';
                this.setState({
                    squares: squares
                });
            } else {
                if (coord.step !== undefined) {
                    console.log('make step');
                    squares[coord.step.coord_x][coord.step.coord_y] = 'O';
                    this.setState({
                        statusGame: coord.data,
                        squares: squares,
                        isUserWin: false,
                    });
                } else {
                    console.log('dont make step');
                    this.setState({
                        statusGame: coord.data,
                        isUserWin: true,
                    });
                }
            }
        });


    }

    renderSquare(i, j) {
        return ( <Square
                value={this.state.squares[i][j]}
                onClick={() => this.handleClick(i, j)}
            />
        );
    }

    render() {
        let status = this.state.statusGame;
        const isUserWin = this.state.isUserWin;
        if (isUserWin !== undefined) {
            status = isUserWin ? 'Пользователь выиграл' : 'Компьютер выиграл';
        }
        return (
            <div>
                <div className="status">{status}</div>
                {
                    Array.prototype.map.call(this.state.squares, (items, indexI) => {
                        return (
                            <div className="board-row">
                                {
                                    Array.prototype.map.call(items, (item, indexJ) => {
                                        return (
                                            this.renderSquare(indexI, indexJ)
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameURL: props.match.url,
            error: null,
            isLoaded: false,
            items: [],
            steps: [],
            size: 1,
            isUserWin: undefined
        };


    }

    componentDidMount() {
        StandartQuestions.getData(this.state.gameURL).then((game) => {
            console.log(game.steps);
            this.setState({
                isLoaded: true,
                size: game.size,
                steps: game.steps,
                isUserWin: game.isUserWin
            })
        });
    }

    render() {
        const isLoaded = this.state.isLoaded;
        const size = this.state.size;
        const gameURL = this.state.gameURL;
        const steps = this.state.steps;
        const isUserWin = this.state.isUserWin;
        /*if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else */
        if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <Board
                    value={size}
                    steps={steps}
                    isUserWin={isUserWin}
                    gmaeURL={gameURL}/>

            );
        }
    }
}

export default Game;
