import { Router } from "express";
import { VoiceCallRouter } from "./voice-call-route.js";
import {
  handleCallStatus,
  manageRecordingStatus,
  manageRecordings,
  messageResponse,
  voiceResponse,
} from "../controllers/voice-call-controller.js";

const router = Router();

router.use("/call", VoiceCallRouter);
router.post("/voice", voiceResponse);
router.post("/sms", messageResponse);
router.post("/status", handleCallStatus);
router.post("/recordings", manageRecordings);
router.post("/recording-status-callback", manageRecordingStatus);

export default router;
