module.exports = {
    calculate: async function (req, res) {
        if (!req.query.name1 || !req.query.name2) {
            return res.badRequest('Names are required');
        }

        try {
            let totalCalculatedPrice = await sails.helpers.calculateTotalPrice.with({
                name1: req.query.name1,
                name2: req.query.name2
            });
            
            RedisService.publish('someChannel', `Total Price ${req.query.name1} + ${req.query.name2} is ${totalCalculatedPrice}`);
            return res.ok({ totalCalculatedPrice: totalCalculatedPrice });
        } catch (err) {
            if (err === 'notFound') {
                return res.notFound('Products not found');
            }
            return res.serverError(err);
        }
    },

    deleteAll: async function (req, res) {
        try {
            let deletedProducts = await Product.destroy({});
            let productDeleteMessage;
            if (deletedProducts && Array.isArray(deletedProducts) && deletedProducts.length > 0) {
                productDeleteMessage = `Deleted ${deletedProducts.length} products.`;
            } else {
                productDeleteMessage = "No products found to delete.";
            }

            let deletedCounters = await Counter.destroy({ modelName: 'Product' });
            let counterDeleteMessage = deletedCounters > 0 ? `Also deleted ${deletedCounters} associated counter records.` : "No associated counter records to delete.";
            return res.ok(`Deleted`);
        } catch (err) {
            return res.serverError(err);
        }
    },

    // find: async function (req, res) {
    //     try {
    //         let products = await Product.find({
    //             where: { price: { '>': 100 } }
    //         });

    //         RedisService.publish('someChannel', 'Found products with price > 100');

    //         return res.ok(products);
    //     } catch (err) {
    //         return res.serverError(err);
    //     }
    // },

    _config: {
        actions: true,
        shortcuts: true,
        rest: true
    }

};

// module.exports = {

//     create: async function (req, res) {
//         try {
//             let params = req.allParams();
//             let product = await Product.create(params).fetch();
//             return res.ok(product);
//         } catch (err) {
//             return res.serverError(err);
//         }
//     },

//     read: async function (req, res) {
//         try {
//             let products = await Product.find();
//             return res.ok(products);
//         } catch (err) {
//             return res.serverError(err);
//         }
//     },

//     update: async function (req, res) {
//         try {
//             let params = req.allParams();
//             let updatedProduct = await Product.updateOne({ id: req.params.id }).set(params);
//             if (updatedProduct) {
//                 return res.ok(updatedProduct);
//             }
//             return res.notFound();
//         } catch (err) {
//             return res.serverError(err);
//         }
//     },

//     delete: async function(req, res) {
//         try {
//             let deletedProduct = await Product.destroyOne({ id: req.params.id });
//             if (deletedProduct) {
//                 return res.ok(deletedProduct);
//             }
//             return res.notFound();
//         } catch (err) {
//             return res.serverError(err);
//         }
//     },


// };

