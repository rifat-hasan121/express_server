import express from 'express';
import { userController } from './user.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/', userController.createUser);

router.get('/', auth('Admin'), userController.getUser);

router.get('/:id', auth('Admin', 'User'), userController.getSingleUser);

router.put('/:id', auth('Admin', 'User'), userController.updateUser);

router.delete('/:id', auth('Admin'), userController.deleteUser);


export const usersRoute= router;
