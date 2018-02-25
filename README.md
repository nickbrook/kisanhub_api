# Kisanhub Interview Question

## Install

The usual Django install:
```
pip install -r requuirements.txt
./manage.py migrate
```

## Database population

`./manage.py fetch_metoffice`

This will initialise and fetch all required data files from the Metoffice website. The same command can be used to update the data (i.e in subsequent months)