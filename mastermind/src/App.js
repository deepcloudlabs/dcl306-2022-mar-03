import React from "react";

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
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
