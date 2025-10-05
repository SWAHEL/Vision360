import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface AdvancedSearchPanelProps {
  isExpanded: boolean;
  onToggle: () => void;
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  identifiantFiscal: string;
  ice: string;
  cin: string;
  rc: string;
  telephone: string;
  adresse: string;
  typeContribuable: string;
  secteurActivite: string;
  ville: string;
  dri: string;
  general: string;
}

const AdvancedSearchPanel = ({ isExpanded, onToggle, onSearch }: AdvancedSearchPanelProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    identifiantFiscal: "",
    ice: "",
    cin: "",
    rc: "",
    telephone: "",
    adresse: "",
    typeContribuable: "",
    secteurActivite: "",
    ville: "",
    dri: "",
    general: ""
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      identifiantFiscal: "",
      ice: "",
      cin: "",
      rc: "",
      telephone: "",
      adresse: "",
      typeContribuable: "",
      secteurActivite: "",
      ville: "",
      dri: "",
      general: ""
    });
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        {/* Simple Search */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher par ICE, Nom, RC, CIN, Téléphone..."
              value={filters.general}
              onChange={(e) => updateFilter('general', e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={onToggle}
            className="flex items-center space-x-2"
          >
            <span>Recherche avancée</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        {/* Advanced Search Panel */}
        {isExpanded && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="identifiant-fiscal">Identifiant Fiscal</Label>
                <Input
                  id="identifiant-fiscal"
                  value={filters.identifiantFiscal}
                  onChange={(e) => updateFilter('identifiantFiscal', e.target.value)}
                  placeholder="Ex: 12345678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ice">ICE</Label>
                <Input
                  id="ice"
                  value={filters.ice}
                  onChange={(e) => updateFilter('ice', e.target.value)}
                  placeholder="Ex: 001234567890123"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cin">CIN</Label>
                <Input
                  id="cin"
                  value={filters.cin}
                  onChange={(e) => updateFilter('cin', e.target.value)}
                  placeholder="Ex: AB123456"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rc">RC/Centre RC</Label>
                <Input
                  id="rc"
                  value={filters.rc}
                  onChange={(e) => updateFilter('rc', e.target.value)}
                  placeholder="Ex: 123456"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  value={filters.telephone}
                  onChange={(e) => updateFilter('telephone', e.target.value)}
                  placeholder="Ex: +212 5 22 12 34 56"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                  id="adresse"
                  value={filters.adresse}
                  onChange={(e) => updateFilter('adresse', e.target.value)}
                  placeholder="Ex: Casablanca"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type-contribuable">Type/Catégorie Contribuable</Label>
                <Select value={filters.typeContribuable} onValueChange={(value) => updateFilter('typeContribuable', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous</SelectItem>
                    <SelectItem value="PME">PME</SelectItem>
                    <SelectItem value="Grande Entreprise">Grande Entreprise</SelectItem>
                    <SelectItem value="Exportateur">Exportateur</SelectItem>
                    <SelectItem value="Professionnel">Professionnel</SelectItem>
                    <SelectItem value="Particulier">Particulier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secteur-activite">Secteur d'Activité</Label>
                <Select value={filters.secteurActivite} onValueChange={(value) => updateFilter('secteurActivite', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous</SelectItem>
                    <SelectItem value="Commerce">Commerce</SelectItem>
                    <SelectItem value="Industry">Industrie</SelectItem>
                    <SelectItem value="Services">Services</SelectItem>
                    <SelectItem value="IT">Technologie</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ville">Ville</Label>
                <Select value={filters.ville} onValueChange={(value) => updateFilter('ville', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes</SelectItem>
                    <SelectItem value="Casablanca">Casablanca</SelectItem>
                    <SelectItem value="Rabat">Rabat</SelectItem>
                    <SelectItem value="Salé">Salé</SelectItem>
                    <SelectItem value="Fès">Fès</SelectItem>
                    <SelectItem value="Marrakech">Marrakech</SelectItem>
                    <SelectItem value="Tanger">Tanger</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dri">DRI/DPI/DIP</Label>
                <Select value={filters.dri} onValueChange={(value) => updateFilter('dri', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous</SelectItem>
                    <SelectItem value="DRI Casablanca">DRI Casablanca</SelectItem>
                    <SelectItem value="DRI Rabat">DRI Rabat</SelectItem>
                    <SelectItem value="DPI Salé">DPI Salé</SelectItem>
                    <SelectItem value="DIP Fès">DIP Fès</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={handleReset}>
                Réinitialiser
              </Button>
              <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedSearchPanel;