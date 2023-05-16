import express from 'express'
import { getAllUsers, updateUser, addCategory } from '../controllers/admin.controller.js'
import { verifyToken } from '../middleware/jwt.js'
const router = express.Router()

router.get("/", verifyToken, getAllUsers)
router.put("/:id", verifyToken, updateUser)
router.post("/newcat", verifyToken, addCategory)

export default router