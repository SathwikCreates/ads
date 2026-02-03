import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const result = await streamText({
        model: openai('gpt-4-turbo'),
        system: 'You are an expert ad copywriter and marketing strategist.',
        prompt: `Generate a high-converting ad campaign concept for: ${prompt}.
    
    Provide the response in the following Markdown format:
    
    ## Ad Concept
    [Brief summary of the hook and angle]
    
    ## Target Audience
    [Who this ad targets]
    
    ## Script / Copy
    [The actual text or script for the ad]
    
    ## visual Concept
    [Detailed description of the image or video visuals to accompany the ad. This will be used for image generation.]
    
    ## Recommended Platform
    [YouTube / Meta / Google]
    `,
    });

    return result.toTextStreamResponse();
}
