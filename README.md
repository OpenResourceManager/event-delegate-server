# Event Delegate Server

The Event Delegate Server is responsible for listening to events broadcasts across redis and relaying them to clients through web sockets in real time.

[![Build Status](https://travis-ci.org/OpenResourceManager/EventDelegateServer.svg?branch=master)](https://travis-ci.org/OpenResourceManager/EventDelegateServer)

---

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

