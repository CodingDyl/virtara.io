/**
 * The lead magnets this site serves: every JSON file in
 * `src/content/lead-magnets/`, exported from AgentOS.
 *
 * Read at build time. A file is used only if it is a Virtara magnet in the
 * current format with the fields a page needs, and its slug matches its
 * filename; anything else is skipped with a console warning rather than
 * breaking the build.
 */

const FILES = import.meta.glob('../content/lead-magnets/*.json', { eager: true, import: 'default' });
const SLUG = /^[a-z0-9](?:[a-z0-9-]{0,30}[a-z0-9])?$/;

function isText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function valid(file, slugFromName) {
  return (
    file &&
    file.version === 1 &&
    file.track === 'virtara' &&
    SLUG.test(file.slug) &&
    file.slug === slugFromName &&
    isText(file.title) &&
    isText(file.promise) &&
    file.landing &&
    isText(file.landing.headline) &&
    isText(file.landing.cta) &&
    Array.isArray(file.landing.bullets) &&
    file.seo &&
    isText(file.seo.title) &&
    isText(file.seo.description) &&
    Array.isArray(file.sections) &&
    file.sections.length > 0 &&
    file.sections.every((section) => isText(section.heading) && typeof section.body === 'string') &&
    (file.cover === undefined || /^[a-z0-9-]+\.(png|jpe?g|webp)$/.test(file.cover))
  );
}

const MAGNETS = Object.entries(FILES)
  .map(([path, file]) => {
    const slugFromName = path.split('/').pop().replace(/\.json$/, '');
    if (valid(file, slugFromName)) return file;
    if (file?.track !== 'jurivo') console.warn(`[lead-magnets] skipped ${path}: not a valid Virtara lead magnet`);
    return undefined;
  })
  .filter(Boolean)
  .sort((a, b) => a.title.localeCompare(b.title));

export function allLeadMagnets() {
  return MAGNETS;
}

export function findLeadMagnet(slug) {
  return MAGNETS.find((magnet) => magnet.slug === slug);
}

export function coverUrl(magnet) {
  return magnet.cover ? `/lead-magnets/${magnet.cover}` : undefined;
}

/**
 * A soft gate: the read page remembers who signed up in this browser. It is
 * not security (the content ships with the site), just the usual courtesy of
 * asking for an email first. Storage can be unavailable; then nobody is
 * locked out.
 */
const UNLOCK_KEY = 'virtara-guides-unlocked';

export function unlockLeadMagnet(slug) {
  try {
    const unlocked = new Set(JSON.parse(localStorage.getItem(UNLOCK_KEY) || '[]'));
    unlocked.add(slug);
    localStorage.setItem(UNLOCK_KEY, JSON.stringify([...unlocked]));
  } catch {
    // No storage: the read page will not ask again anyway.
  }
}

export function isLeadMagnetUnlocked(slug) {
  try {
    return JSON.parse(localStorage.getItem(UNLOCK_KEY) || '[]').includes(slug);
  } catch {
    return true;
  }
}
