const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Booking Backend API Çalışıyor');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
