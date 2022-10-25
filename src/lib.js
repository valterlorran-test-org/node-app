const fs = require('fs');
const path = require('path');

/**
 * Get app port
 *
 * @returns {number|string}
 */
function getAppPort() {
    return process.env.APP_PORT || 80
}

/**
 * Create app link from the codespaces response of the API
 *
 * @param {object} response
 */
function createAppLink(response) {
    return response.data.web_url.replace(
        '.github.dev',
        `-${getAppPort()}.preview.app.github.dev`
    )
}

/**
 * Create the comment with the Link for testing WordPress.
 *
 * @return {string}
 */
function createLinkComment(appLink) {
    return `Here's the link for testing this PR: ${appLink}`;
}


/**
 * Load private key from pem file
 */
function loadPrivateKey() {
    return fs.readFileSync(path.resolve(__dirname, '../private-key.pem'), 'utf-8')
}

/**
 * Create GitHub codespaces
 */
async function createGitHubCodespaces(octokit, pull_number, repository_id) {
    return await octokit.request(`POST /user/codespaces`, {
        location: 'WestUs2',
        pull_number: pull_number,
        repository_id: repository_id,
    })
}


module.exports = {
    createAppLink,
    createLinkComment,
    getAppPort,
    loadPrivateKey,
    createGitHubCodespaces,
}