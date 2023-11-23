const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('book');
                return userData;
            }
            throw new AuthenticationError('Not logged in!');
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Wrong credentials!')
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Wrong credentials!')
            }
            const token = signToken(user);

            return { token, user };
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, { book }, context) => {
            console.log(book, context.user);
            if (context.user) {
                const newUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: book } },
                    { new: true }
                )
                return newUser;
            }
            throw new AuthenticationError('You are not logged in!')
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const newUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: { savedBooks: { args } } },
                    { new: true }
                )
                return newUser;
            }
            throw new AuthenticationError('You are not logged in!')
        }
    }
  };
  
  module.exports = resolvers;