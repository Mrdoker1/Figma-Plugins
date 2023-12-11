const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build/static/js');
const manifestPath = path.join(__dirname, 'build/manifest.json'); // Обновлённый путь к манифесту

// Поиск файла бандла
fs.readdir(buildDir, (err, files) => {
  if (err) {
    console.error('Ошибка при чтении директории сборки:', err);
    return;
  }

  const mainBundleFile = files.find(file => file.startsWith('main.') && file.endsWith('.js'));

  if (mainBundleFile) {
    updateManifest(mainBundleFile);
  } else {
    console.error('Файл бандла не найден.');
  }
});

function updateManifest(bundleFileName) {
  fs.readFile(manifestPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка при чтении файла манифеста:', err);
      return;
    }

    const manifest = JSON.parse(data);
    manifest.main = `static/js/${bundleFileName}`; // Обновление пути к бандлу

    fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Ошибка при записи файла манифеста:', err);
      } else {
        console.log('Манифест обновлён.');
      }
    });
  });
}
