const { packages, BUILD_FOLDER } = require('./packages');
const fs = require('node:fs/promises');
const path = require('node:path');

const baseDir = path.resolve(__dirname, '../');
const packagesDir = path.join(baseDir, '/packages');

async function clean() {
    console.log('Cleaning dist');
    for (pkg of packages) {
        const distPath = path.resolve(
            packagesDir,
            pkg.name.toLowerCase(),
            BUILD_FOLDER,
        );
        try {
            console.log(`Removing ${distPath}`);
            await fs.rm(distPath, { force: true, recursive: true });
        } catch (error) {
            console.log(error);
        }
    }
    console.log('Cleaning .dec-temp');
    await fs.rm(path.join(baseDir, '/.dec-temp'), {
        force: true,
        recursive: true,
    });
}

clean();
