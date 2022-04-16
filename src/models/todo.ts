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

const Todo = model<TodoDoc, TodoModelInterface>('Todo', todoSchema);

export { Todo };
