const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../models');
const { signToken} = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      } 

      const user = await User.findOne({ _id: context.user._id });
      return user;
    },

    users: async () => {
      return await User.find({});
    },
  },
  
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    
    saveBook: async (parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: { savedBooks: { ...input} },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    removeBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: {bookId} } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
