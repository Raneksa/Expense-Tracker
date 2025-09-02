import { z } from 'zod';

const expenseSchema = z.object({
  amount: z.number().positive(),
  date: z.string().datetime(),
  categoryId: z.string().uuid(),
  description: z.string().optional(),
  type: z.enum(['one-time', 'recurring']),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional()
});

export const validateExpense = (req, res, next) => {
  try {
    expenseSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};