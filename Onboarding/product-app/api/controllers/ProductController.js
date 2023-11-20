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

            return res.ok({ totalCalculatedPrice: totalCalculatedPrice });
        } catch (err) {
            if (err === 'notFound') {
                return res.notFound('Products not found');
            }
            return res.serverError(err);
        }
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

//     deleteAll: async function(req, res) {
//         try {
//             let deletedProducts = await Product.destroy({});
//             if (deletedProducts && Array.isArray(deletedProducts) && deletedProducts.length > 0) {
//                 return res.ok(deletedProducts);
//             } else if (deletedProducts && !Array.isArray(deletedProducts)) {
//                 return res.ok(`Deleted ${deletedProducts} products.`);
//             }
//             return res.ok("No products found to delete.");
//         } catch (err) {
//             return res.serverError(err);
//         }
//     }
// };