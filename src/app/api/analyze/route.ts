import { NextRequest, NextResponse } from 'next/server';
import { analyzeLife, UserAnswers } from '@/utils/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const answers: UserAnswers = body.answers;

    if (!answers) {
      return NextResponse.json(
        { error: 'Answers are required' },
        { status: 400 }
      );
    }

    const result = await analyzeLife(answers);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze answers' },
      { status: 500 }
    );
  }
}
