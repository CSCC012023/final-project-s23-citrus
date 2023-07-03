# Motivation
**What is it?**

Citrus/GoGo is a next-generation experience-sharing platform that aims to connect like-minded people who would otherwise have missed out on experiences they didn't want to attend alone.

**What problems does it solve?**

Many businesses lose out on sales due to people not wanting to go alone, and many individuals miss out on a fun experience because they have no one to go with. Citrus/GoGo solves this problem by bringing strangers together through joint interest in events.

# Installation
Clone the repository using Git. Citrus has the following additional dependencies:
- [Next.js](https://nextjs.org/docs/getting-started/installation)
- [A CockroachDB cluster](https://www.cockroachlabs.com/docs/cockroachcloud/quickstart.html) (has a free tier)
- [A Google Maps API key](https://developers.google.com/maps/documentation/embed/get-api-key) (Embed requests are always free)

Please note that any flavour of PostgreSQL database can be used as a replacement for the cluster, but development was done with a cloud database in mind. After installing the above dependencies, run the following commands.

```bash
cd citrus
npm install
```
---
## Local configuration
After cloning the repository and installing the requirements, run the following commands
```bash
cd citrus
cp .env.template .env
```
Populate the `.env` file with the relevant environment variables. A list of the required environment variables is provided below:

- `DATABASE_URL`: A PostgreSQL database connection URL.
- `GOOGLE_MAPS_API_KEY`: A Google API key that, at minimum, has access to the Maps Embed API request scope. 

---
## Running Citrus

After finishing the repository installation and local configuration, just run the following commands from the root of the repository.

```bash
cd citrus
npm run dev
```

# Contribution
We use the git flow model of software development, and as such **we expect all changes to be merged in via pull request**.

Our branch name structuring is as follows

- `main` contains production code that is deployed
- `develop` contains code that is waiting to be deployed to main
- `feature/...` for branches implementing new features
- `bugfix/...` for branches implementing bugfixes

Issues are tracked via JIRA and the ticket number is clearly indicated as part of the extended Github branch description.
