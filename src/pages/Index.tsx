import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Network, Database, LineChart, Settings, Layers } from "lucide-react";
import SystemArchitecture from "@/components/diagrams/SystemArchitecture";
import NetworkComponents from "@/components/diagrams/NetworkComponents";
import SimulationWorkflow from "@/components/diagrams/SimulationWorkflow";
import DataIntegration from "@/components/diagrams/DataIntegration";
import ProjectStructure from "@/components/diagrams/ProjectStructure";
import HydraulicProcess from "@/components/diagrams/HydraulicProcess";
import InteractiveNetwork from "@/components/diagrams/InteractiveNetwork";
import TechnicalGlossary from "@/components/diagrams/TechnicalGlossary";

const Index = () => {
  const [activeTab, setActiveTab] = useState("interactive");

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Droplets className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">InfoSewer</h1>
              <p className="text-sm text-muted-foreground">Wastewater Collection System Modeling</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Introduction Card */}
        <Card className="p-8 mb-8 shadow-medium border-primary/10">
          <h2 className="text-2xl font-bold mb-4 text-foreground">System Overview</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            InfoSewer is a comprehensive wastewater collection system modeling and management software application 
            that integrates with ArcGIS. It provides advanced hydraulic modeling capabilities for sanitary and storm 
            sewer systems, enabling engineers to design, analyze, and optimize collection networks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <Network className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Network Modeling</h3>
                <p className="text-sm text-muted-foreground">Build and analyze complex collection systems</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/5 border border-secondary/10">
              <LineChart className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Hydraulic Analysis</h3>
                <p className="text-sm text-muted-foreground">Steady-state and extended period simulations</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/5 border border-accent/10">
              <Database className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Data Integration</h3>
                <p className="text-sm text-muted-foreground">Seamless GIS and database connectivity</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Interactive Diagrams */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 w-full h-auto gap-2 bg-card/50 p-2">
            <TabsTrigger value="interactive" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Network className="w-4 h-4" />
              <span className="hidden sm:inline">Interactive</span>
            </TabsTrigger>
            <TabsTrigger value="glossary" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Glossary</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Architecture</span>
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Network className="w-4 h-4" />
              <span className="hidden sm:inline">Components</span>
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <LineChart className="w-4 h-4" />
              <span className="hidden sm:inline">Simulation</span>
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Integration</span>
            </TabsTrigger>
            <TabsTrigger value="structure" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Structure</span>
            </TabsTrigger>
            <TabsTrigger value="hydraulic" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Droplets className="w-4 h-4" />
              <span className="hidden sm:inline">Hydraulic</span>
            </TabsTrigger>
          </TabsList>

            <TabsContent value="interactive" className="mt-6">
              <InteractiveNetwork />
            </TabsContent>

            <TabsContent value="glossary" className="mt-6">
              <TechnicalGlossary />
            </TabsContent>

            <TabsContent value="architecture" className="mt-6">
              <SystemArchitecture />
            </TabsContent>

          <TabsContent value="components" className="mt-6">
            <NetworkComponents />
          </TabsContent>

          <TabsContent value="simulation" className="mt-6">
            <SimulationWorkflow />
          </TabsContent>

          <TabsContent value="integration" className="mt-6">
            <DataIntegration />
          </TabsContent>

          <TabsContent value="structure" className="mt-6">
            <ProjectStructure />
          </TabsContent>

          <TabsContent value="hydraulic" className="mt-6">
            <HydraulicProcess />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
