"use client"
import { useEffect, useState } from 'react';

interface ProgressItem {
   title: string;
   value: number;
}

const progressData: ProgressItem[] = [
   { title: 'Business skill', value: 87 },
   { title: 'Client Happiness', value: 76 },
   { title: 'Behaviour', value: 92 },
];

const TeamProgress = () => {
   const [progressValues, setProgressValues] = useState<number[]>(progressData.map(() => 0));

   useEffect(() => {
      const timeout = setTimeout(() => {
         setProgressValues(progressData.map(item => item.value));
      }, 100); // Delay to allow CSS transition

      return () => clearTimeout(timeout);
   }, []);

   return (
      <div className="tg-team-progress-wrap fix mb-15">
         {progressData.map((item, index) => (
            <div key={index} className="tg-team-single-progress mb-20">
               <h5 className="tg-team-progress-title">{item.title}</h5>
               <div className="tg-team-progress">
                  <div
                     className="progress-bar"
                     style={{
                        width: `${progressValues[index]}%`,
                        transition: 'width 2s ease-in-out',
                     }}
                     role="progressbar"
                     aria-valuenow={progressValues[index]}
                     aria-valuemin={0}
                     aria-valuemax={100}
                  >
                     <span>{progressValues[index]}%</span>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default TeamProgress;
