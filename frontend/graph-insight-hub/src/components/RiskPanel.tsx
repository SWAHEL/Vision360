import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, StickyNote, Calendar, User } from "lucide-react";

const RiskPanel = () => {
  return (
    <div className="w-96 bg-card border-l border-border p-6 space-y-6 overflow-y-auto">
      {/* Risk Profile */}
      <Card className="bg-secondary/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-card-foreground">Profil de Risque</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Overall Risk Score */}
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">75%</div>
            <div className="text-sm text-muted-foreground">Score de Risque Global</div>
          </div>
          
          {/* Risk Breakdown */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Risque Faible</span>
                <span className="text-risk-low font-medium">25%</span>
              </div>
              <Progress value={25} className="h-2 bg-muted">
                <div className="h-full bg-risk-low rounded-full transition-all" style={{width: '25%'}} />
              </Progress>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">⚠️ Risque Moyen</span>
                <span className="text-risk-medium font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2 bg-muted">
                <div className="h-full bg-risk-medium rounded-full transition-all" style={{width: '45%'}} />
              </Progress>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Risque Élevé</span>
                <span className="text-risk-high font-medium">30%</span>
              </div>
              <Progress value={30} className="h-2 bg-muted">
                <div className="h-full bg-risk-high rounded-full transition-all" style={{width: '30%'}} />
              </Progress>
            </div>
          </div>
          
          {/* Risk Categories */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Non-conformité</span>
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                Jaune
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Non-déclaration</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Vert
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Fraude fiscale</span>
              <Badge variant="outline" className="bg-risk-high/10 text-risk-high border-risk-high/20">
                Rouge
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Notes & Documents */}
      <Card className="bg-secondary/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-card-foreground">Notes & Documents</CardTitle>
            <Button size="sm" variant="outline" className="text-xs">
              <Plus className="w-3 h-3 mr-1" />
              Ajouter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Document Entries */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <FileText className="w-4 h-4 text-node-document mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-card-foreground truncate">
                  Rapport_Audit_2024.pdf
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <User className="w-3 h-3" />
                  <span>A. Bennani</span>
                  <Calendar className="w-3 h-3" />
                  <span>15 Jan 2024</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <StickyNote className="w-4 h-4 text-warning mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-card-foreground">
                  Retard de paiement détecté
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <User className="w-3 h-3" />
                  <span>M. Chakir</span>
                  <Calendar className="w-3 h-3" />
                  <span>12 Jan 2024</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <FileText className="w-4 h-4 text-node-document mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-card-foreground truncate">
                  Declaration_TVA_Q4.pdf
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <User className="w-3 h-3" />
                  <span>Système Auto</span>
                  <Calendar className="w-3 h-3" />
                  <span>31 Déc 2023</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <StickyNote className="w-4 h-4 text-success mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-card-foreground">
                  Contrôle sur place effectué
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <User className="w-3 h-3" />
                  <span>Z. Marouani</span>
                  <Calendar className="w-3 h-3" />
                  <span>28 Déc 2023</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Add Note/Document Section */}
          <div className="pt-3 border-t border-border">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <StickyNote className="w-3 h-3 mr-1" />
                Note
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <FileText className="w-3 h-3 mr-1" />
                Document
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskPanel;