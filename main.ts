import { serve, env } from "bun";
import { Ollama } from "ollama";

const ollama = new Ollama({ host: `${env.OLLAMA_BASE_URL}` });

const server = serve({
    port: env.SERVER_PORT,
    idleTimeout: 0,
    async fetch(req) {
        const { prompt } = await req.json();

        if (!prompt) {
            throw new Error("Prompt not found ...");
        }
        
        const response = await ollama.chat({
            model: env.OLLAMA_MODEL!,
            messages: [{ role: 'user', content: prompt }]
        });

        return Response.json({
            response: response.message.content
        });
    },
    error(error) {
        return new Response(`${error.message}`, { status: 400 });
    }
});

console.log(`Listening on ${server.url} ...`);
