import React from 'react';
import '../index.css';
const StandartQuestions = require('../questions/standart');

function generateField(size, val) {
    let field = new Array(size);
    for (let i = 0; i < field.length; i++) {
        field[i] = new Array(size).fill(val);
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
            squares: generateField(props.value),
            xIsNext: true,
            gameURL: props.gameURL,
            statusGame: 'game...',
            isEnd: false
        };
    }

    handleClick(i, j) {
        const squares = this.state.squares.slice();
        const gameURL = this.state.gameURL;
        const isEnd = this.state.isEnd;
        if (squares[i][j] || isEnd) {
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
                        isEnd: true,
                    });
                } else {
                    console.log('dont make step');
                    this.setState({
                        statusGame: coord.data,
                        isEnd: true,
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
        const status = this.state.statusGame;
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
            gameUrl: props.match.url,
            error: null,
            isLoaded: false,
            items: [],
            size: 1,
        };


    }

    componentDidMount() {
        StandartQuestions.getData(this.state.gameUrl).then((game) => {
            this.setState({
                isLoaded: true,
                size: game.size
            })
        });
    }

    render() {
        const isLoaded = this.state.isLoaded;
        const size = this.state.size;
        const gameURL = this.state.gameUrl;
        /*if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else */
        if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <Board value={size} gmaeURL={gameURL}/>
            );
        }
    }
}

export default Game;
