const execSync = require('child_process').execSync

// All the required env vars
const DEPLOY_HOST = process.env['DEPLOY_HOST']
const DEPLOY_PORT = process.env['DEPLOY_PORT']
const DEPLOY_USER = process.env['DEPLOY_USER']
const execOptions = process.env['DEBUG_EXEC'] ? { stdio: [0, 1, 2] } : {}
var DEPLOY_KEY = process.env['DEPLOY_KEY']
var SOURCE_DIR = process.env['SOURCE_DIR']
var GIT_BRANCH = process.env['GIT_BRANCH']

const isTravis = 'TRAVIS' in process.env && 'CI' in process.env
if (isTravis) {
    const TRAVIS_BUILD_DIR = process.env['TRAVIS_BUILD_DIR']
    DEPLOY_KEY = `${TRAVIS_BUILD_DIR}/scripts/deploy`
    SOURCE_DIR = `${TRAVIS_BUILD_DIR}/out`
    GIT_BRANCH = process.env['TRAVIS_BRANCH']
}

if (/dev|master|feature/.test(GIT_BRANCH)) {
    try {
        const rsyncCommand = `rsync -e "ssh -oStrictHostKeyChecking=no -i ${DEPLOY_KEY} -p ${DEPLOY_PORT}" ` +
            `--delete -avr ${SOURCE_DIR} ${DEPLOY_USER}@${DEPLOY_HOST}:${GIT_BRANCH}`
        console.log(`Deploying to haxeflixel.com from branch ${GIT_BRANCH}`)

        execSync(rsyncCommand, execOptions)
        console.log(`rsync command completed`)

    } catch (error) {
        console.error('error with the rsync command')
        console.error(error)
    }
} else {
    console.error(`Cannot deploy from ${GIT_BRANCH} branch, only dev|master|feature is supported`)
}
