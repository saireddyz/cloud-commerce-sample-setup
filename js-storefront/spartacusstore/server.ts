import 'zone.js/dist/zone-node';

import { ngExpressEngine as engine } from '@nguniversal/express-engine';
import { NgExpressEngineDecorator } from '@spartacus/setup/ssr';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

const ngExpressEngine = NgExpressEngineDecorator.get(engine, {timeout:5000});
console.log('NODE env:' + process.env.NODE_ENV);
// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/spartacusstore/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  server.set('trust proxy', 'loopback');

  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
      inlineCriticalCss: false,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder + '/foo' );
  const fs = require("fs");
  if (fs.existsSync('dist/spartacusstore/browser/index.html')) {
  fs.copyFileSync('dist/spartacusstore/browser/index.html', 'dist/spartacusstore/browser/foo/index.html');
  }
  // Serve static files from /browser
  
 server.get(
   // ["/foo", "/foo*", "/foo/", "/foo/*", "/foo/*.*"],
   '*.*',
   // express.static('/Users/i866077/Work/Spartacus/spartacus-sample-repo/cloud-commerce-sample-setup/js-storefront/spartacusstore/dist/spartacusstore/browser', {
    express.static(distFolder, {

      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get(['/foo/*','/foo'], (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

    // All regular routes use the Universal engine
   /* server.post('*', (req, res) => {
      res.render(indexHtml, {
        req,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      });
    });*/
  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
