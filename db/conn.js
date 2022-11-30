const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('toughts', 'root', '', {
  host: 'localhost',
  dialect:'mysql'
});

try {
  sequelize.authenticate();
  console.log('Connected to database');
} catch (err) {
  console.error('Could not connect to database:', err);
}

module.exports = sequelize;