const express = require("express");
const app = express();

const fs = require('fs');
const root = __dirname;
console.log("root " + root);
const dataProducts = JSON.parse(fs.readFileSync(root + '/src/data/products.json', 'utf8'));
const dataShops = JSON.parse(fs.readFileSync(root + '/src/data/shops.json', 'utf8'));
const dataAvailableFilters = JSON.parse(fs.readFileSync(root + '/src/data/available_filters.json', 'utf8'));
const dataStates = JSON.parse(fs.readFileSync(root + '/src/data/states.json', 'utf8'));
const dataRegions = JSON.parse(fs.readFileSync(root + '/src/data/regions.json', 'utf8'));

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

app.get("/api/search", function(req, res) {

    const categoryId = req.query.category; // TODO: Validate mandatory query param

    let categoryProducts = getCategoryProducts(categoryId); // TODO: Remove let

    // optional query params

    const page = req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 8;
    const priceMin = req.query.price_min;
    const priceMax = req.query.price_max;
    const lat = req.query.lat;
    const lon = req.query.lon;
    const maxDistanceInKm = req.query.distance_km;
    const selectedStatesIds = req.query.states ? req.query.states.split(",") : [];
    const selectedRegionsIds = req.query.regions ? req.query.regions.split(",") : [];
    const sortCriteria = req.query.sort || 'cheaper-first';

    // 1st -> sort

    const sortFn = sortFunctions[sortCriteria];

    categoryProducts = categoryProducts.sort(sortFn);

    // 2nd ->  get available filters

    const availableFilters = getAvailableFilters(categoryId, selectedStatesIds);

    // 3rd -> filter shops
    // a -> state & region

    const filteredShopIds = availableFilters.shops
                                          .filter(s => {
                                            if (!selectedStatesIds.length) return true;
                                            return selectedStatesIds.includes(s.contact.address.location.state);
                                          })
                                          .filter(s => {
                                            if (!selectedRegionsIds.length) return true;
                                            return selectedRegionsIds.includes(s.contact.address.location.region);
                                          })
                                          .map(s => s.id);


    // b -> geo

    /*
    if (lat && lon && maxDistanceInKm) {
        category.products = category.products.filter(function(e) {
            // TODO: Optimize to calculate only once per shop
            const shopGeo = dataShops.shops[e.shop.id].contact.address.geo; // TODO: only works if id matches array position (no need when optimization done)
            const distanceInKm = distanceInKmBetweenTwoCoordinates(lat, shopGeo.lat, lon, shopGeo.lon);
            return distanceInKm <= maxDistanceInKm;
        });
    }
    */

    // 4th -> filter products
    // a -> shop

    categoryProducts = categoryProducts.filter(p => filteredShopIds.includes(p.shop_id));

    // b -> price

    if (priceMin || priceMax) {
        const min = priceMin || 0;
        const max = priceMax || 99999999; // TODO: Max const
        categoryProducts = categoryProducts.filter(function(e) {
            return e.price.now >= min &&
                   e.price.now <= max;
        });
    }

    // 4th -> paginate
    
    const total = categoryProducts.length;
    const offset = page * limit;
    categoryProducts = categoryProducts.slice(offset, offset + limit);
    const last = (offset + limit) >= total;

    res.setHeader('Access-Control-Allow-Origin', "*");

    const response = {
        "pagination": {
            page,
            limit,
            total,
            last
        },
        "products": categoryProducts,
        "filters": {
            "available": availableFilters,
            "applied": {}
        }
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
    return 1; // TODO
}

function sortOld(a, b) {
    return 1; // TODO
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

function getCategoryProducts(categoryId) {
    return dataProducts.products.filter(p => p.category_id === categoryId);
}

function getAvailableFilters(categoryId, selectedStatesIds) {

    const dataCategoryAvailableFilters = dataAvailableFilters.available_filters
                                                             .filter(f => f.category_id === categoryId);

    // TODO: Optimize, query by category_id && type === 'PRICE'

    const prices = dataCategoryAvailableFilters.filter(f => f.type === "PRICE")
                                               .map(f => f.meta)[0]; // TODO: Validate que exista

    // Get available locations, hiding regions that dont apply for selected states

    // TODO: Optimize, query by category_id && type === 'LOCATION'

    const locations = dataCategoryAvailableFilters.filter(f => f.type === "LOCATION")
                                                  .map(f => {

                                                      const state = f.meta;

                                                      if (selectedStatesIds.length && selectedStatesIds.includes(state.id)) {
                                                        state.regions = [];
                                                      }

                                                      return state;
                                                   }); // TODO: Validate que haya al menos 1

    // TODO: Optimize, query by category_id && type === 'SHOP'

    const shops = dataCategoryAvailableFilters.filter(f => f.type === "SHOP")
                                              .map(f => f.meta);

    return {
        prices,
        locations,
        shops
    }
}