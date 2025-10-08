import TopNavigation from "./TopNavigation";
import EntitySidebar from "./EntitySidebar";
import GraphVisualization from "./GraphVisualization";
import RiskPanel from "./RiskPanel";

// TODO: replace this with your real API response (data.content[0])
const mockEntity = {
  id: "d2a5cf98-4030-4f90-902c-fc11fdf7e546",
  identifiantFiscal: "IF-ZEN-0001",
  ice: "ICE-ZEN-830115",
  cin: null,
  nom: "Zenitech SARL",
  secteur: "Technology",
  ville: "Casablanca",
  adresse: "Casablanca",
  telephone: "+212 5 20 10 03 03",
  category: "A",
  dri: "DRI-03",
  dip: "DIP-19",
  imageUrl: null,
};

const DGILayout = () => {
  const entity = mockEntity;                 // ← replace with your data.content[0]
  const companyName = entity?.nom ?? "";     // ← IMPORTANT: pass the same name to the graph

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavigation currentPage="dashboard" />
      <div className="flex h-[calc(100vh-8rem)]">
        <EntitySidebar entity={entity} />
        <GraphVisualization companyName={companyName} />
        <RiskPanel entity={entity} />
      </div>
    </div>
  );
};

export default DGILayout;
