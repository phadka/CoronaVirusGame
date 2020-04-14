class Retry extends Mode{
    constructor() {
        super();
        this.bg = new BG2();
    }
    set onRetry(fun) {
        this.action = fun;
    }
    draw(won = false) {
        this.bg.draw();
        if (won) drawText('Spiel Gewonnen', 800, 550, 90, true);
        else drawText('Punktzahl: ' + points, 800, 550, 90, true);
        this.drawButton('Nochmal versuchen', 70, 800, 400, 500, this.action);
        this.drawButton('zum Hauptmenu', 70, 800, 150, 525, function() {
            mode = 'menu';
            points= 0;
        });
    }
}
