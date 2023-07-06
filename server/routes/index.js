import { Router } from 'express';
import { VoiceCallRouter } from './voice-call-route.js';
import {
  manageRecordings,
  voiceResponse,
} from '../controllers/voice-call-controller.js';

const router = Router();

router.use('/call', VoiceCallRouter);
router.post('/voice', voiceResponse);
router.post('/recordings', manageRecordings);

export default router;
