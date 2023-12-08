import { handleCreateUser, handleLoginUser } from './user-utils.js';

const loginUser = {
  handler: async ({ input, models }) => {
    const model = models.User().db;
    const token = await handleLoginUser(input, model);
    return { token };
  },
  name: 'loginUser',
  inputVariable: 'LoginUserInput!',
  returnType: 'Token',
};

const createUser = {
  handler: async ({ input, models }) => {
    const model = models.User().db;
    const token = await handleCreateUser(input, model);
    return { token };
  },
  name: 'createUser',
  inputVariable: 'CreateUserInput!',
  returnType: 'Token',
};

export default [loginUser, createUser];
