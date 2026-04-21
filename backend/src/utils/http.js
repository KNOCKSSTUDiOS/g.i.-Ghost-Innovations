export async function httpGet(url, headers = {}) {
  const res = await fetch(url, { method: "GET", headers });
  return res.json().catch(() => null);
}

export async function httpPost(url, body = {}, headers = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body)
  });
  return res.json().catch(() => null);
}

export async function httpPut(url, body = {}, headers = {}) {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body)
  });
  return res.json().catch(() => null);
}

export async function httpDelete(url, headers = {}) {
  const res = await fetch(url, { method: "DELETE", headers });
  return res.json().catch(() => null);
}

