const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// SQLite Bağlantısı
const db = new sqlite3.Database('favorites.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Tablo Oluştur
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS favorites (
    id TEXT PRIMARY KEY,
    name TEXT,
    image TEXT,
    description TEXT,
    facilities TEXT,
    note TEXT
  )
`;
db.run(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Favorites table created or already exists.');
  }
});

// Tüm Favorileri Getir
app.get('/favorites', (req, res) => {
  db.all('SELECT * FROM favorites', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const processedRows = rows.map(row => ({
        ...row,
        facilities: row.facilities ? row.facilities.split(',') : [],
      }));
      res.json(processedRows);
    }
  });
});

// Yeni Favori Ekle
app.post('/favorites', (req, res) => {
  const { id, name, image, description, facilities } = req.body;

  if (!id || !name || !image || !description) {
    return res.status(400).json({ error: 'All fields (id, name, image, description) are required.' });
  }

  const facilitiesAsString = Array.isArray(facilities) ? facilities.join(',') : '';

  db.run(
    'INSERT INTO favorites (id, name, image, description, facilities) VALUES (?, ?, ?, ?, ?)',
    [id, name, image, description, facilitiesAsString],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id, name, image, description, facilities });
      }
    }
  );
});

// Favoriyi Sil
app.delete('/favorites/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM favorites WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Favorite not found' });
    } else {
      res.status(200).json({ message: 'Favorite deleted successfully' });
    }
  });
});

// Hata Yakalama
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next();
});

// Sunucuyu Başlat
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});

// Veritabanı Bağlantısını Kapat
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing SQLite database:', err);
    } else {
      console.log('SQLite database connection closed.');
    }
    process.exit(0);
  });
});
