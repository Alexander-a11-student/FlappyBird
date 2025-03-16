import { _decorator, Component, Node, Vec3, EventTarget, Collider2D, ITriggerEvent, Contact2DType, IPhysics2DContact, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

import { Result } from './Result';

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

    @property(SpriteFrame)
    public recordPipeTexture: SpriteFrame = null;

    @property(SpriteFrame)
    public originalPipeTexture: SpriteFrame = null;

    private isGameStarted: boolean = false; // Флаг для отслеживания состояния игры
    private newRecord: boolean = false; // Флаг для отслеживания нового рекорда
    private pipePassedFlags: boolean[] = []; // Флаги для отслеживания прохождения труб
    private recordPepe: Node;

    private currentRecord: number = 0;

    @property({
        type: Result,
        tooltip: 'Best record'
    })
    private bestRecord: Result;

    public static eventTarget: EventTarget = new EventTarget();

    start() {
        this.resetPipes();
        this.pipePassedFlags = new Array(this.pipes.length).fill(true); // Инициализируем флаги

        // Добавляем обработчики триггерных событий для дочерних объектов труб
        for (const pipe of this.pipes) {
            for (const child of pipe.children) {
                const collider = child.getComponent(Collider2D);
                if (collider) {
                    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
                } else {
                    console.error(`Collider not found on child: ${child.name}`);
                }
            }
        }
    }

    onBeginContact() {
        Pipes.eventTarget.emit('collision');    
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
        for (let i = 0; i < this.pipes.length; i++) {
            const pipe = this.pipes[i];
            if (pipe.getPosition().x < -360) {
                const x = 1800;
                const y = this.getRandomY();
                pipe.setPosition(new Vec3(x, this.clampY(pipe.getPosition().y + y), 0));
            }
        }
    }

    updateScore() {
        for (let i = 0; i < this.pipes.length; i++) {
            const pipe = this.pipes[i];
            const posX = pipe.getPosition().x;
            if (posX < 0 && this.pipePassedFlags[i]) {
                this.pipePassedFlags[i] = false;
                Pipes.eventTarget.emit('addScore');
                this.currentRecord++;
                if (this.currentRecord  + 2> this.bestRecord.bestScoreValue && this.bestRecord.bestScoreValue != 0 && !this.newRecord && this.bestRecord.bestScoreValue != 1) {
                    
                    const recordPepe = this.findRecordPipe(); // Находим трубу с рекордом
                    if ( recordPepe ) {
                        this.changePipeTexture( recordPepe , true);
                    }
                    this.newRecord = true; 
                } else if (this.bestRecord.bestScoreValue ==1 && !this.newRecord ){
                    this.newRecord = true;
                    this.changePipeTexture( this.pipes[1] , true);
                }
            
                if (this.currentRecord > this.bestRecord.bestScoreValue + 3 && this.newRecord ) {
                    this.resetPipeTextures();
                }



            } else if (posX >= 0) {
                this.pipePassedFlags[i] = true;
            }
        }
    }

    resetPipeTextures() {
        for (const pipe of this.pipes) {
            this.changePipeTexture(pipe, false);
        }
    }

    changePipeTexture(pipe: Node, isRecord: boolean) {
        for (const child of pipe.children) {
            const sprite = child.getComponent(Sprite);
            if (sprite) {
                sprite.spriteFrame = isRecord ? this.recordPipeTexture : this.originalPipeTexture;
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
        this.resetPipeTextures();
        this.currentRecord = 0;
        this.isGameStarted = false;
        this.newRecord = false;
    }

    findRecordPipe(): Node | null {
        for (const pipe of this.pipes) {
            if (pipe.getPosition().x > 370 && pipe.getPosition().x < 750) {
                return pipe;
            }
        }
        return null;
    }
}


