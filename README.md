<p align="center">
  <img alt='magoon-face' src='https://user-images.githubusercontent.com/14088342/30803493-14302666-a1ea-11e7-9eb4-5200db146cbe.png' width='250'/>
  <h1 align="center">Quebot</h1>
  <p align="center">The best misspelled queuebot in the world.</p>
  <p align="center">
    <img alt='popping badge' src='https://img.shields.io/badge/mode-skynet-green.svg?style=flat-square' />
    <img alt='build badge' src='https://img.shields.io/badge/build-passing-green.svg?style=flat-square' />
    <img alt='version badge' src='https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square' />
  </p>
</div>
<hr>  

## What is this thing?
This *thing* is used in order to get messages to a LCD screen, whereas when information has been written to the LCD - the information is stored in a virtual queue that eventually will display the message created. When the information on the LCD changes, an LED lights up for a short time in order to notify that there is information on the screen to read.

## Security
The API has been built in such a way that it cannot be reached outside of the Raspberry PI, and only be reached from the localhost, which basically implies that one would have to have some sort of middle hand in order to interact with it. For example, as we have created, a bot. This setting can easily be changed to open up the API publically. 

Since the API only can act over the localhost, we have chosen not to activate TLS since the traffic cannot be targeted by a man-in-the-middle attack. If one chooses to open up the API to the public instead, TLS must be enabled in order to protect against attacks due to not encrypting the traffic.

## Tech
This WoT makes use of the direct integration pattern since it is directly connected to the wifi. The resource.json design is founded on the principles mentioned in the book *Building the web of things*, regarding the information of properties, actions, but not things, since we do not have a thing that is connected to another thing acting as a proxy.

According to the [Web Thing Model](https://www.w3.org/Submission/wot-model/) we’ve implemented all the must have requirements and most of the should have requirements that was applicable or relevant to our application. For example it supports the appropriate status codes and also uses JSON as its primary format of representation.

## How do I get the show on the road?
* Start with cloning the repo from github: 'git clone https://github.com/LokeCarlsson/Quebot'
* Continue with one of the steps below.

## How do I get the WoT API show on the road?
* Go to the server folder and run 'npm run build'
* Put the newly created dist folder on the RPi together with the package.json, and the resource.json.
* On the RPi run 'npm install' in order to install all the required dependencies. 
* Setup your RPi and your LED according to the model in the resource.json, in order to let the API connect to the two components.
* Start the server with your prefered production process manager, such as *PM2* in order to keep the API up and running.
* The API should now be up and running.

## How do I get the BOT show on the road? (optional)
![Quebot-avatar](http://i.imgur.com/Xe4Pc5P.png)
* This specific bot is created for Slack, so in order to use it you will need a 'Slack Token'. Information regarding the creation of a slack bot can be found here: [Slack Bot Information](https://api.slack.com/bot-users)
* Create a .env file and add the your slack token like this: SLACK_TOKEN=xxx-xx-xxxxxx-xxxx, in the root of the bot folder, where xxx is the slack token you just obtained.
* Run the following command 'npm run build', which should create a dist folder. 
* Put the dist, package.json and the .env file on your RPi and run 'npm install'.
* Start the bot with your prefered production process manager, such as *PM2* in order to keep the BOT up and running.
* The BOT should now be up and running.

## API Documentation

    GET - /
    Returns 200
    Returns URL’s of actions properties and self

    GET - /actions
    Returns 200

    POST - /actions/lcdState
    Returns 204
    Error 500
    Adds a message to the message queue

    DELETE - /actions/lcdState
    Returns 204
    Error 500
    Deletes a message from the message queue

    GET - /model
    Returns 200
    Returns all the actions

    GET - /properties
    Returns 200
    Returns all properties with ID, name and value

    GET - /properties/lcdState
    Returns 200
    Returns all the messages in the queue

