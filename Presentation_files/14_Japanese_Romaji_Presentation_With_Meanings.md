# 🎤 Japanese Romaji Presentation Speech with English Meanings
## Employee Management System - 12-13 Minutes

---

## 📋 Presentation Structure / Purezentēshon Kōzō

**Total Time: 12-13 minutes**
- Section 1: Jiko-shōkai (Introduction) - 1.5 min
- Section 2: Shisutemu Ākitekucha (System Architecture) - 2.5 min
- Section 3: Raibu Demo (Live Demo) - 6 min
- Section 4: Gijutsu-teki na Setsumed (Technical Discussion) - 2 min
- Section 5: Q&A - 1 min

---

## [SECTION 1: JIKO-SHŌKAI / INTRODUCTION] (1.5 minutes)

### Opening / Aisatsu (Greeting)

Ohayō gozaimasu. / Konnichiwa. Kyō wa kono yō na kikai (opportunity) o itadaki, arigatō gozaimasu.

Watashi no namae wa [Your Name] desu. Genzai (currently), IRIS de intān (intern) toshite hataraite imasu. Kyō wa, intānshippu (internship) chū ni kaihatsu (developed) shita Shain Kanri Shisutemu (Employee Management System) ni tsuite happyō (present) sasete itadakimasu.

### Project Overview / Purojekuto Gaiyō

Kore wa full-stack web apurikēshon (application) de, shain jōhō (employee information) o kanri (manage) suru tame no mono desu. Kono shisutemu (system) de wa:
- Yūzā (user) ga tōroku (register) to ninshō (authenticate) dekimasu
- Atarashii shain o dētabēsu (database) ni tsuika (add) dekimasu
- Shain rekōdo (record) o kensaku (search) shite, firuta (filter) dekimasu
- Shain jōhō (information) o kōshin (update) dekimasu
- Soshite taishoku jōkyō (retirement status) o fukumete, shain no raifusaikuru (lifecycle) o kanri (manage) dekimasu

Apurikēshon (application) wa modān (modern) na web gijutsu (technology) de tsukurarete imasu - furontoendo (frontend) wa React.js to TypeScript, bakkuendo (backend) wa InterSystems IRIS to ObjectScript o shiyō shite imasu.

### Presentation Objectives / Happyō Mokuteki

Tsugi no 12-fun (minutes) de:
1. Shisutemu ākitekucha (architecture) to gijutsu sentaku (technology choices) o setsumei (explain) shimasu
2. Kanzen (complete) na wākufurō (workflow) no raibu demonstrēshon (live demonstration) o shimasu
3. Kōdo (code) no jūyō (important) na gijutsu jisō (technical implementation) o setsumei shimasu
4. Soshite shōrai no kaizen-ten (areas for improvement) ni tsuite hanashimasu

Dewa, ākitekucha (architecture) kara hajimemashō.

---

## [SECTION 2: SHISUTEMU ĀKITEKUCHA / SYSTEM ARCHITECTURE] (2.5 minutes)

### Part 2.1: High-Level Overview / Zentai-zō (1 minute)

Apurikēshon (application) wa three-tier ākitekucha (architecture) ni shitagatte imasu.

**[Show architecture diagram / Zu o miseru]**

Jōi no layā (layer) ni wa **Furontoendo (Frontend)** ga arimasu - burauza (browser) de ugoku React single-page apurikēshon (application) desu. Kore wa yūzā (user) ga chokusetsu (directly) sōsa (interact) suru bubun (part) desu.

Mannaka (middle) ni wa **REST API layā (layer)** ga arimasu - kore wa furontoendo to bakkuendo (backend) no subete no komyunikēshon (communication) o shori (handle) shimasu. HTTP rikuesuto (request) o shori shi, dēta (data) o kensho (validate) shi, respponsu (response) o fōmatto (format) shimasu.

Sakanso (bottom layer) wa **Dētabēsu (Database)** desu - InterSystems IRIS ga yūzā akaunto (account) to shain rekōdo (record) o fukumeru subete no eizoku-teki (persistent) na dēta o hozon (store) shimasu.

Komyunikēshon (communication) no nagare (flow) wa kō desu: Yūzā ga React intāfesu (interface) to sōsa suru to, HTTP rikuesuto ga REST API ni okuraremasuokure. API ga kono rikuesuto o shori shi, dētabēsu sōsa (operation) o jikkō (execute) shi, JSON respponsu o furontoendo ni kaesu. Kore wa subete Vite development proxy o tsūjite okonawaremasu. Proxy ga pōto (port) 5173 kara IRIS sābā (server) no pōto 52773 ni rikuesuto o rūtingu (routing) shimasu.

### Part 2.2: Technology Stack Details / Gijutsu Sutakku Shōsai (1.5 minutes)

Gijutsu (technology) ni tsuite motto kuwaashiku (in more detail) setsumei shimasu.

**Furontoendo Sutakku (Frontend Stack):**

**React 18** to **TypeScript** o shiyō shite imasu. React wa konpōnento-beisu (component-based) na ākitekucha to kōritsu-teki (efficient) na rendāringu (rendering) o virtual DOM o tsūjite teikyō shimasu. TypeScript wa konpairu-jikan (compile-time) ni taipu chekku (type checking) o tsuika shi, puroddakushon (production) ni todoku mae ni erā (error) o mitsukeru no ni yakudachimasu.

UI furemuwāku (framework) toshite, **Material-UI** o erabimashita. Naze nara, purofesshonaru (professional) ni mieru, akuseshiburu (accessible) na konpōnento (component) o sugu ni teikyō suru kara desu. Google no Material Design gaidorain (guidelines) ni shitagatte ite, kaihatsu jikan (development time) o ōkiku setsuyaku dekimasu.

Kōdo (code) wa zentai-teki ni **React Hooks** o shiyō shite imasu - useState de konpōnento sutēto (state) o kanri, useEffect de API kōru (call) nado no saido efekuto (side effect), soshite useMemo de shain risuto (list) no pafōmansu (performance) o saitekika shimasu. Koko de wa ōkina dētasetto (dataset) o firuta shite sōto (sort) shite imasu.

Rūtingu (routing) ni wa **React Router v6** o shiyō shite imasu. Kore wa kuraianto-saido (client-side) no nabigēshon (navigation) o pēji rirōdo (reload) nashi de teikyō shimasu. ProtectedRoute konpōnento o jissō (implement) shimashita. Kore wa ninshō sareta (authenticated) pēji o hogo (protect) shimasu - moshi yūzā ga roguin (login) shinaide shain risuto ni akusesu shiyō to suru to, jidō-teki ni (automatically) sainin pēji (signin page) ni ridairekuto (redirect) saremasu.

**Bakkuendo Sutakku (Backend Stack):**

Bakkuendo dewa, **InterSystems IRIS** o jikkō shite imasu - kore wa maruchimoderu (multi-model) dētabēsu de, obujekuto (object), SQL, soshite kī-baryū (key-value) sutorēji (storage) o dōji ni sapōto shimasu.

Bijinesu rojikku (business logic) wa **ObjectScript** de kakarete imasu. Kore wa IRIS no neitibu gengo (native language) desu. ObjectScript wa persistent class o tsūjite dētabēsu to chokusetsu (direct) ni tōgō (integration) shimasu. Kore wa totemo pawāfuru (powerful) desu - %Persistent o extends suru class o teigi (define) suru to, IRIS ga jidō-teki ni taiō suru dētabēsu tēburu (table) o sakusei shi, SQL kueri (query) o seisei (generate) shi, %Save(), %OpenId(), %Delete() nado no mesoddo (method) o teikyō shimasu.

API layā (layer) ni wa, IRIS no **%CSP.REST furemuwāku (framework)** o shiyō shite imasu. Kore wa XData burokku (block) o tsūjite URL rūtingu tomo ni biru-in (built-in) REST nōryoku (capability) o teikyō shimasu. HTTP mesoddo (method), paramētā (parameter) o fukumu URL patān (pattern) o teigi shite, ClassMethod handorā (handler) ni mappingu dekimasu.

Jūyō na gijutsu-teki na shōsai (technical detail) wa **UTF-8 moji enkōdingu (character encoding)** desu. Nihonjin no shain namae to jūsho (address) o atsukatteiru node, kōdo zentai ni $ZCONVERT kansu (function) o shiyō shite imasu - furontoendo kara dēta o ukeru toki wa "I" direction, dēta o modoru toki wa "O" direction desu. Kore ni yotte, 山田太郎 no yō na Nihongo moji ga mojibake nashi de tadashiku hyōji saremasu.

Dewa, kono shisutemu o jissai ni ugokashite mimashō.

---

## [SECTION 3: RAIBU DEMO / LIVE DEMO] (6 minutes)

### Setup Introduction / Demo Junbi (15 seconds)

Tōroku (registration) kara shain kanri made no kanzen (complete) na yūzā jānī (user journey) o demonstrēto (demonstrate) shimasu. Kakuステップ (each step) o susumeru aida, kaku kino (feature) no ushiro ni aru kī na kōdo jisō (code implementation) o kantan ni setsumei shimasu.

Aratana burauza sesshon (session) de kanzen na furō (flow) o misemasu.

---

### [DEMO PHASE 1: YŪZĀ TŌROKU / USER REGISTRATION] (60 seconds)

**[Navigate to signup page / Saināpu pēji ni ido]**

Mazu, atarashii yūzā wa akaunto o tsukuru hitsuyō ga arimasu. Kore ga tōroku fōmu (form) desu.

**[Show SignUp component code / SignUp konpōnento kōdo o miseru]**

Kono SignUp konpōnento wa React no controlled components patān (pattern) o shiyō shite imasu. Kaku input firudo (field) wa useState o tsukatte sutēto hensu (state variable) ni bindo (bind) sarete imasu - dakara yūzā ga taipu suru to, konpōnento sutēto ga sugu ni kōshin (update) sare, React ga atarashii chi (value) de input o sai-rendā (re-render) shimasu.

**[Fill in the form / Fōmu ni nyūryoku]**
- Namae: 田中太郎
- Mēru: tanaka.taro@example.com  
- Pasuwādo: password123

**[Point to code / Kōdo o shimesu]**

Fōmu ga送信 (submit) sareru to, handleSubmit kansu wa mazu burauza no defōruto dōsa (default behavior) o bōshi (prevent) shi, soshite kuraianto-saido (client-side) de baridēshon (validation) o jikkō shimasu. Subete no firudo ga nyūryoku (filled in) sarete iru ka, mēru ni @ shinboru ga fukumarete iru ka, pasuwādo ga sukunakutomo 8-moji (characters) aru ka o chekku shimasu. Kore ni yori yūzā ni sokoza no fīdobakku (feedback) o teikyō dekimasu.

**[Show validation code / Baridēshon kōdo o miseru]**

Baridēshon ga seikō (pass) suru to, axios o tsukatte API o kōru shimasu. Rikuesuto wa Vite proxy o tsūjite IRIS bakkuendo no /sem/signup ni ikimasu.

**[Click Register / Tōroku botan o kurikku]**

**[Backend code explanation / Bakkuendo kōdo setsumei]**

Bakkuendo dewa, AccountRegistration mesoddo ga JSON rikuesuto o ukete, %FromJSON o tsukatte pāsu (parse) shi, sābā-saido (server-side) de mata dēta o balidēto (validate) shi, mēru ga sudeni sonzai (exist) suru ka SQL kueri de chekku shi, subete ga yūkō (valid) nara, atarashii tblAccount obujekuto o sakusei shite %Save() de dētabēsu ni hozon shimasu.

**[Show success message / Seikō messēji o hyōji]**

Kanpeki (Perfect)! Akaunto ga sakusei sarete, sainin pēji ni ridairekuto saremashita. Kore ga kuraianto-saido no nabigēshon de aru koto ni chūi shite kudasai - pēji rirōdo wa naku, React Router no okage de shunkan-teki ni sen'i (transition) shimasu.

---

### [DEMO PHASE 2: ROGUIN / LOGIN] (40 seconds)

**[Now on signin page / Sainin pēji ni imasu]**

Ima sakki tsukutta kureden (credentials) de ninshō (authenticate) shimashō.

**[Show SignIn component / SignIn konpōnento o miseru]**

Sainin pēji wa saināpu ni nite imasu ga, motto shinpuru (simple) desu - mēru to pasuwādo dake hitsuyō desu.

**[Fill in credentials / Kuradensharu o nyūryoku]**
- Mēru: tanaka.taro@example.com
- Pasuwādo: password123

**[Point to auth flow / Ninshō furō o shimesu]**

Fōmu送信 (submit) to baridēshon no ato, API kōru ga /sem/signin ni ikimasu. Bakkuendo mesoddo ga SQL kueri de mēru ni yotte akaunto o sagashi, hozon sareta pasuwādo o toridashi, soshite送信 sareta pasuwādo to hikaku (compare) shimasu.

**[Security note / Sekyuriti nōto]**

Hayai sekyuriti nōto - genzai no jisō (current implementation) dewa, pasuwādo ga purēn tekisuto (plain text) de hozon sarete imasu. Kore wa kono demonstrēshon ni wa daijōbu desu ga, puroddakushon dewa bcrypt hasshingu (hashing) ga hitsuyō ni narimasu.

**[Click Login / Roguin botan o kurikku]**

**[Show localStorage code / localStorage kōdo o miseru]**

Ninshō seikō (successful authentication) no ato, furontoendo ga setAuthData o yobidashi, localStorage ni futatsu no aitemu (item) o hozon shimasu: isLoggedIn furagu (flag) o 'true' ni setto shi, yūzā no mēru mo hozon shimasu. Kore ni yori pēji rifuresshu (refresh) o koete sesshon sutēto (session state) ga iji (maintain) saremasu.

**[Show redirect / Ridairekuto o miseru]**

Soshite jidō-teki ni shain risuto pēji ni ridairekuto saremashita. ProtectedRoute konpōnento ga watashitachi no ninshō sutētasu (authentication status) o chekku shite, akusesu o kyoka (allow) shimashita.

---

### [DEMO PHASE 3: ATARASHII SHAIN O TSUIKA / ADD NEW EMPLOYEE] (90 seconds)

**[Now on employee list / Shain risuto ni imasu]**

Kore ga main no shain risuto pēji desu. Atarashii shain o tsuika suru mae ni, kī na kino o setsumei shimasu.

**[Show EmployeeList component code / EmployeeList konpōnento kōdo o miseru]**

Kore wa mottomo fukuzatsu (complex) na konpōnento no hitotsu desu. Mittsu no React Hooks ga issho ni hataraite imasu:
- useState ga shain dēta to UI sutēto o kanri shimasu
- useEffect ga konpōnento ga maunto (mount) suru toki ni shain o rōdo shimasu
- useMemo ga firuta to sōto sōsa (operation) o saitekika shimasu

**[Point to features / Kino o shimesu]**

Kensaku bokkusu (search box), taishoku shain o hyōji (show) suru chekkubokkusu, soshite sōto o sapōto suru tēburu heddā (table header) ga aru koto ni chūi shite kudasai. Shita no pējinēshon (pagination) wa Material-UI no TablePagination konpōnento ni yotte handoru sarete imasu.

**[Explain data flow / Dēta furō o setsumei]**

Konpōnento ga rōdo suru to, useEffect ga API o yobidashite subete no shain o fetchu (fetch) shimasu. Bakkuendo wa deleteFlg = 0 o firuta suru WHERE ku (clause) de dētabēsu o kueri suru node, akutibu (active) na shain dake o eraremasu. Dēta wa JSON toshite modotte kite, setEmployees de sutēto o kōshin shimasu.

**[Click Add Employee button / Shain tsuika botan o kurikku]**

Dewa atarashii shain o tsuikashimashō. Kore wa /employees/new ni nabigēto shimasu.

**[Show EmployeeDetail component code / EmployeeDetail konpōnento kōdo o miseru]**

EmployeeDetail konpōnento wa omoshiroi desu. Naze nara mittsu no chigau mōdo (mode) - tsuika (add), henshū (edit), sakujo (delete) - o subete hitotsu no konpōnento de handoru suru kara desu. Mōdo wa URL paramētā o chekku suru koto de kenshutsu (detect) shimasu: moshi id ga "new" ni hitoshii nara, tsuika mōdo desu; soredewa, sono tokutei no shain ID no henshū mōdo desu.

**[Fill in employee form / Shain fōmu ni nyūryoku]**
- Shain Bangō: 12345
- Namae: 山田花子
- Kana Namae: ヤマダハナコ
- Seibetsu: Josei (rajiо botan o select)
- Denwa: 090-1234-5678
- Busho (Department): 営業部
- Yūbin Bangō: 100-0001
- Jūsho: 東京都千代田区千代田1-1
- Taishoku Sutētasu: Chekku shinai (genzai koyō-chū)

**[Point to validation / Baridēshon o shimesu]**

Fōmu wa Shain Bangō ga chōdo 5-keta (digits) de aru koto to, Namae ya Seibetsu nado no hitsuyō na firudo ga nyūryoku sarete iru koto o baridēto shimasu.

**[Click Register button / Tōroku botan o kurikku]**

**[Show confirmation dialog / Kakunin daiarogu o miseru]**

Hozon suru mae ni, kakunin daiarogu o hyōji shimasu. Kore wa Material-UI no Dialog konpōnento o tsukatte, sōsa taipu (operation type) ni motozuite dainamikku (dynamic) na kontensu de jisō sarete imasu.

**[Click Yes in dialog / Daiarogu de "Hai" o kurikku]**

**[Backend explanation / Bakkuendo setsumei]**

Kakunin sareta toki, bakkuendo no CreateEmployee mesoddo wa mazu akutibu rekōdo no naka de chōfuku (duplicate) suru Shain Bangō ga nai ka chekku shimasu - kore wa jūyō desu. Naze nara soft delete de, sakujo sareta shain no ID o saishiyō dekiru kara desu. Soshite atarashii tblEmployee obujekuto o sakusei shi, Nihongo tekisuto ni $ZCONVERT o shiyō shite subete no puropati (property) o setto shi, akutibu sutētasu no tame ni deleteFlg o 0 ni setto shi, $ZDATETIME de genzai no taimu sutanpu (timestamp) o setto shite, dētabēsu ni hozon shimasu.

**[Show success and redirect / Seikō to ridairekuto o miseru]**

Kanpeki! Shain ga sakusei sarete, risuto ni modotte kimashita. Atarashii shain ga ichiban ue ni arawarete imasu. Naze nara kōshin taimu sutanpu no kōjun (descending order) de sōto shite iru kara desu.

---

### [DEMO PHASE 4: KENSAKU KINO / SEARCH FUNCTIONALITY] (30 seconds)

**[Back on employee list / Shain risuto ni modotte]**

Kensaku kino o demonstrēto shimasu.

**[Show search implementation code / Kensaku jisō kōdo o miseru]**

Kensaku wa pafōmansu saitekika no tame ni useMemo o shiyō shite jisō sarete imasu. Kensaku kīwādo ga kawaru to, useMemo ga firuta sareta risuto o sai-keisan (recalculate) shimasu. Kaku rendā de firuta o jikkō suru no dewa naku.

**[Type in search box / Kensaku bokkusu ni taipu: "山田"]**

**[Explain filter logic / Firuta rojikku o setsumei]**

Firuta wa mittsu no firudo o chekku shimasu - Shain Bangō, Namae, Kana Namae. Subete o shō-moji (lowercase) ni henkan shite, daimonji/shō-moji o kubetsu shinai macchingu (matching) o shimasu. Kensaku ga kuraianto-saido de aru koto ni chūi shite kudasai, sābā-saido dewa arimasen - memori ni sudeni aru dēta o firuta shimasu. Kore wa chiisai dētasetto ni wa hayai desu ga, nanzen mono rekōdo ni wa pējinēshon to sābā-saido firuta ga hitsuyō ni narimasu.

**[Show instant results / Shunkan-teki na kekka o miseru]**

Taipu suru to sugu ni tēburu ga kōshin saremasu. Naze nara React ga kawatta bubun dake o kōritsu-teki ni sai-rendā suru kara desu.

**[Clear search / Kensaku o kuriasu]**

---

### [DEMO PHASE 5: SHAIN HENSHŪ / EDIT EMPLOYEE] (90 seconds)

**[Click edit icon on an employee / Shain no henshū aikon o kurikku]**

Dewa kono shain o henshū shimashō. URL ga /employees/42 ni kawari, dētabēsu ID ga tsuite imasu.

**[Show component mode detection code / Konpōnento mōdo kenshutsu kōdo o miseru]**

EmployeeDetail konpōnento wa henshū mōdo de aru koto o kenshutsu shimasu. Naze nara URL paramētā ga "new" dewa nai kara desu. Sugu ni useEffect ga yobarete, bakkuendo no GetEmployeeById mesoddo o tsukatte shain dēta o rōdo shimasu.

**[Backend code explanation / Bakkuendo kōdo setsumei]**

GetEmployeeById wa %OpenId o tsukatte dētabēsu kara persistent obujekuto o rōdo shimasu. Obujekuto ga sonzai suru ka chekku shi, soft-delete sarete inai ka chekku shi, soshite subete no shain puropati o UTF-8 ni henkan shite respponsu obujekuto o kōchiku (build) shimasu.

**[Show pre-filled form / Jizen ni nyūryoku sareta fōmu o miseru]**

Fōmu ga既存 (existing) no dēta de jizen ni nyūryoku sarete iru koto ni chūi shite kudasai. Mata, Shain Bangō firudo ga disabled ni natte iru koto ni mo chūi shite kudasai - shain ID o kaeru koto wa kyoka sarete imasen. Naze nara sansho integuritī (referential integrity) o kowareru kanōsei ga aru kara desu.

**[Modify some fields / Ikutsu ka no firudo o henkō]**
- Busho: 技術部 ni henkō
- Taishoku Sutētasu: Chekkubokkusu o chekku

**[Point to update logic / Kōshin rojikku o shimesu]**

送信 suru to, onaji fōmu konpōnento desu ga, ima wa CreateEmployee dewa naku UpdateEmployee o yobidashimasu. Bakkuendo wa %OpenId de既存 no shain obujekuto o aki, kawatta puropati dake o kōshin shi, taimu sutanpu o kōshin shite, hozon shimasu.

**[Click Update button / Kōshin botan o kurikku]**

**[Show confirmation dialog / Kakunin daiarogu o miseru]**

Daiarogu tekisuto ga sōsa taipu ni motozuite kawaru koto ni chūi shite kudasai - "更新確認" (Kōshin Kakunin / Update Confirmation) to natte imasu. "登録確認" (Tōroku Kakunin / Registration Confirmation) dewa arimasen.

**[Confirm update / Kōshin o kakunin]**

**[Show updated list / Kōshin sareta risuto o miseru]**

Kanpeki! Shain rekōdo ga kōshin saremashita. Busho ga kawatte, ima "退職済み" (Taishoku-zumi / Retired) sutētasu ga hyōji sarete iru koto ni chūi shite kudasai.

---

### [DEMO PHASE 6: SHAIN SAKUJO / DELETE EMPLOYEE] (40 seconds)

**[Click edit on the same employee / Onaji shain no henshū o kurikku]**

Dewa sakujo kino o omise shimasu. Shita ni sakujo botan ga aru koto ni chūi shite kudasai - kore wa henshū mōdo de dake arawaremasu. Tsuika mōdo dewa arimasen.

**[Show soft delete explanation / Sofuto sakujo setsumei]**

Kono apurikēshon wa soft delete o jisō shite imasu. Hard delete dewa arimasen. Kore wa puroddakushon shisutemu de no besuto purakutisu (best practice) desu.

**[Click Delete button / Sakujo botan o kurikku]**

**[Show confirmation dialog / Kakunin daiarogu o miseru]**

Daiarogu wa kono sōsa ga moto ni modosenai to keikoku (warn) shite imasu - kedomo gijutsu-teki ni wa soft delete de, furagu o 0 ni modoseba undelete dekimasu.

**[Confirm delete / Sakujo o kakunin]**

**[Backend explanation / Bakkuendo setsumei]**

DeleteEmployee mesoddo wa jissai ni rekōdo o dētabēsu kara sakujo shimasen. Kawari ni, shain obujekuto o aki, deleteFlg o 1 ni setto shi, taimu sutanpu o kōshin shite, hozon shimasu. Rekōdo wa mada dētabēsu ni sonzai shimasu. Tada sakujo sa reta to māku sarete iru dake desu.

**[Show updated list / Kōshin sareta risuto o miseru]**

Shain ga risuto kara kiemashita. Naze nara GetAllEmployees kueri ga WHERE deleteFlg = 0 de firuta suru kara desu. Moshi "taishoku shain o hyōji" chekkubokkusu o chekku shite mo, sakujo sareta shain wa hyōji saremasen. Naze nara dētabēsu reberu de firuta sarete iru kara desu.

**[Explain soft delete benefits / Sofuto sakujo no rieki o setsumei]**

Kono apurōchi ni yotte, hitsuyō nara dēta o rikabarī (recover) dekimasu. Kansa shōseki (audit trail) o iji dekimasu. Sansho integuritī o tamotsu koto ga dekimasu. Soshite dēta hozon prishī (data retention policy) ni junshū dekimasu. Dētabēsu ni wa, (EmployeeId, deleteFlg) no composite unique index ga arimasu. Kore wa shain ID 12345 o atarashii shain ni saishiyō dekiru koto o imi shimasu. Naze nara furui shain wa deleteFlg = 1 o motte iru kara desu.

---

### [DEMO PHASE 7: ROGAUTO / LOGOUT] (20 seconds)

**[Click logout button in header / Heddā no rogauto botan o kurikku]**

Saigo ni, rogauto shimashō.

**[Show logout code / Rogauto kōdo o miseru]**

handleLogout kansu wa clearAuthData o yobidashi, localStorage kara isLoggedIn to userEmail aitemu o sakujo shimasu. Soshite replace: true de sainin pēji ni nabigēto shimasu. Kore wa rirekisho (history entry) o okikae suru node, bakku botan de hogo sareta pēji ni modorimasen.

**[Show signin page / Sainin pēji o miseru]**

Sainin pēji ni modotte kimashita. Moshi ima /employees ni chokusetsu nabigēto shiyō to suru to...

**[Try to access /employees / /employees ni akusesu shiyō to suru]**

**[Show ProtectedRoute code / ProtectedRoute kōdo o miseru]**

ProtectedRoute konpōnento ga isAuthenticated() o chekku shimasu. localStorage ga kuriasu sarete iru node, false o kaesu. Dakara sugu ni sainin ni ridairekuto saremasu. Kore ni yotte subete no hogo sareta rūto ga tekisetsu ni sekyua (secure) sarete iru koto ga hosho saremasu.

---

## [SECTION 4: GIJUTSU-TEKI NA SETSUMED / TECHNICAL DISCUSSION] (2 minutes)

### Key Technical Decisions / Jūyō na Gijutsu Kettei (1 minute)

Kono jisō de no jūyō na gijutsu kettei o kyōchō (highlight) shimasu.

**1. React Hooks over Class Components**
Apurikēshon zentai ni functional components to hooks o erabimashita. Naze nara, yori kanketsu (concise) de, tesuto ga kantan de, modān na React no besuto purakutisu ni sorotte iru kara desu. EmployeeList konpōnento no useMemo no yō na hooks wa, firuta shite sōto shita dēta no fuhitsuyō na sai-keisan o fusegu.

**2. TypeScript for Type Safety / Taipu Anzen-sei**
TypeScript interface ga dēta no katachi o teigi shimasu - User, Employee, soshite API respponsu. Kore wa kaihatsu-chū ni ikutsu ka no bagu o mitsukemashita. Puropati ni tadashiku akusesu shite inai tokoro desu. Taipu chekku wa konpairu-jikan ni okonawareru node, ranntaimu ōbāheddo (runtime overhead) wa arimasen.

**3. Soft Delete Pattern / Sofuto Sakujo Patān**
Rekōdo o eikyu-teki ni sakujo suru kawari ni, deleteFlg o setto shimasu. Kore wa dēta integuritī to junshū ni totte junsui (crucial) desu. (EmployeeId, deleteFlg) no composite unique index wa tokuni kashikoi desu - ID atarigoto ni hitotsu no akutibu na shain o kyoka shimasu ga, onaji ID o motsu fukusū no sakujo sareta shain o kyoka shimasu.

**4. Client-side vs Server-side Operations / Kuraianto-saido to Sābā-saido Sōsa**
Kensaku to firuta wa chiisai dētasetto de no hayai ōtō no tame ni kuraianto-saido desu. Nanzen no shain ga iru puroddakushon de wa, SQL de OFFSET/LIMIT ku o tsukau sābā-saido pējinēshon to firuta o jisō shimasu. Soshite furontoendo kara pēji paramētā o watashimasu.

### Areas for Improvement / Kaizen-ten (1 minute)

Puroddakushon kankyō dewa, ikutsu ka no kōjo (enhancement) ga hitsuyō ni narimasu:

**Sekyuriti (Security):**
- Purēn tekisuto sutorēji no kawari ni bcrypt de pasuwādo hasshingu
- Shinpuru na localStorage furagu no kawari ni ninshō no tame no JWT tōkun
- Subete no komyunikēshon ni HTTPS kyōsei
- API endopointo de CSRF hogo to rēto seigen (rate limiting)
- XSS kōgeki (attack) o fusegu tame no input sanitization

**Pafōmansu (Performance):**
- Ōkina shain risuto no tame no sābā-saido pējinēshon
- Tekisetsu na index o tsukatta dētabēsu kueri saitekika
- Hinpan ni akusesu sareru dēta no kyasshingu (caching)
- Shoki bandoru saizu o herasu tame no code splitting

**Kino (Features):**
- Rōru-beisu akusesu kontorōru (Role-based access control) - HR, manējā, ippan yūzā ni chigau kengen
- Dare ga itsu nani o kaeta ka o tsuiseki suru kansa rogu (audit logging)
- Ikkatsu sōsa (bulk operation) no tame no Excel inpōto/ekusupōto kino
- Fukusū no firuta kijun (criteria) o motsu kōdo na kensaku
- Jūyō na henkō ni taisuru mēru tsūchi (notification)

**Tesuto (Testing):**
- Bijinesu rojikku no tame no yunitto tesuto (unit test)
- API endopointo no tame no tōgō tesuto (integration test)
- Jūyō na yūzā wākufurō no tame no endo-tū-endo tesuto (end-to-end test)
- Dōji yūzā (concurrent users) o handoru dekiru koto o kakujitsu ni suru rōdo tesuto (load test)

Kono yō na kaizen ni yotte, shisutemu wa kigyō kankyō (enterprise environment) de puroddakushon-redi ni narimasu.

---

## [SECTION 5: Q&A] (1 minute)

Gochūi itadaki, arigatō gozaimashita. Jisō, ākitekucha, mata wa watashi ga shita gijutsu kettei ni tsuite, nani ka shitsumon ga areba, yorokonde okotae shimasu.

**[Pause for questions / Shitsumon o machimasu]**

---

## [CLOSING REMARKS / SHŪRYŌ NO KOTOBA]

**Moshi kore ijō shitsumon ga nakereba (If no more questions):**

Minasama, ojikan o itadaki, hontō ni arigatō gozaimashita. Kono purojekuto wa full-stack development ni okeru kichō na gakushū keiken (valuable learning experience) deshita. React to IRIS no yō na modān na gijutsu to hatarakeru kikai o itadakete, kansha shite imasu. Kono sukirru (skill) o shōrai no purojekuto ni tekiyō dekiru koto o tanoshimi ni shite imasu.

Arigatō gozaimashita.

---

## 📝 JAPANESE VOCABULARY REFERENCE

### N4+ Words with English Meanings:

- **kikai (機会)** = opportunity
- **kaihatsu (開発)** = development
- **happyō (発表)** = presentation
- **kanri (管理)** = management
- **ninshō (認証)** = authentication
- **sentaku (選択)** = choice
- **jūyō (重要)** = important
- **jisō (実装)** = implementation
- **shōrai (将来)** = future
- **kaizen-ten (改善点)** = improvement points
- **kōritsu-teki (効率的)** = efficient
- **saitekika (最適化)** = optimization
- **konpōnento (コンポーネント)** = component
- **komyunikēshon (コミュニケーション)** = communication
- **baridēshon (バリデーション)** = validation
- **pafōmansu (パフォーマンス)** = performance
- **sekyuriti (セキュリティ)** = security
- **fukuzatsu (複雑)** = complex
- **chokusetsu (直接)** = directly
- **jidō-teki (自動的)** = automatically
- **tekisetsu (適切)** = appropriate
- **eikyu-teki (永久的)** = permanently
- **kichō (貴重)** = valuable
- **kansha (感謝)** = gratitude/thanks
- **hosho (保証)** = guarantee
- **junshū (遵守)** = compliance
- **kyōchō (強調)** = emphasize
- **keikoku (警告)** = warning
- **rieki (利益)** = benefit
- **kijun (基準)** = criteria

---

## 🎯 PRESENTATION SUCCESS TIPS

1. **Practice the romaji** until it flows naturally
2. **Don't worry about perfect pronunciation** - they understand English too
3. **Use hand gestures** when explaining concepts
4. **Make eye contact** with audience members
5. **If you forget a Japanese word**, just say it in English - totally fine!
6. **Breathe** between sections
7. **Smile** - show you're confident and proud of your work
8. **Have water** nearby
9. **Practice transitions** between demo phases
10. **Remember**: The content is more important than perfect Japanese!

---

**Ganbatte kudasai! You've got this! 頑張ってください！🚀💪**