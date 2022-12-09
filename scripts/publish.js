const { exec } = require("child-process-promise")
const path = require("path")

const projectDir = path.resolve(__dirname + "\\..")

async function goToPath(path) {
    try {
        await exec(`cd ${path}`)
    } catch (error) {
        console.log(error)
    }
}

goToPath(path.resolve(projectDir, "packages"))