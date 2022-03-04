class Move {
    constructor(guess, perfect, partial) {
        this.guess = guess;
        this.message = "";
        this.perfect = perfect;
        this.partial = partial;
        if (perfect === 0 && partial === 0) {
            this.message = "No Match";
        } else {
            if (partial > 0)
                this.message += "-" + partial;
            if (perfect > 0)
                this.message += "+" + perfect;
        }
    }
}

export default Move;