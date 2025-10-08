import { useEffect, useMemo, useState } from "react";
import D3Graph from "@/components/D3Graph";
import { fetchGraphAll, fetchCompany, type GraphBundle, type CompanyCard } from "@/api/graph";

type CompanyWithKey = CompanyCard & { key: string };

export default function GraphPage() {
  // controls
  const [depth, setDepth] = useState<number>(2);
  const [root, setRoot] = useState<string>("");
  const [currentOnly, setCurrentOnly] = useState<boolean>(true);

  // graph data
  const [graph, setGraph] = useState<GraphBundle>({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // company panel
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [company, setCompany] = useState<CompanyWithKey | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  async function loadGraph() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGraphAll({
        depth,
        root: root || undefined,
        currentOnly,
      });
      setGraph(data);
      setCompany(null);
      setSelectedKey(null);
    } catch (e: any) {
      setError(e.message || "Failed to load graph");
    } finally {
      setLoading(false);
    }
  }

  // initial load
  useEffect(() => {
    loadGraph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when selected company or paging changes, reload the card
  useEffect(() => {
    if (!selectedKey) return;
    (async () => {
      try {
        const card = await fetchCompany(selectedKey, { limit, offset });
        setCompany({ key: selectedKey, ...card });
      } catch (e) {
        console.error(e);
        setCompany(null);
      }
    })();
  }, [selectedKey, limit, offset]);

  const employees = useMemo(() => company?.employees ?? [], [company]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", height: "100vh", background: "#0f1320", color: "#e6eefc" }}>
      {/* left: controls + graph */}
      <div style={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", padding: 10, borderBottom: "1px solid #26324c", background: "#12172a" }}>
          <strong>Vision360</strong>
          <label>Depth&nbsp;
            <select value={depth} onChange={e => setDepth(Number(e.target.value))}>
              <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option>
            </select>
          </label>
          <label>Root&nbsp;
            <input value={root} onChange={e => setRoot(e.target.value)} placeholder="company key e.g. ARAVO" />
          </label>
          <label><input type="checkbox" checked={currentOnly} onChange={e => setCurrentOnly(e.target.checked)} /> currentOnly</label>
          <button onClick={loadGraph} disabled={loading}>{loading ? "Loading…" : "Load"}</button>
          {error && <span style={{ color: "#ff8b8b" }}>{error}</span>}
        </div>

        {/* make this relative so tooltips (absolute) can position inside */}
        <div style={{ minHeight: 0, position: "relative" }}>
          <D3Graph
            data={graph}
            selectedId={selectedKey ? `companies/${selectedKey}` : undefined}
            onSelectCompany={(key) => {
              setSelectedKey(key);
              setOffset(0);
            }}
          />
        </div>
      </div>

      {/* right: company side panel */}
      <aside style={{ borderLeft: "1px solid #26324c", background: "#161b2e", padding: 12, overflow: "auto" }}>
        {!selectedKey && <div>Select a company node.</div>}
        {selectedKey && !company && <div>Loading company…</div>}
        {company && (
          <>
            <h3 style={{ marginTop: 0 }}>
              {company.company?.name} <small style={{ opacity: .7 }}>({company.key})</small>
            </h3>
            <div style={{ opacity: .8 }}>
              Sector: {company.company?.sector || "—"} • Tax ID: {company.company?.taxId || "—"}
            </div>

            <div style={{ marginTop: 10 }}>
              <strong>Phones</strong>
              <div>{(company.phones || []).map(p => p.number).filter(Boolean).join(", ") || "—"}</div>
            </div>

            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <strong>Employees</strong>
              <span style={{ opacity: .7, fontSize: 12 }}>(page {Math.floor(offset / limit) + 1})</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                <button onClick={() => setOffset(o => Math.max(0, o - limit))} disabled={offset === 0}>Prev</button>
                <select value={limit} onChange={e => { setLimit(Number(e.target.value)); setOffset(0); }}>
                  <option value={5}>5</option><option value={10}>10</option><option value={20}>20</option>
                </select>
                <button onClick={() => setOffset(o => o + limit)} disabled={employees.length < limit}>Next</button>
              </div>
            </div>

            <ul>
              {employees.map(e => (
                <li key={e.id}>{e.name} <span style={{ opacity: .7 }}>({e.title || e.role || "—"})</span></li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </div>
  );
}
