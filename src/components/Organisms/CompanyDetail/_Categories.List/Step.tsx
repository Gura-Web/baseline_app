import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { PostStudent } from '../../../Molecules/Card';
import { Pagenation } from '../../Header';

interface Props {
  thisPage: string;
  companyId: any;
  companyData: any;
}

const Step: React.FC<Props> = props => {
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
  const [steps, setSteps] = useState<any>(null);
  useEffect(() => {
    const stepArray: any = [];
    console.log(props.companyData);
    props.companyData.company_information.forEach((data: any) => {
      let stepCard = {};
      data.selections.forEach((step: any) => {
        if (step) {
          stepCard = {
            id: step.id,
            user_id: data.user.id,
            userName: data.user.first_name + ' ' + data.user.last_name,
            iconImagePath: data.user.icon_image_path,
            job: data.occupational_category.name,
            icon: data.user.icon_image_path,
            internship: data.internship.name,
            graduationYear: data.user.year_of_graduation,
          };
        }
      });
      if (data.selections.length != 0) {
        stepArray.push(stepCard);
      }
    });
    setSteps(stepArray);
  }, []);

  return (
    <motion.div
      className="companyDetail-contents step"
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
    >
      {(() => {
        if (steps) {
          return steps.map((data: any) => {
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
                type="step"
              />
            );
          });
        }
      })()}
      {(() => {
        if (steps) {
          if (steps.length !== 0) {
            return (
              <Pagenation searchFunc={() => console.log('a')} lastPage={1} />
            );
          }
        }
      })()}
    </motion.div>
  );
};

export default Step;
