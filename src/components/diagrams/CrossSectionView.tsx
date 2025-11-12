import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CrossSectionViewProps {
  pipeId: string;
  diameter: number;
  slope: number;
  flowDepth?: number;
  velocity?: number;
  manningN?: number;
}

const CrossSectionView = ({ 
  pipeId, 
  diameter, 
  slope, 
  flowDepth = 0.6, 
  velocity = 1.2,
  manningN = 0.013 
}: CrossSectionViewProps) => {
  const radius = 150; // SVG radius
  const waterHeight = radius * 2 * flowDepth; // Water depth based on d/D ratio
  
  // Calculate water surface width using circle geometry
  const waterY = radius * 2 - waterHeight;
  const waterWidth = waterHeight < radius * 2 
    ? 2 * Math.sqrt(Math.pow(radius, 2) - Math.pow(radius - waterHeight, 2))
    : radius * 2;

  // Generate velocity profile points (parabolic)
  const generateVelocityProfile = () => {
    const points: string[] = [];
    const steps = 20;
    
    for (let i = 0; i <= steps; i++) {
      const theta = (Math.PI * i) / steps;
      const y = radius - radius * Math.cos(theta);
      
      if (y <= waterHeight) {
        const normalizedY = y / waterHeight;
        // Parabolic velocity profile (max at surface)
        const velocityFactor = Math.pow(normalizedY, 1/7); // 1/7 power law
        const x = radius + velocityFactor * 80; // Velocity magnitude
        points.push(`${x},${radius * 2 - y}`);
      }
    }
    
    return points.join(' ');
  };

  // Generate roughness elements
  const generateRoughnessElements = () => {
    const elements = [];
    const numElements = 24;
    const roughnessScale = manningN * 100; // Scale roughness for visualization
    
    for (let i = 0; i < numElements; i++) {
      const angle = (2 * Math.PI * i) / numElements;
      const x = radius + radius * Math.cos(angle);
      const y = radius + radius * Math.sin(angle);
      const height = 3 + roughnessScale * 2;
      
      elements.push(
        <line
          key={i}
          x1={x}
          y1={y}
          x2={x + Math.cos(angle) * height}
          y2={y + Math.sin(angle) * height}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1.5"
          opacity="0.6"
        />
      );
    }
    
    return elements;
  };

  const dDRatio = flowDepth;
  const hydraulicRadius = diameter * (1 - Math.sin(Math.PI * dDRatio) / (Math.PI * dDRatio));

  return (
    <Card className="p-6 shadow-medium border-primary/10">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-foreground mb-2">Pipe Cross-Section: {pipeId}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Detailed view showing flow characteristics, velocity profile, and pipe roughness
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-primary/10">
            Diameter: {diameter}m
          </Badge>
          <Badge variant="outline" className="bg-secondary/10">
            Slope: {slope}%
          </Badge>
          <Badge variant="outline" className="bg-accent/10">
            d/D: {(dDRatio * 100).toFixed(1)}%
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cross-Section Visualization */}
        <div className="bg-muted/20 rounded-lg p-4 border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Cross-Section View</h4>
          <svg viewBox="0 0 320 320" className="w-full h-auto">
            {/* Pipe outline */}
            <circle
              cx={radius}
              cy={radius}
              r={radius}
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth="3"
            />
            
            {/* Roughness elements */}
            {generateRoughnessElements()}
            
            {/* Water fill */}
            <path
              d={`
                M ${radius - waterWidth/2} ${radius * 2 - waterHeight}
                A ${radius} ${radius} 0 0 0 ${radius + waterWidth/2} ${radius * 2 - waterHeight}
                L ${radius + waterWidth/2} ${radius * 2}
                A ${radius} ${radius} 0 0 0 ${radius - waterWidth/2} ${radius * 2}
                Z
              `}
              fill="hsl(var(--primary))"
              opacity="0.4"
            />
            
            {/* Water surface */}
            <line
              x1={radius - waterWidth/2}
              y1={radius * 2 - waterHeight}
              x2={radius + waterWidth/2}
              y2={radius * 2 - waterHeight}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            
            {/* Center line */}
            <line
              x1={radius}
              y1={0}
              x2={radius}
              y2={radius * 2}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.5"
            />
            
            {/* Diameter annotation */}
            <line
              x1={0}
              y1={radius}
              x2={radius * 2}
              y2={radius}
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.3"
            />
            
            {/* Water depth annotation */}
            <line
              x1={5}
              y1={radius * 2}
              x2={5}
              y2={radius * 2 - waterHeight}
              stroke="hsl(var(--accent))"
              strokeWidth="2"
            />
            <text
              x={15}
              y={radius * 2 - waterHeight/2}
              fill="hsl(var(--foreground))"
              fontSize="12"
              fontWeight="600"
            >
              d
            </text>
          </svg>
        </div>

        {/* Velocity Profile */}
        <div className="bg-muted/20 rounded-lg p-4 border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Velocity Profile</h4>
          <svg viewBox="0 0 320 320" className="w-full h-auto">
            {/* Pipe outline (half) */}
            <path
              d={`M ${radius} ${0} A ${radius} ${radius} 0 0 1 ${radius} ${radius * 2}`}
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />
            
            {/* Water section */}
            <path
              d={`
                M ${radius} ${radius * 2}
                L ${radius} ${radius * 2 - waterHeight}
                A ${radius} ${radius} 0 0 1 ${radius} ${radius * 2}
              `}
              fill="hsl(var(--primary))"
              opacity="0.2"
            />
            
            {/* Velocity profile curve */}
            <polyline
              points={generateVelocityProfile()}
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="3"
            />
            
            {/* Velocity vectors */}
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((ratio, idx) => {
              const y = radius * 2 - waterHeight * ratio;
              const velocityFactor = Math.pow(ratio, 1/7);
              const x = radius + velocityFactor * 80;
              
              return (
                <g key={idx}>
                  <line
                    x1={radius}
                    y1={y}
                    x2={x}
                    y2={y}
                    stroke="hsl(var(--accent))"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />
                  <circle cx={x} cy={y} r="2" fill="hsl(var(--accent))" />
                </g>
              );
            })}
            
            {/* Max velocity label */}
            <text
              x={radius + 90}
              y={radius * 2 - waterHeight + 5}
              fill="hsl(var(--foreground))"
              fontSize="11"
              fontWeight="600"
            >
              V_max
            </text>
          </svg>
        </div>
      </div>

      {/* Flow Properties */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <h5 className="text-xs font-semibold text-muted-foreground mb-1">Flow Depth</h5>
          <p className="text-lg font-bold text-foreground">{(diameter * flowDepth).toFixed(2)}m</p>
        </div>
        
        <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3">
          <h5 className="text-xs font-semibold text-muted-foreground mb-1">Velocity</h5>
          <p className="text-lg font-bold text-foreground">{velocity.toFixed(2)}m/s</p>
        </div>
        
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
          <h5 className="text-xs font-semibold text-muted-foreground mb-1">Manning's n</h5>
          <p className="text-lg font-bold text-foreground">{manningN.toFixed(3)}</p>
        </div>
        
        <div className="bg-muted border border-border rounded-lg p-3">
          <h5 className="text-xs font-semibold text-muted-foreground mb-1">Hydraulic Radius</h5>
          <p className="text-lg font-bold text-foreground">{hydraulicRadius.toFixed(2)}m</p>
        </div>
      </div>

      {/* Manning's Roughness Info */}
      <div className="mt-4 bg-muted/30 border border-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-foreground mb-2">Manning's Roughness Coefficient</h4>
        <p className="text-xs text-muted-foreground">
          The roughness elements shown on the pipe wall represent the Manning's n value of {manningN.toFixed(3)}.
          Higher roughness values indicate more resistance to flow and create more turbulent boundary layers.
        </p>
      </div>
    </Card>
  );
};

export default CrossSectionView;
