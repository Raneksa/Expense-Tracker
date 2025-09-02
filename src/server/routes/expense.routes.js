import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import multer from 'multer';
import path from 'path';
import { prisma } from '../index.js';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: req.user.userId }
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const expense = await prisma.expense.findFirst({
      where: { 
        id: req.params.id,
        userId: req.user.userId
      },
      include: { category: true }
    });
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, upload.single('receipt'), async (req, res) => {
  try {
    const { amount, date, categoryId, description, type, startDate, endDate } = req.body;
    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        categoryId,
        description,
        type: type || 'one-time',
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        receiptUrl: req.file?.path,
        userId: req.user.userId
      }
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, upload.single('receipt'), async (req, res) => {
  try {
    const expense = await prisma.expense.findFirst({
      where: { 
        id: req.params.id,
        userId: req.user.userId
      }
    });
    
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    
    const updateData = {
      ...req.body,
      amount: parseFloat(req.body.amount),
      date: new Date(req.body.date),
      startDate: req.body.startDate ? new Date(req.body.startDate) : null,
      endDate: req.body.endDate ? new Date(req.body.endDate) : null,
      receiptUrl: req.file?.path || expense.receiptUrl
    };

    const updated = await prisma.expense.update({
      where: { id: req.params.id },
      data: updateData
    });
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const expense = await prisma.expense.findFirst({
      where: { 
        id: req.params.id,
        userId: req.user.userId
      }
    });
    
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    
    await prisma.expense.delete({
      where: { id: req.params.id }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;