const { createGitHubAppComment } = require("./bot");
const { createGitHubCodespaces, createAppLink, createLinkComment } = require("./lib");

async function onPullRequestOpened({ octokit, payload }) {
    const issueNumber = payload.number;
    const codespace = await createGitHubCodespaces(octokit, issueNumber, process.env.REPOSITORY_ID);
    const appLink = createAppLink(codespace);
    const body = createLinkComment(appLink);
    await createGitHubAppComment(octokit, issueNumber, body);
}

async function onToken(payload) {
    const { octokit } = payload;
    const { data } = await octokit.request("GET /user");
    console.log(`Token retrieved for ${data.login}`);
}

module.exports = {
    onToken,
    onPullRequestOpened
}