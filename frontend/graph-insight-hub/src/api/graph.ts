import { get } from "./http";

export type GraphNode = { id: string; key: string; label: string; type: string };
export type GraphEdge = { id: string; from: string; to: string; type: string; label?: string };
export type GraphBundle = { nodes: GraphNode[]; edges: GraphEdge[] };

export type CompanyCard = {
  company: { _id?: string; _key?: string; name?: string; sector?: string; taxId?: string } | null;
  phones: { number?: string }[];
  addresses: any[];
  employees: { id: string; name: string; role?: string; title?: string; since?: string }[];
};

export async function fetchGraphAll(opts?: { limit?: number }): Promise<GraphBundle> {
  const p = new URLSearchParams();
  if (opts?.limit != null) p.set("limit", String(opts.limit));
  const qs = p.toString() ? `?${p}` : "";
  return get<GraphBundle>(`/graph/all${qs}`);
}

export async function fetchCompany(
  key: string,
  paging?: { limit?: number; offset?: number }
): Promise<CompanyCard> {
  const p = new URLSearchParams();
  if (paging?.limit != null) p.set("limit", String(paging.limit));
  if (paging?.offset != null) p.set("offset", String(paging.offset));
  const qs = p.toString() ? `?${p}` : "";
  return get<CompanyCard>(`/graph/company/${encodeURIComponent(key)}${qs}`);
}
