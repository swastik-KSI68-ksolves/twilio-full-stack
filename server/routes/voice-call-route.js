import express from 'express';
import {
  generateTokenForP2PCall,
} from '../controllers/voice-call-controller.js';

const VoiceCallRouter = express.Router();
VoiceCallRouter.get('/voice-p2p-generate-token', generateTokenForP2PCall);

export { VoiceCallRouter };
