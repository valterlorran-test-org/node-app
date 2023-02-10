require('dotenv').config()
const { OAuthApp } = require('@octokit/oauth-app')
const { createOAuthUserAuth } = require('@octokit/auth-oauth-user')
const { App, createNodeMiddleware } = require('octokit')
var prompt = require('prompt')

const { Octokit } = require('@octokit/core')
const { onToken, onPullRequestOpened } = require('./controllers')
const { loadPrivateKey } = require('./lib')

const auth = createOAuthUserAuth({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scopes: ['user', 'repo', 'codespace'],
    async onVerification(verification) {
        console.log('Open %s', verification.verification_uri)
        console.log('Enter code: %s', verification.user_code)

        await prompt.confirm('press enter when you are ready to continue')
    },
});

const app2 = new App({
    appId: process.env.APP_ID,
    privateKey: loadPrivateKey(),
    webhooks: { secret: process.env.WEBHOOK_SECRET },
    oauth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    }
});

app2.webhooks.on("pull_request.opened", onPullRequestOpened);

async function createToken() {
    const { token } = await auth()
    console.log(token)
}

async function run() {
    // createToken();
    // const token = process.env.MY_TOKEN_DEVICE

    // const octokit2 = new Octokit({
    //     auth: token,
    // });

    // console.log(octokit2)

    // const res2 = await octokit2.request(`POST /user/codespaces`, {
    //     location: 'WestUs2',
    //     pull_number: 3,
    //     repository_id: process.env.REPOSITORY_ID,
    // })
    // console.log(res2)
}
setTimeout(run, 1)

app2.oauth.on('token', onToken);

require('http').createServer(createNodeMiddleware(app2)).listen(4567)
