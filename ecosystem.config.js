module.exports = {
  apps: [
    {
      name: 'DDocker_API',
      script: 'app.js',
      cwd: './',
      instances: 1,
      autorestart: true,
      ignore_watch: ['logs'],
      env_local: {
        NODE_ENV: 'local',
        PORT: '4000'
      },
      env_dev: {
        NODE_ENV: 'development',
        PORT: '4000'
      },
      env_prod: {
        NODE_ENV: 'production',
        PORT: '4000'
      }
    }
  ]
};
