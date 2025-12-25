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

# [SECTION 1: JIKO-SHŌKAI / INTRODUCTION] (1.5 minutes)

## Aisatsu (Opening / Greeting)

Ohayō gozaimasu. Kyō wa kono yō na kikai (opportunity) o itadaki, hontō ni arigatō gozaimasu.

Watashi wa S M Tanjilur Rahman to moshimasu. Saishin (currently), IRIS to React.js wo benkiyoshite hataraite imasu. Kyō wa, benkyo suru chū ni kaihatsu (developed) shita Shain Kanri Shisutemu (Employee Management System) ni tsuite happyō (present) shimasu.

## Purojekuto Gaiyō (Project Overview)

Kore wa full-stack web apurikēshon (application) de, shain jōhō (employee information) o kanri (manage) suru tame no mono desu. Kono shisutemu wa kanzen (complete) na CRUD kino (functionality) o teikyō (provide) shimasu - Create, Read, Update, Delete sōsa (operation) de shain rekōdo (record) o toriatsukai (handle) masu.

Omo (main) na kino (features) wa:
- Yūzā (user) no tōroku (registration) to ninshō (authentication)
- Atarashii shain o dētabēsu (database) ni tsuika (add) suru
- Riaru-taimu (real-time) kōshin (update) de shain rekōdo o kensaku (search) to firuta (filter) suru
- Busho (department) to taishoku jōkyō (retirement status) o fukumeru shain jōhō o kōshin suru
- Dēta hozon (data retention) to rikabarī (recovery) no tame no soft delete jisō (implementation)

Apurikēshon (application) wa modān (modern) na web gijutsu (technology) de kōchiku (built) sarete imasu. Furontoendo (frontend) wa React.js to TypeScript o shiyō shite taipu anzen-sei (type safety) o teikyō shimasu. Bakkuendo (backend) wa InterSystems IRIS dētabēsu to ObjectScript o bijinesu rojikku (business logic) ni shiyō shite imasu.

## Happyō Mokuteki (Presentation Goals)

Tsugi no bun de, futatsu no omo (main) na bun'ya (area) o setsumei shimasu:

Mazu (first), shisutemu ākitekucha (architecture) - three-tier dezain (design) ga dō yatte bunri (separation) to sukērabiliti (scalability) o teikyō suru ka o setsumei shimasu.

Tsugini (second), kanzen na raibu demonstrēshon (demonstration) - tōroku (registration) kara shain kanri made no kanzen na yūzā jānī (user journey) o omise shite, kaku kino (feature) no ushiro ni aru jūyō (important) na kōdo jisō (code implementation) o setsumei shimasu.

Dewa, ākitekucha kara hajimemashō.

---

# [SECTION 2: SHISUTEMU ĀKITEKUCHA / SYSTEM ARCHITECTURE] (2.5 minutes)

## Part 2.1: Ākitekucha Zu no Setsumei (Architecture Diagram Explanation) (1.5 minutes)

**[Display: THREE_TIER_ARCHITECTURE.png / Zu o hyōji]**

Shisutemu ākitekucha o omise shimasu. Watashitachi no apurikēshon wa three-tier ākitekucha ni shitagatte imasu. Kore wa gyōkai hyōjun (industry-standard) no dezain patān (design pattern) de, konsān (concern) o kotonatsu (distinct) na layā (layer) ni bunri (separate) shimasu.

### Purezentēshon Tiyā (Presentation Tier / Top Layer)

**[Point to the top of diagram / Zu no ue o shimesu]**

Ichiban ue ni, Purezentēshon Tiyā ga arimasu. Koko wa yūzā ga web burauza (browser) o tsūjite shisutemu to sōgo sayō (interact) suru tokoro desu.

Furontoendo wa React 18 de kōchiku sareta single-page apurikēshon desu. TypeScript o konpairu-jikan (compile-time) taipu chekku (type checking) ni shiyō shite imasu. Kore wa puroddakushon dewa naku kaihatsu-chū (during development) ni erā (error) o mitsukeru no ni yakudachimasu. UI konpōnento (component) wa Material-UI kara kite imasu. Kore wa Google no Material Design gaidorain (guideline) ni shitagatte, purofesshonaru (professional) de akuseshiburu (accessible) na konpōnento o teikyō shimasu. Soshite React Router ga pēji rirōdo (page reload) nashi de kuraianto-saido (client-side) nabigēshon (navigation) o handoru (handle) shimasu.

Kore wa subete yūzā no burauza de ugoki, kaihatsu-chū wa pōto (port) 5173 de jikkō (run) shimasu.

### Apurikēshon Tiyā (Application Tier / Middle Layer)

**[Point to the middle of diagram / Zu no mannaka o shimesu]**

Mannaka ni wa Apurikēshon Tiyā ga arimasu - kore wa watashitachi no REST API layā desu.

Kaihatsu-chū wa, Vite proxy ga pōto 5173 kara pōto 52773 ni rikuesuto (request) o tenshō (forward) shimasu. Kore wa CORS mondai (problem) o kaiketsu (solve) shite, shīmuresa (seamless) na kaihatsu keiken (development experience) o teikyō shimasu. Puroddakushon dewa, ryōhō (both) no tiyā wa futsū (typically) onaji domēn (domain) ni arimasu.

REST API wa mittsu no omo na sekinin (responsibility) o motsu:
- Dai-ichi (first), ninshō (authentication) - yūzā tōroku to roguin (login)
- Dai-ni (second), shain CRUD sōsa - subete no create, read, update, delete kino
- Dai-san (third), dēta fōmattingu (formatting) - furontoendo JSON to bakkuendo dētabēsu fōmatto (format) no aida no henkan (conversion)

### Dēta Tiyā (Data Tier / Bottom Layer)

**[Point to the bottom of diagram / Zu no shita o shimesu]**

Sakanso (bottom) ni wa Dēta Tiyā ga arimasu - InterSystems IRIS dētabēsu desu.

IRIS wa maruchimoderu (multi-model) dētabēsu de, obujekuto (object), SQL, soshite kī-baryū (key-value) sutorēji (storage) o dōji ni (simultaneously) sapōto (support) shimasu. Watashitachi wa ObjectScript o shiyō shite imasu. Kore wa IRIS no neitibu gengo (native language) desu. ObjectScript wa persistent class o tsūjite dētabēsu to chokusetsu (direct) tōgō (integration) o teikyō shimasu.

%Persistent o extends suru class o teigi (define) suru to, IRIS ga jidō-teki ni (automatically) dētabēsu tēburu (table) o sakusei (create) shi, SQL kueri (query) o seisei (generate) shi, %Save, %OpenId, %Delete nado no mesoddo (method) o teikyō shimasu. Kōdo to dētabēsu no kono kinmitsu (tight) na tōgō wa totemo pawāfuru (powerful) desu.

Jūyō na gijutsu-teki shōsai (technical detail) wa UTF-8 moji enkōdingu (character encoding) desu. Nihonjin no shain namae to jūsho (address) o atsukatteiru node, bakkuendo zentai ni $ZCONVERT kansu (function) o shiyō shite, Nihongo moji ga mojibake nashi de tadashiku hyōji (display) sareru yō ni shimasu.

### Dēta Furō (Data Flow)

**[Point to the arrows connecting the tiers / Tiyā o tsunagu ya o shimesu]**

Dēta furō wa kantan (straightforward) de, hyōjun (standard) REST gensoku (principle) ni shitagatte imasu:

Yūzā ga React intāfesu (interface) to sōsa (interact) suru to, HTTP rikuesuto o okuru. Kore wa Vite proxy o tsūjite REST API ni ikimasu. API ga rikuesuto o shori (process) shi, ObjectScript o shiyō shite dētabēsu sōsa o jikkō shi, JSON respponsu (response) o kaesu. Furontoendo ga kono respponsu o ukete, UI o kōshin shimasu.

Kore wa hinzutsu-teki ni (asynchronously) okonawareru node, dētabēsu sōsa-chū demo yūzā intāfesu wa ōtō-teki (responsive) na mama desu.

## Part 2.2: Ākitekucha no Rieki (Architecture Benefits) (30 seconds)

Kono three-tier ākitekucha wa ikutsu ka no jūyō na rieki (benefit) o teikyō shimasu:

**Konsān no bunri (separation of concerns)** - kaku tiyā wa tokutei (specific) no sekinin o motsu. Furontoendo wa yūzā keiken (user experience) ni shūchū (focus) shi, API wa bijinesu rojikku o handoru shi, dētabēsu wa dēta eizoku-sei (data persistence) o kanri shimasu.

**Dokuritsu-teki na sukērabiliti (independent scalability)** - moshi motto dētabēsu yōryō (capacity) ga hitsuyō nara, furontoendo ni sawaru koto naku dēta tiyā dake o sukēru (scale) dekimasu. Motto dōji yūzā (concurrent user) o handoru suru hitsuyō ga areba, motto API sābā (server) o tsuika dekimasu.

**Gijutsu no jūnan-sei (technology flexibility)** - furontoendo ni fureru (touch) koto naku React o Vue.js ni okikaeru (replace) koto ga dekimasu. Mata wa furontoendo ni fureru koto naku IRIS kara PostgreSQL ni ijū (migrate) dekimasu. Kaku tiyā wa yuruku (loosely) ketugō (coupled) sarete imasu.

**Kantan na iji (easier maintenance)** - konsān ga bunri sarete iru to, bagu (bug) o koritsu (isolate) shite shūsei (fix) suru no ga kantan desu. Furontoendo kaihatsusha (developer) wa bakkuendo kaihatsusha kara dokuritsu shite shigoto dekimasu.

Ima, kono ākitekucha o raibu demonstrēshon de jissai ni mimashō.

---

# [SECTION 3: RAIBU DEMO TO KŌDO SETSUMEI / LIVE DEMO WITH CODE] (6 minutes)

## Demo Shōkai (Demo Introduction) (15 seconds)

Ima kara, akaunto sakusei (account creation) kara shain kanri made no kanzen na yūzā jānī o demonstrēto shimasu. Kaku kino o susumeru aida, sore o kano ni suru jūyō na kōdo jisō o kantan ni setsumei shimasu.

Aratana burauza sesshon (session) de hajimemashō.

---

## [DEMO PHASE 1: YŪZĀ TŌROKU / USER REGISTRATION] (60 seconds)

**[Navigate to: http://localhost:5173/signup / Saināpu pēji ni ido]**

Mazu, atarashii yūzā wa akaunto o tsukuru hitsuyō ga arimasu. Kore ga tōroku fōmu (form) desu.

### UI Setsumei (UI Explanation)

Kore wa SignUp konpōnento desu. Gijutsu-teki ni dō ugoku ka o setsumei shimasu.

Kono konpōnento wa React no controlled components patān o shiyō shite imasu. Kaku input firudo (field) - namae, mēru (email), pasuwādo (password) - wa useState hook o tsukatte sutēto hensu (state variable) ni bindo (bind) sarete imasu. Yūzā ga taipu suru to, React ga sugu ni sutēto o kōshin shite, atarashii chi (value) de konpōnento o sai-rendā (re-render) shimasu. Kore ni yori, fōmu dēta o kanzen ni kontorōru (control) dekimasu.

**[Fill in the form / Fōmu ni nyūryoku shinagarasetsumei]**
- Namae: 田中太郎 (Tanaka Taro)
- Mēru: tanaka.taro@example.com
- Pasuwādo: password123

### Baridēshon Kōdo (Validation Code)

Tōroku botan o kurikku suru to, handleSubmit kansu ga jikkō saremasu. Mazu, e.preventDefault() o yobidashite, burauza no defōruto fōmu soshinsōsa (default form submission behavior) o teishi (stop) shimasu. Kore wa pēji rirōdo o hikiokoshimasu. Watashitachi wa JavaScript ni subete o handoru saseta node.

Sorekara kuraianto-saido baridēshon o jikkō shimasu. Kōdo wa mittsu no koto o chekku shimasu: subete no firudo ga nyūryoku sarete iru ka, mēru ni @ shinboru ga fukumarete iru ka, soshite pasuwādo ga sukunakutomo 8-moji aru ka desu. Kore wa sābā rikuesuto o okuranaide yūzā ni sokoza no fīdobakku (feedback) o teikyō shimasu.

**[Click Register button / Tōroku botan o kurikku]**

### API Tsūshin (API Communication)

Baridēshon ga seikō (pass) suru to, furontoendo wa axios o tsukatte REST API o yobidashimasu. Rikuesuto wa /sem/signup e no POST de, fōmu dēta o rikuesuto badi (request body) no JSON toshite fukumimasu.

Vite proxy ga kono rikuesuto o intāseputо (intercept) shite, pōto 52773 no IRIS sābā ni tenshō shimasu.

### Bakkuendo Shori (Backend Processing)

Bakkuendo dewa, AccountRegistration mesoddo ga JSON o ukete, %FromJSON o tsukatte pāsu (parse) shi, mata sābā-saido de dēta o baridēto shimasu - watashitachi wa kuraianto-saido baridēshon dake o kesshite shinrai (trust) shimasen - sorekara SQL kueri de mēru ga sudeni sonzai suru ka chekku shimasu.

Subete ga yūkō (valid) nara, atarashii tblAccount obujekuto o sakusei shi, puropati (property) o setto shi, %Save() o yobidashite dētabēsu ni eizoku (persist) shimasu. IRIS wa jidō-teki ni ID o wariate (assign) shi, dētabēsu rekōdo o sakusei shimasu.

**[Show success message and redirect / Seikō messēji to ridairekuto o miseru]**

Kanpeki (perfect)! Akaunto ga sakusei saremashita. Jidō-teki ni sainin pēji ni ridairekuto sarete iru koto ni chūi shite kudasai. Kore wa React Router no Navigate konpōnento desu - kuraianto-saido nabigēshon de, pēji rirōdo wa naku, tada shunkan-teki (instant) na sen'i (transition) desu.

---

## [DEMO PHASE 2: YŪZĀ ROGUIN / USER LOGIN] (45 seconds)

**[Now on: http://localhost:5173/signin / Sainin pēji ni imasu]**

Ima, sakki tsukutta kureden (credentials) de ninshō shimashō.

### Ninshō Furō (Authentication Flow)

Sainin pēji wa saināpu ni nite imasu ga, yori shinpuru (simple) desu. Mēru to pasuwādo dake hitsuyō desu.

**[Fill in credentials / Kuradensharu o nyūryoku]**
- Mēru: tanaka.taro@example.com
- Pasuwādo: password123

**[Click Login button / Roguin botan o kurikku]**

### Bakkuendo Ninshō (Backend Authentication)

API kōru wa /sem/signin ni ikimasu. Bakkuendo wa mēru de akaunto o sagasu SQL kueri o jikkō shi, hozon sareta pasuwādo o toridashi, soshinsareta pasuwādo to hikaku shimasu.

Hayai sekyuriti (security) nōto - genzai no jisō dewa, pasuwādo wa demonstrēshon mokuteki (purpose) de purēn tekisuto (plain text) de hozon sarete imasu. Puroddakushon dewa, soruto (salt) tsuki no bcrypt hasshingu (hashing) o shiyō shi, kono hikaku wa bcrypt no verify kansu o tsukatte okonawaremasu.

### Sesshon Kanri (Session Management)

Ninshō seikō (successful authentication) no ato, furontoendo wa setAuthData o yobidashi, localStorage ni futatsu no aitemu o hozon shimasu: isLoggedIn wa 'true' ni setto sare, userEmail wa yūzā no mēru adoresu (address) o hozon shimasu. Kore ni yori, yūzā ga pēji o rifuresshu (refresh) shite mo ninshō sutēto (authentication state) ga iji saremasu.

**[Show redirect to employee list / Shain risuto e no ridairekuto o miseru]**

Jidō-teki ni /employees ni ridairekuto saremashita. ProtectedRoute konpōnento ga localStorage kara yomu koto de watashitachi no ninshō sutētasu (status) o chekku shite, akusesu o kyoka (allow) shimashita. Moshi roguin shite inakattara, sainin ni ridairekuto sarete itа deshō.

---

## [DEMO PHASE 3: SHAIN RISUTO KINO / EMPLOYEE LIST FEATURES] (45 seconds)

**[Now on: http://localhost:5173/employees / Shain risuto ni imasu]**

Kore ga main no shain risuto pēji desu. Kore wa apurikēshon no mottomo fukuzatsu (complex) na konpōnento no hitotsu desu.

### Konpōnento Ākitekucha (Component Architecture)

EmployeeList konpōnento wa mittsu no React hooks ga issho ni hataraite imasu. Dai-ichi, useState ga shain dēta, kensaku kīwādo (search keyword), firuta settei (filter setting), sōto hōkō (sort direction), soshite pējinēshon (pagination) sutēto o kanri shimasu. Dai-ni, useEffect ga konpōnento ga maunto (mount) suru toki ni shain o rōdo shimasu. Dai-san, useMemo ga firuta shite sōto sareta kekka (result) o memoka (memoize) suru koto de pafōmansu (performance) o saitekika shimasu.

### Dēta Rōdingu (Data Loading)

Kono konpōnento ga rōdo suru to, useEffect ga loadEmployees kansu o toriga (trigger) shimasu. Kore wa /sem/employees e no GET rikuesuto o shimasu. Bakkuendo wa deleteFlg = 0 o firuta suru WHERE ku (clause) de dētabēsu ni kueri suru node, akutibu (active) na shain dake o eraremasu. Soft-delete sareta mono wa kakusarete (hidden) imasu.

Dēta wa JSON toshite kaette kite, setEmployees de sutēto o kōshin shimasu. React ga konpōnento o sai-rendā shi, tēburu (table) ga dēta o hyōji shimasu.

### Kensaku Kino (Search Feature)

**[Type in search box / Kensaku bokkusu ni taipu: "山田"]**

Kensaku kino o demonstrēto shimasu. Kensaku wa pafōmansu no tame ni useMemo o tsukatte kuraianto-saido de jisō sarete imasu. Kensaku kīwādo ga kawaru to, useMemo ga Shain Bangō (Employee ID), Namae, mata wa Kana Namae firudo ni kīwādo ga arawareru ka o chekku suru koto de firuta sareta risuto o sai-keisan (recalculate) shimasu. Subete no hikaku (comparison) wa shō-moji (lowercase) ni sarete, daimonji/shō-moji o kubetsu shinai macchingu (matching) ni narimasu.

**[Show instant results / Shunkan-teki na kekka o miseru]**

Taipu suru to sugu ni tēburu ga kōshin saremasu. Naze nara React ga kawatta gyō (row) dake o kōritsu-teki ni sai-rendā suru kara desu.

**[Clear search / Kensaku o kuriasu]**

Firuta wa sudeni fetchu (fetch) shita dēta de memori nai de okonawaremasu. Kono yō na chiisai dētasetto (dataset) ni wa, kuraianto-saido firuta wa totemo hayai desu. Nanzen no shain ga iru puroddakushon shisutemu ni wa, sābā-saido pējinēshon to firuta o jisō shimasu.

---

## [DEMO PHASE 4: ATARASHII SHAIN O TSUIKA / ADD NEW EMPLOYEE] (90 seconds)

**[Click "新規登録" (Add Employee) button / Shain tsuika botan o kurikku]**

Ima, atarashii shain o tsuikashimashō.

### Maruchimodō Konpōnento (Multi-Mode Component)

**[Now on: http://localhost:5173/employees/new / Atarashii shain pēji ni imasu]**

Kore wa EmployeeDetail konpōnento desu. Kore wa omoshiroi desu. Naze nara mittsu no chigau mōdo - tsuika (add), henshū (edit), sakujo (delete) - o subete hitotsu no konpōnento de handoru suru kara desu. Konpōnento wa URL paramētā o chekku suru koto de mōdo o kenshutsu (detect) shimasu. ID ga "new" no toki, tsuika mōdo desu. Soredewa, sono tokutei (specific) no shain no henshū mōdo desu.

### Fōmu Jisō (Form Implementation)

Shain jōhō o nyūryoku shimasu.

**[Fill in form / Fōmu ni nyūryoku shinagarasetsumei]**

- Shain Bangō: 12345 - Chōdo 5-keta (digits) de, kuraianto to sābā ryōhō (both) de baridēto saremasu
- Namae: 山田花子 (Yamada Hanako)
- Kana Namae: ヤマダハナコ - Katakana no hatsuon (pronunciation)
- Seibetsu (Sex): Josei (Female) - Dētabēsu ni sūji (integer) 2 toshite hozon saremasu
- Denwa (Phone): 090-1234-5678
- Busho (Department): 営業部 (Eigyō-bu / Sales Department)
- Yūbin Bangō (Post Code): 100-0001 - Nihon no yūbin bangō fōmatto (format)
- Jūsho (Address): 東京都千代田区千代田1-1
- Taishoku Sutētasu (Retirement Status): Chekku shinai - Kono shain wa genzai akutibu desu

### Kuraianto-saido Baridēshon (Client-Side Validation)

**[Click Register button / Tōroku botan o kurikku]**

Fōmu wa Shain Bangō ga chōdo 5-moji de aru koto to, Namae ya Seibetsu nado no hitsuyō na firudo ga nyūryoku sarete iru koto o baridēto shimasu. Kono baridēshon wa sābā raunndotorippu (round-trip) nashi de shunkan-teki ni okonawaremasu.

### Kakunin Daiarogu (Confirmation Dialog)

**[Show dialog / Daiarogu o miseru]**

Hozon suru mae ni, kakunin daiarogu o hyōji shimasu. Kore wa Material-UI no Dialog konpōnento de, sōsa taipu (operation type) - create, update, mata wa delete - ni motozuku dainamikku (dynamic) na kontensu desu.

**[Click "はい" (Yes) / "Hai" o kurikku]**

### Bakkuendo Shori (Backend Processing)

Kakunin sareta toki, bakkuendo no CreateEmployee mesoddo wa mazu akutibu rekōdo no naka de chōfuku (duplicate) suru Shain Bangō ga nai ka chekku shimasu. Kore wa jūyō desu. Naze nara soft delete de, sakujo sareta shain no ID o saishiyō dekiru kara desu.

Sorekara %New() o tsukatte atarashii tblEmployee obujekuto o sakusei shimasu. Kōdo wa subete no puropati o setto shi, Nihongo tekisuto ni UTF-8 kara IRIS no naibu fōmatto e henkan suru tame ni "I" direction no $ZCONVERT o shiyō shimasu. Akutibu sutētasu no tame ni deleteFlg o 0 ni setto shi, $ZDATETIME o tsukatte genzai no taimu sutanpu (timestamp) o upDateTime ni setto shimasu.

Saigo ni, %Save() o yobidashimasu. IRIS wa SQL INSERT bun (statement) o seisei shi, jikkō shi, jidō-inrikurimento (auto-increment) ID o wariate shite, seikō o kaesu.

**[Show redirect to list with new employee / Atarashii shain ga aru risuto e no ridairekuto o miseru]**

Kanpeki! Shain ga sakusei sarete, risuto no ichiban ue ni arawarete imasu. Naze nara kōshin taimu sutanpu no kōjun (descending order) de sōto shite iru kara desu - atarashii mono ga saki (newest first) desu.

---

## [DEMO PHASE 5: SHAIN HENSHŪ / EDIT EMPLOYEE] (60 seconds)

**[Click edit icon on the employee / Sakki tsukutta shain no henshū aikon o kurikku]**

Kono shain o henshū shimashō.

### Kizon Dēta no Rōdingu (Loading Existing Data)

**[Now on: http://localhost:5173/employees/5 / Henshū pēji ni imasu]**

Konpōnento wa henshū mōdo de aru koto o kenshutsu shimasu. Naze nara URL paramētā ga sūji de, "new" dewa nai kara desu. Sugu ni useEffect ga toriga shi, bakkuendo no GetEmployeeById mesoddo o yobidashimasu.

Bakkuendo wa ID de dētabēsu kara persistent obujekuto o rōdo suru tame ni %OpenId o shiyō shimasu. Obujekuto ga sonzai (exist) suru ka to soft-delete sarete inai ka o chekku shite, sorekara "O" direction no $ZCONVERT o tsukatte UTF-8 e no shutsuryoku (output) no tame ni henkan sareta subete no puropati o motsu respponsu obujekuto o kōchiku shimasu.

**[Show pre-filled form / Jizen nyūryoku sareta fōmu o miseru]**

Fōmu ga kizon no dēta de jizen ni nyūryoku sarete imasu. Mata, Shain Bangō firudo ga disabled ni natte iru koto ni chūi shite kudasai - watashitachi wa shain ID o kaeru koto o kyoka shimasen. Naze nara sansho integuritī (referential integrity) o kowareru kanōsei ga aru kara desu.

### Dēta no Kōshin (Updating Data)

**[Modify fields / Firudo o henkō]**
- Busho: 技術部 (Gijutsu-bu / Technical Department) ni henkō
- Taishoku Sutētasu: Chekkubokkusu o chekku - Kono shain wa ima taishoku shimasu

**[Click Update button / Kōshin botan o kurikku]**

Onaji fōmu konpōnento desu ga, ima wa CreateEmployee dewa naku UpdateEmployee o yobidashimasu. Bakkuendo wa %OpenId de kizon no shain obujekuto o aki, kawatta puropati dake o kōshin shi, taimu sutanpu o kōshin shite, mata %Save() o yobidashimasu. IRIS wa UPDATE SQL bun o seisei shite jikkō shimasu.

**[Show confirmation and updated list / Kakunin to kōshin sareta risuto o miseru]**

Rekōdo ga kōshin saremashita. Busho ga Gijutsu-bu ni kawatte, ima "退職済み" (Taishoku-zumi / Retired) bajji (badge) ga hyōji sarete iru koto ni chūi shite kudasai.

---

## [DEMO PHASE 6: SOFUTO SAKUJO / SOFT DELETE] (40 seconds)

**[Click edit on the same employee / Onaji shain no henshū o kurikku]**

Ima, sakujo kino o demonstrēto shimasu.

### Sakujo Botan (Delete Button)

**[Show delete button at bottom / Shita no sakujo botan o miseru]**

Shita ni sakujo botan ga aru koto ni chūi shite kudasai - kore wa henshū mōdo de dake arawaremasu. Tsuika mōdo dewa arimasen.

### Sofuto Sakujo Patān (Soft Delete Pattern)

**[Click Delete button and show dialog / Sakujo botan o kurikku shite daiarogu o miseru]**

Kono apurikēshon wa hard delete dewa naku soft delete o jisō shite imasu. Kore wa puroddakushon shisutemu no besuto purakutisu desu.

**[Click confirm / Kakunin o kurikku]**

Jissai ni dētabēsu kara rekōdo o sakujo suru kawari ni, DeleteEmployee mesoddo wa shain obujekuto o aki, deleteFlg o 1 ni setto shi, taimu sutanpu o kōshin shite, hozon shimasu. Rekōdo wa mada dētabēsu ni sonzai shimasu - tada sakujo sareta to māku sarete iru dake desu.

**[Show list - employee disappeared / Risuto o miseru - shain ga kieta]**

Shain ga risuto kara kiemashita. Naze nara GetAllEmployees kueri ga WHERE deleteFlg = 0 de firuta suru kara desu.

### Sofuto Sakujo no Rieki (Benefits of Soft Delete)

Kono apurōchi ni wa ikutsu ka no rieki (advantage) ga arimasu. Machigatte (by mistake) sakujo sareta baai, dēta o rikabarī dekimasu - tada furagu o 0 ni modoseba ii desu. Taishoku shita mono o fukumete, subete no shain no kanzen na kansa shōseki (audit trail) o iji dekimasu. Sansho integuritī o hozon shimasu - kowareta gaikī (foreign key) sansho wa arimasen. Soshite aru nensu (number of years) rekōdo o hozon suru koto o yōkyū (require) suru kanōsei ga aru dēta hozon pōrishī (data retention policy) ni junshū (comply) shimasu.

Dētabēsu ni wa, EmployeeId to deleteFlg no composite unique index ga arimasu. Kono kashikoi (clever) dezain ni yori, shain ID 12345 o atarashii shain ni saishiyō dekimasu. Naze nara dētabēsu wa ("12345", 0) o ("12345", 1) to wa chigau mono to shite miru kara desu.

---

## [DEMO PHASE 7: ROGAUTO / LOGOUT] (20 seconds)

**[Click logout button in navigation bar / Nabigēshon bā no rogauto botan o kurikku]**

Saigo ni, rogauto shimashō.

handleLogout kansu wa clearAuthData o yobidashi, localStorage kara isLoggedIn to userEmail aitemu o sakujo shimasu. Sorekara replace opushon (option) o true ni setto shite sainin pēji ni nabigēto shimasu. Kore wa genzai no rirekisho (history entry) o okikaeる node, burauza no bakku botan de hogo sareta pēji ni modorimasen.

**[Show signin page / Sainin pēji o miseru]**

Sainin ni modotte kimashita. Moshi ima /employees ni chokusetsu akusesu shiyō to suru to...

**[Type /employees in address bar / Adoresu bā ni /employees to taipu]**

ProtectedRoute konpōnento ga isAuthenticated() o chekku shimasu. localStorage ga kuriasu sarete iru node, false o kaesu. Dakara sugu ni sainin ni ridairekuto saremasu. Kore ni yori subete no hogo sareta rūto ga tekisetsu ni sekyua (secure) sarete iru koto ga hosho (ensure) saremasu.

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