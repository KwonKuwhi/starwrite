import { _EditorBox, _EditorDiv } from './style';
import { useEffect, useState } from 'react';
import { Editor, GetSavings, NewPostHeadFeat } from '..';
import { useParams } from 'react-router-dom';
import {
  getsavingApi,
  newPostApi,
  newSavingApi,
  patchPostApi,
  patchSavingApi,
} from '../api/newPostApi';

function NewPostFeat() {
  // useParams로 postId 불러오기
  // 새글쓰기 - undefined
  // 임시저장 불러오기 - postId
  const { postId } = useParams();
  console.log('postId', { postId });

  // postId가 존재하면 글 정보 불러오기
  useEffect(() => {
    if (postId) {
      console.log(getsavingApi(Number(postId)));
    }
  }, [postId]);

  // 글 정보로 변경
  // 각각의 컴포넌트에서 불러오기

  const [openSaving, setOpenSaving] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [isPublic, setIsPublic] = useState<string>('true');
  const [content, setContent] = useState<string | undefined>();

  function publishPost() {
    const postData = {
      category: category,
      user: '2c05b09d-e6bd-40e7-84a3-3e1b8c7fb235',
      post: {
        title: title,
        content: content,
        visible: isPublic,
      },
      relatedPosts: [],
    };
    if (postId) {
      patchPostApi(postData);
    } else {
      console.log('data', postData);
      newPostApi(postData);
    }
  }

  function savePost() {
    const postData = {
      category: category,
      user: '2c05b09d-e6bd-40e7-84a3-3e1b8c7fb235',
      post: {
        title: title,
        content: content,
        visible: isPublic,
      },
      relatedPosts: [],
    };
    if (postId) {
      patchSavingApi(postData, Number(postId));
    } else {
      newSavingApi(postData);
    }
  }

  return (
    <_EditorBox>
      {openSaving && <GetSavings onclick={() => setOpenSaving(false)} />}
      <NewPostHeadFeat
        data={{ title, category, isPublic }}
        savePost={savePost}
        publishPost={publishPost}
        openSaving={() => setOpenSaving(!openSaving)}
        setTitle={(value: string) => {
          setTitle(value);
        }}
        setCategory={(value: string) => {
          setCategory(value);
        }}
        setIsPublic={(value: string) => {
          setIsPublic(value);
        }}
      />
      <_EditorDiv>
        <Editor
          setContent={(value: string) => {
            setContent(value);
          }}
        />
      </_EditorDiv>
    </_EditorBox>
  );
}

export default NewPostFeat;
