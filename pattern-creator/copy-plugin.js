const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'plugin.js');
const destination = path.join(__dirname, 'build/plugin.js');

fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error('Ошибка копирования plugin.js:', err);
    return;
  }
  console.log('plugin.js успешно скопирован в папку build.');
});
