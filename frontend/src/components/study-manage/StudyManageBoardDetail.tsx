import ProfileImg from "components/common/ProfileImg";
import styled from "styled-components";
import { ReactComponent as Time } from "../../assets/icon/Time.svg";
import { ReactComponent as Eye } from "../../assets/icon/Eye.svg";
import { ReactComponent as Comment } from "../../assets/icon/Comment.svg";
import ReactMarkdown from "react-markdown";

const Wrapper = styled.div`
  margin: 3.889vw 21.111vw;
  display: flex;
  flex-direction: column;
`;

const ArticleHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1.111vw 0;
`;

const ArticleType = styled.div`
  background-color: red;
  border-radius: 2.083vw;
  color: white;
  padding: 0.139vw 0;
  font-size: 1.111vw;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.944vw;
  margin-right: 1.667vw;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.389vw;
  font-weight: bold;
`;

const ArticleInfo = styled.div`
  padding: 1.111vw 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.blackColorOpacity2};
`;

const Writer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.556vw;
`;

const Name = styled.div`
  padding: 0 0.556vw;
  font-size: 1.111vw;
`;

const SubInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.blackColorOpacity4};
`;

const Span = styled.span`
  margin-left: 0.556vw;
`;

const Date = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.556vw;
  font-size: 1.111vw;
`;

const Look = styled(Date)``;

const CommentCnt = styled(Date)``;

const ArticleContent = styled.div`
  height: auto;
  overflow: hidden;
  padding: 1.667vw 2.778vw;
  font-size: 1.111vw;
  line-height: 1.667vw;
`;

const FileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FileSub1 = styled.div`
  width: 10%;
  background-color: ${(props) => props.theme.blackColorOpacity3};
  text-align: center;
  padding: 0.556vw;
  border-radius: 3.472vw;
  margin-right: 0.556vw;
`;

const FileSub2 = styled.div``;

const ArticleBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0.556vw 0;
`;

const UpdateBtn = styled.button`
  background-color: ${(props) => props.theme.pointColor};
  border: none;
  margin: 0 0.278vw;
  padding: 0.347vw 0.972vw;
  cursor: pointer;
  border-radius: 0.278vw;
  box-shadow: 2px 2px 2px ${(props) => props.theme.blackColorOpacity};
  font-size: 0.972vw;
  color: white;
`;

const DeleteBtn = styled(UpdateBtn)`
  background-color: ${(props) => props.theme.subColor};
  color: black;
`;

const ListBtn = styled(UpdateBtn)`
  background-color: ${(props) => props.theme.mainColor};
  color: black;
`;

const CommentHeader = styled.div`
  font-size: 1.111vw;
  font-weight: bold;
`;

const CommentInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1.111vw 0vw;
  justify-content: space-evenly;
`;

const TextInput = styled.input`
  width: 85%;
  border: 1px solid ${(props) => props.theme.blackColorOpacity};
  padding: 0.417vw 1.111vw;
  border-radius: 3.472vw;
  font-size: 0.972vw;
`;

const WriteBtn = styled.button`
  border: none;
  padding: 0.347vw 0.972vw;
  cursor: pointer;
  border-radius: 0.278vw;
  background-color: ${(props) => props.theme.mainColor};
  box-shadow: 2px 2px 2px ${(props) => props.theme.blackColorOpacity};
  font-size: 0.972vw;
`;

const CommentList = styled.div``;

function StudyManageBoardDetail() {
  const post =
    "# 안녕\n\n## 안녕\n\n### 안녕\n\n안녕\n\n**안녕**\n\n***안녕***\n\n****안녕****\n\n> ****안녕****\n\n1.  안녕\n\n*   안녕\n\n안녕\n";

  return (
    <Wrapper>
      <ArticleHeader>
        <ArticleType>공지</ArticleType>
        <Title>제목입니다.</Title>
      </ArticleHeader>
      <ArticleInfo>
        <Writer>
          <ProfileImg width="2.222vw" />
          <Name>김싸피</Name>
        </Writer>
        <SubInfo>
          <Date>
            <Time fill="#898989" width="1.389vw" />
            <Span>2023-12-23 13:49</Span>
          </Date>
          <Look>
            <Eye stroke="#898989" width="1.667vw" />
            <Span>15</Span>
          </Look>
          <CommentCnt>
            <Comment fill="#898989" width="1.389vw" />
            <Span>2</Span>
          </CommentCnt>
        </SubInfo>
      </ArticleInfo>
      <ArticleContent>
        <ReactMarkdown>{post}</ReactMarkdown>
      </ArticleContent>
      <FileBox>
        <FileSub1>첨부 파일</FileSub1>
        <FileSub2>첨부파일 명</FileSub2>
      </FileBox>
      <ArticleBtn>
        <UpdateBtn>수정</UpdateBtn>
        <DeleteBtn>삭제</DeleteBtn>
        <ListBtn>목록</ListBtn>
      </ArticleBtn>
      <CommentHeader>댓글</CommentHeader>
      <CommentInput>
        <TextInput type="text" placeholder="댓글을 입력하세요." />
        <WriteBtn>작성</WriteBtn>
      </CommentInput>
      <CommentList></CommentList>
    </Wrapper>
  );
}

export default StudyManageBoardDetail;
