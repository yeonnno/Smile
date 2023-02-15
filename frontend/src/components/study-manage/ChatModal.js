import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Send } from "../../assets/icon/Send.svg";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { useRecoilValue } from "recoil";
import { studyIdRecoil } from "atoms/StudyManage";
import jwt_decode from "jwt-decode";
import { isError } from "react-query";

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  width: 22.222vw;
  height: 31.667vw;
  z-index: 999;
  background-color: white;
  border-radius: 1.111vw;
  position: absolute;
  right: 3.889vw;
  top: 40.556vw;
  transform: translate(-50%, -50%);
  border: 0.994px solid ${(props) => props.theme.blackColorOpacity3};
  box-shadow: 4.997px 4.997px 4.997px
    ${(props) => props.theme.blackColorOpacity};
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 10%;
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 1.111vw 1.111vw 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.278vw 1.111vw;
`;

const HeaderText = styled.div`
  font-weight: 600;
  font-size: 1.111vw;
  justify-content: flex-start;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 80%;
  background-color: ${(props) => props.theme.whiteColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0.278vw 1.111vw;
  overflow-y: scroll;
`;

const ChatList = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const EnterMsgBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* border: 0.994px solid red; */
  justify-content: center;
  width: 100%;
  padding: 0.556vw;

  div {
    /* background-color: ${(props) => props.theme.blackColorOpacity3}; */
    width: 100%;
    text-align: center;
    border-radius: 3.472vw;
    padding: 0.556vw 0;
    font-size: 0.694vw;
  }
`;

const ChatBubbleWrapperMe = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: right;
`;

const ChatBubbleWrapperYou = styled(ChatBubbleWrapperMe)`
  justify-content: flex-start;
  align-items: left;
`;

const NameMe = styled.div`
  width: 100%;
  font-size: 0.972vw;
  margin-bottom: 0.139vw;
  text-align: right;
  padding-right: 0.556vw;
`;

const NameYou = styled(NameMe)`
  text-align: left;
  padding-right: 0;
  padding-left: 0.556vw;
`;

const ChatBubbleMe = styled.div`
  max-width: 13.889vw;
  min-width: 6.944vw;
  position: relative;
  background: ${(props) => props.theme.mainColor};
  padding: 0.556vw;
  border-radius: 0.694vw;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;

  p {
    margin: 0;
    font-size: 0.833vw;
  }
`;

const ChatBubbleYou = styled(ChatBubbleMe)`
  background: ${(props) => props.theme.shadowColor};
`;

const ModalFooter = styled.form`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.278vw 1.111vw;
  justify-content: space-around;
  /* background-color: red; */
  padding: 0.556vw 1.111vw;
  /* border-top: 0.994px solid ${(props) => props.theme.blackColorOpacity}; */
`;

const TextBox = styled.input`
  width: 85%;
  border-radius: 1.111vw;
  border: none;
  background-color: #edebeb;
  height: 100%;
  outline: none;
  font-size: 0.556vw;
  padding: 0 0.556vw;
`;

const SendMsgBox = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const SendBtn = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color: ${(props) => props.theme.mainColor};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

function ModalBasic(props) {
  const [modalBasicClose, setModalBasicClose] = useState(true);
  // 모달 끄기
  const closeModal = () => {
    console.log("before : ", props.setModalOpen);
    props.setModalOpen(false);
  };
  const modalRef = useRef(null);
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  }, []);

  // const { apply_id } = useParams(); // 채널을 구분하는 식별자를 URL 파라미터로 받는다. => 스터디 코드
  const client = useRef({});

  // type : ENTER , TALK
  const [typeValue, setTypeValue] = useState("ENTER");

  // roomId : studyId
  const studyId = useRecoilValue(studyIdRecoil);

  // senderId : token userId 추출
  const [userId, setUserId] = useState();

  // senderName : user nickname
  // user nickname 정보 가져오기
  // const BASE_URL = `https://i8b205.p.ssafy.io/be-api`;
  const BASE_URL = `/be-api`;
  // 사용자 token값
  const nickName = "";
  useEffect(() => {
    const token = localStorage.getItem("kakao-token");
    if (token !== null) {
      const decoded = jwt_decode(token);
      setUserId(decoded?.userId);
    } else {
      console.log("none");
    }

    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}/users/3`, {
          headers: {
            // Authorization: `Bearer ${token}`,
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYzMDEyNDYsImV4cCI6MTY3NjM4NzY0Nn0.ZysqSzrc7kyFB37Lh7Xy5wBFcngkv68arQlFHULGCAoPoN3mmrasVwkh7voaWZqor_e5lLLFIhqPWu7p-pIO0A`,
            Accept: "application/json",
          },
        });

        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    }

    const userInfo = fetchData();
    console.log("회원 정보 : ", userInfo);
  });

  // message : chat
  const [chatList, setChatList] = useState([]); // 화면에 표시괼 채팅 기록
  const [chat, setChat] = useState(""); // 입력되는 채팅

  // 최초 입장시 Enter type 보내기위해 임시 설정
  const [firstEnter, setFirstEnter] = useState(false);

  console.log("charList : ", chatList);

  const connect = () => {
    // 연결할 때
    client.current = new StompJs.Client({
      // brokerURL: "ws://i8b205.p.ssafy.io/be-api/ws-stomp",
      webSocketFactory: () =>
        new SockJS("https://i8b205.p.ssafy.io/be-api/ws-stomp"), // proxy를 통한 접속
      onConnect: () => {
        console.log("connect success");
        subscribe(); // 연결 성공 시 구독하는 로직 실행

        // 최초 입장시 ENTER Type 보내기 위해 설정
        if (firstEnter) {
          console.log("입장");
          publish();
          setFirstEnter(false);
        }
      },
      debug: function (str) {
        console.log("debug : ", str);
      },
    });
    client.current.activate(); // 클라이언트 활성화
  };

  const publish = (chat) => {
    if (!client.current.connected) {
      console.log("publish : 클라이언트 연결 FAIL");
      return; // 연결되지 않았으면 메시지를 보내지 않는다.
    }

    // 메시지 보내기
    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        type: typeValue, //먼저 방에 들어올때 - ENTER,  메시지를 보낼떄 - TALK
        roomId: 1, //스터디 ID
        senderId: 3, //유저 id
        senderName: "익명" + 3, //유저 이름
        message: chat, //메시지
      }), // 형식에 맞게 수정해서 보내야 함.
    });

    setChat("");
  };
  //
  // 메시지 받기 {우리 주소}/studies/{studyId}/chats
  const subscribe = () => {
    console.log("subscribe");
    // client.current.subscribe("/sub/chat/room/" + apply_id, (body) => {
    client.current.subscribe("/sub/chat/room/1", (body) => {
      const json_body = JSON.parse(body.body);
      console.log("json_body : ", json_body);
      setChatList((_chat_list) => [..._chat_list, json_body]);
    });
  };

  const disconnect = () => {
    // 연결이 끊겼을 때
    console.log("disconnect!!!");
    client.current.deactivate();
  };

  const handleChange = (event) => {
    // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  const handleSubmit = (event, chat) => {
    // 보내기 버튼 눌렀을 때 publish
    console.log("handleSubmit");
    event.preventDefault(); // form 제출 막기
    setTypeValue("TALK");
    publish(chat);
  };

  useEffect(() => {
    setFirstEnter(true);
    connect();

    return () => disconnect();
  }, []);

  console.log("chatList : ", chatList);

  return (
    <ModalContainer ref={modalRef}>
      <ModalHeader>
        <HeaderText>Message</HeaderText>
      </ModalHeader>
      <ModalContent>
        <ChatList>
          {chatList?.map((el, index) => {
            if (el.type === "ENTER") {
              return (
                <EnterMsgBox key={index}>
                  <div>{el.message}</div>
                </EnterMsgBox>
              );
            } else {
              if (el.senderId === userId) {
                return (
                  <ChatBubbleWrapperMe>
                    {/* 내 채팅이 보여질 구간 */}
                    <div>
                      <NameMe>{el.senderName}</NameMe>
                      <ChatBubbleMe>
                        <p>{el.message}</p>
                      </ChatBubbleMe>
                    </div>
                  </ChatBubbleWrapperMe>
                );
              } else {
                return (
                  <ChatBubbleWrapperYou>
                    {/* 상대방 채팅이 보여질 구간 */}
                    <div>
                      <NameYou>{el.senderName}</NameYou>
                      <ChatBubbleYou>
                        <p>{el.message}</p>
                      </ChatBubbleYou>
                    </div>
                  </ChatBubbleWrapperYou>
                );
              }
            }
          })}
        </ChatList>
      </ModalContent>
      <ModalFooter onSubmit={(event) => handleSubmit(event, chat)}>
        <TextBox
          type={"text"}
          name={"chatInput"}
          onChange={handleChange}
          value={chat}
        ></TextBox>
        <SendMsgBox>
          <SendBtn type={"submit"}>
            {/* <Send width="100%" height="100%" /> */}
          </SendBtn>
        </SendMsgBox>
      </ModalFooter>
    </ModalContainer>
  );
}
export default ModalBasic;
