import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL   = import.meta.env.VITE_BASE_URL || 'https://xavierleonard.dev';
const SITE_NAME  = 'Xavier Leonard E';
const FULL_NAME  = 'Xavier Leonard E';
const JOB_TITLE  = 'Full-Stack Developer & MCA Student';
const TWITTER_HANDLE = '@xavierleonard';
const DEFAULT_DESC   = 'Computer Science graduate and MCA student specialising in full-stack web development, AI automation, and cloud technologies. Based in Tamil Nadu, India.';
const DEFAULT_IMG    = `${BASE_URL}/og-image.svg`;
const GITHUB_URL     = 'https://github.com/xavierleonard';
const LINKEDIN_URL   = 'https://linkedin.com/in/xavierleonard';

/** Person schema — re-used across pages */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: FULL_NAME,
  url: BASE_URL,
  jobTitle: JOB_TITLE,
  image: `${BASE_URL}/photo.jpg`,
  email: 'zebraxavier100@gmail.com',
  telephone: '+919150509193',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  knowsAbout: [
    'JavaScript', 'C', 'C++', 'HTML', 'CSS', 'MongoDB',
    'SQL', 'DBMS', 'Python', 'Java', 'UiPath RPA',
    'Oracle Cloud', 'Data Recovery', 'System Engineering',
  ],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'NPR Arts and Science College, Natham' },
    { '@type': 'CollegeOrUniversity', name: 'KGISL Institute of Information Management, Coimbatore' },
  ],
};

/** WebSite schema */
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: BASE_URL,
  description: DEFAULT_DESC,
  author: { '@type': 'Person', name: FULL_NAME, email: 'zebraxavier100@gmail.com' },
};

/** Build BreadcrumbList from path */
function buildBreadcrumb(path) {
  if (!path || path === '/') return null;
  const parts = path.split('/').filter(Boolean);
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
    ...parts.map((part, idx) => ({
      '@type': 'ListItem',
      position: idx + 2,
      name: part.charAt(0).toUpperCase() + part.slice(1),
      item: `${BASE_URL}/${parts.slice(0, idx + 1).join('/')}`,
    })),
  ];
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

/**
 * Centralised SEO component.
 * Renders: title, meta, canonical, OG, Twitter, JSON-LD schemas.
 */
const SEO = memo(function SEO({
  title,
  description = DEFAULT_DESC,
  path        = '/',
  image       = DEFAULT_IMG,
  type        = 'website',
  schema      = null,        // extra custom schema
  keywords    = '',
  noIndex     = false,
}) {
  const fullTitle    = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — ${JOB_TITLE}`;
  const canonicalUrl = `${BASE_URL}${path}`;
  const breadcrumb   = buildBreadcrumb(path);

  // WebPage schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: fullTitle,
    url: canonicalUrl,
    description,
    isPartOf: { '@type': 'WebSite', url: BASE_URL },
    breadcrumb: breadcrumb ?? undefined,
  };

  return (
    <Helmet>
      {/* Primary */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description"   content={description} />
      <meta name="author"        content={FULL_NAME} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots"        content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical"      href={canonicalUrl} />

      {/* Viewport (belt-and-suspenders with index.html) */}
      <meta name="viewport"      content="width=device-width, initial-scale=1.0" />

      {/* Open Graph */}
      <meta property="og:type"         content={type} />
      <meta property="og:title"        content={fullTitle} />
      <meta property="og:description"  content={description} />
      <meta property="og:url"          content={canonicalUrl} />
      <meta property="og:site_name"    content={SITE_NAME} />
      <meta property="og:image"        content={image} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"    content={`${FULL_NAME} — ${JOB_TITLE}`} />
      <meta property="og:locale"       content="en_US" />

      {/* Facebook */}
      <meta property="fb:app_id" content="" />

      {/* Twitter / X */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER_HANDLE} />
      <meta name="twitter:creator"     content={TWITTER_HANDLE} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
      <meta name="twitter:image:alt"   content={`${FULL_NAME} — ${JOB_TITLE}`} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      {breadcrumb && (
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      )}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
});

export default SEO;
