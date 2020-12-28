/* DOM queries */

// to add list of chats
const chatList = document.querySelector('.chat-list');

// to add chat message from user
const newChatForm = document.querySelector('.new-chat');

// to update username
const newUsernameForm = document.querySelector('.new-name');

// to notify username update
const messageUpdate = document.querySelector('.update-message');

// to check if username already exists in local storage
let username = localStorage.username ? localStorage.username : 'Anonimo_' 
	+ Math.floor((Math.random() * 10001)); 

// to change chats rooms
const channels = document.querySelector ('.chat-rooms');



/* Class instances */

// default user and default chat room
const chatroom = new Chatroom('general', username);

// instance of the class that generates the chat list
const chatUI = new ChatUI(chatList);



// get chats and render to the DOM
chatroom.getChats(data => {
	chatUI.render(data);
});

// add new chat message from user
newChatForm.addEventListener('submit', e => {
	e.preventDefault();
	const message = newChatForm.message.value.trim();
	chatroom.addChat(message)
		.then(() => newChatForm.reset())
		.catch(err => console.log(err))
});

// update username
newUsernameForm.addEventListener('submit', e => {
	e.preventDefault();
	const newUsername = newUsernameForm.name.value.trim();
	chatroom.updateUsername(newUsername);
	newUsernameForm.reset();

	// show and hide the update message
	messageUpdate.innerText = `Nombre de usuario actualizado a ${newUsername}`;
	setTimeout(() => messageUpdate.innerText = '', 3000);
});

// update channel
channels.addEventListener('click', e => {
	if(e.target.tagName === 'BUTTON'){
		chatUI.clear();
		chatroom.updateChannel(e.target.getAttribute('id'));
		chatroom.getChats(chat => chatUI.render(chat)); // chat is data to render in DOM
	}
})
