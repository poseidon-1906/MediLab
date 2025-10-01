import express from 'express';
import { chatController } from '../controllers/aiController.js';

// Créer une instance de routeur
const router = express.Router();

// Définir la route de chat
// POST /api/v1/ai/chat
router.post('/chat', chatController);

export default router;
