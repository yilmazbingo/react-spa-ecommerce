We are going to split and dynamically deliver ss for each page. we need [webpack-flush-chunks](https://www.npmjs.com/package/webpack-flush-chunks) and [extract-css-chunks-webpack-plugin](https://www.npmjs.com/package/extract-css-chunks-webpack-plugin)

in client webpack configs:

      const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

      {
        test: /\.css$/,
        use: [{ loader: ExtractCssChunks.loader }, { loader: "css-loader" }]
      },
      
          new ExtractCssChunks({ hot: true }),
          
          
       //Note that in prod-client you do not need {hot:true}
       
 
 
 flushChunks will give us the final link and script tags tat we are going to need for a particular route.
 we change our render() function on the server side: 
 
      export default ({ clientStats }) => (req, res) => {
      //we need to do things in a specific order

      const app = renderToString(
        <StaticRouter location={req.path} context={{}}>
          <Routes />
        </StaticRouter>
      );

      //we need stats from webpack
      const { js, styles, cssHash } = flushChunks(clientStats, {
        chunkNames: flushChunkNames()
      });

      //now when app is being rendered, we know which routes we are using.
      res.send(`<html lang="en">
      <head>
        <meta charset="UTF-8" />
        ${styles}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div id="react-root">${app}</div>
        ${js}
        ${cssHash}
      </body>
    </html>
    `);
    };


in development

      server.use(webpackHotServerMiddleware(compiler));
will server the render function. in production we need to manually render it:

     else {
    //when we get here there is no bundle
      webpack([configProdClient, configProdServer]).run((err, stats) => {
      console.log("Stats from webpack", stats.toString({ colors: true }));
      console.log(stats);
      //it wants the stats from the configProdClient
      const clientStats = stats.toJson().children[0];
      const render = require("../../build/prod-server-bundle").default;

      server.use(
        expressStaticGzip("dist", {
          enableBrotli: true,
          orderPreference: ["br", "gzip"],
          index: false
        })
      );
      server.use(render({ clientStats }));

      console.log(`I am in ${process.env.NODE_ENV} environment`);
    });
    }
