import { _decorator, Component, Node, Animation, CCFloat, Vec3, tween, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    @property({
        type: Animation,
        tooltip: 'Bird animation'
    })
    private birdAnim: Animation = null;

    @property({
        type: CCFloat,
        tooltip: 'Jump force'
    })
    private jumpForce: number = 130;

    @property({
        type: CCFloat,
        tooltip: 'How long the bird will jump'
    })
    private jumpDuration: number = 0.3;


    private birdPosition: Vec3;
    private isFlying: boolean = false;
    private minY: number = -330; // Минимальное значение Y

    onLoad() {
        this.birdAnim = this.node.getComponent(Animation);

    }

    resetBird() {
        this.birdPosition = new Vec3(0, 0, 0);
        this.node.setPosition(this.birdPosition);
    }

    start() {
        this.resetBird();
    }

    fly() {
        if (!this.birdAnim) {
            console.error('Animation component not initialized');
            return;
        }
        this.isFlying = true; // Устанавливаем флаг полета

        this.birdAnim.stop();

        // Ограничение по оси y
        let targetY = this.node.position.y + this.jumpForce;
        if (targetY > 480) targetY = 460;
        if (targetY < -480) targetY = -480;

        // Поворот птички вверх
        const targetRotation = Quat.fromEuler(new Quat(), 0, 0, 30); // Поворот на 30 градусов

        tween(this.node)
            .to(this.jumpDuration, { position: new Vec3(this.node.position.x, targetY, this.node.position.z), rotation: targetRotation }, { easing: 'smooth' })
            .call(() => { this.isFlying = false; }) // Сбрасываем флаг полета после завершения анимации
            .start();

        this.birdAnim.play();
    }

    update(deltaTime: number) {
        // Постепенное возвращение птички в исходное положение
        const currentRotation = this.node.rotation;
        let targetRotation;

        if (this.isFlying) {
            targetRotation = Quat.fromEuler(new Quat(), 0, 0, 80); // Поворот на 30 градусов вверх
        } else {
            targetRotation = Quat.fromEuler(new Quat(), 0, 0, -90); // Поворот на -30 градусов вниз
        }

        Quat.slerp(currentRotation, currentRotation, targetRotation, deltaTime * 5); // Скорость возвращения
        this.node.setRotation(currentRotation);

        // Проверка на минимальное значение Y
        if (this.node.position.y < this.minY) {
            this.node.setPosition(new Vec3(this.node.position.x, this.minY, this.node.position.z));
        }
    }
}


