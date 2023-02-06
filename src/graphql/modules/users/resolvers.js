import User from '../../../models/User.js';

export default {
    User: {
        fullName: (user) => `${user.firstname} ${user.lastName}`,
    },
    Query: {
        users: () => User.find(),
        user: (_, { id }) => User.findById(id),
    },
    Mutation: {
        createUser: (_, { data }) => User.create(data),
        updateUser: (_, { id, data }) => User.findOneAndUpdate(id, data, { new: true }),
        deleteUser: async (_, { id }) => !!(await User.findOneAndDelete(id)),
    },
};