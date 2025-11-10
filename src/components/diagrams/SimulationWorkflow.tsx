import { Card } from "@/components/ui/card";
import { Play, Clock, BarChart3, TrendingUp } from "lucide-react";

const SimulationWorkflow = () => {
  return (
    <Card className="p-8 shadow-medium">
      <h3 className="text-2xl font-bold mb-6 text-foreground">Simulation Workflow</h3>
      <p className="text-muted-foreground mb-8">
        InfoSewer provides two primary simulation modes for analyzing wastewater collection systems under different operational scenarios.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Steady State Analysis */}
        <div className="space-y-4">
          <div className="bg-gradient-primary p-6 rounded-xl shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <Play className="w-6 h-6 text-primary-foreground" />
              <h4 className="font-bold text-primary-foreground text-lg">Steady-State Analysis</h4>
            </div>
            <p className="text-sm text-primary-foreground/90">
              Single-point-in-time hydraulic snapshot of the system
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Define Network</h5>
                <p className="text-sm text-muted-foreground">Configure pipes, manholes, and system properties</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Set Flow Loads</h5>
                <p className="text-sm text-muted-foreground">Apply constant flow rates at nodes</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Run Simulation</h5>
                <p className="text-sm text-muted-foreground">Calculate hydraulic conditions instantaneously</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-primary">4</span>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Analyze Results</h5>
                <p className="text-sm text-muted-foreground">Review flow, depth, and velocity profiles</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
            <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Best For:
            </h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Peak flow condition analysis</li>
              <li>• System design validation</li>
              <li>• Quick capacity assessments</li>
            </ul>
          </div>
        </div>

        {/* Extended Period Simulation */}
        <div className="space-y-4">
          <div className="bg-secondary p-6 rounded-xl shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-secondary-foreground" />
              <h4 className="font-bold text-secondary-foreground text-lg">Extended Period Simulation</h4>
            </div>
            <p className="text-sm text-secondary-foreground/90">
              Time-varying analysis with flow routing and attenuation
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-secondary">1</span>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Configure Time Parameters</h5>
                <p className="text-sm text-muted-foreground">Set duration, time steps, and initial conditions</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-secondary">2</span>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Apply Diurnal Patterns</h5>
                <p className="text-sm text-muted-foreground">Define time-varying flow patterns</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-secondary">3</span>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Execute Time-Step Simulation</h5>
                <p className="text-sm text-muted-foreground">Route and attenuate flows throughout system</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-secondary">4</span>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Review Time Series</h5>
                <p className="text-sm text-muted-foreground">Examine conditions over entire simulation period</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
            <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-secondary" />
              Best For:
            </h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Operational planning (24-hour cycles)</li>
              <li>• Storage volume analysis</li>
              <li>• Pump station cycling studies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Results Comparison */}
      <div className="p-6 bg-muted/30 rounded-xl">
        <h4 className="font-semibold text-foreground mb-4">Output Comparison</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-primary mb-2">Steady-State Outputs</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Single HGL profile</li>
              <li>• Peak flow velocities</li>
              <li>• Instantaneous depths</li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium text-secondary mb-2">Extended Period Outputs</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Time-series animations</li>
              <li>• Dynamic flow variations</li>
              <li>• Storage level fluctuations</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SimulationWorkflow;
