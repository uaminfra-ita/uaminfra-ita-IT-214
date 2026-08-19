import driveWorkspaces from '@/data/drive-submissions.json';

const DRIVE_FOLDER_ID = /^[A-Za-z0-9_-]{20,}$/;

export function driveFolderUrl(folderId) {
  if (!DRIVE_FOLDER_ID.test(folderId || '')) return '';
  return `https://drive.google.com/drive/folders/${folderId}`;
}

export function driveDestinationFor(accountId) {
  return driveWorkspaces.destinations[accountId] || null;
}

export function courseDriveUrl() {
  return driveFolderUrl(driveWorkspaces.rootFolderId);
}

export { driveWorkspaces };
