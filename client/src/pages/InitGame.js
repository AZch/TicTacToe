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
            history: props.history
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
        console.log(this.state);
        StandartQuestions.postData("/", this.state).then((result) => {
            this.state.history.push('/game/' + result._id);
        });
    }

    registerUser(event) {
        event.preventDefault();
        console.log(this.state);
        StandartQuestions.postData('/user', this.state).then((result) => {
            console.log(result);
        });
    }

    openUser(event) {
        event.preventDefault();
    }

    render() {
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
            </form>
        );
    }
}

export default InputData;