import { Router } from 'express'
import userSchema from './../models/userModel.js';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../services/users.js'

const router = Router()

// GET | Hämta alla användare
router.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.json({ users: users })
})

// GET | Hämta specefik user
router.get('/:id', async (req, res) => {
    const user = await getUserById(req.params.id)
    res.json({ user: user })
})

// POST | Lägg till ny user
router.post('/', (req, res) => {
    const { error } = userSchema.validate(req.body);
    
    if (error) {
        const response = {
            success: false,
            message: error.details[0].message,
            status: 400
        };
        return res.status(400).json(response); // Skicka felaktigt svar direkt och avsluta funktionen
    } else {
        const newUser = createUser(req.body);
        return res.status(201).json({ user: newUser }); // Skicka korrekt svar och avsluta funktionen
    }
});

// PUT | Uppdatera specefik user
router.put('/:id', (req, res) => {
    updateUser(req.params.id, req.body)
    res.json({ message: `Successfully updated user` })
})

// DELETE | Ta bort specefik user
router.delete('/:id', async (req, res, next) => {
    try {
        const deleted = await deleteUser(req.params.id);
        if (deleted) {
            res.json({ message: 'Successfully deleted user' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
});



export default router