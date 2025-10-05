import TimelineEvent from "@/components/TimelineEvent";

const fiscalEvents = [
  {
    id: 1,
    type: "Déclaration",
    title: "Déclaration TVA T4",
    date: "31/12/2023",
    status: "Traitée",
    details: {
      "Période concernée": "T4 2023",
      "Pièce jointe": "declaration_tva_q4.pdf"
    },
    statusColor: "success" as const,
    borderColor: "dgi-cyan-primary"
  },
  {
    id: 2,
    type: "Paiement",
    title: "Paiement IS",
    date: "25/03/2023",
    status: "Reçu",
    details: {
      "Montant": "25 000 MAD",
      "Méthode": "Virement bancaire"
    },
    statusColor: "success" as const,
    borderColor: "dgi-emerald"
  },
  {
    id: 3,
    type: "Contrôle fiscal",
    title: "Contrôle Fiscal",
    date: "12/02/2022",
    status: "Non-conformité détectée",
    details: {
      "Inspecteur": "M. Lahlou",
      "Rapport": "controle_2022.pdf"
    },
    statusColor: "destructive" as const,
    borderColor: "dgi-deep-red"
  },
  {
    id: 4,
    type: "Déclaration",
    title: "Déclaration IS Annuelle",
    date: "31/03/2022",
    status: "Traitée",
    details: {
      "Exercice": "2021",
      "Résultat déclaré": "150 000 MAD"
    },
    statusColor: "success" as const,
    borderColor: "dgi-cyan-primary"
  },
  {
    id: 5,
    type: "Retard",
    title: "Retard de Paiement TVA",
    date: "15/01/2022",
    status: "Régularisé",
    details: {
      "Durée du retard": "15 jours",
      "Pénalités": "500 MAD"
    },
    statusColor: "warning" as const,
    borderColor: "dgi-gold"
  }
];

const FiscalTimeline = () => {
  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-dgi-cyan-primary/30 h-full"></div>
      
      <div className="space-y-12">
        {fiscalEvents.map((event, index) => (
          <TimelineEvent 
            key={event.id} 
            event={event} 
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default FiscalTimeline;