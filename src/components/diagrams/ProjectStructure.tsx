import { Card } from "@/components/ui/card";
import { Folder, FileText, FolderOpen, Database } from "lucide-react";

const ProjectStructure = () => {
  return (
    <Card className="p-8 shadow-medium">
      <h3 className="text-2xl font-bold mb-6 text-foreground">Project Structure</h3>
      <p className="text-muted-foreground mb-8">
        InfoSewer projects are organized into a logical file structure that separates network schematics, databases, and simulation results.
      </p>

      {/* File Structure Visualization */}
      <div className="mb-8 p-6 bg-muted/30 rounded-xl">
        <div className="space-y-4 font-mono text-sm">
          {/* Root Project Folder */}
          <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-primary/20">
            <Folder className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <span className="font-bold text-foreground">ProjectName/</span>
              <span className="text-muted-foreground ml-2">Root project directory</span>
            </div>
          </div>

          {/* MXD File */}
          <div className="ml-8 flex items-center gap-3 p-3 bg-card rounded-lg border border-accent/20">
            <FileText className="w-5 h-5 text-accent flex-shrink-0" />
            <div>
              <span className="text-foreground">ProjectName.MXD</span>
              <span className="text-muted-foreground ml-2">Network schematic (ArcMap document)</span>
            </div>
          </div>

          {/* IEDB Folder */}
          <div className="ml-8 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-secondary/20">
              <FolderOpen className="w-5 h-5 text-secondary flex-shrink-0" />
              <div>
                <span className="font-semibold text-foreground">ProjectName.IEDB/</span>
                <span className="text-muted-foreground ml-2">Database directory</span>
              </div>
            </div>
            
            <div className="ml-8 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Database className="w-4 h-4" />
                <span>Component attributes tables</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Database className="w-4 h-4" />
                <span>Model parameters</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Database className="w-4 h-4" />
                <span>Scenario configurations</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Folder className="w-4 h-4" />
                <span>CONTOURS/ - Contour graphics</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Folder className="w-4 h-4" />
                <span>ANNOTATION/ - Map labels</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Folder className="w-4 h-4" />
                <span>MAP/ - Network topology</span>
              </div>
            </div>
          </div>

          {/* OUT Folder */}
          <div className="ml-8 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-primary/20">
              <FolderOpen className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <span className="font-semibold text-foreground">ProjectName.OUT/</span>
                <span className="text-muted-foreground ml-2">Results directory (created after simulation)</span>
              </div>
            </div>
            
            <div className="ml-8 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>Binary simulation results</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>Output sources for each scenario</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>Time-series data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-card border border-border rounded-xl shadow-soft">
          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            Network Schematic
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Stored as ArcMap document (.MXD)</p>
            <p>• Contains map layers and symbology</p>
            <p>• Links to database tables</p>
            <p>• Preserves spatial reference system</p>
          </div>
        </div>

        <div className="p-6 bg-card border border-border rounded-xl shadow-soft">
          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-secondary" />
            Database Tables
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• dBASE format (.DBF files)</p>
            <p>• Component attribute records</p>
            <p>• Simulation options</p>
            <p>• User-defined fields supported</p>
          </div>
        </div>

        <div className="p-6 bg-card border border-border rounded-xl shadow-soft">
          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Folder className="w-5 h-5 text-primary" />
            Simulation Results
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Binary format for efficiency</p>
            <p>• One output source per simulation run</p>
            <p>• Organized by scenario</p>
            <p>• Created only after successful run</p>
          </div>
        </div>

        <div className="p-6 bg-card border border-border rounded-xl shadow-soft">
          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-accent" />
            Graphics & Annotation
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Contours stored as shapefiles</p>
            <p>• Map annotations preserved</p>
            <p>• Network topology cache</p>
            <p>• User-generated labels</p>
          </div>
        </div>
      </div>

      {/* Scenario Management */}
      <div className="p-6 bg-gradient-primary/5 border border-primary/10 rounded-xl">
        <h4 className="font-semibold text-foreground mb-4">Scenario Organization</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Each project can contain multiple scenarios, with separate subdirectories for scenario-specific data and results:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-card rounded-lg">
            <p className="font-medium text-foreground mb-1">Base Scenario</p>
            <p className="text-muted-foreground">Default network configuration</p>
          </div>
          <div className="p-3 bg-card rounded-lg">
            <p className="font-medium text-foreground mb-1">Custom Scenarios</p>
            <p className="text-muted-foreground">Alternative configurations & loadings</p>
          </div>
          <div className="p-3 bg-card rounded-lg">
            <p className="font-medium text-foreground mb-1">Result Comparison</p>
            <p className="text-muted-foreground">Side-by-side scenario analysis</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectStructure;
