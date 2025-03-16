import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director } from 'cc';
import { Ground } from './Ground';
import { Result } from './Result';
import { Bird } from './Bird';
import { UIManager } from './UIManager';
import { Pipes } from './Pipes';
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
        input.on(Input.EventType.KEY_DOWN, this.GameState, this);
        Pipes.eventTarget.on('addScore', this.result.addScore, this.result);
        this.node.on(Node.EventType.TOUCH_START, () => { this.bird.fly(); });
    }

    GameState(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_D:
                this.GameOver();
                break;
        }
    }

    onButtonClicked() {
        if (this.isButtonClicked) return; // Prevent multiple clicks
        console.log('Button clicked!');
        this.isButtonClicked = true; // Set the flag
        this.Start();
    }

    GameOver() {
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




