import { Calendar, FileText, CreditCard, AlertTriangle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineEventProps {
  event: {
    id: number;
    type: string;
    title: string;
    date: string;
    status: string;
    details: Record<string, string>;
    statusColor: "success" | "destructive" | "warning";
    borderColor: string;
  };
  isLeft: boolean;
}

const getEventIcon = (type: string) => {
  switch (type) {
    case "Déclaration":
      return <FileText className="w-5 h-5" />;
    case "Paiement":
      return <CreditCard className="w-5 h-5" />;
    case "Contrôle fiscal":
      return <AlertTriangle className="w-5 h-5" />;
    case "Retard":
      return <Clock className="w-5 h-5" />;
    default:
      return <Calendar className="w-5 h-5" />;
  }
};

const TimelineEvent = ({ event, isLeft }: TimelineEventProps) => {
  return (
    <div className="relative flex items-center">
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-background border-4 border-dgi-cyan-primary rounded-full flex items-center justify-center text-dgi-cyan-primary z-10">
        {getEventIcon(event.type)}
      </div>
      
      {/* Event card */}
      <div className={`w-5/12 ${isLeft ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
        <Card 
          className={`
            hover:shadow-lg transition-shadow duration-200 
            border-l-4 border-l-${event.borderColor}
            ${isLeft ? 'ml-0' : 'mr-0'}
          `}
          style={{ borderLeftColor: `hsl(var(--${event.borderColor}))` }}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                {event.title}
              </CardTitle>
              <Badge 
                variant={event.statusColor === "success" ? "default" : 
                        event.statusColor === "destructive" ? "destructive" : 
                        "secondary"}
                className={
                  event.statusColor === "success" ? "bg-dgi-emerald text-white" :
                  event.statusColor === "warning" ? "bg-dgi-gold text-white" :
                  ""
                }
              >
                {event.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              {event.date}
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground mb-2">Type : {event.type}</p>
              {Object.entries(event.details).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{key} :</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimelineEvent;