module.exports = {
  friendlyName: 'Calculate Total Price',

  description: 'Calculate the total price of two products based on their names.',

  inputs: {
    name1: {
      type: 'string',
      required: true
    },
    name2: {
      type: 'string',
      required: true
    }
  },

  exits: {
    success: {
      description: 'Total price calculated successfully.',
    },
    notFound: {
      description: 'One or both products not found.',
      responseType: 'notFound'
    }
  },

  fn: async function (inputs, exits) {
    try {
      let product1 = await Product.findOne({ name: inputs.name1 });
      let product2 = await Product.findOne({ name: inputs.name2 });

      if (!product1 || !product2) {
        throw 'notFound';
      }

      let calculatedPrice1 = product1.price
      let calculatedPrice2 = product2.price

      return exits.success(calculatedPrice1 + calculatedPrice2);
    } catch (err) {
      if (err === 'notFound') {
        return exits.notFound();
      }
      throw err;
    }
  }
};
