### Q1: What are you planning to build?
We are planning to build an experience-based, social meetup web application. Our application will focus on connecting individuals who share a common interest in specific events but may lack companions to attend them with. Whether it's a concert, a hiking trip, a cooking class, or a book club meeting, our goal is to bridge the gap between people who want to participate in these activities but find themselves without a group of friends to attend with. One of the biggest challenges in today's society is the feeling of loneliness, despite the interconnectedness provided by social media. We understand that attending events alone can be intimidating and sometimes even discouraging. That's why our application aims to eliminate these barriers by connecting like-minded individuals who are seeking friendship.

Imagine an application where you can browse through a diverse range of events and activities. You can filter based on your interests, location, and availability. Once you find an event that piques your interest, you can join a virtual community of others who are also planning to attend. Through our application, you can connect with these individuals, chat, and get to know each other before the event even takes place.

Not only does our application provide an opportunity to meet like-minded individuals, but it also enables you to expand your social circle and meet new people who share your passions. By fostering a sense of community, we hope to create an environment where users feel comfortable and excited to engage with others, building lasting connections beyond the initial meetup.

### Q2: Who are your target users? (2-3 personas)
Persona 1 - Alice

Alice is a 20 year old student, currently in her second year of university. She aims to get into a biomedical engineering program, so she often stays on top of her work while balancing a part-time job as a cashier to earn some cash to help pay for her textbooks. Recently, she has been able to save enough money to go to an upcoming concert, but her friends (mostly in her program) are swamped with work and are unable to go with her. Alice doesn't want to go alone, but really wants to attend.

Persona 2 - Alex

Alex is a 38 year old baseball fan living in the Bronx who recently bought two tickets to a game at Yankee Stadium for him and his friend, who's planning to fly over from Ohio. He works as a financial advisor in Scotiabank and has a wife and two kids, the latter of which he brings to baseball games on the weekends. Recently, he's received unfortunate news from his friend that his flight the day before has been delayed, so he won't be able to make it in time to watch the game. Alex is still planning to attend, but doesn't want the ticket to go to waste.

Persona 3 - Carl

Carl is a 17 year old student currently in their third year of high school. He's incredibly focused on getting admitted to the University of Waterloo for Computer Science, and has made it a goal to attend as many programming events as possible to put them on his application. One such event, Hack the North, has an application process that Carl was fortunate enough to get accepted through. While he's incredibly enthusiastic about attending, his high school is relatively smaller in size, and no one else from it applied or was accepted, leaving him without a group.

### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

There is a plethora of tools for users to find events they are interested in going to, such as TicketMaster and Eventbrite. The gap that Lime, or GoGo, seeks to bridge, would be for people matching the following criteria:

- Those looking to organize their own informal meetups (such as study groups) with people they
have never met before, through a dedicated platform.
- Those who have found events on external platforms such as TicketMaster or Eventbrite they are interested in going to, but do not have a group to go with

By setting up a dedicated platform for this niche, where users will understand exactly what experience they'll be getting and what they can expect from other users, Lime will bridge this gap.

Current alternatives mostly consist of publicly broadcasting interest, through social media and then using messaging functionality on platforms such as Instagram to organize groups for these experiences. Of course, this typically precludes meeting new people for the vast majority of users who tend to have private profiles. Meetup.com is also another alternative, though it is used moreso to organize events than indicate interest in pre-existing events such as concerts, for example.

### Q4: What does "DONE" mean to your Team?
We consider 'done' as the project owner being satisfied with the final result (i.e. all of the required user stories have been implemented and fully functioning) and have the code deployed. We also must be thorough with reviewing/testing our code to ensure consistency and stability, as well as make sure that the project meets the requirements of Scalability, Availability, Maintenance, and Portability (Non-Functional Requirements). Lastly, we want to ensure that we meet the requirements of the sprints/phases set out to us by this course.

### Highlights

1. Although we ended up choosing GoGo, there were certainly other alternatives we were considering, like Hype and Artillect. However, we went through all of the projects provided and narrowed our final decision down for the following reasons.
    - In addition to allowing organizers to add events they wanted users to attend, we could collect events from bigger sites (e.g. TicketMaster) using their APIs and deliver a rich experience from the get-go
    - Very little storage overhead to deal with compared to Artillect, Hype & Ascend - they would be heavy on content delivery systems
    - There are opportunities to work in monetization from the get-go
    - There are also opportunities for some kind of AI-based recommendation system

2. We decided to split the team in half to work on front-end and back-end. The front-end team consists of Aaliyah, Sana, and Shinza, while the back-end team consists of Daniel, Ishaan, Matthew, and Miraj. Since those sub-groups were able to meet and converse more frequently together, we thought that it would allow the project's development to thrive if both ends could discuss with one another aside from our team meetings.

3. We decided on using Next.js as the core framework our application was based on, since it can handle full stack development and has multiple handy features, such as Server Side Rendering and API routes. We paired this with CockroachDB for our database for its generous free tier. We are using Vercel for deployment, as they developed Next.js and have a good free plan.

4. For our collaboration tools, we are using Slack for daily standups and main communication channel, Jira for our roadmap and sprint details, and Notion for documentaion. We are using Figma for mockups and artefacts. Finally, we are occasionally using Microsoft Live Share for VS Code to collaborate on the same parts of code.

5. Our decision was to hold team meetings once a week on Wednesday at 3:00 PM. It was a reasonable time where everyone could meet up at the campus without interfering with anyone's schedule, as well as allowing us to discuss what we had done the days prior to the meeting before sharing what our plans were for the days to come in the week. The format of our meetings would have both front-end and back-end catch the other up on what they had been up to, before discussing team-relevant problems (such as Q4 of product.md). Afterwards, we would brief each other on what we planned to work on leading up to the next meeting.
