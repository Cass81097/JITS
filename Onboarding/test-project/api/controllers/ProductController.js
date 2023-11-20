module.exports = {

    create: async function (req, res) {
        try {
            let params = req.allParams();
            let product = await Product.create(params).fetch();
            return res.ok(product);
        } catch (err) {
            return res.serverError(err);
        }
    },

    read: async function (req, res) {
        try {
            let products = await Product.find();
            return res.ok(products);
        } catch (err) {
            return res.serverError(err);
        }
    },

    update: async function (req, res) {
        try {
            let params = req.allParams();
            let updatedProduct = await Product.updateOne({ id: req.params.id }).set(params);
            if (updatedProduct) {
                return res.ok(updatedProduct);
            }
            return res.notFound();
        } catch (err) {
            return res.serverError(err);
        }
    },

    delete: async function(req, res) {
        try {
            let deletedProduct = await Product.destroyOne({ id: req.params.id });
            if (deletedProduct) {
                return res.ok(deletedProduct);
            }
            return res.notFound();
        } catch (err) {
            return res.serverError(err);
        }
    }

};