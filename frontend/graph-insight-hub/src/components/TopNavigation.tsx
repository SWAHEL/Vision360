import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, Map, FileText, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";

interface TopNavigationProps {
  currentPage?: string;
}

const TopNavigation = ({ currentPage }: TopNavigationProps) => {
  const location = useLocation();
  return (
    <div className="bg-nav-background border-b border-border sticky top-0 z-50">
      {/* Main Navigation */}
      <nav className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-semibold text-nav-foreground">📄 Analyse des Risques - KYT</h1>
          <Badge variant="outline" className="bg-dgi-cyan-light/20 text-dgi-cyan-dark border-dgi-cyan-primary/30">
            Direction Générale des Impôts
          </Badge>
          
          {/* Navigation Menu */}
          <div className="flex items-center space-x-1 ml-8">
            <Link to="/">
              <Button 
                variant={currentPage === "dashboard" || location.pathname === "/" ? "default" : "ghost"}
                size="sm"
                className={currentPage === "dashboard" || location.pathname === "/" ? "bg-dgi-cyan-primary hover:bg-dgi-cyan-dark text-white" : ""}
              >
                DASHBOARD
              </Button>
            </Link>
            <Link to="/timeline">
              <Button 
                variant={currentPage === "timeline" ? "default" : "ghost"}
                size="sm"
                className={currentPage === "timeline" ? "bg-dgi-cyan-primary hover:bg-dgi-cyan-dark text-white" : ""}
              >
                TIMELINE
              </Button>
            </Link>
            <Link to="/search">
              <Button 
                variant={currentPage === "search" ? "default" : "ghost"}
                size="sm"
                className={currentPage === "search" ? "bg-dgi-cyan-primary hover:bg-dgi-cyan-dark text-white" : ""}
              >
                RECHERCHE
              </Button>
            </Link>
            <Link to="/watchlists">
              <Button 
                variant={currentPage === "watchlists" ? "default" : "ghost"}
                size="sm"
                className={currentPage === "watchlists" ? "bg-dgi-cyan-primary hover:bg-dgi-cyan-dark text-white" : ""}
              >
                WATCH LISTS
              </Button>
            </Link>
            <Button variant="ghost" size="sm">CONNEXIONS</Button>
            <Button variant="ghost" size="sm">CARTOGRAPHIE</Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="default" size="sm" className="bg-dgi-cyan-primary hover:bg-dgi-cyan-dark text-white">
            <FileText className="w-4 h-4 mr-2" />
            📄 Imprimer PDF
          </Button>
        </div>
      </nav>
      
      {/* Search and Filter Bar */}
      <div className="px-6 py-4 bg-secondary/30 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="🔎 Rechercher par ICE, Nom, RC, CIN..."
              className="pl-10 bg-input border-border focus:ring-dgi-cyan-primary focus:border-dgi-cyan-primary"
            />
          </div>
          
          <Button variant="outline" size="sm" className="hover:bg-dgi-cyan-light/30">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
          
          <Button variant="outline" size="sm" className="hover:bg-dgi-cyan-light/30">
            <Map className="w-4 h-4 mr-2" />
            🗺️ Carte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;