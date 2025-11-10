import { Card } from "@/components/ui/card";
import { Droplets, TrendingDown, Gauge, Activity } from "lucide-react";

const HydraulicProcess = () => {
  return (
    <Card className="p-8 shadow-medium">
      <h3 className="text-2xl font-bold mb-6 text-foreground">Hydraulic Modeling Process</h3>
      <p className="text-muted-foreground mb-8">
        InfoSewer performs comprehensive hydraulic calculations to analyze open channel flow conditions throughout the wastewater collection network.
      </p>

      {/* Flow Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Input Parameters */}
        <div className="space-y-4">
          <div className="bg-gradient-primary p-6 rounded-xl shadow-soft">
            <h4 className="font-bold text-primary-foreground text-lg mb-2">Input Parameters</h4>
            <p className="text-sm text-primary-foreground/90">Physical and operational characteristics</p>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <Droplets className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-foreground mb-2">Flow Characteristics</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Flow rates at nodes (sanitary & infiltration)</li>
                    <li>• Diurnal patterns (time-varying loads)</li>
                    <li>• Peaking factors</li>
                    <li>• Ground water infiltration rates</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <Gauge className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-foreground mb-2">Pipe Properties</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Diameter and shape</li>
                    <li>• Length and slope</li>
                    <li>• Manning's roughness coefficient</li>
                    <li>• Invert elevations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-foreground mb-2">Boundary Conditions</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Outlet elevations (tailwater)</li>
                    <li>• Pump curves and controls</li>
                    <li>• Wet well storage volumes</li>
                    <li>• Force main characteristics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Process */}
        <div className="space-y-4">
          <div className="bg-secondary p-6 rounded-xl shadow-soft">
            <h4 className="font-bold text-secondary-foreground text-lg mb-2">Calculation Process</h4>
            <p className="text-sm text-secondary-foreground/90">Hydraulic solver methodology</p>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-secondary">1</span>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1">Flow Accumulation</h5>
                  <p className="text-sm text-muted-foreground">
                    Aggregate flows from upstream nodes considering tributary contributions
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-secondary">2</span>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1">Normal Depth Calculation</h5>
                  <p className="text-sm text-muted-foreground">
                    Determine flow depth using Manning's equation and pipe geometry
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-secondary">3</span>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1">Velocity Computation</h5>
                  <p className="text-sm text-muted-foreground">
                    Calculate flow velocity based on flow rate and wetted area
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-secondary">4</span>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1">HGL Profile Generation</h5>
                  <p className="text-sm text-muted-foreground">
                    Establish hydraulic grade line considering energy losses
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-secondary">5</span>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1">Capacity Assessment</h5>
                  <p className="text-sm text-muted-foreground">
                    Evaluate d/D ratios and identify potential surcharge conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Output Results */}
      <div className="p-6 bg-muted/30 rounded-xl mb-8">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-accent" />
          Hydraulic Output Parameters
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card rounded-lg">
            <h5 className="font-medium text-foreground mb-2">For Pipes</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Flow rate (Q)</li>
              <li>• Velocity (V)</li>
              <li>• Flow depth (d)</li>
              <li>• d/D ratio</li>
              <li>• Capacity utilization</li>
            </ul>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <h5 className="font-medium text-foreground mb-2">For Nodes</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Hydraulic grade (HGL)</li>
              <li>• Ground elevation</li>
              <li>• Depth to water surface</li>
              <li>• Surcharge status</li>
              <li>• Overflow potential</li>
            </ul>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <h5 className="font-medium text-foreground mb-2">For Pumps</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Pumping rate</li>
              <li>• On/off status</li>
              <li>• Wet well level</li>
              <li>• Runtime cycles</li>
              <li>• Energy consumption</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Equations */}
      <div className="p-6 bg-gradient-primary/5 border border-primary/10 rounded-xl">
        <h4 className="font-semibold text-foreground mb-4">Core Hydraulic Equations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-card rounded-lg">
            <p className="font-medium text-foreground mb-2">Manning's Equation</p>
            <p className="text-muted-foreground mb-1 font-mono text-xs">Q = (A × R^(2/3) × S^(1/2)) / n</p>
            <p className="text-muted-foreground text-xs">Relates flow rate to pipe geometry and roughness</p>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <p className="font-medium text-foreground mb-2">Continuity Equation</p>
            <p className="text-muted-foreground mb-1 font-mono text-xs">Q = V × A</p>
            <p className="text-muted-foreground text-xs">Conservation of mass for flow calculations</p>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <p className="font-medium text-foreground mb-2">Energy Equation</p>
            <p className="text-muted-foreground mb-1 font-mono text-xs">E = z + d + V²/(2g)</p>
            <p className="text-muted-foreground text-xs">Total energy at any point in the system</p>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <p className="font-medium text-foreground mb-2">Capacity Ratio</p>
            <p className="text-muted-foreground mb-1 font-mono text-xs">d/D = depth / diameter</p>
            <p className="text-muted-foreground text-xs">Indicator of pipe utilization and available capacity</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HydraulicProcess;
