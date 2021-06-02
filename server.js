const express = require("express");
const app = express();

const fs = require('fs');
const root = __dirname;
console.log("root " + root);
const dataProducts = JSON.parse(fs.readFileSync(root + '/src/data/products.json', 'utf8'));
const dataBrands = JSON.parse(fs.readFileSync(root + '/src/data/brands.json', 'utf8'));

const sortFunctions = {
    'cheaper-first': sortCheaper,
    'expensive-first': sortExpensive,
    'new-first': sortNew,
    'old-first': sortOld,
    'preferred': sortPreferred
};

app.set("PORT", process.env.PORT || 5000);

app.get("/api", function(req, res) {
    res.send("Hello, world!");
});

app.get("/api/products", function(req, res) {

    const category_name = req.query.category; // TODO: Validate mandatory query param

    const category = clone(dataProducts[category_name]);

    const page = req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 8;
    const price_min = req.query.price_min;
    const price_max = req.query.price_max;
    const lat = req.query.lat;
    const lon = req.query.lon;
    const maxDistanceInKm = req.query.distance_km;
    const sortCriteria = req.query.sort || 'cheaper-first';

    // 1st -> sort

    const sortFn = sortFunctions[sortCriteria];

    category.products = category.products.sort(sortFn);

    // 2nd -> filter
    // a -> price

    if (price_min || price_max) {
        const min = price_min || 0;
        const max = price_max || 99999999;
        category.products = category.products.filter(function(e) {
            return e.price.now >= min &&
                   e.price.now <= max;
        });
    }

    // b -> geo

    if (lat && lon && maxDistanceInKm) {
        category.products = category.products.filter(function(e) {
            // TODO: Optimize to calculate only once per brand
            const brandGeo = dataBrands.brands[e.brand].contact.address.geo; // TODO: only works if id matches array position (no need when optimization done)
            const distanceInKm = distanceInKmBetweenTwoCoordinates(lat, brandGeo.lat, lon, brandGeo.lon);
            return distanceInKm <= maxDistanceInKm;
        });
    }

    // 3d -> paginate
    
    const total = category.products.length;
    const offset = page * limit;
    category.products = category.products.slice(offset, offset + limit);
    const last = (offset + limit) >= total;

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

function sortCheaper(a, b) {
    return a.price.now - b.price.now;
}

function sortExpensive(a, b) {
    return b.price.now - a.price.now;
}

function sortNew(a, b) {
    return 1;; // TODO
}

function sortOld(a, b) {
    return 1;; // TODO
}

function sortPreferred(a, b) {
    return 1; // TODO
}

function distanceInKmBetweenTwoCoordinates(lat1, lat2, lon1, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres

    return (d / 1000); // to km
}