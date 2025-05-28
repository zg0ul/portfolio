/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * CanvasRevealEffect - Main component that creates an animated dot matrix background effect
 *
 * This component creates a WebGL-powered animated background with dots that:
 * - Appear and disappear with random timing
 * - Have varying opacity levels for depth
 * - Support multiple colors
 * - Can animate in from the center (reveal effect)
 * - Are highly customizable via props
 */
export const CanvasRevealEffect = ({
  animationSpeed = 0.4, // How fast the reveal animation plays (0.1 = slow, 1.0 = fast)
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1], // Array of opacity values for random selection
  colors = [[0, 255, 255]], // RGB color arrays - supports 1-3 colors
  containerClassName, // Additional CSS classes for the container
  dotSize, // Size of individual dots in pixels
  showGradient = true, // Whether to show the gradient overlay
}: {
  /**
   * Animation speed multiplier
   * 0.1 - slower reveal animation
   * 1.0 - faster reveal animation
   */
  animationSpeed?: number;
  /** Array of opacity values (0-1) that dots will randomly choose from */
  opacities?: number[];
  /** Array of RGB color arrays [[r,g,b], [r,g,b], ...] - max 3 colors */
  colors?: number[][];
  /** Additional CSS classes to apply to the container */
  containerClassName?: string;
  /** Size of individual dots in pixels */
  dotSize?: number;
  /** Whether to show a gradient overlay on top of the dots */
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn("bg-background relative h-full w-full", containerClassName)}
    >
      {/* Main container for the dot matrix - ensures full coverage */}
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]} // Fallback to cyan if no colors provided
          dotSize={dotSize ?? 3} // Default dot size of 3 pixels
          opacities={
            opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1] // Default opacity distribution
          }
          shader={`
              // Custom GLSL code that creates the reveal animation from center outward
              float animation_speed_factor = ${animationSpeed.toFixed(1)};
              
              // Calculate distance from center for reveal effect
              float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
              
              // Step function creates the reveal wave - dots appear when time passes their offset
              opacity *= step(intro_offset, u_time * animation_speed_factor);
              
              // Clamp function creates a slight fade-in effect for smoother appearance
              opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            `}
          center={["x", "y"]} // Center the dots both horizontally and vertically
        />
      </div>

      {/* Optional gradient overlay that fades dots toward the bottom */}
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
      )}
    </div>
  );
};

/**
 * Props interface for the DotMatrix component
 */
interface DotMatrixProps {
  /** Array of RGB color arrays - each color is [r, g, b] where values are 0-255 */
  colors?: number[][];
  /** Array of opacity values (0-1) that dots will randomly select from */
  opacities?: number[];
  /** Size of each grid cell in pixels */
  totalSize?: number;
  /** Size of each dot within its grid cell */
  dotSize?: number;
  /** Custom GLSL shader code to inject for animations */
  shader?: string;
  /** Which axes to center the dot grid on ["x"], ["y"], or ["x", "y"] */
  center?: ("x" | "y")[];
}

/**
 * DotMatrix - Handles the data preparation and shader generation for the dot effect
 *
 * This component:
 * - Converts JavaScript color/opacity arrays into WebGL uniforms
 * - Distributes colors across 6 slots for variety even with fewer input colors
 * - Generates the fragment shader with custom animation logic
 * - Passes everything to the Shader component for rendering
 */
const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]], // Default to black dots if no colors provided
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14], // Default subtle opacity range
  totalSize = 4, // Default 4px grid cells
  dotSize = 2, // Default 2px dots (leaves 2px spacing)
  shader = "", // No custom animation by default
  center = ["x", "y"], // Center on both axes by default
}) => {
  // Prepare uniforms for the shader - converts JavaScript values to WebGL format
  const uniforms = React.useMemo(() => {
    // Color distribution logic: spread 1-3 input colors across 6 shader slots for variety
    let colorsArray = [
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0], // Default: all same color
    ];

    if (colors.length === 2) {
      // Two colors: alternate them across the 6 slots (3 of each)
      colorsArray = [
        colors[0],
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[1],
      ];
    } else if (colors.length === 3) {
      // Three colors: distribute them as pairs across the 6 slots
      colorsArray = [
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[2],
        colors[2],
      ];
    }

    return {
      // Convert RGB values from 0-255 range to 0-1 range for GLSL
      u_colors: {
        value: colorsArray.map((color) => [
          color[0] / 255,
          color[1] / 255,
          color[2] / 255,
        ]),
        type: "uniform3fv", // Array of 3-component vectors (RGB)
      },
      // Pass opacity array directly to shader
      u_opacities: {
        value: opacities,
        type: "uniform1fv", // Array of single float values
      },
      // Grid cell size in pixels
      u_total_size: {
        value: totalSize,
        type: "uniform1f", // Single float value
      },
      // Individual dot size in pixels
      u_dot_size: {
        value: dotSize,
        type: "uniform1f", // Single float value
      },
    };
  }, [colors, opacities, totalSize, dotSize]);

  return (
    <Shader
      source={`
        precision mediump float;
        in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        out vec4 fragColor;
        
        // Golden ratio constant for better pseudo-random distribution
        float PHI = 1.61803398874989484820459;
        
        /**
         * Pseudo-random function using golden ratio
         * Creates deterministic but seemingly random values based on position
         */
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }
        
        /**
         * Linear interpolation mapping function
         * Maps a value from one range to another
         */
        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }
        
        void main() {
            // Start with fragment coordinates (pixel position)
            vec2 st = fragCoord.xy;
            
            // Center the dot grid horizontally if requested
            ${
              center.includes("x")
                ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
            
            // Center the dot grid vertically if requested
            ${
              center.includes("y")
                ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
            
            // Initialize opacity (starts at 1.0, gets modified by various factors)
            float opacity = step(0.0, st.x);
            opacity *= step(0.0, st.y);

            // Convert pixel coordinates to grid coordinates
            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

            // Animation timing variables
            float frequency = 5.0; // How often dots change state
            float show_offset = random(st2); // Each grid cell gets a unique random offset
            
            // Time-based random value that changes periodically
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
            
            // Apply random opacity from our opacity array
            opacity *= u_opacities[int(rand * 10.0)];
            
            // Create the actual dot shape within each grid cell
            // These step functions create the rectangular dot boundaries
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

            // Choose color based on grid position (creates some variation)
            vec3 color = u_colors[int(show_offset * 6.0)];

            // Insert custom shader code here (like reveal animations)
            ${shader}

            // Final output: color with calculated opacity
            fragColor = vec4(color, opacity);
            // Premultiply alpha for correct blending
            fragColor.rgb *= fragColor.a;
        }`}
      uniforms={uniforms}
      maxFps={60}
    />
  );
};

/**
 * Type definition for uniforms that will be passed to WebGL shaders
 * Each uniform has a value and a type that tells WebGL how to interpret it
 */
type Uniforms = {
  [key: string]: {
    value: number[] | number[][] | number; // The actual data
    type: string; // WebGL uniform type (uniform1f, uniform3fv, etc.)
  };
};

/**
 * ShaderMaterial - The core component that handles WebGL rendering
 *
 * This component:
 * - Manages the Three.js material and mesh
 * - Converts our custom uniforms to Three.js format
 * - Handles the animation loop (time updates)
 * - Fixes canvas sizing issues on mount
 */
const ShaderMaterial = ({
  source,
  uniforms,
  maxFps = 60,
}: {
  source: string; // The GLSL fragment shader source code
  hovered?: boolean; // Unused but kept for API compatibility
  maxFps?: number; // Frame rate limit to prevent performance issues
  uniforms: Uniforms; // Our custom uniform definitions
}) => {
  const { size, gl } = useThree(); // React Three Fiber hooks for canvas size and WebGL context
  const ref = useRef<THREE.Mesh>(null); // Reference to the mesh for material updates
  let lastFrameTime = 0; // FPS limiting variable

  // CRITICAL FIX: Force canvas to get proper size on mount
  // This solves the issue where canvas doesn't fill container initially
  useEffect(() => {
    const timer = setTimeout(() => {
      // Use actual DOM element dimensions to set WebGL canvas size
      gl.setSize(gl.domElement.width, gl.domElement.height);
    }, 0); // setTimeout with 0 pushes to next event loop tick (after DOM render)

    return () => clearTimeout(timer);
  }, [gl]);

  // Animation loop - runs every frame to update the shader
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const timestamp = clock.getElapsedTime();

    // FPS limiting: skip frames if we're updating too fast
    if (timestamp - lastFrameTime < 1 / maxFps) {
      return;
    }
    lastFrameTime = timestamp;

    // Update the time uniform in the shader for animation
    const material: any = ref.current.material;
    const timeLocation = material.uniforms.u_time;
    timeLocation.value = timestamp;
  });

  // Shader material - creates the Three.js material with our custom shaders
  const material = useMemo(() => {
    // Convert our custom uniform format to Three.js format
    const getUniforms = () => {
      const preparedUniforms: any = {};

      // Process each uniform based on its type
      for (const uniformName in uniforms) {
        const uniform: any = uniforms[uniformName];

        switch (uniform.type) {
          case "uniform1f": // Single float value
            preparedUniforms[uniformName] = {
              value: uniform.value,
              type: "1f",
            };
            break;
          case "uniform3f": // 3-component vector (like RGB)
            preparedUniforms[uniformName] = {
              value: new THREE.Vector3().fromArray(uniform.value),
              type: "3f",
            };
            break;
          case "uniform1fv": // Array of float values
            preparedUniforms[uniformName] = {
              value: uniform.value,
              type: "1fv",
            };
            break;
          case "uniform3fv": // Array of 3-component vectors
            preparedUniforms[uniformName] = {
              value: uniform.value.map((v: number[]) =>
                new THREE.Vector3().fromArray(v),
              ),
              type: "3fv",
            };
            break;
          case "uniform2f": // 2-component vector (like screen resolution)
            preparedUniforms[uniformName] = {
              value: new THREE.Vector2().fromArray(uniform.value),
              type: "2f",
            };
            break;
          default:
            console.error(`Invalid uniform type for '${uniformName}'.`);
            break;
        }
      }

      // Always add these required uniforms
      preparedUniforms["u_time"] = { value: 0, type: "1f" }; // Animation time
      preparedUniforms["u_resolution"] = {
        value: new THREE.Vector2(size.width * 2, size.height * 2), // Screen resolution (doubled for crisp rendering)
      };
      return preparedUniforms;
    };

    const materialObject = new THREE.ShaderMaterial({
      // Vertex shader: positions vertices and passes coordinates to fragment shader
      vertexShader: `
      precision mediump float;
      in vec2 coordinates;
      uniform vec2 u_resolution;
      out vec2 fragCoord;
      void main(){
        float x = position.x;
        float y = position.y;
        gl_Position = vec4(x, y, 0.0, 1.0);
        fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }
      `,
      fragmentShader: source, // Our custom fragment shader that creates the dots
      uniforms: getUniforms(),
      glslVersion: THREE.GLSL3, // Use modern GLSL version
      blending: THREE.CustomBlending, // Custom blending for transparency effects
      blendSrc: THREE.SrcAlphaFactor, // Source blend factor
      blendDst: THREE.OneFactor, // Destination blend factor
    });

    return materialObject;
  }, [size.width, size.height, source, uniforms]); // Re-create when size, source, or uniforms change

  return (
    <mesh ref={ref as any}>
      {/* Simple plane geometry that covers the entire screen */}
      <planeGeometry args={[2, 2]} />
      {/* Attach our custom shader material to the mesh */}
      <primitive object={material} attach="material" />
    </mesh>
  );
};

/**
 * Shader - Wrapper component that sets up the Three.js Canvas
 *
 * This component:
 * - Creates the Canvas context with proper resize behavior
 * - Passes shader source and uniforms to ShaderMaterial
 * - Handles canvas sizing and positioning
 */
const Shader: React.FC<ShaderProps> = ({ source, uniforms, maxFps = 60 }) => {
  return (
    <Canvas
      className="absolute inset-0 h-full w-full" // Position canvas to fill container
      resize={{
        scroll: false, // Don't resize on scroll (prevents flickering)
        debounce: { scroll: 50, resize: 0 }, // Immediate resize response, debounced scroll
      }}
    >
      <ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
    </Canvas>
  );
};

/**
 * Props interface for the Shader component
 */
interface ShaderProps {
  /** GLSL fragment shader source code */
  source: string;
  /** Uniforms to pass to the shader */
  uniforms: {
    [key: string]: {
      value: number[] | number[][] | number;
      type: string;
    };
  };
  /** Maximum frame rate for animation updates */
  maxFps?: number;
}
