import models from './models/index.js';
import resolvers from './resolvers.js';

const schema = `
type Token {
  token: String
}
type Status {
  status: Boolean
}
input LoginUserInput {
  email: String!
  password: String!
}
input CreateUserInput {
  email: String!
  password: String!
  firstName: String!
  lastName: String!
  gender: String!
  birthday: String!
}
`;

export { models as models };

export default function () {
  return {
    schema,
    resolvers,
  };
}
