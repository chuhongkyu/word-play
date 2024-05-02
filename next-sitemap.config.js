module.exports = {
    siteUrl: process.env.SITE_URL || 'https://word-play.vercel.app/',
    generateRobotsTxt: true,
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