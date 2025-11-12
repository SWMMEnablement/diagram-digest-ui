import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Calculator, TrendingUp, Ruler, Droplets, ArrowDown, Activity } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TechnicalGlossary = () => {
  // Manning's equation calculator state
  const [manningN, setManningN] = useState(0.013);
  const [hydraulicRadius, setHydraulicRadius] = useState(0.5);
  const [slope, setSlope] = useState(0.005);
  const [manningVelocity, setManningVelocity] = useState(0);

  // d/D ratio calculator state
  const [depth, setDepth] = useState(0.3);
  const [diameter, setDiameter] = useState(1.0);
  const [ddRatio, setDdRatio] = useState(0);
  const [flowPercentage, setFlowPercentage] = useState(0);

  // HGL calculator state
  const [elevation, setElevation] = useState(100);
  const [pressure, setPressure] = useState(50);
  const [hgl, setHgl] = useState(0);

  const calculateManning = () => {
    // V = (1.49/n) * R^(2/3) * S^(1/2)
    const velocity = (1.49 / manningN) * Math.pow(hydraulicRadius, 2/3) * Math.pow(slope, 1/2);
    setManningVelocity(parseFloat(velocity.toFixed(3)));
  };

  const calculateDDRatio = () => {
    const ratio = depth / diameter;
    setDdRatio(parseFloat(ratio.toFixed(3)));
    
    // Approximate flow percentage based on d/D ratio
    // This is a simplified calculation
    let flowPct = 0;
    if (ratio <= 0.5) {
      flowPct = ratio * 100 * 1.8; // Faster increase at lower depths
    } else {
      flowPct = 50 + (ratio - 0.5) * 100 * 1.2;
    }
    setFlowPercentage(Math.min(100, parseFloat(flowPct.toFixed(1))));
  };

  const calculateHGL = () => {
    // HGL = Elevation + Pressure Head (in feet)
    // Pressure head = pressure (psi) * 2.31 (conversion factor)
    const pressureHead = pressure * 2.31;
    const hglValue = elevation + pressureHead;
    setHgl(parseFloat(hglValue.toFixed(2)));
  };

  return (
    <Card className="p-8 shadow-medium">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">Technical Glossary</h3>
        <p className="text-muted-foreground">
          Interactive definitions and calculators for key hydraulic engineering concepts
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {/* Manning's Equation */}
        <AccordionItem value="manning" className="border border-border rounded-lg px-6 bg-card">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-foreground">Manning's Equation</h4>
                <p className="text-sm text-muted-foreground">Calculate flow velocity in open channels</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h5 className="font-semibold text-foreground mb-2">Formula</h5>
                <div className="text-center py-3 bg-background rounded-lg border border-border mb-3">
                  <code className="text-lg font-mono text-foreground">
                    V = (1.49/n) × R<sup>2/3</sup> × S<sup>1/2</sup>
                  </code>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong>V</strong> = Velocity (ft/s)</p>
                  <p><strong>n</strong> = Manning's roughness coefficient</p>
                  <p><strong>R</strong> = Hydraulic radius (ft)</p>
                  <p><strong>S</strong> = Slope of energy grade line (ft/ft)</p>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-accent" />
                  Interactive Calculator
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="manning-n">Manning's n</Label>
                    <Input
                      id="manning-n"
                      type="number"
                      step="0.001"
                      value={manningN}
                      onChange={(e) => setManningN(parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">PVC: 0.009-0.013</p>
                  </div>
                  <div>
                    <Label htmlFor="hydraulic-radius">Hydraulic Radius (ft)</Label>
                    <Input
                      id="hydraulic-radius"
                      type="number"
                      step="0.1"
                      value={hydraulicRadius}
                      onChange={(e) => setHydraulicRadius(parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slope">Slope (ft/ft)</Label>
                    <Input
                      id="slope"
                      type="number"
                      step="0.001"
                      value={slope}
                      onChange={(e) => setSlope(parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">0.005 = 0.5%</p>
                  </div>
                </div>
                <button
                  onClick={calculateManning}
                  className="w-full py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                  Calculate Velocity
                </button>
                {manningVelocity > 0 && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-center text-sm text-muted-foreground mb-1">Flow Velocity</p>
                    <p className="text-center text-3xl font-bold text-primary">{manningVelocity} ft/s</p>
                  </div>
                )}
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h5 className="font-semibold text-foreground mb-2">Common Roughness Coefficients</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between p-2 bg-background rounded border border-border">
                    <span className="text-muted-foreground">PVC Pipe</span>
                    <span className="font-mono text-foreground">0.009-0.013</span>
                  </div>
                  <div className="flex justify-between p-2 bg-background rounded border border-border">
                    <span className="text-muted-foreground">Concrete</span>
                    <span className="font-mono text-foreground">0.011-0.015</span>
                  </div>
                  <div className="flex justify-between p-2 bg-background rounded border border-border">
                    <span className="text-muted-foreground">Clay Pipe</span>
                    <span className="font-mono text-foreground">0.011-0.014</span>
                  </div>
                  <div className="flex justify-between p-2 bg-background rounded border border-border">
                    <span className="text-muted-foreground">Cast Iron</span>
                    <span className="font-mono text-foreground">0.012-0.015</span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* HGL - Hydraulic Grade Line */}
        <AccordionItem value="hgl" className="border border-border rounded-lg px-6 bg-card">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-foreground">HGL (Hydraulic Grade Line)</h4>
                <p className="text-sm text-muted-foreground">Elevation of water pressure at any point</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h5 className="font-semibold text-foreground mb-2">Definition</h5>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  The Hydraulic Grade Line (HGL) represents the total energy available in a fluid system, 
                  excluding velocity head. It shows the height to which water would rise in a vertical tube 
                  connected to the pipe at that point.
                </p>
                <div className="text-center py-3 bg-background rounded-lg border border-border">
                  <code className="text-lg font-mono text-foreground">
                    HGL = Elevation + Pressure Head
                  </code>
                </div>
              </div>

              <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-secondary" />
                  HGL Calculator
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="elevation">Elevation (ft)</Label>
                    <Input
                      id="elevation"
                      type="number"
                      step="1"
                      value={elevation}
                      onChange={(e) => setElevation(parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pressure">Pressure (psi)</Label>
                    <Input
                      id="pressure"
                      type="number"
                      step="1"
                      value={pressure}
                      onChange={(e) => setPressure(parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">1 psi ≈ 2.31 ft of head</p>
                  </div>
                </div>
                <button
                  onClick={calculateHGL}
                  className="w-full py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                >
                  Calculate HGL
                </button>
                {hgl > 0 && (
                  <div className="mt-4 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                    <p className="text-center text-sm text-muted-foreground mb-1">Hydraulic Grade Line</p>
                    <p className="text-center text-3xl font-bold text-secondary">{hgl} ft</p>
                    <p className="text-center text-xs text-muted-foreground mt-2">
                      Pressure Head: {(pressure * 2.31).toFixed(2)} ft
                    </p>
                  </div>
                )}
              </div>

              {/* Visual Representation */}
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h5 className="font-semibold text-foreground mb-3">Visual Representation</h5>
                <div className="relative bg-background p-6 rounded-lg border border-border">
                  <div className="flex items-end justify-center gap-8 h-40">
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-xs text-muted-foreground">Ground Level</div>
                      <div className="w-16 h-24 bg-muted border-2 border-border rounded-t-lg relative">
                        <div className="absolute bottom-0 w-full h-16 bg-secondary/30 border-t-2 border-secondary">
                          <ArrowDown className="w-4 h-4 text-secondary mx-auto mt-1" />
                        </div>
                      </div>
                      <div className="text-xs font-mono text-foreground">Elevation</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-xs text-muted-foreground">Piezometer</div>
                      <div className="w-16 h-32 bg-primary/20 border-2 border-primary rounded-t-lg relative flex items-end justify-center">
                        <Droplets className="w-6 h-6 text-primary mb-2" />
                      </div>
                      <div className="text-xs font-mono text-foreground">HGL</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border text-center text-xs text-muted-foreground">
                    Water rises in the piezometer to the HGL elevation
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* d/D Ratio */}
        <AccordionItem value="dd-ratio" className="border border-border rounded-lg px-6 bg-card">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Ruler className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-foreground">d/D Ratio</h4>
                <p className="text-sm text-muted-foreground">Depth to diameter ratio in pipes</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h5 className="font-semibold text-foreground mb-2">Definition</h5>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  The d/D ratio represents the depth of flow (d) divided by the internal diameter of the pipe (D). 
                  This ratio is critical for determining flow characteristics in partially filled pipes. Design 
                  guidelines typically recommend keeping d/D between 0.5 and 0.8 for optimal performance.
                </p>
                <div className="text-center py-3 bg-background rounded-lg border border-border">
                  <code className="text-lg font-mono text-foreground">
                    d/D = Flow Depth / Pipe Diameter
                  </code>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-accent" />
                  d/D Ratio Calculator
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="depth">Flow Depth, d (ft)</Label>
                    <Input
                      id="depth"
                      type="number"
                      step="0.1"
                      value={depth}
                      onChange={(e) => setDepth(parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="diameter">Pipe Diameter, D (ft)</Label>
                    <Input
                      id="diameter"
                      type="number"
                      step="0.1"
                      value={diameter}
                      onChange={(e) => setDiameter(parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <button
                  onClick={calculateDDRatio}
                  className="w-full py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                  Calculate d/D Ratio
                </button>
                {ddRatio > 0 && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-center text-sm text-muted-foreground mb-1">d/D Ratio</p>
                      <p className="text-center text-3xl font-bold text-accent">{ddRatio}</p>
                      <p className="text-center text-sm text-muted-foreground mt-2">
                        ~{flowPercentage}% of full capacity
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg border ${
                      ddRatio >= 0.5 && ddRatio <= 0.8 
                        ? 'bg-green-500/10 border-green-500/20' 
                        : 'bg-yellow-500/10 border-yellow-500/20'
                    }`}>
                      <p className="text-sm text-center">
                        {ddRatio >= 0.5 && ddRatio <= 0.8 
                          ? '✓ Optimal design range (0.5 - 0.8)' 
                          : ddRatio < 0.5 
                            ? '⚠ Below optimal range - consider smaller pipe' 
                            : '⚠ Above optimal range - may cause surcharge'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Visual Representation */}
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h5 className="font-semibold text-foreground mb-3">Visual Representation</h5>
                <div className="flex justify-around items-end p-6 bg-background rounded-lg border border-border">
                  <div className="text-center">
                    <div className="relative w-24 h-24 rounded-full border-4 border-accent mx-auto mb-2">
                      <div className="absolute bottom-0 left-0 right-0 bg-accent/30 rounded-b-full" style={{height: '25%'}}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-foreground">d</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">D</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">d/D = 0.25</p>
                    <p className="text-xs text-foreground">Low Flow</p>
                  </div>
                  <div className="text-center">
                    <div className="relative w-24 h-24 rounded-full border-4 border-accent mx-auto mb-2">
                      <div className="absolute bottom-0 left-0 right-0 bg-accent/50 rounded-b-full" style={{height: '60%'}}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-foreground">d</span>
                        </div>
                      </div>
                      <div className="absolute top-2 left-0 right-0 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">D</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">d/D = 0.6</p>
                    <p className="text-xs font-semibold text-accent">Optimal</p>
                  </div>
                  <div className="text-center">
                    <div className="relative w-24 h-24 rounded-full border-4 border-accent mx-auto mb-2">
                      <div className="absolute bottom-0 left-0 right-0 bg-accent/70 rounded-b-full" style={{height: '90%'}}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-foreground">d</span>
                        </div>
                      </div>
                      <div className="absolute top-1 left-0 right-0 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">D</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">d/D = 0.9</p>
                    <p className="text-xs text-foreground">Near Full</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Additional Terms */}
        <AccordionItem value="additional" className="border border-border rounded-lg px-6 bg-card">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-foreground">Additional Terms</h4>
                <p className="text-sm text-muted-foreground">Other important hydraulic concepts</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h5 className="font-semibold text-foreground mb-2">Hydraulic Radius (R)</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The cross-sectional area of flow divided by the wetted perimeter. Used in Manning's equation 
                  to characterize the efficiency of the flow cross-section.
                </p>
                <div className="mt-2 text-center py-2 bg-background rounded border border-border">
                  <code className="text-sm font-mono text-foreground">R = Area / Wetted Perimeter</code>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h5 className="font-semibold text-foreground mb-2">Invert Elevation</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The elevation of the inside bottom of a pipe at a specific point. Critical for establishing 
                  hydraulic gradients and ensuring proper gravity flow in collection systems.
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h5 className="font-semibold text-foreground mb-2">Peak Flow (Q<sub>peak</sub>)</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The maximum flow rate expected in a system, typically including wet weather flow and 
                  infiltration/inflow. Used for pipe sizing and pump selection.
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h5 className="font-semibold text-foreground mb-2">Surcharge</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A condition where the HGL rises above the crown of the pipe, causing pressurized flow. 
                  Can lead to manhole overflows and system backups if not properly designed for.
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h5 className="font-semibold text-foreground mb-2">Wet Well</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A storage chamber at a pump station where wastewater collects before being pumped. 
                  Sized to provide adequate storage and prevent excessive pump cycling.
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h5 className="font-semibold text-foreground mb-2">Force Main</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A pressurized pipe that conveys wastewater from a pump station to a higher elevation 
                  or distant location. Designed using the Hazen-Williams or Darcy-Weisbach equations.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default TechnicalGlossary;
