import bcrypt from 'bcryptjs';

import { randomChar } from './utils.js';
import * as jwt from './jwt.js';

export const handleLoginUser = async (input, model) => {
  const { email, password } = input;
  const user = await model.findOne({ email, isDeleted: false });

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

  return token;
};

export const handleCreateUser = async (input, model) => {
  const clientToken = `${randomChar(100)}_${Number(new Date())}`;
  const d = {
    name: {
      lastName: input.lastName,
      firstName: input.firstName,
    },
    email: input.email,
    password: input.password,
    hasPassword: true,
    gender: input.gender,
    birthday: input.birthday,
    role: 'CUSTOMER',
    registrationType: 'email',
  };

  const inputData = {
    ...d,
    clientToken,
  };

  try {
    const data = await model.create({
      ...inputData,
      isDeleted: false,
    });

    const token = jwt.generate({
      id: data._id.toString(),
      token: clientToken,
      role: input.role,
    });

    return token;
  } catch (e) {
    console.log('error_user_create');
    if (e.message.indexOf('dup key')) {
      throw new Error('existing_email');
    }
    throw new Error('unable_to_create_data');
  }
};
