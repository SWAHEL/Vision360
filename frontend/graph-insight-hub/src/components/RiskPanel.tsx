// src/components/RiskPanel.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, StickyNote, Calendar, User } from "lucide-react";

// Reuse the same shape as EntitySidebar (keep it local to avoid circular deps)
export type Entity = {
  id: string;
  identifiantFiscal?: string;
  ice?: string;
  cin?: string | null;
  nom: string;
  secteur?: string;
  ville?: string;
  adresse?: string;
  telephone?: string;
  category?: string;
  dri?: string;
  dip?: string;
  imageUrl?: string | null;
};

type RiskData = {
  overall: number;          // 0..100
  low: number;              // %
  medium: number;           // %
  high: number;             // %
  nonConformite: "Vert" | "Jaune" | "Rouge";
  nonDeclaration: "Vert" | "Jaune" | "Rouge";
  fraudeFiscale: "Vert" | "Jaune" | "Rouge";
};

type NoteItem = {
  type: "doc" | "note";
  title: string;
  author: string;
  date: string;             // display string
};

const F = (v: any, fallback = "—") =>
  v === null || v === undefined || v === "" ? fallback : v;

const colorForTag = (t: "Vert" | "Jaune" | "Rouge") => {
  if (t === "Vert") return "bg-success/10 text-success border-success/20";
  if (t === "Jaune") return "bg-warning/10 text-warning border-warning/20";
  return "bg-risk-high/10 text-risk-high border-risk-high/20";
};

const RiskPanel = ({
  entity,
  risk,
  notes,
}: {
  entity?: Entity;     // optional to avoid crashing if not provided yet
  risk?: RiskData;
  notes?: NoteItem[];
}) => {
  // sensible defaults if nothing is passed (keeps UI stable)
  const safeRisk: RiskData = risk ?? {
    overall: 75,
    low: 25,
    medium: 45,
    high: 30,
    nonConformite: "Jaune",
    nonDeclaration: "Vert",
    fraudeFiscale: "Rouge",
  };

  const safeNotes: NoteItem[] =
    notes ??
    [
      {
        type: "doc",
        title: "Rapport_Audit_2024.pdf",
        author: "A. Bennani",
        date: "15 Jan 2024",
      },
      {
        type: "note",
        title: "Retard de paiement détecté",
        author: "M. Chakir",
        date: "12 Jan 2024",
      },
      {
        type: "doc",
        title: "Declaration_TVA_Q4.pdf",
        author: "Système Auto",
        date: "31 Déc 2023",
      },
      {
        type: "note",
        title: "Contrôle sur place effectué",
        author: "Z. Marouani",
        date: "28 Déc 2023",
      },
    ];

  return (
    <div className="w-96 bg-card border-l border-border p-6 space-y-6 overflow-y-auto">
      {/* Risk Profile */}
      <Card className="bg-secondary/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Profil de Risque{entity?.nom ? ` — ${entity.nom}` : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Overall Risk Score */}
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">
              {F(safeRisk.overall, 0)}%
            </div>
            <div className="text-sm text-muted-foreground">Score de Risque Global</div>
          </div>

          {/* Risk Breakdown */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Risque Faible</span>
                <span className="text-risk-low font-medium">{safeRisk.low}%</span>
              </div>
              <Progress value={safeRisk.low} className="h-2 bg-muted">
                <div
                  className="h-full bg-risk-low rounded-full transition-all"
                  style={{ width: `${safeRisk.low}%` }}
                />
              </Progress>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">⚠️ Risque Moyen</span>
                <span className="text-risk-medium font-medium">
                  {safeRisk.medium}%
                </span>
              </div>
              <Progress value={safeRisk.medium} className="h-2 bg-muted">
                <div
                  className="h-full bg-risk-medium rounded-full transition-all"
                  style={{ width: `${safeRisk.medium}%` }}
                />
              </Progress>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Risque Élevé</span>
                <span className="text-risk-high font-medium">{safeRisk.high}%</span>
              </div>
              <Progress value={safeRisk.high} className="h-2 bg-muted">
                <div
                  className="h-full bg-risk-high rounded-full transition-all"
                  style={{ width: `${safeRisk.high}%` }}
                />
              </Progress>
            </div>
          </div>

          {/* Risk Categories */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Non-conformité</span>
              <Badge variant="outline" className={colorForTag(safeRisk.nonConformite)}>
                {safeRisk.nonConformite}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Non-déclaration</span>
              <Badge variant="outline" className={colorForTag(safeRisk.nonDeclaration)}>
                {safeRisk.nonDeclaration}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Fraude fiscale</span>
              <Badge variant="outline" className={colorForTag(safeRisk.fraudeFiscale)}>
                {safeRisk.fraudeFiscale}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes & Documents */}
      <Card className="bg-secondary/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Notes & Documents
            </CardTitle>
            <Button size="sm" variant="outline" className="text-xs">
              <Plus className="w-3 h-3 mr-1" />
              Ajouter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            {safeNotes.map((n, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
              >
                {n.type === "doc" ? (
                  <FileText className="w-4 h-4 text-node-document mt-0.5" />
                ) : (
                  <StickyNote className="w-4 h-4 text-warning mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-card-foreground truncate">
                    {n.title}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>{n.author}</span>
                    <Calendar className="w-3 h-3" />
                    <span>{n.date}</span>
                  </div>
                </div>
              </div>
            ))}
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
