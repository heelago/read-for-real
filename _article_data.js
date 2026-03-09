/* ==========================================================
   _article_data.js  —  Read for Real v2
   Article: Flenady & Sparrow (2025)
   Three globals: articleData, tagKey, quizQuestions
   ========================================================== */

const articleData = {
  meta: {
    title: "Cut the bullshit: why GenAI systems are neither collaborators nor tutors",
    titleHe: "תחתכו את הבולשיט: למה מערכות AI גנרטיבי הן לא שותפות ולא מורות",
    author: "Gene Flenady & Robert Sparrow",
    year: 2025,
    source: "Teaching in Higher Education",
    doi: "10.1080/13562517.2025.2497263"
  },

  sections: [
    /* ======================================================
       SECTION 1: INTRO
       ====================================================== */
    {
      id: "intro",
      titleHe: "מבוא: שלושה מחנות",
      titleEn: "Introduction",

      paragraphs: [
        /* ---------- intro-p1 (= rawParagraphs p1) ---------- */
        {
          id: "intro-p1",
          translationHe: "ההתפתחות המהירה האחרונה של טכנולוגיות AI גנרטיבי (GenAI) הובילה לאפשרות שמערכות GenAI ישמשו כ\u2018מורה פרטי,\u2019 \u2018שותף למידה\u2019 ו\u2018מעריך דינמי\u2019 עבור סטודנטים באקדמיה (Sabzalieva and Valentini 2023). את התגובות לאפשרות זו ניתן לחלק לשלושה מחנות. בקצה האחד, הטכנולוגיה החדשה הוצגה כעתיד המהפכני של ההשכלה הגבוהה, שבו מספר עצום ומורחב של סטודנטים ברחבי העולם ילמדו בעיקר באמצעות אינטראקציות מקוונות עם GenAI. במרכז, גישות זהירות יותר מכירות בבעיות אתיות בשילוב נרחב של GenAI בחינוך, ומציעות עדכון שיטות הוראה ותקנות מוסדיות כדי לרתום באופן אתי את הפוטנציאל של הטכנולוגיה החדשה. מרכיב בעמדה מרכזית זו הוא שאוניברסיטאות צריכות לקבל עבודות שהן תוצאה של \u2018שיתוף פעולה\u2019 בין סטודנט ל-AI, אך בהתחשב בנטייה של GenAI \u2018להזות\u2019 טענות ומקורות, הסטודנטים צריכים לקחת אחריות על דיוק התוצרים. בקצה השני של הספקטרום, זרם שכונה \u2018הדיסטופיה היא עכשיו\u2019 בשיח האקדמי הביע חששות שה-GenAI יעמיק, למשל, את \u2018המגפה\u2019 של עומס יתר ואי-יציבות תעסוקתית באקדמיה, ובסופו של דבר ישמיד את כישורי הקריאה והכתיבה שעליהם תלויים מדעי הרוח.",
          sentences: [
            { id: "intro-p1-s1", text: "The recent rapid development of Generative AI (GenAI) technologies has led to the possibility of GenAI systems serving as \u2018personal tutor,\u2019 learning \u2018collaborator,\u2019 and \u2018dynamic assessor\u2019 for tertiary students (Sabzalieva and Valentini 2023)." },
            { id: "intro-p1-s2", text: "Responses to this possibility might be separated into three camps." },
            { id: "intro-p1-s3", text: "At one extreme, the new technology has been championed as the revolutionary future of higher education, in which a hugely expanded worldwide number of tertiary students will learn predominantly through online interactions with GenAI (Khan 2024; Mollick 2024)." },
            { id: "intro-p1-s4", text: "In the middle, more cautious accounts acknowledge ethical issues with widespread integration of GenAI in education, proposing updated teaching practices and institutional regulations to ethically harness the new technology\u2019s potential (Cotton, Cotton, and Shipway 2024; Hartley et al. 2024; Fuchs 2023; Kasneci et al 2023; Rudolph, Tan, and Tan 2023)." },
            { id: "intro-p1-s5", text: "A component of this centrist position is that universities should move to accept work that is the result of student-AI \u2018collaboration,\u2019 but, given the tendency for GenAI to \u2018hallucinate\u2019 claims and sources, students should in some way take responsibility for the accuracy of GenAI outputs (Bearman and Ajjawi 2023; Lodge et al. 2023; Mollick and Mollick 2023)." },
            { id: "intro-p1-s6", text: "At the other end of the spectrum, what has been termed a \u2018dystopia is now\u2019 strand of academic discourse (Bearman, Ryan, and Ajjawi 2022) has expressed fears that GenAI will, for example, deepen rather than relieve the \u2018epidemic\u2019 of academic overwork and precarity (Watermeyer et al. 2024), and ultimately destroy the reading and writing skills on which the humanities depend (Freiberg 2024)." }
          ]
        },

        /* ---------- intro-p2 (Plato-parallel paragraph) ---------- */
        {
          id: "intro-p2",
          translationHe: "תגובה נפוצה לספקנות לגבי השימוש החינוכי ב-GenAI היא להעלות את הפחדים המפורסמים של אפלטון מפני הופעתה של טכנולוגיה חדשה יחסית בתקופתו: הכתיבה (Tufekci 2022; Kobb 2024; Plate, Melick, and Hutson 2024). נטען שבדיוק כפי שהחששות של אפלטון מפני ההשפעות המזיקות של הכתיבה התבררו כמופרכים, גם ההתנגדות לשילוב GenAI בהשכלה הגבוהה לא תעמוד במבחן הזמן. הטקסט הסמוי שאינו כל כך סמוי הוא שביקורת חסרת עכבות על מערכות הוראה מבוססות AI נובעת מפחד לא רציונלי מפני שינוי, ולא ממעורבות אמיתית בטכנולוגיה החדשה ובפוטנציאל שלה.",
          sentences: [
            { id: "intro-p2-s1", text: "One common response to scepticism about GenAI\u2019s educational use is to raise Plato\u2019s famous fears about the emergence of a technology relatively new in his time: writing (Tufekci 2022; Kobb 2024; Plate, Melick, and Hutson 2024)." },
            { id: "intro-p2-s2", text: "It is suggested that, just as Plato\u2019s fears about the corrosive effects of writing proved to be unfounded, opposition to the integration of GenAI into higher education will not stand the test of time." },
            { id: "intro-p2-s3", text: "The not-so-subtle subtext is that more full-throated criticisms of AI teaching systems come from an irrational fear of change, rather than genuine engagement with and understanding of the new technology and its potential." }
          ]
        },

        /* ---------- intro-p3 (= rawParagraphs p2) ---------- */
        {
          id: "intro-p3",
          translationHe: "בנקודת מוצא זו, אנו טוענים שהפחדים המזולזלים בדרך כלל של אפלטון לגבי כתיבה דווקא מאירים מדוע הציפייה שסטודנטים ייקחו אחריות על תוצרי מערכות AI היא בעייתית מאוד. לדעתנו, המשמעויות של הדרישה לאחריות סטודנטים הן בעייתיות מבחינה אתית ופדגוגית. אי אפשר לצפות באופן סביר מסטודנטים לקחת אחריות על ה-\u2018שותף\u2019 וה-\u2018מורה\u2019 שלהם מכיוון ש-GenAI אינו מסוגל באופן יסודי לקחת אחריות על עצמו או על אחרים. בהסתמך על דיונים אחרונים על תוצרי GenAI כ\u2018בולשיט\u2019 חסרי אחריות, אנו טוענים שפרשנים צריכים \u2018לחתוך את הבולשיט\u2019 ולא להתייחס ל-GenAI בהשכלה הגבוהה כשותף ומורה \u2013 מילים שמרמזות בשקר ש-GenAI הוא סוכן אחראי.",
          sentences: [
            { id: "intro-p3-s1", text: "In this point of departure, we argue that Plato\u2019s routinely derided fears about writing instead illuminate why the expectation that tertiary students take responsibility for the outputs of AI systems is highly problematic." },
            { id: "intro-p3-s2", text: "In our view, the implications of the demand for student responsibility are ethically and pedagogically perverse." },
            { id: "intro-p3-s3", text: "We cannot reasonably expect students to take responsibility for their so-called \u2018collaborator\u2019 and \u2018tutor\u2019 because GenAI is fundamentally unable to assume responsibility for itself or others." },
            { id: "intro-p3-s4", text: "Drawing on recent accounts of GenAI outputs as irresponsible \u2018bullshit,\u2019 we argue that commentators should in turn \u2018cut the bullshit\u2019 and not refer to GenAI in higher education as a collaborator and tutor \u2013 words that falsely imply that GenAI is a responsible agent." }
          ]
        }
      ],

      socraticQuestion: {
        id: "sq-intro",
        text: "המחברים מחלקים את התגובות ל-GenAI בחינוך לשלושה מחנות. באיזה מחנה הייתם ממקמים את המוסד שלכם? למה?",
        hint: "חשבו על המדיניות הרשמית, אבל גם על מה שקורה בפועל.",
        minChars: 50
      }
    },

    /* ======================================================
       SECTION 2: PLATO'S FEAR
       ====================================================== */
    {
      id: "plato",
      titleHe: "הפחד של אפלטון",
      titleEn: "Plato\u2019s Fear",

      paragraphs: [
        /* ---------- plato-p1 ---------- */
        {
          id: "plato-p1",
          translationHe: "מדוע בדיוק אפלטון \u2018פחד\u2019 מכתיבה? אפלטון, שדן בנושא זה בפיידרוס דרך דמותו של סוקרטס, מעלה שני חששות.",
          sentences: [
            { id: "plato-p1-s1", text: "Why exactly was Plato \u2018afraid\u2019 of writing?" },
            { id: "plato-p1-s2", text: "Plato, discussing this matter in the Phaedrus through the figure of Socrates, has two concerns." }
          ]
        },

        /* ---------- plato-p2 ---------- */
        {
          id: "plato-p2",
          translationHe: "ראשית, אפלטון חושש שהכתיבה תגרום \u2018ניוון\u2019 של הזיכרון (Plato 2003, 275a). במובן מסוים, הפחד הזה הוכח כמבוסס. אלה שהתאמנו בתרבויות אוראליות, מנקודת המבט של תרבויות כתובות, מפגינים כוחות זיכרון על-אנושיים לכאורה. לטוב ולרע, תרבויות כתובות החליפו את היכולות המנמוניות הללו בצורות הארכיון של הזיכרון שהכתיבה מאפשרת.",
          sentences: [
            { id: "plato-p2-s1", text: "First, Plato is worried that writing will \u2018atrophy\u2019 memory (Plato 2003, 275a)." },
            { id: "plato-p2-s2", text: "In a sense, this fear has proven to be well-founded." },
            { id: "plato-p2-s3", text: "Those trained in oral cultures have, from the perspective of written cultures, seemingly superhuman powers of recall." },
            { id: "plato-p2-s4", text: "For better or worse, written cultures have traded off these mnemonic capacities for the archival forms of memory that writing makes possible." }
          ]
        },

        /* ---------- plato-p3 ---------- */
        {
          id: "plato-p3",
          translationHe: "שנית, ובאופן חשוב יותר לטיעון שלנו כאן, אפלטון היה מודאג מכך שמילים, ברגע שנכתבו, נמלטות משליטת מחברן ויכולות להתפרש במגוון דרכים, ללא נוכחות המחבר כדי להגן על המשמעות המיועדת שלהן. כפי שסוקרטס מנסח זאת:",
          sentences: [
            { id: "plato-p3-s1", text: "Second, and more importantly for our argument here, Plato was concerned with the way that words, once written down, escape their author\u2019s control, and can be interpreted in any number of ways, without their author being present to defend their intended meaning." },
            { id: "plato-p3-s2", text: "As Socrates puts it:" }
          ]
        },

        /* ---------- plato-bq (Phaedrus blockquote) ---------- */
        {
          id: "plato-bq",
          isBlockquote: true,
          translationHe: "ברגע שדברים נכתבו, אתה מוצא אותם בכל מקום, משוחחים עם אנשים לא מתאימים לחלוטין לא פחות מאשר עם אלה שמבינים אותם, ולא יודעים בכלל למי ראוי לדבר ולמי לא. וכשנתקלים בגסות ובעלבון, הם תמיד צריכים את אביהם [מחברם] שיבוא לעזרתם, כי הם לבדם אינם מסוגלים להגן על עצמם או לעזור לעצמם. (Plato 2003, 275e)",
          sentences: [
            { id: "plato-bq-s1", text: "Once an account has been written down, you find it all over the place, hobnobbing with completely inappropriate people no less than with those who understand it, and completely failing to know who it should and shouldn\u2019t talk to. And faced with rudeness and unfair abuse it always needs its father [its author] to come to its assistance, since it is incapable of defending or helping itself. (Plato 2003, 275e)" }
          ]
        },

        /* ---------- plato-p4 (= rawParagraphs p3) ---------- */
        {
          id: "plato-p4",
          translationHe: "לדעתנו, הדאגה העמוקה של אפלטון בקטע זה היא אחריות: ברגע שדברים נכתבים, נעשה הרבה יותר קשה לזהות מי אחראי למשמעות של טענה, ומי אחראי להשפעות שטענה כזו עלולה להיות על מי שאינו מסוגל להקשיב ולפרש אותה כראוי. התגובה של אפלטון הייתה להגביל את התורה \u2018האמיתית\u2019 שלו לשיחה בעל פה בין מתי מעט: פילוסופים שנכחו ואחראים ישירות למשמעות המילים שלהם, ואותם \u2018מועמדים\u2019 (אזרחים, תמיד גברים) שזכו בזמן ובהזדמנות ללמוד לקחת את המילים במובן הנכון (Hadot 2002).",
          sentences: [
            { id: "plato-p4-s1", text: "In our view, Plato\u2019s ultimate concern in this passage is with responsibility: once written down, it becomes much harder to identify who is responsible to and for the meaning of a claim, and \u2013 equally important for Plato \u2013 who is responsible for the effects that such a claim might have on those unable to properly contextualise and interpret its content." },
            { id: "plato-p4-s2", text: "Plato\u2019s response was to restrict his \u2018real\u2019 doctrine to an oral conversation shared between the select few: philosophers present to and thus directly responsible for the meaning of their words, and those \u2018initiates\u2019 (citizens, always male) privileged with the time and opportunity to learn to take those words in the right sense (Hadot 2002)." }
          ]
        },

        /* ---------- plato-p5 ---------- */
        {
          id: "plato-p5",
          translationHe: "האקדמיה המודרנית היא כמובן שונה מאוד מזו של אפלטון. למרות שאוניברסיטאות עילית מעדיפות באופן מובהק את מי שבאים מרקע גזעי ומעמדי מסוים (Bhopal and Myers 2023), הן, לפחות עקרונית, שוויוניות ומריטוקרטיות. ברור לחלוטין שהאקדמיה המודרנית תלויה בכתיבה ובארכיונים כתובים. עם זאת, מוסדות אקדמיים נותרים רגישים מאוד לחשש השני של אפלטון: אוניברסיטאות פועלות לתקן את \u2018חוסר ההגנה\u2019 של מילים כתובות על ידי הבטחה שטענות כתובות מחוברות כראוי לאלה שאחראים להן באמצעות פרקטיקות ייחוס קפדניות: אנו יודעים מי המחברים, לאילו מוסדות הם שייכים ואת מי הם מייצגים, ואנו יודעים כיצד ליצור איתם קשר. בין אם אנו מקבלים בפועל תגובה ממחבר מסוים כשאנו מנסים לעסוק בטיעון הכתוב שלו ובין אם לא, אנו יודעים מי אחראי בסופו של דבר להגנה על עבודה, ולמי יש להפנות את תגובתנו לעבודה זו. במקביל, אנו פועלים לצמצם את ה\u2018חברות\u2019 הבלתי-מבוקרת של מילים כתובות על ידי הבטחה שמי שעוסק בטקסטים אקדמיים עבר הכשרה, או נמצא בהכשרה, ובעל כישורים ספציפיים לתחום שמאפשרים לו להקשיב, לפרש ולהעריך את הטקסט. יחד, שני המאפיינים הללו של האקדמיה המודרנית \u2014 ייחוס שמי והכשרה ספציפית לתחום בהערכת טענות \u2014 פעלו לנטרל את פחד המילים של אפלטון. עם זאת, העובדה שאנו פועלים בצורה כה בולטת לנטרל את הדאגה של אפלטון מעידה שהחששות שלו נותרים רלוונטיים.",
          sentences: [
            { id: "plato-p5-s1", text: "The modern academy is of course very different to Plato\u2019s." },
            { id: "plato-p5-s2", text: "Even though elite universities demonstrably privilege those from certain race and class backgrounds (Bhopal and Myers 2023), they are at least in principle egalitarian and meritocratic." },
            { id: "plato-p5-s3", text: "Equally obviously, the modern academy depends on writing and written archives." },
            { id: "plato-p5-s4", text: "Nonetheless, tertiary institutions remain acutely sensitive to Plato\u2019s second worry: universities work to redress the \u2018defencelessness\u2019 of words by ensuring that written claims are properly connected to those responsible for them via rigorous practices of attribution: we know who the authors are, we know what institutions they belong to and represent, and we know how to contact them." },
            { id: "plato-p5-s5", text: "Whether or not we in fact get a response from a given author when we attempt to engage them in written argument, we know who is ultimately responsible for defending a work, and to whom our response to that work ought to be directed." },
            { id: "plato-p5-s6", text: "At the same time, we work to reduce the \u2018hobnobbing\u2019 of written words by ensuring those who engage with academic texts have either been trained, or are in training, to possess discipline-specific skills that allow them to contextualise, interpret, and assess the text in question." },
            { id: "plato-p5-s7", text: "Together these two features of the modern academy \u2013 named authorship and disciplinary-specific training in the assessment of claims \u2013 have worked to neutralise Plato\u2019s fear words." },
            { id: "plato-p5-s8", text: "However, that we work as conspicuously as we do to neutralise Plato\u2019s worry suggests that his concerns remain relevant." }
          ]
        },

        /* ---------- plato-p6 ---------- */
        {
          id: "plato-p6",
          translationHe: "בעידן האינטרנט, כמובן, ההשפעה של \u2018שקרים\u2019, \u2018חדשות מזויפות\u2019 ו\u2018בולשיט\u2019 על דעת הקהל היא דאגה רצינית. כאן שוב, החשש השני של אפלטון נראה לגיטימי. במקרה של מקורות אינטרנטיים, אנו לא יודעים מי או היכן המחברים נמצאים, למי מילותיהם מיועדות, ואפילו \u2014 באופן גובר \u2014 אם הם אנושיים בכלל. לפיכך, חשוב עוד יותר להנחיל לסטודנטים באוניברסיטה את היכולת להבחין בין עבודות שניתן לייחס למחבר אחראי הנמצא בתוך דיסציפלינה ומוסד, לבין אותן מילים מסוכנות שמחבריהן אינם לוקחים אחריות.",
          sentences: [
            { id: "plato-p6-s1", text: "In the age of the internet, of course, the impact of \u2018lies\u2019 \u2018fake news\u2019 and \u2018bullshit\u2019 on public opinion is a serious concern." },
            { id: "plato-p6-s2", text: "Here again Plato\u2019s second worry seems legitimate." },
            { id: "plato-p6-s3", text: "In the case of internet sources, we do not know who or where the authors reside, who their words are intended for, or even \u2013 increasingly \u2013 if they are human." },
            { id: "plato-p6-s4", text: "Thus, it has become even more important to inculcate university students with the capacity to distinguish between those works that can be sourced to a responsible author located within a discipline and an institution and those dangerous words for which authors do not take responsibility." }
          ]
        },

        /* ---------- plato-p7 (= rawParagraphs p4) ---------- */
        {
          id: "plato-p7",
          translationHe: "לדעתנו, אלה שמגיבים למבקרי AI בחינוך על ידי הצבעה על הפחדים של אפלטון לגבי כתיבה, מפנים שלא בכוונה את תשומת הלב ללב האתי של הנושא. הכנסת מערכות הוראה של GenAI היא חסרת אחריות במובן זה שהיא מכניסה לאקדמיה מילים ללא מחבר \u2014 מילים שאף אחד לא אחראי להן (Bingham 2024). זה, לטענתנו, מוביל לתוצאה סוטה שבה דורשים מסטודנטים לקחת אחריות על שיח שהם עדיין לא במצב להעריך כראוי. יתרה מכך, במידה שמערכות GenAI יחליפו מהותית את האינטראקציה של סטודנטים עם מורים אנושיים \u2014 אפשרות ממשית (Selwyn 2019) \u2014 יהיה קשה יותר ויותר לסטודנטים לפתח את הכישורים להעריך תוצרי GenAI.",
          sentences: [
            { id: "plato-p7-s1", text: "In our view, those who respond to critics of AI in education by pointing to Plato\u2019s fears regarding writing unwittingly draw attention to the ethical heart of the matter." },
            { id: "plato-p7-s2", text: "The introduction of GenAI teaching systems is irresponsible in the sense that it introduces into the academy words without an author \u2013 words for which no one is responsible (Bingham 2024)." },
            { id: "plato-p7-s3", text: "This, we suggest, has the perverse outcome of demanding students take responsibility for discourse that they are not yet in a position to properly assess." },
            { id: "plato-p7-s4", text: "Moreover, to the extent that GenAI teaching systems substantially replace students\u2019 interaction with real human teachers in the future \u2013 very much a possibility (Selwyn 2019) \u2013 it will become increasingly difficult for students to develop the skills to assess GenAI outputs, just as students become increasingly divorced from the human relationships that give their own academic responsibilities meaning." }
          ]
        }
      ],

      socraticQuestion: {
        id: "sq-plato",
        text: "אפלטון טען שכתיבה מנתקת מילים מהאדם שאחראי להן. תחשבו על הודעה שקיבלתם לאחרונה שלא הבנתם אם היא רצינית או לא — מה חסר שם שהיה קיים בשיחה פנים אל פנים?",
        hint: "אפלטון לא מדבר רק על דיוק, אלא על אחריות — מי עומד מאחורי המילים?",
        minChars: 50
      }
    },

    /* ======================================================
       SECTION 3: IRRESPONSIBLE BULLSHIT
       ====================================================== */
    {
      id: "bullshit",
      titleHe: "בולשיט חסר אחריות",
      titleEn: "Irresponsible Bullshit",

      paragraphs: [
        /* ---------- bullshit-p1 (= rawParagraphs p5) ---------- */
        {
          id: "bullshit-p1",
          translationHe: "הארי פרנקפורט הגדיר בולשיט כ\u2018חוסר דאגה לאמת, או אדישות למצב הדברים כפי שהם באמת\u2019 (Frankfurt 2002, 340; Frankfurt 2005). בעוד רוב האנשים אומרים אמת, ושקרנים שמים לב לאמת כדי לעצב את השקר שלהם, הבולשיטר מתעניין רק בלעורר תגובה מהקהל שלו ולא אכפת לו אם מה שהוא אומר אמת או לא.",
          sentences: [
            { id: "bullshit-p1-s1", text: "Harry Frankfurt famously defined bullshit as \u2018lack of concern with truth, or an indifference to how things really are\u2019 (Frankfurt 2002, 340; Frankfurt 2005)." },
            { id: "bullshit-p1-s2", text: "Where most people tell the truth, and liars pay attention to the truth to shape their lies, the bullshitter is only interested in provoking a response from their audience and doesn\u2019t care whether what they say is true or not." }
          ]
        },

        /* ---------- bullshit-p2 (= rawParagraphs p6) ---------- */
        {
          id: "bullshit-p2",
          translationHe: "Sparrow, Koplin, and Flenady (2023) ו-Hicks, Humphries, and Slater (2024) טענו שתוצרי AI גנרטיבי כמו ChatGPT הם בולשיט במובן המדויק של פרנקפורט. GenAI לא תוכנן ואינו מסוגל לייצג את העולם באמת; במקום זאת, \u2018הם תוכננו להעביר שורות טקסט משכנעות\u2019. כלומר, GenAI תוכנן לייצר תגובה מסוימת אצל המשתמשים שלו \u2014 לשכנע אותם שהתשובה שימושית \u2014 ולא לומר משהו אמיתי על העולם. הם, אם כן, בולשיטרים מיסודם.",
          sentences: [
            { id: "bullshit-p2-s1", text: "Sparrow, Koplin, and Flenady (2023) and Hicks, Humphries, and Slater (2024) have argued that the outputs of Generative AIs like ChatGPT are bullshit in Frankfurt\u2019s precise sense." },
            { id: "bullshit-p2-s2", text: "GenAI is neither designed to nor is capable of truthfully representing the world; instead, \u2018they are designed to convey convincing lines of text\u2019 (Hicks, Humphries, and Slater 2024, 38)." },
            { id: "bullshit-p2-s3", text: "That is, GenAI is designed to produce a particular reaction in its users \u2013 to convince its users of the usefulness of the response \u2013 rather than to say something true of the world." },
            { id: "bullshit-p2-s4", text: "They are, then, fundamentally bullshitters." }
          ]
        },

        /* ---------- bullshit-p3 ---------- */
        {
          id: "bullshit-p3",
          translationHe: "חשוב לציין שלומר שתוצרי AI הם בולשיט אין פירושו לטעון שהם תמיד לא נכונים, או שאין להם תפקיד בהצדקת אמונות. בולשיטר עשוי להשיג את מטרותיו הרטוריות באמצעות אמירת דברים נכונים. באופן דומה, AI עשוי \u2014 אולי אפילו ברוב המקרים \u2014 לייצר תוצרים שמתאימים באופן מהימן למצב העניינים בעולם.",
          sentences: [
            { id: "bullshit-p3-s1", text: "Importantly, to say AI outputs are bullshit is not to claim that they are always untrue, nor to say that they can play no role in the justification of belief." },
            { id: "bullshit-p3-s2", text: "A bullshitter might in certain cases achieve their rhetorical goals via the utterance of true claims." },
            { id: "bullshit-p3-s3", text: "Similarly, AI might \u2013 perhaps even for the most part \u2013 produce outputs that reliably correspond with states of affairs in the world." }
          ]
        },

        /* ---------- bullshit-p4 ---------- */
        {
          id: "bullshit-p4",
          translationHe: "העובדה שתוצרי GenAI מהווים \u2018בולשיט\u2019 צריכה להספיק, לדעתנו, לפחות כדי לצנן את ההתלהבות משילובם הנרחב בהשכלה גבוהה. עם זאת, הבעיה בהכנסת GenAI להקשרים חינוכיים היא עמוקה עוד יותר, מסיבות שמתגלות ברגע שאנו מחברים את ההגדרה של GenAI כ\u2018בולשיט\u2019 עם הדיון באחריות לשיח.",
          sentences: [
            { id: "bullshit-p4-s1", text: "That the outputs of GenAI constitute \u2018bullshit\u2019 should be enough, we think, to at least dampen the enthusiasm for their widespread integration in tertiary education." },
            { id: "bullshit-p4-s2", text: "However, the problem of the introduction of GenAI in educational contexts is deeper still, for reasons that emerge once we connect the definition of GenAI as \u2018bullshit\u2019 with the discussion of responsibility for discourse above." }
          ]
        },

        /* ---------- bullshit-p5 ---------- */
        {
          id: "bullshit-p5",
          translationHe: "מקובל לחשוב שמכונות אינן יכולות להיות סוכנים מוסריים: כלומר, מכונות אינן יכולות להיות אחראיות למעשיהן (Johnson 2006; Hakli and M\u00e4kel\u00e4 2019; Sparrow 2021; V\u00e9liz 2021). אין שום היגיון, למשל, לשלוח רחפן צבאי לכלא על הריגת אזרחים בטעות; אחריות לפעולה כזו חייבת להיות מוטלת על בן אדם כלשהו. הסוגיה האתית במקרים כאלה היא הקושי לזהות את בני האדם שצריכים \u2018למלא\u2019 את האחריות במקום המכונה, מה שמוליד את \u2018פער האחריות\u2019 הידוע לשמצה (Sparrow 2007).",
          sentences: [
            { id: "bullshit-p5-s1", text: "It is widely believed that machines cannot be moral agents: that is, machines cannot be responsible for their acts (Johnson 2006; Hakli and M\u00e4kel\u00e4 2019; Sparrow 2021; V\u00e9liz 2021)." },
            { id: "bullshit-p5-s2", text: "It makes no sense, for example, to send a military drone to jail for wrongly killing civilians; responsibility for such an action must be assigned to some human agent." },
            { id: "bullshit-p5-s3", text: "The ethical issue in such cases is the difficulty in identifying the human beings who ought to \u2018fill in\u2019 responsibility for the machine, giving rise to the notorious \u2018responsibility gap\u2019 (Sparrow 2007)." }
          ]
        },

        /* ---------- bullshit-p6 ---------- */
        {
          id: "bullshit-p6",
          translationHe: "חשוב לדיון שלנו על מכונות בחינוך, מתן טענה בעלת תוכן אפיסטמי \u2014 כלומר, מתן \u2018עדות\u2019 על מצב עניינים כלשהו \u2014 הוא עצמו סוג של פעולה שהפרט אחראי לה. מתן עדות מחייב באופן מרומז את המעיד לספק נימוקים נוספים כהצדקה לאמונתו באמיתות הדיווח שלו. המעיד מחויב להגן על עדותו, \u2018לעמוד מאחוריה\u2019, כשנדרש, עם נימוקים נוספים. אנשים עשויים שלא לעמוד בחובה זו, אך מעשיהם מובנים כמעשה של עדות בתנאי שמניחים שיש אחריות מסוימת לעמוד בה.",
          sentences: [
            { id: "bullshit-p6-s1", text: "Importantly for our discussion of machines in education, the making of an epistemically contentful claim \u2013 that is, giving \u2018testimony\u2019 about some state of affairs \u2013 is itself a kind of action for which the individual is responsible." },
            { id: "bullshit-p6-s2", text: "Giving testimony implicitly commits the testifier to providing further reasons as justification for their belief in the truth of their report." },
            { id: "bullshit-p6-s3", text: "The testifier is committed to defending their testimony, \u2018standing behind it\u2019 to \u2018back it up,\u2019 when requested, with further reasons." },
            { id: "bullshit-p6-s4", text: "Individuals may fail to meet this obligation, but their act is intelligible as an act of testimony on condition that some responsibility to meet it is assumed." }
          ]
        },

        /* ---------- bullshit-p7 ---------- */
        {
          id: "bullshit-p7",
          translationHe: "אם מתן עדות הוא מעשה הכרוך בנטילת אחריות על ידי סוכן מוסרי, ואם מכונות אינן סוכנים מוסריים, נובע מכך שמכונות אינן יכולות לתת עדות.",
          sentences: [
            { id: "bullshit-p7-s1", text: "If giving testimony is an act that entails the assumption of responsibility by a moral agent, and if machines are not moral agents, it follows that machines cannot give testimony." }
          ]
        },

        /* ---------- bullshit-p8 ---------- */
        {
          id: "bullshit-p8",
          translationHe: "כעת, כאשר בולשיטר אנושי נותן עדות שכזו, בעוד הוא אינו מתייחס ברצינות או אפילו מתעלם לחלוטין מהאחריות המרומזת להגן על טענותיו, עדיין ניתן להטיל עליו אחריות. חלק מהמוטיבציה לתיאור פילוסופי של מושג הבולשיט עם מחויבות לאמת הוא לאפשר לאנשים \u2018לקרוא\u2019 לבולשיט, כלומר להדגיש את הדרך שבה הבולשיטר אינו לוקח את אחריותו האפיסטמית ברצינות, ובמידת הצורך, לדרוש ממנו \u2018לחתוך את הבולשיט\u2019, כביכול.",
          sentences: [
            { id: "bullshit-p8-s1", text: "Now, when a human bullshitter gives testimony that such-and-such is the case, while they do not take seriously or indeed entirely disregard the implicit responsibility to defend their claims, they nonetheless can be held responsible for them." },
            { id: "bullshit-p8-s2", text: "Part of the motivation, then, for a philosophical account of the concept of bullshit is to enable individuals with a commitment to the truth to \u2018call out\u2019 bullshit, that is, to highlight the way in which the bullshitter does not take their own epistemic responsibilities seriously, and, if necessary, to demand that they \u2018cut the bullshit,\u2019 so to speak." }
          ]
        },

        /* ---------- bullshit-p9 ---------- */
        {
          id: "bullshit-p9",
          translationHe: "במקרה של מערכת GenAI, לעומת זאת, בעיית חוסר האחריות של הבולשיט היא משמעותית הרבה יותר: GenAI אינו סוכן שניתן להטיל עליו אחריות. כמו \u2018פער האחריות\u2019, בעיית \u2018פער העדות\u2019 מתעוררת: הקושי לזהות את הסוכנים האנושיים שניתן להטיל עליהם אחריות בגין פעילות המכונות. \u2018פער העדות\u2019 נפתח כאשר מערכות GenAI מאומצות \u2014 למרות מגבלות התכנון שלהן \u2014 על ידי סוכנים אנושיים שאמורים לדווח על העולם, אך לא ניתן להטיל עליהם אחריות לדיווחים שגויים או לקויים מבחינה אפיסטמית.",
          sentences: [
            { id: "bullshit-p9-s1", text: "In the case of a GenAI system, however, the problem of the irresponsibility of bullshit is much more significant: GenAI is not an agent that can even potentially be held accountable." },
            { id: "bullshit-p9-s2", text: "As in the \u2018responsibility gap,\u2019 the problem of a \u2018testimony gap\u2019 arises: the problem of appropriately identifying those human agents to be held accountable for the activity of machines." },
            { id: "bullshit-p9-s3", text: "A \u2018testimony gap\u2019 opens where GenAI systems are taken \u2013 despite the limitations of their design \u2013 by human agents to be reporting on the world, but cannot be held responsible for mistaken or otherwise epistemically inadequate reports." }
          ]
        }
      ],

      socraticQuestion: {
        id: "sq-bullshit",
        text: "לפי פרנקפורט, בולשיט זו לא שקר — זו אדישות לאמת. תנו דוגמה ממשהו שקראתם השבוע (לא AI) שמתאים להגדרה הזו.",
        hint: "שקרן חייב לדעת מה האמת כדי לעוות אותה. בולשיטר פשוט לא מתעניין.",
        minChars: 50
      }
    },

    /* ======================================================
       SECTION 4: PERVERSE OUTCOMES
       ====================================================== */
    {
      id: "perverse",
      titleHe: "תוצאות סוטות",
      titleEn: "Perverse Outcomes",

      paragraphs: [
        /* ---------- perverse-p1 ---------- */
        {
          id: "perverse-p1",
          translationHe: "התגובה בספרות, כזו שמקבלת באופן מכללא את חוסר האחריות של תוצרי GenAI, הייתה להציע העברה (outsourcing) של האחריות מ-GenAI לסטודנטים. ישנן גרסאות נאיביות ומתוחכמות יותר של עמדה זו.",
          sentences: [
            { id: "perverse-p1-s1", text: "The response in the literature, one which tacitly accepts the irresponsibility of GenAI outputs, has been to propose outsourcing responsibility from GenAI to students." },
            { id: "perverse-p1-s2", text: "There are na\u00efve and considered versions of this view." }
          ]
        },

        /* ---------- perverse-p2 ---------- */
        {
          id: "perverse-p2",
          translationHe: "הגרסה הנאיבית מתעקשת שהצורך לקחת אחריות על מערכות GenAI שעלולות לטעות או \u2018להזות\u2019 הוא מספיק. סטודנטים אחראים לבדיקת שגיאות של ה\u2018שותפים\u2019 וה\u2018מורים\u2019 שלהם (Mollick and Mollick 2023). ישנן שתי בעיות עם גישה זו.",
          sentences: [
            { id: "perverse-p2-s1", text: "The na\u00efve version insists that the need to take responsibility for GenAI systems as liable to err or \u2018hallucinate\u2019 is sufficient." },
            { id: "perverse-p2-s2", text: "Students are responsible for error checking their so-called \u2018collaborators\u2019 and \u2018tutors\u2019 (Mollick and Mollick 2023)." },
            { id: "perverse-p2-s3", text: "There are two problems with this." }
          ]
        },

        /* ---------- perverse-p3 ---------- */
        {
          id: "perverse-p3",
          translationHe: "ראשית, תפיסה זו מבינה באופן שגוי מהותית את תוצרי GenAI כדיווח על העולם, עם ההצעה שמערכות AI הן ברובן \u2014 ויהפכו ליותר ויותר \u2014 ייצוגים מדויקים של מצבי עניינים אמיתיים. כפי שנדון לעיל, תוצרי GenAI הם בולשיט: הם לא תצפית על הדיוק שלהם; לעשות בולשיט זה להיות לא מעוניין באמת, ודיווחים מדויקים יכולים לשמש כבולשיט. ככזה, \u2018הזיה\u2019 הוא מונח מטעה: הוא נותן את הרושם ש-GenAI רוצה לדווח על העולם, אך סובל מתקלה מסוימת בדיווח זה (Hicks, Humphries, and Slater 2024).",
          sentences: [
            { id: "perverse-p3-s1", text: "Firstly, this view fundamentally misunderstands GenAI outputs as reporting on the world, with the suggestion that AI systems are mostly \u2013 and will become more \u2013 accurate representations of true states of affairs." },
            { id: "perverse-p3-s2", text: "As discussed above, that GenAI outputs are bullshit is not an observation about their accuracy: to bullshit is to be unconcerned with the truth, and accurate reports can serve as bullshit." },
            { id: "perverse-p3-s3", text: "As such, \u2018hallucination\u2019 is a misleading term: it gives the impression that GenAI wants to report on the world, but suffers some breakdown in that reporting (Hicks, Humphries, and Slater 2024)." }
          ]
        },

        /* ---------- perverse-p4 ---------- */
        {
          id: "perverse-p4",
          translationHe: "שנית, דרך זו של הטלת אחריות מובילה לתוצאה הסוטה של הפיכת סטודנטים בודדים לאחראים הבלעדיים לאמיתות הטענות בעבודות שהם מגישים, במקום יחסי שותפות ומורה-תלמיד אמיתיים שמאופיינים באחריות הדדית לאמת.",
          sentences: [
            { id: "perverse-p4-s1", text: "Secondly, this way of assigning responsibility has the perverse outcome of making individual students entirely responsible for the truth of the claims in the work they submit, in place of genuine collaborator and teacher-student relationships that are characterised by mutual responsibility to the truth." }
          ]
        },

        /* ---------- perverse-p5 (= rawParagraphs p7) ---------- */
        {
          id: "perverse-p5",
          translationHe: "לקרוא ל-GenAI \u2018שותף\u2019 מתעלם ממה ששיתוף פעולה באמת דורש: לשתף פעולה פירושו לעבוד יחד עם סוכן אחר שאחראי לתרומותיו, שמסוגל להחזיק את עצמו ואת אחרים בסטנדרטים משותפים שמנחים פרויקט משותף. יש מחקר משמעותי בהשכלה גבוהה על למידה שיתופית כמפתחת את היכולת של סטודנטים לתת ולקבל משוב ולנטר את התרומות שלהם ושל אחרים. GenAI, לעומת זאת, אינו מסוגל לקחת אחריות על עצמו או על אחרים; הוא לא יכול לשתף פעולה, ולקרוא לו \u2018שותף\u2019 מרוקן את שיתוף הפעולה האמיתי בין סטודנטים ממשמעותו וערכו הפדגוגי. ההתלהבות ל-GenAI כ\u2018שותף\u2019 היא אדישה עקשנית הן למציאות GenAI והן לשיתוף פעולה אמיתי. זה, במילה אחת, בולשיט.",
          sentences: [
            { id: "perverse-p5-s1", text: "Calling GenAI a \u2018collaborator\u2019 disregards accepted understandings of that term: to collaborate is to work together with another agent who is responsible for their contributions, who is capable of holding themselves and others to collective standards governing a shared project." },
            { id: "perverse-p5-s2", text: "There is significant higher education research on collaborative learning as developing students\u2019 capacity to constructively provide and respond to feedback and to monitor their own and others\u2019 contributions in light of shared goals (Slavin 1983; Hargreaves 2007; Johnson, Johnson, and Smith 2007)." },
            { id: "perverse-p5-s3", text: "GenAI, however, is unable to take responsibility for itself or for others in this way; it cannot collaborate, and calling it a \u2018collaborator\u2019 drains actual student collaboration of its meaning and pedagogical significance." },
            { id: "perverse-p5-s4", text: "Enthusiasm for GenAI as a \u2018collaborator\u2019 is stubbornly unconcerned with both the reality of GenAI and of genuine collaboration." },
            { id: "perverse-p5-s5", text: "It is, in a word, bullshit." }
          ]
        },

        /* ---------- perverse-p6 ---------- */
        {
          id: "perverse-p6",
          translationHe: "באופן דומה, הוראה מתקיימת ביחס בין אנשים. ביחס מורה-תלמיד שנבנה כראוי, האחריות היא דו-כיוונית: סטודנטים צריכים לתבוע דין וחשבון ממוריהם וממרציהם, לחקור את טענותיהם, כשם שסגל ההוראה צריך לתת משוב שוטף לטענות הסטודנטים. כלומר, ההכשרה במדעי הרוח היא ללמוד לערער על טענות הידע של אחרים ולאשש את הטענות שלך. יש מחקר משמעותי בהשכלה גבוהה על משוב אפקטיבי כתהליך דיאלוגי, בונה במשותף, שבו מורים וסטודנטים לוקחים אחריות על הידע של האחר באופן מכבד אך ביקורתי (Carless 2016; Carless and Winstone 2023). הכנסת GenAI כ\u2018מורה\u2019 מכניסה סוכן חסר אחריות מהותית \u2014 סוכן שאפילו אינו יכול לקחת אחריות \u2014 למרחב ההוראה והלמידה, ובכך שוחקת את האחריות ההדדית שהופכת את ההוראה והמשוב לאפקטיביים. ובכל זאת, התגובה הסוטה להכרה מכללא בחוסר האחריות של מערכות GenAI היא לצפות מסטודנטים לקחת אחריות על ה\u2018מורה\u2019 שלהם. זה הופך, לכל הפחות, את ההנחה המקובלת שזרימת האחריות הפדגוגית מתחילה מהמורה לסטודנט: זו אחריותו של המורה, לפחות בשלב הראשוני, ליצור אתר בונה משותף של אחריות הדדית בין מורה לסטודנטים, על ידי הדגמת \u2018כיבוד אכפתי\u2019 (Zhou et al. 2021) והצגת פגיעותם למשוב (Carless and Boud 2018; Carless and Winstone 2023). הקצאת האחריות לסטודנטים על ה\u2018מורים\u2019 שלהם ב-GenAI צריכה להצביע על כך שמערכות GenAI אינן באמת מורים כלל; ניתן לקרוא להן כך רק תוך התעלמות מהמציאות של GenAI ושל הוראה אמיתית. גם זה, שוב, בולשיט.",
          sentences: [
            { id: "perverse-p6-s1", text: "Similarly, teaching is constituted by a relationship between individuals." },
            { id: "perverse-p6-s2", text: "In a properly constituted teacher-student relationship, responsibility is bidirectional: university students ought to hold their tutors and lecturers to account, questioning their claims and the justification for them, just as teaching staff ought to give ongoing feedback on students\u2019 claims." },
            { id: "perverse-p6-s3", text: "That is, arguably, what training in the humanities is: learning to contest the knowledge claims of others and to vindicate one\u2019s own." },
            { id: "perverse-p6-s4", text: "There is, again, significant higher education research on effective feedback as a dialogic, co-constructive process, in which teachers and students take responsibility for respectfully but critically engaging with one another\u2019s claims to knowledge (Carless 2016; Carless and Winstone 2023)." },
            { id: "perverse-p6-s5", text: "Introducing GenAI as a \u2018tutor\u2019 inserts a fundamentally irresponsible agent \u2013 an agent who cannot even potentially assume responsibility \u2013 into the co-constructive teaching and learning space, corroding the mutual responsibility that makes teaching and feedback effective." },
            { id: "perverse-p6-s6", text: "Yet the perverse response to tacit acknowledgement of the irresponsibility of GenAI tutoring systems is to expect students to assume responsibility for their \u2018tutor.\u2019" },
            { id: "perverse-p6-s7", text: "This at the very least reverses the common assumption that pedagogical responsibilities flow, at least initially, from teacher to student: it is the responsibility of the teacher to make possible a co-constructive site of mutual responsibility between teacher and students, by modelling \u2018care respect\u2019 (Zhou et al. 2021) and foregrounding their own vulnerability to feedback (Carless and Boud 2018; Carless and Winstone 2023)." },
            { id: "perverse-p6-s8", text: "The assignation of responsibility to students for their GenAI \u2018tutors\u2019 should indicate that GenAI systems are not really tutors at all; they can only be called as much by disregarding the reality of GenAI and of genuine teaching." },
            { id: "perverse-p6-s9", text: "It is, again, bullshit." }
          ]
        },

        /* ---------- perverse-p7 ---------- */
        {
          id: "perverse-p7",
          translationHe: "גישות מתוחכמות יותר לאופן שבו סטודנטים עשויים לקבל אחריות על עבודה שהם מייצרים באמצעות GenAI טוענות לצורך לחרוג מבדיקת שגיאות ולהעריך תוצרי GenAI לפי סטנדרטים דיסציפלינריים, מה שמחלק באופן ראוי את האחריות בין סטודנטים ומורים (Bearman and Ajjawi 2023). למורים יש אחריות להנחיל לסטודנטים כישורים ספציפיים לתחום כדי להעריך כראוי את הרלוונטיות והערך של שיח, כולל זה שנוצר על ידי AI או באמצעותו. המגבלה של גישה זו, עם זאת, מתגלה ברגע שאנו שוקלים את טבעה של אחריות פדגוגית כהדדית בין מורים וסטודנטים.",
          sentences: [
            { id: "perverse-p7-s1", text: "Considered accounts of how students might accept responsibility for the work they produce using GenAI argue for the need to go beyond error checking and assess GenAI outputs according to disciplinary standards, which commendably seeks to distribute responsibility to students and teachers (Bearman and Ajjawi 2023)." },
            { id: "perverse-p7-s2", text: "Teachers have a responsibility to inculcate students with the discipline-specific skills to properly assess the relevance and value of discourse, including that generated by, or with, AI." },
            { id: "perverse-p7-s3", text: "The limitation of this approach, however, appears once we consider the nature of pedagogical responsibility as holding mutually between teachers and students." }
          ]
        },

        /* ---------- perverse-p8 ---------- */
        {
          id: "perverse-p8",
          translationHe: "כסטודנטים, דרך חשובה אחת שבה אנו מגיעים לתחושת אחריות כלפי סטנדרטים דיסציפלינריים היא דרך יחסים עם נציגים אמיתיים של אותם סטנדרטים, כלומר באמצעות פנייה בדיבור ובכתיבה למורים שמשמשים עבורנו כמודלים של אותם סטנדרטים. אנו מזדהים עם דיסציפלינה ומשקיעים בה כי נציגיה השקיעו בנו באופן משמעותי. במילים אחרות, אנו מקבלים אחריות כלפי דיסציפלינה וסטנדרטיה בהקשר של אחריות הדדית, שבה אחרים מחזיקים אותנו בסטנדרטים נורמטיביים ואנו בתורנו מחזיקים אחרים. בעתיד שבו מערכות GenAI ומערכות ציונים יחליפו או יתווכו באופן מהותי את היחסים הפדגוגיים הללו, תחושת האחריות ההדדית הזו עלולה להישחק. באופן קונקרטי יותר, אם סטודנטים מרגישים שהם כותבים עם מכונה ובשביל מכונה ולא עם בני אדם ובשבילם \u2014 אם חינוכם מדגיש הנחיה ועריכה של תוצרי GenAI, כאשר עבודותיהם מוערכות על ידי GenAI \u2014 סביר להציע שהם לא ירגישו אחראים כלפי נציגי סטנדרטים דיסציפלינריים, ולכן כלל לא כלפי סטנדרטים דיסציפלינריים. בקשה מסטודנטים לחקור באופן ביקורתי תוצרי GenAI בהתאם לסטנדרטים דיסציפלינריים עומדת אפוא בפני בעיה קונספטואלית משמעותית: ייתכן שנבקש מסטודנטים לממש אחריות כלפי סטנדרט מחוץ להקשרים האנושיים שבהם לסטנדרטים אלו יש אחיזה משמעותית.",
          sentences: [
            { id: "perverse-p8-s1", text: "As students, one important way we come to a sense of responsibility to disciplinary standards is through relationships with real representatives of those standards, that is, by addressing ourselves in speech and writing to teachers who serve as models of those standards for us." },
            { id: "perverse-p8-s2", text: "We come to identify with and invest in a discipline because representatives of that discipline have invested in us in some meaningful way." },
            { id: "perverse-p8-s3", text: "In other words, we accept responsibility to a discipline and its standards in the context of mutual responsibility, being held by another to normative standards, and then coming to hold others to that standard in turn." },
            { id: "perverse-p8-s4", text: "In a future where GenAI tutors and grading systems substantially replace or mediate pedagogical relationships this felt sense of responsibility to another is highly likely to be corroded." },
            { id: "perverse-p8-s5", text: "More concretely, if students come to feel they are writing with and for a machine rather than with and for human beings \u2013 if their education emphasises prompting and revising GenAI outputs, with submissions in turn to be marked by GenAI \u2013 it is plausible to suggest that they will not feel responsible to representatives of disciplinary standards, and thus not to disciplinary standards at all." },
            { id: "perverse-p8-s6", text: "Asking students to critically interrogate GenAI outputs in line with disciplinary standards thus faces a significant conceptual problem: we may come to ask students to exercise responsibility to a standard outside of the human contexts in which those standards have meaningful grip." }
          ]
        },

        /* ---------- perverse-p9 ---------- */
        {
          id: "perverse-p9",
          translationHe: "ניתן לנסח זאת במונחים של מעורבות סטודנטים. למרות שספרות ההשכלה הגבוהה על מעורבות היא מורכבת, יש ראיות שמעורבות סטודנטים מושפעת משמעותית מהתנהגות המורה (Umbach and Wawrzynski 2005), ושסטודנטים נוטים יותר להיות מעורבים כאשר מורים מוכנים, נגישים, מציבים סטנדרטים גבוהים ומאתגרים את הסטודנטים (Mearns, Meyer, and Bharadwaj 2007; Bryson and Hand 2007). GenAI אינו מסוגל לבצע אף אחד מהדברים הללו באופן משמעותי; הוא אינו מסוגל להשקיע בסטודנטים באופן שגורם למעורבות. אם הממשק העיקרי של סטודנטים עם התרבות האקדמית הוא עם מערכת GenAI \u2014 שאינה מסוגלת להשקעה אנושית \u2014 יש סיכוי סביר שמעורבות הסטודנטים תיפגע.",
          sentences: [
            { id: "perverse-p9-s1", text: "This might be put in terms of student engagement." },
            { id: "perverse-p9-s2", text: "Although the higher education literature on engagement is complex, there is evidence that student engagement is significantly influenced by teacher behaviour (Umbach and Wawrzynski 2005), and that students are more likely to engage when teachers are prepared, approachable, set high standards and challenge students (Mearns, Meyer, and Bharadwaj 2007; Bryson and Hand 2007)." },
            { id: "perverse-p9-s3", text: "GenAI is not capable of any of these things in any meaningful sense; it is not capable of investing in students in a way that engenders engagement." },
            { id: "perverse-p9-s4", text: "If the primary interface students have with academic culture is with a GenAI system \u2013 which is not capable of human investment \u2013 there is a reasonable chance that student engagement will suffer." }
          ]
        }
      ],

      socraticQuestion: {
        id: "sq-perverse",
        text: "המחברים טוענים שלבקש מסטודנטים לקחת אחריות על 'שיתוף פעולה' עם AI זה פרוורטי. אתם משתמשים בכלי הזה עכשיו — האם הכלי הזה 'משתף פעולה' איתכם? מה ההבדל?",
        hint: "חשבו: מי אחראי לתוכן שמופיע כאן? מי כתב את השאלות? מי עומד מאחורי הטענות במאמר?",
        minChars: 50
      }
    },

    /* ======================================================
       SECTION 5: CONCLUSION
       ====================================================== */
    {
      id: "conclusion",
      titleHe: "סיכום: לחתוך את הבולשיט",
      titleEn: "Cutting the Bullshit",

      paragraphs: [
        /* ---------- conclusion-p1 (= rawParagraphs p8) ---------- */
        {
          id: "conclusion-p1",
          translationHe: "חלק מהפתרון כאן הוא לחתוך את הבולשיט: GenAI אינו מסוגל מעצם טבעו לשמש כשותף או כמורה, ואין לומר שהוא כן, אם אין לשחוק את משמעות התפקידים האלה והאחריות שהם מחייבים. למען הבהרה, המטרה שלנו כאן לא הייתה לטעון לאיסור מוחלט על שימוש ב-GenAI בהשכלה גבוהה — איסור כזה אינו אפשרי ולא רצוי — אלא לעורר דיון על השפה והמשגות שבהם אנו משתמשים לגבי מערכות הוראה של GenAI, לטובת פיקוח רגולטורי איתן ושילוב פדגוגי נכון.",
          sentences: [
            { id: "conclusion-p1-s1", text: "Part of the solution here is to cut the bullshit: GenAI is constitutively unable to serve as a collaborator or a tutor and should not be said to do so, if the meaning of those roles \u2013 and the responsibilities those roles entail \u2013 is not to be corroded." },
            { id: "conclusion-p1-s2", text: "To be clear, our goal here has not been to argue for a total ban on the use of GenAI systems in higher education \u2013 such a ban is neither possible nor desirable \u2013 but rather to incite discussion about our language for and conceptualisation of GenAI teaching systems in higher education, in the interests of robust regulatory oversight and pedagogically sound integration." }
          ]
        }
      ],

      socraticQuestion: {
        id: "sq-conclusion",
        text: "המחברים קוראים 'לחתוך את הבולשיט' — להפסיק לקרוא ל-AI מורה או שותף. אם הם צודקים, מה לדעתכם הכינוי הנכון ל-AI בהקשר חינוכי?",
        hint: "הם לא אומרים שאסור להשתמש ב-AI, רק שהשפה שבה אנחנו מתארים אותו משנה.",
        minChars: 50
      }
    }
  ]
};


/* ==========================================================
   TAG KEY
   Maps sentence IDs → expected tag type + feedback
   Only sentences carrying argumentative weight are included.
   ========================================================== */

const tagKey = {

  /* ---- INTRO ---- */

  "intro-p1-s2": {
    type: "claim",
    feedbackCorrect: "נכון — זו הטענה המארגנת של הפסקה. היא מסדרת את כל מה שבא אחריה.",
    feedbackMissed: "הטענה המארגנת של הפסקה היא שיש שלוש תגובות אפשריות ל-GenAI בחינוך. זה המשפט שמסדר את כל מה שבא אחריו."
  },

  "intro-p1-s3": {
    type: "evidence",
    feedbackCorrect: "נכון — זו הדוגמה למחנה הראשון (האופטימי), עם אזכורים ביבליוגרפיים.",
    feedbackMissed: "זו ראיה: תיאור המחנה האופטימי עם הפניות ל-Khan ו-Mollick. שימו לב לאזכורים הביבליוגרפיים."
  },

  "intro-p1-s4": {
    type: "evidence",
    feedbackCorrect: "נכון — זו הדוגמה למחנה השני (המרכזי הזהיר), גם כאן עם מקורות תומכים.",
    feedbackMissed: "זו ראיה למחנה השני — הגישה הזהירה. שימו לב לריבוי המקורות: Cotton, Hartley, Fuchs, Kasneci, Rudolph."
  },

  "intro-p1-s6": {
    type: "evidence",
    feedbackCorrect: "נכון — זו הדוגמה למחנה השלישי (הביקורתי/דיסטופי).",
    feedbackMissed: "זו ראיה למחנה השלישי — 'הדיסטופיה היא עכשיו'. שימו לב להפניות: Bearman, Watermeyer, Freiberg."
  },

  "intro-p2-s2": {
    type: "claim",
    feedbackCorrect: "נכון — זו הטענה של מצדדי GenAI: ההתנגדות לא תעמוד במבחן הזמן, בדיוק כמו ההתנגדות לכתיבה.",
    feedbackMissed: "זו טענה (אמנם לא של המחברים אלא של היריבים שלהם): שכמו שהפחד מכתיבה התבדה, גם ההתנגדות ל-GenAI תתבדה."
  },

  "intro-p3-s1": {
    type: "claim",
    feedbackCorrect: "בדיוק — זו טענת התזה המרכזית של המאמר כולו.",
    feedbackMissed: "הטענה המרכזית: הפחדים של אפלטון מכתיבה דווקא מאירים מדוע הציפייה שסטודנטים ייקחו אחריות על תוצרי AI היא בעייתית מאוד. זו טענת התזה (thesis) של כל המאמר."
  },

  "intro-p3-s2": {
    type: "claim",
    feedbackCorrect: "נכון — טענה נוספת: הדרישה לאחריות סטודנטים היא לא רק בעייתית אלא גם סוטה מבחינה פדגוגית.",
    feedbackMissed: "טענה נוספת: המשמעויות של הדרישה לאחריות סטודנטים הן בעייתיות אתית ופדגוגית סוטה — המחברים משתמשים במילה חזקה: perverse."
  },

  "intro-p3-s3": {
    type: "claim",
    feedbackCorrect: "נכון — זו הראיה התומכת בטענה: GenAI לא מסוגל לקחת אחריות על עצמו.",
    feedbackMissed: "זו הנמקה: GenAI אינו מסוגל באופן יסודי לקחת אחריות על עצמו או על אחרים — ולכן אי אפשר לקרוא לו 'שותף' או 'מורה'."
  },

  /* ---- PLATO ---- */

  "plato-p2-s1": {
    type: "evidence",
    feedbackCorrect: "נכון — זו ראיה: הפניה ישירה לטקסט של אפלטון עם ציטוט מהפיידרוס.",
    feedbackMissed: "זו ראיה: החשש הראשון של אפלטון לגבי כתיבה, עם הפניה ישירה ל-Plato 2003, 275a."
  },

  "plato-p3-s1": {
    type: "claim",
    feedbackCorrect: "נכון — 'more importantly for our argument here' מסמן שזו הטענה החשובה יותר עבור המחברים.",
    feedbackMissed: "זו טענה מפתח: החשש השני של אפלטון — שמילים כתובות נמלטות משליטת מחברן — הוא החשוב יותר לטיעון של המחברים."
  },

  "plato-p4-s1": {
    type: "claim",
    feedbackCorrect: "נכון — הטענה: הדאגה העמוקה של אפלטון היא אחריות. שימו לב גם ל-'In our view' כהסתייגות.",
    feedbackMissed: "הטענה: הדאגה העמוקה של אפלטון בקטע זה היא אחריות — מי אחראי למשמעות של טענה ולהשפעותיה. זו הטענה המרכזית של כל חלק אפלטון."
  },

  "plato-p4-s2": {
    type: "evidence",
    feedbackCorrect: "נכון — זו ראיה: איך אפלטון הגיב לבעיה — הגביל את התורה שלו לשיחה בעל פה. עם מקור: Hadot 2002.",
    feedbackMissed: "זו ראיה: איך אפלטון הגיב לבעיה בפועל — הגביל את התורה 'האמיתית' שלו לשיחה בעל פה בין מתי מעט. שימו לב למקור: Hadot 2002."
  },

  "plato-p5-s4": {
    type: "claim",
    feedbackCorrect: "נכון — טענה על הדרך שבה האקדמיה המודרנית מתמודדת עם חשש אפלטון: ייחוס שמי קפדני.",
    feedbackMissed: "זו טענה: אוניברסיטאות פועלות לתקן את 'חוסר ההגנה' של מילים כתובות באמצעות פרקטיקות ייחוס — אנו יודעים מי המחברים ואיך ליצור איתם קשר."
  },

  "plato-p5-s8": {
    type: "hedging",
    feedbackCorrect: "נכון — 'suggests' היא שפת הסתייגות: המחברים לא אומרים שהחששות של אפלטון נכונים בהכרח, אלא שהם רלוונטיים.",
    feedbackMissed: "שימו לב ל-'suggests' — המחברים לא אומרים שהחששות של אפלטון מוכחים, אלא שהעובדה שאנו פועלים לנטרל אותם מרמזת שהם עדיין רלוונטיים."
  },

  "plato-p6-s4": {
    type: "claim",
    feedbackCorrect: "נכון — טענה: חשוב יותר מתמיד להנחיל לסטודנטים יכולת הבחנה בין מקורות אחראיים למילים 'מסוכנות'.",
    feedbackMissed: "זו טענה: בעידן האינטרנט חשוב אף יותר להנחיל לסטודנטים את היכולת להבחין בין מקורות אחראיים לבין מילים מסוכנות שמחבריהן אינם לוקחים אחריות."
  },

  "plato-p7-s1": {
    type: "hedging",
    feedbackCorrect: "נכון — 'In our view' ו-'unwittingly' מסמנים שזו הפרשנות של המחברים, לא עובדה. אפשר לסמן גם כטענה.",
    feedbackMissed: "שימו לב ל-'In our view' — המחברים מסמנים שזו הפרשנות שלהם. הם גם טוענים שהמצביעים על אפלטון עושים זאת 'שלא בכוונה' (unwittingly)."
  },

  "plato-p7-s2": {
    type: "claim",
    feedbackCorrect: "בדיוק — זו טענת הגרעין של המחברים: GenAI מכניס לאקדמיה מילים ללא מחבר.",
    feedbackMissed: "זו הטענה המרכזית של כל המאמר: ש-GenAI מכניסה לאקדמיה מילים בלי מחבר — מילים שאף אחד לא אחראי להן."
  },

  "plato-p7-s3": {
    type: "hedging",
    feedbackCorrect: "נכון — 'we suggest' היא שפת הסתייגות: המחברים מציעים, לא קובעים.",
    feedbackMissed: "'we suggest' (אנו מציעים) היא שפת הסתייגות — הם לא טוענים בוודאות אלא מציעים."
  },

  /* ---- BULLSHIT ---- */

  "bullshit-p1-s1": {
    type: "evidence",
    feedbackCorrect: "נכון — זו ראיה: הגדרת פרנקפורט לבולשיט עם הפניה ביבליוגרפית.",
    feedbackMissed: "זו ראיה: הגדרת פרנקפורט לבולשיט — 'חוסר דאגה לאמת'. שימו לב לאזכורים: Frankfurt 2002, 2005."
  },

  "bullshit-p1-s2": {
    type: "claim",
    feedbackCorrect: "נכון — הטענה היא על מה שמאפיין את הבולשיטר: אדישות לאמת, לא שקר.",
    feedbackMissed: "הטענה: הבולשיטר לא מנסה לשקר (שיודע את האמת) אלא פשוט אדיש לאמת לגמרי."
  },

  "bullshit-p2-s1": {
    type: "evidence",
    feedbackCorrect: "נכון — ראיה: המחברים מציטים מחקרים קודמים שכבר הראו שתוצרי GenAI הם בולשיט.",
    feedbackMissed: "זו ראיה: המחברים מציטים מחקרים קודמים (Sparrow et al. 2023; Hicks et al. 2024) שכבר הראו שתוצרי GenAI הם בולשיט במובן של פרנקפורט."
  },

  "bullshit-p2-s2": {
    type: "claim",
    feedbackCorrect: "נכון — טענה ישירה ונחרצת: GenAI לא תוכנן ואינו מסוגל לייצג את העולם באמת.",
    feedbackMissed: "טענה ישירה ונחרצת: GenAI לא תוכנן ואינו מסוגל לייצג את העולם באמת. זה הבסיס לכל הטיעון שבא אחרי."
  },

  "bullshit-p2-s4": {
    type: "claim",
    feedbackCorrect: "נכון — הטענה הפרובוקטיבית ביותר: מערכות GenAI הן בולשיטרים מיסודם.",
    feedbackMissed: "טענה חדה: הם בולשיטרים מיסודם. זו טענה — אפשר להתווכח איתה."
  },

  "bullshit-p3-s1": {
    type: "hedging",
    feedbackCorrect: "נכון — המחברים מסייגים: לומר שתוצרי AI הם בולשיט לא אומר שהם תמיד שגויים.",
    feedbackMissed: "זו הסתייגות חשובה: המחברים מודים שתוצרי AI אינם תמיד לא נכונים ושהם יכולים לשחק תפקיד בהצדקת אמונות."
  },

  "bullshit-p3-s3": {
    type: "hedging",
    feedbackCorrect: "מצוין — 'might' ו-'perhaps even for the most part' הם ביטויי הסתייגות קלאסיים.",
    feedbackMissed: "שימו לב ל-'might' ו-'perhaps even for the most part' — המחברים מודים שהאמירה שלהם לא מוחלטת. זו הסתייגות."
  },

  "bullshit-p4-s1": {
    type: "claim",
    feedbackCorrect: "נכון — טענה: עצם העובדה שתוצרי GenAI הם בולשיט צריכה לצנן את ההתלהבות.",
    feedbackMissed: "זו טענה: שתוצרי GenAI הם 'בולשיט' צריך להספיק לפחות כדי לצנן את ההתלהבות משילובם בהשכלה גבוהה."
  },

  "bullshit-p5-s1": {
    type: "evidence",
    feedbackCorrect: "נכון — ראיה: הקונצנזוס הרחב שמכונות אינן יכולות להיות סוכנים מוסריים, עם מקורות מרובים.",
    feedbackMissed: "זו ראיה: הקונצנזוס הרחב (Johnson, Hakli, Sparrow, Véliz) שמכונות אינן יכולות להיות סוכנים מוסריים — אינן יכולות להיות אחראיות."
  },

  "bullshit-p6-s1": {
    type: "claim",
    feedbackCorrect: "נכון — טענה מפתח: מתן עדות הוא עצמו פעולה שהפרט אחראי לה.",
    feedbackMissed: "טענה מפתח: מתן עדות (testimony) — כלומר, טענה על מצב עניינים — הוא עצמו סוג של פעולה שמחייבת אחריות."
  },

  "bullshit-p7-s1": {
    type: "claim",
    feedbackCorrect: "נכון — זו מסקנה לוגית: אם עדות דורשת אחריות, ומכונות אינן סוכנים מוסריים, אז מכונות לא יכולות לתת עדות.",
    feedbackMissed: "זו מסקנה לוגית: אם מתן עדות מחייב נטילת אחריות על ידי סוכן מוסרי, ומכונות אינן סוכנים מוסריים, נובע שמכונות לא יכולות לתת עדות."
  },

  "bullshit-p9-s1": {
    type: "claim",
    feedbackCorrect: "נכון — טענה: במקרה של GenAI הבעיה חמורה עוד יותר כי GenAI אפילו אינו סוכן שניתן להטיל עליו אחריות.",
    feedbackMissed: "טענה: GenAI אינו סוכן שניתן אפילו פוטנציאלית להטיל עליו אחריות — זה מה שהופך את הבעיה לחמורה יותר מבולשיט אנושי."
  },

  "bullshit-p9-s2": {
    type: "claim",
    feedbackCorrect: "נכון — טענה: כאן המחברים מציגים את המונח 'פער העדות' (testimony gap) — מושג מרכזי במאמר.",
    feedbackMissed: "זו טענה חשובה: המחברים מציגים את 'פער העדות' — הקושי לזהות את הסוכנים האנושיים שאחראים לפעילות המכונות."
  },

  /* ---- PERVERSE ---- */

  "perverse-p1-s1": {
    type: "claim",
    feedbackCorrect: "נכון — טענה: התגובה בספרות היא להעביר (outsource) את האחריות מ-GenAI לסטודנטים.",
    feedbackMissed: "זו טענה: המחברים מתארים את התגובה הרווחת — העברת האחריות מ-GenAI לסטודנטים — כמשהו שצריך לבקר."
  },

  "perverse-p2-s2": {
    type: "evidence",
    feedbackCorrect: "נכון — ראיה: דוגמה לגרסה הנאיבית עם הפניה ל-Mollick and Mollick 2023.",
    feedbackMissed: "זו ראיה: הדוגמה לגישה הנאיבית — סטודנטים אחראים לבדיקת שגיאות — עם מקור: Mollick and Mollick 2023."
  },

  "perverse-p3-s1": {
    type: "claim",
    feedbackCorrect: "נכון — טענה: התפיסה הזו מבינה באופן שגוי את תוצרי GenAI כ'דיווח על העולם'.",
    feedbackMissed: "זו טענה: הגישה הנאיבית שוגה כי היא מניחה ש-GenAI מדווח על העולם, בעוד שבאמת הוא בולשיטר."
  },

  "perverse-p3-s3": {
    type: "claim",
    feedbackCorrect: "נכון — טענה: 'הזיה' (hallucination) הוא מונח מטעה. המחברים מבקרים את השפה עצמה.",
    feedbackMissed: "טענה: 'הזיה' הוא מונח מטעה כי הוא נותן רושם ש-GenAI רוצה לדווח אמת אבל טועה — בעוד שהוא פשוט לא מעוניין באמת."
  },

  "perverse-p4-s1": {
    type: "claim",
    feedbackCorrect: "נכון — טענה: הטלת אחריות בלעדית על סטודנטים היא תוצאה סוטה, כי היא מחליפה יחסי אחריות הדדית.",
    feedbackMissed: "טענה: הטלת אחריות בלעדית על סטודנטים היא תוצאה 'סוטה' (perverse) — היא באה במקום יחסי אחריות הדדית אמיתיים."
  },

  "perverse-p5-s1": {
    type: "claim",
    feedbackCorrect: "נכון — הטענה הפותחת: לקרוא ל-GenAI 'שותף' זה שימוש מטעה במילה.",
    feedbackMissed: "טענה: לקרוא ל-GenAI 'שותף' מתעלם ממה ששיתוף פעולה באמת דורש — אחריות הדדית, סטנדרטים משותפים, פרויקט משותף."
  },

  "perverse-p5-s2": {
    type: "evidence",
    feedbackCorrect: "נכון — ראיה: מחקר על למידה שיתופית עם מקורות מרובים (Slavin, Hargreaves, Johnson).",
    feedbackMissed: "זו ראיה: מחקר משמעותי בהשכלה גבוהה מראה ששיתוף פעולה אמיתי דורש אחריות הדדית, משוב וניטור. שימו לב למקורות: Slavin 1983; Hargreaves 2007; Johnson et al. 2007."
  },

  "perverse-p5-s5": {
    type: "claim",
    feedbackCorrect: "נכון — טענה חדה: זה, במילה אחת, בולשיט.",
    feedbackMissed: "טענה: ההתלהבות ל-GenAI כ'שותף' היא, במילה אחת, בולשיט — אדישות הן למציאות GenAI והן לשיתוף פעולה אמיתי."
  },

  "perverse-p6-s2": {
    type: "claim",
    feedbackCorrect: "נכון — טענה: ביחס מורה-תלמיד תקין, האחריות היא דו-כיוונית.",
    feedbackMissed: "טענה: האחריות ביחס מורה-תלמיד היא דו-כיוונית — סטודנטים מחזיקים מורים לדין וחשבון וגם מורים נותנים משוב לסטודנטים."
  },

  "perverse-p6-s4": {
    type: "evidence",
    feedbackCorrect: "נכון — ראיה: מחקר על משוב אפקטיבי כתהליך דיאלוגי, עם מקורות (Carless 2016; Carless and Winstone 2023).",
    feedbackMissed: "זו ראיה: מחקר על משוב אפקטיבי כתהליך דיאלוגי ובונה במשותף, עם מקורות אקדמיים."
  },

  "perverse-p6-s5": {
    type: "claim",
    feedbackCorrect: "נכון — טענה: הכנסת GenAI כ'מורה' שוחקת את האחריות ההדדית שהופכת הוראה לאפקטיבית.",
    feedbackMissed: "טענה: הכנסת GenAI כ'מורה' מכניסה סוכן חסר אחריות למרחב ההוראה, ובכך שוחקת את האחריות ההדדית."
  },

  "perverse-p7-s3": {
    type: "hedging",
    feedbackCorrect: "נכון — 'however' מסמן שהמחברים מכירים ביתרונות של הגישה המתוחכמת לפני שהם מצביעים על מגבלותיה.",
    feedbackMissed: "שימו לב ל-'however' — המחברים מכירים שהגישה המתוחכמת היא ראויה לשבח (commendably), אבל מצביעים על מגבלה שלה. זו הסתייגות."
  },

  "perverse-p8-s5": {
    type: "hedging",
    feedbackCorrect: "נכון — 'it is plausible to suggest' היא שפת הסתייגות קלאסית: סביר להציע, לא ודאי.",
    feedbackMissed: "שימו לב ל-'it is plausible to suggest' — המחברים לא קובעים שזה יקרה, הם אומרים שזה סביר. זו הסתייגות."
  },

  "perverse-p9-s3": {
    type: "claim",
    feedbackCorrect: "נכון — טענה: GenAI אינו מסוגל להשקיע בסטודנטים באופן שגורם למעורבות.",
    feedbackMissed: "טענה: GenAI אינו מסוגל להשקיע בסטודנטים כמו מורה אנושי — וזה פוגע במעורבות."
  },

  "perverse-p9-s2": {
    type: "evidence",
    feedbackCorrect: "נכון — ראיה: מחקרים על מעורבות סטודנטים עם מקורות (Umbach and Wawrzynski 2005; Mearns et al. 2007; Bryson and Hand 2007).",
    feedbackMissed: "זו ראיה: מחקר מראה שמעורבות סטודנטים מושפעת מהתנהגות המורה — עם מקורות אקדמיים מרובים."
  },

  /* ---- CONCLUSION ---- */

  "conclusion-p1-s1": {
    type: "claim",
    feedbackCorrect: "נכון — הטענה המסכמת: GenAI אינו מסוגל מעצם טבעו לשמש כשותף או כמורה.",
    feedbackMissed: "הטענה המסכמת של המאמר: GenAI אינו מסוגל מעצם טבעו לשמש כשותף או כמורה ואסור לומר שהוא כן."
  },

  "conclusion-p1-s2": {
    type: "hedging",
    feedbackCorrect: "נכון — 'To be clear' ו-'neither possible nor desirable' — המחברים מסייגים: הם לא בעד איסור מוחלט.",
    feedbackMissed: "המחברים עוצרים כדי למנוע פרשנות קיצונית: הם לא טוענים לאיסור מוחלט. 'To be clear' היא שפת הסתייגות — סימן שהם מודעים שאפשר להבין אותם אחרת."
  }
};


/* ==========================================================
   QUIZ QUESTIONS
   ========================================================== */

const quizQuestions = [
  {
    id: "quiz-1",
    type: "multiple_choice",
    text: "מה ההבדל בין שקר לבולשיט לפי פרנקפורט?",
    options: [
      { id: "a", text: "שקרן אומר דברים לא נכונים, בולשיטר אומר דברים שהם גם נכונים וגם לא נכונים" },
      { id: "b", text: "שקרן מתייחס לאמת כדי לעוות אותה, בולשיטר לא מתעניין באמת כלל" },
      { id: "c", text: "שקר מכוון ובולשיט הוא תמיד לא מודע" },
      { id: "d", text: "אין הבדל — שניהם צורות של הונאה" }
    ],
    correctId: "b"
  },
  {
    id: "quiz-2",
    type: "true_false_justify",
    text: "המחברים טוענים שיש לאסור לחלוטין את השימוש ב-GenAI בהשכלה הגבוהה.",
    correctAnswer: false,
    justificationHint: "חפשו בפסקת הסיכום — מה בדיוק הם אומרים שהם לא עושים?"
  },
  {
    id: "quiz-3",
    type: "multiple_choice",
    text: "מהו 'פער העדות' (testimony gap) שהמחברים מתארים?",
    options: [
      { id: "a", text: "ה-AI לא יודע מספיק מידע כדי להעיד בבית משפט" },
      { id: "b", text: "אי אפשר לזהות מי האדם שאחראי לדברים שה-AI מפיק" },
      { id: "c", text: "סטודנטים לא יכולים להעיד על מה שלמדו מה-AI" },
      { id: "d", text: "יש פער בין מה שה-AI אומר לבין מה שהוא יודע" }
    ],
    correctId: "b"
  }
];
