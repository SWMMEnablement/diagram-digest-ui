import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const SystemArchitecture = () => {
  return (
    <Card className="p-8 shadow-medium">
      <h3 className="text-2xl font-bold mb-6 text-foreground">System Architecture</h3>
      <p className="text-muted-foreground mb-8">
        InfoSewer operates as an integrated extension within ArcGIS, providing a comprehensive platform for wastewater system modeling and analysis.
      </p>
      
      <div className="space-y-8">
        {/* Architecture Flow */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Layer 1: Interface */}
            <div className="space-y-4">
              <div className="bg-gradient-primary p-6 rounded-xl shadow-soft">
                <h4 className="font-bold text-primary-foreground mb-2">User Interface</h4>
                <p className="text-sm text-primary-foreground/90">ArcGIS Integration</p>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium">Interactive Map Display</p>
                <p>Visual editing tools</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>

            {/* Layer 2: Processing */}
            <div className="space-y-4">
              <div className="bg-secondary p-6 rounded-xl shadow-soft">
                <h4 className="font-bold text-secondary-foreground mb-2">Processing Engine</h4>
                <p className="text-sm text-secondary-foreground/90">Hydraulic Solver</p>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium">Model Simulation</p>
                <p>Calculations & Analysis</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-secondary" />
            </div>

            {/* Layer 3: Storage */}
            <div className="space-y-4">
              <div className="bg-accent p-6 rounded-xl shadow-soft">
                <h4 className="font-bold text-accent-foreground mb-2">Data Storage</h4>
                <p className="text-sm text-accent-foreground/90">Database & Files</p>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium">Network Data</p>
                <p>Results & Scenarios</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-border">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h5 className="font-semibold text-foreground mb-2">Master Planning</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Long-term capacity assessment</li>
              <li>• Growth scenario modeling</li>
              <li>• Infrastructure expansion planning</li>
            </ul>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <h5 className="font-semibold text-foreground mb-2">Flow Assessment</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Real-time flow monitoring</li>
              <li>• Peak flow analysis</li>
              <li>• Infiltration/inflow studies</li>
            </ul>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <h5 className="font-semibold text-foreground mb-2">System Design</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Pipe sizing optimization</li>
              <li>• Pump station design</li>
              <li>• Network configuration</li>
            </ul>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <h5 className="font-semibold text-foreground mb-2">Operational Studies</h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• System performance analysis</li>
              <li>• Maintenance scheduling</li>
              <li>• Operational optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SystemArchitecture;
