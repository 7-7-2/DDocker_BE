module.exports = {
  apps: [
    {
      name: 'DDocker_API',
      script: 'app.js',
      cwd: './',
      instances: 4,
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules', 'logs', '.git/FETCH_HEAD'],
      env_local: {
        NODE_ENV: 'local'
      },
      env_dev: {
        NODE_ENV: 'development'
      },
      env_prod: {
        NODE_ENV: 'production'
      }
    }
  ]
};
