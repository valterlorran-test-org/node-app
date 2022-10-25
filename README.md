# node-app



### Running the app

```bash
yarn start
```


### Testing Webhooks

To test the webhooks we need to use [ngrok](https://ngrok.com/download) to expose our local server to the internet.

After installing `ngrok`, you can expose your localhost by running `ngrok http 4567` on the command line. `4567` is the port number on which our server will listen for messages. You should see a line that looks something like this:

```bash
Forwarding                    http://a1b2c3d4.ngrok.io -> localhost:4567
```

Make a note of the *.ngrok.io URL. We'll use it to set up our webhook.

Go to the General Settings page of your GitHub app and set the Webhook URL to `http://a1b2c3d4.ngrok.io/api/github/webhooks`. Make sure to replace the URL with the one you got from ngrok.