/*"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as anime from "animejs";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Sphere,
  MeshDistortMaterial,
  Text3D,
  Environment,
} from "@react-three/drei"; // ✅ Removed Fog
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const agents = [
  {
    id: 1,
    name: "Research Agent",
    color: "#6366f1",
    description: "Collecting and structuring requirements from your prompt...",
    details:
      "Scanning input, identifying key objectives, and gathering relevant data.",
    progressRange: [0, 25],
  },
  {
    id: 2,
    name: "Analysis Agent",
    color: "#8b5cf6",
    description: "Analyzing data for optimal PR strategies...",
    details:
      "Processing requirements, cross-referencing with industry standards.",
    progressRange: [25, 50],
  },
  {
    id: 3,
    name: "Suggestion Agent",
    color: "#ec4899",
    description: "Crafting intelligent improvement suggestions...",
    details: "Generating optimized suggestions based on analyzed data.",
    progressRange: [50, 75],
  },
  {
    id: 4,
    name: "Final Synthesis",
    color: "#f59e0b",
    description: "Compiling and refining final output...",
    details: "Integrating all insights into a cohesive, actionable output.",
    progressRange: [75, 100],
  },
];

const AgentModel = ({ position, color, scale, isActive, name, index }) => {
  const meshRef = useRef();
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (isActive) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.scale.setScalar(
        scale + Math.sin(clock.getElapsedTime()) * 0.15
      );
      camera.lookAt(position[0], 0, 0);
    }
  });

  return (
    <group position={position}>
      <Sphere args={[1, 64, 64]} ref={meshRef} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={isActive ? 0.7 : 0.3}
          speed={2.5}
          roughness={0.4}
          metalness={0.2}
        />
      </Sphere>
      <Text3D
        position={[0, 1.8, 0]}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.35}
        height={0.05}
        curveSegments={12}
      >
        {name}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.5 : 0.1}
        />
      </Text3D>
      {isActive && (
        <pointLight
          position={[0, 0, 2]}
          intensity={1}
          distance={5}
          color={color}
        />
      )}
    </group>
  );
};

const AnalysisPage = () => {
  const [progress, setProgress] = useState(0);
  const [activeAgent, setActiveAgent] = useState(0);
  const timelineRef = useRef(null);
  const progressRef = useRef(null);
  const cardRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline for 2-minute analysis
    const tl = gsap.timeline({ repeat: 0 });
    tl.to(
      { progress: 0 },
      {
        progress: 100,
        duration: 120, // 2 minutes
        ease: "linear",
        onUpdate: function () {
          const newProgress = this.targets()[0].progress;
          setProgress(newProgress);
          const currentAgent = agents.findIndex(
            (agent) =>
              newProgress >= agent.progressRange[0] &&
              newProgress < agent.progressRange[1]
          );
          setActiveAgent(
            currentAgent !== -1 ? currentAgent : agents.length - 1
          );
        },
        onComplete: () => {
          console.log("Analysis complete");
          gsap.to(cardRef.current, {
            scale: 1.1,
            yoyo: true,
            repeat: 1,
            duration: 0.5,
          });
        },
      }
    );

    // Anime.js for foggy timeline
    anime.default({
      targets: ".timeline-line",
      height: ["0%", "100%"],
      duration: 120000,
      easing: "linear",
      update: function (anim) {
        const progress = anim.progress;
        gsap.to(timelineRef.current, {
          background: `linear-gradient(to bottom, rgba(99, 102, 241, ${
            progress / 100
          }) ${progress}%, rgba(17, 24, 39, 0.5) ${progress}%)`,
        });
      },
    });

    // Particle animations
    anime.default({
      targets: ".particle",
      translateX: () => anime.random(-150, 150),
      translateY: () => anime.random(-150, 150),
      scale: () => anime.random(0.4, 1.5),
      opacity: [0, 0.9, 0],
      duration: 2500,
      loop: true,
      delay: anime.stagger(80),
      easing: "easeInOutQuad",
    });

    // Progress text animation
    anime.default({
      targets: progressRef.current,
      innerHTML: [0, 100],
      easing: "linear",
      duration: 120000,
      round: 1,
      update: function (anim) {
        if (progressRef.current) {
          progressRef.current.innerHTML = `${Math.round(anim.progress)}%`;
        }
      },
    });

    // Card pulse animation
    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // ScrollTrigger for canvas zoom
    gsap.to(".canvas-container", {
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".canvas-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Agent transition animation
    agents.forEach((_, index) => {
      gsap.fromTo(
        `.agent-dot-${index}`,
        { scale: 0.8, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `.agent-dot-${index}`,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      tl.kill();
      anime.remove(".timeline-line");
      anime.remove(".particle");
      anime.remove(progressRef.current);
      gsap.killTweensOf(cardRef.current);
      gsap.killTweensOf(".canvas-container");
      agents.forEach((_, index) => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger?.classList.contains(`agent-dot-${index}`)) {
            trigger.kill();
          }
        });
      });
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
    
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 15], fov: 60 }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.Fog("#000000", 5, 25); // ✅ Add fog here
        }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.8} />
        <directionalLight position={[-5, 5, 5]} intensity={1} />
        <Stars
          radius={150}
          depth={60}
          count={6000}
          factor={5}
          saturation={0.5}
          fade
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minDistance={10}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <Environment preset="studio" />
        <Suspense fallback={null}>
          {agents.map((agent, index) => (
            <AgentModel
              key={agent.id}
              position={[index * 4 - 6, 0, 0]}
              color={agent.color}
              scale={activeAgent === index ? 2 : 1.3}
              isActive={activeAgent === index}
              name={agent.name}
              index={index}
            />
          ))}
        </Suspense>
      </Canvas>

   
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
      >
        <motion.div
          ref={timelineRef}
          variants={childVariants}
          className="timeline w-10 h-3/4 bg-gray-900/40 rounded-full overflow-hidden relative shadow-2xl border border-indigo-500/30"
        >
          <div
            className="timeline-line w-full bg-gradient-to-b from-indigo-600 to-purple-600"
            style={{ height: "0%" }}
          ></div>
        </motion.div>
        <motion.div variants={childVariants} className="mt-12 text-center">
          <h2 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            {agents[activeAgent]?.name || "Completing Analysis"}
          </h2>
          <p className="text-xl text-gray-200">
            {agents[activeAgent]?.description || "Finalizing your results..."}
          </p>
          <p className="text-lg text-gray-300 mt-2">
            {agents[activeAgent]?.details || "Preparing final output..."}
          </p>
          <p
            ref={progressRef}
            className="text-2xl mt-4 font-semibold text-indigo-300"
          >
            0%
          </p>
        </motion.div>
        <motion.div variants={childVariants} className="mt-10 flex space-x-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              className={`agent-dot-${index} w-20 h-20 rounded-full flex items-center justify-center pointer-events-auto ${
                activeAgent >= index
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "bg-gray-800/50"
              }`}
              animate={{
                scale: activeAgent === index ? 1.3 : 1,
                boxShadow:
                  activeAgent === index
                    ? `0 0 25px ${agent.color}`
                    : "0 0 8px rgba(255, 255, 255, 0.3)",
              }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white font-bold text-lg">{index + 1}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

  
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-10 left-10 z-20 max-w-md"
      >
        <motion.div
          ref={cardRef}
          variants={childVariants}
          className="p-8 rounded-xl bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-indigo-500/20 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-indigo-300 mb-4">
            Multi-Agent AI System
          </h3>
          <p className="text-gray-200">
            Our cutting-edge multi-agent system collaborates in real-time to
            process your product requirements, delivering optimized, actionable
            suggestions with unparalleled precision.
          </p>
          <p className="text-gray-300 mt-2 text-sm">
            Current Stage: {agents[activeAgent]?.name || "Finalizing"}
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-10 right-10 z-20 max-w-md"
      >
        <motion.div
          variants={childVariants}
          className="p-8 rounded-xl bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-indigo-500/20 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-purple-300 mb-4">
            Analysis Metrics
          </h3>
          <ul className="text-gray-200 space-y-2">
            <li>Processing Time: ~{Math.round(120 * (progress / 100))}s</li>
            <li>
              Agents Active: {activeAgent + 1}/{agents.length}
            </li>
            <li>Completion: {Math.round(progress)}%</li>
          </ul>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .canvas-container {
          transform-origin: center;
        }
        .timeline {
          transform: translateY(-20px);
        }
        .particle {
          will-change: transform, opacity;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .pulse {
          animation: pulse 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AnalysisPage;*/
