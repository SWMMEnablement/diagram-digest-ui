import { Card } from "@/components/ui/card";
import { Database, FileSpreadsheet, Map, ArrowLeftRight } from "lucide-react";

const DataIntegration = () => {
  return (
    <Card className="p-8 shadow-medium">
      <h3 className="text-2xl font-bold mb-6 text-foreground">Data Integration</h3>
      <p className="text-muted-foreground mb-8">
        InfoSewer seamlessly integrates with various data sources and external systems, enabling efficient data exchange and collaboration.
      </p>

      {/* Integration Diagram */}
      <div className="relative mb-12">
        <div className="flex flex-col items-center gap-8">
          {/* Central InfoSewer Node */}
          <div className="bg-gradient-primary p-8 rounded-2xl shadow-medium max-w-md w-full">
            <h4 className="font-bold text-primary-foreground text-xl text-center mb-2">InfoSewer Core</h4>
            <p className="text-sm text-primary-foreground/90 text-center">Network Database & Model Engine</p>
          </div>

          {/* Bidirectional Arrows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {/* GIS Integration */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center">
                <ArrowLeftRight className="w-8 h-8 text-accent" />
              </div>
              <div className="bg-card border border-accent/20 p-6 rounded-xl shadow-soft w-full">
                <div className="flex items-center gap-3 mb-3">
                  <Map className="w-6 h-6 text-accent" />
                  <h5 className="font-bold text-foreground">GIS Systems</h5>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• ArcGIS integration</li>
                  <li>• Spatial data import/export</li>
                  <li>• Field mapping</li>
                  <li>• Coordinate systems</li>
                </ul>
              </div>
            </div>

            {/* Database Integration */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center">
                <ArrowLeftRight className="w-8 h-8 text-secondary" />
              </div>
              <div className="bg-card border border-secondary/20 p-6 rounded-xl shadow-soft w-full">
                <div className="flex items-center gap-3 mb-3">
                  <Database className="w-6 h-6 text-secondary" />
                  <h5 className="font-bold text-foreground">Databases</h5>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• ODBC connectivity</li>
                  <li>• Oracle & SQL Server</li>
                  <li>• Access databases</li>
                  <li>• dBASE format</li>
                </ul>
              </div>
            </div>

            {/* Office Integration */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center">
                <ArrowLeftRight className="w-8 h-8 text-primary" />
              </div>
              <div className="bg-card border border-primary/20 p-6 rounded-xl shadow-soft w-full">
                <div className="flex items-center gap-3 mb-3">
                  <FileSpreadsheet className="w-6 h-6 text-primary" />
                  <h5 className="font-bold text-foreground">Office Tools</h5>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Excel spreadsheets</li>
                  <li>• CSV data exchange</li>
                  <li>• Report exports</li>
                  <li>• Graph sharing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-muted/30 rounded-xl">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Import Capabilities
          </h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium text-foreground mb-1">Import Manager</p>
              <p className="text-muted-foreground">Wizard-based data import from external sources</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">GIS Gateway</p>
              <p className="text-muted-foreground">Direct shapefile and feature class integration</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">ODBC Exchange</p>
              <p className="text-muted-foreground">Database connectivity for facility management systems</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-muted/30 rounded-xl">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            Export Capabilities
          </h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium text-foreground mb-1">Model Results</p>
              <p className="text-muted-foreground">Export simulation results to spreadsheets and databases</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Network Data</p>
              <p className="text-muted-foreground">Share network topology and attributes with GIS</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Reports & Graphs</p>
              <p className="text-muted-foreground">Copy/paste to Word, PowerPoint, and other applications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mt-8 p-6 bg-gradient-primary/5 border border-primary/10 rounded-xl">
        <h4 className="font-semibold text-foreground mb-4">Integration Benefits</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-foreground mb-1">Eliminate Duplicate Entry</p>
            <p className="text-muted-foreground">Import existing data directly from facility databases</p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Maintain Data Consistency</p>
            <p className="text-muted-foreground">Synchronize with authoritative GIS data sources</p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Enhance Collaboration</p>
            <p className="text-muted-foreground">Share results with stakeholders in familiar formats</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DataIntegration;
