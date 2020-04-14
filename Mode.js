class Mode {
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
