const readline  = require('readline-sync');
function start() {
	const contentsearch = {};
	contentsearch.searchTerm = askAndReturnSearchTerm();

	function askAndReturnSearchTerm() {
	 	return readline.question('Type a search term: ');
	 	} ;
	 console.log(contentsearch);
};

start();