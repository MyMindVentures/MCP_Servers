import { test, expect } from '@playwright/test';

async function getAuthToken(request: import('@playwright/test').APIRequestContext): Promise<string> {
  const res = await request.post('/api/auth/login', {
    data: { username: 'admin', password: 'changeme' },
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.token).toBeTruthy();
  return body.token;
}

test.describe('API e2e', () => {
  test('POST /api/auth/login returns token for seeded admin', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: { username: 'admin', password: 'changeme' },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('user');
    expect(body.user.username).toBe('admin');
  });

  test('GET /meta without auth returns 401', async ({ request }) => {
    const res = await request.get('/meta');
    expect(res.status()).toBe(401);
  });

  test('GET /meta with auth returns toolGroups and tools', async ({ request }) => {
    const token = await getAuthToken(request);
    const res = await request.get('/meta', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('publicUrl');
    expect(body).toHaveProperty('tools');
    expect(body).toHaveProperty('toolGroups');
    expect(Array.isArray(body.tools)).toBe(true);
    expect(Array.isArray(body.toolGroups)).toBe(true);
    expect(body.toolGroups.length).toBeGreaterThan(0);
    expect(body.tools.length).toBeGreaterThan(0);
  });

  test('GET /api/settings/tools with auth returns same shape', async ({ request }) => {
    const token = await getAuthToken(request);
    const res = await request.get('/api/settings/tools', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.tools.some((t: { enabled: boolean }) => typeof t.enabled === 'boolean')).toBe(true);
    expect(body.toolGroups.length).toBeGreaterThan(0);
  });

  test('POST /api/settings/tools/refresh returns updated metadata', async ({ request }) => {
    const token = await getAuthToken(request);
    const res = await request.post('/api/settings/tools/refresh', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('tools');
    expect(body).toHaveProperty('toolGroups');
    expect(body.tools.length).toBeGreaterThan(0);
  });

  test('PATCH /api/settings/tools updates enabled list', async ({ request }) => {
    const token = await getAuthToken(request);
    const getRes = await request.get('/api/settings/tools', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const meta = await getRes.json();
    const allIds = meta.tools.map((t: { id: string }) => t.id);
    const enabled = allIds.slice(0, Math.min(2, allIds.length));
    const patchRes = await request.patch('/api/settings/tools', {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: { enabled },
    });
    expect(patchRes.status()).toBe(200);
    const updated = await patchRes.json();
    updated.tools.forEach((t: { id: string; enabled: boolean }) => {
      expect(t.enabled).toBe(enabled.includes(t.id));
    });
    const restoreRes = await request.patch('/api/settings/tools', {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: { enabled: allIds },
    });
    expect(restoreRes.status()).toBe(200);
  });
});
