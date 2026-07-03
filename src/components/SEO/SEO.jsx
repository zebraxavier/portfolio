import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL  = 'https://xavierleonard.dev'; // update to production domain
const SITE_NAME = 'Xavier Leonard';
const DEFAULT_DESC = 'Full-stack MERN developer building fast, accessible, and beautifully crafted web experiences.';
const DEFAULT_IMG  = `${BASE_URL}/og-image.jpg`;

/**
 * Centralised SEO component.
 * Renders: <title>, meta description, canonical, OG, Twitter, JSON-LD.
 */
const SEO = memo(function SEO({
  title,
  description = DEFAULT_DESC,
  path        = '/',
  image       = DEFAULT_IMG,
  type        = 'website',
  schema      = null,
}) {
  const fullTitle    = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Full-Stack Developer`;
  const canonicalUrl = `${BASE_URL}${path}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Xavier Leonard',
    url: BASE_URL,
    jobTitle: 'Full-Stack Web Developer',
    sameAs: [
      'https://github.com/xavier',
      'https://linkedin.com/in/xavier',
    ],
    knowsAbout: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'UI/UX Design'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description: DEFAULT_DESC,
  };

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description"        content={description} />
      <meta name="author"             content="Xavier Leonard" />
      <meta name="robots"             content="index, follow, max-image-preview:large" />
      <link rel="canonical"           href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:image"       content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale"      content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
});

export default SEO;
