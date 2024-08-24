const express = require('express');
const app = express();
const authRouter = require('./routes/auth.router')



const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
