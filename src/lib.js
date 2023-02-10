const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/core')

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

    const token = process.env.MY_TOKEN_DEVICE

    const octokit2 = new Octokit({
        auth: token,
    });

    return await octokit2.request(`POST /user/codespaces`, {
        location: 'WestUs2',
        // pull_number: pull_number,
        repository_id: process.env.REPOSITORY_ID,
        pull_request: {
            pull_request_number: pull_number,
            repository_id: parseInt( repository_id ),
        },
    })

    // console.log( {
    //     pull_number,
    //     repository_id
    // } )
    // return await octokit.request(`POST /user/codespaces`, {
    //     location: 'WestUs2',
    //     pull_number: pull_number,
    //     repository_id: parseInt( repository_id ),
    // } )

    // return await octokit.rest.codespaces.createForAuthenticatedUser( {
    //     repository_id: parseInt( repository_id ),
    //     pull_request: {
    //         pull_request_number: pull_number,
    //         repository_id: parseInt( repository_id ),
    //     },
    // } )
}


module.exports = {
    createAppLink,
    createLinkComment,
    getAppPort,
    loadPrivateKey,
    createGitHubCodespaces,
}