import jwt from 'jsonwebtoken';

export const generate = (payload) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || '10y';
  const algorithm = 'HS256';
  const options = {
    expiresIn,
    algorithm,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  return token;
};

const verify = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const decode = async (token) => {
  await verify(token);

  return jwt.decode(token, { complete: true });
};

/**
 * Get the authorization bearer
 */
export const getBearer = (authorization) => {
  return authorization.split(' ')[1];
};

/**
 * Will verify and decode the token.
 */
export const verifyAndDecode = (context) => {
  const bearer = getBearer(context);

  if (!bearer) {
    return undefined;
  }
  return decode(bearer);
};
