import * as activitiesAPI from "@/api/activities";
import { log } from "#serv";

// action types
const GET_ACTIVITIES = "activities/GET_ACTIVITIES";
const GET_ACTIVITIES_SUCCESS = "activities/GET_ACTIVITIES_SUCCESS";
const GET_ACTIVITIES_FAIL = "activities/GET_ACTIVITIES_FAIL";

// action creator function. action is also function(for handling Promise)
// it returns (dispatch)=>{}. redux-thunk gives dispatch and getState automatically
export const get_activities = () => async (dispatch) => {
  const [success, fail] = [
    `${GET_ACTIVITIES}_SUCCESS`,
    `${GET_ACTIVITIES}_FAIL`,
  ];
  try {
    const activities = await activitiesAPI.getActivities();
    dispatch({ type: success, payload: activities });
  } catch (error) {
    dispatch({ type: fail, error });
  }
};

// initialState
const initialState = {
  activities: {
    data: [
      {
        url: "http://connects.casper.or.kr/api/w00/activities/15/",
        id: 15,
        title: "새해맞이 C++",
        type: "Study",
        author: "titanium52658@gmail.com",
        createDate: "2021-12-27",
        description:
          '<p>모집 인원 : 00명</p><p>장소 : 창원대 51호관 113호</p><p>일시 : 평균 주 2회</p><p>공부 내용 : <a href="https://modoocode.com/135">https://modoocode.com/135</a> 이걸로 할듯</p><p>¼, 1/5, 1/11 ~ 진행중</p>',
        startDate: "2022-01-04",
        endDate: "2022-01-05",
        currentState: 0,
        viewerNum: 0,
        tags: [
          {
            tag_id: 1,
            tag_name: "casper",
          },
          {
            tag_id: 24,
            tag_name: "C++",
          },
          {
            tag_id: 25,
            tag_name: "system",
          },
        ],
        participants: [
          {
            user_id: 8,
            profile: {
              email: "titanium52658@gmail.com",
              name: "zero H",
              given_name: "zero",
              family_name: "H",
              picture:
                "https://lh3.googleusercontent.com/a-/AOh14Gisph9QyEppCtbcNvIXsRd-_Pv7mX6JHHFYcdJo7A=s96-c",
            },
            user_name: "zero H",
          },
          {
            user_id: 14,
            profile: {
              email: "gomwer678@gmail.com",
              name: "박준범",
              given_name: "준범",
              family_name: "박",
              picture:
                "https://lh3.googleusercontent.com/a/AATXAJz9ax7fvrB2zQGCpppDjXD7q8BEPA3ZTEiSUnKZ=s96-c",
            },
            user_name: "박준범",
          },
          {
            user_id: 13,
            profile: {
              email: "sssm092843@gmail.com",
              name: "신성민",
              given_name: "성민",
              family_name: "신",
              picture:
                "https://lh3.googleusercontent.com/a-/AOh14Ghv3JwxM1lnAeFEK_L11UI3FSYLmxVtLVcwulIw=s96-c",
            },
            user_name: "신성민",
          },
        ],
      },
      {
        url: "http://connects.casper.or.kr/api/w00/activities/6/",
        id: 6,
        title: "ARP spoofing",
        type: "Project",
        author: "webmon0727@gmail.com",
        createDate: "2021-12-26",
        description:
          "<ul><li>ARP spoofing 원리 공부해보기<ul><li>C++ / pcap handler 이용</li><li>패킷 헤더 분석</li><li>직접 다중 arp spoofing 구현</li></ul></li></ul>",
        startDate: "2021-12-01",
        endDate: "2021-12-31",
        currentState: 2,
        viewerNum: 0,
        tags: [
          {
            tag_id: 1,
            tag_name: "casper",
          },
          {
            tag_id: 14,
            tag_name: "arp",
          },
          {
            tag_id: 15,
            tag_name: "spoofing",
          },
          {
            tag_id: 16,
            tag_name: "network",
          },
          {
            tag_id: 17,
            tag_name: "MITM",
          },
        ],
        participants: [
          {
            user_id: 6,
            profile: {
              email: "webmon0727@gmail.com",
              name: "이주원_5420",
              given_name: "주원_5420",
              family_name: "이",
              picture:
                "https://lh3.googleusercontent.com/a/AATXAJz2bV3xdf2I277DzLSnApaiEzaaE4Hr6qbWq9O_=s96-c",
            },
            user_name: "이주원_5420",
          },
          {
            user_id: 3,
            profile: {
              email: "woohyun212@gmail.com",
              name: "우현",
              given_name: "우현",
              picture:
                "https://lh3.googleusercontent.com/a-/AOh14Gi6sTTgUdCqal24xY16x5nELqjvUbjjyNKb5iPtSA=s96-c",
            },
            user_name: "우현",
          },
        ],
      },
      {
        url: "http://connects.casper.or.kr/api/w00/activities/8/",
        id: 8,
        title: "Log4Shell 파헤치기",
        type: "Study",
        author: "whdals7979@gmail.com",
        createDate: "2021-12-26",
        description:
          '<p>2021년도에 이슈가 있었던 Log4shell 정리 글 올립니다.</p><p><a href="https://twilight-princess-750.notion.site/log4shell-d05164fb408e45f39829c9b60506a794">https://twilight-princess-750.notion.site/log4shell-d05164fb408e45f39829c9b60506a794</a></p>',
        startDate: "2021-12-23",
        endDate: "2021-12-26",
        currentState: 2,
        viewerNum: 0,
        tags: [
          {
            tag_id: 1,
            tag_name: "casper",
          },
          {
            tag_id: 19,
            tag_name: "RCE",
          },
          {
            tag_id: 20,
            tag_name: "Log4j",
          },
          {
            tag_id: 21,
            tag_name: "Log4Shell",
          },
          {
            tag_id: 22,
            tag_name: "CVE-2021-44228",
          },
        ],
        participants: [
          {
            user_id: 5,
            profile: {
              email: "whdals7979@gmail.com",
              name: "김종민_7202",
              given_name: "7202",
              family_name: "김종민_",
              picture:
                "https://lh3.googleusercontent.com/a-/AOh14Gg9pomjEoG2ZS31NhEL5rAVTHKFhAiYm2xnY0XoWw=s96-c",
            },
            user_name: "김종민_7202",
          },
        ],
      },
      {
        url: "http://connects.casper.or.kr/api/w00/activities/9/",
        id: 9,
        title: "REST API 환경의 소셜 인증 과정",
        type: "Study",
        author: "gsniper777@gmail.com",
        createDate: "2021-12-26",
        description:
          '<p>(별도의 챕터를 마련하지는 않겠습니다.)</p><p>&nbsp;</p><p>REST API 서버들이 구글 API 서버와 통신하며 인증을 수행하는 과정</p><p><a href="https://floodnut.notion.site/Django-REST-API-Social-Auth-8dc88091b7f9411b81fb105dc354f7e4#e35d4429bf124f6e97c245b1bb62691e">https://floodnut.notion.site/Django-REST-API-Social-Auth-8dc88091b7f9411b81fb105dc354f7e4#e35d4429bf124f6e97c245b1bb62691e</a></p>',
        startDate: "2021-12-31",
        endDate: "2021-12-26",
        currentState: 2,
        viewerNum: 0,
        tags: [
          {
            tag_id: 23,
            tag_name: "REST",
          },
        ],
        participants: [
          {
            user_id: 2,
            profile: {
              email: "gsniper777@gmail.com",
              name: "정금종",
              given_name: "금종",
              family_name: "정",
              picture:
                "https://lh3.googleusercontent.com/a/AATXAJyzgqaMSo0E6yJiLQhvnmlVjvbXrQJD_qIpAQmrNg=s96-c",
            },
            user_name: "정금종",
          },
        ],
      },
    ],
    loading: false,
    error: false,
  },
  activity: {
    37: {
      loading: false,
      data: {
        url: "http://connects.casper.or.kr/api/w00/activities/37/",
        id: 37,
        title: "동계 자격증 스터디",
        type: "Study",
        author: "gsniper777@gmail.com",
        createDate: "2022-01-10",
        description:
          "<ul><li>기간 : 2022년 1월 ~ 2월 (평일)</li><li>스터디 진행 시간 : 오전 10시 ~ 12시 (2시간)</li><li>스터디 방식<ul><li>각자 정한 스터디 대상 자격증, 어학, 기타 시험 등을 오전에 디스코드에 모여 공부</li><li>오전 2시간 고정, 매일 마무리 후 각자 정리한 노트만 공유하고 마무리</li><li>불참 시, 사정이 있는 경우 미리 말해주기</li><li>정리노트, 불참 사유 등 모든 기록은 챕터와 댓글에 작성</li></ul></li></ul>",
        startDate: "2022-01-10",
        endDate: "2022-02-25",
        currentState: 1,
        viewerNum: 0,
        tags: [
          {
            tag_id: 55,
            tag_name: "스터디",
          },
          {
            tag_id: 56,
            tag_name: "자격증",
          },
          {
            tag_id: 57,
            tag_name: "토익",
          },
        ],
        participants: [
          {
            user_id: 2,
            profile: {
              email: "gsniper777@gmail.com",
              name: "정금종",
              given_name: "금종",
              family_name: "정",
              picture:
                "https://lh3.googleusercontent.com/a/AATXAJyzgqaMSo0E6yJiLQhvnmlVjvbXrQJD_qIpAQmrNg=s96-c",
            },
            user_name: "정금종",
          },
          {
            user_id: 9,
            profile: {
              email: "zxcv0620@gmail.com",
              name: "퐁치퐁치",
              given_name: "치퐁치",
              family_name: "퐁",
              picture:
                "https://lh3.googleusercontent.com/a-/AOh14GgLb1QlgjoF0r-MYmp5E0Eqv8uqk57owpQK2PjRpg=s96-c",
            },
            user_name: "퐁치퐁치",
          },
          {
            user_id: 14,
            profile: {
              email: "gomwer678@gmail.com",
              name: "박준범",
              given_name: "준범",
              family_name: "박",
              picture:
                "https://lh3.googleusercontent.com/a/AATXAJz9ax7fvrB2zQGCpppDjXD7q8BEPA3ZTEiSUnKZ=s96-c",
            },
            user_name: "박준범",
          },
          {
            user_id: 13,
            profile: {
              email: "sssm092843@gmail.com",
              name: "신성민",
              given_name: "성민",
              family_name: "신",
              picture:
                "https://lh3.googleusercontent.com/a-/AOh14Ghv3JwxM1lnAeFEK_L11UI3FSYLmxVtLVcwulIw=s96-c",
            },
            user_name: "신성민",
          },
        ],
        chapterid: [
          {
            activityid: 37,
            chapterid: 19,
            subject: "2022년 1월 11일(화)",
            created_time: "2022-01-10T21:32:24.322452+09:00",
            last: 0,
            next: 21,
          },
          {
            activityid: 37,
            chapterid: 21,
            subject: "2022년 1월 12일(수)",
            created_time: "2022-01-12T12:02:22.270085+09:00",
            last: 19,
            next: 22,
          },
          {
            activityid: 37,
            chapterid: 22,
            subject: "2022년 1월 13일(목)",
            created_time: "2022-01-13T14:17:19.003666+09:00",
            last: 21,
            next: 23,
          },
          {
            activityid: 37,
            chapterid: 23,
            subject: "2022년 1월 14일(금)",
            created_time: "2022-01-14T12:03:55.746615+09:00",
            last: 22,
            next: 23,
          },
        ],
      },
      error: null,
    },
    30: {
      loading: false,
      data: {
        url: "http://connects.casper.or.kr/api/w00/activities/30/",
        id: 30,
        title: "리버(강)싱(노래하다) 엌",
        type: "Project",
        author: "tmxk9921@gmail.com",
        createDate: "2022-01-04",
        description:
          "<p>처음에는 간단하게 지뢰찾기 핵부터 만들어볼 생각입니당</p><p>단순하게 리버싱만 하는건 아니고 임베디드 해킹쪽이니 관심있으면 같이 ㄱㄱ</p><p>시디키 분석 + 지뢰찾기 핵 → 아키텍쳐 분석→ iptime 펌웨어 분석 → &nbsp;공유기에서 펌웨어 뜨기 → &nbsp;공유기 코드 만들기 → 공유기 서버를 사설로(?)</p><p>&nbsp;</p><p>p.s.&nbsp;</p><p>근데 커넥트 사이트 자음이 두글자씩 써지는 버그가 있네요</p><p>어? 왜 두번써지지? 어? 왜 두번써지지?</p><p>1월 4일부터 4월 1일 만우절 까지</p><p>알려주셔서 감사합니다 엉엉</p><p>저렇게 하는게 맞나?</p>",
        startDate: "2022-01-04",
        endDate: "2022-04-01",
        currentState: 1,
        viewerNum: 0,
        tags: [
          {
            tag_id: 45,
            tag_name: "리버싱",
          },
        ],
        participants: [
          {
            user_id: 10,
            profile: {
              email: "tmxk9921@gmail.com",
              name: "이희중",
              given_name: "희중",
              family_name: "이",
              picture:
                "https://lh3.googleusercontent.com/a/AATXAJwzDQ6amNjm8ZP3RrdO7Sa16xgQIVOyU_HlDk0Y=s96-c",
            },
            user_name: "이희중",
          },
        ],
        chapterid: [],
      },
      error: null,
    },
  },
};

// reducer
export const activities = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: {
          ...state.activities,
          // data는 기존 값을 유지하도록 함.
          loading: true,
          error: null,
        },
      };
    case GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_ACTIVITIES_FAIL:
      return {
        ...state,
        activities: {
          ...state.activities,
          loading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
};

export default activities;
