const tmi = require('tmi.js');

const opts = {
	options: {
		debug: true
	},
	connection: {
		reconnect: true
	},
	identity: {
		username: 'nickname',
		password: 'oauth:id'
	},
	channels: [
		'namechannel'
	]
}

const client = new tmi.client(opts);

client.connect();

client.on('connected', (address, port) => {
	client.action('nickname', `Hello my friends! Connected to ${address}:${port}`);
});

client.on('chat', (target, ctx, message, self) => {
	if (self) return;

	const commandName = message.trim();

	if (commandName === "!hello") {
		client.say(target, `Hello ${ctx.username}`);
	}

	if (commandName === "!game") {
		client.say(target, 'Im playing right now!');
	}

	if (commandName === "!dice") {
		const num = rollDice();
		client.say(target, `You rolled a ${num}`);
	}
});

function rollDice() {
	const sides = 6;
	return Math.floor(Math.random() * sides) + 1;
}