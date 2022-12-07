const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken, verifyToken } = require('../utils/auth');

const resolvers = {
  Query: {
   
    me: async (parent, { token }) => {
      if (!token) {
        throw new AuthenticationError('Invalid token');
      }
      
      const {username} = verifyToken(token);

      return User.findOne({ username });
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

    
    saveBook: async (parent, { token, book }) => {
      if (!token) {
        throw new AuthenticationError('Invalid token');
      }
      
      const {username} = verifyToken(token);

      return User.findOneAndUpdate(
        { username },
        {
          $addToSet: { savedBooks: { book} },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    
    removeBook: async (parent, { token, bookId }) => {
      if (!token) {
        throw new AuthenticationError('Invalid token');
      }
      
      const {username} = verifyToken(token);

      return User.findOneAndUpdate(
        { username },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
