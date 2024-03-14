const shell = require('shelljs')
const { exec } = require('child_process')
const { paths } = require('./install-docs-config.json')

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}

console.log('Installing flixel-docs to the following paths:')
console.log(paths.join('\n'))

const cwd = shell.pwd().stdout
console.log('Current folder: ' + cwd)

for (const path of paths) {
  installDocsToDir(cwd + path)
}

async function installDocsToDir (path) {
  if (shell.test('-e', path + '/.git')) {
    console.log('Updating flixel-docs in ' + path + '...')
    shell.cd(path)
    exec('git fetch --all', (err, stdout, _) => {
      if (err) {
        console.error(err)
        return
      }

      exec('git pull', (pullerr, pullstdout, _) => {
        if (pullerr) {
          console.error(pullerr)
          return
        }
        console.log(pullstdout.toString())
      })

      shell.cd(cwd)
    })
  } else {
    console.log('Cloning flixel-docs to ' + path + '...')
    exec('git clone --depth 1 --no-single-branch https://github.com/haxeflixel/flixel-docs ' + path)
  }
}
