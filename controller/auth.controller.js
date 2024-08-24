const pool = require("../lib/db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

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

};

module.exports = authController;
