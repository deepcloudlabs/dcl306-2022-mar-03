import React from "react";
import Move from "./move";

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

    componentDidMount() {
        setInterval(() => {
            let game = {...this.state.game};
            game.counter--;
            this.setState({game});
        }, 1000);
    }

    //region create random numbers
    createDigit = (min,max) => {
        return Math.floor(Math.random()*(max-min+1)) + min;
    }
    createSecret = (level) => {
        let digits = [];
        digits.push(this.createDigit(1, 9));
        while (digits.length < level) {
            let digit = this.createDigit(0, 9);
            if (digits.includes(digit)) continue;
            digits.push(digit);
        }
        return digits.reduce((s, u) => 10 * s + u, 0);
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
        if (game.secret === game.guess){
            game.level++;
            // TODO: check whether this is the last level
            game.secret = this.createSecret(game.level);
            game.moves= [];
            game.tries= 0;
            game.counter = 60 + 10 * (game.level - 3);
        } else {
            let move = this.createMove(game.guess,game.secret);
            game.moves.push(move);
            game.tries++;
        }
        this.setState({game,statistics});
    }
    createMove = (guess,secret) => {
        let guessAsString = guess.toString();
        let secretAsString = secret.toString();
        let perfectMatch = 0;
        let partialMatch = 0;
        for (let i=0;i<guessAsString.length;++i){
            let g = guessAsString.charAt(i);
            for (let j=0;j<secretAsString.length;++j){
                let s = secretAsString.charAt(j);
                if (s===g){
                    if (i===j){
                        perfectMatch++;
                    } else {
                        partialMatch++;
                    }
                }
            }
        }
        if (perfectMatch===0 && partialMatch === 0)
            return new Move(guess,"No Match");
        let message= "";
        if (partialMatch>0)
            message += "-" + partialMatch;
        if (perfectMatch>0)
            message += "+" + perfectMatch;
        return new Move(guess,message);
    }

    render = () => {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Game Console</h3>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="level">Game Level:</label>
                            <span id="level"
                                  className="badge alert-info">
                                {this.state.game.level}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tries">Tries:</label>
                            <span id="tries"
                                  className="badge alert-info">
                                {this.state.game.tries}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="counter">Counter:</label>
                            <span id="counter"
                                  className="badge alert-info">
                                {this.state.game.counter}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="guess">Guess:</label>
                            <input id="guess"
                                   type="text"
                                   className="form-control"
                                   onChange={this.handleInputChange}
                                   value={this.state.game.guess}></input>
                            <button onClick={this.play}
                                    className="btn btn-success">Play</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
