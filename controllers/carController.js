// controllers/carController.js
const db = require('../database');

exports.getAllCars = (req, res) => {
  db.all('SELECT * FROM cars', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.getCarById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM cars WHERE id = ?', [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Car not found' });
      }
      res.json(row);
    });
  };

exports.createCar = (req, res) => {
  const { plateNumber, carBrand } = req.body;
  db.run(
    'INSERT INTO cars (plateNumber, carBrand) VALUES (?, ?)',
    [plateNumber, carBrand],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.updateCar = (req, res) => {
    const { id } = req.params;
    const { plateNumber, carBrand } = req.body;
    db.run(
      'UPDATE cars SET plateNumber = ?, carBrand = ? WHERE id = ?',
      [plateNumber, carBrand, id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
          return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car updated successfully' });
      }
    );
  };

exports.deleteCar = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM cars WHERE id = ?', id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ changes: this.changes });
  });
};
