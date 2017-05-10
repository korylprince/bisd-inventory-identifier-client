module.exports = {
    plugins: [
        require("autoprefixer")({
            browsers: ["last 2 versions"]
        })
    ]
    // map: process.env.NODE_ENV === "development" ? "inline" : false
};
