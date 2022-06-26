import express, { Request, Response } from 'express';
import { Todo } from '../models/todo'

const router = express.Router();

/**
 * @openapi
 * /api/v1/todo:
 *   get:
 *     tags:
 *       - Todo
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: '#/components/schemas/Todo'
 * 
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.get('/api/v1/todo', async (_req: Request, res: Response) => {
  const todo = await Todo.find({});

  return res.status(200).send(todo);
});

/**
 * @openapi
 * /api/v1/todo/:title:
 *   get:
 *     tags:
 *       - Todo by title
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: The title of a Todo
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: '#/components/schemas/Todo'
 * 
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
 router.get('/api/v1/todo/:title', async (req: Request, res: Response) => {
  const todo = await Todo.find({'title': req.params.title}).lean();

  return res.status(200).send(todo);
});

router.post('/api/todo', async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const todo = Todo.build({ title, description });

  await todo.save();

  return res.status(201).send(todo);
});

export { router as todoRouter };
