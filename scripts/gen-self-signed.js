const fs = require('fs');
const path = require('path')
const selfsigned = require('selfsigned');
const pems = selfsigned.generate()

const keyPath = path.join(__dirname, 'key.pem');
const certPath = path.join(__dirname, 'cert.pem');

if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
  console.log(`Wrote https key.pem/cert.pem to ${path.relative(process.cwd(), __dirname)}`)
  fs.writeFileSync(keyPath, pems.private)
  fs.writeFileSync(certPath, pems.cert)
}

