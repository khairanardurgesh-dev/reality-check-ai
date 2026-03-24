import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true,
});

export interface AnalysisResult {
  personality: string;
  disciplineScore: number;
  moneyMindset: string;
  biggestProblem: string;
  futurePrediction: string;
  advice: string;
}

export interface UserAnswers {
  hoursWasted: number;
  wakesOnTime: boolean;
  consistentWithGoals: number;
  procrastinationFrequency: number;
  satisfiedWithIncome: boolean;
  disciplineLevel: number;
}

export const analyzeLife = async (answers: UserAnswers): Promise<AnalysisResult> => {
  const prompt = `You are a brutally honest life coach.

Based on the user's answers, give a direct, slightly harsh but realistic analysis.

User's answers:
- Hours wasted daily: ${answers.hoursWasted}/10
- Wakes on time: ${answers.wakesOnTime ? 'Yes' : 'No'}
- Consistent with goals: ${answers.consistentWithGoals}/10
- Procrastination frequency: ${answers.procrastinationFrequency}/10
- Satisfied with income: ${answers.satisfiedWithIncome ? 'Yes' : 'No'}
- Discipline level: ${answers.disciplineLevel}/10

Output format (valid JSON):
{
  "personality": "(1-2 lines, honest and slightly harsh)",
  "disciplineScore": (0-100),
  "moneyMindset": "(1-2 lines)",
  "biggestProblem": "(1 clear flaw)",
  "futurePrediction": "(what will happen if they don't change)",
  "advice": "(short, actionable, no fluff)"
}

Tone:
- Direct
- Honest
- Slightly harsh
- Relatable
- No sugarcoating`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a brutally honest life coach. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const result = JSON.parse(content);
    return result;
  } catch (error) {
    console.error('Error analyzing life:', error);
    // Fallback response
    return {
      personality: "You're struggling with basic discipline and consistency.",
      disciplineScore: 30,
      moneyMindset: "Your relationship with money needs serious work.",
      biggestProblem: "Lack of consistency and self-discipline",
      futurePrediction: "Without change, you'll remain stuck in mediocrity.",
      advice: "Start small. Pick one habit and master it before moving on."
    };
  }
};
