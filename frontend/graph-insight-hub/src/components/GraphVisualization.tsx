import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import D3Graph from "@/components/D3Graph";
import { fetchGraphAll, type GraphBundle } from "@/api/graph";

const GraphVisualization = () => {
  const [graph, setGraph] = useState<GraphBundle>({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [limit, setLimit] = useState<number>(2000);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGraphAll({ limit });
      setGraph(data);
      setSelectedId(undefined);
    } catch (e: any) {
      setError(e.message || "Failed to load graph");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Graph</h2>

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
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            {loading ? "Loading…" : "Load"}
          </Button>
          {error && <span className="text-destructive text-sm">{error}</span>}
        </div>
      </div>

      <Card className="h-[calc(100vh-180px)] bg-card/50 relative overflow-hidden">
        <CardContent className="p-0 h-full">
          <D3Graph
            data={graph}
            selectedId={selectedId}
            onSelectCompany={(companyKey) => setSelectedId(`companies/${companyKey}`)}
          />
          <div className="absolute bottom-3 left-3 bg-background/80 border border-border rounded px-2 py-1 text-xs text-muted-foreground">
            <span className="mr-3">🏢 companies</span>
            <span className="mr-3">👤 people</span>
            <span className="mr-3">☎️ phones</span>
            <span>📍 addresses</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphVisualization;
