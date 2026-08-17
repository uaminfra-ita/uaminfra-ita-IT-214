'use client';

import { useCallback, useEffect, useState } from 'react';
import { repositoryTreeApiUrl } from './githubCourse.mjs';

let cachedPaths = null;
let pendingRequest = null;

async function loadRepositoryPaths(force = false) {
  if (force) {
    cachedPaths = null;
    pendingRequest = null;
  }
  if (cachedPaths) return cachedPaths;
  if (!pendingRequest) {
    pendingRequest = fetch(repositoryTreeApiUrl(), {
      headers: { Accept: 'application/vnd.github+json' },
    }).then(async (response) => {
      if (!response.ok) throw new Error(`GitHub respondeu com status ${response.status}.`);
      const payload = await response.json();
      if (payload.truncated) throw new Error('A listagem pública do repositório foi truncada.');
      cachedPaths = payload.tree.filter((item) => item.type === 'blob').map((item) => item.path);
      return cachedPaths;
    }).finally(() => {
      pendingRequest = null;
    });
  }
  return pendingRequest;
}

export function pathsBelow(paths, prefix) {
  const normalized = `${prefix.replace(/\/$/, '')}/`;
  return paths.filter((path) => path.startsWith(normalized));
}

export default function usePublicRepositoryTree() {
  const [state, setState] = useState({ paths: cachedPaths || [], loading: !cachedPaths, error: '' });

  const refresh = useCallback(async (force = false) => {
    setState((current) => ({ ...current, loading: true, error: '' }));
    try {
      const paths = await loadRepositoryPaths(force);
      setState({ paths, loading: false, error: '' });
    } catch (error) {
      setState({ paths: [], loading: false, error: error.message });
    }
  }, []);

  useEffect(() => {
    refresh(false);
  }, [refresh]);

  return { ...state, refresh: () => refresh(true) };
}
