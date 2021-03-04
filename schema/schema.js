const graphql = require('graphql')
const userService = require('../services/user-service')
const _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

// const users = [
//     { id: '1', first_name: 'Patrick', last_name: 'Rothfuss', email: 'pr@gmail.com' }
// ];

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return userService.getUserById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return userService.getUserList();
            }
        }
    }
})

const Mut = new GraphQLObjectType({
    name: 'Mutation',
    field: {
        addUser: {
            type: UserType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve(parent, args) {
                console.log(args)
                return userService.createNewUser(args)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation: Mut
});