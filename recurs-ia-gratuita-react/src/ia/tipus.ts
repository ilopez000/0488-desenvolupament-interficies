// Un missatge de la conversa, en el format que entenen totes les APIs
// compatibles amb OpenAI (Groq, Gemini, OpenRouter…).
//  - system:    instruccions per a la IA (qui és i com ha de respondre)
//  - user:      el que escriu l'usuari
//  - assistant: el que ha respost la IA
export type Missatge = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// Forma de la resposta quan NO fem streaming (només el que fem servir)
export type RespostaIA = {
  choices: { message: { content: string | null } }[];
};

// Forma de cada tros quan SÍ fem streaming
export type TrosIA = {
  choices?: { delta?: { content?: string | null } }[];
  error?: { message?: string };
};
