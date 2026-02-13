/**
 * xAI Grok Integration Service
 * Provides access to Grok with web search, X search, and code execution
 */

interface XAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface XAIResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const XAI_API_KEY = (import.meta as any).env?.VITE_XAI_API_KEY || '';
const XAI_BASE_URL = 'https://api.x.ai/v1';

if (!XAI_API_KEY) {
  console.warn('VITE_XAI_API_KEY is not set. xAI features will be disabled.');
}

/**
 * Stream chat response from Grok with tool support
 */
export const streamGrokResponse = async (
  messages: XAIMessage[],
  onChunk: (text: string) => void,
  enableTools: boolean = true
): Promise<void> => {
  if (!XAI_API_KEY) {
    onChunk("\n\n*Error: xAI API Key not configured.*");
    return;
  }

  try {
    const tools = enableTools ? [
      {
        type: "function",
        function: {
          name: "web_search",
          description: "Search the web for current information",
          parameters: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "The search query"
              }
            },
            required: ["query"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "x_search",
          description: "Search X (Twitter) for posts and trends",
          parameters: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "The search query for X"
              }
            },
            required: ["query"]
          }
        }
      }
    ] : undefined;

    const response = await fetch(`${XAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${XAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages,
        tools,
        stream: true,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`xAI API error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));

      for (const line of lines) {
        const data = line.replace('data: ', '').trim();
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            onChunk(content);
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }
  } catch (error) {
    console.error("Grok Stream Error:", error);
    onChunk("\n\n*Error: Failed to connect to Grok API.*");
  }
};

/**
 * Non-streaming Grok request
 */
export const askGrok = async (
  messages: XAIMessage[],
  enableTools: boolean = true
): Promise<string> => {
  if (!XAI_API_KEY) {
    return "*Error: xAI API Key not configured.*";
  }

  try {
    const tools = enableTools ? [
      {
        type: "function",
        function: {
          name: "web_search",
          description: "Search the web for current information",
          parameters: {
            type: "object",
            properties: {
              query: { type: "string", description: "The search query" }
            },
            required: ["query"]
          }
        }
      }
    ] : undefined;

    const response = await fetch(`${XAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${XAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages,
        tools,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`xAI API error: ${response.status}`);
    }

    const data: XAIResponse = await response.json();
    return data.choices[0]?.message?.content || "No response from Grok.";
  } catch (error) {
    console.error("Grok Error:", error);
    return "*Error: Failed to get response from Grok.*";
  }
};

/**
 * Execute code using Grok's code execution capability
 */
export const executeCodeWithGrok = async (
  code: string,
  language: string = 'python'
): Promise<string> => {
  if (!XAI_API_KEY) {
    return "*Error: xAI API Key not configured.*";
  }

  try {
    const messages: XAIMessage[] = [
      {
        role: 'system',
        content: 'You are a code execution assistant. Execute the provided code and return the output.'
      },
      {
        role: 'user',
        content: `Execute this ${language} code and show the output:\n\n\`\`\`${language}\n${code}\n\`\`\``
      }
    ];

    return await askGrok(messages, true);
  } catch (error) {
    console.error("Code Execution Error:", error);
    return "*Error: Code execution failed.*";
  }
};

/**
 * Search the web using Grok
 */
export const searchWebWithGrok = async (query: string): Promise<string> => {
  if (!XAI_API_KEY) {
    return "*Error: xAI API Key not configured.*";
  }

  const messages: XAIMessage[] = [
    {
      role: 'system',
      content: 'You are a helpful assistant with web search capabilities. Provide accurate, up-to-date information.'
    },
    {
      role: 'user',
      content: `Search the web and answer: ${query}`
    }
  ];

  return await askGrok(messages, true);
};

/**
 * Check if xAI is configured
 */
export const isXAIConfigured = (): boolean => {
  return !!XAI_API_KEY;
};
