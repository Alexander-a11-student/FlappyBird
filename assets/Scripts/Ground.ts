import { _decorator, Canvas, Component, director, Game, Node, UITransform, Vec3 } from 'cc';
import { GameCtrl } from './GameCtrl';

const { ccclass, property } = _decorator;


@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: [Node],
        tooltip: 'Ground nodes'
    })
    private grounds: Node[] = [];


    public gameCtrl = new GameCtrl

    private locations: Vec3[] = [];
    private scene = null;
    private canvas = null;
    private canvasWidth: number = null;
    private groundWidth: number = null;

    onLoad() {
        this.StartUp();
    }

    StartUp() {
        this.scene = director.getScene();
        this.canvas = this.scene.getComponentInChildren(Canvas);
        this.canvasWidth = this.canvas.getComponent(UITransform).width;

        if (this.grounds.length > 0) {
            this.groundWidth = this.grounds[0].getComponent(UITransform).width;
        }

        for (let i = 0; i < this.grounds.length; i++) {
            this.locations.push(new Vec3(i * this.groundWidth, 0, 0));
        }
    }

    update(deltaTime: number) {
        for (let i = 0; i < this.grounds.length; i++) {
            this.locations[i].x = this.grounds[i].position.x;

            if (this.locations[i].x <= -this.groundWidth) {
                this.locations[i].x += this.canvasWidth + this.groundWidth;
            }

            this.locations[i].x -= deltaTime * this.gameCtrl.speedGround;
            this.grounds[i].setPosition(this.locations[i]);
        }
    }
}