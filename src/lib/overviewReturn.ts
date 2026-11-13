import { paths } from '../routes';

/*
 * Remembers which overview section a viewer left from, so "Back to overview"
 * returns them there. Per-tab convenience only: falls back to the top.
 */
const KEY = 'apollo.overview.section';

export function rememberOverviewSection(id: string) {
  try {
    sessionStorage.setItem(KEY, id);
  } catch {
    /* storage unavailable: the back link goes to the top instead */
  }
}

export function overviewReturnPath(): string {
  try {
    const id = sessionStorage.getItem(KEY);
    return id && id !== 'top' ? `${paths.overview}#${id}` : paths.overview;
  } catch {
    return paths.overview;
  }
}

/** True when this page is rendered inside another page, e.g. an overview preview. */
export function isEmbedded(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}
