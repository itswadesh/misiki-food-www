module.exports = {
  apps: [
    {
      name: 'anne.biz:5500',
      script: 'npm',
      automation: false,
      args: 'run start',
      env: {
        NODE_ENV: 'development',
      },
      envProduction: {
        NODE_ENV: 'production',
      },
    },
  ],
}
