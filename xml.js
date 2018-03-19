function request(url) {
	return new Promise(function(resolve, reject) {
		// create XMLHttpRequest object
		const xhttp = new XMLHttpRequest();
		// function executes each time xhttp status changes
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState === 4 && xhttp.status === 200) {
				return resolve(xhttp.responseText);
			}else if (xhttp.readyState <= 3 || xhttp.status === 0) {
				console.log("loading")
			}
			else {
				return reject(xhttp.status);
			}
		}

		// initialize a request
		xhttp.open('get', url, true);
		// send the request
		xhttp.send();
	});
}

// pass server response into an object
function getUsers(users) {
	const userList = JSON.parse(users);
	getRepos(userList);
	displayUser(userList)
}

// send request to get all user repositories
function displayUser(users) {
	Promise.all(users.map(function(user) {
		const userDisplay = document.createElement('div');
		userDisplay.className= "user"
		userDisplay.innerHTML = user.login;
		document.body.appendChild(userDisplay);
	}))
}

function getRepos(users){
	const allRepos = [];
	Promise.all(users.map(function(user) {
		request(user.repos_url)
		.then(function(response){
			return allRepos.push(response)
		})
	}))
}	

const getUserUrl = `https://api.github.com/users`;

function allRequests() {
	request(getUserUrl)
	.then(function(users) {
		getUsers(users);
	})
	.catch(function(error) {
		console.log(error);
	})
};

