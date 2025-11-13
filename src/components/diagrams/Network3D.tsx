import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line, Sphere, Cylinder } from "@react-three/drei";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { CloudRain, AlertTriangle, Play, Pause, RotateCcw } from "lucide-react";
import CrossSectionView from "./CrossSectionView";

interface ManholeData {
  id: string;
  position: [number, number, number];
  elevation: number;
  depth: number;
  label: string;
}

interface PipeData {
  id: string;
  from: string;
  to: string;
  diameter: number;
  slope: number;
}

const manholes: ManholeData[] = [
  { id: "MH-1", position: [-8, 10, 0], elevation: 100, depth: 3, label: "MH-1\nElev: 100m" },
  { id: "MH-2", position: [-4, 8, 2], elevation: 95, depth: 3.5, label: "MH-2\nElev: 95m" },
  { id: "MH-3", position: [0, 6, -2], elevation: 90, depth: 4, label: "MH-3\nElev: 90m" },
  { id: "MH-4", position: [4, 4, 1], elevation: 85, depth: 4.5, label: "MH-4\nElev: 85m" },
  { id: "MH-5", position: [8, 2, 0], elevation: 80, depth: 5, label: "MH-5\nElev: 80m" },
];

const pipes: PipeData[] = [
  { id: "P-1", from: "MH-1", to: "MH-2", diameter: 0.3, slope: 0.5 },
  { id: "P-2", from: "MH-2", to: "MH-3", diameter: 0.35, slope: 0.5 },
  { id: "P-3", from: "MH-3", to: "MH-4", diameter: 0.4, slope: 0.5 },
  { id: "P-4", from: "MH-4", to: "MH-5", diameter: 0.45, slope: 0.5 },
];

// Design Storm Patterns based on return periods
interface StormPattern {
  id: string;
  name: string;
  description: string;
  returnPeriod: string;
  peakIntensity: number; // mm/hr
  duration: number; // seconds
  timeToPeak: number; // fraction of duration (0-1)
  recessionFactor: number; // controls falling limb steepness
  color: string;
}

const stormPatterns: StormPattern[] = [
  {
    id: "2-year",
    name: "2-Year Storm",
    description: "Minor flooding event",
    returnPeriod: "2-year (50% annual probability)",
    peakIntensity: 5,
    duration: 60,
    timeToPeak: 0.33,
    recessionFactor: 1.5,
    color: "#3b82f6"
  },
  {
    id: "5-year",
    name: "5-Year Storm", 
    description: "Moderate flooding event",
    returnPeriod: "5-year (20% annual probability)",
    peakIntensity: 7.5,
    duration: 75,
    timeToPeak: 0.30,
    recessionFactor: 1.8,
    color: "#f59e0b"
  },
  {
    id: "10-year",
    name: "10-Year Storm",
    description: "Significant flooding event",
    returnPeriod: "10-year (10% annual probability)",
    peakIntensity: 10,
    duration: 90,
    timeToPeak: 0.28,
    recessionFactor: 2.0,
    color: "#ef4444"
  },
  {
    id: "25-year",
    name: "25-Year Storm",
    description: "Major flooding event",
    returnPeriod: "25-year (4% annual probability)",
    peakIntensity: 13,
    duration: 100,
    timeToPeak: 0.25,
    recessionFactor: 2.2,
    color: "#dc2626"
  },
  {
    id: "100-year",
    name: "100-Year Storm",
    description: "Extreme flooding event",
    returnPeriod: "100-year (1% annual probability)",
    peakIntensity: 18,
    duration: 120,
    timeToPeak: 0.22,
    recessionFactor: 2.5,
    color: "#991b1b"
  },
  {
    id: "custom",
    name: "Custom Storm",
    description: "User-defined parameters",
    returnPeriod: "User-defined",
    peakIntensity: 8,
    duration: 60,
    timeToPeak: 0.33,
    recessionFactor: 1.5,
    color: "#06b6d4"
  }
];

// Calculate velocity using Manning's equation
const calculateVelocity = (diameter: number, slope: number, flowRate: number, manningN: number = 0.013): number => {
  // Q = (1/n) * A * R^(2/3) * S^(1/2)
  // V = Q / A
  const radius = diameter / 2;
  const area = Math.PI * radius * radius;
  
  if (flowRate === 0) return 0;
  
  // Simplified: assume pipe is half full for flow calculations
  const hydraulicRadius = radius / 2;
  const velocity = (1 / manningN) * Math.pow(hydraulicRadius, 2/3) * Math.pow(slope / 100, 0.5);
  
  // Scale by flow rate factor
  return velocity * (flowRate / 5); // Base velocity at flow rate of 5
};

// Calculate pipe capacity using Manning's equation (full pipe flow)
const calculatePipeCapacity = (diameter: number, slope: number, manningN: number = 0.013): number => {
  const radius = diameter / 2;
  const area = Math.PI * radius * radius;
  const hydraulicRadius = radius / 2; // Assuming half-full as design capacity
  
  // Q = (1/n) * A * R^(2/3) * S^(1/2)
  const capacity = (1 / manningN) * area * Math.pow(hydraulicRadius, 2/3) * Math.pow(slope / 100, 0.5);
  return capacity * 5; // Scale to match our flow rate units
};

// Storm event rainfall intensity patterns with configurable hydrograph shape
const getStormIntensity = (
  timeElapsed: number, 
  stormDuration: number, 
  peakIntensity: number,
  timeToPeak: number = 0.33,
  recessionFactor: number = 1.5
): number => {
  // Modified triangular/curved hydrograph pattern
  const peakTime = stormDuration * timeToPeak;
  
  if (timeElapsed < peakTime) {
    // Rising limb - can be curved for more realistic pattern
    const progress = timeElapsed / peakTime;
    return Math.pow(progress, 0.8) * peakIntensity; // Slight curve
  } else if (timeElapsed < stormDuration) {
    // Falling limb - steeper for larger storms (higher recession factor)
    const progress = (timeElapsed - peakTime) / (stormDuration - peakTime);
    return peakIntensity * Math.pow(1 - progress, recessionFactor);
  }
  
  return 0;
};

// Convert rainfall intensity to flow rate (simplified rational method)
const rainfallToFlowRate = (intensity: number, catchmentArea: number = 1.0, runoffCoeff: number = 0.7): number => {
  // Q = C * I * A (where C is runoff coefficient, I is intensity, A is area)
  return runoffCoeff * intensity * catchmentArea;
};

interface FlowParticle {
  id: number;
  progress: number;
  pipeId: string;
}

const Manhole = ({ data, onClick, isSelected }: { data: ManholeData; onClick: () => void; isSelected: boolean }) => {
  return (
    <group position={data.position}>
      {/* Manhole cylinder */}
      <Cylinder
        args={[0.5, 0.5, data.depth, 16]}
        position={[0, -data.depth / 2, 0]}
        onClick={onClick}
      >
        <meshStandardMaterial color={isSelected ? "#3b82f6" : "#64748b"} />
      </Cylinder>
      
      {/* Ground level indicator */}
      <Sphere args={[0.3, 16, 16]} onClick={onClick}>
        <meshStandardMaterial color={isSelected ? "#60a5fa" : "#94a3b8"} emissive={isSelected ? "#3b82f6" : "#000000"} emissiveIntensity={0.3} />
      </Sphere>
      
      {/* Label */}
      <Text
        position={[0, 1, 0]}
        fontSize={0.4}
        color="#f8fafc"
        anchorX="center"
        anchorY="middle"
      >
        {data.label}
      </Text>
    </group>
  );
};

const FlowParticles = ({ 
  pipe, 
  manholes, 
  flowRate, 
  particleCount = 5 
}: { 
  pipe: PipeData; 
  manholes: ManholeData[]; 
  flowRate: number;
  particleCount?: number;
}) => {
  const particles = useRef<FlowParticle[]>([]);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  
  // Initialize particles
  useMemo(() => {
    particles.current = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      progress: i / particleCount,
      pipeId: pipe.id,
    }));
  }, [particleCount, pipe.id]);

  const fromManhole = manholes.find((m) => m.id === pipe.from);
  const toManhole = manholes.find((m) => m.id === pipe.to);

  useFrame((state, delta) => {
    if (!fromManhole || !toManhole || flowRate === 0) return;

    const velocity = calculateVelocity(pipe.diameter, pipe.slope, flowRate);
    const fromPos = new THREE.Vector3(...fromManhole.position);
    const toPos = new THREE.Vector3(...toManhole.position);
    fromPos.y -= fromManhole.depth;
    toPos.y -= toManhole.depth;
    
    const distance = fromPos.distanceTo(toPos);
    const speed = (velocity * delta) / distance;

    particles.current.forEach((particle, idx) => {
      particle.progress += speed;
      if (particle.progress > 1) {
        particle.progress = 0;
      }

      const mesh = meshRefs.current[idx];
      if (mesh) {
        mesh.position.lerpVectors(fromPos, toPos, particle.progress);
        // Add slight wobble for realism
        mesh.position.y += Math.sin(particle.progress * Math.PI * 4) * 0.05;
      }
    });
  });

  if (!fromManhole || !toManhole || flowRate === 0) return null;

  return (
    <group>
      {particles.current.map((particle, idx) => (
        <mesh
          key={particle.id}
          ref={(el) => {
            if (el) meshRefs.current[idx] = el;
          }}
        >
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial 
            color="#06b6d4" 
            emissive="#06b6d4" 
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

const Pipe = ({ data, manholes, onClick, isSelected, flowRate, showCapacityWarning }: { 
  data: PipeData; 
  manholes: ManholeData[]; 
  onClick: () => void;
  isSelected: boolean;
  flowRate: number;
  showCapacityWarning: boolean;
}) => {
  const fromManhole = manholes.find((m) => m.id === data.from);
  const toManhole = manholes.find((m) => m.id === data.to);

  if (!fromManhole || !toManhole) return null;

  const fromPos = new THREE.Vector3(...fromManhole.position);
  const toPos = new THREE.Vector3(...toManhole.position);
  
  // Adjust positions to be at the bottom of manholes
  fromPos.y -= fromManhole.depth;
  toPos.y -= toManhole.depth;

  const points = [fromPos, toPos];
  
  // Calculate pipe direction and length for clickable cylinder
  const direction = new THREE.Vector3().subVectors(toPos, fromPos);
  const length = direction.length();
  const midpoint = new THREE.Vector3().addVectors(fromPos, toPos).multiplyScalar(0.5);

  const velocity = calculateVelocity(data.diameter, data.slope, flowRate);
  const capacity = calculatePipeCapacity(data.diameter, data.slope);
  const isOverCapacity = flowRate > capacity;

  return (
    <group>
      {/* Invisible clickable cylinder */}
      <mesh
        position={[midpoint.x, midpoint.y, midpoint.z]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <cylinderGeometry args={[0.3, 0.3, length, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      {/* Pipe line */}
      <Line
        points={points}
        color={isOverCapacity && showCapacityWarning ? "#ef4444" : (isSelected ? "#60a5fa" : "#0ea5e9")}
        lineWidth={isSelected ? 5 : 3}
      />
      
      {/* Water surface profile (slightly above pipe) */}
      <Line
        points={[
          new THREE.Vector3(fromPos.x, fromPos.y + 0.5, fromPos.z),
          new THREE.Vector3(toPos.x, toPos.y + 0.5, toPos.z),
        ]}
        color="#06b6d4"
        lineWidth={2}
        dashed
        dashScale={2}
        dashSize={0.3}
        gapSize={0.2}
      />
      
      {/* Flow particles */}
      <FlowParticles pipe={data} manholes={manholes} flowRate={flowRate} />
      
      {/* Velocity indicator at midpoint */}
      {flowRate > 0 && (
        <Text
          position={[midpoint.x, midpoint.y + 1, midpoint.z]}
          fontSize={0.3}
          color={isOverCapacity && showCapacityWarning ? "#ef4444" : "#06b6d4"}
          anchorX="center"
          anchorY="middle"
        >
          {velocity.toFixed(2)} m/s
        </Text>
      )}
      
      {/* Capacity warning indicator */}
      {isOverCapacity && showCapacityWarning && (
        <Text
          position={[midpoint.x, midpoint.y + 1.5, midpoint.z]}
          fontSize={0.25}
          color="#ef4444"
          anchorX="center"
          anchorY="middle"
        >
          ⚠ OVER CAPACITY
        </Text>
      )}
    </group>
  );
};

const GroundPlane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color="#1e293b" opacity={0.3} transparent />
    </mesh>
  );
};

const Network3D = () => {
  const [selectedManhole, setSelectedManhole] = useState<string | null>(null);
  const [selectedPipe, setSelectedPipe] = useState<string | null>(null);
  const [flowRate, setFlowRate] = useState<number>(3);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  
  // Storm simulation state
  const [isStormActive, setIsStormActive] = useState<boolean>(false);
  const [selectedStormPattern, setSelectedStormPattern] = useState<string>("10-year");
  const [stormDuration, setStormDuration] = useState<number>(60); // seconds
  const [peakRainfall, setPeakRainfall] = useState<number>(8); // mm/hr -> flow units
  const [stormTimeElapsed, setStormTimeElapsed] = useState<number>(0);
  const [peakFlowReached, setPeakFlowReached] = useState<number>(0);
  
  const currentStormPattern = useMemo(() => {
    return stormPatterns.find(p => p.id === selectedStormPattern) || stormPatterns[2];
  }, [selectedStormPattern]);

  const selectedManholeData = manholes.find((m) => m.id === selectedManhole);
  const selectedPipeData = pipes.find((p) => p.id === selectedPipe);
  
  // Calculate current rainfall intensity and flow based on storm
  const currentRainfallIntensity = useMemo(() => {
    if (!isStormActive) return 0;
    
    // Use custom values if custom pattern, otherwise use pattern defaults
    const intensity = selectedStormPattern === "custom" 
      ? peakRainfall 
      : currentStormPattern.peakIntensity;
    const duration = selectedStormPattern === "custom"
      ? stormDuration
      : currentStormPattern.duration;
    
    return getStormIntensity(
      stormTimeElapsed, 
      duration, 
      intensity,
      currentStormPattern.timeToPeak,
      currentStormPattern.recessionFactor
    );
  }, [isStormActive, stormTimeElapsed, stormDuration, peakRainfall, selectedStormPattern, currentStormPattern]);
  
  const currentStormFlow = useMemo(() => {
    return rainfallToFlowRate(currentRainfallIntensity);
  }, [currentRainfallIntensity]);
  
  const totalFlow = useMemo(() => {
    if (!isAnimating) return 0;
    if (isStormActive) return currentStormFlow;
    return flowRate;
  }, [flowRate, isAnimating, isStormActive, currentStormFlow]);
  
  // Check for capacity warnings
  const capacityWarnings = useMemo(() => {
    return pipes.filter(pipe => {
      const capacity = calculatePipeCapacity(pipe.diameter, pipe.slope);
      return totalFlow > capacity;
    });
  }, [totalFlow]);
  
  // Update storm time
  useEffect(() => {
    if (!isStormActive || !isAnimating) return;
    
    const interval = setInterval(() => {
      setStormTimeElapsed(prev => {
        const next = prev + 0.1; // 100ms increments
        
        // Use pattern-specific duration
        const duration = selectedStormPattern === "custom"
          ? stormDuration
          : currentStormPattern.duration;
        
        // Track peak flow
        const intensity = selectedStormPattern === "custom"
          ? getStormIntensity(next, stormDuration, peakRainfall, currentStormPattern.timeToPeak, currentStormPattern.recessionFactor)
          : getStormIntensity(next, currentStormPattern.duration, currentStormPattern.peakIntensity, currentStormPattern.timeToPeak, currentStormPattern.recessionFactor);
        const flow = rainfallToFlowRate(intensity);
        setPeakFlowReached(prevPeak => Math.max(prevPeak, flow));
        
        // Stop storm when duration reached
        if (next >= duration) {
          setIsStormActive(false);
          return 0;
        }
        return next;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [isStormActive, isAnimating, stormDuration, peakRainfall, selectedStormPattern, currentStormPattern]);
  
  const startStorm = () => {
    setStormTimeElapsed(0);
    setPeakFlowReached(0);
    setIsStormActive(true);
    setIsAnimating(true);
    
    // If not custom, update display values to match pattern
    if (selectedStormPattern !== "custom") {
      setStormDuration(currentStormPattern.duration);
      setPeakRainfall(currentStormPattern.peakIntensity);
    }
  };
  
  const stopStorm = () => {
    setIsStormActive(false);
    setStormTimeElapsed(0);
  };
  
  const resetStorm = () => {
    setIsStormActive(false);
    setStormTimeElapsed(0);
    setPeakFlowReached(0);
  };

  return (
    <Card className="p-6 shadow-medium border-primary/10">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-foreground mb-2">3D Network Visualization with Flow Animation</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Interactive 3D view showing elevation changes, pipe depths, water surface profiles, and real-time flow animation.
          Click and drag to rotate, scroll to zoom, right-click to pan.
        </p>
        
        {/* Storm Event Simulation */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-4 mb-4 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-blue-500" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Design Storm Event</h4>
                <p className="text-xs text-muted-foreground">Select storm pattern or customize parameters</p>
              </div>
            </div>
            <div className="flex gap-2">
              {!isStormActive ? (
                <Button size="sm" onClick={startStorm} className="gap-1">
                  <Play className="w-3 h-3" /> Start Storm
                </Button>
              ) : (
                <Button size="sm" variant="secondary" onClick={stopStorm} className="gap-1">
                  <Pause className="w-3 h-3" /> Stop
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={resetStorm}>
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          {/* Storm Pattern Selection */}
          <div className="mb-4 space-y-2">
            <label className="text-sm font-medium text-foreground">Storm Pattern</label>
            <Select
              value={selectedStormPattern}
              onValueChange={(value) => {
                setSelectedStormPattern(value);
                const pattern = stormPatterns.find(p => p.id === value);
                if (pattern && value !== "custom") {
                  setStormDuration(pattern.duration);
                  setPeakRainfall(pattern.peakIntensity);
                }
              }}
              disabled={isStormActive}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {stormPatterns.map((pattern) => (
                  <SelectItem key={pattern.id} value={pattern.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: pattern.color }}
                      />
                      <div>
                        <div className="font-medium">{pattern.name}</div>
                        <div className="text-xs text-muted-foreground">{pattern.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedStormPattern !== "custom" && (
              <div className="bg-background/50 rounded p-2 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Return Period:</span>
                  <span className="text-foreground font-medium">{currentStormPattern.returnPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peak Intensity:</span>
                  <span className="text-foreground font-medium">{currentStormPattern.peakIntensity} mm/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="text-foreground font-medium">{currentStormPattern.duration}s</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Custom Storm Parameters */}
          {selectedStormPattern === "custom" && (
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-28">Duration:</span>
                <Slider
                  value={[stormDuration]}
                  onValueChange={(value) => setStormDuration(value[0])}
                  min={10}
                  max={180}
                  step={10}
                  disabled={isStormActive}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-foreground w-16 text-right">{stormDuration}s</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-28">Peak Rainfall:</span>
                <Slider
                  value={[peakRainfall]}
                  onValueChange={(value) => setPeakRainfall(value[0])}
                  min={2}
                  max={20}
                  step={0.5}
                  disabled={isStormActive}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-foreground w-16 text-right">{peakRainfall} mm/h</span>
              </div>
            </div>
          )}
          
          {/* Storm Progress */}
          <div className="space-y-3">
            
            {isStormActive && (
              <>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="bg-background/50 rounded p-2">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="ml-1 text-foreground font-medium">{stormTimeElapsed.toFixed(1)}s</span>
                  </div>
                  <div className="bg-background/50 rounded p-2">
                    <span className="text-muted-foreground">Rainfall:</span>
                    <span className="ml-1 text-foreground font-medium">{currentRainfallIntensity.toFixed(1)} mm/h</span>
                  </div>
                  <div className="bg-background/50 rounded p-2">
                    <span className="text-muted-foreground">Flow:</span>
                    <span className="ml-1 text-foreground font-medium">{currentStormFlow.toFixed(1)} m³/s</span>
                  </div>
                  <div className="bg-background/50 rounded p-2">
                    <span className="text-muted-foreground">Peak Flow:</span>
                    <span className="ml-1 text-foreground font-medium">{peakFlowReached.toFixed(1)} m³/s</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{((stormTimeElapsed / (selectedStormPattern === "custom" ? stormDuration : currentStormPattern.duration)) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-100"
                      style={{ 
                        width: `${(stormTimeElapsed / (selectedStormPattern === "custom" ? stormDuration : currentStormPattern.duration)) * 100}%`,
                        backgroundColor: currentStormPattern.color
                      }}
                    />
                  </div>
                </div>
              </>
            )}
            
          </div>
        </div>
        
        {/* Capacity Warnings */}
        {capacityWarnings.length > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Capacity Warning:</strong> {capacityWarnings.length} pipe(s) exceeding capacity - {capacityWarnings.map(p => p.id).join(", ")}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Manual Flow Controls */}
        {!isStormActive && (
          <div className="bg-muted/50 rounded-lg p-4 mb-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Manual Flow Control</h4>
                <p className="text-xs text-muted-foreground">Adjust to see real-time hydraulic changes</p>
              </div>
              <Badge 
                variant={isAnimating ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setIsAnimating(!isAnimating)}
              >
                {isAnimating ? "Flowing" : "Paused"}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-20">Flow Rate:</span>
                <Slider
                  value={[flowRate]}
                  onValueChange={(value) => setFlowRate(value[0])}
                  min={0}
                  max={10}
                  step={0.5}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-foreground w-20 text-right">{flowRate.toFixed(1)} m³/s</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                <div className="bg-background/50 rounded p-2">
                  <span className="text-muted-foreground">Avg Velocity:</span>
                  <span className="ml-1 text-foreground font-medium">
                    {pipes.length > 0 
                      ? (pipes.reduce((sum, p) => sum + calculateVelocity(p.diameter, p.slope, totalFlow), 0) / pipes.length).toFixed(2)
                      : "0.00"} m/s
                  </span>
                </div>
                <div className="bg-background/50 rounded p-2">
                  <span className="text-muted-foreground">Total Flow:</span>
                  <span className="ml-1 text-foreground font-medium">{totalFlow.toFixed(1)} m³/s</span>
                </div>
                <div className="bg-background/50 rounded p-2">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="ml-1 text-foreground font-medium">{totalFlow > 0 ? "Active" : "Idle"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-primary/10">
            <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
            Manholes
          </Badge>
          <Badge variant="outline" className="bg-secondary/10">
            <div className="w-3 h-3 rounded-full bg-[#0ea5e9] mr-2"></div>
            Pipes
          </Badge>
          <Badge variant="outline" className="bg-accent/10">
            <div className="w-3 h-3 rounded-full bg-[#06b6d4] mr-2"></div>
            Water Surface
          </Badge>
        </div>

        {selectedManholeData && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-foreground mb-2">{selectedManholeData.id}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Elevation:</span>
                <span className="ml-2 text-foreground font-medium">{selectedManholeData.elevation}m</span>
              </div>
              <div>
                <span className="text-muted-foreground">Depth:</span>
                <span className="ml-2 text-foreground font-medium">{selectedManholeData.depth}m</span>
              </div>
              <div>
                <span className="text-muted-foreground">Invert:</span>
                <span className="ml-2 text-foreground font-medium">{(selectedManholeData.elevation - selectedManholeData.depth).toFixed(1)}m</span>
              </div>
            </div>
          </div>
        )}
        
        {selectedPipeData && (
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-foreground mb-2">{selectedPipeData.id}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">From:</span>
                <span className="ml-2 text-foreground font-medium">{selectedPipeData.from}</span>
              </div>
              <div>
                <span className="text-muted-foreground">To:</span>
                <span className="ml-2 text-foreground font-medium">{selectedPipeData.to}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Diameter:</span>
                <span className="ml-2 text-foreground font-medium">{selectedPipeData.diameter}m</span>
              </div>
              <div>
                <span className="text-muted-foreground">Slope:</span>
                <span className="ml-2 text-foreground font-medium">{selectedPipeData.slope}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-[600px] bg-gradient-to-b from-background to-muted/20 rounded-lg overflow-hidden border border-border">
        <Canvas
          camera={{ position: [15, 15, 15], fov: 50 }}
          shadows
        >
          <color attach="background" args={["#0f172a"]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, 10, -10]} intensity={0.5} color="#3b82f6" />
          
          {/* Scene */}
          <GroundPlane />
          
          {manholes.map((manhole) => (
            <Manhole
              key={manhole.id}
              data={manhole}
              onClick={() => setSelectedManhole(manhole.id)}
              isSelected={selectedManhole === manhole.id}
            />
          ))}
          
          {pipes.map((pipe) => (
            <Pipe 
              key={pipe.id} 
              data={pipe} 
              manholes={manholes}
              onClick={() => {
                setSelectedPipe(pipe.id);
                setSelectedManhole(null);
              }}
              isSelected={selectedPipe === pipe.id}
              flowRate={totalFlow}
              showCapacityWarning={capacityWarnings.some(w => w.id === pipe.id)}
            />
          ))}
          
          {/* Grid helper */}
          <gridHelper args={[30, 30, "#334155", "#1e293b"]} position={[0, -0.5, 0]} />
          
          {/* Controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={5}
            maxDistance={50}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded-lg p-3 border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-1">Total Network Length</h4>
          <p className="text-lg font-bold text-primary">
            {pipes.reduce((sum, pipe) => {
              const from = manholes.find(m => m.id === pipe.from);
              const to = manholes.find(m => m.id === pipe.to);
              if (!from || !to) return sum;
              const dist = Math.sqrt(
                Math.pow(to.position[0] - from.position[0], 2) +
                Math.pow(to.position[2] - from.position[2], 2)
              );
              return sum + dist;
            }, 0).toFixed(1)}m
          </p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3 border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-1">Elevation Drop</h4>
          <p className="text-lg font-bold text-secondary">
            {manholes[0].elevation - manholes[manholes.length - 1].elevation}m
          </p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3 border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-1">Average Slope</h4>
          <p className="text-lg font-bold text-accent">
            {(pipes.reduce((sum, p) => sum + p.slope, 0) / pipes.length).toFixed(2)}%
          </p>
        </div>
      </div>
      
      {selectedPipeData && (
        <div className="mt-6">
          <CrossSectionView
            pipeId={selectedPipeData.id}
            diameter={selectedPipeData.diameter}
            slope={selectedPipeData.slope}
            flowDepth={0.65}
            velocity={calculateVelocity(selectedPipeData.diameter, selectedPipeData.slope, totalFlow)}
            manningN={0.013}
          />
        </div>
      )}
    </Card>
  );
};

export default Network3D;
