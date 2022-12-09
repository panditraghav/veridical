const { packages } = require("./packages")
const fs = require("fs")
const path = require("path")

const projectDir = path.resolve(`${__dirname}\\..`)
const projectPackageJsonPath = path.resolve(projectDir, "package.json")

function getVeridicalVersion() {
    let pkg = fs.readFileSync(projectPackageJsonPath)
    pkg = JSON.parse(pkg)
    return pkg.version;
}
function setVersion(pkgJsonPath, version) {
    let pkg = fs.readFileSync(pkgJsonPath)
    pkg = JSON.parse(pkg)
    pkg.version = version
    pkg = JSON.stringify(pkg, null, 4)
    fs.writeFileSync(pkgJsonPath, pkg)
}
function updateVersion() {
    const veridicalVersion = getVeridicalVersion()
    packages.forEach(async pkg => {
        const pkgJsonPath = path.resolve(projectDir, "packages", pkg.name, "package.json")
        setVersion(pkgJsonPath, veridicalVersion)
    })
}
updateVersion()