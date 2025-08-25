// new-project/src/lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = '/api';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Health check
  async getHealth() {
    return this.request('/health');
  }

  // Get agents
  async getAgents() {
    return this.request('/agents');
  }

  // Get agent status
  async getAgentStatus(agentId) {
    return this.request(`/agents/${agentId}/status`);
  }

  // Process with agents
  async processWithAgents(agentIds, inputData) {
    return this.request('/agents/process', {
      method: 'POST',
      body: JSON.stringify({
        agent_ids: agentIds,
        input_data: inputData
      }),
    });
  }

  // Get recent refinements for chat history
  async getRecentRefinements(limit = 5) {
    return this.request(`/refine?limit=${limit}`);
  }

  // Refine product requirements
  async refineRequirements(data) {
    return this.request('/refine', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Get refinement by session ID
  async getRefinement(sessionId) {
    return this.request(`/refine/${sessionId}`);
  }

  // Get agents for a session
  async getSessionAgents(sessionId) {
    return this.request(`/refine/${sessionId}/agents`);
  }

  // Sync refinement
  async syncRefinement(sessionId) {
    return this.request(`/refine/sync`, {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId }),
    });
  }

  // Get agent responses for a session
  async getAgentResponses(sessionId) {
    return this.request(`/refine/${sessionId}/responses`);
  }

  // Get session debate
  async getSessionDebate(sessionId) {
    return this.request(`/refine/${sessionId}/debate`);
  }

  async analyzeProductChat(requirement, iterations = 2) {
    return this.request('/analyze/chat', {
      method: 'POST',
      body: JSON.stringify({
        requirement: requirement,
        iterations: iterations
      }),
    });
  }
}

export const apiService = new ApiService();
