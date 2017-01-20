# Event Delegate Server

The Event Delegate Server is responsible for listening to events broadcasts across redis and relaying them to clients through web sockets in real time.


### Setup:

```bash
yarn install
cp config/conf.example.yaml config/conf.yaml 
```

Edit `config/conf.yaml` with your text editor.

### Run Server:

```
node EventDelegateServer.js
```

