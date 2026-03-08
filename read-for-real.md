📖 Socratic Reading Companion: Open Source Generatorערכה זו מאפשרת לכל מרצה או איש חינוך לקחת מאמר אקדמי קיים, ולהפוך אותו לאפליקציית קריאה אינטראקטיבית המבוססת על חיכוך יזום (Friction by Design) וקריאה סוקרטית.איך להשתמש בערכה זו?פתחו מודל AI חזק (מומלץ Claude 3.5 Sonnet או Gemini 1.5 Pro).העלו את קובץ ה-PDF של המאמר שלכם.העתיקו והדביקו את הפרומפט המרכזי (מופיע למטה).ה-AI ייצר עבורכם קובץ React עובד עם המאמר שלכם, מוכן להרצה.🤖 הפרומפט המרכזי ל-AI (העתיקו מכאן)העתק/הדבק את הטקסט הבא לתוך ה-AI יחד עם המאמר שלך:You are an expert pedagogical designer and expert React developer. I am providing you with an academic article. I want to build a "Socratic Reading Companion" web app for this article. 

This app forces "Slow Reading" by disabling copy/paste, presenting the text in manageable chunks, offering inline Hebrew translations, and interrupting the user with deep, Socratic questions that they must answer manually (minimum 50 characters).

### STEP 1: Content Extraction & Pedagogical Design
Analyze the provided text and extract 3-5 key sections (about 5-10 paragraphs in total for a prototype). For this text, you must generate:
1.  **Paragraphs:** The original English text, broken down by paragraph.
2.  **Translations:** A high-quality Hebrew translation for EACH paragraph.
3.  **Concepts:** Identify 2-3 key academic concepts in the text and write a short Hebrew definition for them.
4.  **Socratic Questions:** Write 3 deep, thought-provoking questions in Hebrew. 
    * *Rules for Questions:* Do NOT ask factual questions ("What did the author say?"). Ask Socratic, connective questions ("How does this concept reflect in your daily life?", "Why do you think the author chose this specific word?"). Include a short "Hint" (רמז) for each.
5.  **Quiz:** Generate one multiple-choice summary question in Hebrew for the end of the reading.

### STEP 2: Code Generation
Below is the master React template. You must output a SINGLE `app.jsx` file. 
Keep all the CSS, logic, and SVG components exactly as they are. 
YOUR ONLY JOB is to replace the data inside the `articleData`, `conceptMap`, `questionMap`, and the `PrimerScreen`/`QuizScreen`/`ReportScreen` components with the specific content you generated in Step 1.

Make sure the aesthetic remains "Underground Library" (warm parchment, dark bark text, serif English, Heebo Hebrew, completely SVG-driven, no emojis).

[INSERT THE REACT TEMPLATE PROVIDED IN THE SECTION BELOW THIS PROMPT]
🛠️ תבנית הקוד (React Template)הוסיפו את הקוד הבא לסוף הפרומפט שלכם בתוך ה-AI:import React, { useState, useEffect, useRef } from 'react';

// --- CUSTOM STYLES & FONTS ---
const styles = `
@import url('[https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap](https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap)');

:root {
  --bg-parchment: #f5f2ea;
  --surface-cream: #faf8f4;
  --surface-active: #f0ede6;
  --text-primary: #3d3529;
  --text-secondary: #5a4f40;
  --text-muted: #8a7d6b;
  --accent-growth: #6b7c5b;
  --accent-depth: #5b6b7c;
  --accent-thought: #7c5b6b;
  --border-tan: #ddd8cc;
  --error-rust: #8c5c4a;
}

body {
  background-color: var(--bg-parchment);
  color: var(--text-primary);
  font-family: 'Heebo', sans-serif;
  -webkit-font-smoothing: antialiased;
  direction: rtl;
  margin: 0;
}

.heading-font {
  font-family: 'Heebo', sans-serif;
}

.fade-in {
  animation: fadeIn 0.4s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.app-header {
  background-color: var(--text-primary);
  color: #f0ede6;
}

.app-header-texture {
  background-image: radial-gradient(#f0ede6 1px, transparent 1px);
  background-size: 12px 12px;
  opacity: 0.035;
}

.paragraph-en {
  font-family: 'Heebo', sans-serif;
  direction: ltr;
  text-align: left;
  font-size: 16px;
  line-height: 1.85;
  color: var(--text-primary);
  margin-bottom: 8px;
  position: relative;
}

.translation-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 0;
  margin-bottom: 24px;
  transition: color 0.2s ease;
}

.translation-toggle:hover {
  color: var(--text-primary);
}

.translation-panel {
  direction: rtl;
  background: var(--bg-parchment);
  border-right: 2px solid var(--border-tan);
  border-radius: 0 4px 4px 0;
  padding: 12px 18px;
  margin: 0 0 24px 24px;
  font-size: 15px;
  line-height: 1.85;
  color: var(--text-secondary);
  user-select: none;
}

.concept-card {
  background: var(--surface-active);
  border: 1px solid var(--border-tan);
  border-radius: 4px;
  margin: 24px 0;
  transition: all 0.25s ease;
  overflow: hidden;
}

.socratic-question-block {
  background: var(--surface-cream);
  border: 1px solid var(--border-tan);
  border-right-width: 4px;
  border-radius: 4px;
  padding: 24px 20px 20px;
  margin: 0 0 40px 0;
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

.socratic-icon-wrapper {
  position: absolute;
  top: -14px;
  right: 16px;
  background: var(--bg-parchment);
  padding: 0 6px;
}

.protected-textarea {
  border: 1px solid #d4cdbf;
  border-radius: 4px;
  padding: 14px;
  font-family: 'Heebo', sans-serif;
  font-size: 15px;
  line-height: 1.75;
  direction: rtl;
  background: #fffefa;
  color: var(--text-primary);
  min-height: 120px;
  width: 100%;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s ease;
}

.protected-textarea:focus {
  border-color: var(--focus-color, var(--accent-growth));
}

.friction-banner {
  background: var(--surface-active);
  border: 1px solid var(--border-tan);
  border-radius: 4px;
  padding: 12px 18px;
  font-size: 13.5px;
  color: var(--text-secondary);
  text-align: right;
  margin-bottom: 16px;
}

.shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
  border-color: var(--error-rust);
  color: var(--error-rust);
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
  40%, 60% { transform: translate3d(3px, 0, 0); }
}

.quiz-option {
  border: 1px solid var(--border-tan);
  background: var(--surface-cream);
  border-radius: 4px;
  padding: 14px 18px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.quiz-option:hover { background: var(--surface-active); }
.quiz-option.selected {
  background: rgba(107, 124, 91, 0.12);
  border-color: var(--accent-growth);
}
`;

// --- SVG ASSETS ---
const LogoMark = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
    <path d="M20 70 L50 80 L80 70 L80 30 L50 40 L20 30 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
    <path d="M50 80 L50 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="30" cy="20" r="4" fill="currentColor"/>
    <circle cx="50" cy="15" r="5" fill="currentColor"/>
    <circle cx="70" cy="25" r="3.5" fill="currentColor"/>
    <path d="M50 40 L30 20 M50 40 L50 15 M50 40 L70 25 M30 20 L50 15 L70 25" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3"/>
  </svg>
);
const SectionDivider = () => (
  <div className="flex justify-center my-14 opacity-40">
    <svg width="100%" height="12" viewBox="0 0 300 12" preserveAspectRatio="none">
      <path d="M0 6 L 300 6" fill="none" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="4 4" />
      <rect x="148" y="4" width="4" height="4" fill="var(--text-muted)"/>
      <rect x="73" y="4.5" width="3" height="3" fill="var(--text-muted)"/>
      <rect x="223" y="4.5" width="3" height="3" fill="var(--text-muted)"/>
    </svg>
  </div>
);
const QuestionConnector = () => (
  <div className="mr-[28px] -mb-1 mt-1 opacity-50 relative z-0">
    <svg width="8" height="40" viewBox="0 0 8 40" fill="none" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
      <path d="M4 0 L4 40" stroke="var(--border-tan)" strokeWidth="2" strokeDasharray="3 3" fill="none" />
      <rect x="2.5" y="18.5" width="3" height="3" fill="var(--border-tan)" />
    </svg>
  </div>
);
const WelcomeIllustration = () => (
  <svg viewBox="0 0 800 240" className="w-full h-auto block" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
    <rect width="800" height="240" fill="var(--bg-parchment)"/>
    <path d="M0 120 L 800 120" stroke="var(--border-tan)" strokeWidth="1" strokeDasharray="10 5" />
    <g stroke="var(--text-muted)" strokeWidth="6" strokeLinecap="round" opacity="0.4">
       <line x1="150" y1="160" x2="250" y2="160" />
       <line x1="150" y1="180" x2="300" y2="180" />
       <line x1="150" y1="200" x2="220" y2="200" />
       <line x1="500" y1="160" x2="650" y2="160" />
       <line x1="500" y1="180" x2="580" y2="180" />
    </g>
    <g stroke="var(--text-primary)" strokeWidth="1.5" fill="none" opacity="0.6">
       <path d="M 220 70 L 350 40 L 450 90 L 580 50" />
       <path d="M 350 40 L 400 130 L 500 180" />
       <path d="M 220 70 L 250 170" />
    </g>
    <g fill="var(--surface-cream)" stroke="var(--accent-growth)" strokeWidth="3">
       <circle cx="220" cy="70" r="8" />
       <circle cx="450" cy="90" r="10" />
    </g>
    <g fill="var(--surface-cream)" stroke="var(--accent-depth)" strokeWidth="3">
       <circle cx="350" cy="40" r="6" />
       <circle cx="580" cy="50" r="7" />
       <circle cx="400" cy="130" r="5" />
    </g>
  </svg>
);
const KeyIcon = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"></circle><path d="M11.5 11.5L21 2v4l-2 2l2 2l-2 2l-1.5-1.5"></path></svg>);
const RefreshIcon = () => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>);
const HintIcon = () => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
const FrictionIcon = () => (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /><path d="M15 5l4 4" /><path d="M3 21 Q 5 24, 8 23 T 12 24" strokeWidth="1" /></svg>);
const CheckIcon = ({ size = 16, color = "currentColor" }) => (<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>);
const EyeIcon = ({ size = 20, color = "currentColor" }) => (<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const FocusIcon = ({ size = 20, color = "currentColor" }) => (<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line></svg>);
const IconPhase1 = ({ size = 26, color = "currentColor" }) => (<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><circle cx="11" cy="11" r="0.75" fill={color} stroke="none"/><circle cx="8" cy="9" r="1.25" fill={color} stroke="none"/></svg>);
const IconPhase2 = ({ size = 26, color = "currentColor" }) => (<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14 L8 14 C10 14, 11 13, 12 12 L14 10" /><path d="M21 10 L16 10 C14 10, 13 11, 12 12 L10 14" /><circle cx="12" cy="10" r="2" fill={color} stroke="none" /></svg>);
const IconPhase3 = ({ size = 26, color = "currentColor" }) => (<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 15 V11" /><path d="M15 18 C17 16, 19 14, 19 10 C19 6, 16 3, 12 3 C8 3, 5 6, 5 10 C5 14, 7 16, 9 18" /></svg>);

// ==========================================
// AI INSTRUCTION: POPULATE THIS DATA OBJECT
// ==========================================
const articleData = {
  // AI: Replace with the actual sections, paragraphs, and Hebrew translations from the user's text.
  sections: [
    {
      id: "section-1",
      titleHebrew: "[AI_GENERATED_SECTION_TITLE]",
      titleEnglish: "[AI_GENERATED_ENGLISH_TITLE]",
      pages: "1-2",
      paragraphs: [
        {
          id: "p-1",
          text: "[ORIGINAL_ENGLISH_PARAGRAPH]",
          translationHe: "[HEBREW_TRANSLATION]"
        }
      ]
    }
  ]
};

const conceptMap = {
  // AI: Replace with concepts extracted from the text. Map them to a specific paragraph ID.
  "p-1": {
    term: "[HEBREW_TERM] — [ENGLISH_TERM]",
    def: "[HEBREW_DEFINITION]"
  }
};

const questionMap = {
  // AI: Replace with Socratic questions mapped to specific paragraph IDs.
  "p-1": {
    id: "q1",
    phase: 1, 
    text: "[SOCRATIC_QUESTION_HEBREW]",
    hint: "[HINT_HEBREW]"
  }
};

// --- COMPONENTS ---

const ConceptCard = ({ term, def }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="concept-card cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-center gap-3 p-4">
        <span className="text-[var(--accent-depth)]"><KeyIcon /></span>
        <span className="font-bold text-[var(--text-primary)]">{term}</span>
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-1 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-tan)] mt-1">
          {def}
        </div>
      )}
    </div>
  );
};

const SocraticQuestion = ({ question, answer, setAnswer, isFirst }) => {
  const [shake, setShake] = useState(false);
  const handlePaste = (e) => {
    e.preventDefault();
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const getPhaseStyles = (phase) => {
    switch(phase) {
      case 1: return { color: 'var(--accent-growth)', icon: <IconPhase1 size={20} color="var(--accent-growth)"/> };
      case 2: return { color: 'var(--accent-depth)', icon: <IconPhase2 size={20} color="var(--accent-depth)"/> };
      case 3: return { color: 'var(--accent-thought)', icon: <IconPhase3 size={20} color="var(--accent-thought)"/> };
      default: return { color: 'var(--accent-growth)', icon: <IconPhase1 size={20}/> };
    }
  };

  const pStyle = getPhaseStyles(question.phase);
  const minChars = 50;
  const isEnough = answer.length >= minChars;

  return (
    <>
      <QuestionConnector />
      <div className="socratic-question-block" style={{ borderRightColor: pStyle.color }}>
        <div className="socratic-icon-wrapper" style={{ color: pStyle.color }}>{pStyle.icon}</div>
        {isFirst && (
          <div className={`friction-banner flex items-start gap-3 ${shake ? 'shake' : ''}`}>
            <FrictionIcon />
            <span className="flex-1 leading-snug">
               <strong>כתיבה ידנית בלבד.</strong> החיכוך הוא חלק מתהליך הלמידה, לכן לא ניתן להדביק טקסט.
            </span>
          </div>
        )}
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)] heading-font">שאלה למחשבה:</h3>
          <p className="text-[var(--text-primary)] leading-relaxed mb-3">{question.text}</p>
          <div className="flex items-start gap-2 bg-[var(--bg-parchment)] p-3 rounded text-sm text-[var(--text-secondary)] border border-[var(--border-tan)]">
             <span className="text-[var(--text-muted)] mt-0.5"><HintIcon /></span>
             <span><strong>רמז:</strong> {question.hint}</span>
          </div>
        </div>
        <textarea
           value={answer}
           onChange={e => setAnswer(question.id, e.target.value)}
           onPaste={handlePaste}
           placeholder="נסחו את מחשבותיכם כאן..."
           className="protected-textarea"
           style={{ '--focus-color': pStyle.color }}
           spellCheck="false"
        />
        <div className="flex justify-between items-center mt-3 px-1">
           <span className={`text-[12px] font-medium transition-colors ${isEnough ? 'text-[var(--accent-growth)]' : 'text-[var(--text-muted)]'}`}>
             {answer.length}/{minChars} תווים
           </span>
           {isEnough && <span className="text-[12px] text-[var(--accent-growth)] font-bold fade-in flex items-center gap-1"><CheckIcon size={14}/> נשמר</span>}
        </div>
      </div>
    </>
  );
};

const ArticleParagraph = ({ p, translationEnabled, toggleTranslation }) => (
  <div className="mb-6 relative">
    <div className="paragraph-en">{p.text}</div>
    <button onClick={toggleTranslation} className="translation-toggle">
       <RefreshIcon /> {translationEnabled ? "הסתר תרגום" : "הצג תרגום"}
    </button>
    {translationEnabled && (
       <div className="translation-panel fade-in">{p.translationHe}</div>
    )}
  </div>
);

// --- SCREENS ---

const WelcomeScreen = ({ onNext }) => (
  <div className="fade-in flex flex-col items-center py-6">
    <div className="w-full max-w-xl mb-10 rounded overflow-hidden border border-[var(--border-tan)] bg-[var(--surface-cream)] shadow-sm">
      <WelcomeIllustration />
    </div>
    <div className="text-center mb-10">
      <h2 className="heading-font text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">קריאה איטית, צמיחה עמוקה</h2>
      <p className="text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed text-[16px]">
        פלטפורמה המעוצבת לקריאה סוקרטית. בעולם של סיכומים מהירים ואפליקציות שקוראות בשבילנו, המטרה כאן היא להחזיר את תשומת הלב לטקסט.
      </p>
    </div>
    <div className="w-full max-w-lg space-y-4 mb-12">
      <div className="flex gap-4 items-start p-4 rounded bg-[var(--surface-cream)] border border-[var(--border-tan)]">
        <div className="text-[var(--accent-depth)] mt-1"><EyeIcon /></div>
        <div>
          <h3 className="font-bold text-[var(--text-primary)] mb-1">קריאה אקטיבית</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">הקריאה אינה רציפה. לאורך הטקסט ישולבו שאלות פתוחות שידרשו מכם להשהות את הרצף ולחשוב על מה שקראתם.</p>
        </div>
      </div>
      <div className="flex gap-4 items-start p-4 rounded bg-[var(--surface-cream)] border border-[var(--border-tan)]">
        <div className="text-[var(--accent-thought)] mt-1"><FrictionIcon /></div>
        <div>
          <h3 className="font-bold text-[var(--text-primary)] mb-1">חיכוך יזום כמנגנון למידה</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">הממשק מונע העתקה והדבקה (Copy-Paste) מתוך כוונה. המאמץ הכרוך בניסוח מחשבות במילים שלכם הוא עצם תהליך הלמידה.</p>
        </div>
      </div>
      <div className="flex gap-4 items-start p-4 rounded bg-[var(--surface-cream)] border border-[var(--border-tan)]">
        <div className="text-[var(--accent-growth)] mt-1"><FocusIcon /></div>
        <div>
          <h3 className="font-bold text-[var(--text-primary)] mb-1">סביבה חפה מהסחות דעת</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">המערכת מעוצבת באופן מינימליסטי, שמה את הטקסט במרכז, ומספקת תרגום מקומי בדיוק ברגע שבו הוא נדרש.</p>
        </div>
      </div>
    </div>
    <button onClick={onNext} className="bg-[var(--text-primary)] hover:bg-[#2a241c] text-[#f5f2ea] px-8 py-3.5 rounded font-medium transition-all transform hover:scale-[1.02] shadow-sm flex items-center gap-2">
      <span>המשך למבוא המאמר</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  </div>
);

// AI INSTRUCTION: UPDATE PRIMER CONTENT BASED ON ARTICLE
const PrimerScreen = ({ onStart }) => (
  <div className="fade-in flex flex-col items-center py-10 max-w-2xl mx-auto">
    <div className="w-full bg-[var(--surface-cream)] border border-[var(--border-tan)] rounded p-8 sm:p-12 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-2 h-full bg-[var(--accent-depth)] opacity-80"></div>
      <div className="mb-8 border-b border-[var(--border-tan)] pb-8">
        <div className="text-xs font-bold tracking-wider text-[var(--text-muted)] uppercase mb-3">מבוא לקריאה</div>
        <h2 className="heading-font text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2 ltr text-left" dir="ltr">
          [AI_INSERT_ARTICLE_TITLE]
        </h2>
        <div className="flex gap-3 text-sm text-[var(--text-secondary)] mt-4 items-center">
          <span className="font-bold">מאת:</span><span>[AI_INSERT_AUTHOR_NAME]</span>
        </div>
      </div>
      <div className="space-y-5 text-[15px] text-[var(--text-primary)] leading-relaxed">
        <p>[AI_INSERT_1_PARAGRAPH_SUMMARY_IN_HEBREW]</p>
        <div className="my-8 p-6 bg-[var(--surface-active)] rounded border-r-4 border-[var(--accent-growth)]">
          <h4 className="font-bold text-[var(--accent-growth)] mb-2 flex items-center gap-2"><EyeIcon size={16}/> הנחיה לקריאה:</h4>
          <p className="text-sm">קראו את הטקסט לאט. שימו לב במיוחד לאופן שבו הממשק מעודד חשיבה סוקרטית.</p>
        </div>
      </div>
      <div className="mt-10 flex justify-end">
        <button onClick={onStart} className="bg-[var(--accent-growth)] hover:bg-[#5a6b4a] text-[#f5f2ea] px-8 py-3.5 rounded font-medium transition-all transform hover:scale-[1.02] shadow-sm flex items-center gap-2">
          <span>התחילו לקרוא</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </div>
);

// AI INSTRUCTION: UPDATE QUIZ BASED ON ARTICLE
const QuizScreen = ({ onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  // AI: Replace with a real question and answers based on text. ID 2 should be correct.
  return (
    <div className="fade-in max-w-2xl mx-auto py-8">
      <div className="text-center mb-10">
        <h2 className="heading-font text-3xl font-bold text-[var(--text-primary)] mb-2">מבחן קצר לסיום</h2>
      </div>
      <div className="bg-[var(--surface-cream)] border border-[var(--border-tan)] rounded p-6 sm:p-8">
         <p className="text-lg mb-6 font-medium text-[var(--text-primary)]">[AI_INSERT_FINAL_MULTIPLE_CHOICE_QUESTION]</p>
         <div className="space-y-3">
            {[
              { id: 1, text: "[WRONG_ANSWER_1]" },
              { id: 2, text: "[CORRECT_ANSWER]" },
              { id: 3, text: "[WRONG_ANSWER_2]" }
            ].map(opt => (
              <div key={opt.id} onClick={() => !submitted && setSelected(opt.id)} className={`quiz-option ${selected === opt.id ? 'selected' : ''} ${submitted && opt.id === 2 ? '!bg-[var(--accent-growth)]/15 !border-[var(--accent-growth)]' : ''}`}>
                {opt.text}
              </div>
            ))}
         </div>
         {submitted && (<div className="mt-6 text-[var(--accent-growth)] font-medium flex items-center gap-2"><CheckIcon size={18}/> תשובה נכונה. תודה!</div>)}
         <div className="mt-8 text-left">
           <button onClick={() => { if (!submitted) setSubmitted(true); else onComplete(); }} disabled={!selected} className="bg-[var(--text-primary)] text-[#f5f2ea] px-7 py-2.5 rounded font-medium disabled:opacity-50">
             {submitted ? "צפה בדו״ח סיום" : "הגש תשובה"}
           </button>
         </div>
      </div>
    </div>
  );
};

// AI INSTRUCTION: UPDATE REPORT SCREEN TITLE/AUTHOR
const ReportScreen = ({ answers }) => (
  <div className="fade-in max-w-2xl mx-auto py-8">
    <div className="bg-[var(--surface-cream)] p-8 sm:p-10 rounded border border-[var(--border-tan)] shadow-sm">
      <div className="flex flex-col items-center mb-8 pb-8 border-b border-[var(--border-tan)]">
        <LogoMark className="w-14 h-14 text-[var(--text-primary)] mb-4" />
        <h2 className="heading-font text-3xl font-bold text-[var(--text-primary)] mb-2">סיכום קריאה מודרכת</h2>
        <div className="flex gap-3 text-[14px] text-[var(--text-muted)] italic mt-2">
          <span>[AI_INSERT_AUTHOR_NAME]</span><span>•</span><span>[AI_INSERT_ARTICLE_TITLE]</span>
        </div>
      </div>
      <div className="space-y-10">
        {Object.entries(answers).map(([qId, ans], index) => {
          const q = Object.values(questionMap).find(q => q.id === qId);
          if (!q) return null;
          return (
            <div key={qId} className="relative">
               <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 pr-4">{q.text}</h3>
               <p className="pr-4 text-[var(--text-secondary)] leading-relaxed bg-[var(--surface-active)] p-4 rounded mt-3">
                 {ans || <span className="text-[var(--text-muted)] italic">לא נענה</span>}
               </p>
            </div>
          )
        })}
      </div>
    </div>
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [currentView, setCurrentView] = useState('welcome'); // welcome | primer | reading | quiz | report
  const [translations, setTranslations] = useState({});
  const [answers, setAnswers] = useState({});
  
  const toggleTranslation = (pId) => setTranslations(prev => ({ ...prev, [pId]: !prev[pId] }));
  const setAnswer = (qId, text) => setAnswers(prev => ({ ...prev, [qId]: text }));

  const allQuestionsAnswered = Object.values(questionMap).every(q => (answers[q.id]?.length || 0) >= 50);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="max-w-[720px] mx-auto min-h-screen bg-[var(--bg-parchment)] shadow-2xl shadow-black/5 flex flex-col relative">
        <header className="app-header relative overflow-hidden flex items-center justify-between px-6 py-6 shrink-0">
          <div className="absolute inset-0 app-header-texture"></div>
          <div className="relative z-10 flex items-center gap-4 w-full">
            <LogoMark className="w-10 h-10 text-[var(--surface-cream)] shrink-0" />
            <div className="flex flex-col gap-0.5">
              <h1 className="heading-font text-[22px] font-bold m-0 leading-none">קוראים אחרת</h1>
              <span className="text-[12px] font-light opacity-85">Socratic Reading Companion</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 px-4 sm:px-8 py-6 pb-24">
          {currentView === 'welcome' && <WelcomeScreen onNext={() => setCurrentView('primer')} />}
          {currentView === 'primer' && <PrimerScreen onStart={() => setCurrentView('reading')} />}
          
          {currentView === 'reading' && (
            <div className="fade-in article-reader mt-4">
              {articleData.sections.map((section, sIdx) => (
                <div key={section.id} className="mb-16">
                  <div className="mb-10 text-center">
                    <h2 className="heading-font text-2xl font-bold text-[var(--text-primary)]">{section.titleHebrew}</h2>
                    <div className="italic text-[var(--text-muted)] text-sm mt-1">
                      {section.titleEnglish} <span className="mx-2 opacity-50">•</span> P. {section.pages}
                    </div>
                  </div>

                  {section.paragraphs.map(p => (
                    <div key={p.id}>
                      <ArticleParagraph p={p} translationEnabled={translations[p.id]} toggleTranslation={() => toggleTranslation(p.id)} />
                      {conceptMap[p.id] && <ConceptCard term={conceptMap[p.id].term} def={conceptMap[p.id].def} />}
                      {questionMap[p.id] && (
                        <SocraticQuestion 
                          question={questionMap[p.id]} 
                          answer={answers[questionMap[p.id].id] || ''}
                          setAnswer={setAnswer}
                          isFirst={Object.keys(questionMap)[0] === p.id}
                        />
                      )}
                    </div>
                  ))}
                  {sIdx < articleData.sections.length - 1 && <SectionDivider />}
                </div>
              ))}
              <div className="mt-16 text-center border-t border-[var(--border-tan)] pt-12">
                 <button 
                   onClick={() => setCurrentView('quiz')}
                   disabled={!allQuestionsAnswered}
                   className="bg-[var(--accent-depth)] text-[#f5f2ea] px-8 py-3.5 rounded font-medium transition-opacity disabled:opacity-50"
                 >
                   {allQuestionsAnswered ? "המשך למבחן הסיום" : "ענו על כל השאלות כדי להמשיך"}
                 </button>
              </div>
            </div>
          )}
          {currentView === 'quiz' && <QuizScreen onComplete={() => setCurrentView('report')} />}
          {currentView === 'report' && <ReportScreen answers={answers} />}
        </main>
      </div>
    </>
  );
}

## Moodle Embed Instructions (add to final output)
When you provide deployment instructions, include this exact snippet:

```html
<div style="max-width:1200px;margin:0 auto;">
  <iframe
    src="https://YOUR-APP-URL.netlify.app"
    width="100%"
    height="900"
    style="border:1px solid #ddd;border-radius:12px;background:#fff;"
    loading="lazy"
    allowfullscreen
  ></iframe>

  <p style="margin-top:10px;">
    Trouble loading?
    <a href="https://YOUR-APP-URL.netlify.app" target="_blank" rel="noopener noreferrer">
      Open in a new tab
    </a>.
  </p>
</div>
```

Also note in the output:
- Moodle must allow external iframe embeds.
- Hosting must allow framing (`X-Frame-Options` / CSP `frame-ancestors`).
