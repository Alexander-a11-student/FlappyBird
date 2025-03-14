import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends Component {

    @property({
        type: Label,
        tooltip: 'Current score'
    })
    private scoreCurrent: Label = null;
    @property({
        type: Label, 
        tooltip: 'Best score'
    })
    private bestScore: Label = null;
    @property({
        type: Label,
        tooltip: 'Restart game'
    })
    private restart: Label = null;

    private currentScoreValue: number = 0;
    private bestScoreValue: number = 0;


    updateScore(score: number) {
        this.currentScoreValue = score;
        this.scoreCurrent.string = this.currentScoreValue.toString();
    }

    resetScrore() {
        this.updateScore(0);
        this.hideResults();
    }

    hideResults() {
        this.restart.node.active = false;
        this.bestScore.node.active = false;
    }

    addScore() {
        this.updateScore(this.currentScoreValue + 1);
    }


    showResults() {
        this.bestScoreValue = Math.max(this.bestScoreValue, this.currentScoreValue);
        this.bestScore.string = this.bestScoreValue.toString();
        
        this.restart.node.active = true;
        this.bestScore.node.active = true;
    }

}


