const fs = require("fs/promises")
const path = require('path')
const { packages } = require("./packages")

const PROJECT_DIR = `${__dirname}\\..`
const PACKAGES_DIR = "packages"
const DECLERATION_DIR = path.resolve(PROJECT_DIR, ".dec-temp")
const SRC_DIR = "src"
const DIST_DIR = "dist"

function getPackageJsonPath(packageName) {
    return path.resolve(PROJECT_DIR, PACKAGES_DIR, packageName, "package.json")
}
function getDistPath(packageName) {
    return path.resolve(PROJECT_DIR, PACKAGES_DIR, packageName, DIST_DIR)
}

async function copyPackageJson() {
    console.log("Copying package.json[s]")
    packages.forEach(async pkg => {
        const pkgJsonPath = getPackageJsonPath(pkg.name)
        const distDirPath = getDistPath(pkg.name)
        console.log(`copying ${pkgJsonPath} to ${distDirPath}`)
        await fs.copyFile(pkgJsonPath, `${distDirPath}\\package.json`)
    })
}

async function copyDeclarations() {
    console.log("\nCopying declaration")
    packages.forEach(async pkg => {
        const declarationSourceDir = path.resolve(DECLERATION_DIR, pkg.name, SRC_DIR)
        const declarationDestinationOutput = path.resolve(getDistPath(pkg.name), "dts")
        console.log(`copyting ${declarationSourceDir} to ${declarationDestinationOutput}`)
        await fs.cp(declarationSourceDir, declarationDestinationOutput, { force: true, recursive: true })
    })
}

async function copyReadme() {
    packages.forEach(async pkg => {
        let readmeSrc, readmeDest
        readmeDest = path.resolve(getDistPath(pkg.name), "README.md")
        if (pkg.name == "veridical") {
            readmeSrc = path.resolve(PROJECT_DIR, "README.md")
        } else {
            readmeSrc = path.resolve(PROJECT_DIR, PACKAGES_DIR, pkg.name, "README.md")
        }
        console.log(`copying ${readmeSrc} to ${readmeDest}`)
        await fs.cp(readmeSrc, readmeDest, { force: true, recursive: true })
    })

}

async function prepareRelease() {
    await copyPackageJson()
    await copyDeclarations()
    await copyReadme()
}

prepareRelease()