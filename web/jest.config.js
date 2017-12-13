module.exports = {
    verbose: true,
    "moduleNameMapper": {
        "\\.(css|scss)$": "identity-obj-proxy"
    },
    "globals": {
        "SYMPHONY": {
            remote: {},
            application: {},
            services: {}
        }
    }
};