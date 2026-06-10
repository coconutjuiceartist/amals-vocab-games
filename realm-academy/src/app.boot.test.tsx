/**
 * Boot smoke test: the entire App tree (StoreProvider + router) must
 * server-render without throwing, in a localStorage-free environment.
 */

import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import App from './App';

describe('App boots', () => {
  it('renders the first-run screen on a fresh (no-storage) start', () => {
    const html = renderToString(<App />);
    expect(html).toContain('Realm Academy');
    expect(html.length).toBeGreaterThan(200);
  });
});
