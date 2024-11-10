const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// JSON veri işleme
app.use(express.json());

// Rotaları ekleyin
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

// Ana rota
app.get('/', (req, res) => {
  res.send('Booking Backend API Çalışıyor');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
