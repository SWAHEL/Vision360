import TopNavigation from "./TopNavigation";
import EntitySidebar from "./EntitySidebar";
import GraphVisualization from "./GraphVisualization";
import RiskPanel from "./RiskPanel";

const DGILayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavigation currentPage="dashboard" />
      
      <div className="flex h-[calc(100vh-8rem)]">
        <EntitySidebar />
        <GraphVisualization />
        <RiskPanel />
      </div>
    </div>
  );
};

export default DGILayout;