import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { prisma } from '../index.js';

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { userId: req.user.userId }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const category = await prisma.category.create({
      data: {
        name: req.body.name,
        userId: req.user.userId
      }
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;