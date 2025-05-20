module.exports = {
  extend: {
    animation: {
      marquee: 'marquee 20s linear infinite',
      'logo-fade': 'logo-fade 1.2s cubic-bezier(0.4,0,0.2,1) both',
      'fade-in': 'fade-in 1.2s ease-out',
      'slide-up': 'slide-up 1.5s cubic-bezier(0.4,0,0.2,1)',
    },
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-100%)' },
      },
      'logo-fade': {
        '0%': { opacity: '0', letterSpacing: '0.5em' },
        '60%': { opacity: '1', letterSpacing: '0.1em' },
        '100%': { opacity: '1', letterSpacing: '0.05em' },
        '0%,100%': { opacity: '0.7' },
        '50%': { opacity: '1' },
      },
      'fade-in': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      'slide-up': {
        '0%': { opacity: '0', transform: 'translateY(40px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
  },
  rules: [
    {
      test: /\\.css$/,
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
