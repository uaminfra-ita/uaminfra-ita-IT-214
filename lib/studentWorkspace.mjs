import fs from 'node:fs';
import path from 'node:path';

const REPOSITORY_URL = 'https://github.com/uaminfra-ita/uaminfra-ita-IT-214';
const ACCENTS = new Set(['cyan', 'blue', 'emerald', 'amber', 'violet']);

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isSafeUrl(value) {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function classifySubmission(fileName) {
  const match = fileName.match(/^(E(?:0[1-9]|1[0-6])|CP[1-4])(?:[_\-\s]|$)/i);
  return match ? match[1].toUpperCase() : 'OTHER';
}

export function sanitizeProfile(raw, availableFiles = []) {
  const profile = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const available = new Set(availableFiles);
  const accent = ACCENTS.has(profile.accent) ? profile.accent : 'cyan';
  const featuredFiles = Array.isArray(profile.featuredFiles)
    ? profile.featuredFiles.filter((item) => typeof item === 'string' && available.has(item)).slice(0, 8)
    : [];
  const links = Array.isArray(profile.links)
    ? profile.links
        .filter((item) => item && isSafeUrl(item.url) && cleanText(item.label, 40))
        .slice(0, 5)
        .map((item) => ({ label: cleanText(item.label, 40), url: item.url }))
    : [];

  return {
    headline: cleanText(profile.headline, 100),
    bio: cleanText(profile.bio, 500),
    accent,
    featuredFiles,
    links,
  };
}

function listFiles(directory, root = directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listFiles(fullPath, root);
    const relativePath = path.relative(root, fullPath).replaceAll('\\', '/');
    if (['.gitkeep', 'profile.json'].includes(relativePath)) return [];
    return [{ name: entry.name, relativePath }];
  });
}

function githubPath(relativePath) {
  return relativePath.split('/').map(encodeURIComponent).join('/');
}

export function buildStudentWorkspaces(students, rootDirectory = process.cwd()) {
  return students.map((student) => {
    const directory = path.join(rootDirectory, 'students', student.slug);
    const files = listFiles(directory)
      .map((file) => ({
        ...file,
        category: classifySubmission(file.name),
        url: `${REPOSITORY_URL}/blob/main/students/${student.slug}/${githubPath(file.relativePath)}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

    let rawProfile = {};
    try {
      rawProfile = JSON.parse(fs.readFileSync(path.join(directory, 'profile.json'), 'utf8'));
    } catch {
      rawProfile = {};
    }

    return {
      ...student,
      profile: sanitizeProfile(rawProfile, files.map((file) => file.name)),
      files,
      completedCodes: [...new Set(files.map((file) => file.category).filter((code) => code !== 'OTHER'))],
      uploadUrl: `${REPOSITORY_URL}/upload/main/students/${student.slug}`,
      folderUrl: `${REPOSITORY_URL}/tree/main/students/${student.slug}`,
    };
  });
}
