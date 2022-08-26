require('dotenv').config();
const { OAuthApp, createNodeMiddleware } = require("@octokit/oauth-app");
const { createOAuthUserAuth } = require("@octokit/auth-oauth-user");
var prompt = require('prompt');

const { Octokit } = require("@octokit/core");


const auth = createOAuthUserAuth({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scopes: ["user", "repo", "codespace"],
  async onVerification(verification) {
    console.log("Open %s", verification.verification_uri);
    console.log("Enter code: %s", verification.user_code);

    await prompt.confirm("press enter when you are ready to continue");
  },
});


const app = new OAuthApp({
  clientType: "github-app",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

async function createToken() {
  const { token } = await auth();
  console.log(token);
}

async function run() {
  const token = process.env.MY_TOKEN_DEVICE;
  
  const octokit2 = new Octokit({
    auth: token
  });

  const res2 = await octokit2.request(`POST /user/codespaces`, {
    location: 'WestUs2',
    pull_number: 3,
    repository_id: process.env.REPOSITORY_ID,
  });
  console.log(res2);
}
setTimeout(run, 1)


app.on("token", async ({ token, octokit, expiresAt }) => {
  const { data } = await octokit.request("GET /user");
  console.log(`Token retrieved for ${data.login}`);
});


require("http").createServer(createNodeMiddleware(app)).listen(4567);