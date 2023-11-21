// models/Counter.js
module.exports = {
    attributes: {
      modelName: { type: 'string', unique: true, required: true },
      currentId: { type: 'number', required: true }
    }
  };
  