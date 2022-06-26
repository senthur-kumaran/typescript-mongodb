import { model, Schema, Document, Model } from 'mongoose';

interface ITodo {
  title: string;
  description: string;
}

interface TodoDoc extends Document {
  title: string;
  description: string;
}

interface TodoModelInterface extends Model<TodoDoc> {
  build(attr: ITodo): TodoDoc
}

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

todoSchema.statics.build = (attr: ITodo) => {
  return new Todo(attr);
}

/**
 * @openapi
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         title:
 *           type: string
 *           example: "Todo Title 1" 
 *         description:
 *           type: string
 *           example: "Todo Description 1"
 */
const Todo = model<TodoDoc, TodoModelInterface>('Todo', todoSchema);

export { Todo };
