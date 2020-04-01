class Retry {
    constructor() {
        this.bg = new BG2();
    }
    draw() {
        this.bg.draw();
        drawText('Punktzahl: ' + points, 800, 400, 50, true);
        if (mouseY > 505 && mouseY < 595 && mouseX > 400 && mouseX < 1200) {
            drawText('Nochmal Versuchen', 800, 550, 90, true, 'grey');
            if (mouseClick) {
                mode = 'endless';
                points = 0;
            }
        } else {
            drawText('Nochmal Versuchen', 800, 550, 90, true);
        }
    }    
}
