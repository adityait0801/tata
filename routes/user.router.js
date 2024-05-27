const {Router} = require('express');
const { user } = require('../controllers/user');

const useRouter = Router();

userRouter.get('/get-user', user);

module.exports = userRouter;