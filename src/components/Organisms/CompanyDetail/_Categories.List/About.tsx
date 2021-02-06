import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { WriteIcon } from '../../../../assets/images/index';
import { pageTransitionNormal } from '../../../../assets/script/pageTransition';
import { OldComment } from '../../../Molecules/Card';
import { Pagenation } from '../../Header';
import { Modal } from '../../Modal';

interface Props {
  thisPage: string;
  companyId: any;
  companyData: any;
  getCompanyData: any;
}

const About: React.FC<Props> = props => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [showModal3, setShowModal3] = useState<boolean>(false);
  const [companyComments, setCompanyComments] = useState<any>(null);
  const [editContent, setEditContent] = useState<any>();
  const [editId, setEditId] = useState<number>();
  const [deleteId, setDeleteId] = useState<number>();
  useEffect(() => {
    getComment(props.companyData);
  }, []);

  const getComment = (companyData: any) => {
    // コメントを配列に保存
    const companyCommentsArray: any = [];
    companyData.company_information.forEach((data: any) => {
      const user = {
        id: data.id,
        name: data.user.first_name + ' ' + data.user.last_name,
        annual: data.user.annual,
        comments: [] as any,
        updated_at: data.updated_at,
      };
      data.company_comments.forEach((comment: string) => {
        user.comments.push(comment);
      });
      companyCommentsArray.push(user);
    });

    setCompanyComments(companyCommentsArray);
  };

  const commentEdit = (edit_id: number, isOpen: boolean, content: string) => {
    setShowModal2(isOpen);
    setEditContent(content);
    setEditId(edit_id);
  };

  const commentDelete = (delete_id: number, isOpen: boolean) => {
    console.log(delete_id);
    setShowModal3(isOpen);
    setDeleteId(delete_id);
  };

  return (
    <>
      <motion.div
        className="companyDetail-contents about"
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransitionNormal}
      >
        <section className="companyDetail-contents__section">
          <h2 className="heading6">事業内容</h2>
          <p className="company">{props.companyData.business_description}</p>
        </section>
        <section className="companyDetail-contents__section">
          <h2 className="heading6">従業員数</h2>
          {console.log(props.companyData)}
          <p>{props.companyData.number_of_employees + '人以上'}</p>
        </section>
        <section className="companyDetail-contents__section">
          <div>
            <h2 className="heading6">会社についてのコメント</h2>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn--edit"
            >
              <img src={WriteIcon} alt="" />
              コメントを書く
            </button>
          </div>
          {(() => {
            if (companyComments) {
              return companyComments.map((data: any) =>
                data.comments.map((comment: any) => {
                  return (
                    <OldComment
                      id={data.id}
                      name={data.name}
                      year={data.annual}
                      txt={comment.comment_content}
                      updateTime={data.updated_at}
                      isArrow={true}
                      clickFunc={commentEdit}
                      clickFunc2={commentDelete}
                    />
                  );
                }),
              );
            }
          })()}
          <Pagenation searchFunc={() => console.log('a')} lastPage={1} />
        </section>
      </motion.div>
      <Modal
        type="company-comment"
        showModal={showModal}
        setShowModal={setShowModal}
        companyId={props.companyId}
        getCompanyData={props.getCompanyData}
        getComment={getComment}
      />
      {companyComments && (
        <>
          <Modal
            type="company-comment-edit"
            showModal={showModal2}
            setShowModal={setShowModal2}
            companyId={companyComments.id}
            getCompanyData={props.getCompanyData}
            getComment={getComment}
            content={editContent}
            editId={editId}
          />
          <Modal
            type="company-comment-delete"
            showModal={showModal3}
            setShowModal={setShowModal3}
            companyId={companyComments.id}
            getCompanyData={props.getCompanyData}
            getComment={getComment}
            deleteId={deleteId}
          />
        </>
      )}
    </>
  );
};

export default About;
