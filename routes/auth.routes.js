const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/user');

const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length 6 characters')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            // check data correctness
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({
                        errors: errors.array(),
                        message: 'Incorrect registration data'
                    });
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email });

            // check if user already exists
            if (candidate) {
                return res
                    .status(400)
                    .json({ message: 'User with such email already exists' });
            }

            // create new user with hashed password
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();

            res.status(201)
                .json({ message: 'User is successfully created' });

        } catch (e) {
            console.log(e);
            res.status(500)
                .json({ message: 'Something is went terribly wrong, please try again' });
        }
    }
);

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Please enter a valid email')
            .normalizeEmail()
            .isEmail(),
        check('password', 'Please enter the password')
            .exists()
    ],
    async (req, res) => {

        try {
            const errors = validationResult(req);

            // check correctness of data login
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({
                        errors: errors.array(),
                        message: 'Incorrect login data '
                    });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            // check if user exists
            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'User is not found' })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            // check if password is matching
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: 'Invalid password, please try again' });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            );

            res.json({ token, userId: user.id });


        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Something is went terribly wrong, please try again' });
        }
    }
);

module.exports = router;