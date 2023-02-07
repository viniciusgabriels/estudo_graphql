import User from '../../../models/User.js';
import { USER_ADDED } from './channels.js';

export default {
    User: {
        fullName: (user) => `${user.firstname} ${user.lastName}`,
    },
    Query: {
        users: () => User.find(),
        user: (_, { id }) => User.findById(id),
    },
    Mutation: {
        createUser: async (_, { data }, { pubsub }) => {
            const user = User.create(data);

            pubsub.publish(USER_ADDED, {
                userAdded: user
            });

            return user;
        },
        updateUser: (_, { id, data }) => User.findOneAndUpdate(id, data, { new: true }),
        deleteUser: async (_, { id }) => !!(await User.findOneAndDelete(id)),
    },
    Subscription: {
        userAdded: {
            subscribe: (obj, args, { pubsub }) => pubsub.asuncInterator(USER_ADDED),
        },
    },
};