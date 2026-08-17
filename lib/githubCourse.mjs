export const COURSE_REPOSITORY = {
  owner: 'uaminfra-ita',
  name: 'uaminfra-ita-IT-214',
  branch: 'student-submissions',
  webUrl: 'https://github.com/uaminfra-ita/uaminfra-ita-IT-214',
};

function encodeRepositoryPath(value = '') {
  return value
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

export function repositoryPathUrl(path = '') {
  const encodedPath = encodeRepositoryPath(path);
  return `${COURSE_REPOSITORY.webUrl}/tree/${COURSE_REPOSITORY.branch}${encodedPath ? `/${encodedPath}` : ''}`;
}

export function repositoryUploadUrl(path) {
  return `${COURSE_REPOSITORY.webUrl}/upload/${COURSE_REPOSITORY.branch}/${encodeRepositoryPath(path)}`;
}

export function repositoryHistoryUrl(path) {
  return `${COURSE_REPOSITORY.webUrl}/commits/${COURSE_REPOSITORY.branch}/${encodeRepositoryPath(path)}`;
}

export function githubDevUrl(path) {
  return `https://github.dev/${COURSE_REPOSITORY.owner}/${COURSE_REPOSITORY.name}/blob/${COURSE_REPOSITORY.branch}/${encodeRepositoryPath(path)}`;
}

export function githubIssueUrl({ title, body }) {
  const query = new URLSearchParams({ title, body });
  return `${COURSE_REPOSITORY.webUrl}/issues/new?${query.toString()}`;
}

export function githubIssueSearchUrl(query) {
  return `${COURSE_REPOSITORY.webUrl}/issues?q=${encodeURIComponent(query)}`;
}

export function latexWorkflowUrl() {
  const query = new URLSearchParams({ query: `branch:${COURSE_REPOSITORY.branch}` });
  return `${COURSE_REPOSITORY.webUrl}/actions/workflows/latex.yml?${query.toString()}`;
}

export function repositoryTreeApiUrl() {
  return `https://api.github.com/repos/${COURSE_REPOSITORY.owner}/${COURSE_REPOSITORY.name}/git/trees/${COURSE_REPOSITORY.branch}?recursive=1`;
}
