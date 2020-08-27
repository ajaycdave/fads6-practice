const fs = require('fs');
var path = require("path");
var exportA = [];

if (fs.existsSync('./vendor/fads/platform/webpack.config.js')) {
    require('./vendor/fads/platform/webpack.config.js');

    Encore
        .setOutputPath('public/build/')
        .setPublicPath('/build')
        .cleanupOutputBeforeBuild()
        //.enableSourceMaps(!Encore.isProduction())
        // //.enableVersioning()

        // uncomment if you use Sass/SCSS files
        .enableSassLoader(function (loaderOptions) {
            // this is our special option
            loaderOptions.resolve_url_loader = true,

                // this is an option to be passed to sass-loader
                loaderOptions.includePaths = ['vendor/zurb/foundation/scss', 'node_modules/foundation-icon-fonts'],
                loaderOptions.outputStyle = 'compressed'
        });

//module.exports = Encore.getWebpackConfig();
    var config = Encore.getWebpackConfig();
    config.watchOptions = {poll: true, ignored: /node_modules/};

//Set a unique name for the config (needed later!)
    config.name = 'platform';

    config.resolve.alias = {
        Fa: path.resolve(__dirname, 'vendor/fads/platform/src/Fa/Bundle/'),
        Fosjs: path.resolve(__dirname, 'vendor/friendsofsymfony/jsrouting-bundle/Resources/public'),
        Fominjs: path.resolve(__dirname, 'vendor/zurb/foundation/dist/'),
        App: path.resolve(__dirname, 'src/App/Bundle/')
    };

    exportA.push(config);

    Encore.reset();

    //config.watchOptions = { poll: true, ignored: /node_modules/ };
    if (!Encore.isProduction()) {
        config.devtool = 'cheap-eval-source-map';
    }
}

if (fs.existsSync('./vendor/fads/frontend/webpack.config.js')) {
    require('./vendor/fads/frontend/webpack.config.js');

    Encore
    // the project directory where compiled assets will be stored
        .setOutputPath('front/build/')
        // the public path used by the web server to access the previous directory
        .setPublicPath('/build')
        .cleanupOutputBeforeBuild()
        //.enableSourceMaps(!Encore.isProduction())

        // uncomment to create hashed filenames (e.g. app.abc123.css)
        // .enableVersioning(Encore.isProduction())

        // uncomment to define the assets of the project
        // .addEntry('js/app', './assets/js/app.js')
        // .addStyleEntry('css/app', './assets/css/app.scss')

        // uncomment if you use Sass/SCSS files
        .enableSassLoader()


    // uncomment for legacy applications that require $/jQuery as a global variable
    //.autoProvidejQuery()
    ;

    var frontconfig = Encore.getWebpackConfig();
    frontconfig.watchOptions = { poll: true, ignored: /node_modules/ };

//Set a unique name for the config (needed later!)
    frontconfig.name = 'frontend';

    frontconfig.resolve.alias = {
        Faf: path.resolve(__dirname, 'vendor/fads/frontend/src/Faf/Bundle/'),
        Fosjs: path.resolve(__dirname, 'vendor/friendsofsymfony/jsrouting-bundle/Resources/public'),
        Appf: path.resolve(__dirname, 'src/Appf/Bundle/')

    };

    exportA.push(frontconfig);

    Encore.reset();
}

if (fs.existsSync('./vendor/fads/frontend/webpack.config.theme1.js')) {
    require('./vendor/fads/frontend/webpack.config.theme1.js');

    Encore
    // the project directory where compiled assets will be stored
        .setOutputPath('front/build_theme1/')
        // the public path used by the web server to access the previous directory
        .setPublicPath('/build_theme1')
        .cleanupOutputBeforeBuild()
        //.enableSourceMaps(!Encore.isProduction())

        // uncomment to create hashed filenames (e.g. app.abc123.css)
        // .enableVersioning(Encore.isProduction())

        // uncomment to define the assets of the project
        // .addEntry('js/app', './assets/js/app.js')
        // .addStyleEntry('css/app', './assets/css/app.scss')

        // uncomment if you use Sass/SCSS files

        .enableSassLoader()


    // uncomment for legacy applications that require $/jQuery as a global variable
    //.autoProvidejQuery()
    ;

    var themeconfig = Encore.getWebpackConfig();
    themeconfig.watchOptions = { poll: true, ignored: /node_modules/ };

//Set a unique name for the config (needed later!)
    themeconfig.name = 'theme1';

    themeconfig.resolve.alias = {
        Faf: path.resolve(__dirname, 'vendor/fads/frontend/src/Faf/Bundle/'),
        Fosjs: path.resolve(__dirname, 'vendor/friendsofsymfony/jsrouting-bundle/Resources/public'),
        Appf: path.resolve(__dirname, 'src/Appf/Bundle/')

    };

    exportA.push(themeconfig);
}

//module.exports = [config, frontconfig, themeconfig];
module.exports = exportA;