const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

yargs.version('15.0.2');

yargs.command({
	command: 'add',
	describe: 'Adding a note',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true,
			type: 'String'
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'String'
		}
	},
	handler(argv) {
		notes.addNotes(argv.title, argv.body);
	}
});

yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true,
			type: 'String'
		}
	},
	handler(argv) {
		notes.removeNotes(argv.title);
	}
});

yargs.command({
	command: 'list',
	describe: 'Lists all notes',
	handler() {
		notes.listNotes();
	}
});
~yargs.command({
	command: 'read',
	describe: 'Read a note',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true,
			type: 'String'
		}
	},
	handler(argv) {
		notes.readNotes(argv.title);
	}
});

yargs.parse();
