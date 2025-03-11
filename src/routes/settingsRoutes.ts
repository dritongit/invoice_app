import express from 'express';
import { SettingsController } from '../controllers/settings.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = express.Router();
const settingsController = new SettingsController();

router.get('/', authenticateJWT, settingsController.getSettingsById);
router.put('/:id', authenticateJWT, settingsController.updateSettings);

export default router;
