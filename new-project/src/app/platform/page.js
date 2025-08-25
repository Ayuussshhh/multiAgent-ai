'use client';

import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Card, CardContent, Grid, IconButton, Tooltip,
  CircularProgress, Chip, Avatar, Switch, FormControlLabel, Paper,
  Badge, LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import {
  Notifications, FilterAlt, Download, TrendingUp, People, AttachMoney,
  Speed, Share, Sync, InsertChart, Timeline, Analytics, DarkMode,
  LightMode, Refresh, MoreVert, Star, CheckCircle, Warning, Info, Insights
} from '@mui/icons-material';

const StyledContainer = styled(Box)(({ theme, darkMode }) => ({
  background: darkMode
    ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  minHeight: '100vh',
  padding: theme.spacing(4),
  transition: 'background 0.3s ease-in-out',
  fontFamily: '"Inter", sans-serif',
}));

const StyledHeader = styled(Box)(({ theme, darkMode }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  marginBottom: theme.spacing(3),
  borderBottom: `1px solid ${darkMode ? '#475569' : '#d1d5db'}`,
}));

const GlassCard = styled(Card)(({ theme, darkMode }) => ({
  background: darkMode
    ? 'rgba(30, 41, 59, 0.9)'
    : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: `1px solid ${darkMode ? 'rgba(71, 85, 105, 0.2)' : 'rgba(209, 213, 219, 0.3)'}`,
  boxShadow: darkMode
    ? '0 4px 16px rgba(0, 0, 0, 0.2)'
    : '0 4px 16px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: darkMode
      ? '0 8px 24px rgba(0, 0, 0, 0.3)'
      : '0 8px 24px rgba(0, 0, 0, 0.1)',
  },
}));

const MetricCard = styled(GlassCard)(({ theme, darkMode }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
  },
}));

const QuickActionButton = styled(Button)(({ theme, darkMode }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  color: '#ffffff',
  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
  },
}));

const ActivityCard = styled(Paper)(({ theme, darkMode }) => ({
  padding: theme.spacing(2),
  borderRadius: '12px',
  marginBottom: theme.spacing(1),
  background: darkMode
    ? 'rgba(51, 65, 85, 0.7)'
    : 'rgba(248, 250, 252, 0.9)',
  border: `1px solid ${darkMode ? 'rgba(71, 85, 105, 0.2)' : 'rgba(209, 213, 219, 0.2)'}`,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateX(4px)',
    boxShadow: darkMode
      ? '0 4px 12px rgba(0, 0, 0, 0.2)'
      : '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
}));

const FloatingStats = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1.5),
  right: theme.spacing(1.5),
  display: 'flex',
  gap: theme.spacing(1),
}));

const TrendIndicator = styled(Box)(({ trend }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '4px 10px',
  borderRadius: '8px',
  fontSize: '0.75rem',
  fontWeight: 600,
  background: trend === 'up' ? '#dcfce7' : trend === 'down' ? '#fee2e2' : '#fef3c7',
  color: trend === 'up' ? '#166534' : trend === 'down' ? '#991b1b' : '#92400e',
}));

const mockData = {
  metrics: [
    { title: 'Total Users', value: 24587, change: '+12.5%', trend: 'up', icon: People, color: '#3b82f6', trendData: [400, 450, 420, 480, 520, 490, 560], growth: 12.5 },
    { title: 'Revenue', value: '$54,231', change: '+8.2%', trend: 'up', icon: AttachMoney, color: '#10b981', trendData: [300, 320, 310, 340, 380, 360, 400], growth: 8.2 },
    { title: 'Growth Rate', value: '23.5%', change: '-2.1%', trend: 'down', icon: TrendingUp, color: '#8b5cf6', trendData: [200, 180, 220, 190, 210, 180, 200], growth: -2.1 },
    { title: 'Active Sessions', value: 1432, change: '+15.3%', trend: 'up', icon: Speed, color: '#f59e0b', trendData: [100, 120, 110, 140, 160, 150, 180], growth: 15.3 },
  ],
  performance: [
    { month: 'Jan', users: 400, revenue: 2400, sessions: 300, growth: 240 },
    { month: 'Feb', users: 300, revenue: 1398, sessions: 200, growth: 139 },
    { month: 'Mar', users: 600, revenue: 9800, sessions: 500, growth: 980 },
    { month: 'Apr', users: 800, revenue: 3908, sessions: 700, growth: 390 },
    { month: 'May', users: 500, revenue: 4800, sessions: 400, growth: 480 },
    { month: 'Jun', users: 700, revenue: 3800, sessions: 600, growth: 380 },
    { month: 'Jul', users: 900, revenue: 4300, sessions: 800, growth: 430 },
  ],
  quarterlyData: [
    { quarter: 'Q1', value: 45000, growth: 12.5 },
    { quarter: 'Q2', value: 52000, growth: 15.6 },
    { quarter: 'Q3', value: 61000, growth: 17.3 },
    { quarter: 'Q4', value: 58000, growth: -4.9 },
  ],
  pieData: [
    { name: 'Desktop', value: 45, color: '#3b82f6' },
    { name: 'Mobile', value: 35, color: '#10b981' },
    { name: 'Tablet', value: 20, color: '#f59e0b' },
  ],
  reports: [
    { title: 'Analytics Dashboard', status: 'Active', views: '12.5K', priority: 'High', lastUpdated: '2 hours ago', author: 'John Doe', progress: 85, favorite: true, category: 'Dashboard', tags: ['Analytics', 'KPI'] },
    { title: 'User Behavior Analysis', status: 'Draft', views: '8.2K', priority: 'Medium', lastUpdated: '1 day ago', author: 'Jane Smith', progress: 40, favorite: false, category: 'Research', tags: ['Behavior', 'Users'] },
    { title: 'Revenue Trends', status: 'Active', views: '15.7K', priority: 'High', lastUpdated: '3 hours ago', author: 'Mike Johnson', progress: 95, favorite: true, category: 'Finance', tags: ['Revenue', 'Trends'] },
    { title: 'Customer Segmentation', status: 'Review', views: '9.1K', priority: 'Low', lastUpdated: '5 hours ago', author: 'Sarah Wilson', progress: 60, favorite: false, category: 'Marketing', tags: ['Customers', 'Segments'] },
    { title: 'Product Performance', status: 'Active', views: '11.3K', priority: 'Medium', lastUpdated: '1 hour ago', author: 'David Brown', progress: 75, favorite: false, category: 'Product', tags: ['Performance', 'Products'] },
  ],
  activity: [
    { type: 'Report Generated', description: 'Monthly analytics report completed successfully', time: '2 minutes ago', by: 'System', icon: CheckCircle, color: '#10b981', severity: 'success' },
    { type: 'High Traffic Alert', description: 'Website traffic increased by 150% in the last hour', time: '15 minutes ago', by: 'Monitor', icon: Warning, color: '#f59e0b', severity: 'warning' },
    { type: 'New Team Member', description: 'Sarah Wilson joined the Analytics team', time: '1 hour ago', by: 'HR', icon: People, color: '#3b82f6', severity: 'info' },
    { type: 'Dashboard Updated', description: 'Performance metrics dashboard has been refreshed', time: '2 hours ago', by: 'System', icon: Info, color: '#06b6d4', severity: 'info' },
    { type: 'Data Sync Complete', description: 'All data sources synchronized successfully', time: '3 hours ago', by: 'Sync Service', icon: Sync, color: '#8b5cf6', severity: 'success' },
  ],
  quickActions: [
    { title: 'New Report', description: 'Create analytics report', icon: InsertChart, color: '#3b82f6', category: 'Create' },
    { title: 'Export Data', description: 'Download CSV/Excel', icon: Download, color: '#10b981', category: 'Export' },
    { title: 'Share Dashboard', description: 'Share with team', icon: Share, color: '#8b5cf6', category: 'Collaborate' },
    { title: 'Sync Data', description: 'Refresh all sources', icon: Sync, color: '#f59e0b', category: 'Sync' },
    { title: 'Quick Insights', description: 'AI-powered analysis', icon: Analytics, color: '#ef4444', category: 'AI' },
    { title: 'Set Goals', description: 'Define targets', icon: Timeline, color: '#06b6d4', category: 'Goals' },
  ],
  insights: [
    { title: 'User Engagement Peak', value: 'Sessions up 23% at 2-4 PM', icon: TrendingUp, color: '#10b981' },
    { title: 'Mobile Usage Growing', value: 'Mobile traffic increased 45%', icon: Assessment, color: '#3b82f6' },
    { title: 'Revenue Opportunity', value: 'Conversion rate optimization', icon: AttachMoney, color: '#f59e0b' },
  ],
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];

export default function ModernAnalyticsDashboard() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('users');

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#10b981';
      case 'Draft': return '#f59e0b';
      case 'Review': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (isLoading) {
    return (
      <StyledContainer darkMode={darkMode}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <CircularProgress size={60} thickness={4} sx={{ color: '#3b82f6' }} />
            <Analytics sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 24, color: '#3b82f6' }} />
          </Box>
          <Typography variant="h6" sx={{ color: darkMode ? '#e2e8f0' : '#1e293b', fontWeight: 600 }}>
            Loading Analytics Hub
          </Typography>
          <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
            Preparing your data visualizations...
          </Typography>
        </Box>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer darkMode={darkMode}>
      <StyledHeader darkMode={darkMode}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            width: 40, height: 40, borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Analytics sx={{ color: '#ffffff', fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
              Analytics Hub
            </Typography>
            <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#6b7280', mt: 0.5 }}>
              Real-time insights • Updated {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                sx={{
                  '& .MuiSwitch-track': { backgroundColor: darkMode ? '#475569' : '#d1d5db' },
                  '& .MuiSwitch-thumb': { backgroundColor: darkMode ? '#3b82f6' : '#f59e0b' },
                }}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {darkMode ? <DarkMode sx={{ fontSize: 18, color: darkMode ? '#94a3b8' : '#6b7280' }} /> : <LightMode sx={{ fontSize: 18, color: darkMode ? '#94a3b8' : '#6b7280' }} />}
                <Typography variant="body2" sx={{ color: darkMode ? '#e2e8f0' : '#6b7280' }}>
                  {darkMode ? 'Dark' : 'Light'}
                </Typography>
              </Box>
            }
          />
          <Tooltip title="Refresh Data">
            <IconButton
              onClick={handleRefresh}
              sx={{
                color: darkMode ? '#e2e8f0' : '#6b7280',
                background: darkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(209, 213, 219, 0.3)',
                '&:hover': { background: darkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(209, 213, 219, 0.5)' },
              }}
            >
              <Refresh sx={{ fontSize: 20, animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            sx={{
              borderRadius: '8px',
              color: darkMode ? '#e2e8f0' : '#6b7280',
              borderColor: darkMode ? '#475569' : '#d1d5db',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              '&:hover': { borderColor: darkMode ? '#64748b' : '#9ca3af', background: darkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(209, 213, 219, 0.3)' },
            }}
            onClick={() => setTimeRange(timeRange === 'Last 30 days' ? 'Last 7 days' : 'Last 30 days')}
          >
            📅 {timeRange}
          </Button>
          <QuickActionButton darkMode={darkMode} startIcon={<InsertChart sx={{ fontSize: 18 }} />}>
            New Report
          </QuickActionButton>
        </Box>
      </StyledHeader>

      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {mockData.metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
              return (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                  <MetricCard darkMode={darkMode}>
                    <CardContent sx={{ p: 2.5 }}>
                      <FloatingStats>
                        <TrendIndicator trend={metric.trend}>
                          <TrendIcon sx={{ fontSize: 14 }} />
                          {Math.abs(metric.growth)}%
                        </TrendIndicator>
                      </FloatingStats>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{
                          width: 48, height: 48, borderRadius: '12px',
                          background: metric.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <IconComponent sx={{ color: '#ffffff', fontSize: 24 }} />
                        </Box>
                        <Box sx={{ width: 80, height: 40 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={metric.trendData.map((value, i) => ({ value, index: i }))}>
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke={metric.color}
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </Box>
                      </Box>
                      <Typography variant="h4" fontWeight={700} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 0.5 }}>
                        {typeof metric.value === 'number' ? formatNumber(metric.value) : metric.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#6b7280', mb: 1.5 }}>
                        {metric.title}
                      </Typography>
                      <Chip
                        label={`${metric.change} vs last month`}
                        size="small"
                        sx={{
                          background: metric.change.startsWith('+') ? '#dcfce7' : '#fee2e2',
                          color: metric.change.startsWith('+') ? '#166534' : '#991b1b',
                          fontWeight: 500,
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                        }}
                      />
                    </CardContent>
                  </MetricCard>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        {/* Performance Analytics */}
        <Grid item xs={12} md={8}>
          <GlassCard darkMode={darkMode}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h5" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                    📊 Performance Analytics
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
                    Track key metrics over time
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {['users', 'revenue', 'sessions', 'growth'].map((metric) => (
                    <Button
                      key={metric}
                      size="small"
                      variant={selectedMetric === metric ? 'contained' : 'outlined'}
                      onClick={() => setSelectedMetric(metric)}
                      sx={{
                        textTransform: 'capitalize',
                        borderRadius: '8px',
                        fontWeight: 500,
                        px: 2,
                        ...(selectedMetric === metric && {
                          background: '#3b82f6',
                          color: '#ffffff',
                          '&:hover': { background: '#2563eb' },
                        }),
                        ...(selectedMetric !== metric && {
                          color: darkMode ? '#e2e8f0' : '#6b7280',
                          borderColor: darkMode ? '#475569' : '#d1d5db',
                        }),
                      }}
                    >
                      {metric}
                    </Button>
                  ))}
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={mockData.performance} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e2e8f0'} />
                  <XAxis dataKey="month" stroke={darkMode ? '#94a3b8' : '#6b7280'} fontSize={12} />
                  <YAxis stroke={darkMode ? '#94a3b8' : '#6b7280'} fontSize={12} />
                  <RechartsTooltip
                    contentStyle={{
                      background: darkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: `1px solid ${darkMode ? '#475569' : '#d1d5db'}`,
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#colorMetric)"
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
                  />
                  {selectedMetric !== 'sessions' && (
                    <Area
                      type="monotone"
                      dataKey="sessions"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#colorSecondary)"
                      dot={{ fill: '#10b981', r: 3 }}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </GlassCard>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <GlassCard darkMode={darkMode}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 1 }}>
                ⚡ Quick Actions
              </Typography>
              <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#6b7280', mb: 2 }}>
                Access frequently used tools
              </Typography>
              <Grid container spacing={2}>
                {mockData.quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <Grid item xs={6} key={index}>
                      <Button
                        fullWidth
                        sx={{
                          p: 2,
                          borderRadius: '12px',
                          background: darkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(209, 213, 219, 0.2)',
                          border: `1px solid ${darkMode ? '#475569' : '#d1d5db'}`,
                          flexDirection: 'column',
                          height: '90px',
                          textTransform: 'none',
                          '&:hover': {
                            background: `${action.color}10`,
                            borderColor: action.color,
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <IconComponent sx={{ color: action.color, fontSize: 24, mb: 1 }} />
                        <Typography variant="body2" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                          {action.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
                          {action.description}
                        </Typography>
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </GlassCard>
        </Grid>

        {/* User Growth Trends */}
        <Grid item xs={12} md={6}>
          <GlassCard darkMode={darkMode}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h5" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                    📈 User Growth Trends
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
                    Monthly active user patterns
                  </Typography>
                </Box>
                <Button
                  size="small"
                  startIcon={<Timeline sx={{ fontSize: 18 }} />}
                  sx={{
                    textTransform: 'none',
                    color: darkMode ? '#e2e8f0' : '#6b7280',
                    background: darkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(209, 213, 219, 0.3)',
                    '&:hover': { background: darkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(209, 213, 219, 0.5)' },
                  }}
                >
                  Analyze
                </Button>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockData.performance}>
                  <defs>
                    <linearGradient id="userGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e2e8f0'} />
                  <XAxis dataKey="month" stroke={darkMode ? '#94a3b8' : '#6b7280'} fontSize={12} />
                  <YAxis stroke={darkMode ? '#94a3b8' : '#6b7280'} fontSize={12} />
                  <RechartsTooltip
                    contentStyle={{
                      background: darkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: `1px solid ${darkMode ? '#475569' : '#d1d5db'}`,
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#userGrowth)"
                    dot={{ fill: '#8b5cf6', r: 4 }}
                    activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2, fill: '#ffffff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </GlassCard>
        </Grid>

        {/* Activity Stream */}
        <Grid item xs={12} md={6}>
          <GlassCard darkMode={darkMode}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h5" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                    🔔 Activity Stream
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
                    Real-time updates
                  </Typography>
                </Box>
                <Badge badgeContent={mockData.activity.length} color="primary">
                  <Notifications sx={{ color: darkMode ? '#94a3b8' : '#6b7280', fontSize: 20 }} />
                </Badge>
              </Box>
              <Box sx={{ maxHeight: 280, overflow: 'auto', pr: 1 }}>
                {mockData.activity.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <ActivityCard key={index} darkMode={darkMode}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                          width: 36, height: 36, borderRadius: '8px',
                          background: `${activity.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <IconComponent sx={{ color: activity.color, fontSize: 20 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="body2" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                              {activity.type}
                            </Typography>
                            <Chip
                              label={activity.severity}
                              size="small"
                              sx={{
                                height: 20, fontSize: '0.7rem',
                                background: `${activity.color}20`,
                                color: activity.color,
                              }}
                            />
                          </Box>
                          <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
                            {activity.description}
                          </Typography>
                          <Typography variant="caption" sx={{ color: darkMode ? '#6b7280' : '#9ca3af' }}>
                            {activity.time} • {activity.by}
                          </Typography>
                        </Box>
                      </Box>
                    </ActivityCard>
                  );
                })}
              </Box>
            </CardContent>
          </GlassCard>
        </Grid>

        {/* Device Usage & Quarterly Performance */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <GlassCard darkMode={darkMode}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 2 }}>
                    📱 Device Usage
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <ResponsiveContainer width="50%" height={180}>
                      <PieChart>
                        <Pie
                          data={mockData.pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {mockData.pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          contentStyle={{
                            background: darkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '8px',
                            border: `1px solid ${darkMode ? '#475569' : '#d1d5db'}`,
                            color: darkMode ? '#f1f5f9' : '#1e293b',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <Box sx={{ flex: 1 }}>
                      {mockData.pieData.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: item.color, mr: 1.5 }} />
                          <Box>
                            <Typography variant="body2" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
                              {item.value}%
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </GlassCard>
            </Grid>
            <Grid item xs={12}>
              <GlassCard darkMode={darkMode}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', mb: 2 }}>
                    📊 Quarterly Performance
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={mockData.quarterlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e2e8f0'} />
                      <XAxis dataKey="quarter" stroke={darkMode ? '#94a3b8' : '#6b7280'} fontSize={12} />
                      <YAxis stroke={darkMode ? '#94a3b8' : '#6b7280'} fontSize={12} tickFormatter={(value) => `${value/1000}K`} />
                      <RechartsTooltip
                        contentStyle={{
                          background: darkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                          borderRadius: '8px',
                          border: `1px solid ${darkMode ? '#475569' : '#d1d5db'}`,
                          color: darkMode ? '#f1f5f9' : '#1e293b',
                        }}
                        formatter={(value) => [formatNumber(value), 'Value']}
                      />
                      <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </GlassCard>
            </Grid>
          </Grid>
        </Grid>

        {/* AI Insights */}
        <Grid item xs={12} md={6}>
          <GlassCard darkMode={darkMode}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: '8px',
                  background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Insights sx={{ color: '#ffffff', fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                    🤖 AI Insights
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
                    Automated recommendations
                  </Typography>
                </Box>
              </Box>
              {mockData.insights.map((insight, index) => {
                const IconComponent = insight.icon;
                return (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      mb: 1.5,
                      borderRadius: '12px',
                      background: darkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(209, 213, 219, 0.2)',
                      border: `1px solid ${darkMode ? '#475569' : '#d1d5db'}`,
                      '&:hover': { background: darkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(209, 213, 219, 0.4)' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{
                        width: 32, height: 32, borderRadius: '8px',
                        background: `${insight.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <IconComponent sx={{ color: insight.color, fontSize: 18 }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                          {insight.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
                          {insight.value}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            </CardContent>
          </GlassCard>
        </Grid>

        {/* Recent Analytics Reports */}
        <Grid item xs={12}>
          <GlassCard darkMode={darkMode}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h5" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                    📋 Recent Reports
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
                    Latest dashboards and analytics projects
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    startIcon={<FilterAlt sx={{ fontSize: 18 }} />}
                    sx={{
                      textTransform: 'none',
                      color: darkMode ? '#e2e8f0' : '#6b7280',
                      background: darkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(209, 213, 219, 0.3)',
                      '&:hover': { background: darkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(209, 213, 219, 0.5)' },
                    }}
                  >
                    Filter
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      textTransform: 'none',
                      color: darkMode ? '#e2e8f0' : '#6b7280',
                      background: darkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(209, 213, 219, 0.3)',
                      '&:hover': { background: darkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(209, 213, 219, 0.5)' },
                    }}
                  >
                    View All
                  </Button>
                </Box>
              </Box>
              <Grid container spacing={2}>
                {mockData.reports.map((report, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Paper
                      sx={{
                        p: 2.5,
                        borderRadius: '12px',
                        background: darkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(209, 213, 219, 0.2)',
                        border: `1px solid ${darkMode ? '#475569' : '#d1d5db'}`,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                          background: darkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(209, 213, 219, 0.4)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        {report.favorite && <Star sx={{ color: '#f59e0b', fontSize: 16 }} />}
                        <Typography variant="h6" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b', flex: 1 }}>
                          {report.title}
                        </Typography>
                        <IconButton size="small" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip
                          label={report.status}
                          size="small"
                          sx={{
                            background: `${getStatusColor(report.status)}20`,
                            color: getStatusColor(report.status),
                            fontWeight: 500,
                            fontSize: '0.75rem',
                          }}
                        />
                        <Chip
                          label={report.priority}
                          size="small"
                          sx={{
                            background: `${getPriorityColor(report.priority)}20`,
                            color: getPriorityColor(report.priority),
                            fontWeight: 500,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                        {report.tags.map((tag, tagIndex) => (
                          <Chip
                            key={tagIndex}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.7rem',
                              height: 22,
                              borderColor: darkMode ? '#475569' : '#d1d5db',
                              color: darkMode ? '#94a3b8' : '#6b7280',
                            }}
                          />
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
                            Views
                          </Typography>
                          <Typography variant="body2" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                            {report.views}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" sx={{ color: darkMode ? '#94a3b8' : '#6b7280' }}>
                            Progress
                          </Typography>
                          <Typography variant="body2" fontWeight={600} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                            {report.progress}%
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={report.progress}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: darkMode ? '#374151' : '#e2e8f0',
                          mb: 2,
                          '& .MuiLinearProgress-bar': { backgroundColor: '#3b82f6', borderRadius: 3 },
                        }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: '#3b82f6' }}>
                            {report.author.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Box>
                            <Typography variant="caption" fontWeight={500} sx={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                              {report.author}
                            </Typography>
                            <Typography variant="caption" sx={{ color: darkMode ? '#94a3b8' : '#6b7280', display: 'block' }}>
                              {report.lastUpdated}
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          label={report.category}
                          size="small"
                          sx={{
                            fontSize: '0.7rem',
                            height: 22,
                            background: darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                            color: '#3b82f6',
                          }}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </GlassCard>
        </Grid>
      </Grid>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .MuiTooltip-tooltip {
          background: ${darkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)'} !important;
          border: 1px solid ${darkMode ? '#475569' : '#d1d5db'} !important;
          border-radius: 8px !important;
          color: ${darkMode ? '#f1f5f9' : '#1e293b'} !important;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: ${darkMode ? '#374151' : '#f1f5f9'};
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#6b7280' : '#d1d5db'};
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#9ca3af' : '#9ca3af'};
        }
      `}</style>
    </StyledContainer>
  );
}