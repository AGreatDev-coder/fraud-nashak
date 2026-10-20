import express from 'express';
import { getGraphTopology } from '../controllers/graphController.js';

const router = express.Router();

router.get('/topology', getGraphTopology);

export default router;
