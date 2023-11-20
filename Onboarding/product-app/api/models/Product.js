module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    price: { type: 'number', required: true },
    description: { type: 'string' },
    createdAt: { type: 'number', autoCreatedAt: true},
    updatedAt: { type: 'number', autoUpdatedAt: true }
  },
};