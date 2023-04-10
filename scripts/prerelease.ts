import { exec } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const baseDir = path.resolve('');

function createPackageJson() {
    const mainPkgJsonBuf = readFileSync(path.resolve(baseDir, 'package.json'));
    const mainPkgJson = JSON.parse(mainPkgJsonBuf.toString());
    const tempPkgJsonBuf = readFileSync(
        path.resolve(baseDir, 'scripts', 'package.temp.json'),
    );
    const tempPkgJson = JSON.parse(tempPkgJsonBuf.toString());
    tempPkgJson['dependencies'] = mainPkgJson['dependencies'];
    tempPkgJson['version'] = mainPkgJson['version'];
    writeFileSync(
        path.resolve(baseDir, 'dist', 'package.json'),
        JSON.stringify(tempPkgJson, null, 4),
    );
}

function copyReadme() {
    const readmePath = path.resolve(baseDir, 'README.md');
    const destPath = path.resolve(baseDir, 'dist');
    exec(`cp ${readmePath} ${destPath}`);
}

createPackageJson();
copyReadme();
