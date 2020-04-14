class Retry {
    constructor() {
        this.bg = new BG2();
    }
    draw() {
        this.bg.draw();
        drawText('Punktzahl: ' + points, 800, 400, 50, true);
        this.drawButton('Nochmal versuchen', 90, 800, 550, 800, function() {
            mode = 'endless';
            points = 0;
        });
        this.drawButton('zum Hauptmenu', 70, 800, 150, 525, function() {
            mode = 'menu';
            points= 0;
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
}
