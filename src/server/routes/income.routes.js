import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { prisma } from '../index.js';

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const incomes = await prisma.income.findMany({
      where: { userId: req.user.userId }
    });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { amount, date, source, description } = req.body;
    const income = await prisma.income.create({
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        source,
        description,
        userId: req.user.userId
      }
    });
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;