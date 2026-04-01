module.exports = {
    apps: [
      {
        name: 'agromwinda_db',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
      }
    ]
  }
  