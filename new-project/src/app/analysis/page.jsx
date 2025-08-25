"use client"

import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useReactFlow, 
  ReactFlowProvider,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  Fade,
  Grid,
  Paper,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  Psychology as BrainIcon,
  BarChart as BarChartIcon,
  Palette as PaletteIcon,
  Security as SecurityIcon,
  CheckCircle,
  TrendingUp,
  Warning,
  AutoAwesome,
  Insights,
  Analytics,
  PlayArrow,
  Chat,
  Stop,
  ArrowForward,
  Assessment,
  ThumbUp,
  ThumbDown,
  Star,
  Timeline,
  Speed,
  Visibility,
  TrendingDown,
  Shield,
  Lightbulb,
  Assignment,
  OpenInNew
} from '@mui/icons-material';

// Refined animations - no continuous blinking
const gentleGlow = keyframes`
  0% { box-shadow: 0 8px 25px rgba(99, 102, 241, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.4); }
  100% { box-shadow: 0 12px 35px rgba(99, 102, 241, 0.35), 0 0 0 1px rgba(99, 102, 241, 0.6); }
`;

const slideInUp = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const progressFlow = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Sophisticated styled components
const AgentCard = styled(Card)(({ theme, accent = '#6366f1', isActive = false, isCompleted = false }) => ({
  background: isActive 
    ? `linear-gradient(135deg, ${accent} 0%, ${accent}e6 100%)`
    : isCompleted 
      ? `linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)`
      : `linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)`,
  border: `2px solid ${isActive ? accent : isCompleted ? `${accent}50` : `${accent}25`}`,
  borderRadius: 24,
  boxShadow: isActive 
    ? `0 12px 40px ${accent}30, 0 0 0 1px ${accent}60`
    : isCompleted
      ? `0 8px 25px rgba(0,0,0,0.08), 0 0 0 1px ${accent}30`
      : `0 4px 15px rgba(0,0,0,0.06), 0 0 0 1px ${accent}20`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  width: 320,
  height: 200,
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: isActive 
      ? `0 16px 50px ${accent}40, 0 0 0 1px ${accent}70`
      : `0 12px 35px rgba(0,0,0,0.12), 0 0 0 1px ${accent}40`,
  },
  '&::before': isActive ? {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '3px',
    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)`,
    animation: `${progressFlow} 2s ease-in-out infinite`,
  } : {}
}));

const ResultCard = styled(Card)(({ theme, accent = '#6366f1' }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
  border: `2px solid ${accent}30`,
  borderRadius: 20,
  boxShadow: `0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px ${accent}25`,
  width: 320,
  minHeight: 340,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px ${accent}40`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${accent}, ${accent}cc, ${accent})`,
  }
}));

const SummaryCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
  border: '3px solid #475569',
  borderRadius: 28,
  boxShadow: '0 25px 80px rgba(15, 23, 42, 0.4), 0 0 0 1px rgba(71, 85, 105, 0.6)',
  width: 550,
  minHeight: 400,
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 35px 100px rgba(15, 23, 42, 0.5), 0 0 0 1px rgba(71, 85, 105, 0.8)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '6px',
    background: 'linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6, #f59e0b)',
  }
}));

const ProgressBar = styled(LinearProgress)(({ accent }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: `${accent}15`,
  overflow: 'hidden',
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(90deg, ${accent}, ${accent}dd, ${accent})`,
    borderRadius: 5,
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  }
}));

const MultiAgentFlowModule = ({ input, startProcessing, onComplete }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const { fitView } = useReactFlow();

  const agents = [
    { 
      id: 'requirements',
      name: 'Requirements', 
      fullName: 'Requirements Analysis',
      icon: BrainIcon, 
      color: '#8b5cf6',
      description: 'Analyzing requirements and specifications',
      insights: [
        'User stories mapped to core features',
        'Technical requirements clearly defined', 
        'Success metrics and KPIs established',
        'Acceptance criteria documented'
      ]
    },
    { 
      id: 'market',
      name: 'Market', 
      fullName: 'Market Research',
      icon: BarChartIcon, 
      color: '#06b6d4',
      description: 'Market analysis and competitive research',
      insights: [
        'TAM: $2.3B with 15% CAGR growth potential',
        'Top 5 competitors and positioning analyzed',
        'Pricing strategy validated with research',
        'Go-to-market plan and timeline ready'
      ]
    },
    { 
      id: 'design',
      name: 'Design', 
      fullName: 'UX/UI Design',
      icon: PaletteIcon, 
      color: '#f59e0b',
      description: 'User experience and interface design',
      insights: [
        'User journey flows optimized for conversion',
        'Comprehensive design system created',
        'WCAG 2.1 AA accessibility standards met',
        'Interactive prototype validated with users'
      ]
    },
    { 
      id: 'risk',
      name: 'Risk', 
      fullName: 'Risk Assessment',
      icon: SecurityIcon, 
      color: '#ef4444',
      description: 'Risk identification and mitigation',
      insights: [
        'Security vulnerabilities mapped and prioritized',
        'Regulatory compliance requirements checked',
        'Business continuity risks evaluated',
        'Comprehensive mitigation strategies defined'
      ]
    },
  ];

  useEffect(() => {
    if (startProcessing && input) {
      processSequentialFlow();
    }
  }, [startProcessing, input]);

  const getAgentMetrics = (agentIndex) => {
    const metrics = [
      {
        label: 'Scope Analysis',
        value: 'A+',
        insights: 4,
        riskLevel: '15%'
      },
      {
        label: 'Market Viability', 
        value: 'A',
        insights: 6,
        riskLevel: '12%'
      },
      {
        label: 'Design Quality',
        value: 'B+', 
        insights: 5,
        riskLevel: '20%'
      },
      {
        label: 'Security Rating',
        value: 'A+',
        insights: 4,
        riskLevel: '8%'
      }
    ];
    return metrics[agentIndex];
  };

  const processSequentialFlow = async () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setShowSummary(false);
    setNodes([]);
    setEdges([]);
    
    await createInitialLayout();
    
    for (let i = 0; i < agents.length; i++) {
      setCurrentStep(i);
      await processAgent(i);
      setCompletedSteps(prev => [...prev, i]);
      
      if (i < agents.length - 1) {
        await connectToNextAgent(i);
      }
    }
    
    await showFinalSummary();
    onComplete?.();
  };

  const createInitialLayout = async () => {
    const baseY = 120;
    const horizontalSpacing = 450; // Increased spacing between agents
    const startX = 80;
    
    const agentNodes = agents.map((agent, index) => ({
      id: `agent-${index}`,
      type: 'agent',
      data: {
        ...agent,
        status: 'pending',
        progress: 0,
        isActive: false
      },
      position: { x: startX + (index * horizontalSpacing), y: baseY },
      draggable: false,
    }));

    const agentEdges = [];
    for (let i = 0; i < agents.length - 1; i++) {
      agentEdges.push({
        id: `agent-connection-${i}`,
        source: `agent-${i}`,
        target: `agent-${i + 1}`,
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'smoothstep',
        style: { 
          stroke: '#cbd5e1', 
          strokeWidth: 3,
          strokeDasharray: '8,6'
        },
        animated: false,
      });
    }

    setNodes(agentNodes);
    setEdges(agentEdges);
    
    setTimeout(() => fitView({ duration: 1000, padding: 0.2 }), 100);
  };

  const processAgent = async (agentIndex) => {
    const agent = agents[agentIndex];
    
    setNodes(prev => prev.map(node => 
      node.id === `agent-${agentIndex}` 
        ? { ...node, data: { ...node.data, status: 'processing', isActive: true, progress: 0 } }
        : { ...node, data: { ...node.data, isActive: false } }
    ));

    for (let progress = 20; progress <= 100; progress += 20) {
      setNodes(prev => prev.map(node => 
        node.id === `agent-${agentIndex}` 
          ? { ...node, data: { ...node.data, progress } }
          : node
      ));
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setNodes(prev => prev.map(node => 
      node.id === `agent-${agentIndex}` 
        ? { ...node, data: { ...node.data, status: 'completed', isActive: false } }
        : node
    ));

    await new Promise(resolve => setTimeout(resolve, 400));
    
    const childResultNode = {
      id: `result-${agentIndex}`,
      type: 'result',
      data: {
        ...agent,
        score: agentIndex === 0 ? 94 : agentIndex === 1 ? 91 : agentIndex === 2 ? 87 : 96,
        metrics: getAgentMetrics(agentIndex),
        parentAgent: agentIndex
      },
      position: { x: 80 + (agentIndex * 450), y: 380 }, // Adjusted y-position for child nodes
      draggable: false,
    };

    setNodes(prev => [...prev, childResultNode]);

    const parentChildEdge = {
      id: `parent-child-${agentIndex}`,
      source: `agent-${agentIndex}`,
      target: `result-${agentIndex}`,
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'straight',
      style: { 
        stroke: agent.color, 
        strokeWidth: 3
      },
      markerEnd: {
        type: 'arrowclosed',
        width: 20,
        height: 20,
        color: agent.color
      }
    };

    setEdges(prev => [...prev, parentChildEdge]);
  };

  const connectToNextAgent = async (fromIndex) => {
    setEdges(prev => prev.map(edge => 
      edge.id === `agent-connection-${fromIndex}`
        ? {
            ...edge,
            style: { 
              stroke: agents[fromIndex].color, 
              strokeWidth: 4
            },
            animated: true,
            markerEnd: {
              type: 'arrowclosed',
              width: 20,
              height: 20,
              color: agents[fromIndex].color
            }
          }
        : edge
    ));

    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const showFinalSummary = async () => {
    const summaryY = 900; // Increased y-position to avoid overlap with child nodes
    const summaryX = 80 + ((agents.length - 1) * 450) / 2 - 275; // Centered horizontally with increased spacing
    
    const summaryNode = {
      id: 'summary',
      type: 'summary',
      data: {
        title: 'Comprehensive Analysis Complete',
        agents: agents,
        overallScore: 92,
        totalInsights: agents.reduce((acc, agent) => acc + agent.insights.length, 0),
        riskLevel: 'Low',
        recommendation: 'Proceed with Development Phase'
      },
      position: { x: summaryX, y: summaryY },
      draggable: false,
    };

    setNodes(prev => [...prev, summaryNode]);

    const summaryEdges = [];
    for (let i = 0; i < agents.length; i++) {
      summaryEdges.push({
        id: `result-to-summary-${i}`,
        source: `result-${i}`,
        target: 'summary',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        type: 'smoothstep',
        style: { 
          stroke: agents[i].color, 
          strokeWidth: 3,
          strokeOpacity: 0.8
        },
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 18,
          height: 18,
          color: agents[i].color
        }
      });
    }

    setEdges(prev => [...prev, ...summaryEdges]);
    setShowSummary(true);

    setTimeout(() => fitView({ duration: 1200, padding: 0.15 }), 400);
  };

  const AgentNode = ({ data }) => {
    const Icon = data.icon;
    const isActive = data.isActive;
    const isCompleted = data.status === 'completed';
    
    return (
      <Box sx={{ position: 'relative' }}>
        <Handle 
          type="target" 
          position={Position.Left} 
          id="left"
          style={{ 
            background: data.color, 
            width: 12, 
            height: 12, 
            border: '3px solid white',
            boxShadow: `0 0 0 2px ${data.color}`
          }} 
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          id="right"
          style={{ 
            background: data.color, 
            width: 12, 
            height: 12, 
            border: '3px solid white',
            boxShadow: `0 0 0 2px ${data.color}`
          }} 
        />
        <Handle 
          type="source" 
          position={Position.Bottom} 
          id="bottom"
          style={{ 
            background: data.color, 
            width: 12, 
            height: 12, 
            border: '3px solid white',
            boxShadow: `0 0 0 2px ${data.color}`
          }} 
        />
        
        <AgentCard accent={data.color} isActive={isActive} isCompleted={isCompleted}>
          <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 2.5 }}>
              <Avatar 
                sx={{ 
                  width: 56, 
                  height: 56,
                  background: isActive 
                    ? 'rgba(255,255,255,0.25)' 
                    : `linear-gradient(135deg, ${data.color}, ${data.color}dd)`,
                  border: isActive ? '3px solid rgba(255,255,255,0.4)' : '3px solid white',
                  boxShadow: isActive 
                    ? '0 8px 25px rgba(0,0,0,0.15)' 
                    : `0 4px 15px ${data.color}40`
                }}
              >
                <Icon sx={{ fontSize: 28, color: 'white' }} />
              </Avatar>
              
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 800, 
                  color: isActive ? 'white' : 'grey.900',
                  fontSize: '1.15rem',
                  lineHeight: 1.2,
                  mb: 0.5
                }}>
                  {data.fullName}
                </Typography>
                <Chip
                  size="medium"
                  label={isCompleted ? 'Completed' : data.status === 'processing' ? 'Processing...' : 'Pending'}
                  icon={isCompleted ? <CheckCircle sx={{ fontSize: 16 }} /> : undefined}
                  sx={{
                    background: isActive 
                      ? 'rgba(255,255,255,0.25)' 
                      : isCompleted 
                        ? '#10b981' 
                        : `${data.color}20`,
                    color: isActive ? 'white' : isCompleted ? 'white' : data.color,
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    height: 24,
                    border: isActive ? '1px solid rgba(255,255,255,0.4)' : `1px solid ${data.color}40`,
                    backdropFilter: isActive ? 'blur(10px)' : 'none'
                  }}
                />
              </Box>

              {data.progress > 0 && (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 900, 
                    color: isActive ? 'white' : data.color,
                    fontSize: '1.8rem',
                    lineHeight: 1
                  }}>
                    {data.progress}%
                  </Typography>
                </Box>
              )}
            </Box>

            {data.status === 'processing' && (
              <Box sx={{ mb: 2 }}>
                <ProgressBar 
                  variant="determinate" 
                  value={data.progress} 
                  accent={isActive ? '#ffffff' : data.color}
                />
              </Box>
            )}

            <Typography sx={{ 
              color: isActive ? 'rgba(255,255,255,0.95)' : 'grey.700',
              fontSize: '0.95rem',
              fontWeight: 500,
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              lineHeight: 1.4
            }}>
              {data.description}
            </Typography>
          </CardContent>
        </AgentCard>
      </Box>
    );
  };

  const ResultNode = ({ data }) => {
    return (
      <Box sx={{ position: 'relative' }}>
        <Handle 
          type="target" 
          position={Position.Top} 
          id="top"
          style={{ 
            background: data.color, 
            width: 12, 
            height: 12, 
            border: '3px solid white',
            boxShadow: `0 0 0 2px ${data.color}`
          }} 
        />
        <Handle 
          type="source" 
          position={Position.Bottom} 
          id="bottom"
          style={{ 
            background: data.color, 
            width: 12, 
            height: 12, 
            border: '3px solid white',
            boxShadow: `0 0 0 2px ${data.color}`
          }} 
        />
        
        <ResultCard accent={data.color}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ 
                width: 42, 
                height: 42,
                background: `linear-gradient(135deg, ${data.color}, ${data.color}cc)`,
                border: '3px solid white',
                boxShadow: `0 4px 15px ${data.color}40`
              }}>
                <Assignment sx={{ fontSize: 20, color: 'white' }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 700, 
                  color: 'grey.900',
                  fontSize: '1rem',
                  lineHeight: 1.2
                }}>
                  {data.name} Analysis Results
                </Typography>
                <Chip
                  size="small"
                  label="Analysis Complete"
                  icon={<CheckCircle sx={{ fontSize: 12 }} />}
                  sx={{
                    mt: 0.5,
                    background: '#10b981',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.65rem',
                    height: 20
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 3,
              p: 3,
              background: `linear-gradient(135deg, ${data.color}12, ${data.color}08)`,
              borderRadius: 3,
              border: `2px solid ${data.color}25`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Typography variant="h1" sx={{ 
                fontWeight: 900, 
                color: data.color,
                fontSize: '3.5rem',
                lineHeight: 1,
                textShadow: `0 2px 4px ${data.color}20`
              }}>
                {data.score}%
              </Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" sx={{ 
                  color: 'grey.600',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Confidence Grade
                </Typography>
                <Typography variant="h3" sx={{ 
                  color: data.color,
                  fontWeight: 800,
                  fontSize: '2rem',
                  textShadow: `0 1px 2px ${data.color}20`
                }}>
                  {data.metrics.value}
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={1.5} sx={{ mb: 3 }}>
              <Grid item xs={4}>
                <Paper sx={{ 
                  p: 1.5, 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #f59e0b12, #f59e0b08)',
                  border: '2px solid #f59e0b25',
                  borderRadius: 2
                }}>
                  <TrendingUp sx={{ color: '#f59e0b', fontSize: 20, mb: 0.5 }} />
                  <Typography variant="h5" sx={{ 
                    fontWeight: 800, 
                    color: '#f59e0b',
                    fontSize: '1.3rem',
                    lineHeight: 1
                  }}>
                    {data.metrics.insights}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: 'grey.600',
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}>
                    Key Insights
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ 
                  p: 1.5, 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #ef444412, #ef444408)',
                  border: '2px solid #ef444425',
                  borderRadius: 2
                }}>
                  <Warning sx={{ color: '#ef4444', fontSize: 20, mb: 0.5 }} />
                  <Typography variant="h5" sx={{ 
                    fontWeight: 800, 
                    color: '#ef4444',
                    fontSize: '1.3rem',
                    lineHeight: 1
                  }}>
                    {data.metrics.riskLevel}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: 'grey.600',
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}>
                    Risk Level
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ 
                  p: 1.5, 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #10b98112, #10b98108)',
                  border: '2px solid #10b98125',
                  borderRadius: 2
                }}>
                  <ThumbUp sx={{ color: '#10b981', fontSize: 20, mb: 0.5 }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 800, 
                    color: '#10b981',
                    fontSize: '0.9rem',
                    lineHeight: 1
                  }}>
                    APPROVED
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: 'grey.600',
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}>
                    Status
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 2.5, borderColor: 'rgba(0,0,0,0.08)' }} />

            <Typography variant="subtitle1" sx={{ 
              fontWeight: 700, 
              color: 'grey.900',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontSize: '0.9rem'
            }}>
              <Lightbulb sx={{ fontSize: 16, color: data.color }} />
              Key Insights & Recommendations
            </Typography>

            <List dense sx={{ p: 0 }}>
              {data.insights.slice(0, 4).map((insight, index) => (
                <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 20 }}>
                    <CheckCircle sx={{ 
                      fontSize: 14, 
                      color: '#10b981'
                    }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={insight}
                    primaryTypographyProps={{
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      color: 'grey.700',
                      lineHeight: 1.4
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </ResultCard>
      </Box>
    );
  };

  const SummaryNode = ({ data }) => {
    return (
      <Box sx={{ position: 'relative', animation: `${slideInUp} 1s ease-out` }}>
        <Handle 
          type="target" 
          position={Position.Top} 
          id="top"
          style={{ 
            background: '#10b981', 
            width: 16, 
            height: 16, 
            border: '4px solid white',
            boxShadow: '0 0 0 3px #10b981'
          }} 
        />
        
        <SummaryCard>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
              <Avatar sx={{ 
                width: 64, 
                height: 64, 
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: '4px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
              }}>
                <Assessment sx={{ fontSize: 32, color: 'white' }} />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ 
                  fontWeight: 900, 
                  color: 'white',
                  fontSize: '1.6rem',
                  mb: 0.5
                }}>
                  {data.title}
                </Typography>
                <Typography sx={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  fontSize: '1rem',
                  fontWeight: 500
                }}>
                  Multi-agent intelligence synthesis complete
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              <Grid item xs={3}>
                <Paper sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))',
                  border: '2px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: 3
                }}>
                  <Typography variant="h2" sx={{ 
                    fontWeight: 900, 
                    color: '#10b981',
                    fontSize: '2.5rem',
                    lineHeight: 1,
                    textShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
                  }}>
                    {data.overallScore}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}>
                    Overall Score
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1))',
                  border: '2px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: 3
                }}>
                  <Typography variant="h2" sx={{ 
                    fontWeight: 900, 
                    color: '#3b82f6',
                    fontSize: '2.5rem',
                    lineHeight: 1,
                    textShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
                  }}>
                    {data.totalInsights}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}>
                    Total Insights
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))',
                  border: '2px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: 3
                }}>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 800, 
                    color: '#10b981',
                    fontSize: '1.4rem',
                    lineHeight: 1,
                    textShadow: '0 1px 2px rgba(16, 185, 129, 0.3)'
                  }}>
                    {data.riskLevel}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}>
                    Risk Level
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.1))',
                  border: '2px solid rgba(168, 85, 247, 0.4)',
                  borderRadius: 3
                }}>
                  <Shield sx={{ color: '#a855f7', fontSize: 32, mb: 1 }} />
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}>
                    Validated
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.25)', mb: 3 }} />

            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              color: 'white',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <Star sx={{ color: '#fbbf24', fontSize: 24 }} />
              Executive Summary & Recommendation
            </Typography>

            <Paper sx={{ 
              p: 4, 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.1))',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 3,
              mb: 3
            }}>
              <Typography sx={{ 
                color: '#10b981',
                fontWeight: 700,
                fontSize: '1.3rem',
                mb: 2
              }}>
                🚀 {data.recommendation}
              </Typography>
              <Typography sx={{ 
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1rem',
                lineHeight: 1.6,
                fontWeight: 500
              }}>
                Based on comprehensive multi-agent analysis across requirements, market dynamics, design excellence, and risk assessment, this project demonstrates exceptional potential with robust foundations and clear strategic advantage in the marketplace.
              </Typography>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {[
                { label: 'Market Ready', color: '#10b981' },
                { label: 'Low Risk Profile', color: '#3b82f6' },
                { label: 'Design Excellence', color: '#f59e0b' },
                { label: 'Regulatory Compliant', color: '#8b5cf6' }
              ].map((tag, index) => (
                <Chip
                  key={index}
                  label={tag.label}
                  size="medium"
                  sx={{
                    background: `${tag.color}25`,
                    color: tag.color,
                    fontWeight: 700,
                    border: `2px solid ${tag.color}40`,
                    fontSize: '0.8rem',
                    height: 32
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </SummaryCard>
      </Box>
    );
  };

  const nodeTypes = {
    agent: AgentNode,
    result: ResultNode,
    summary: SummaryNode,
  };

  return (
    <Box sx={{ 
      height: '100%', 
      width: '100%',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      position: 'relative'
    }}>
      <Fade in={true}>
        <Paper 
          elevation={0}
          sx={{
            position: 'absolute',
            top: 24,
            right: 24,
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(25px)',
            borderRadius: 4,
            p: 3,
            zIndex: 1000,
            border: '2px solid rgba(148, 163, 184, 0.15)',
            minWidth: 280,
            boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 800, 
              color: 'grey.900',
              fontSize: '1.1rem'
            }}>
              Analysis Progress
            </Typography>
            <Chip
              label={`${completedSteps.length}/${agents.length}`}
              size="medium"
              sx={{
                background: completedSteps.length === agents.length ? '#10b981' : '#6366f1',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            />
          </Box>
          
          <Stack spacing={2}>
            {agents.map((agent, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: completedSteps.includes(index) ? '#10b981' :
                               currentStep === index ? agent.color :
                               '#e2e8f0',
                    boxShadow: completedSteps.includes(index) || currentStep === index 
                      ? `0 0 0 3px ${completedSteps.includes(index) ? '#10b981' : agent.color}25` 
                      : 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
                <Typography variant="body2" sx={{ 
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: completedSteps.includes(index) || currentStep === index ? 'grey.900' : 'grey.500',
                  flex: 1
                }}>
                  {agent.fullName}
                </Typography>
                {completedSteps.includes(index) && (
                  <CheckCircle sx={{ fontSize: 18, color: '#10b981' }} />
                )}
              </Box>
            ))}
          </Stack>
        </Paper>
      </Fade>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.25}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        panOnScroll
        zoomOnScroll
        zoomOnPinch
        proOptions={{ hideAttribution: true }}
        style={{ backgroundColor: 'transparent' }}
      >
        <Background 
          variant="dots" 
          color="rgba(148, 163, 184, 0.25)" 
          gap={40} 
          size={2}
        />
        <Controls 
          position="bottom-right" 
          style={{ 
            background: 'rgba(255,255,255,0.98)',
            border: '2px solid rgba(148, 163, 184, 0.15)',
            borderRadius: 12,
            backdropFilter: 'blur(25px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
          }}
        />
      </ReactFlow>
    </Box>
  );
};

const AgentFlowWithProvider = (props) => {
  return (
    <ReactFlowProvider>
      <MultiAgentFlowModule {...props} />
    </ReactFlowProvider>
  );
};

export default function MultiAgentWorkflow() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [startProcessing, setStartProcessing] = useState(false);

  const handleProcess = () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setStartProcessing(true);
  };

  const handleComplete = () => {
    setIsProcessing(false);
    setStartProcessing(false);
  };

  const handleReset = () => {
    setIsProcessing(false);
    setStartProcessing(false);
    setInput('');
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)'
    }}>
      <Paper 
        elevation={0}
        sx={{
          background: 'rgba(255,255,255,0.99)',
          backdropFilter: 'blur(30px)',
          borderBottom: '2px solid rgba(148, 163, 184, 0.1)',
          zIndex: 1001,
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}
      >
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            alignItems: 'center',
            maxWidth: 1200,
            mx: 'auto'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2.5,
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
              px: 4,
              py: 2,
              borderRadius: 4,
              color: 'white',
              minWidth: 220,
              boxShadow: '0 8px 25px rgba(15, 23, 42, 0.3)'
            }}>
              <Timeline sx={{ fontSize: 26 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1rem' }}>
                  Multi-Agent AI Analysis
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.8rem', opacity: 0.9 }}>
                  Next-generation workflow intelligence
                </Typography>
              </Box>
            </Box>
            
            <TextField
              fullWidth
              size="large"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isProcessing}
              placeholder="Enter your project concept for comprehensive AI-powered analysis..."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.95)',
                  height: 64,
                  border: '2px solid rgba(148, 163, 184, 0.2)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  '& fieldset': {
                    border: 'none'
                  },
                  '&:hover': {
                    background: 'white',
                    borderColor: '#6366f1',
                    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.1)'
                  },
                  '&.Mui-focused': {
                    background: 'white',
                    borderColor: '#6366f1',
                    boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.1)'
                  },
                  '&.Mui-disabled': {
                    background: 'rgba(248, 250, 252, 0.8)'
                  }
                }
              }}
            />
            
            <Button
              onClick={handleProcess}
              disabled={isProcessing || !input.trim()}
              variant="contained"
              sx={{
                px: 5,
                py: 2,
                fontSize: '1rem',
                fontWeight: 800,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                textTransform: 'none',
                minWidth: 160,
                height: 64,
                '&:hover': {
                  background: 'linear-gradient(135deg, #5b5fd8 0%, #7c5ce3 50%, #9333ea 100%)',
                  boxShadow: '0 12px 35px rgba(99, 102, 241, 0.4)',
                  transform: 'translateY(-2px)'
                },
                '&:disabled': {
                  background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)',
                  boxShadow: 'none',
                  color: 'white'
                }
              }}
            >
              {isProcessing ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CircularProgress size={22} sx={{ color: 'white' }} />
                  Analyzing...
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Analytics sx={{ fontSize: 24 }} />
                  Start Analysis
                </Box>
              )}
            </Button>

            {isProcessing && (
              <Button
                onClick={handleReset}
                variant="outlined"
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  borderRadius: 4,
                  textTransform: 'none',
                  height: 64,
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  '&:hover': {
                    background: 'rgba(239, 68, 68, 0.05)',
                    borderColor: '#ef4444',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.2)'
                  }
                }}
              >
                <Stop sx={{ fontSize: 20, mr: 1 }} />
                Reset
              </Button>
            )}

            <Button
              href="https://demo-back-clmu.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              sx={{
                px: 4,
                py: 2,
                fontSize: '0.9rem',
                fontWeight: 700,
                borderRadius: 4,
                textTransform: 'none',
                height: 64,
                border: '2px solid rgba(59, 130, 246, 0.3)',
                color: '#3b82f6',
                '&:hover': {
                  background: 'rgba(59, 130, 246, 0.05)',
                  borderColor: '#3b82f6',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <OpenInNew sx={{ fontSize: 20 }} />
                View Demo
              </Box>
            </Button>
          </Box>

          {!isProcessing && (
            <Fade in={true} timeout={1200}>
              <Box sx={{ 
                display: 'flex', 
                gap: 2.5, 
                mt: 3,
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Typography variant="body1" sx={{ 
                  color: 'grey.600', 
                  fontSize: '0.95rem',
                  alignSelf: 'center',
                  fontWeight: 600,
                  mr: 2
                }}>
                  Explore these examples:
                </Typography>
                {[
                  { text: 'AI-powered fitness tracking app', icon: '🏃‍♂️' },
                  { text: 'Sustainable e-commerce marketplace', icon: '🌱' }, 
                  { text: 'Remote team collaboration platform', icon: '👥' },
                  { text: 'Educational VR learning system', icon: '🎓' }
                ].map((example, index) => (
                  <Chip
                    key={index}
                    label={`${example.icon} ${example.text}`}
                    onClick={() => setInput(example.text)}
                    sx={{
                      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.06) 0%, rgba(51, 65, 85, 0.08) 100%)',
                      border: '2px solid rgba(30, 41, 59, 0.15)',
                      fontSize: '0.85rem',
                      height: 36,
                      fontWeight: 600,
                      color: '#334155',
                      px: 2,
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.12) 0%, rgba(51, 65, 85, 0.15) 100%)',
                        borderColor: '#1e293b',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(30, 41, 59, 0.2)'
                      },
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                ))}
              </Box>
            </Fade>
          )}
        </Container>
      </Paper>

      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AgentFlowWithProvider
          input={input}
          startProcessing={startProcessing}
          onComplete={handleComplete}
        />
      </Box>
    </Box>
  );
}