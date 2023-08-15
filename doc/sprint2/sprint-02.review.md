# Citrus

## Iteration 02 - Review & Retrospect

 * When: 2023-07-07
 * Where: Online

## Process - Reflection



### Decisions that turned out well

List process-related (i.e. team organization) decisions that, in retrospect, turned out to be successful.

 * The decision to distribute the backend and frontend work evenly across the team allowed us to have a better understanding of the project as a whole as well as more effectively complete tasks on both ends
 * Choosing to have two people assigned to each ticket (one developer, one reviewer) allowed 
 more widespread understanding of what was being worked on

### Decisions that did not turn out as well as we hoped

List process-related (i.e. team organization) decisions that, in retrospect, were not as successful as you thought they would be.

 * We didn't emphasize writing documentation as much as we should have, leading to confusion
 and other issues when team members attempted to base their work on what others did
 * We didn't focus on testing as much as we should have, especially in production deployments

### Planned changes

List any process-related changes you are planning to make (if there are any)

 * Setup subtasks for user stories in Jira
    * one subtask for development
    * one subtask for review (testing)
 * Improved documentation enforcement
    * Require documentation for all PRs

## Product - Review

### Goals and/or tasks that were met/completed:
 * Event browsing with basic browsing/searching
 * Indicate interest in event
 * Organizational sign-up
 * Organizational login
 * Organizer event creation

### Goals and/or tasks that were planned but not met/completed:
 * Having a date picker on the events browser
 * Similar event pages to the main one intended for browsing, but specialized (e.g. organizer can see their own events, users can see events they liked)
 * Organizer event editing
 * Users being able to edit events they created


## Meeting Highlights

Going into the next iteration, our main insights are:

 * A renewed focus on testing is definitely necessary, as several issues were not caught until the last minute because no upfront work was done to create test cases. Manual testing is time-consuming and expensive, especially when considering that it is not guaranteed that something that works locally will work in production. Anyone reviewing a branch **must pull the branch locally and explore the changes on their own** at the very minimum. Ideally all branches will have preview deployments.

 * Team members should remember to not put documentation on the backburner when they are making changes. During this sprint, due to prioritizing 
 getting code that worked only in the context of a particular user story, our team ran into issues when attempting to have functionality that was reliant on work that was merged earlier. API documentation was sometimes incorrect and changes were made with no corresponding record which broke the development workflow for others. 

 * Breaking changes must be **CLEARLY ANNOUNCED** and no work should be done in that particular domain until it is known what fixes are necessary in ongoing development. As an addendum, breaking changes should not be done without a corresponding PR being created and approved first. All of our staging database data was lost 5 times because of Prisma migrations being run directly in development instead of checking in our migration files and having them be approved first. 

 * When considering workflow items that are necessary for sprints (Git naming conventions, pull requests, etc), they must be treated as important pieces that contribute to spending time in active development rather than bug fixing. A lot of time was lost to general confusion. This entire project is a deep dive into what should be expected of us in a professional environment, so it's an opportunity to polish our knowledge of these requirements so they become like clockwork to us in the future.    
