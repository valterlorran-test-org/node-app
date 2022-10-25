/**
 * Create GitHub App comment with octokit
 */
async function createGitHubAppComment(octokit, issueNumber, body) {
    return await octokit.rest.issues.createComment({
        owner: process.env.REPOSITORY_OWNER,
        repo: process.env.REPOSITORY_NAME,
        issue_number: issueNumber,
        body: body,
    });
};

module.exports = {
    createGitHubAppComment,
}