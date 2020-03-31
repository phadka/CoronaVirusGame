var blockdata =
[
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    0.0, 1.0, 0.0, 0.0,
    1.0, 0.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 0.0, 
];
class Block extends TVBO {
    constructor(img) {
        super(img, blockdata);
    }
}
