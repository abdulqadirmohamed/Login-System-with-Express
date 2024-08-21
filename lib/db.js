const mysql = require('mysql2')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "auth",
    port: 3000
})

db.getConnection((error, conn)=>{
    if(error){
        console.log(error)
    }else{
        console.log('connection successfully')
    }
})

module.exports = db.promise()