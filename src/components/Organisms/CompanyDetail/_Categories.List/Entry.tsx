import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { showEntry } from '../../../../assets/script';
import { PostStudent } from '../../../Molecules/Card';
import { Pagenation } from '../../Header';

interface Props {
  thisPage: string;
  companyId: any;
  companyData: any;
}

const Entry: React.FC<Props> = props => {
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
  const [entries, setEntries] = useState<any>(null);

  useEffect(() => {
    const entriesArray: any = [];
    console.log(props.companyData);
    props.companyData.company_information.forEach((data: any) => {
      let entryCard = {};
      data.entries.forEach((entry: any) => {
        if (entry) {
          entryCard = {
            id: entry.company_information_id,
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
      if (data.entries.length != 0) {
        entriesArray.push(entryCard);
      }
    });

    setEntries(entriesArray);

    showEntry(1).then((data: any) => {
      console.log(data);
    });
  }, []);

  return (
    <motion.div
      className="companyDetail-contents entry"
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
    >
      {(() => {
        if (entries) {
          return entries.map((data: any) => {
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
                type="entry"
              />
            );
          });
        }
      })()}
      {(() => {
        if (entries) {
          if (entries.length !== 0) {
            return (
              <Pagenation searchFunc={() => console.log('a')} lastPage={1} />
            );
          }
        }
      })()}
    </motion.div>
  );
};

export default Entry;
