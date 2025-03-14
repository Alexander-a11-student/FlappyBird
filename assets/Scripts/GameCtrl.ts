import { _decorator, CCInteger, Component, Node } from 'cc';
import { Ground } from './Ground';
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
        tooltip: 'Player node'
    })
    public speedGround: number = 50;

    @property({
        type: CCInteger,
        tooltip: 'Pipe speed'
    })
    public speedPipe: number = 50;

    

}


