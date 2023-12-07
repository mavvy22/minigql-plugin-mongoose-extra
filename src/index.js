import models from './models/index.js';
import resolvers from './resolvers.js';

const schema = `
type Token {
  token: String
}
input LoginUserInput {
  email: String!
  password: String!
}
`;

export { models as models };

export default function () {
  return {
    schema,
    resolvers,
  };
}
