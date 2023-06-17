# Citrus

## Iteration 01 - Review & Retrospect

 * When: 2023-06-16
 * Where: Online

## Process - Reflection

Considering the lack of experience across the team with a professional software development lifecycle, sprint 1 was very illustrative of areas where we needed to put more focus, especially on organization.

Taking initiative directly on development work might work out well for smaller teams with highly-experienced collaborators, but we would have definitely benefited from having done more planning and research into resources or technologies that would have made our lives easier. 

### Decisions that turned out well

List process-related (i.e. team organization) decisions that, in retrospect, turned out to be successful.

 * Weekly meetings on Wednesday allowed us to keep track of progress and discuss any blockers 
 * Consistent standups on Slack allowed us to keep track of each other's progress and help each other out
 * Early completion of planning (iteration-1.plan and RPM) allowed us to start working on the project early

### Decisions that did not turn out as well as we hoped

List process-related (i.e. team organization) decisions that, in retrospect, were not as successful as you thought they would be.

 * Having strictly-separated backend and frontend teams
 * Choosing to only meet once a week on Wednesday
 * Not informing the whole team of finished work as soon
 as possible, which could remove blockers
 * Having 1 person responsible for each branch instead of sharing knowledge
 

### Planned changes

List any process-related changes you are planning to make (if there are any)

 * Setup Jira properly for sprint 2
   * Assign tasks to team members
   * Put only user stories for the sprint in the sprint backlog
 * Improve communitcation between members
   * Try to meet up more often (aim for 2 times a week)
 * Having 2 people responsible for each branch
   * In effect, have a primary "driver" on each branch and a secondary person who keeps track of changes on the branch
 * Tie branches to Jira tasks and take advantage of Jira's features (e.g. linking branches to tasks, etc.)

## Product - Review

### Goals and/or tasks that were met/completed:
 * Set up database schema 
 * Set up core API endpoints 
    * GET, POST, PUT, DELETE for users  
    * GET, POST for events
 * Set up a signup page for users to create accounts
 * Set up a home page to welcome users
 * Add an ORM, Prisma, (not initially a part of the plan)

### Goals and/or tasks that were planned but not met/completed:

 * Allowing users to browse events and indicate interest in them
 * Strech goals (Users profiles with interests, profile picture, and social media links)
 * We didn't complete these goals due to our decisions to change the system design and incorporate new technologies at the very last minute (i.e. Prisma, BCrypt, DataGrip)

## Meeting Highlights

Going into the next iteration, our main insights are:

 * An increased level of collaboration between backend & frontend is extremely important. We realized that mostly separating the two teams and meeting up only once a week was continuously causing situations during/after the meeting where one team would have to be caught up/help with the other. If we had instead focused our efforts to meet up an extra day and communicate online more often, we think it would've resulted in an increased ability to accelerate both ends of the developmental process.
 * Making plans and following through on them are completely different things, unsurprisingly. Having a database schema decided, while not having the actual database created, resulted in the delaying of *both* frontend and backend work, because API endpoints were incomplete until the data model was finished, leaving the frontend with no data to work with. That's just one example of an issue we want to avoid in future sprints.
 * Doing things the easy (but maybe slightly restricted) way is not something to avoid. For example, starting with API endpoints using raw SQL and a direct PostgreSQL connection threw up a roadblock later on when we wanted dynamic queries based on API search parameters. We had explored Prisma, an ORM technology, at the very start of the sprint and then abandoned plans to use it until the second last day of the sprint. We had decided that using raw SQL would have been beneficial for both experience and freedom. An entire API rewrite in the last 2 days is far from ideal.  
