const ProductModel = require('../models/product');

// get all products
exports.getAllProducts = (req, res, next) => {
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

// save a product
exports.saveProduct = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');

    const newProduct = new ProductModel({
        title: req.body.title,
        category: req.body.category,
        subheader: req.body.subheader,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
    });

    newProduct.save()
        .then(result => {
            //console.log(result);
            res.status(201).json({ message: 'OK, product saved!' });
        })
        .catch(err => {
            //console.log(err);
            res.status(500).json({ message: `Some error occured: ${err.message}` });
        });

};