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



/* Class instances */

// default user and default chat room
const chatroom = new Chatroom('General', username);

// instance of the class that generates the chat list
const chatUI = new ChatUI(chatList);



// get chats and render to the DOM
chatroom.getChats(data => {
	// console.log(data);
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
