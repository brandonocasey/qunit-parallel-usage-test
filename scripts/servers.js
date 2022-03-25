const fs = require('fs')
const path = require('path')
const {staticServe} = require('fastify-auto-push');
const fastify = require('fastify');
const cors = require('fastify-cors');

for (let i = 0; i < 2; i++) {
  const app = fastify({
    logger: {prettyPrint: true},
    http2: true,
    https: {
      allowHTTP1: true, // fallback support for HTTP1
      key: fs.readFileSync(path.join(__dirname, 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
    },
    serverFactory: require("fastify-http2https")()
  });

  app.addHook('preHandler', (req, reply, done) => {
    if (i === 1) {
      reply.header('Origin-Agent-Cluster', '?1');
    }
    done()
  });

  // this route can be accessed through both protocols
  app.register(staticServe, {root: path.resolve(__dirname, '..')});
  app.register(cors);

  app.listen(8080 + i);
}
