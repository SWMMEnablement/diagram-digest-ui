import { Card } from "@/components/ui/card";
import { Circle, Minus, Zap, Box } from "lucide-react";

const NetworkComponents = () => {
  const components = [
    {
      icon: Circle,
      title: "Manholes",
      types: ["Normal", "Chamber", "Outlet"],
      description: "Junction points where pipes intersect and loads are allocated to the network",
      color: "primary",
    },
    {
      icon: Box,
      title: "Wet Wells",
      types: ["Storage", "Lift Station"],
      description: "Storage elements of lift stations that collect and store wastewater temporarily",
      color: "secondary",
    },
    {
      icon: Minus,
      title: "Pipes",
      types: ["Gravity Main", "Force Main"],
      description: "Links conveying flow from one node to another through the collection system",
      color: "accent",
    },
    {
      icon: Zap,
      title: "Pumps",
      types: ["Submersible", "Dry Pit"],
      description: "Unidirectional links adding energy to discharge wastewater from low elevation points",
      color: "primary",
    },
  ];

  return (
    <Card className="p-8 shadow-medium">
      <h3 className="text-2xl font-bold mb-6 text-foreground">Network Components</h3>
      <p className="text-muted-foreground mb-8">
        InfoSewer models wastewater collection systems using four primary component types, each representing critical infrastructure elements.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {components.map((component, index) => {
          const Icon = component.icon;
          const colorClasses = {
            primary: "bg-primary text-primary-foreground border-primary/20",
            secondary: "bg-secondary text-secondary-foreground border-secondary/20",
            accent: "bg-accent text-accent-foreground border-accent/20",
          };
          
          return (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border bg-card hover:shadow-soft transition-all duration-300 hover:border-primary/30"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${colorClasses[component.color as keyof typeof colorClasses]} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground mb-2">{component.title}</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {component.types.map((type, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {component.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Network Diagram Visualization */}
      <div className="mt-8 p-6 bg-muted/30 rounded-xl">
        <h4 className="font-semibold text-foreground mb-6 text-center">Component Connectivity</h4>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Circle className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">Manhole</span>
          </div>
          
          <div className="flex items-center">
            <div className="h-0.5 w-16 bg-accent"></div>
            <Minus className="w-4 h-4 text-accent" />
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Minus className="w-6 h-6 text-accent-foreground rotate-90" />
            </div>
            <span className="text-xs text-muted-foreground">Pipe</span>
          </div>
          
          <div className="flex items-center">
            <div className="h-0.5 w-16 bg-accent"></div>
            <Minus className="w-4 h-4 text-accent" />
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
              <Box className="w-6 h-6 text-secondary-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">Wet Well</span>
          </div>
          
          <div className="flex items-center">
            <div className="h-0.5 w-16 bg-primary"></div>
            <Zap className="w-4 h-4 text-primary" />
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Circle className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">Outlet</span>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">
          Typical wastewater collection network flow path
        </p>
      </div>
    </Card>
  );
};

export default NetworkComponents;
