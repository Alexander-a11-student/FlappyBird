import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director } from 'cc';
import { Ground } from './Ground';
import { Result } from './Result';
import { Bird } from './Bird';
import { UIManager } from './UIManager';
import { Pipes } from './Pipes';
import { AudioCtrl } from './AudioCtrl';

const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type: Result,
        tooltip: 'Pipe interval'
    })
    private result: Result = null;

    @property({
        type: Bird,
        tooltip: 'Bird node'
    })
    private bird: Bird = null;

    @property({
        type: UIManager,
        tooltip: 'UI Manager'
    })
    private uiManager: UIManager;

    @property({
        type: Ground,
        tooltip: 'Ground nodes'
    })
    private ground: Ground;

    @property({
        type: AudioCtrl,
        tooltip: 'Audio Controller'
    })
    private audioCtrl: AudioCtrl;

    @property({
        type: CCInteger,
        tooltip: 'speed ground node'
    })
    public speedGround: number = 250;

    @property({
        type: CCInteger,
        tooltip: 'Pipe speed'
    })
    public speedPipe: number = 250;

    @property({
        type: Pipes,
        tooltip: 'Pipes node'
    })
    private pipes: Pipes = null;

    private isButtonClicked: boolean = false; // Add this flag

    onLoad(){
        this.initListener();
        this.pipes.node.active = false; // Показываем трубы
    }

    initListener(){
        Pipes.eventTarget.on('addScore', this.result.addScore, this.result);
        Pipes.eventTarget.on('collision', this.GameOver, this);
        this.node.on(Node.EventType.TOUCH_START, () => { this.bird.fly();  this.audioCtrl.onPlaySound(2); });
    }


    onButtonClicked() {
        if (this.isButtonClicked) return; // Prevent multiple clicks
        console.log('Button clicked!');
        this.isButtonClicked = true; // Set the flag
        this.Start();
    }

    GameOver() {
        this.audioCtrl.onPlaySound(0); //Звук удара
        
        this.scheduleOnce(() => {
            this.audioCtrl.onPlaySound(1);; // Звук проигрыша
        }, 0.5);


        this.result.showResults();
        this.uiManager.showStartUI();
        this.pipes.stopGame(); // Останавливаем движение труб
        this.pipes.node.active = false; // Скрываем трубы
        this.isButtonClicked = false; // Reset the flag
        //director.pause();
    }

    Restart() {
        this.result.resetScrore();
        director.resume();
    }

    Start() {
        this.uiManager.hideStartUI();
        this.pipes.resetPipes(); // Добавляем этот вызов
        this.pipes.startGame(); // Запускаем движение труб
        this.pipes.node.active = true; // Показываем трубы
        this.Restart();
    }
}




