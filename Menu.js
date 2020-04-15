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
    createLevel(levelnum) {
        var index = levelnum - 1;
        var size = leveldata[index * 4 + 3];
        level = new Level(size, function(l) {
            for (var i = 0; i < size; i++) {
                var nv = new Virus(leveldata[index * 4 + 1][i], leveldata[index * 4 + 2][i]);
                nv.x = 20 + leveldata[index * 4][i];
                l.virs.push(nv);
            }
        });
    }
    drawLevels() {
        this.bg.draw();
        this.drawButton('zurueck', 70, 800, 150, 200, function(origin) {
            origin.mode = 'main';
        });
        this.drawButton('Level 1', 50, 200, 700, 170, function(origin) {
            origin.createLevel(1);
            origin.mode = 'main';
            mode = 'level';
        });
        this.drawButton('Level 2', 50, 200, 600, 170, function(origin) {
            origin.createLevel(2);
            origin.mode = 'main';
            mode = 'level';
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
