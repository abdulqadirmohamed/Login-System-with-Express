const express = require('express')
const bcrypt = require('bcrypt')
const jwb = require('jsonwebtoken')
const db = require('../lib/db')
const authController = {
    singUp: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const [user,] = await pool.query("select * from users where email = ?", [email])
            if (user[0]) return res.json({ error: "Email already exists!" })


            const hash = await bcrypt.hash(password, 10)

            const sql = "insert into users (username, email, password) values (?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [username, email, hash])

            if (rows.affectedRows) {
                return res.json({ message: "Ok" })
            } else {
                return res.json({ error: "Error" })
            }

        } catch (error) {
            console.log(error);
            res.json({ error: error.message })
        }
    },
    signIn: async (req, res) => {
        try {
            console.log('HELLO')
        } catch (error) {

        }
    },
    secretRoute: async (req, res) => {
        try {
            console.log('HELLO')
        } catch (error) {

        }
    }
}

module.exports = authController