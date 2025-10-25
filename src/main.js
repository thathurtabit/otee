// Initialize the game after Phaser is loaded globally
async function initGame() {
  // Phaser is now loaded globally from the script tag
  const Phaser = window.Phaser;

  const BootState = (await import("./states/Boot")).default;
  const SplashState = (await import("./states/Splash")).default;
  const GameState = (await import("./states/Game")).default;
  const config = (await import("./config")).default;

  class Game extends Phaser.Game {
    constructor() {
      const docElement = document.documentElement;
      const width =
        docElement.clientWidth > config.gameWidth
          ? config.gameWidth
          : docElement.clientWidth;
      const height =
        docElement.clientHeight > config.gameHeight
          ? config.gameHeight
          : docElement.clientHeight;

      super(width, height, Phaser.AUTO, "game", null);

      this.state.add("Boot", BootState, false);
      this.state.add("Splash", SplashState, false);
      this.state.add("Game", GameState, false);

      // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
      if (!window.cordova) {
        this.state.start("Boot");
      }
    }
  }

  window.game = new Game();

  if (window.cordova) {
    var app = {
      initialize: function () {
        document.addEventListener(
          "deviceready",
          this.onDeviceReady.bind(this),
          false
        );
      },

      // deviceready Event Handler
      //
      onDeviceReady: function () {
        this.receivedEvent("deviceready");

        // When the device is ready, start Phaser Boot state.
        window.game.state.start("Boot");
      },

      receivedEvent: function (id) {
        console.log("Received Event: " + id);
      },
    };

    app.initialize();
  }
}

// Initialize the game
initGame();
