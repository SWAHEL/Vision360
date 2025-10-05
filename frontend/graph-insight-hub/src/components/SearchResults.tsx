import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { SearchFilters } from "./AdvancedSearchPanel";

interface SearchResult {
  id: string;
  name: string;
  identifiantFiscal: string;
  ice: string;
  cin?: string;
  rc: string;
  telephone: string;
  adresse: string;
  typeContribuable: string;
  secteurActivite: string;
  ville: string;
  dri: string;
  avatar?: string;
  riskLevel: "Faible" | "Moyen" | "Élevé";
}

interface SearchResultsProps {
  results: SearchResult[];
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const SearchResults = ({ 
  results, 
  viewMode, 
  onViewModeChange, 
  currentPage, 
  totalPages, 
  onPageChange,
  loading = false 
}: SearchResultsProps) => {
  
  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "Faible": return "outline";
      case "Moyen": return "secondary";
      case "Élevé": return "destructive";
      default: return "outline";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Recherche en cours...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* View Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {results.length} résultat(s) trouvé(s)
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("list")}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results */}
      {viewMode === "list" ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contribuable</TableHead>
                  <TableHead>IF/ICE</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>DRI</TableHead>
                  <TableHead>Risque</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id} className="hover:bg-muted/50 cursor-pointer">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={result.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(result.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-card-foreground">{result.name}</div>
                          <div className="text-sm text-muted-foreground">{result.secteurActivite}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">
                        <div>{result.identifiantFiscal}</div>
                        <div className="text-muted-foreground">{result.ice}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{result.typeContribuable}</Badge>
                    </TableCell>
                    <TableCell>{result.ville}</TableCell>
                    <TableCell className="text-sm">{result.dri}</TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeVariant(result.riskLevel)}>
                        {result.riskLevel}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={result.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(result.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-card-foreground truncate">{result.name}</h3>
                    <p className="text-sm text-muted-foreground">{result.secteurActivite}</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs font-mono text-muted-foreground">{result.identifiantFiscal}</div>
                      <div className="text-xs text-muted-foreground">{result.ville}</div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{result.typeContribuable}</Badge>
                      <Badge variant={getRiskBadgeVariant(result.riskLevel)} className="text-xs">
                        {result.riskLevel}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} sur {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {results.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              Aucun résultat trouvé. Essayez de modifier vos critères de recherche.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Mock data for demonstration
export const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    name: "SOCIETE ATLAS SARL",
    identifiantFiscal: "12345678",
    ice: "001234567890123",
    cin: "",
    rc: "123456",
    telephone: "+212 5 22 12 34 56",
    adresse: "Zone Industrielle, Salé",
    typeContribuable: "PME",
    secteurActivite: "Commerce",
    ville: "Salé",
    dri: "DRI Rabat",
    riskLevel: "Moyen"
  },
  {
    id: "2",
    name: "FIBACO CONFECTION",
    identifiantFiscal: "87654321",
    ice: "001987654321098",
    cin: "",
    rc: "654321",
    telephone: "+212 5 37 11 22 33",
    adresse: "Hay Riad, Rabat",
    typeContribuable: "Exportateur",
    secteurActivite: "Textile",
    ville: "Rabat",
    dri: "DRI Rabat",
    riskLevel: "Élevé"
  },
  {
    id: "3",
    name: "MAROC TECH SOLUTIONS",
    identifiantFiscal: "45678912",
    ice: "001456789120987",
    cin: "",
    rc: "789456",
    telephone: "+212 5 22 99 88 77",
    adresse: "Maarif, Casablanca",
    typeContribuable: "Grande Entreprise",
    secteurActivite: "IT",
    ville: "Casablanca",
    dri: "DRI Casablanca",
    riskLevel: "Faible"
  }
];

export default SearchResults;