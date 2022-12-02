const { exec } = require("node:child_process")
const pkg = require("./_package.json")

const baseDir = process.cwd();
const distDir = `${baseDir}/dist`

function executeCommands(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) console.log(`Error:- ${error}`)
        if (stdout) console.log(`Error:- ${stdout}`)
        if (stderr) console.log(`Error:- ${stderr}`)
    })
}

executeCommands(`cp ${baseDir}/scripts/_package.json ${distDir}/package.json`)
executeCommands(`cp ${baseDir}/README.md ${distDir}/`)