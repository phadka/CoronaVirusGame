class Menu extends Mode {
    constructor() {
        super();
        this.bg = new BG2();
        this.mode = 'main';
    }
    draw() {
        if (this.mode == 'main') {
            this.drawMain();
        } else if (this.mode == 'levels') {
            this.drawLevels();
        }
    }
    drawLevels() {
        this.bg.draw();
        this.drawButton('zurueck', 70, 800, 150, 200, function(origin) {
            origin.mode = 'main';
        });
        this.drawButton('Level 1', 70, 200, 700, 200, function(origin) {
            origin.mode = 'main';
            mode = 'level';
            level = new Level(10, function(l) {
                for (var i = 0; i < 10; i++) {
                    var nv = new Virus(false, false);
                    nv.x = 20 + i * 3;
                    nv.y = 2;
                    l.virs.push(nv);
                }
            });
        });
    }
    drawMain() {
        this.bg.draw();
        this.drawButton('Spielen', 90, 800, 550, 300, function() {
            welt = new Welt();
            mode = 'endless';
        });
        var tmode = this.mode;
        this.drawButton('Level', 70, 800, 400, 200, function(origin) {
            origin.mode = 'levels';
        });
    }
}
