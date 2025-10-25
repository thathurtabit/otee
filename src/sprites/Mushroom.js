// Use global Phaser that will be set by main.js
const Phaser = window.Phaser;

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
  }

  update() {
    this.angle += 1;
  }
}
