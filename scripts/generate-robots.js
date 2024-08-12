// generate-robots.js
import fs from 'fs';
import dotenv from 'dotenv'

dotenv.config();

const siteUrl = process.env.PUBLIC_SITE_URL;

const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`;

fs.writeFileSync('dist/robots.txt', robotsTxt.trim());

console.log('robots.txt generated successfully!');
