import { serve, env } from "bun";
import { Ollama } from "ollama";

const ollama = new Ollama({ host: `${env.OLLAMA_BASE_URL}` });

const server = serve({
    async fetch(req) {
        const headers = new Headers();
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");

        if (req.method === "OPTIONS") {
            return new Response(null, { headers });
        }
        
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
        }, { headers });
    },
    error(error) {
        return new Response(`${error.message}`, { status: 400 });
    },
    port: env.SERVER_PORT,
    idleTimeout: 0
});

console.log(`Listening on ${server.url} ...`);
