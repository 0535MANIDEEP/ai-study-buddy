export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', service: 'ai-study-buddy' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text content is required' });
  }

  const prompt = `You are an expert study assistant. Given the following text/topic, generate study materials.

Content:
${text}

Generate study materials in this EXACT JSON format (no markdown, no code fences, just raw JSON):
{
  "summary": "Brief summary of the topic (1-2 sentences)",
  "flashcards": [
    {
      "front": "Question or concept prompt",
      "back": "Clear, concise answer or explanation"
    }
  ],
  "quiz": [
    {
      "question": "Multiple choice question about the content",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Why this answer is correct"
    }
  ]
}

Generate exactly 10 flashcards and 5 quiz questions.
Make flashcards concise but informative.
Make quiz questions test understanding, not just memorization.
Ensure correctIndex is always valid (0-3).
Only include clear, unambiguous correct answers.`;

  try {
    const response = await fetch(
      'https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'Mistral-Small-3.2-24B-Instruct-2506',
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: 0.4,
          max_tokens: 4096,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || `OVHcloud API error: ${response.status}`);
    }

    const textResponse = data.choices?.[0]?.message?.content || '';

    let materials;
    try {
      materials = JSON.parse(textResponse);
    } catch {
      const jsonMatch = textResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        materials = JSON.parse(jsonMatch[1].trim());
      } else {
        const objMatch = textResponse.match(/\{[\s\S]*\}/);
        if (objMatch) {
          materials = JSON.parse(objMatch[0]);
        } else {
          throw new Error('Could not parse AI response');
        }
      }
    }

    if (!materials.flashcards || !Array.isArray(materials.flashcards)) {
      materials.flashcards = [];
    }
    if (!materials.quiz || !Array.isArray(materials.quiz)) {
      materials.quiz = [];
    }

    return res.status(200).json(materials);
  } catch (error) {
    console.error('Generate error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate study materials' });
  }
}
