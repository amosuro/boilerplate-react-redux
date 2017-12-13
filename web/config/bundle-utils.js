const path = require('path');

module.exports = {
    getEnv: function () {
        const env = process.env.NODE_ENV;
        if (!env) throw `NODE_ENV is not defined!`;
        return env;
    },
    getBuildConfig: function () {
        return {
            srcDir: path.resolve('src'),
            distDir: path.resolve('dist')
        };
    }
};