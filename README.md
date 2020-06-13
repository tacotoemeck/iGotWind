## Stack - explained

#### Natlify serverless functions 
Due to the time restriction, I have decided to run the app on the serverless Netlify functions. This is quick an convinient way to store API keys without a need of createing a seperate server. It does however complicate running app locally as the user needs to connect to a registered Netlify account in order to retrive the variables. 


## Netlify serverless functions

API keys are stored as Netlify variables. Netlify CLI package is used to retrive them on the server when run locally.