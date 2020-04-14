class Menu {
    constructor() {
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
    }
    drawButton(text, size, x, y, len, fun) {
        if (mouseY > y - size / 2 && mouseY < y + size / 2 && mouseX > x - len / 2 && mouseX < x + len / 2) {
            drawText(text, x, y, size, true, 'grey');
            if (mouseClick) {
                fun(this);
            }
        } else {
            drawText(text, x, y, size);
        }
    }
    drawMain() {
        this.bg.draw();
        this.drawButton('Spielen', 90, 800, 550, 300, function() {
            mode = 'endless';
        });
        var tmode = this.mode;
        this.drawButton('Level', 70, 800, 400, 200, function(origin) {
            origin.mode = 'levels';
        });
    }
}
