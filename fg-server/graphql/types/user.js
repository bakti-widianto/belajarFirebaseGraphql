var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInteger = require('graphql').GraphQLInteger;

//user Type
exports.userType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
        return {
            userName: {
                type: new GraphQLNonNull(GraphQLID)
            },
            Name: {
                type: GraphQLString
            },
            Age: {
                type: GraphQLString
            }
        }
    }
});