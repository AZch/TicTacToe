import React from 'react';
import '../index.css';
const StandartQuestions = require('../questions/standart');

class TextForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.updateData(event.target.value);
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
        this.state = { value: 1 };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (event.target.value > 0) {
            this.setState({
                value: event.target.value,
            });
            this.props.updateData(event.target.value)
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

export default class InputData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            sizeGame: 1,
            countWin: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        StandartQuestions.postData("/", this.state).then((result) => {
            console.log('NEW');
            console.log(result);
            this.props.history.push('/game/' + result._id);
        });
        console.log();

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="board-row">
                    Username:
                    <TextForm updateData={this.updateUsername} />
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