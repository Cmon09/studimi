# Studimi — Dimigo Study Support Web Service
_support lectures • CA • projects_

> 교내 통합 학습 커뮤니티 플랫폼

---

## Features
- 📚 온라인 강의/과제: 그룹 매칭, 과제/일정공유, one-click접속
- 💬 실시간 멘토링 센터: 질문/답변, 전문멘토 배치, HiClass 연동 서비스
- 👥 동아리 통합 관리: 현황, 모집, 협업매칭
- ✅ 스마트 Todo-list: 자동알림, 진행상황 시각화, 팀프로젝트 공동 관리
- 📆 나만의 캘린더: 일정표시, 추가/삭제, 당일알림

---

## Tech Stack
**Frontend**: HTML5, CSS3, Vanilla JavaScript  
**Backend**: Node.js + Express.js  
**DB**: SQLite3

---

## struct

## 📁 Project Structure

```plaintext
studimi/
├── static/
│   ├── css/
│   │   └── message.css
│   │
│   └── js/
│       ├── server.js
│       ├── db.js
│       └── db_init.js
│
├── templates/
│       ├── index.html
│       ├── lectures.html
│       ├── mentoring.html
│       ├── clubs.html
│       └── todo.html
│
├── studimi.db
├── package.json
└── package-lock.json
