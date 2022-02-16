# **User Research**
In the beginning of the design process, I conducted interviews with Jupyter community members asking them about their thoughts and feeling of our extension and what they would expect from it if they were to use it in the future. Through their responses I was able to create three user personas that generally represented the types of users I interviewed. All of the participants in the interviews came from wide range of experience within the Jupyter community so I decided to categorize them based on what type of Jupyter user they were. The Empahty Map and How Might We questions are visual reminders for myself and developers ensure that we keep in mind our users' needs, while developing the extension. 

![Empathy Map](https://user-images.githubusercontent.com/83098854/138765499-e60b4620-c5cf-411a-9923-2b9a642d2806.png)
![HMW](https://user-images.githubusercontent.com/83098854/138765370-8c0bc9b8-efed-4c47-ad24-6ce775110ed2.png)
![Tanya-Persona](https://user-images.githubusercontent.com/83098854/138765416-f98c19b3-7b14-457f-af5a-2b957551e966.png)
![Thomas-Persona](https://user-images.githubusercontent.com/83098854/138765427-4c0bf776-9f9c-4610-83bd-df9281bfa93b.png)
![Eddie-Persona](https://user-images.githubusercontent.com/83098854/138765445-79c5d9f4-0d55-4df3-b58f-f46fc8cfe118.png)

# **Establishing Style Guides**
Needed to take time to understand Project Jupyter's branding style use a guidline to make sure that my designs stay within Jupyter's already approved branding. Overall, the sanserif Myriad Pro and Helvetica Neue typefaces were the main take away for this extension's branding as there weren't many graphic elements implemented into the extension besides Jupyter approved icons.

![style-guide](https://user-images.githubusercontent.com/83098854/138766226-4ca3368d-43a4-471c-af88-b7197bf28de0.png)
![style-guide2](https://user-images.githubusercontent.com/83098854/138767137-fce11218-0877-4564-9f5c-05023d783656.png)

# **User Flows**
Quickly mapped out how users would interact with the extension and the pathways they would need to take when they needed to reach an end goal. Such endgoals were interacting with a notification, customizing settings, going to the notification center, and flagging notifications.

![user-flow](https://user-images.githubusercontent.com/83098854/138768073-9c1bedf7-390f-454d-a593-61f27347b997.png)
![user-flow2](https://user-images.githubusercontent.com/83098854/138776875-3842ac17-6c34-41ee-adb2-a760a1fffd09.png)
![user-flow3](https://user-images.githubusercontent.com/83098854/138776890-7fd84361-ee75-48cc-a925-c5e601e88e08.png)
![user-flow4](https://user-images.githubusercontent.com/83098854/138777519-1515237f-a260-4f29-b9ab-dadda8fde4e1.png)

# **Research + Sketch**
Looked at the type of toast notification designs that are already used in the world and studied what style was best for implementation. Sketch was quickly done on Procreate. 

### **Understanding Types of Notifications**
Toast Notifications: short notification that varies between 20 to 30 words, giving users 5-6 seconds as an average reading time. Most likely shown on top right of screen and automatically dismisses itself. They're not primarioy meant to be interactive it should be simple enough so users don't have to think too hard or long on them. Toast notifications are only shown to inform with texts and icons.

![types of notifs](https://user-images.githubusercontent.com/83098854/138779382-dd018ce4-6b50-4c7f-b141-42dc28b40ac7.png)

### **Fleetio Example**
Notes: Based on times, updated notificaitons come in. Small icons and color coding badges are used to categorize the types of notifications. Tags are also used to show if the user has clicked or read the notificaiton. Notification center icon is a pop up side board so users don't have to go to a different page. Minimizes users movement.  

![fleetio-example](https://user-images.githubusercontent.com/83098854/138778877-d1dd3918-96f4-4119-b84c-a079cd1290d1.png)

### **Quick Procreate Sketch**

![Version_1](https://user-images.githubusercontent.com/83098854/138779532-c63bfd8f-1a4b-4eda-aec5-6f90614ba428.png) 

# **First - Third Figma Iteration**
 The first through third extension iteration versions are very similar and not a lot of design changes were made and could not be visually seen, so I just combined them into one Figma file.

After conversing with mentors and the rest of the development team, we decided to have an open drawer layout with toast notifications popping up on the user's screen on the bottom right. The bell icon was placed in the lower right screen because it was to visually cue the users where the notifications could be accessed. The design is based heavily on toast notifications already seen in interfaces like Apple, Google, and Fleetio. The icons are all different and correspond to the type of notification it belongs to and all notificaitons are seperated based on their time stamps. New are the notifications the users have never seen before when they were offline and Earlier are all of the notifications the users have seen when users were present as Toasts came on their screen.

Hovers were in place so users can just hover over a block of notifications and decide whether they want to dismiss the notification, which deletes it from their screen entirely. Or they could open up the condensed block and dismiss particular notifications.

Preferences settings include switches to allow users to turn on or off the type of notifications that go through to them and gives users the ability to customize their settings so they feel more in control.

![Notifications-3](https://user-images.githubusercontent.com/83098854/138780100-93490553-2341-470a-b8dd-a9caaa5113e6.png)
###### Example of one of the screens from this iteration's prototype.

Check out the Figma Prototype [[**Here!**]](https://www.figma.com/proto/nRUWHVE78mPyqV5nzFrBgS/Notifications-UI?page-id=303%3A135&node-id=349%3A619&viewport=241%2C48%2C0.45&scaling=min-zoom&starting-point-node-id=349%3A619)

# **Fourth Figma Iteration**
From rounds of user testing, was able to fix design flaws like moving the bell icon to the top right corner instead so users can intuitively know where the notificaiton open drawer is since users tend to naturally read from top left to right. Which did move the toast notification to move towards the top right corner instead so it draws users' eyes away from the main screen area and not block their work, psychologically making toast notifications less of an annoyance. Icons have been changed to bring more color and notifications are blocked (bunched) together based on file subject and not file origin. Basically, notifications are categorized based on what notebook file it's related to and not based on their type, to minimize confusion around notifications. 

Hovers were liked a lot in user testing, so decided to implement setting and dismissal option to notification cells when mouse is hovered on them. The ability to clear the all notifications from "New" or "Earlier" sections were implemented and allows user to declutter their notification screen. 

![notifications-4](https://user-images.githubusercontent.com/83098854/138781109-f410d4dc-2bd3-4c63-a13f-ceaa81cafc5b.png)

###### Example of one of the screens from this iteration's prototype.

Check out the Figma Prototype [[**Here!**]](https://www.figma.com/proto/nRUWHVE78mPyqV5nzFrBgS/Notifications-UI?page-id=373%3A2098&node-id=373%3A3649&viewport=241%2C48%2C0.1&scaling=min-zoom&starting-point-node-id=392%3A692)
