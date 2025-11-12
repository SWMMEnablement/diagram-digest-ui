import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line, Sphere, Cylinder } from "@react-three/drei";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import * as THREE from "three";
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

const Pipe = ({ data, manholes, onClick, isSelected }: { 
  data: PipeData; 
  manholes: ManholeData[]; 
  onClick: () => void;
  isSelected: boolean;
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
        color={isSelected ? "#60a5fa" : "#0ea5e9"}
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

  const selectedManholeData = manholes.find((m) => m.id === selectedManhole);
  const selectedPipeData = pipes.find((p) => p.id === selectedPipe);

  return (
    <Card className="p-6 shadow-medium border-primary/10">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-foreground mb-2">3D Network Visualization</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Interactive 3D view showing elevation changes, pipe depths, and water surface profiles.
          Click and drag to rotate, scroll to zoom, right-click to pan.
        </p>
        
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
            velocity={1.5}
            manningN={0.013}
          />
        </div>
      )}
    </Card>
  );
};

export default Network3D;
