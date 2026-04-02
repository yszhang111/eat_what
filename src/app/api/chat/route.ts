import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Read the base prompt
    const promptPath = path.join(process.cwd(), 'src', 'data', 'base_prompt.md');
    const basePrompt = fs.readFileSync(promptPath, 'utf-8');

    const systemMessage = {
      role: 'system',
      content: basePrompt
    };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not set' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-5.4',
        messages: [systemMessage, ...messages],
        stream: true,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: response.status });
    }

    // Handle streaming response
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          controller.close();
          return;
        }
        const reader = response.body.getReader();
        let buffer = ''; // Buffer for incomplete lines

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Decode and append to buffer
            buffer += decoder.decode(value, { stream: true });

            // Split by newlines
            const lines = buffer.split('\n');

            // Keep the last potentially incomplete line in the buffer
            buffer = lines.pop() || '';

            // Process complete lines
            for (const line of lines) {
              if (line.trim() === '') continue;

              if (line.startsWith('data: ')) {
                const data = line.slice(6).trim();

                if (data === '[DONE]') {
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || '';
                  if (content) {
                    controller.enqueue(encoder.encode(content));
                  }
                } catch (e) {
                  // Skip invalid JSON silently
                  console.error('JSON parse error:', e, 'Data:', data.substring(0, 100));
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
        } finally {
          controller.close();
        }
      }
    });

    return new NextResponse(stream);

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
