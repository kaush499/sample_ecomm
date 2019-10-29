var connection = require('../../connection/mysql_db');

var Product = function(product){
    this.parentCategoryId = product.parentCategoryId;
    this.title = product.title;
    this.imagePath = product.imagePath;
    this.price = product.price;
};

Product.addProduct = (newProduct, response) => {
    let query = "INSERT INTO products SET ?";
    connection.query(query, newProduct, (err, result) => {
        if(err){
            response(err, null);
        }else {
           let productId = result.insertId;
           response(null, productId); 
        }
    });
};

Product.getAllProduct = (response) => {
    let query = `SELECT  productId, title, imagePath, price, categoryName AS category
                 FROM products 
                 INNER JOIN category ON (products.parentCategoryId = category.categoryId)`;
    connection.query(query, (err, result) => {
        console.log(err);
        if(err){
            response(err, null);
        }else {
            if(result.length==0 || !result){
                response("No results found", null);
            } else {
                response(null, result);
            }
        }
    });                          
};

Product.updateProduct = ({updatedProduct, prdId}, response) => {
    let query = `UPDATE product SET ? WHERE productId = ?`;
    connection.query(query, [updatedProduct, prdId], (err, result) => {
        if(err) {
            response(err, null);
        }else {
            response(null, true);
        }
    })
}

Product.deleteProduct = (prdId, response) => {
    let query = `DELETE FROM product WHERE productId = ?`;
    connection.query(query, prdId, (err, result) => {
        if(err) {
            response(err, null);
        }else {
            response(null, true);
        }
    })
}

module.exports = Product;