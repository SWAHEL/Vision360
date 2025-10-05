import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Building2, Mail, Phone } from "lucide-react";

const EntitySidebar = () => {
  return (
    <div className="w-80 bg-card border-r border-border p-6 space-y-6 overflow-y-auto">
      {/* DGI Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Building2 className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>
      
      {/* Entity Info */}
      <Card className="bg-secondary/50">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-card-foreground">SOCIETE ATLAS SARL</h3>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              <CheckCircle className="w-3 h-3 mr-1" />
              Vérifié
            </Badge>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground">ID Entité:</span>
              <div className="font-mono text-card-foreground">ENT-2024-00156</div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-muted-foreground">ICE:</span>
                <div className="font-mono text-card-foreground">002345678901234</div>
              </div>
              <div>
                <span className="text-muted-foreground">RC:</span>
                <div className="font-mono text-card-foreground">123456</div>
              </div>
            </div>
            
            <div>
              <span className="text-muted-foreground">CNSS:</span>
              <div className="font-mono text-card-foreground">9876543210</div>
            </div>
            
            <div>
              <span className="text-muted-foreground">Capital:</span>
              <div className="text-card-foreground">
                <span className="text-dgi-gold">50%</span> / <span className="text-node-person">50%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Contact Info */}
      <Card className="bg-secondary/50">
        <CardContent className="p-4 space-y-3">
          <h4 className="font-medium text-card-foreground">Informations de Contact</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-card-foreground">contact@atlas-sarl.ma</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-card-foreground">+212 5 22 12 34 56</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Embedded Mini Map */}
      <Card className="bg-secondary/50">
        <CardContent className="p-4 space-y-3">
          <h4 className="font-medium text-card-foreground">Localisation</h4>
          
          <div className="w-full h-32 bg-muted rounded-lg relative overflow-hidden border border-border">
            {/* Mini Map Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-dgi-cyan-light/20 to-secondary/50">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-dgi-deep-red rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-2 left-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                📍 Salé, Maroc
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Fibaco Confection - Zone Industrielle
          </div>
        </CardContent>
      </Card>
      
      {/* Risk Indicators */}
      <Card className="bg-secondary/50">
        <CardContent className="p-4 space-y-3">
          <h4 className="font-medium text-card-foreground">Indicateurs de Risque</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Déclarations</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                À jour
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Paiements</span>
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Retard 15j
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Contrôles</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Conforme
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntitySidebar;