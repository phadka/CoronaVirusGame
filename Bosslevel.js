class Bosslevel extends Welt {
    constructor () {
        super();
        this.boss = new Boss(this);
        retry.onRetry = function() {
            bosslevel = new Bosslevel();
            mode = 'boss';
        };
        this.nextdmg = 0;
        this.bosslife = 10;
    }
    draw() {
        this.uBoden();
        this.uBG();
        this.uPlayer();
        this.uVirs();
        this.uHeart();
        this.uLasers();
        this.uBoss();
        points = 10 - this.bosslife;
    }
    uBoss() {
        this.boss.update();
        this.boss.draw();
        this.nextdmg -= dt;
        if (this.player.x - this.boss.x < 2 && this.player.x - this.boss.x > -1 && this.player.y < 4) {
            if (this.nextdmg < 0) {
                this.life--;
                this.nextdmg = 1000;
            }
        }
        for (var i = 0; i < this.lasers.length; i++) {
            if (this.lasers[i].x - this.boss.x < 2 && this.lasers[i].x - this.boss.x > -1 && this.lasers[i].y - this.boss.y < 2 && this.lasers[i].y - this.boss.y > -1) {
                this.lasers.splice(i, 1);
                this.bosslife--;
                if (this.bosslife <= 0) {
                    mode = 'won';
                }
            }
        }
    }
}
