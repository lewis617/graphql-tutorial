module.exports = {
  Query: {
    user: (parent, args) => ({ name: args.name }),
    users: () => [],
  },
  Mutation: {
    createUser: (parent, args) => {
      console.log('createUser args: ', args);
      return { name: args.user.name };
    },
    updateUser: (parent, args) => {
      console.log('updateUser args: ', args);
      return { id: args.user.id };
    },
    deleteUser: (parent, args) => {
      console.log('deleteUser args: ', args);
      return { id: args.user.id };
    },
  },
};
