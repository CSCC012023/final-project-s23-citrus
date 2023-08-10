# EVENTUAL

## Iteration 04 - Review & Retrospect

 * When: August 04, 2022
 * Where: In an online meeting

## Process - Reflection

#### Decisions that turned out well

List process-related (i.e. team organization) decisions that, in retrospect, turned out to be successful.

 * We decided to let each team member take on a larger, more complex ticket that
 encompassed several different functions. This decision was quite successful, as
 we had a greater sprint velocity for this sprint than any other previous sprint.
 * Telling team members to do a large amount of upfront work in the first week as
 time estimates can be deceiving. The amount of work snowballed towards the end 
 of the sprint, so we got several tickets finished by the end. 

#### Decisions that did not turn out as well as we hoped

List process-related (i.e. team organization) decisions that, in retrospect, were not as successful as you thought they would be.

* Too much emphasis was placed on getting big, complex tickets merged. We could 
have simultaneously have team members work together on smaller ticket (such as 
polishing work) while blockers affected their main ticket.
* For this sprint, we had less pair programming sessions due to each person 
working on a complex ticket that only they understood. However, because of this,
team members could only rely on themselves for assistance and bugfixing was problematic.

#### Planned changes

Seeing as this is our final sprint, our team does not plan to implement any further process changes to our product.


## Product - Review

#### Goals and/or tasks that were met/completed:

 * From most to least important.
 * Refer/link to artifact(s) that show that a goal/task was met/completed.
 * If a goal/task was not part of the original iteration plan, please mention it.

* Adding payment methods for premium users was added in CIT-26
* Building the chat functionality was completed in CIT-28
* Creating and viewing other users profiles was completed in CIT-18 and CIT-19 
* Contact page was added in CIT-31

#### Goals and/or tasks that were planned but not met/completed:

 * CIT-45: Making the page visually appealing
This has not been completed yet as each team member has been working on different elements of the project, and now that the project is coming to a close, only now do we have all the pages completed for us to be able to ensure that the formatting and layout are consistent across the website

 * CIT-24: Indicating tickets have been prepaid for   
This task has the majority of its functionality in place, and the reason it has not been considered as completed is that bugfixes are continuing to be made before deploying the final product

 * CIT-30: Viewing individual tickets
This task has not been completed yet as a blocker is being faced with our implementation of a QR-code on the tickets, which we aim to correct by the final presentation

## Meeting Highlights

Since this is the final iteration, our main insights are:

* Maybe, dividing work into large, complex blocks when their functionality is
first being implemented and then allowing smaller tickets to build off the complex
blocks would have been a better development model. Several times, user stories
in virtually the same domain, where one depended on the other, were being worked
on at the same time until a blocker prevented any further work.
* Settling on and determining our tech stack as early as possible would have 
greatly reduced the amount of time spent per sprint simply figuring out what
tools were suitable for a particular problem. For example, we only added Stripe
and Ably as third-party providers for payment and messaging respectively this sprint.
We had known from the start that we would at least implement messaging and quite
a bit of time was spent selecting Ably as the provider this sprint. This time 
could have been better used on development work, with sprint 0 having been used
for the research.
