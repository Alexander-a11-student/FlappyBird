import { _decorator, Component, Node, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pipes')
export class Pipes extends Component {
    @property([Node])
    public pipes: Node[] = [];

    @property
    public pipeSpeed: number = 200;

    @property
    public pipeInterval: number;

    @property
    public minY: number = -150;

    @property
    public maxY: number = 150;

    private isGameStarted: boolean = false; // Флаг для отслеживания состояния игры

    start() {
        this.resetPipes();
    }

    update(deltaTime: number) {
        if (this.isGameStarted) {
            this.movePipes(deltaTime);
            this.checkPipes();
        }
    }

    resetPipes() {
        // Устанавливаем начальное положение труб за пределами экрана
        for (let i = 0; i < this.pipes.length; i++) {
            const pipe = this.pipes[i];
            const x = i * this.pipeInterval;
            const y = this.getRandomY();
            pipe.setPosition(new Vec3(x + 360, y, 0));
        }
    }

    movePipes(deltaTime: number) {
        for (const pipe of this.pipes) {
            const pos = pipe.getPosition();
            pipe.setPosition(new Vec3(pos.x - this.pipeSpeed * deltaTime, pos.y, pos.z));
        }
    }

    checkPipes() {
        for (const pipe of this.pipes) {
            if (pipe.getPosition().x < -360) {
                const x = 1800;
                const y = this.getRandomY();
                console.log(y);
                const Y = pipe.getPosition().y; 
                pipe.setPosition(new Vec3(x, this.clampY(Y + y), 0));
            }
        }
    }

    getRandomY() {
        return Math.random() * (this.maxY - this.minY) + this.minY;
    }

    clampY(y: number) {
        return Math.max(this.minY, Math.min(this.maxY, y));
    }

    startGame() {
        this.isGameStarted = true;
    }

    stopGame() {
        this.isGameStarted = false;
    }
}


