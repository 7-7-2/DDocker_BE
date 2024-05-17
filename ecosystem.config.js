module.exports = {
  apps: [
    {
      name: 'DDocker_API',
      script: 'app.js',
      cwd: './',
      instances: 0,
      max_memory_restart: '200M',
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
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
