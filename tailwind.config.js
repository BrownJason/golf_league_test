module.exports = {
    extend: {
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
    },
      rules: [
        {
          test: /\\\\.css$/,
          use: [
            'style-loader',     // Or MiniCssExtractPlugin.loader
            'css-loader',
            'postcss-loader',   // Add this loader
          ],
        },
      ],
    webpack(config) {
      config.resolve.fallback = {
  
        // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped.
        ...config.resolve.fallback,  
  
        fs: false, // the solution
      };
      
      return config;
    },
  }
  