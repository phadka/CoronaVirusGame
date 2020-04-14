class Level extends Welt {
    constructor(goal, init) {
        super();
        this.goal = goal;
        init(this);
        retry.onRetry = function() {
            points = 0;
            mode = 'level';
            level = new Level(goal, init)
        };
    }
    draw() {
        if (points >= this.goal) mode = 'won';
        drawText('Punkte: ' + points, 10, 880, 20, false);
        if (this.gameover) return;
        this.uBoden();
        this.uBG();
        this.uPlayer();
        this.uVirs();
        this.uHeart();
        this.uLasers();
    }
}
