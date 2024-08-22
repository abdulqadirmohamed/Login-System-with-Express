const pool = require("../lib/db");
const bcrypt = require('bcrypt');

const authController = {

    signUp: async (req, res) => {
        try {
            const {email, password } = req.body;

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
    }

};

module.exports = authController;
