import React from 'react';
import '../index.css';
const StandartQuestions = require('../questions/standart');

function generateField(size, steps, val = null) {
    let field = new Array(size);
    for (let i = 0; i < field.length; i++) {
        field[i] = new Array(size).fill(val);
    }
    let isX = true;
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
            statusGame: '',
            isUserWin: props.isUserWin,
            isError: false
        };
    }

    handleClick(i, j) {
        const squares = this.state.squares.slice();
        const gameURL = this.state.gameURL;
        const isUserWin = this.state.isUserWin;
        const isError = this.state.isError;
        if (squares[i][j] || isUserWin !== undefined) {
            return;
        }
        squares[i][j] = 'X';
        StandartQuestions.postData(gameURL, {coord_x: i, coord_y: j}).then((item) => {
            if (item.isUserWin === undefined && item.error === undefined) {
                squares[item.coord_x][item.coord_y] = 'O';
                this.setState({
                    squares: squares,
                    isError: false
                });
            } else if (item.error === undefined) {
                if (item.step !== undefined) {
                    squares[item.step.coord_x][item.step.coord_y] = 'O';
                    this.setState({
                        squares: squares,
                        isUserWin: item.isUserWin,
                        isError: false
                    });
                } else {
                    this.setState({
                        isUserWin: item.isUserWin,
                        isError: false
                    });
                }
            } else {
                this.setState({
                    statusGame: item.error,
                    isError: true
                })
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
        let status = "";
        const isUserWin = this.state.isUserWin;
        const isError = this.state.isError;
        if (isUserWin !== undefined) {
            status = isUserWin ? 'Пользователь выиграл' : 'Компьютер выиграл';
        } else if (isError) {
            status = this.state.statusGame;
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
            isUserWin: undefined,
        };


    }

    componentDidMount() {
        StandartQuestions.getData(this.state.gameURL).then((game) => {
            if (game.error === undefined) {
                this.setState({
                    isLoaded: true,
                    size: game.size,
                    steps: game.steps,
                    isUserWin: game.isUserWin,
                    error: ''
                })
            } else {
                this.setState({
                    error: game.error
                })
            }
        });
    }

    render() {
        const isLoaded = this.state.isLoaded;
        const size = this.state.size;
        const gameURL = this.state.gameURL;
        const steps = this.state.steps;
        const isUserWin = this.state.isUserWin;
        const error = this.state.error;
        if (error) {
            return <div>Ошибка: {error}</div>;
        } else
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
