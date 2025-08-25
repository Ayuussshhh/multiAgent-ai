import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { agentId } = params;
    
    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:8000'}/agents/${agentId}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Agent status API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agent status' },
      { status: 500 }
    );
  }
}
