import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";

const GraphVisualization = () => {
  return (
    <div className="flex-1 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Graphe des Relations d'Entités</h2>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <Card className="h-[calc(100vh-180px)] bg-card/50 relative overflow-hidden">
        <CardContent className="p-0 h-full">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            {/* Graph Background */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Edges/Connections */}
            <g stroke="hsl(var(--border))" strokeWidth="2" fill="none">
              {/* Company to Person 1 */}
              <path d="M 400 300 Q 350 250 300 200" markerEnd="url(#arrowhead)" />
              <text x="340" y="240" className="fill-muted-foreground text-xs">gérant</text>
              
              {/* Company to Person 2 */}
              <path d="M 400 300 Q 450 250 500 200" markerEnd="url(#arrowhead)" />
              <text x="460" y="240" className="fill-muted-foreground text-xs">associé</text>
              
              {/* Company to Document 1 */}
              <path d="M 400 300 Q 300 350 200 400" markerEnd="url(#arrowhead)" />
              <text x="280" y="360" className="fill-muted-foreground text-xs">hasDocument</text>
              
              {/* Company to Document 2 */}
              <path d="M 400 300 Q 500 350 600 400" markerEnd="url(#arrowhead)" />
              <text x="520" y="360" className="fill-muted-foreground text-xs">hasDocument</text>
              
              {/* Company to Location */}
              <path d="M 400 300 L 400 450" markerEnd="url(#arrowhead)" />
              <text x="410" y="380" className="fill-muted-foreground text-xs">locatedAt</text>
            </g>
            
            {/* Arrow marker definition */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                      refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--border))" />
              </marker>
            </defs>
            
            {/* Nodes */}
            
            {/* Central Company Node */}
            <g className="cursor-pointer hover:opacity-80" transform="translate(400, 300)">
              <circle r="35" fill="hsl(var(--node-company))" stroke="hsl(var(--dgi-cyan-dark))" strokeWidth="3" />
              <text textAnchor="middle" y="-5" className="fill-white text-sm font-medium">🏢</text>
              <text textAnchor="middle" y="10" className="fill-white text-xs">ATLAS SARL</text>
            </g>
            
            {/* Person Node 1 - Gérant */}
            <g className="cursor-pointer hover:opacity-80" transform="translate(300, 200)">
              <circle r="25" fill="hsl(var(--node-person))" stroke="hsl(var(--border))" strokeWidth="2" />
              <text textAnchor="middle" y="-3" className="fill-white text-sm">👤</text>
              <text textAnchor="middle" y="45" className="fill-card-foreground text-xs">M. BENALI</text>
            </g>
            
            {/* Person Node 2 - Associé */}
            <g className="cursor-pointer hover:opacity-80" transform="translate(500, 200)">
              <circle r="25" fill="hsl(var(--node-person))" stroke="hsl(var(--border))" strokeWidth="2" />
              <text textAnchor="middle" y="-3" className="fill-white text-sm">👤</text>
              <text textAnchor="middle" y="45" className="fill-card-foreground text-xs">Mme ALAMI</text>
            </g>
            
            {/* Document Node 1 */}
            <g className="cursor-pointer hover:opacity-80" transform="translate(200, 400)">
              <circle r="20" fill="hsl(var(--node-document))" stroke="hsl(var(--border))" strokeWidth="2" />
              <text textAnchor="middle" y="2" className="fill-white text-sm">📄</text>
              <text textAnchor="middle" y="35" className="fill-card-foreground text-xs">Statuts</text>
            </g>
            
            {/* Document Node 2 */}
            <g className="cursor-pointer hover:opacity-80" transform="translate(600, 400)">
              <circle r="20" fill="hsl(var(--node-document))" stroke="hsl(var(--border))" strokeWidth="2" />
              <text textAnchor="middle" y="2" className="fill-white text-sm">📄</text>
              <text textAnchor="middle" y="35" className="fill-card-foreground text-xs">TVA 2024</text>
            </g>
            
            {/* Location Node */}
            <g className="cursor-pointer hover:opacity-80" transform="translate(400, 450)">
              <circle r="20" fill="hsl(var(--node-location))" stroke="hsl(var(--border))" strokeWidth="2" />
              <text textAnchor="middle" y="2" className="fill-white text-sm">📍</text>
              <text textAnchor="middle" y="35" className="fill-card-foreground text-xs">Casablanca</text>
            </g>
            
            {/* Risk Flagged Node */}
            <g className="cursor-pointer hover:opacity-80" transform="translate(150, 150)">
              <circle r="25" fill="hsl(var(--node-person))" stroke="hsl(var(--destructive))" strokeWidth="3" />
              <text textAnchor="middle" y="-3" className="fill-white text-sm">👤</text>
              <text textAnchor="middle" y="45" className="fill-destructive text-xs font-medium">⚠️ M. SUSPECT</text>
            </g>
            
            {/* Connection from flagged person to company */}
            <path d="M 175 175 Q 250 200 365 280" stroke="hsl(var(--destructive))" strokeWidth="2" 
                  fill="none" markerEnd="url(#redArrow)" strokeDasharray="5,5" />
            <text x="250" y="220" className="fill-destructive text-xs">ex-associé</text>
            
            <defs>
              <marker id="redArrow" markerWidth="10" markerHeight="7" 
                      refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--destructive))" />
              </marker>
            </defs>
          </svg>
          
          {/* Tooltip overlay */}
          <div className="absolute top-4 left-4 bg-popover border border-border rounded-lg p-3 text-sm max-w-xs opacity-0 pointer-events-none transition-opacity" 
               id="graph-tooltip">
            <div className="font-medium">ATLAS SARL</div>
            <div className="text-muted-foreground">Type: Société à Responsabilité Limitée</div>
            <div className="text-muted-foreground">Statut: Actif</div>
            <div className="text-muted-foreground">Créé: 2015</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphVisualization;