// import user and Book model
const { User, Book } = require('../models');
// import sign token from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, args) => {
            return User.findOne({
                args
            });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            } 
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, { email, password }) => {
            const user= await User.findOne({ email });
            
            if (!user) {
                throw new AuthenticationError('No user found with this email found!');
              }
        
              const correctPw = await user.isCorrectPassword(password);
        
              if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
              }
        
              const token = signToken(user);
              return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) { 
                const updatedUser = await User.
                findByIdAndUpdate(
                  { _id: context.user._id },
                  { $addToSet: { savedBooks: args.input } },
                  { new: true}
                );
                return updatedUser;
            } 
            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, args, context) => {
        if (context.user) { 
            const updatedUser = await User.
            findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { BookId: args.BookId } } },
              { new: true}
            );
            return updatedUser;
        } 
        throw new AuthenticationError('You need to be logged in!');
        }
    },   
};

module.exports = resolvers;