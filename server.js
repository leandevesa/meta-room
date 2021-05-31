const express = require("express");
const app = express();

const fs = require('fs');
const root = __dirname;
console.log("root " + root);
const data = JSON.parse(fs.readFileSync(root + '/src/data/products.json', 'utf8'));

app.set("PORT", process.env.PORT || 5000);

app.get("/api", function(req, res) {
    res.send("Hello, world!");
});

app.get("/api/products", function(req, res) {

    const category_name = req.query.category; // TODO: Validate mandatory query param

    let category = clone(data[category_name]);

    const page = req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 8;
    const total = category.products.length;
    const offset = page * limit;
    const last = (offset + limit) >= total;

    category.products = category.products.slice(offset, offset + limit);

    const price_min = req.query.price_min;
    const price_max = req.query.price_max;

    if (price_min || price_max) {

        const min = price_min || 0;
        const max = price_max || 99999999;
        category.products = category.products.filter(function(e) {
            return e.price.now >= min &&
                   e.price.now <= max;
        });
    }

    res.setHeader('Access-Control-Allow-Origin', "*");

    const response = {
        "pagination": {
            page,
            limit,
            total,
            last
        }, ... category
    }

    res.send(response);
});

app.listen(app.get("PORT"), function() {
    console.log("API running");
});

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}