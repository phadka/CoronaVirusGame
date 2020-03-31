var bgdata =
[
    0.0, 9.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
    16.0, 0.0, 1.0, 1.0,
    0.0, 9.0, 0.0, 0.0,
    16.0, 0.0, 1.0, 1.0,
    16.0, 9.0, 1.0, 0.0,
];
class BG extends TVBO {
    constructor() {
        super('bg', bgdata);
    }
}
