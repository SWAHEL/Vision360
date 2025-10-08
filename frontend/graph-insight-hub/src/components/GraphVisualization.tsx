import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import D3Graph from "@/components/D3Graph";
import { fetchGraphAll, type GraphBundle } from "@/api/graph";

type GraphVisualizationProps = {
  companyName: string; // ex. "Zenitech SARL"
};

const GraphVisualization = ({ companyName }: GraphVisualizationProps) => {
  const [fullGraph, setFullGraph] = useState<GraphBundle>({ nodes: [], edges: [] });
  const [filteredGraph, setFilteredGraph] = useState<GraphBundle>({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(2000);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const normalize = (s?: string) =>
    (s || "")
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .trim();

  // Node helpers
  const getId = (n: any) => n.id ?? n._id;
  const getName = (n: any) =>
    n.name ??
    n?.data?.name ??
    n?.properties?.name ??
    n.title ??
    n.label ??
    n?.data?.label ??
    "";
  const isCompany = (n: any) => {
    const c = (n.collection ?? n.type ?? n.group ?? "").toString().toLowerCase();
    return c.includes("comp") || c === "companies" || c === "company";
  };

  // Edge helpers
  const edgeFrom = (e: any) => e.from ?? e._from;
  const edgeTo = (e: any) => e.to ?? e._to;

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGraphAll({ limit });
      setFullGraph(data ?? { nodes: [], edges: [] });
    } catch (e: any) {
      setError(e?.message || "Failed to load graph");
      setFullGraph({ nodes: [], edges: [] });
      setFilteredGraph({ nodes: [], edges: [] });
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pick best match for companyName
  const findCompanyNode = (nodes: any[], targetName: string) => {
    const t = normalize(targetName);
    if (!t) return undefined;

    const candidates = nodes
      .map((n) => ({ n, id: getId(n), name: getName(n) }))
      .filter((x) => x.id && x.name);

    const comp = candidates.filter((x) => isCompany(x.n));
    const all = comp.length ? comp : candidates;

    // exact
    let hit = all.find((x) => normalize(x.name) === t);
    if (hit) return hit.n;

    // startsWith
    hit = all.find((x) => normalize(x.name).startsWith(t));
    if (hit) return hit.n;

    // includes
    hit = all.find((x) => normalize(x.name).includes(t));
    if (hit) return hit.n;

    return undefined;
  };

  // Build connected component from startId (undirected)
  const componentFrom = (graph: GraphBundle, startId: string): GraphBundle => {
    const idSet = new Set(graph.nodes.map((n: any) => getId(n)));
    if (!idSet.has(startId)) return { nodes: [], edges: [] };

    const adj = new Map<string, string[]>();
    for (const n of graph.nodes) adj.set(getId(n), []);
    for (const e of graph.edges) {
      const u = edgeFrom(e);
      const v = edgeTo(e);
      if (!u || !v) continue;
      if (!adj.has(u)) adj.set(u, []);
      if (!adj.has(v)) adj.set(v, []);
      adj.get(u)!.push(v);
      adj.get(v)!.push(u);
    }

    const seen = new Set<string>();
    const stack = [startId];
    while (stack.length) {
      const v = stack.pop()!;
      if (seen.has(v)) continue;
      seen.add(v);
      for (const w of adj.get(v) ?? []) if (!seen.has(w)) stack.push(w);
    }

    const nodes = graph.nodes.filter((n: any) => seen.has(getId(n)));
    const nodeIds = new Set(nodes.map((n: any) => getId(n)));
    const edges = graph.edges.filter(
      (e: any) => nodeIds.has(edgeFrom(e)) && nodeIds.has(edgeTo(e))
    );
    return { nodes, edges };
  };

  // Re-filter when graph or companyName changes
  useEffect(() => {
    if (!fullGraph.nodes?.length) return;

    if (!companyName) {
      setError("Aucun nom d'entreprise fourni au composant GraphVisualization.");
      setFilteredGraph({ nodes: [], edges: [] });
      setSelectedId(undefined);
      return;
    }

    const target = findCompanyNode(fullGraph.nodes as any[], companyName);
    if (!target) {
      setSelectedId(undefined);
      setFilteredGraph({ nodes: [], edges: [] });
      setError(`Company "${companyName}" not found in current graph.`);
      return;
    }

    const tid = getId(target);
    const sub = componentFrom(fullGraph, tid);
    setFilteredGraph(sub);
    setSelectedId(tid);
    setError(null);
  }, [companyName, fullGraph]);

  return (
    <div className="flex-1 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Graph — {companyName}</h2>
        <div className="flex items-center gap-3 text-sm">
          <label>Limit</label>
          <input
            className="bg-card border border-border rounded px-2 py-1 w-24"
            type="number"
            min={100}
            max={20000}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            {loading ? "Loading…" : "Reload"}
          </Button>
          {error && <span className="text-destructive text-sm">{error}</span>}
        </div>
      </div>

      <Card className="h-[calc(100vh-180px)] bg-card/50 relative overflow-hidden">
        <CardContent className="p-0 h-full">
          <D3Graph
            data={filteredGraph}        // only the company's component
            selectedId={selectedId}     // highlight the company node
            onSelectCompany={(companyKey) =>
              setSelectedId(
                companyKey?.startsWith("companies/") ? companyKey : `companies/${companyKey}`
              )
            }
          />
          <div className="absolute bottom-3 left-3 bg-background/80 border border-border rounded px-2 py-1 text-xs text-muted-foreground">
            <span className="mr-3">🏢 companies</span>
            <span className="mr-3">👤 people</span>
            <span className="mr-3">☎️ phones</span>
            <span>📍 addresses</span>
          </div>
          <div className="absolute top-3 right-3 text-[11px] bg-background/80 border border-border rounded px-2 py-1 text-muted-foreground">
            {filteredGraph.nodes.length} nodes · {filteredGraph.edges.length} edges
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphVisualization;
