class Chatroom {
	constructor(channel, username) {
		this.channel = channel;
		this.username = username;
		this.chats = db.collection('chats');
	}

	// create documents structure
	async addChat(message) {
		const now = new Date();
		const chat = {
			message,
			channel: this.channel,
			username: this.username,
			created_at: firebase.firestore.Timestamp.fromDate(now)
		};

		// save documents in Firestore
		const response = await this.chats.add(chat);
		return response;
	}
}

// const chatroom = new Chatroom('Música', 'José');
// console.log(chatroom);

// chatroom.addChat('Los Enanitos Verdes me gustan mucho')
// 	.then(() => console.log('mensaje de chat agregado'))
// 	.catch(err => console.log(err));