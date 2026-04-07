// Merges app.json with runtime env injection
module.exports = ({ config }) => ({
  ...config,
  extra: {
    banner: process.env.BANNER ?? 'hometown-grocers',
  },
})
