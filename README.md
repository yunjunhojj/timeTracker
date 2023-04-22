## 배포 URL : https://time-tracker.site
## Test Auth => ID : test@test.test, PW : testtest

# 기획 
> 요즘 취업 준비를 하면서 시간 관리가 안되는 것을 느끼고, 나에게 필요한 사이트를 직접 만들어 보자고 생각했습니다. 


1. 로그인 페이지: 이 페이지에서는 사용자가 자격 증명(사용자 이름/이메일 및 비밀번호)을 입력하여 앱에 로그인할 수 있어야 합니다. 이 기능을 위해 Firebase 인증 또는 Passport.js와 같은 인증 라이브러리를 사용할 수 있습니다.

2. 가입 페이지: 이 페이지에서는 신규 사용자가 사용자 이름, 이메일 및 비밀번호와 같은 정보를 입력하여 계정을 만들 수 있습니다. 위에서 언급한 것과 동일한 인증 라이브러리를 사용하여 사용자 등록을 처리할 수 있습니다.

3. 포모도로 타이머 페이지: 이 페이지에는 사용자가 작업 및 휴식 시간을 관리하는 데 사용할 수 있는 포모도로 타이머가 표시되어야 합니다. react-timer-hook 또는 react-pomodoro-timer와 같은 라이브러리를 사용하여 이 기능을 구현할 수 있습니다.

4. 할 일 목록 페이지: 이 페이지에는 사용자가 완료해야 하는 작업 목록이 표시되어야 합니다. 사용자는 새 작업을 추가하고 작업을 완료된 것으로 표시하고 작업을 삭제할 수 있어야 합니다. react-beautiful-dnd 또는 react-sortablejs와 같은 라이브러리를 사용하여 끌어서 정렬할 수 있는 할 일 목록을 만들 수 있습니다.

5. 대시보드 페이지: 이 페이지는 앱 내 사용자 활동의 개요를 표시해야 합니다. 여기에는 완료된 작업, 추적된 총 시간 및 기타 통계와 같은 정보가 포함될 수 있습니다. chart.js 또는 react-vis와 같은 라이브러리를 사용하여 데이터 시각화 차트를 표시할 수 있습니다.

6. 타임테이블 페이지: 이 페이지에서는 사용자가 작업 및 활동에 대한 시간표를 만들 수 있습니다. 사용자는 새 작업을 추가하고, 시작 및 종료 시간을 설정하고, 작업을 편집하거나 삭제할 수 있어야 합니다. react-big-calendar 또는 react-week-calendar와 같은 라이브러리를 사용하여 사용자를 위한 맞춤형 캘린더를 만들 수 있습니다.

위와 같이 6개의 페이지로 구성된 웹사이트를 만들 것을 기획하게 됐습니다. 

# 개발 
<img width="819" alt="image" src="https://user-images.githubusercontent.com/50473516/233766785-846810d8-fa3b-4e80-9d54-9d7ca619115b.png">

## 라이브러리 선정 
1. 백엔드 : 빠른 개발 환경을 위해서 firebase를 사용했습니다. 오히려 이렇게 firebase를 사용하는 것이 Auth 관련해서 더욱 신뢰성 좋은 서비스라고 생각했습니다. 
2. 상태 관리 : 많은 상태관리가 필요하진 않아 context를 사용하려 했으나, 개인적 공부를 위해 redux toolkit을 사용해서 todo의 상태관리를 했습니다. 
3. 프레임워크 : React(라이브러리)를 사용했습니다. SPA를 구현함으로써 사용자의 편의성을 높혀줄 것을 의도했습니다. 
4. 사용된 라이브러리 : styled-component 와 mui 를 사용해서 css를 구성했습니다. echart를 사용해서 chart를 구현했습니다. 
5. 배포 : firebase를 사용해서 배포하고, google analytics 를 연결해놨습니다. 


# 주요 페이지 
## Auth 
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/50473516/233765993-7c491d8f-9069-4a47-8052-a19bcc1b46f5.png">
<img width="1428" alt="image" src="https://user-images.githubusercontent.com/50473516/233766027-9c88eefa-33f8-4540-99e0-8817e2a5cfb7.png">

- form 형태로 구성되어 있으며, 특이 사항은 없습니다.

## Pomodoro 
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/50473516/233766083-10b8bc16-1728-4df1-b940-025891496094.png">

- useEffect 를 활용해서 1초마다 화면에 랜더링 되는 숫자를 변경시켜서 pomodoro를 구현했습니다. 한번의 focus time을 완료할 때마다 서버의 데이터를 저장하도록 구현했습니다.

## Todo 
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/50473516/233766737-abeab20a-61aa-47b3-9295-5a4fc9176974.png">
- 기본적인 todo list page 입니다. 특이사항은 없으며, todo의 상태를 redux로 관리하고 있습니다. 개인적인 생각으로는 react-query 같은 서버상태 관리로 구현하거나, context와 가벼운 상태관리 라이브러리를 사용하는 것이 더 좋다고 생각합니다. 

## Dashboard
<img width="1430" alt="image" src="https://user-images.githubusercontent.com/50473516/233766256-3fad5f9c-eb97-4bb6-869b-cdd60d4d4554.png">

- 서버에 있는 데이터를 기반으로 데이터를 표현해줍니다. chart는 Echart 라이브러리를 사용해서 구현했습니다. 

## Timetable 
<img width="1425" alt="image" src="https://user-images.githubusercontent.com/50473516/233767212-c9e95a7b-7f4a-4be8-a3a6-c09450eb436d.png">

- mui를 사용해서 time table을 구현했습니다. 이를 통해 쉽게 반응형으로 구현할 수 있었습니다. (모바일 : 2열, 나머지 : 3열) 

# 느낀점 및 추후 진행
- 혹시 모를 영어권 유저를 생각해서 모든 개발 및 내부 주석들을 영어로 작성하면서, 영어공부의 필요성을 느꼈습니다. 
- 기능적으로는 추가할 내용이 없을 것으로 생각됩니다. 
- 빠른 개발을 위해 코드에 많은 고민을 못했다고 생각합니다.
- 코드적으로 더 좋은 코드를 고민해봐야 할 것 같습니다. 
