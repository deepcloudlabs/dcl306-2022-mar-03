import React from "react";
import Move from "./move";
import Badge from "./components/badge";
import CardHeader from "./components/card-header";
import Card from "./components/card";
import CardBody from "./components/card-body";
import Container from "./components/container";
import PlayerMove from "./components/player-move";

const COUNTER_BASE_VALUE = 60;
const COUNTER_INCREMENT_PER_LEVEL = 10;

class App extends React.PureComponent {
    constructor(context, props) {
        super(context, props);
        this.state = {
            game: {
                level: 3,
                secret: this.createSecret(3),
                tries: 0,
                guess: 123,
                moves: [],
                counter: 60,
                lives: 3
            },
            statistics: {
                wins: 0,
                loses: 0,
                total: 0,
                totalWinMoves: 0,
                avgWinMoves: 0
            }
        }
    }

    getInitialCounter = (level) => {
        return COUNTER_BASE_VALUE + COUNTER_INCREMENT_PER_LEVEL * (level - 3);
    }

    initGame = (game, statistics) => {
        if (game.lives === 0) {
            game.level = game.level === 3 ? 3 : game.level - 1;
            game.lives = 3;
            statistics.loses++;
            statistics.total++;
        } else {
            game.lives--;
        }
        game.tries = 0;
        game.secret = this.createSecret(game.level);
        game.moves = [];
        game.counter = this.getInitialCounter(game.level);
    }

    persistStateToLocalStorage = () => {
        localStorage.setItem(
            "mastermind",
            JSON.stringify({...this.state})
        );
    }

    componentDidMount() {
        setInterval(() => {
            let game = {...this.state.game};
            let statistics = {...this.state.statistics};
            game.counter--;
            if (game.counter <= 0) {
                this.initGame(game, statistics);
            }
            this.setState({game, statistics}, () => {

            });

        }, 1000);
        let localState =
            JSON.parse(localStorage.getItem("mastermind"));
        if (localState != null) {
            this.setState(localState);
        } else {
            let state = {...this.state};
            localStorage.setItem(
                "mastermind", JSON.stringify(state));
        }
    }

    //region create random numbers
    createDigit = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createSecret = (level) => {
        let digits = [];
        digits.push(this.createDigit(1, 9));
        while (digits.length < level) {
            let digit = this.createDigit(0, 9);
            if (digits.includes(digit)) continue;
            digits.push(digit);
        }
        let secret = digits.reduce((s, u) => 10 * s + u, 0);
        console.log(secret);
        return secret;
    }
    //endregion

    handleInputChange = (event) => {
        let game = {...this.state.game};
        game.guess = Number(event.target.value);
        this.setState({game});
    }

    play = (event) => {
        let game = {...this.state.game};
        let statistics = {...this.state.statistics};
        if (game.secret === game.guess) {
            game.level++;
            // TODO: check whether this is the last level
            game.secret = this.createSecret(game.level);
            game.moves = [];
            game.tries = 0;
            game.counter = this.getInitialCounter(game.level);
        } else {
            let move = this.createMove(game.guess, game.secret);
            game.moves.push(move);
            game.tries++;
        }
        this.setState({game, statistics}, this.persistStateToLocalStorage);
    }

    createMove = (guess, secret) => {
        let guessAsString = guess.toString();
        let secretAsString = secret.toString();
        let perfectMatch = 0;
        let partialMatch = 0;
        for (let i = 0; i < guessAsString.length; ++i) {
            let g = guessAsString.charAt(i);
            for (let j = 0; j < secretAsString.length; ++j) {
                let s = secretAsString.charAt(j);
                if (s === g) {
                    if (i === j) {
                        perfectMatch++;
                    } else {
                        partialMatch++;
                    }
                }
            }
        }
        return new Move(guess, perfectMatch, partialMatch);
    }

    render = () => {
        return (
            <Container>
                <Card>
                    <CardHeader title="Game Console"/>
                    <CardBody>
                        <Badge id="level"
                               label="Game Level"
                               value={this.state.game.level}
                               className="alert-success"></Badge>
                        <Badge id="tries"
                               label="Tries"
                               value={this.state.game.tries}
                               className="alert-danger"></Badge>
                        <Badge id="counter"
                               label="Counter"
                               value={this.state.game.counter}
                               className="alert-info"></Badge>
                        <Badge id="lives"
                               label="Lives"
                               value={this.state.game.lives}
                               className="alert-warning"></Badge>
                        <div className="form-group">
                            <label htmlFor="guess">Guess:</label>
                            <input id="guess"
                                   type="text"
                                   className="form-control"
                                   onChange={this.handleInputChange}
                                   value={this.state.game.guess}></input>
                            <button onClick={this.play}
                                    className="btn btn-success">Play
                            </button>
                        </div>
                    </CardBody>
                </Card>
                <p></p>
                <Card>
                    <CardHeader title="Moves"/>
                    <CardBody>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Guess</th>
                                <th>Message</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.game.moves.map((move, index) =>
                                    <tr key={move.guess + index.toString()}>
                                        <td>{index + 1}</td>
                                        <td>{move.guess}</td>
                                        <td><PlayerMove value={move}/></td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
                <p></p>
                <Card>
                    <CardHeader title="Game Statistics"/>
                    <CardBody>
                        <Badge id="total"
                               label="Total"
                               value={this.state.statistics.total}
                               className="alert-info"></Badge>
                        <Badge id="wins"
                               label="Wins"
                               value={this.state.statistics.wins}
                               className="alert-success"></Badge>
                        <Badge id="loses"
                               label="Loses"
                               value={this.state.statistics.loses}
                               className="alert-danger"></Badge>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}

export default App;
