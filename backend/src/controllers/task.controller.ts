import type { Request, Response } from 'express';
import { completeTask, createTask, deleteTask, getTaskById, getTasks, updateTask } from '../services/task.service.js';

const getTaskIdParam = (req: Request): string => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  return id ?? '';
};

export const listTasks = async (_req: Request, res: Response): Promise<void> => {
  const result = await getTasks(res.locals.taskQuery);
  res.status(200).json(result);
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
  const task = await getTaskById(getTaskIdParam(req));
  res.status(200).json({ data: { task } });
};

export const postTask = async (req: Request, res: Response): Promise<void> => {
  const task = await createTask(req.body.title as string);
  res.status(201).json({ data: { task } });
};

export const markTaskComplete = async (req: Request, res: Response): Promise<void> => {
  const task = await completeTask(getTaskIdParam(req));
  res.status(200).json({ data: { task } });
};

export const patchTask = async (req: Request, res: Response): Promise<void> => {
  const task = await updateTask(getTaskIdParam(req), res.locals.taskUpdate);
  res.status(200).json({ data: { task } });
};

export const removeTask = async (req: Request, res: Response): Promise<void> => {
  await deleteTask(getTaskIdParam(req));
  res.status(204).send();
};