import { config } from '../game';
import Beam from '../entity/Beam';
import Explosion from '../entity/Explosion';
export class MainMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'mainMenu' });
	}
	create() {
		// let menubg = this.add.image(400, 300, 'BkGrnd');
		// let welcomeText = this.add.text(200, 200, "- To start the game hit SPACEBAR -", {
		//     font: "25px Arial",
		//     fill: "#ff0044",
		//     align: "center"
		// });

		// this.input.keyboard.on('keydown_SPACE', function (event) {
		//   this.scene.start('lvl_1');
		// }, this)
		this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
		this.background.setOrigin(0, 0);

		this.hero = this.physics.add.image(-config.width, config.height / 2, 'hero');

		this.cursorKeys = this.input.keyboard.createCursorKeys();

		this.hero.setCollideWorldBounds(true);

		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		this.projectiles = this.add.group({
			classType: Beam,
			maxSize: 1000,
			runChildUpdate: true
		});

		this.enemy1 = this.add.image(config.width, config.height / 2, 'enemy1');
		this.enemy2 = this.add.image(config.width, config.height / 4, 'enemy2');
		this.enemy3 = this.add.image(config.width, config.height / 1.25, 'enemy3');
		this.enemy4 = this.add.image(config.width, config.height / 1.5, 'enemy4');

		this.enemy1.flipX = true;
		this.enemy1.name = 1;
		this.enemy2.flipX = true;
		this.enemy2.name = 2;
		this.enemy3.flipX = true;
		this.enemy3.name = 3;
		this.enemy4.flipX = true;
		this.enemy4.name = 4;

		this.enemies = this.physics.add.group();
		this.enemies.add(this.enemy1);
		this.enemies.add(this.enemy2);
		this.enemies.add(this.enemy3);
		this.enemies.add(this.enemy4);

		this.physics.add.overlap(this.hero, this.enemies, this.hurtHero, null, this);

		this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
		// this.music = this.sound.add('music');
		const musicConfig = {
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: false,
			delay: 0
		};
		// this.music.play(musicConfig);

		this.score = 0;
		this.scoreLabel = this.add.text(15, 10, 'SCORE', 48);

		this.enemy1.setInteractive();
		this.enemy2.setInteractive();
		this.enemy3.setInteractive();
		this.enemy4.setInteractive();

		// this.beamSound = this.sound.add('audio_beam');
		// this.explosionSound = this.sound.add('audio_explosion');
	}

	moveHeroManager() {
		if (this.cursorKeys.left.isDown) this.hero.setVelocityX(-400);
		else if (this.cursorKeys.right.isDown) this.hero.setVelocityX(400);
		else this.hero.setVelocityX(0);

		if (this.cursorKeys.up.isDown) this.hero.setVelocityY(-400);
		else if (this.cursorKeys.down.isDown) this.hero.setVelocityY(400);
		else this.hero.setVelocityY(0);
	}

	shootBeam() {
		const beam = new Beam(this);
		// this.beamSound.play();
	}

	moveEnemy(enemy, speed) {
		enemy.x -= speed;
		if (enemy.x < 0) {
			this.resetEnemyPosition(enemy);
		}
	}

	resetEnemyPosition(enemy) {
		enemy.x = config.width;
		enemy.y = Phaser.Math.Between(0, config.height);
	}

	hurtHero(hero, enemy) {
		this.resetEnemyPosition(enemy);
		if (this.hero.alpha < 1) {
			return;
		}
		const explosion = new Explosion(this, hero.x, hero.y);
		hero.disableBody(true, true);
		this.time.addEvent({
			delay: 1000,
			callback: this.resetHero,
			callbackScope: this,
			loop: false
		});
		// this.explosionSound.play();
	}

	resetHero() {
		const x = -64;
		const y = config.height / 2 - 8;
		this.hero.enableBody(true, x, y, true, true);
		this.hero.alpha = 0.5;

		const tween = this.tweens.add({
			targets: this.hero,
			x: +64,
			ease: 'Power1',
			duration: 1500,
			repeat: 0,
			onComplete: function() {
				this.hero.alpha = 1;
			},
			callbackScope: this
		});
	}

	hitEnemy(projectile, enemy) {
		const explosion = new Explosion(this, enemy.x, enemy.y);
		projectile.destroy();
		this.resetEnemyPosition(enemy);
		this.score += 10 * enemy.name;
		const formatedScore = this.zeroPad(this.score, 6);
		this.scoreLabel.text = `SCORE ${formatedScore}`;
		// this.explosionSound.play();
	}

	update() {
		this.background.tilePositionX += 0.5;
		this.moveHeroManager();
		if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
			if (this.hero.active) this.shootBeam();
		}
		for (let i = 1; i < 5; i++) {
			this.moveEnemy(this['enemy' + i], i);
		}
	}

	zeroPad(number, size) {
		let stringNumber = String(number);
		while (stringNumber.length < (size || 2)) {
			stringNumber = '0' + stringNumber;
		}
		return stringNumber;
	}
}
