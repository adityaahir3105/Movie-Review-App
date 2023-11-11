const proxy = require("http-proxy-middleware");

module.exports = function(app) {

    app.use(proxy("/api", { target: "http://13.235.244.210:5000/" }));

};
