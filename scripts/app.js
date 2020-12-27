// class instances
const chatroom = new Chatroom('Música', 'José');

// get chats and render to the DOM
chatroom.getChats(data => {
	// console.log(data);
	chatUI.render(data);
});

// DOM queries
const chatList = document.querySelector('.chat-list');

// class instances
const chatUI = new ChatUI(chatList);