import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TopNavigation from "@/components/TopNavigation";
import AdvancedSearchPanel, { SearchFilters } from "@/components/AdvancedSearchPanel";
import SearchResults, { mockSearchResults } from "@/components/SearchResults";
import TaxpayerProfileModal from "@/components/TaxpayerProfileModal";
import { Printer } from "lucide-react";

const SearchPage = () => {
  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState(mockSearchResults);
  const [loading, setLoading] = useState(false);
  const [selectedTaxpayer, setSelectedTaxpayer] = useState<any>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const totalPages = Math.ceil(results.length / 10);

  const handleSearch = async (filters: SearchFilters) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Filter results based on search criteria
      let filteredResults = mockSearchResults;
      
      if (filters.general) {
        filteredResults = filteredResults.filter(result =>
          result.name.toLowerCase().includes(filters.general.toLowerCase()) ||
          result.identifiantFiscal.includes(filters.general) ||
          result.ice.includes(filters.general)
        );
      }
      
      if (filters.ville) {
        filteredResults = filteredResults.filter(result => result.ville === filters.ville);
      }
      
      if (filters.typeContribuable) {
        filteredResults = filteredResults.filter(result => result.typeContribuable === filters.typeContribuable);
      }
      
      setResults(filteredResults);
      setCurrentPage(1);
      setLoading(false);
    }, 1000);
  };

  const handleResultClick = (result: any) => {
    setSelectedTaxpayer({
      id: result.id,
      name: result.name,
      identifiantFiscal: result.identifiantFiscal,
      ice: result.ice,
      avatar: result.avatar
    });
    setIsProfileModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation currentPage="search" />
      
      {/* Print Button */}
      <div className="fixed top-20 right-6 z-10">
        <Button
          onClick={handlePrint}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
          size="sm"
        >
          <Printer className="w-4 h-4 mr-2" />
          Imprimer PDF
        </Button>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Recherche de Contribuables</h1>
            <p className="text-muted-foreground">
              Recherchez et consultez les profils des contribuables avec filtres avancés
            </p>
          </div>

          {/* Advanced Search Panel */}
          <AdvancedSearchPanel
            isExpanded={isAdvancedExpanded}
            onToggle={() => setIsAdvancedExpanded(!isAdvancedExpanded)}
            onSearch={handleSearch}
          />

          {/* Search Results */}
          <div onClick={(e) => {
            const target = e.target as HTMLElement;
            const row = target.closest('[data-result-id]');
            if (row) {
              const resultId = row.getAttribute('data-result-id');
              const result = results.find(r => r.id === resultId);
              if (result) {
                handleResultClick(result);
              }
            }
          }}>
            <SearchResults
              results={results.map(result => ({
                ...result,
                'data-result-id': result.id
              }) as any)}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Taxpayer Profile Modal */}
      <TaxpayerProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        taxpayer={selectedTaxpayer}
      />
    </div>
  );
};

export default SearchPage;