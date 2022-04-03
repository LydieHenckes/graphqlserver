const {buildSchema} = require('graphql');

const schema = buildSchema(`
	type User {
		id: ID
		username: String
		age: Int
		posts: [Post]
	}

	type Post {
		id: ID
		title: String
		content: String

	}

	input UserInput {
		id: ID
		username: String!
		age: Int!
		posts: [PostInput]
	}

	input PostInput {
		id: ID
		title: String!
		content: String!

	}

	type Query {
		getAllUsers: [User]
		getUser(id: ID) : User
	}
	type Mutation {
		createUser(input: UserInput) : User
	}

`)
// input - тип для описания мутаций
// ! - обязательное поле
module.exports = schema;


//
/*
localhost:5000/graphql
 м, делать такие запросы 


mutation {
  createUser(input: {
    username: "Petya"
    age: 25
  }) {
    id, username
  }
}

mutation {
  createUser(input: {
    username: "Petya2"
    age: 25
    posts: [
      {id: 1, title: "JavaScript", content: "hjkhkh"}
    ]
  }) {
    id, username, age
  }
}

query {
  getAllUsers {
    id, username
  }
}
*/