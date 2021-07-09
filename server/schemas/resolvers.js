// import user model
const userController = require('../controllers/user-controller');
const { User } = require('../models');
// import sign token from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async () => {
            return User.findOne
        }
    },
    Mutation: {

    },
};