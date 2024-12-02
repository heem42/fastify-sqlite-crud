import { FastifyInstance } from 'fastify';

import db from './database.js';
import { Todo } from './types.js';

async function todoRoutes(fastify: FastifyInstance) {
  // Get all todos
  fastify.get('/todos', async (_request, reply) => {
    return new Promise<Todo[]>((resolve, reject) => {
      db.all('SELECT * FROM todos', [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows as Todo[]);
      });
    });
  });

  // Get a single todo by id
  fastify.get('/todos/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    return new Promise<Todo | undefined>((resolve, reject) => {
      db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row as Todo);
      });
    });
  });

  // Create a new todo
  fastify.post('/todos', async (request, reply) => {
    const { task } = request.body as { task: string };
    return new Promise<Todo>((resolve, reject) => {
      db.run('INSERT INTO todos (task) VALUES (?)', [task], function (err) {
        if (err) {
          reject(err);
        }
        resolve({ id: this.lastID, task, completed: false });
      });
    });
  });

  // Update an existing todo
  fastify.put('/todos/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    const { task, completed } = request.body as { task: string, completed: boolean };
    return new Promise<Todo>((resolve, reject) => {
      db.run(
        'UPDATE todos SET task = ?, completed = ? WHERE id = ?',
        [task, completed, id],
        function (err) {
          if (err) {
            reject(err);
          }
          resolve({ id, task, completed });
        }
      );
    });
  });

  // Delete a todo
  fastify.delete('/todos/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    return new Promise<{ message: string }>((resolve, reject) => {
      db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        }
        resolve({ message: `Todo with ID ${id} deleted` });
      });
    });
  });
}

export default todoRoutes;
