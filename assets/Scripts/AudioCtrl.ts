import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioCtrl')
export class AudioCtrl extends Component {
    @property({
        type: [AudioClip],
        tooltip: 'Audio node'
    })
    private audio: AudioClip[] = [];

    @property({
        type: AudioSource,
        tooltip: 'Audio source'
    })
    private audioSource: AudioSource = null;

    public onPlaySound(IndexAudio: number) {
        this.audioSource.clip = this.audio[IndexAudio];
        this.audioSource.play();}
    }


