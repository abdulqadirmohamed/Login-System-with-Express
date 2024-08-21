const express = require('express');
const app = express();
const authRouter = require('./routes/auth.router')

// Define routes and middleware here
// ...

const PORT = process.env.PORT || 3000;

app.use('/api', authRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
