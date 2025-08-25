# ReqAI - AI-Powered Product Requirement Analysis

A comprehensive web application that uses multi-agent AI systems to analyze and refine product requirements.

## Features

- 🤖 **Multi-Agent AI Analysis**: Four specialized AI agents analyze different aspects of your product idea
- 🎨 **Beautiful UI**: Modern, responsive design with dark/light mode support
- 🔄 **Real-time Processing**: Live progress tracking and real-time updates
- 📊 **Comprehensive Results**: Detailed analysis with user stories, technical tasks, and risk assessment
- 🔐 **Authentication**: Secure user authentication with NextAuth.js
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Material-UI** - Component library
- **React Flow** - Interactive flow diagrams
- **Framer Motion** - Animations
- **NextAuth.js** - Authentication
- **Tailwind CSS** - Styling

### Backend
- **FastAPI** - Python web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Database (can be upgraded to PostgreSQL)
- **Google AI** - AI/ML services
- **Pydantic** - Data validation

## Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- npm or yarn

### 1. Clone and Setup Backend

```bash
cd Demo_Back

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export GOOGLE_API_KEY="your-google-api-key"
export OPENAI_API_KEY="your-openai-api-key"  # Optional

# Start backend server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Setup Frontend

```bash
cd new-project

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### 3. Test the Integration

```bash
# Test backend API
cd Demo_Back
python test_api.py

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### Backend
```env
GOOGLE_API_KEY=your-google-api-key
OPENAI_API_KEY=your-openai-api-key  # Optional
DATABASE_URL=sqlite:///./ai_council.db
SECRET_KEY=your-secret-key-change-in-production
```

## API Endpoints

### Core Endpoints
- `POST /refine/sync` - Synchronous product refinement
- `POST /refine` - Asynchronous product refinement
- `GET /refine/{session_id}` - Get refinement status
- `GET /refine` - List recent refinements
- `GET /health` - Health check

### Agent Endpoints
- `GET /refine/{session_id}/agents` - Get agent responses
- `GET /refine/{session_id}/debate` - Get debate data

## Usage

1. **Start Analysis**: Enter your product idea in the main input field
2. **Watch Progress**: Real-time progress tracking through the multi-agent workflow
3. **View Results**: Comprehensive analysis with actionable insights
4. **Export**: Results can be exported for development teams

## Architecture

### Frontend Architecture
