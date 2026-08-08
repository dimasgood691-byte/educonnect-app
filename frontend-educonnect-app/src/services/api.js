export async function sendAiPrompt(prompt) {
    const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AI proxy request failed: ${errorText}`);
    }

    const data = await response.json();
    if (!data.output) {
        throw new Error('Respons AI proxy tidak valid atau kosong');
    }

    return data.output;
}
