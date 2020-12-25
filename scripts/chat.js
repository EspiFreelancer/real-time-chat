class Chatroom {
	constructor(channel, username) {
		this.channel = channel;
		this.username = username;
		this.chats = db.collection('chats');
		this.unsubscribe;
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

	// real-time listener to monitoring collection "chats" in db
	getChats(callbackFunc) {
		this.unsubscribe = this.chats
			.where('channel', '==', this.channel)
			.orderBy('created_at')
			.onSnapshot(snapshot => {
				snapshot.docChanges().forEach(change => {
					if (change.type === 'added') {
						// update UI
						callbackFunc(change.doc.data());
					}
				})
			})
	}

	// update username
	updateUsername(username) {
		this.username = username;
	}

	// update channel, unsubscribe from changes.
	updateChannel(channel) {
		this.channel = channel;
		console.log('channel updated');
		if (this.unsubscribe) {
			this.unsubscribe();
		}
	}
}

const chatroom = new Chatroom('Música', 'José');
// console.log(chatroom);

// chatroom.addChat('Los Enanitos Verdes me gustan mucho')
// 	.then(() => console.log('mensaje de chat agregado'))
// 	.catch(err => console.log(err));

chatroom.getChats(data => {
	console.log(data);
});


// Channel change test
// setTimeout(() => {
// 	chatroom.updateChannel('General');
// 	chatroom.updateUsername('Marcelo');
// 	chatroom.getChats(data => {
// 		console.log(data);
// 	});
// 	chatroom.addChat('Hola a todos');
// }, 3000);