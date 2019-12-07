const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
	const notes = loadNotes();
	const duplicateNotes = notes.find((note) => note.title === title);

	if (!duplicateNotes) {
		notes.push({
			title: title,
			body: body
		});
		saveNotes(notes);
		console.log(chalk.green.inverse('New note added'));
	} else {
		console.log(chalk.red.inverse('Note title taken'));
	}
};

const removeNotes = (title) => {
	const notes = loadNotes();
	const noteToKeep = notes.filter((note) => note.title !== title);

	if (notes.length > noteToKeep.length) {
		console.log(chalk.green.inverse('Note removed'));
		saveNotes(noteToKeep);
	} else {
		console.log(chalk.red.inverse('No note found'));
	}
};

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.underline.bold.blue.inverse('Your notes:'));
	notes.forEach((note) => console.log(chalk.italic.green.bold(note.title)));
};

const readNotes = (title) => {
	const notes = loadNotes();
	const noteToRead = notes.find((note) => note.title === title);

	if (noteToRead == undefined) {
		console.log(chalk.red.bold.inverse('No notes found with the title : ' + title));
	} else {
		console.log(chalk.underline.bold.blue.inverse(title));
		console.log(noteToRead.body);
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.jason', dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.jason');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (error) {
		return [];
	}
};

module.exports = {
	addNotes: addNotes,
	removeNotes: removeNotes,
	listNotes: listNotes,
	readNotes: readNotes
};
