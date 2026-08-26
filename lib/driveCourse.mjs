import driveWorkspaces from '@/data/drive-submissions.json';

const DRIVE_FOLDER_ID = /^[A-Za-z0-9_-]{20,}$/;
const DRIVE_DOCUMENT_ID = /^[A-Za-z0-9_-]{20,}$/;

export function driveFolderUrl(folderId) {
  if (!DRIVE_FOLDER_ID.test(folderId || '')) return '';
  return `https://drive.google.com/drive/folders/${folderId}`;
}

export function driveDocumentUrl(documentId) {
  if (!DRIVE_DOCUMENT_ID.test(documentId || '')) return '';
  return `https://docs.google.com/document/d/${documentId}/edit`;
}

export function driveDestinationFor(accountId) {
  return driveWorkspaces.destinations[accountId] || null;
}

export function studentGuidanceFor(accountId) {
  const destination = driveDestinationFor(accountId);
  if (!destination || destination.guidanceAudience !== 'student' || destination.guidanceStatus !== 'initial-suggestion') return null;
  const documentUrl = driveDocumentUrl(destination.guidanceDocumentId);
  return documentUrl ? { audience: destination.guidanceAudience, status: destination.guidanceStatus, documentUrl } : null;
}

export function courseDriveUrl() {
  return driveFolderUrl(driveWorkspaces.rootFolderId);
}

export { driveWorkspaces };
