import Phaser from "phaser";

class ExampleScene extends Phaser.Scene {
  constructor() {
    super("ExampleScene");
  }

  init () {
    this.TILE_SIZE = 16;
    this.SCALE = 1.0;
    this.TILE_WIDTH = 40;
    this.TILE_HEIGHT = 25;
  }

  preload() {
    this.load.image("tilemap_tiles", "/phaserAssets/Tilemap_Packed.png");
    this.load.tilemapTiledJSON("three-farmhouses", "/phaserAssets/Three_Farmhouses.tmj");
  }

  create() {
    this.map = this.add.tilemap("three-farmhouses", this.TILESIZE, this.TILESIZE, this.TILEHEIGHT, this.TILEWIDTH);

    // Add a tileset to the map
    this.tileset = this.map.addTilesetImage("kenney-tiny-town", "tilemap_tiles");

    // Create the layers
    this.groundLayer = this.map.createLayer("Ground-n-Walkways", this.tileset, 0, 0);
    this.treesLayer = this.map.createLayer("Trees-n-Bushes", this.tileset, 0, 0);
    this.housesLayer = this.map.createLayer("Houses-n-Fences", this.tileset, 0, 0);

    // Camera settings
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setZoom(this.SCALE);
  }

}

function createGame(attachElement) {
  const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 400,
    parent: attachElement,
    scene: [ExampleScene]
  };

  return new Phaser.Game(config);
}

export {createGame};