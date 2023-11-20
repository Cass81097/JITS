module.exports = {
  attributes: {
    username: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    isAdmin: { type: 'boolean', defaultsTo: false },
  },
};
