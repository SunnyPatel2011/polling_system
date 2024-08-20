const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const questionRouter = require('./routes/questions');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);

app.use('/', require('./routes'));
app.use('/questions', questionRouter)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
