var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    type: String,
    quantity: String,
    size: String,
    added: {
        type: Date,
        default: Date.now
    }
});

schema.statics.save = function (callback) {
    var Product = this;

    async.waterfall([
        function (product, callback) {
            if (product) {
                product.save(function (err) {
                    if (err) return callback(err);
                    callback(null, product);
                });
            }
        }
    ], callback);
};

schema.statics.getAll = function (callback) {
    var Product = this;
    return Product.find(function(err, products){
        if (err)
            res.send(err);
        var result = {};
        res.json(products);
        //products.forEach(function(product){
        //    result[product._id] = product
        //})
    });
};

//Beer.find(function(err, beers) {
//    if (err)
//        res.send(err);
//
//    res.json(beers);
//});

exports.Product = mongoose.model('product', schema);