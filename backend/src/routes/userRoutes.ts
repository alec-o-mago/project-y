import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management endpoints
 */

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get current user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authMiddleware, getUser);

/**
 * @swagger
 * /user/me:
 *   patch:
 *     summary: Update current user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visibleName:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.patch('/me', authMiddleware, updateUser);

/**
 * @swagger
 * /user/me:
 *   delete:
 *     summary: Delete current user account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/me', authMiddleware, deleteUser);

export default router;
