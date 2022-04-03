const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const users = [
	{id: 1, username: "Jean", age: 27}
]

const app = express();
app.use(cors());

const createUser = (input) => {
	const id = Date.now();
	console.log('ici1')
	return {
		id, ...input
	}
}

// создадим Resolver root 
// фунции с одноименными названиями как описаны в схеме
// в реальном приложении будут запросы к базе данных, здксь просто иммитируем с массивом

const root = {
	getAllUsers: () => {
		return users
	},
	getUser: ({id}) => {
		return users.find(user => user.id == id)
	},
	createUser: ({input}) => {
		const user = createUser(input);
		console.log('ici');
		users.push(user);
		return user;
	}
}

app.use('/graphql', graphqlHTTP({
	graphiql: true,		// включает графический интерфейс в браузере
	schema,
	rootValue: root
}))

app.listen(5000, ()=> console.log('server started on port 5000'));
