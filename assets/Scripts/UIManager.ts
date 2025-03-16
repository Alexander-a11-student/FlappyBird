import { _decorator, Component, Node, tween, UIOpacity, Label, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property({
        type: Node,
        tooltip: 'Start button'
    })
    private startButton: Node = null;

    @property({
        type: Node,
        tooltip: 'Game title'
    })  
    private gameTitle: Node = null;

    private startButtonInitialPosition: Vec3 = null;

    start() {
        if (this.startButton) {
            this.startButtonInitialPosition = this.startButton.position.clone();
        }
    }

    update(deltaTime: number) {
        
    }

    hideStartUI() {
        if (this.startButton) {
            this.fadeOut(this.startButton);
            this.disableStartButton(); // Disable the button after hiding UI
        }
        if (this.gameTitle) {
            this.fadeOut(this.gameTitle);
        }
    }

    showStartUI() {
        if (this.startButton) {
            console.log(this.startButton.name);
            this.fadeIn(this.startButton);
            this.startButton.active = true; // Ensure the button is active when showing UI
        }
        if (this.gameTitle) {
            console.log(this.gameTitle.name);
            this.fadeIn(this.gameTitle);
        }
    }

    fadeOut(node: Node) {
        const uiOpacity = node.getComponent(UIOpacity);
        tween(uiOpacity)
            .to(0.3, { opacity: 0 })
            .start();
    }
    
    fadeIn(node: Node) {
        let uiOpacity = node.getComponent(UIOpacity);
        uiOpacity.opacity = 0;
        tween(uiOpacity)
            .to(0.3, { opacity: 255 })
            .start();
    }

    disableStartButton() {
        if (this.startButton) {
            this.scheduleOnce(() => {
                this.startButton.active = false; // Disable the button after 1 second
            }, 0.3);
        }
    }

}


