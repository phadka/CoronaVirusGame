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
            this.drawLevels(5);
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
    drawLevels(num) {
        this.bg.draw();
        this.drawButton('zurueck', 70, 800, 150, 200, function(origin) {
            origin.mode = 'main';
        });
        for (var i = 1; i < num + 1; i++) {
            var y = 800 - 100 * i;
            var x = 200;
            this.drawButton('Level ' + i, 50, x, y, 170, function(origin) {
                origin.createLevel(i);
                origin.mode = 'main';
                mode = 'level';
            });
        }
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
