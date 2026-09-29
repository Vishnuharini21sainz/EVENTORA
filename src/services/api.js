const API_BASE = process.env.REACT_APP_API_URL || '';

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `Request failed (${response.status})`);
    }

    return data;
  } catch (error) {
    console.error('EVENTORA API Error:', error);
    throw error;
  }
}

export async function healthCheck() {
  return request('/api/health');
}

export async function getCaterers() {
  const data = await request('/api/caterers');
  return data.caterers || [];
}

export async function createEvent(payload) {
  return request('/api/events', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getEvent(id) {
  return request(`/api/events?id=${encodeURIComponent(id)}`);
}
