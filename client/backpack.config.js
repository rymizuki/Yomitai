module.exports = {
  webpack: (config, options, webpack) => {
    config.entry = { server: './src/server.ts' },
    config.resolve.extensions = ['.js', '.ts']
    config.devtool = false
    config.module.rules.push({
      test: /\.ts$/,
      loader: 'ts-loader',
    })
    return config
  }
}
