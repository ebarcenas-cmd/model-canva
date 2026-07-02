/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Initialize Gemini SDK lazily to prevent crashing on boot if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY variable is missing. Please set it in Settings > Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API Health route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Gemini Brainstorm Route
app.post('/api/brainstorm', async (req, res) => {
  try {
    const { businessDescription } = req.body;
    
    if (!businessDescription || typeof businessDescription !== 'string' || businessDescription.trim().length === 0) {
      res.status(400).json({ error: 'La descripción del negocio es requerida.' });
      return;
    }

    const ai = getAiClient();
    
    const prompt = `Genera un Business Model Canvas estructurado, detallado y creativo para la siguiente idea de negocio en español:
"${businessDescription}"

Crea entre 2 y 4 puntos específicos para cada bloque que sean sumamente relevantes para esta idea particular. No uses placeholders generales.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Eres un consultor experto en diseño de modelos de negocio y estrategia comercial utilizando la metodología Business Model Canvas de Alexander Osterwalder.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sociosClave: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Socios, proveedores y aliados estratégicos que complementan el negocio'
            },
            actividadesClave: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Acciones operativas esenciales que requiere la propuesta de valor'
            },
            recursosClave: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Recursos físicos, tecnológicos, intelectuales o humanos indispensables'
            },
            propuestasValor: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'El conjunto de productos y servicios con valor diferenciado para los clientes'
            },
            relacionesClientes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Cómo se capta, retiene y estimula la fidelización de clientes'
            },
            canales: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Medios a través de los cuales se comunica, entrega y vende la oferta'
            },
            segmentosClientes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Los nichos o grupos específicos de clientes ideales para la oferta'
            },
            estructuraCostos: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Los egresos principales, fijos y variables necesarios para operar'
            },
            fuentesIngresos: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Las vías de monetización y cobro, incluyendo formas de pago'
            }
          },
          required: [
            'sociosClave', 'actividadesClave', 'recursosClave', 'propuestasValor',
            'relacionesClientes', 'canales', 'segmentosClientes', 'estructuraCostos', 'fuentesIngresos'
          ]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error('El modelo de IA devolvió una respuesta vacía.');
    }

    const canvasData = JSON.parse(jsonText);
    res.json(canvasData);
  } catch (error: any) {
    console.error('Error in /api/brainstorm:', error);
    res.status(500).json({ 
      error: error.message || 'Error interno al comunicarse con Gemini API.',
      suggestApiKeySetup: !process.env.GEMINI_API_KEY
    });
  }
});

// Setup Vite Dev server or production static serving
async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite Dev server middleware mounted.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static asset serving configured.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
