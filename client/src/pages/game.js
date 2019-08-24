import React from 'react';
import '../index.css';
const StangartQuestions = require('../questions/standart');

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
            squares: generateField(4),
            xIsNext: true,
        };
    }

    handleClick(i, j) {
        const squares = this.state.squares.slice();
        if (squares[i][j]) {
            return;
        }
        squares[i][j] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
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
        const status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
        console.log(this.props.params);
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
        console.log(props.match.params.id);
        this.state = {
            idGame: props.match.params.id,
            error: null,
            isLoaded: false,
            items: [],
            size: 1,
            countWin: 1,
        };


    }

    componentDidMount() {


        fetch("game/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Board/></div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.name}>
                            {item.name} {item._id}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default Game;
