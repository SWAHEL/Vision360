import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Mail, Phone, Globe, CheckCircle } from "lucide-react";

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

const F = (v: any, fallback = "—") => (v === null || v === undefined || v === "" ? fallback : v);

const EntitySidebar = ({ entity }: { entity: Entity }) => {
  return (
    <div className="w-80 bg-card border-r border-border p-6 space-y-6 overflow-y-auto">
      {/* Logo / Avatar */}
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Building2 className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>

      {/* Header */}
      <Card className="bg-secondary/50">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-card-foreground">
              {F(entity.nom, "—")}
            </h3>
            <Badge
              variant="outline"
              className="bg-success/10 text-success border-success/20"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Vérifié
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              Contribuable
            </Badge>
            <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/20 text-xs">
              En activité
            </Badge>
          </div>

          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-muted-foreground">Secteur :</span>
                <div className="text-card-foreground">{F(entity.secteur)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Catégorie :</span>
                <div className="text-card-foreground">{F(entity.category)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-muted-foreground">Ville :</span>
                <div className="text-card-foreground">{F(entity.ville)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">DRI / DIP :</span>
                <div className="text-card-foreground">
                  {F(entity.dri)} / {F(entity.dip)}
                </div>
              </div>
            </div>

            <div>
              <span className="text-muted-foreground">Adresse :</span>
              <div className="text-card-foreground">{F(entity.adresse)}</div>
            </div>

            {/* Optional static extras to look complete */}
            <div>
              <span className="text-muted-foreground">Date de création :</span>
              <div className="text-card-foreground">15/09/2015</div>
            </div>
            <div>
              <span className="text-muted-foreground">Statut juridique :</span>
              <div className="text-card-foreground">SARL</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Identifiants */}
      <Card className="bg-secondary/50">
        <CardContent className="p-4 space-y-3">
          <h4 className="font-medium text-card-foreground">Identifiants</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Identifiant Fiscal :</span>
              <div className="font-mono text-card-foreground">
                {F(entity.identifiantFiscal)}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">ICE :</span>
              <div className="font-mono text-card-foreground">{F(entity.ice)}</div>
            </div>
            <div>
              <span className="text-muted-foreground">CIN :</span>
              <div className="font-mono text-card-foreground">{F(entity.cin)}</div>
            </div>
            <div>
              <span className="text-muted-foreground">RC :</span>
              <div className="font-mono text-card-foreground">451233</div>
            </div>
            <div>
              <span className="text-muted-foreground">CNSS :</span>
              <div className="font-mono text-card-foreground">10877129</div>
            </div>
            <div>
              <span className="text-muted-foreground">Patente :</span>
              <div className="font-mono text-card-foreground">PT-39281</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="bg-secondary/50">
        <CardContent className="p-4 space-y-3">
          <h4 className="font-medium text-card-foreground">
            Informations de Contact
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-card-foreground">
                {F(entity.telephone, "+212 5 20 10 03 03")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-card-foreground">contact@zenitech.ma</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-card-foreground">www.zenitech.ma</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntitySidebar;
