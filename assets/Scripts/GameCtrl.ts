import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode } from 'cc';
import { Ground } from './Ground';
import { Result } from './Result';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type: Ground,
        tooltip: 'Ground nodes'
    })
    private ground: Ground = null;

    @property({
        type: CCInteger,
        tooltip: 'speed ground node'
    })
    public speedGround: number = 50;

    @property({
        type: CCInteger,
        tooltip: 'Pipe speed'
    })
    public speedPipe: number = 50;

    @property({
        type: Result,
        tooltip: 'Pipe interval'
    })
    private result: Result = null;


    onLoad(){
        this.initListener();
    }

    initListener(){
        input.on(Input.EventType.KEY_DOWN, this.GameState, this);
    }

    GameState(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.Start();
                break;
            case KeyCode.KEY_B:
                this.result.addScore();
                break;
            case KeyCode.KEY_C:
                this.Restart();
        }
    }



    Restart(){
        this.result.showResults();    
    }

    Start(){
        this.result.resetScrore();
    }
}




