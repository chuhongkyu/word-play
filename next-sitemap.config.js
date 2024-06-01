module.exports = {
    siteUrl: process.env.SITE_URL || 'https://word-play.vercel.app/',
    generateRobotsTxt: true,
    exclude: ['/admin/**','/admin'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: [
            '/admin',
          ]
        },
      ],
  },
}