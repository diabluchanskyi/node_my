var Product = require('model/product');

module.exports = function(req, res, next) {
    res.render("index", {
        body: '<p> Some text</p>'
    })
        Product.getAll(function(err, user) {
        if (err) return next(err);

        req.user = res.locals.user = user;
        next();
    });
};
