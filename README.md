# Kisanhub Interview Question

The solution is split into two parts: the Django server, which is really just a DjangoRestFramework API, and the app, which is a pure Angular5 app. In production you would probably just serve the app via a CDN e.g CloudFront - they're just static assets and a single index.html.

## Server

The usual Django install, with a python 3.6 venv:
```
cd server
mkvirtual -p /usr/bin/python3.6 kisanhub_api
pip install -r requirem/home/ncb/projects/signals-admin-apients.txt
./manage.py migrate
```

### Database population

`./manage.py fetch_metoffice`

This will initialise and fetch all required data files from the Metoffice website. The same command can be used to update the data (i.e in subsequent months)

## App

A standard Angular5 app - we'll serve using angular-cli. Note that you'll need a reasonably updated npm and nodejs: you can update node with:

`npm install -g npm`

To build the app:

```
cd app
npm install
```

To run it:

```
./node_modules/.bin/ng serve --open
```

