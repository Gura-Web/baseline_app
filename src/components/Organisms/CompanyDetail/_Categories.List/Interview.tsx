import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { PostStudent } from '../../../Molecules/Card';
import { Pagenation } from '../../Header';

interface Props {
  thisPage: string;
  companyId: any;
  companyData: any;
}

const Interview: React.FC<Props> = props => {
  const pageTransition = {
    in: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
    out: {
      x: -20,
      opacity: 0,
    },
  };
  const [interviews, setInterviews] = useState<any>(null);

  useEffect(() => {
    const interviewArray: any = [];
    props.companyData.company_information.forEach((data: any) => {
      if (data.interviews.length != 0) {
        console.log(data);
        let interviewCard;
        data.interviews.forEach((interview: any) => {
          if (interview) {
            interviewCard = {
              id: interview.id,
              user_id: data.user.id,
              userName: data.user.last_name + ' ' + data.user.first_name,
              iconImagePath: data.user.icon_image_path,
              job: data.occupational_category.name,
              icon: data.user.icon_image_path,
              internship: data.internship.name,
              graduationYear: data.user.year_of_graduation,
            };
          }
        });
        interviewArray.push(interviewCard);
      }
    });
    setInterviews(interviewArray);
  }, []);

  return (
    <motion.div
      className="companyDetail-contents interview"
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
    >
      {(() => {
        if (interviews) {
          return interviews.map((data: any) => {
            return (
              <PostStudent
                category_id={data.id}
                company_id={props.companyId}
                student_id={data.user_id}
                ttl={`${data.internship} (${data.graduationYear}卒)`}
                isPass={false}
                job={data.job}
                icon={data.icon}
                userName={data.userName}
                type="interview"
              />
            );
          });
        }
      })()}
      {(() => {
        if (interviews) {
          if (interviews.length !== 0) {
            return (
              <Pagenation searchFunc={() => console.log('a')} lastPage={1} />
            );
          }
        }
      })()}
    </motion.div>
  );
};

export default Interview;
