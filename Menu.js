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
    }    
}
