const ProductModel = require('../models/product');

// get all products
exports.getAllProducts = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    ProductModel.find({}).select('title')
        .then(result => {
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                res.status(404).send('No documents matched your query.');
            }
        })
        .catch(err => res.status(500).send(`MongoDB query error: ${err.message}`))

};
