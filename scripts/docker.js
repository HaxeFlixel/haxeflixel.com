const execSync = require('child_process').execSync
const args = process.argv.slice(2)
const IMAGE_NAME = 'haxeflixel.com'
const BUILD_CONTAINER_NAME = 'haxeflixel.com-build-container'
const WATCH_CONTAINER_NAME = 'haxeflixel.com-watch-container'

if (args.indexOf('buildImage') > -1) buildImage()
if (args.indexOf('buildSite') > -1) buildSite()
if (args.indexOf('runBuildImage') > -1) runBuildImage()
if (args.indexOf('removeBuildImage') > -1) removeBuildImage()
if (args.indexOf('watchSite') > -1) watchSite()
if (args.indexOf('runShell') > -1) runShell()

function buildImage() {
    execSync(`docker build -t ${IMAGE_NAME} .`, {stdio: [0, 1, 2]})
    // execSync(`docker build --no-cache -t ${IMAGE_NAME} .`, {stdio: [0, 1, 2]})
}

function runShell() {
    execSync(`docker run -ti ${IMAGE_NAME} /bin/bash`, {stdio: [0, 1, 2]})
}

function runBuildImage() {
    removeBuildImage()
    var containerID = execSync(`docker run --name="${BUILD_CONTAINER_NAME}" -dti ${IMAGE_NAME} bash`).toString().replace('\n', '')
    console.log(`Created container ${BUILD_CONTAINER_NAME} ${containerID}`)
    return containerID
}

function buildSite() {
    execSync('rm -rf ./out')
    runBuildImage()
    execSync(`docker exec -ti ${BUILD_CONTAINER_NAME} bash -c "npm run build"`, {stdio: [0, 1, 2]})
    execSync(`docker cp ${BUILD_CONTAINER_NAME}:/usr/src/app/out ./out`)
    // copy the images from the docs repo manually :(
    execSync(`docker cp ${BUILD_CONTAINER_NAME}:/usr/src/app/out/documentation/documentation/images ./out/documentation`)
    removeBuildImage()
}

function watchSite() {
    execSync(`docker rm -f ${WATCH_CONTAINER_NAME} &> /dev/null || true`)
    var containerID = execSync(`docker run -p 9778 --name="${WATCH_CONTAINER_NAME}" -dti ${IMAGE_NAME} bash`).toString().replace('\n', '')
    var ip = execSync(`docker inspect --format '{{ .NetworkSettings.IPAddress }}' ${containerID}`).toString().replace('\n', '')
    console.log(`Docpad site running on:${ip}:9778`)
    execSync(`docker exec -ti ${WATCH_CONTAINER_NAME} bash -c "npm run watch"`, {stdio: [0, 1, 2]})
}

function removeBuildImage() {
    console.log(`removing container with name ${BUILD_CONTAINER_NAME}`)
    execSync(`docker rm -f ${BUILD_CONTAINER_NAME} &> /dev/null || true`)
}