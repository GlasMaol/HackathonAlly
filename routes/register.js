import { Router } from 'express';
import userSchema from '../models/userModel.js';
import { database } from '../server.js';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const { error } = userSchema.validate(req.body);
        
        if (error) return res.status(400).send(error.details[0].message);

        const { username, password } = req.body;

        // Kontrollera om användarnamnet redan finns
        const existingUser = await database.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Användarnamnet är redan taget' });

        const newUser = await database.insert({ username, password });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default router;