import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node,
        tooltip: 'Ground 1'
    })
    private ground1: Node = null;

    @property({
        type: Node,
        tooltip: 'Ground 2'
    })
    private ground2: Node = null;

    @property({
        type: Node,
        tooltip: 'Ground 3'
    })
    private ground3: Node = null;

    @property({
        type: Number,
        tooltip: 'Game speed'
    })
    private gameSpeed: number = 50;

    private locationGround1 = new Vec3();
    private locationGround2 = new Vec3();
    private locationGround3 = new Vec3();

    private scene = null;
    private canvas = null;
    private canvasWidth = null
    private groudWidth: number = null;

    onLoad() {
        this.StartUp();
    }

    StartUp() {
        this.groudWidth = this.ground1.getComponent(UITransform).width;
        this.scene = director.getScene();
        this.canvas = this.scene.getComponentInChildren(Canvas);
        this.canvasWidth = this.canvas.getComponent(UITransform).width;

        this.locationGround1.x = 0;
        this.locationGround2.x = this.groudWidth;
        this.locationGround3.x = this.groudWidth * 2;
    }

    update(deltaTime: number) {
        this.locationGround1.x = this.ground1.position.x;
        this.locationGround2.x = this.ground2.position.x;
        this.locationGround3.x = this.ground3.position.x;

        if (this.locationGround1.x <= -this.groudWidth) {
            this.locationGround1.x += this.canvasWidth + this.groudWidth;
        }

        if (this.locationGround2.x <= -this.groudWidth) {
            this.locationGround2.x += this.canvasWidth + this.groudWidth;
        }

        if (this.locationGround3.x <= -this.groudWidth) {
            this.locationGround3.x += this.canvasWidth + this.groudWidth;
        }

        this.locationGround1.x -= deltaTime * this.gameSpeed;
        this.locationGround2.x -= deltaTime * this.gameSpeed;
        this.locationGround3.x -= deltaTime * this.gameSpeed;

        this.ground1.setPosition(this.locationGround1);
        this.ground2.setPosition(this.locationGround2);
        this.ground3.setPosition(this.locationGround3);
    }
}