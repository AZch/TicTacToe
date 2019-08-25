import '../index.css';
const React = require('react');
const StandartQuestions = require('../questions/standart');
const openSocket = require('socket.io-client');
const socket = openSocket('http://localhost:8000');

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
            isX: props.steps.length === 0 ? true : (props.steps % 2) !== 0,
            isUserWin: props.isUserWin,
            gameURL: props.gameURL,
            gameId: props.gameId,
            statusGame: '',
            isEnd: props.isEnd,
            isError: false
        };
        this.handleClick = this.handleClick.bind(this);

    }
    generateField(size, steps, val = null) {
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
        const { squares, gameURL, isUserWin, gameId } = this.state;
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
                    gameURL: gameURL
                });
            } else if (item.error === undefined) {
                const emitSendData = {gameId: gameId, isUserWin: item.isUserWin};
                socket.emit('resultGame', JSON.stringify(emitSendData));
                if (item.step !== undefined) {
                    squares[item.step.coord_x][item.step.coord_y] = isX ? 'X' : 'O';
                    this.setState({
                        squares: squares,
                        isUserWin: item.isUserWin,
                        isError: false,
                        gameURL: gameURL
                    });
                } else {
                    this.setState({
                        isUserWin: item.isUserWin,
                        isError: false,
                        gameURL: gameURL
                    });
                }
            } else {
                this.setState({
                    statusGame: item.error,
                    isError: true,
                    gameURL: gameURL
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
        const { isUserWin, isError, squares, statusGame } = this.state;
        if (isUserWin !== undefined) {
            status = 'Result: ';
            status += isUserWin ? 'user win' : 'loss or draw';
        } else if (isError) {
            status = 'Error: ';
            status += statusGame;
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
        console.log(props);
        this.state = {
            gameURL: props.match.url,
            gameId: props.match.params.id,
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
        const {isLoaded, size, gameURL, steps, isUserWin, error, gameId} = this.state;
        if (error) {
            return <div>Error: {error}</div>;
        } else
        if (!isLoaded) {
            return <div>Load...</div>;
        } else {
            return (
                <Board
                    value={size}
                    steps={steps}
                    isUserWin={isUserWin}
                    gameURL={gameURL}
                    gameId={gameId}/>

            );
        }
    }
}

export default Game;
