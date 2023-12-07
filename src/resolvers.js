import bcrypt from 'bcryptjs';
import * as jwt from './jwt.js';

const loginUser = {
  handler: async ({ input, models }) => {
    const { email, password } = input;
    const userModel = models.User();
    const user = await userModel.db.findOne({ email, isDeleted: false });

    if (!user) {
      throw new Error('invalid_login');
    }

    const verify = await bcrypt.compare(password, user.password);

    if (!verify) {
      throw new Error('invalid_login');
    }

    const token = jwt.generate({
      id: user._id.toString(),
      token: user.clientToken,
      role: user.role,
    });

    return { token };
  },
  name: 'loginUser',
  inputVariable: 'LoginUserInput!',
  returnType: 'Token',
};

export default [loginUser];
