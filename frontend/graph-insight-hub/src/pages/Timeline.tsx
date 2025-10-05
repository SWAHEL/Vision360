import TopNavigation from "@/components/TopNavigation";
import FiscalTimeline from "@/components/FiscalTimeline";

const Timeline = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation currentPage="timeline" />
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
            Timeline Fiscale - SOCIETE ATLAS SARL
          </h1>
          <FiscalTimeline />
        </div>
      </div>
    </div>
  );
};

export default Timeline;