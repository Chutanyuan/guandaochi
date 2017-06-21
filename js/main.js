/**
 * Created by user_kevin on 17/6/21.
 */
var game = new Phaser.Game(288,505,Phaser.AUTO,'game',{
    preload:preload,
    create:create,
    update:update
});
function preload() {
    game.load.image('bg','assets/background.png');
    game.load.image('ground','assets/ground.png');
    game.load.spritesheet('pipe','assets/pipes.png',54,320,2);
}
function create() {
    var background = game.add.tileSprite(0,0,game.width,game.height,'bg');

    background.autoScroll(-20,0);

    pipeGroup = game.add.group();
    pipeGroup.enableBody = true;

    /**
     * 定时器
     * */
    game.time.events.loop(1000,createPipe,this);
    var ground = game.add.tileSprite(0,game.height-112,game.width,112,'ground');
    ground.autoScroll(-100,0);
}
function update() {

}
var pipeGroup;
function createPipe() {

    var gap = 150;
    var difficulty = 100; // difficulty越大越简单
    var position = 50 + Math.floor((505 - 112 - difficulty - gap) * Math.random());
    var topPipeY = position - 320;
    var bottomPipeY = position + gap;
    console.log('创建管道 - 对象池 topPipeY = '+topPipeY + "bottomPipeY = "+bottomPipeY);
    if(resetPipe(topPipeY, bottomPipeY)){
        return;
    }
    var topPipe = game.add.sprite(game.width, topPipeY, 'pipe', 0, pipeGroup);
    var bottomPipe = game.add.sprite(game.width, bottomPipeY, 'pipe', 1, pipeGroup);
    pipeGroup.setAll('checkWorldBounds', true);
    pipeGroup.setAll('outOfBoundsKill', true);
    pipeGroup.setAll('body.velocity.x', -200);

}
function resetPipe(topPipeY, bottomPipeY) {
    var i = 0;
    pipeGroup.forEachDead(function(pipe) {
        console.log('resetPipe---> topPipeY = '+topPipeY + "bottomPipeY = "+bottomPipeY + "pipe.y = "+pipe.y);
        if(pipe.y <= 0) {
            pipe.reset(game.width, topPipeY);
            pipe.hasScored = false;
        } else {
            pipe.reset(game.width, bottomPipeY);
        }
        pipe.body.velocity.x = -200;
        i++;
    }, this);
    return i == 2;
}