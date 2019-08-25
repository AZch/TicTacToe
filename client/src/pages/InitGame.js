import React from 'react';
import '../index.css';
const StandartQuestions = require('../questions/standart');

class TextForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            updateData: props.updateData
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.state.updateData(event.target.value);
    }

    render() {
        return (
            <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange} />
        );
    }
}

class PositiveNumForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 3,
            updateData: props.updateData
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (event.target.value > 0 || event.target.value === "") {
            this.setState({
                value: event.target.value,
            });
            this.state.updateData(event.target.value)
        }
    }

    render() {
        return (
            <input
                type="number"
                value={this.state.value}
                onChange={this.handleChange}/>
        );
    }
}

class InputData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            sizeGame: 3,
            countWin: 3,
            history: props.history,
            status: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    updateUsername = (value) => {
        this.setState({ username: value })
    };

    updateSizeGame = (value) => {
        this.setState({ sizeGame: value });
    };

    updateCountWin = (value) => {
        this.setState({ countWin: value })
    };

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const sizeGame = this.state.sizeGame;
        const countWin = this.state.countWin;
        const username = this.state.username;
        if (sizeGame < countWin) {
            this.setState({
                status: 'size game cant be more then count win'
            });
        } else if (sizeGame === '') {
            this.setState({
                status: 'size game cant be empty'
            });
        } else if (countWin === '') {
            this.setState({
                status: 'count win cant be empty'
            });
        } else {
            StandartQuestions.postData("/", {sizeGame: sizeGame, countWin:countWin, username: username }).then((result) => {
                if (result.error === undefined) {
                    this.setState({
                        status: 'success create game'
                    });
                    this.state.history.push('/game/' + result._id);
                } else {
                    this.setState({
                        status: result.error
                    });
                }
            });
        }
    }

    registerUser(event) {
        event.preventDefault();
        StandartQuestions.postData('/user', this.state).then((result) => {
            if (result.error === undefined) {
                this.setState({
                    status: 'success create user: ' + result.name,
                });
            } else {
                this.setState({
                    status: result.error,
                });
            }
        });
    }

    openUser(event) {
        event.preventDefault();
    }

    render() {
        const status = this.state.status;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="board-row">
                    Username:
                    <TextForm updateData={this.updateUsername} />
                    <button onClick={this.registerUser}>
                        Зарегестрировать
                    </button>
                    <button onClick={this.openUser}>
                        Открыть
                    </button>
                </div>
                <div className="board-row">
                    Size game:
                    <PositiveNumForm updateData={this.updateSizeGame}/>
                </div>
                <div className="board-row">
                    Count to win:
                    <PositiveNumForm updateData={this.updateCountWin}/>
                </div>
                <input type="submit" value="Начать игру" />
                <div className="board-row">
                    {status}
                </div>
            </form>
        );
    }
}

export default InputData;