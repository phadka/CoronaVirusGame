class Menu {
    constructor() {
        this.bg = new BG2();
    }
    draw() {
        this.bg.draw();
        if (mouseY > 505 && mouseY < 595 && mouseX > 650 && mouseX < 950) {
            drawText('Spielen', 800, 550, 90, true, 'grey');
            if (mouseClick) {
                mode = 'endless';
            }
        } else {
            drawText('Spielen', 800, 550, 90, true);
        }
        if (mouseY > 405 && mouseY < 495 && mouseX > 650 && mouseY < 950) {
            drawText('Level', 800, 450, 90, true, 'grey');
            if (mouseClick) {

            }
        } else {
            drawText('Level', 800, 450, 90 true);
        }
    }
}
