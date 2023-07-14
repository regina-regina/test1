import React, { useCallback, useState } from "react";
import styles from "../styles.module.css";
import { useEvent, useStore } from "effector-react";
import {
  $authorQuestionsData,
  $resultData,
  $storeModal,
  $tags,
  fetchAnswers,
  fetchAuthorQuestions,
  fetchSearch,
  fetchTags,
  modalOpen,
} from "../store";
import { Modal } from "../Components/Modal";
import { useNavigate } from "react-router";
import { Spinner } from "../Components/Spinner";
import Table from "../Components/Table";

export default function Result() {
  const navigate = useNavigate();
  const [isAuthorModal, setIsAuthorModal] = useState(false);

  const resultData = useStore($resultData);
  const authorQuestions = useStore($authorQuestionsData);
  const tagQuestions = useStore($tags);
  const modalStatus = useStore($storeModal);

  const isLoading = useStore(fetchSearch.pending);
  const isAuthorDataLoading = useStore(fetchAuthorQuestions.pending);
  const isTagDataLoading = useStore(fetchTags.pending);

  const fetchByAuthor = useEvent(fetchAuthorQuestions);
  const fetchByTag = useEvent(fetchTags);
  const fetchByTopic = useEvent(fetchAnswers);

  const onModalOpen = useEvent(modalOpen);

  const handleCloseModal = useCallback(() => {
    onModalOpen();
  }, []);

  const handleOpenModalAuthor = useCallback((id) => {
    fetchByAuthor(
      `https://api.stackexchange.com/2.3/users/${id}/questions?order=desc&sort=votes&site=stackoverflow`
    );
    if (!isAuthorDataLoading) {
      setIsAuthorModal(true);
      onModalOpen();
    }
  }, []);

  const handleOpenModalTag = useCallback((tag) => {
    fetchByTag(
      `https://api.stackexchange.com/2.3/tags/${tag}/faq?site=stackoverflow`
    );
    if (!isTagDataLoading) {
      setIsAuthorModal(false);
      onModalOpen();
    }
  }, []);

  const handleFetchAnswers = useCallback((topicId) => {
    fetchByTopic(
      `https://api.stackexchange.com/2.3/questions/${topicId}/answers?order=desc&sort=activity&site=stackoverflow&filter=!2oFPFV)_ZHMif_0U(7C2mUP6.4A5Dj5YOL56OQLu*b`
    );
    navigate("/question");
  }, []);

  const authorData = () => {
    return (
      <>
        {isAuthorDataLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <Table
            data={authorQuestions}
            handleFetchAnswers={handleFetchAnswers}
            handleOpenModalAuthor={handleOpenModalAuthor}
            handleOpenModalTag={handleOpenModalTag}
          />
        )}
      </>
    );
  };

  const tagData = () => {
    return (
      <>
        {isTagDataLoading ? (
          <Spinner />
        ) : (
          <Table
            data={tagQuestions}
            handleFetchAnswers={handleFetchAnswers}
            handleOpenModalAuthor={handleOpenModalAuthor}
            handleOpenModalTag={handleOpenModalTag}
          />
        )}
      </>
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Table
        data={resultData}
        handleFetchAnswers={handleFetchAnswers}
        handleOpenModalAuthor={handleOpenModalAuthor}
        handleOpenModalTag={handleOpenModalTag}
      />
      <Modal
        children={isAuthorModal ? authorData() : tagData()}
        isOpen={modalStatus}
        onClose={handleCloseModal}
      />
    </>
  );
}
