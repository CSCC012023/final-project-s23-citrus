# EVENTUAL

## Iteration 02

 * Start date: June 26, 2023
 * End date: July 7, 2023

## Process

Quick Introduction to the process

### Changes from previous iteration

List the most significant changes you made to your process (if any).

Our biggest change to process is that for this sprint, each of our team members will be working as full stack developers. For the user stories we have been assigned, the task encompass both front-end and back-end components to ensure that each team member has exposure to various software and opportunities to learn new skills. We can measure the success of this as a group as we complete the sprint and are able to see all the different softwares our team members have worked with, as the individual skill sets of team members will likely increase with the newfound responsibility of learning both frontend and backend components. 

Another change is that we want all group members to be further aware of the tasks that other team member are working on. A success metric for this is that at the end of our sprint, all 7 team members will have a clear gauge of what has been accomplished by fellow team members and would be able to provide explanations during the demo. 


### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

All team members will be working full stack developers for this sprint and as such there are no unique roles and responsibilities for development work. However, to list what our
full-stack developers will be responsible for:

* Developing user-friendly interfaces using our front-end tooling, such as TailwindCSS and Next.js 
* Managing databases directly through the use of Prisma
* Creating and modifying API endpoints to support front-end functionality through Next.js API routes. 

### Events

Describe meetings (and other events) you are planning to have:

We are planning to have in-person meetings on Wednesday at 3pm in BV. The goal of the meeting will be to conduct planning and review sessions. We will also have a weekly online meeting on Saturday for a quick sync-up. We also will have daily standups on Slack to keep track of progress and to ensure that everyone is on the same page. The main assignee and  co-collaborator for each story will keep in communication on what is being done. 

### Artifacts

List/describe the artifacts you will produce in order to organize your team.       

* Our team uses Jira in detail to assign tasks and follow what our other team members are working on, keeping track of progress throughout the sprint
* Our updated system design document will be a strong reflection of the work we do
* Tasks have been assigned to team members based on interest as well as dividing up responsibilities into sizable tasks that each member feels capable of
* Tasks are prioritized based on the sequence in which functionality needs to be completed i.e. the home page needs to be completed before the user profiles page can be linked to the home page

  

### Git / GitHub workflow

Describe your Git / GitHub workflow.     
Essentially, we want to understand how your team members share a codebase and avoid conflicts.

 * When a feature is ready for review, a PR will be created from the feature branch into main by the owner of the JIRA ticket, with the co-collaborator (specified in task description) as the reviewer. The reviewer will then review the code and merge if approved. If the reviewer is not satisfied with the code, they will leave comments on the PR and the owner of the PR will make the necessary changes and re-request a review. This process will continue until the reviewer is satisfied with the code.
    * This process allows for informative code reviews and ensures that the code is reviewed by someone other than the author. It also allows for the reviewer to be aware of the changes that are being made to the codebase and to be able to provide feedback on the changes. This ensures code quality and reduce issues with the codebase in main.

 * PRs should follow the naming convention: "JIRA-# - Title of PR" and should be linked to the JIRA ticket (if JIRA-Git integration works). The description should follow format outlined in .github/PULL_REQUEST_TEMPLATE.md (should be automatic)
    * This template also includes the commands to run before creating PR, to ensure that the code builds.
    * This makes PRs easy to find and allows for easy linking between JIRA and GitHub. It also allows for easy tracking of PRs and their status.
    * The PR template ensures that all PRs have the necessary information and that the PR is ready for review.
 
 * Git commit messages should follow the format: "JIRA-# - Commit message".
    * This makes it easy to track changes to the codebase and allows for easy linking between JIRA and GitHub.

 * Branch names should follow the format "type/JIRA-#-description" where type is one of the following: feature, bugfix, hotfix, test, docs. For example, a branch name could be "feature/CIT-1-home-page" or "bugfix/CIT-2-login-page"
    * This makes it easy to track changes to the codebase and allows for easy linking between JIRA and GitHub.


## Product

_This entire section is mandatory._


#### Goals and tasks

The main goal of this iteration is to implement the core functionality of our website, including:

 * Event browsing (view, indicate interest, basic searching)
 * User profiles (view, edit)
 * Organizational sign-up and login
 * Event creation and editing

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

* Create a home page for users to browse events and see relevant information, as this covers the main functionality of our app

* Create a signup page for businesses to create new accounts and participate as stakeholders in this application
    
* Create a landing page for businesses to view, add and edit new events, so users can interact with their content

* Create a user profile page so users can view and edit their profile, including hobbies, phone number, and interests, allowing them to better interact with like-minded individuals 

* Create a page for users to look at the existing events they have signed up for/are interested in so they can keep track of their upcoming events 

