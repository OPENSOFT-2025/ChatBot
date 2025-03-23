
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ChallengeContent() {
  return (
    <Card className="shadow-card overflow-y-auto max-h-[calc(100vh-2rem)]">
      <CardHeader className="pb-2 sticky top-0 bg-white z-10">
        <CardTitle className="text-xl font-medium text-gray-800">
          Coding Challenge: Building an AI Conversation Bot to augment People Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="prose max-w-none">
        <p>
          In large organizations, tracking employee well-being and engagement is essential for 
          maintaining productivity and a positive work culture. In Deloitte, we collect the 'Vibe' 
          of the Employee every alternate day using the Vibemeter. The Vibemeter is a simple 
          survey deployed to 35,000+ employees via TIA, our in-house AI support bot.
        </p>
        
        <h3>What does the Vibemeter do?</h3>
        <p>
          The Vibemeter tracks the mood of the employee in 5 different zones, from lowest to 
          highest - 'Frustrated', 'Sad', "Okay', "Happy", "Excited". This helps us do a daily check 
          on the culture, and provide actionable feedback to managers, teams and business units 
          to engage employees more effectively, keeping them happy.
        </p>
        
        <h3>How do we engage with our people (using Vibemeter data) today? What are the 
          challenges, if any?</h3>
        <p>
          Once we have the detailed the Vibemeter data, we undertake two main steps.
        </p>
        
        <h4>Step 1 - Data Analysis:</h4>
        <p>
          We connect this to several other input data sources 
          (performance, leaves, activity tracker, promotions etc), and analyse it in depth. The 
          output of the analysis is to identify core Employee issues. The questions we seek to 
          answer from this analysis are usually of the following types:
        </p>
        <ul>
          <li>
            If an employee is unhappy, is it because they are tired and haven't taken enough 
            leaves? (Leave tracker)
          </li>
          <li>
            Or is it because they didn't get a good performance rating or promotion? 
            (Performance tracker)
          </li>
          <li>
            Has the employee been working very long hours which is leading to frustration? 
            (Activity tracker)
          </li>
          <li>
            Or does the employee feel their efforts are not rewarded enough? (Rewards tracker)
          </li>
        </ul>
        
        <h4>Step 2 - Post analysis feedback:</h4>
        <p>
          We gather the feedback of these employees via 
          Individual meetings and focus groups.
        </p>
        <p>
          These processes are often time consuming and need heavy human inputs, which we 
          wish to automate, to ensure faster turnaround time in addressing employee concerns.
        </p>
        
        <h3>What is the solution we are looking to create at Deloitte?</h3>
        <p>
          We are looking for an AI Conversation bot solution to the above, which will act as a 
          digital employee, delivering the following solutions.
        </p>
        <ul>
          <li>
            Using above datasets, the bot should detect do Step 2 of the above. I.e 
            connect with employees and understand the why from them. But before 
            that decide which employees it should connect with daily and why. (Is it 
            going to be consistently sad and frustrated ones, what kind of happy and 
            excited ones etc). The logic of identifying these people should be explained in 
            your submission.
          </li>
          <li>
            The bot should be able to gather data from all input sources shared 
            (basically do Step 1 from above para), correlate the data, and reach out to 
            the selected employees with meaningful questions - and delivering 
            personalised responses to their situation. The Question & Answer Bank 
            should be a part of your submission.
          </li>
          <li>
            This system should then gather employee feedback, analyze it using AI, and 
            offer helpful insights while escalating serious concerns to human resources - 
            when it reaches a certain threshold.
          </li>
          <li>
            At the end of the day, the bot should provide a detailed report to us (People 
            Experience team) showcasing output and insights from Step 1 and 2 and the 
            reasons for the vibe and next steps.
          </li>
        </ul>
        
        <h3>Technical Environment (only suggestions, you can use other solutions as well):</h3>
        <ul>
          <li>Backend: Python (Flask, FastAPI, or Django).</li>
          <li>Frontend: React.js, .NET, or Power Apps (flexible UI choice).</li>
          <li>
            AI Models: Pre-trained AI models for understanding employee feedback (e.g., 
            Hugging Face Transformers).
          </li>
          <li>
            Infrastructure: Use Docker for packaging the system and deploy it on cloud 
            services (optional).
          </li>
          <li>IDE: Visual Studio Code, PyCharm, or similar environments.</li>
          <li>Should work on Windows & MAC environments</li>
        </ul>
        
        <h3>Provided Data:</h3>
        <p>
          Participants will receive sample datasets to help build and test the system:
        </p>
        <ol>
          <li>Leave Dataset: Information on employee leave patterns.</li>
          <li>
            Activity Tracker Dataset: Records of daily activity on company softwares 
            like teams/outlook etc.
          </li>
          <li>
            Rewards & Recognition Dataset: Details about employee awards and 
            recognitions.
          </li>
          <li>
            Performance Management Dataset: Employee performance data and 
            feedback.
          </li>
          <li>
            Onboarding Experience Dataset: Feedback from employees after joining the 
            company.
          </li>
          <li>Vibemeter Responses data set with Emotion Zones Mapping.</li>
        </ol>
      </CardContent>
    </Card>
  );
}
