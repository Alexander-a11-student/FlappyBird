import { _decorator, Component, Node, Vec3, EventTarget } from 'cc';
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
    public score: number = 0; // Добавляем свойство для хранения очков
    private pipePassedFlags: boolean[] = []; // Флаги для отслеживания прохождения труб

    public static eventTarget: EventTarget = new EventTarget();

    start() {
        this.resetPipes();
        this.pipePassedFlags = new Array(this.pipes.length).fill(true); // Инициализируем флаги
    }

    update(deltaTime: number) {
        if (this.isGameStarted) {
            this.movePipes(deltaTime);
            this.checkPipes();
            this.updateScore(); // Обновляем очки
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

    updateScore() {
        for (let i = 0; i < this.pipes.length; i++) {
            const pipe = this.pipes[i];
            const posX = pipe.getPosition().x;
            if (posX < 0 && this.pipePassedFlags[i]) {
                this.score += 1;
                this.pipePassedFlags[i] = false;
                console.log('Score:', this.score);
                Pipes.eventTarget.emit('addScore');
            } else if (posX >= 0) {
                this.pipePassedFlags[i] = true;
            }
        }
    }

    getRandomY() {
        return Math.random() * (this.maxY - this.minY) + this.minY;
    }

    clampY(y: number) {
        if (y<-300){
            return -300;
        } else if (y>100){
            return 100;
        } else {
            return y;
        }
    }
    
    startGame() {
        this.isGameStarted = true;
    }

    stopGame() {
        this.score = 0;
        this.isGameStarted = false;
    }
}


