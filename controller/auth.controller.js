const pool = require("../lib/db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const authController = {

    signUp: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Validate request data
            if (!email || !password) {
                return res.status(400).json({ error: "All fields are required" });
            }

            // Check if user already exists
            const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

            if (users.length > 0) {
                return res.status(400).json({ error: "Email already exists!" });
            }

            // Hash the password
            const hash = await bcrypt.hash(password, 10);

            // Insert new user into the database
            const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
            const [result] = await pool.query(sql, [email, hash]);

            if (result.affectedRows > 0) {
                return res.status(201).json({ message: "User registered successfully" });
            } else {
                return res.status(500).json({ error: "Failed to register user" });
            }

        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ error: error.message });
        }
    },

    signIn: async (req, res) => {
        try {
            const { email, password } = req.body
            const [user,] = await pool.query("select * from users where email = ?", [email])
            if (!user[0]) return res.json({ error: "Invalid email!" })

            const { password: hash, id, name } = user[0]

            const check = await bcrypt.compare(password, hash)

            if (check) {
                const accessToken = jwt.sign({ userId: id }, '3812932sjad34&*@', { expiresIn: '1h' });
                return res.json({
                    accessToken,
                    data: {
                        name,
                        email
                    }
                })
            }
            return res.json({ error: "Wrong password!" })

        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },

    // Get All users
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from users")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },

    // Reset password
    resetPassword: async (req, res) => {
        const JWT_SECRET = process.env.JWT_KEY;
        const { email } = req.body;
        try {
            const [rows, fields] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
            if (rows.length === 0) {
                return res.status(404).json({ message: "Email not found" })
            }

            const token = jwt.sign({ id: rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
            const expiry = new Date();
            expiry.setHours(expiry.getHours() + 1);
            await pool.query('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?', [token, expiry, email]);

            // Send email
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'your-email@gmail.com',
                    pass: 'your-email-password'
                }
            });

            const mailOptions = {
                from: 'your-email@gmail.com',
                to: email,
                subject: 'Password Reset',
                text: `You requested for a password reset. Click the link below to reset your password:\n\nhttp://localhost:3000/reset-password/${token}`
            };

            transporter.sendMail(mailOptions);

            res.json({ message: 'Password reset link sent to your email' });

        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    resetPasswordToken: async (req, res) => {
        const { token } = req.params;
        const { password } = req.body;

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            const [rows] = await pool.query('SELECT * FROM users WHERE id = ? AND reset_token = ? AND reset_token_expiry > NOW()', [decoded.id, token]);

            if (rows.length === 0) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await pool.query('UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?', [hashedPassword, decoded.id]);

            res.json({ message: 'Password has been reset' });
        } catch (error) {
            res.status(400).json({ message: 'Invalid or expired token' });
        }
    }

};

module.exports = authController;
