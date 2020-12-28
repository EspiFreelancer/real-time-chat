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
		localStorage.setItem('username', this.username);
	}

	// update channel, unsubscribe from changes.
	updateChannel(channel) {
		this.channel = channel;
		if (this.unsubscribe) {
			this.unsubscribe();
		}
	}
}
