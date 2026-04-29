/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.diariogoiano.com.br',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*', '/api/*'],
  changefreq: 'daily',
  priority: 0.7,
}
