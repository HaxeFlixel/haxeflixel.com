const execSync = require('child_process').execSync

const TRAVIS_BRANCH = process.env['TRAVIS_BRANCH']
const TRAVIS_BUILD_DIR = process.env['TRAVIS_BUILD_DIR']
const DEPLOY_PORT = process.env['DEPLOY_PORT']
const DEPLOY_USER = process.env['DEPLOY_USER']

const rsyncCommand = `rsync -e "ssh -oStrictHostKeyChecking=no -i ${TRAVIS_BUILD_DIR}/rrsync_haxeflixel -p ${DEPLOY_PORT}" --delete -avr ${TRAVIS_BUILD_DIR}/out ${DEPLOY_USER}@${DEPLOY_HOST}:${TRAVIS_BRANCH}`

if(/dev|master|deploy-test/.test(TRAVIS_BRANCH)) {
  console.log(`Deploying to haxeflixel.com from branch ${TRAVIS_BRANCH}`)
  try {
    var command = execSync(rsyncCommand)
    console.log(`rsync command completed with ${command}`)
  } catch (error) {
    console.error('error with the rsync command')
    console.error(error)
  }
} else {
  console.log('Not deploying')
}
