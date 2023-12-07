import bcrypt from 'bcryptjs';

export default {
  mongooseSchemaOptions: {
    timestamps: true,
  },
  runOptions: ({ schema }) => {
    schema.virtual('displayName').get(function () {
      return `${this.name.firstName} ${this.name.lastName}`;
    });
    schema.set('toJSON', { virtuals: true });
  },
  gqlSchema: 'displayName: String',
  name: 'User',
  fields: {
    name: {
      _gql: 'PersonName',
      firstName: {
        type: String,
        required: true,
      },
      middleName: String,
      lastName: {
        type: String,
        required: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      _hidden: true,
      type: String,
      set: (value) => {
        if (!value) {
          return null;
        }
        return bcrypt.hashSync(value, Number(process.env.HASH_ROUND));
      },
    },
    hasPassword: Boolean,
    verified: Boolean,
    birthday: Date,
    role: String,
    profileImage: String,
    clientToken: {
      _hidden: true,
      type: String,
      required: true,
      unique: true,
    },
    registrationType: String, // email, google, facebook
    google: {
      _gql: 'Google',
      _hidden: true,
      id: String,
      email: String,
      signInToken: String, // temporary token created by mgql-config
      signInTokenCreatedAt: Date,
    },
    facebook: {
      _gql: 'Facebook',
      _hidden: true,
      id: String,
      email: String,
      birthday: String,
      signInToken: String, // temporary token created by mgql-config
      signInTokenCreatedAt: Date,
    },
    gender: String,
  },
};
