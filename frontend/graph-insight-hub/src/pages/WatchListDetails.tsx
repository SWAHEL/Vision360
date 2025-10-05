import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Trash2, ArrowLeft } from "lucide-react";
import TopNavigation from "@/components/TopNavigation";
import { Link, useParams } from "react-router-dom";

interface TaxpayerEntry {
  id: string;
  proprietaire: string;
  raisonSociale: string;
  categorie: string;
  identifiantFiscal: string;
  ice: string;
  cin: string;
  adresse: string;
  dateAjout: string;
  ajoutePar: string;
  motif: string;
}

const WatchListDetails = () => {
  const { id } = useParams();
  const [searchFilter, setSearchFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("all");

  // Mock data
  const watchListName = "Entreprises à Risque Élevé";
  const canDelete = true; // Based on user rights

  const taxpayers: TaxpayerEntry[] = [
    {
      id: "1",
      proprietaire: "DGI Rabat",
      raisonSociale: "SOCIETE ATLAS SARL",
      categorie: "PME",
      identifiantFiscal: "12345678",
      ice: "001234567890123",
      cin: "",
      adresse: "Zone Industrielle, Salé",
      dateAjout: "15/01/2024",
      ajoutePar: "M. Lahlou",
      motif: "Retards de paiement récurrents"
    },
    {
      id: "2",
      proprietaire: "DGI Casablanca",
      raisonSociale: "FIBACO CONFECTION",
      categorie: "Exportateur",
      identifiantFiscal: "87654321",
      ice: "001987654321098",
      cin: "AB123456",
      adresse: "Hay Riad, Rabat",
      dateAjout: "12/01/2024",
      ajoutePar: "Automatique, règle",
      motif: "Anomalies dans les déclarations TVA"
    },
    {
      id: "3",
      proprietaire: "DGI Fès",
      raisonSociale: "MAROC TECH SOLUTIONS",
      categorie: "IT Services",
      identifiantFiscal: "45678912",
      ice: "001456789120987",
      cin: "CD789012",
      adresse: "Maarif, Casablanca",
      dateAjout: "08/01/2024",
      ajoutePar: "M. Chakir",
      motif: "Contrôle fiscal en cours"
    }
  ];

  const filteredTaxpayers = taxpayers.filter(taxpayer => {
    const matchesSearch = taxpayer.raisonSociale.toLowerCase().includes(searchFilter.toLowerCase()) ||
                         taxpayer.identifiantFiscal.includes(searchFilter) ||
                         taxpayer.ice.includes(searchFilter);
    
    const matchesYear = yearFilter === "all" || taxpayer.dateAjout.includes(yearFilter);
    
    return matchesSearch && matchesYear;
  });

  const handleDelete = (taxpayerId: string) => {
    // Handle deletion
    console.log("Deleting taxpayer:", taxpayerId);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation currentPage="watchlists" />
      
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/watchlists">Watch Lists</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{watchListName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-foreground">{watchListName}</h1>
            
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Rechercher..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-64"
              />
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Propriétaire</TableHead>
                <TableHead>Raison Sociale</TableHead>
                <TableHead>IF</TableHead>
                <TableHead>ICE</TableHead>
                <TableHead>CIN</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Date d'ajout</TableHead>
                <TableHead>Utilisateur ayant ajouté</TableHead>
                <TableHead>Motif</TableHead>
                {canDelete && <TableHead>Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTaxpayers.map((taxpayer) => (
                <TableRow key={taxpayer.id}>
                  <TableCell className="text-sm">{taxpayer.proprietaire}</TableCell>
                  <TableCell className="font-medium">
                    <Link 
                      to={`/taxpayer/${taxpayer.id}`}
                      className="text-primary hover:text-primary/80"
                    >
                      {taxpayer.raisonSociale}
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{taxpayer.identifiantFiscal}</TableCell>
                  <TableCell className="font-mono text-sm">{taxpayer.ice}</TableCell>
                  <TableCell className="font-mono text-sm">{taxpayer.cin || "-"}</TableCell>
                  <TableCell className="max-w-xs truncate" title={taxpayer.adresse}>
                    {taxpayer.adresse}
                  </TableCell>
                  <TableCell>{taxpayer.dateAjout}</TableCell>
                  <TableCell>
                    {taxpayer.ajoutePar === "Automatique, règle" ? (
                      <span className="text-muted-foreground italic">{taxpayer.ajoutePar}</span>
                    ) : (
                      taxpayer.ajoutePar
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={taxpayer.motif}>
                    {taxpayer.motif}
                  </TableCell>
                  {canDelete && (
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(taxpayer.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredTaxpayers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Aucun contribuable trouvé avec les filtres actuels.
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-start mt-6 pt-4 border-t">
            <Button variant="outline" asChild>
              <Link to="/watchlists">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WatchListDetails;