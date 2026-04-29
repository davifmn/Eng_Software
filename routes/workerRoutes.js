import express from 'express';
import { Worker } from '../packages/worker.js';

const router = express.Router();

// Rota para buscar todos os trabalhadores
router.get('/', async (req, res) => {
    try {
        // Busca todos os workers, retornando apenas nome e especialidades
        const workers = await Worker.find({}, 'name specialties');
        res.json(workers);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar especialistas' });
    }
});

export default router;