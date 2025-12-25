# 🎤 Complete Japanese Romaji Presentation Speech
## Employee Management System with Architecture & Code Explanations
## Duration: 12-13 Minutes

---

## 📋 PRESENTATION STRUCTURE / PUREZENTĒSHON KŌZŌ

**Total Time: 12-13 minutes**

1. **Jiko-shōkai (Introduction)** - 1.5 min
2. **Shisutemu Ākitekucha to Zu (System Architecture with Diagram)** - 2.5 min
3. **Raibu Demo to Kōdo Setsumei (Live Demo with Code Explanations)** - 6 min
4. **Gijutsu-teki na Giron (Technical Discussion)** - 2 min
5. **Q&A** - 1 min

---

# [SECTION 1: HAJIME NI / INTRODUCTION] (1.5 minutes)

## Aisatsu (Greeting)

Ohayou gozaimasu (Good morning).
Kyou wa arigatou gozaimasu (Thank you for today).

Watashi no namae wa S M Tanjilur Rahman desu (My name is...).
Ima, IRIS to React.js wo benkyou shite imasu (I am studying...).
Kyou wa Employee Management System ni tsuite hanashimasu (I will talk about...).

## PROJECT ni tsuite (About the Project)

Kore wa web application desu.
Shain no jouhou (employee information) wo kanri shimasu (manage).

Kono system wa CRUD kinou (functions) ga arimasu:
- Create - tsukuru (make/create)
- Read - yomu (read)
- Update - koushin suru (update)
- Delete - sakujo suru (delete)

## Omona kinou (Main Features)

- User touroku (user registration) to login (login)
- Atarashii shain wo tsuika shimasu (add new employees)
- Shain wo kensaku shimasu (search employees)
- Shain jouhou wo koushin shimasu (update employee information)
- Soft delete - data wo hozon shimasu (save/keep data)

## Gijutsu (Technology)

**Frontend:**
- React.js
- TypeScript
- Material-UI

**Backend:**
- InterSystems IRIS database
- ObjectScript

## Kyou no hanashi (Today's Presentation)

1. System Architecture
2. Live Demo

Dewa, hajimemashou (Let's begin).

---

# [SECTION 2: SYSTEM ARCHITECTURE] (2.5 minutes)

## Part 2.1: Architecture no setsumei (1.5 minutes)

**[Display: THREE_TIER_ARCHITECTURE.png]**

Kore wa system architecture desu (This is the system architecture).
Three-tier architecture wo tsukaimasu (we use...).

### Ue no layer (Top Layer) - Presentation Tier

**[Point to the top of diagram]**

Kore wa Presentation Tier desu.
User ga browser de tsukaimasu (users use with browser).

**Gijutsu (Technology):**
- React 18
- TypeScript - error (errors) wo mitsukemasu (find)
- Material-UI - kirei na UI
- React Router - page wo kaemasu (change pages)

Port 5173 de ugokimasu (runs on...).

### Mannaka no layer (Middle Layer) - Application Tier

**[Point to the middle of diagram]**

Kore wa Application Tier desu.
REST API desu.

**Shigoto (Work/Job):**
- User ninshou (authentication) - touroku to login
- Shain CRUD - Create, Read, Update, Delete
- Data henkan (data conversion) - JSON wo tsukaimasu

Kaihatsu chuu (during development):
- Port 5173 → Port 52773
- Vite proxy wo tsukaimasu
- CORS mondai (problems) wo kaiketsu shimasu (solve)

### Shita no layer (Bottom Layer) - Data Tier

**[Point to the bottom of diagram]**

Kore wa Data Tier desu.
InterSystems IRIS database desu.

**Tokuchou (Features):**
- Multi-model database
- ObjectScript wo tsukaimasu
- Object, SQL, Key-value - zenbu (all) dekimasu

**Juuyou (Important):**
- UTF-8 encoding
- Nihongo no namae to juusho (address)
- $ZCONVERT kansuu (function) wo tsukaimasu
- Mojibake (garbled text) shimasen

### Data no nagare (Data Flow)

**[Point to the arrows]**

1. User ga React de sousa shimasu (operate/use)
2. HTTP request wo okurimasu (send)
3. API ni ikimasu (go to...)
4. Database de shori shimasu (process)
5. JSON response wo kaeshimasu (return)
6. UI wo koushin shimasu (update)

Zenbu hayai desu (everything is fast)!

## Part 2.2: Merit (Benefits) (30 seconds)

**Kono architecture no ii tokoro (good points):**

1. **Bunri (Separation)**
   - Kaku layer wa chigau shigoto (different work)
   - Frontend - user experience
   - API - business logic
   - Database - data hozon (data storage)

2. **Scale dekimasu**
   - Database dake ookiku dekimasu (can make bigger)
   - API dake fuyasemasu (can increase)

3. **Gijutsu wo kaeraremasu (can change technology)**
   - React → Vue.js OK
   - IRIS → PostgreSQL OK

4. **Maintenance ga kantan (easy)**
   - Bug wo mitsuke yasui (easy to find bugs)
   - Naoshi yasui (easy to fix)

Dewa, demo wo mimashou (Let's see the demo)!

---

# [SECTION 3: LIVE DEMO] (6 minutes)

## Demo no shoukai (Introduction) (15 seconds)

Ima kara, account sakusei (account creation) kara shain kanri made misemasu (I will show...).

Atarashii browser de hajimemasu (start with new browser).

---

## [PHASE 1: USER TOUROKU] (60 seconds)

**[Navigate to: http://localhost:5173/signup]**

Mazu, atarashii user wo tsukurimasu (make new user).
Kore wa touroku form (registration form) desu.

### UI no setsumei

Kore wa SignUp component desu.

**React no controlled components:**
- Kaku input field - useState hook wo tsukaimasu
- User ga type suru to (when user types)
- Sugu state wo koushin shimasu (update immediately)

**[Form ni nyuuryoku shimasu Fill in the form]**
- Namae: Tanaka Tarou
- Mail: tanaka.taro@example.com
- Password: password123

### Check (Validation)

Touroku button wo click suru to (when click register button):

**Check suru koto (Things to check):**
- Zenbu nyuuryoku shimashita ka? (filled everything?)
- Mail ni @ ga arimasu ka? (@ in email?)
- Password wa 8-moji ijou desu ka? (8+ characters?)

**[Touroku button wo click]**

### API to no tsuushin (Communication)

Check OK nara (if check is OK):
- axios de API wo yobimasu (call API)
- POST request → /sem/signup
- JSON data wo okurimasu (send JSON data)

### Backend no shori

Backend de (at backend):
1. JSON wo uketorimasu (receive)
2. Mou ichido check shimasu (check again)
3. Mail ga sudeni arimasu ka? (email already exists?)
4. Atarashii account wo tsukurimasu (create)
5. Database ni hozon shimasu (save)

**[Seikou message Success message]**

Dekimashita (Done)!
Jidouteki ni (automatically) signin page ni ikimasu.

---

## [PHASE 2: LOGIN] (45 seconds)

**[Now on: http://localhost:5173/signin]**

Ima, login shimasu (Now, login).

**[Nyuuryoku shimasu Fill in]**
- Mail: tanaka.taro@example.com
- Password: password123

**[Login button wo click]**

### Backend de no kakunin (Confirmation)

API call → /sem/signin

Backend de:
1. Mail de account wo sagashimasu (search for account)
2. Password wo check shimasu (check password)
3. OK nara success

**Juuyou (Important):**
- Ima wa plain text (demo dakara for demo)
- Hontou wa (actually) bcrypt wo tsukaimasu

### Session kanri

Seikou shitara (if successful):
- localStorage ni hozon shimasu (save to localStorage)
- isLoggedIn = 'true'
- userEmail = mail address

**[/employees ni idou Move to /employees]**

Jidouteki ni shain list ni ikimashita!

---

## [PHASE 3: SHAIN LIST] (45 seconds)

**[Now on: http://localhost:5173/employees]**

Kore wa main no shain list page desu.

### Component no setsumei

EmployeeList component wa 3-tsu no React hooks wo tsukaimasu:

1. **useState** - data wo kanri shimasu (manage data)
   - Shain data
   - Kensaku keyword
   - Filter settings
   - Sort direction
   - Pagination

2. **useEffect** - shain wo load shimasu (load employees)

3. **useMemo** - hayaku shimasu (make fast)

### Data no load

Component ga load suru to (when component loads):
- GET request → /sem/employees
- Backend de database ni query
- deleteFlg = 0 dake (only deleteFlg = 0)
- Active na shain dake torimasu (get only active employees)

### Kensaku kinou

**[Kensaku box ni type: "Yamada"]**

Kensaku wa client-side desu.

**Nani wo check shimasu ka? (What to check?)**
- Shain bangou (Employee ID)
- Namae (Name)
- Kana namae (Kana Name)

Type suru to sugu table ga koushin saremasu (table updates immediately)!

**[Kensaku wo clear Clear search]**

Totemo hayai desu (very fast)!

---

## [PHASE 4: ATARASHII SHAIN WO TSUIKA] (90 seconds)

**[「Shinki touroku」button wo click]**

Atarashii shain wo tsuika shimasu (add new employee).

**[Now on: http://localhost:5173/employees/new]**

### Component no setsumei

EmployeeDetail component desu.

**3-tsu no mode:**
- Add mode (tsuika mode)
- Edit mode (henshuu mode)
- Delete mode (sakujo mode)

URL wo mite (look at URL) mode wo kimemasu (decide mode).

### Form ni nyuuryoku

**[Nyuuryoku shimasu Fill in]**

- Shain bangou: 12345 (5-keta 5 digits)
- Namae: Yamada Hanako
- Kana namae: Yamada Hanako
- Seibetsu (Gender): Josei (Female) - Database de 2
- Denwa (Phone): 090-1234-5678
- Busho (Department): Eigyoubu (Sales)
- Yuubin bangou (Post Code): 100-0001
- Juusho (Address): Tokyo-to Chiyoda-ku Chiyoda 1-1
- Taishoku (Retirement): Check shinai (not checked)

### Check (Validation)

**[Touroku button wo click]**

**Check suru koto:**
- Shain bangou wa 5-moji desu ka? (5 characters?)
- Namae wa arimasu ka? (name exists?)
- Seibetsu wa arimasu ka? (gender exists?)

### Kakunin Dialog

**[Dialog wo miseru Show dialog]**

「Hontou ni ii desu ka?」(Really OK?)

**[「Hai」wo click]**

### Backend no shori

Backend de:
1. Onaji shain bangou ga arimasu ka? (same ID exists?)
2. Atarashii employee object wo tsukurimasu (create)
3. Data wo set shimasu (set data)
4. UTF-8 conversion - Nihongo OK
5. deleteFlg = 0 (active)
6. Genzai no jikan (current time) wo hozon
7. %Save() - Database ni hozon shimasu (save to database)

**[Atarashii shain ga iru list wo miseru]**

Dekimashita (Done)!
Atarashii shain ga ichiban ue (at the top) ni arimasu!

---

## [PHASE 5: SHAIN WO HENSHUU] (60 seconds)

**[Edit icon wo click]**

Kono shain wo henshuu shimasu (edit this employee).

**[Now on: http://localhost:5173/employees/5]**

### Data no load

Component wa edit mode desu.
Sugu backend kara data wo torimasu (get data from backend).

Backend:
- %OpenId de data wo hirakimasu (open data)
- Sonzai shimasu ka? (exists?)
- Soft-delete sarete imasen ka? (not soft-deleted?)
- UTF-8 ni henkan shimasu (convert)
- Response wo kaeshimasu (return)

**[Form wo miseru Show form]**

Form ni data ga arimasu (form has data)!
Shain bangou wa disabled - kaeraremasen (cannot change).

### Data wo koushin

**[Field wo henkou Modify fields]**
- Busho: Gijutsubu (Technical Department)
- Taishoku: Check suru (check) - Kono hito wa taishoku shimashita (retired)

**[Koushin button wo click]**

Backend:
- UpdateEmployee wo yobimasu (call)
- %OpenId de hirakimasu (open)
- Kawatta data dake koushin shimasu (update only changed data)
- Jikan wo koushin shimasu (update time)
- %Save() - Database ni hozon shimasu (save)

**[Koushin sareta list wo miseru]**

Dekimashita (Done)!
- Busho ga Gijutsubu ni narimashita (became...)
- 「Taishoku zumi」badge ga arimasu!

---

## [PHASE 6: SOFT DELETE] (40 seconds)

**[Onaji shain no Edit wo click]**

Sakujo kinou (delete function) wo misemasu.

### Sakujo button

**[Shita no sakujo button wo miseru]**

Sakujo button wa Edit mode dake arimasu.

### Soft Delete to wa?

**[Sakujo button wo click, Dialog wo miseru]**

Hard delete ja arimasen (not hard delete).
Soft delete desu.

**[Kakunin wo click]**

Backend:
- Database kara sakujo shimasen (don't delete from database)
- deleteFlg = 1 ni shimasu (set to 1)
- Jikan wo koushin shimasu (update time)
- Hozon shimasu (save)

Data wa mada arimasu (data still exists)!
Tada flag = 1 desu.

**[List wo miseru - shain ga kieta]**

Shain ga list kara kiemashita (disappeared from list).
Naze? (Why?)
→ WHERE deleteFlg = 0 dakara

### Soft Delete no merit (Benefits)

**Ii tokoro (Good points):**

1. **Recovery dekimasu (Can recover)**
   - Machigaete sakujo shite mo (even if delete by mistake)
   - Flag wo 0 ni modoseba (if return flag to 0) OK

2. **Rireki ga nokorimasu (History remains)**
   - Zenbu no shain no kiroku (record)
   - Taishoku shita hito mo OK

3. **Data hoji (Data retention)**
   - Houritsu (law) de hitsuyou (necessary)
   - Nan-nen ka hozon shimasu (save for some years)

4. **ID no saiyou (ID reuse)**
   - Shain bangou 12345 wo mata tsukaemasu (can use again)
   - Database wa ("12345", 0) to ("12345", 1) wa chigaimasu (different)

---

## [PHASE 7: LOGOUT] (20 seconds)

**[Logout button wo click]**

Saigo (finally), logout shimasu.

### Logout no shori

handleLogout function:
1. clearAuthData wo yobimasu (call)
2. localStorage kara sakujo shimasu (delete from localStorage)
   - isLoggedIn
   - userEmail
3. Signin page ni ikimasu (go to signin page)

**[Signin page wo miseru]**

Signin ni modorimashita (returned to signin)!

**[/employees wo type]**

Moshi ima /employees ni ikou to suru to (if try to go to...)
→ ProtectedRoute ga check shimasu (checks)
→ localStorage wa kara (empty)
→ Sugu signin ni modorimasu (immediately return to signin)

Kore de secure desu (this is secure)!

---

## Owari (End)

Ijou desu (That's all).
Go-seichou arigatou gozaimashita (Thank you for listening).

Shitsumon wa arimasu ka? (Any questions?)

---

# [SECTION 4: GIJUTSU-TEKI NA GIRON / TECHNICAL DISCUSSION] (2 minutes)

## Jūyō na Gijutsu Kettei (Key Technical Decisions) (60 seconds)

Kono jisō de no jūyō na gijutsu kettei o kyōchō shimasu.

### 1. React Hooks over Class Components

Apurikēshon zentai ni hooks tsuki no functional components o erabimashita. useState, useEffect, useMemo nado no hooks wa class component no raifusaikuru (lifecycle) mesoddo yori kanketsu (concise) de, tesuto ga kantan de, modān na React no besuto purakutisu ni sorotte imasu. Tatoe (for example), EmployeeList no useMemo hook wa, mukankei (unrelated) na riyū de konpōnento ga sai-rendā suru toki ni fuhitsuyō na sai-keisan o fusegimasu.

### 2. TypeScript for Taipu Anzen-sei (Type Safety)

TypeScript interface ga dēta no seikaku (exact) na katachi (shape) o teigi shimasu - User, Employee, soshite API respponsu. Konpairā (compiler) wa kaihatsu-chū ni ikutsu ka no bagu o mitsukemashita. Sonzai shinai puropati ni akusesu shite itari, machigatta paramētā (parameter) taipu o watashite ita tokoro desu. Kono taipu chekku wa konpairu-jikan ni okonawareru node, ranntaimu pafōmansu ōbāheddo (runtime performance overhead) wa zero desu.

### 3. Sofuto Sakujo Jisō (Soft Delete Implementation)

deleteFlg o tsukau soft delete patān wa puroddakushon shisutemu ni totte junsui (crucial) desu. EmployeeId to deleteFlg no composite unique index wa tokuni ereganto (elegant) desu - ID-goto ni hitotsu no akutibu na shain dake o kyōsei (enforce) shinagara, onaji ID o motsu fukusū no sakujo sareta rekōdo o kyoka shimasu. Kore ni yori, hitsuyō na toki ni ID o saishiyō suru jūnan-sei (flexibility) ga ararematsu.

### 4. Kuraianto vs Sābā Sōsa (Client vs Server Operations)

Genzai no jisō wa chiisai dētasetto de no ōtō-sei (responsiveness) no tame ni kuraianto-saido firuta to sōto o shiyō shite imasu. Dēta ga zōka suru to, SQL OFFSET to LIMIT ku o tsukau sābā-saido pējinēshon o jisō shimasu. Furontoendo kara pēji bangō to firuta paramētā o watashi, bakkuendo wa gōkei (total) kaunto tsuki no pējinēshon sareta kekka o kaesu. Soshite UI ni pēji bangō o hyōji shimasu.

## Puroddakushon Kaizen (Production Improvements) (60 seconds)

Puroddakushon tenpai (deployment) no tame ni, ikutsu ka no kyōka ga hitsuyō ni narimasu.

### Sekyuriti Kyōka (Security Enhancements)

Dai-ichi, pasuwādo sekyuriti. Purēn tekisuto sutorēji no kawari ni tsuyoi wāku fakutā (work factor) tsuki no bcrypt hasshingu ga hitsuyō desu. Shinpuru na localStorage furagu no kawari ni ninshō no tame no JWT tōkun ga hitsuyō desu. Burūto fōsu kōgeki (brute force attack) o fusegu tame ni ninshō endopointo de rēto seigen (rate limiting) ga hitsuyō desu. Subete no tsūshin (communication) ni HTTPS kyōsei (enforcement) ga hitsuyō desu. Soshite XSS kōgeki o fusegu tame ni input sanitization ga hitsuyō desu.

### Pafōmansu Saitekika (Performance Optimization)

Dai-ni, pafōmansu. Ōkina dētasetto no tame ni sābā-saido pējinēshon to firuta ga hitsuyō desu. Hinpan ni kueri sareru karamu (column) ni tekisetsu na index o tsukatta dētabēsu kueri saitekika ga hitsuyō desu. Busho risuto nado no hinpan ni akusesu sareru dēta no tame ni Redis kyasshingu ga hitsuyō desu. Soshite shoki JavaScript bandoru saizu (bundle size) o herasu tame ni code splitting ga hitsuyō desu.

### Tsuika Kino (Additional Features)

Dai-san, kyōka sareta kino. Rōru-beisu akusesu kontorōru (role-based access control) ga hitsuyō desu - HR kanri-sha (administrator), busho manējā, soshite ippan shain ni chigau kengen (permission) ga arimasu. Dare ga itsu nani no dēta o kaeta ka o tsuiseki (track) suru kansa rogu ga hitsuyō desu. Ikkatsu sōsa (bulk operation) no tame no Excel inpōto to ekusupōto ga hitsuyō desu. Fukusū no firuta kijun to hozon sareta kensaku o motsu kōdo na kensaku ga hitsuyō desu. Soshite shain sutētasu henkō nado no jūyō na ibento (event) no tame no mēru tsūchi ga hitsuyō desu.

### Tesuto Senryaku (Testing Strategy)

Dai-yon (fourth), hōkatsu-teki na tesuto. Jest o tsukau bijinesu rojikku kansu no yunitto tesuto ga hitsuyō desu. API endopointo no tōgō tesuto ga hitsuyō desu. Playwright mata wa Cypress o tsukau jūyō na yūzā wākufurō no endo-tū-endo tesuto ga hitsuyō desu. Soshite kitai sareru dōji yūzā sū (number of concurrent users) o handoru dekiru koto o kakujitsu ni suru rōdo tesuto ga hitsuyō desu.

Kono yō na kaizen ni yotte, kono demonstrēshon shisutemu wa puroddakushon-redi na kigyō (enterprise) apurikēshon ni henshin (transform) shimasu.

---

# [SECTION 5: Q&A] (1 minute)

Gochūi itadaki, arigatō gozaimashita. Jisō, ākitekucha, gijutsu sentaku, mata wa shisutemu no ta no sokumen (aspect) ni tsuite, nani ka shitsumon ga areba, yorokonde okotae shimasu.

**[Pause and wait for questions / Shitsumon o machimasu]**

---

# SHŪRYŌ NO KOTOBA (CLOSING REMARKS)

**Moshi kore ijō shitsumon ga nakereba (If no more questions):**

Minasama, ojikan o itadaki, hontō ni arigatō gozaimashita. Kono purojekuto wa modān na gijutsu o tsukau full-stack development ni okeru subarashii gakushū keiken (excellent learning experience) deshita. React, TypeScript, soshite InterSystems IRIS to hatarakeru kikai o itadakete, kansha shite imasu. Furontoendo sutēto kanri (state management) kara dētabēsu saitekika, REST API dezain made, koko de eta sukirū wa shōrai no purojekuto de kichō (valuable) ni narimasu. Minasama no fīdobakku ni kansha shi, goteian (suggestion) o tekiyō dekiru koto o tanoshimi ni shite imasu.

Hontō ni arigatō gozaimashita.

---

# 📚 N4+ VOCABULARY REFERENCE

### Technical Terms:
- **kikai (機会)** = opportunity
- **kaihatsu (開発)** = development, developed
- **happyō (発表)** = presentation, present
- **kanri (管理)** = management, manage
- **teikyō (提供)** = provide
- **ninshō (認証)** = authentication, authenticate
- **sentaku (選択)** = choice
- **jūyō (重要)** = important
- **jisō (実装)** = implementation
- **shōrai (将来)** = future
- **kaizen (改善)** = improvement
- **kōritsu-teki (効率的)** = efficient, efficiently
- **saitekika (最適化)** = optimization
- **sekinin (責任)** = responsibility
- **fukuzatsu (複雑)** = complex
- **chokusetsu (直接)** = direct, directly
- **jidō-teki (自動的)** = automatically, automatic
- **tekisetsu (適切)** = appropriate, properly
- **eikyu-teki (永久的)** = permanently
- **kichō (貴重)** = valuable
- **kansha (感謝)** = gratitude, thanks, appreciate
- **hosho (保証)** = ensure, guarantee
- **junshū (遵守)** = comply, compliance
- **kyōchō (強調)** = emphasize, highlight
- **keikoku (警告)** = warning, warn
- **rieki (利益)** = benefit, advantage
- **kijun (基準)** = criteria, standard
- **sonzai (存在)** = exist, existence
- **hitsuyō (必要)** = necessary, need
- **kantan (簡単)** = simple, easy
- **shinpuru (シンプル)** = simple
- **kanzen (完全)** = complete
- **genzai (現在)** = currently, current
- **ippan (一般)** = general, regular
- **tokutei (特定)** = specific
- **kakujitsu (確実)** = ensure, certain
- **hōkatsu-teki (包括的)** = comprehensive
- **junsui (重水)** = crucial
- **kashikoi (賢い)** = clever, smart

---

# PRESENTATION TIPS / PUREZENTĒSHON TIPSU

## Before Starting:
1. Demo kankyō (environment) ga ugoku ka tesuto suru
2. Moshi demo ga shippai (fail) shita baai no bakkappu sukurīnshotto (backup screenshot) o junbi suru
3. Sekushon (section) no aida no sen'i o renshū (practice) suru
4. Jibun o taimingu (timing) suru - 12-13-fun o mezasu (aim for)
5. Subete no apurikēshon ga junbi sareta jōtai (state) de rapputoppu (laptop) o junbi suru

## During Presentation:
1. Tekisetsu na supīdo (speed) de hakkiri (clearly) hanasu
2. Iroirona hito to me o awaseru (make eye contact)
3. Zu o setsumei suru toki ni te de jesuchā (gesture) o tsukau
4. Kōdo o gyō-goto ni yomanai - gainen (concept) o setsumei suru
5. Moshi nanika ga kowaretara, ochitsuite (stay calm) sukurīnshotto o tsukau
6. Sekushon no aida ni sukoshi pōzu (pause) suru
7. Tokidoki (occasionally) jikan o chekku suru
8. Ōpun na bodi rangwēji (body language) de shitsumon o maneку (invite)

## For Architecture Diagram:
1. Sukurīn ni hakkiri (prominently) hyōji suru
2. Kaku tiyā o setsumei suru toki ni jissai ni sasu (point)
3. Yubi de dēta furō o nadoru (trace)
4. Isoganaide (don't rush)
5. Minna ga hakkiri miru koto ga dekiru ka kakunin suru

---

**Ganbatte kudasai! You've got this! 頑張ってください！🚀💪**