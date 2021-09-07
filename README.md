# 프로젝트명: 개인 블로그


### :link: SITE LINK
## http://www.cky.monster/


### :muscle: STACK
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

> React를 사용한 프론트 엔드 구현
> 
> Redux, Redux-Saga 를 통한 상태관리
> 
> Node JS 를 사용한 백엔드 서버 구현
> 
> mongoDB를 사용한 DB 구성
> 
> CKEdit5 api를 이용한 포스트 작성
> 
> AWS를 사용한 호스팅


### :large_blue_circle: 기능
:white_check_mark: 로그인,회원가입
:white_check_mark: 포스터 리스트 형태로 보기
:white_check_mark: 포스트 작성
:white_check_mark: 포스트 상세보기
:white_check_mark: 포스트 검색
:white_check_mark: 포스트 무한스크롤
:white_check_mark: 카테고리 별 포스트 보기
:white_check_mark: 댓글보기 및 작성
:white_check_mark: 프로필 수정하기
:white_check_mark: 회원 권한 별 기능부여


###  :large_blue_circle: 설명

```
개인 블로그형 사이트 프로젝트입니다. 기본적으로 모든 포스트를 스크롤 형태로 열람 가능하며
각 포스트는 클릭시 상세 보기가 가능합니다.
개인 블로그의 초점이 맞춰져 있기 때문에 권한이 있는 관리자만 포스트 작성이 가능하며,
일반적인 회원은 회원가입을 통해서 댓글작성이 가능합니다.
포스트 작성은 CKEdit5를 이용하여 보다 손쉽게 글을 작성 하도록 하였으며 사진,동영상 저장은
AWS S3를 통하여 데이터를 관리 하도록 하였습니다.
각 포스트에 카테고리 태그를 할당하여 카테고리를 클릭시 카테고리별 포스트를 열람 가능하며,
검색기능 또한 추가하여 대소문 상관없이 포스트 제목을 통한 검색이 가능하도록 하였습니다.
로그인 후 프로필 수정을 클릭시 비밀번호 또한 변경을 가능하도록 하였습니다.
전체적으로 프론트 구성은 React와 redux, bootstrap4를 통해 구현하였으며,
이와 상호작용하는 백엔드는 Node.js의 express를 통해 구현하였습니다.
DB부분은 MongoDB의 Mongoose를 통해 보다 데이터를 접근하여 구현하였습니다.
배포는 AWS를 통해 배포를 진행하였습니다.
```
