# Kisanhub Interview Question

The solution is split into two parts: the Django server, which is really just a DjangoRestFramework API, and the app, which is a pure Angular5 app. In production you would probably just serve the app via a CDN e.g CloudFront - they're just static assets and a single index.html. I would normally split this into two repositories: they're munged together here for convenience.

## Introduction

This is mainly a demonstration app of Angular5 plotly.js app working in conjunction with a DjangoRestFramework backend. In the real world of course we would first need to work out what questions we need to ask of the data, which will determine what visualisations and levels of interactivity are required. 

As such I'm not really sure what the question is asking for in part 3 - what's interesting to me may be completely irrelevant to an actual customer. Is the customer really interested in a overall trend of max temperature over the last 100 years, or do they just care about the probability of certain rainfall and sunshine conditions during a particular date range? 

In fact I would ask for following questions before doing any coding at all:

* What features are of interest? Outliers? Broad trends?
* Over what date range? Short / long? What's a sensible default?
* Is comparison required? Comparing two datasets of the same graph is usually quite useful but does require a bit more UI work (backend is unchanged though).
* Is there domain knowledge here that would make the dataset more useful? e.g is there a combination of rainfall and sunshine that is of interest / needs to be within certain bands?


## Server

The usual Django install, with a python 3.6 venv:
```
cd server
mkvirtual -p /usr/bin/python3.6 kisanhub_api
pip install -r requirements.txt
./manage.py migrate
```

### Side-note: timeseries storage

While I've gone normalisation-crazy here it's actually not the best data structure for timeseries storage in a DB. In fact this is actually an area where MongoDB does come into it's own, as a noSQL DB could just store the timeseries as an array of (date,value) pairs and then just load the whole lot at once. In noSQL-land this would be pretty much instantaneous to both read and write. 

### Database population

`./manage.py fetch_metoffice`

This will initialise and fetch all required data files from the Metoffice website. The same command can be used to update the data (i.e in subsequent months).

I did consider using a ThreadPoolExecutor here as it's mostly IO-bound. However I have found cases where some feeds were incompletely imported, and I suspect lack of thread-safety in sqlite, so the fetch is serial (and somewhat slow initially). A real database would be fine.

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

Obviously a production system would insist on authentication on both sides. I've been using external auth services such as Auth0 recently to good effect.
