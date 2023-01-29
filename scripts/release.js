const { exec } = require('child-process-promise');
const path = require('path');
const { packages } = require('./packages');

const projectDir = path.resolve(__dirname, '..');
const packagesDir = path.resolve(projectDir, 'packages');

async function goToPath(path) {
    try {
        await exec(`cd ${path}`);
    } catch (error) {
        console.log(error);
    }
}

// goToPath(path.resolve(projectDir, "packages"))

async function release() {
    packages.forEach(async (pkg) => {
        const distPath = path.resolve(packagesDir, pkg.name, 'dist');
        const result = await exec(
            `cd ${distPath} && npm publish --access public`,
        );
        console.log(result);
    });
}

release();
