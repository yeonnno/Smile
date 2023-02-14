import { atom, selector } from "recoil";

// Study Id 저장
export const studyIdRecoil = atom({
  key: "studyId",
  default: "",
});

// 이벤트 클릭 상태값
export const dateState = atom({
  key: "dateState",
  default: false,
});

// recoil 추가..
export const Schedules = atom({
  key: "isSchedules",
  default: [{}],
});

// // 일정 단건
// export const ScheduleRegist = atom({
//   key: "scheduleRegist",
//   default: {},
// });

// // 값 잘 넘어오는 지 테스트용
// export const Selector = selector({
//   key: "selectorTest",
//   get: ({ get }) => {
//     // options의 매개변수에 있는 {get} function 가져오기
//     const data = get(ScheduleRegist);
//     return data;
//   },
// });