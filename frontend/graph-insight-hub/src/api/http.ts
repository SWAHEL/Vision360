export const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE ?? "/api/v1";

export async function get<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} :: ${text}`);
  }
  return res.json() as Promise<T>;
}
