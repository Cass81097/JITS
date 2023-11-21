module.exports = {
  attributes: {
    customId: { type: 'number', unique: true }, // ID tùy chỉnh
    name: { type: 'string', required: true },
    price: { type: 'number', required: true },
    description: { type: 'string' },
    createdAt: { type: 'number', autoCreatedAt: true },
    updatedAt: { type: 'number', autoUpdatedAt: true }
  },

  beforeCreate: function (product, proceed) {
    const modelName = 'Product';

    Counter.findOne({ modelName: modelName })
      .then(counter => {
        if (!counter) {
          return Counter.create({ modelName: modelName, currentId: 1 })
            .then(newCounter => {
              product.customId = 1; 
              return proceed();
            });
        } else {
          product.customId = counter.currentId + 1;
          return Counter.updateOne({ modelName: modelName })
            .set({ currentId: product.customId })
            .then(() => proceed());
        }
      })
      .catch(err => proceed(err));
  }

};