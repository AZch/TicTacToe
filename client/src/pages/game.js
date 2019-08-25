import React from 'react';
import '../index.css';
const StandartQuestions = require('../questions/standart');

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
        this.generateField = this.generateField.bind(this);
        this.state = {
            squares: this.generateField(props.value, props.steps),
            isX: (props.steps % 2) === 0,
            gameURL: props.gameURL,
            statusGame: '',
            isEnd: props.isEnd,
            isError: false
        };

    }
    generateField(size, steps, val = null) {
        console.log(size);
        console.log(steps);
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


    handleClick(i, j) {
        const { squares, gameURL, isUserWin} = this.state;
        let isX = this.state.isX;
        if (squares[i][j] || isUserWin !== undefined) {
            return;
        }
        squares[i][j] = isX ? 'X' : 'O';
        isX = !isX;
        StandartQuestions.postData(gameURL, {coord_x: i, coord_y: j}).then((item) => {
            if (item.isUserWin === undefined && item.error === undefined) {
                squares[item.coord_x][item.coord_y] = isX ? 'X' : 'O';
                this.setState({
                    squares: squares,
                    isError: false,
                });
            } else if (item.error === undefined) {
                if (item.step !== undefined) {
                    squares[item.step.coord_x][item.step.coord_y] = isX ? 'X' : 'O';
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
        const { isUserWin, isError, statusGame, squares } = this.state;
        if (isUserWin !== undefined) {
            status = 'Результат: ';
            status += isUserWin ? 'победа пользователя' : 'поражение или ничья';
        } else if (isError) {
            status = 'Ошибка: ';
            status += this.state.statusGame;
        }
        return (
            <div>
                <div>{status}</div>
                {
                    squares.map((items, indexI) => {
                        return (
                            <div className="board-row">
                                {
                                    items.map((item, indexJ) => {
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
        const {isLoaded, size, gameURL, steps, isUserWin, error} = this.state;
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
