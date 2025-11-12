import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Circle, Minus, Zap, Box, Droplets, ArrowRight } from "lucide-react";
import { useState } from "react";

const InteractiveNetwork = () => {
  const [activeFlow, setActiveFlow] = useState(false);

  const componentDetails = {
    manhole1: {
      title: "Inlet Manhole",
      type: "Normal Manhole",
      specs: [
        "Elevation: 125.5 ft",
        "Diameter: 48 inches",
        "Rim Height: 8.2 ft",
        "Invert: 117.3 ft",
        "Load: 150 GPM"
      ],
      description: "Collection point where wastewater enters the system from residential connections."
    },
    pipe1: {
      title: "Gravity Main",
      type: "Gravity Flow Pipe",
      specs: [
        "Length: 350 ft",
        "Diameter: 12 inches",
        "Material: PVC",
        "Slope: 0.5%",
        "Manning's n: 0.013"
      ],
      description: "Conveys flow downstream using gravity. Designed for peak flow of 250 GPM."
    },
    manhole2: {
      title: "Junction Manhole",
      type: "Chamber",
      specs: [
        "Elevation: 123.8 ft",
        "Diameter: 60 inches",
        "Rim Height: 9.1 ft",
        "Invert: 114.7 ft",
        "Combined Load: 320 GPM"
      ],
      description: "Intermediate junction combining multiple upstream flows before wet well."
    },
    pipe2: {
      title: "Gravity Main",
      type: "Gravity Flow Pipe",
      specs: [
        "Length: 280 ft",
        "Diameter: 15 inches",
        "Material: PVC",
        "Slope: 0.6%",
        "Manning's n: 0.013"
      ],
      description: "Larger diameter pipe handling combined flows approaching lift station."
    },
    wetwell: {
      title: "Lift Station Wet Well",
      type: "Storage & Pumping",
      specs: [
        "Volume: 1,200 gallons",
        "Depth: 15 ft",
        "Diameter: 8 ft",
        "Start Level: 8 ft",
        "Stop Level: 3 ft"
      ],
      description: "Temporary storage for wastewater. Pumps activate when level reaches start point."
    },
    pump: {
      title: "Submersible Pump",
      type: "Variable Speed",
      specs: [
        "Capacity: 500 GPM",
        "Head: 85 ft",
        "Power: 15 HP",
        "Efficiency: 78%",
        "Impeller: 8 inches"
      ],
      description: "Adds energy to lift wastewater to higher elevation for continued gravity flow."
    },
    pipe3: {
      title: "Force Main",
      type: "Pressurized Pipe",
      specs: [
        "Length: 1,200 ft",
        "Diameter: 8 inches",
        "Material: Ductile Iron",
        "Pressure: 60 PSI",
        "C-factor: 130"
      ],
      description: "Pressurized pipe conveying wastewater uphill to discharge point."
    },
    outlet: {
      title: "Outlet Manhole",
      type: "Discharge Point",
      specs: [
        "Elevation: 165.2 ft",
        "Diameter: 48 inches",
        "Rim Height: 7.8 ft",
        "Invert: 157.4 ft",
        "Discharge: 320 GPM"
      ],
      description: "Terminal point where flow continues downstream or enters treatment facility."
    }
  };

  return (
    <Card className="p-8 shadow-medium">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Interactive Network Diagram</h3>
          <p className="text-muted-foreground mt-2">
            Click on any component to view detailed specifications and operational data
          </p>
        </div>
        <button
          onClick={() => setActiveFlow(!activeFlow)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Droplets className="w-4 h-4" />
          {activeFlow ? "Stop Flow" : "Animate Flow"}
        </button>
      </div>

      {/* Network Visualization */}
      <div className="relative bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-12 overflow-x-auto">
        <div className="flex items-center justify-center gap-4 min-w-max">
          {/* Manhole 1 */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform ring-2 ring-primary/20 hover:ring-4">
                  <Circle className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="text-xs font-medium text-foreground">Inlet</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h4 className="font-bold text-foreground mb-2">{componentDetails.manhole1.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{componentDetails.manhole1.description}</p>
              <div className="space-y-1">
                {componentDetails.manhole1.specs.map((spec, i) => (
                  <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-primary" />
                    {spec}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Pipe 1 with flow animation */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer group">
                  <div className="relative h-1 w-24 bg-accent rounded-full">
                    {activeFlow && (
                      <>
                        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-flow-1" />
                        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-flow-2" />
                      </>
                    )}
                  </div>
                  <Minus className="w-5 h-5 text-accent mx-auto mt-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-muted-foreground block text-center mt-1">350 ft</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <h4 className="font-bold text-foreground mb-2">{componentDetails.pipe1.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{componentDetails.pipe1.description}</p>
                <div className="space-y-1">
                  {componentDetails.pipe1.specs.map((spec, i) => (
                    <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-accent" />
                      {spec}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Manhole 2 */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform ring-2 ring-primary/20 hover:ring-4">
                  <Circle className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="text-xs font-medium text-foreground">Junction</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h4 className="font-bold text-foreground mb-2">{componentDetails.manhole2.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{componentDetails.manhole2.description}</p>
              <div className="space-y-1">
                {componentDetails.manhole2.specs.map((spec, i) => (
                  <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-primary" />
                    {spec}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Pipe 2 */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer group">
                  <div className="relative h-1 w-20 bg-accent rounded-full">
                    {activeFlow && (
                      <>
                        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-flow-1" />
                        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-flow-2" />
                      </>
                    )}
                  </div>
                  <Minus className="w-5 h-5 text-accent mx-auto mt-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-muted-foreground block text-center mt-1">280 ft</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <h4 className="font-bold text-foreground mb-2">{componentDetails.pipe2.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{componentDetails.pipe2.description}</p>
                <div className="space-y-1">
                  {componentDetails.pipe2.specs.map((spec, i) => (
                    <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-accent" />
                      {spec}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Wet Well */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="relative w-16 h-16 rounded-lg bg-secondary flex items-center justify-center shadow-lg hover:scale-110 transition-transform ring-2 ring-secondary/20 hover:ring-4">
                  <Box className="w-8 h-8 text-secondary-foreground" />
                  {activeFlow && (
                    <div className="absolute inset-0 bg-primary/20 animate-pulse rounded-lg" />
                  )}
                </div>
                <span className="text-xs font-medium text-foreground">Wet Well</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h4 className="font-bold text-foreground mb-2">{componentDetails.wetwell.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{componentDetails.wetwell.description}</p>
              <div className="space-y-1">
                {componentDetails.wetwell.specs.map((spec, i) => (
                  <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-secondary" />
                    {spec}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Pump */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform ring-2 ring-primary/20 hover:ring-4">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                  {activeFlow && (
                    <div className="absolute inset-0 bg-yellow-400/30 animate-pulse rounded-full" />
                  )}
                </div>
                <span className="text-xs font-medium text-foreground">Pump</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h4 className="font-bold text-foreground mb-2">{componentDetails.pump.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{componentDetails.pump.description}</p>
              <div className="space-y-1">
                {componentDetails.pump.specs.map((spec, i) => (
                  <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-primary" />
                    {spec}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Pipe 3 (Force Main) */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer group">
                  <div className="relative h-1.5 w-32 bg-primary rounded-full">
                    {activeFlow && (
                      <>
                        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-flow-1" />
                        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-flow-2" />
                      </>
                    )}
                  </div>
                  <Zap className="w-5 h-5 text-primary mx-auto mt-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-muted-foreground block text-center mt-1">1,200 ft</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <h4 className="font-bold text-foreground mb-2">{componentDetails.pipe3.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{componentDetails.pipe3.description}</p>
                <div className="space-y-1">
                  {componentDetails.pipe3.specs.map((spec, i) => (
                    <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-primary" />
                      {spec}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Outlet */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform ring-2 ring-primary/20 hover:ring-4">
                  <Circle className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="text-xs font-medium text-foreground">Outlet</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h4 className="font-bold text-foreground mb-2">{componentDetails.outlet.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{componentDetails.outlet.description}</p>
              <div className="space-y-1">
                {componentDetails.outlet.specs.map((spec, i) => (
                  <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-primary" />
                    {spec}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Legend</h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Manhole / Node</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-accent rounded-full" />
              <span className="text-xs text-muted-foreground">Gravity Flow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-primary rounded-full" />
              <span className="text-xs text-muted-foreground">Pressurized Flow</span>
            </div>
            <div className="flex items-center gap-2">
              <Box className="w-3 h-3 text-secondary" />
              <span className="text-xs text-muted-foreground">Storage Element</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-xs text-muted-foreground">Pump / Energy Addition</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InteractiveNetwork;
