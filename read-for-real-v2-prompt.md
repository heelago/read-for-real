# Read for Real v2 - Generator Prompt
## Socratic Reading Companion with Sentence Tagging, Self-Check, Quiz, and Review Mode

Copy the entire prompt below into Claude, ChatGPT, Gemini, or Codex. Upload your article PDF alongside it.

---

## THE PROMPT (copy from here)

You are an expert pedagogical designer and front-end developer specializing in academic reading tools for higher education.

I am providing you with an academic article. Build a "Read for Real" Socratic Reading Companion web app for this article.

This tool is a pilot that other instructors should be able to adapt for their own articles. The output should therefore be:

- easy to edit
- easy to deploy in Moodle
- easy for another instructor to adapt by replacing content, not rewriting the app
- understandable without a build-heavy setup

Preferred output:
- a static app made of `index.html`, `app.js`, and `styles.css`
- plus a data file such as `_article_data.js`
- plus a short README or handoff note explaining what an instructor would edit for a new article

Acceptable fallback:
- a single self-contained HTML file with inline CSS/JS

Do NOT default to a multi-file React/Vite project unless explicitly asked. This pilot should be portable and easy for non-specialists to reuse.

The app combines four kinds of engagement:

1. **Sentence-level tagging** - students tag sentences as Claim (`טענה`), Evidence (`ראיה`), or Hedging (`הסתייגות`)
2. **Section self-check** - after tagging, students check their choices and see inline explanations
3. **Socratic writing** - short open-ended questions between sections
4. **Quiz** - a short conceptual quiz at the end

The app must also include:
- a combined report screen
- downloadable RTL report HTML
- a non-editable review mode that returns students to the article with explanations

---

### STEP 1: Content Analysis

Analyze the article and produce:

**A. Sections (3-6).** Break the article into logical argumentative sections. For each section provide:
- `id`: short kebab-case identifier
- `titleHe`: Hebrew section title
- `titleEn`: English section title

**B. Paragraphs.** For each section, include all paragraphs. For each paragraph:
- `id`: unique identifier
- `translationHe`: full Hebrew translation of the paragraph
- preserve rhetorical tone and philosophical precision
- translate fully, do not summarize

**C. Sentences.** Split each paragraph into individual sentences. For each sentence:
- `id`: unique identifier
- `text`: exact sentence text in the original language

**D. Tag Key.** For each sentence that carries argumentative weight, create an entry:
- `type`: `"claim"`, `"evidence"`, or `"hedging"`
- `fb`: a 1-2 sentence Hebrew explanation of why this sentence belongs in that category

Rules for the tag key:
- Not every sentence belongs in the key
- Background, transitions, framing, and many rhetorical questions should stay untagged
- AI usually over-tags. Be selective.
- Aim for argumentatively meaningful sentences, not just any sentence with a citation

Category definitions:
- **Claim (`טענה`)**: the author's position, argument, conclusion, or sub-claim
- **Evidence (`ראיה`)**: examples, citations, quotations, empirical observations, case material, or explanatory support
- **Hedging (`הסתייגות`)**: qualifications, limits, caveats, concessions, partial formulations

**E. Socratic Questions.** One question per section, in Hebrew:
- ask what the text makes the student think, not what the author said
- connect the article to lived experience, course themes, local context, or a difficult comparison
- include a `hint`
- include `minChars: 50`
- questions should feel specific, surprising, and pedagogically meaningful

**F. Quiz (3-5 questions).**
- mix multiple choice and true/false
- test conceptual understanding, not trivia
- include at least one question whose answer depends on careful reading
- include at least one `true_false_justify` question with a short justification hint

---

### STEP 2: Data Structure

Generate article data in a structure like:

```js
const articleData = {
  meta: {
    title: "...",
    titleHe: "...",
    author: "...",
    year: 2025,
    source: "...",
    doi: "..."
  },
  sections: [
    {
      id: "intro",
      titleHe: "...",
      titleEn: "...",
      paragraphs: [
        {
          id: "intro-p1",
          translationHe: "...",
          sentences: [
            { id: "intro-p1-s1", text: "..." }
          ]
        }
      ],
      socraticQuestion: {
        id: "sq-intro",
        text: "...",
        hint: "...",
        minChars: 50
      }
    }
  ]
};

const tagKey = {
  "intro-p1-s2": {
    type: "claim",
    fb: "..."
  }
};

const quizQuestions = [
  {
    id: "quiz-1",
    type: "multiple_choice",
    text: "...",
    options: [
      { id: "a", text: "..." },
      { id: "b", text: "..." }
    ],
    correctId: "b"
  },
  {
    id: "quiz-2",
    type: "true_false_justify",
    text: "...",
    correctAnswer: false,
    justificationHint: "..."
  }
];
```

Important:
- use `fb` as the explanation field in the tag key
- keep IDs stable and human-readable
- ensure every `tagKey` sentence ID exists in the article
- structure the content so that an instructor can usually adapt the pilot by editing the data file rather than the rendering logic

---

### STEP 3: Interaction and Pedagogy Requirements

#### Overall flow

`welcome -> instructions -> section reading -> self-check -> Socratic question -> next section -> quiz -> report -> review mode`

#### Welcome screen

The welcome screen must clearly explain the pedagogy:
- students first mark how the argument works
- then they self-check with explanations
- then they write
- then they take a short quiz
- then they receive a combined report and can return to the article in review mode

It should make clear that the goal is not just understanding the topic, but understanding how academic argument works from the inside.

#### Sentence tagging

- each sentence appears as a clickable unit inside a paragraph
- article paragraphs are LTR if the article is English
- clicking a sentence opens a small explicit picker/menu
- picker includes:
  - `טענה`
  - `ראיה`
  - `הסתייגות`
  - `הסר`
- do not use cycle-click as the default interaction
- clicking outside closes the picker
- chosen tags should be visibly styled with color + subtle inline label

#### Self-check per section

- each section has a `בדקו תשובות` button at the bottom
- it becomes enabled only after the student has tagged at least one sentence in each category that actually appears in that section’s key
- important: if a section has no hedging in the key, do not require hedging for unlock
- clicking self-check:
  - locks that section’s tags
  - shows inline feedback
  - reveals missed key sentences with dashed styling

Feedback states:
- **correct**: green confirmation + `fb`
- **wrong category**: "סימנתם כ[X], אבל זו בעצם [Y]" + `fb`
- **missed**: dashed expected-color sentence + `fb`
- **extra**: grey note indicating background/context, no penalty

#### Socratic question screen

- appears after self-check, not before
- include a `חזרה לטקסט` button so students can reread the checked section
- textarea must block paste/copy/cut/drop
- show character counter
- require minimum length before submission
- first question should show a friction banner

#### Quiz

- appears after all sections
- multiple choice questions require an answer
- `true_false_justify` questions require:
  - a true/false choice
  - a short typed justification before the student can proceed
- quiz is part of the core experience, not optional garnish

#### Report

The report must include:
- tagging score overall
- per-category breakdown
- Socratic answers
- quiz score
- question-by-question quiz review
- reading time / translation usage if tracked
- an auto-generated Hebrew tip based on weakest category
- button: `חזרו למאמר עם הסברים`
- button: download report

#### Review mode

After the report, students can return to the article in non-editable review mode:
- correctly tagged sentences: solid expected styling
- missed sentences: dashed expected styling
- wrong-category sentences: show student choice crossed out and expected type below
- sentences not in the key: muted / non-clickable
- clicking a marked sentence opens an explanation panel with:
  - expected tag
  - `fb`
  - if wrong: chosen vs expected

---

### STEP 4: Visual Direction

Use the "Underground Library" design language:

```css
--bg-parchment: #faf8f4;
--surface-cream: #fffefa;
--surface-deep: #f0ede6;
--text-bark: #3d3529;
--text-bark-light: #5a4f40;
--text-muted: #8a7d6b;
--color-claim: #6b7c5b;
--color-evidence: #5b6b7c;
--color-hedging: #7c5b6b;
--border: #ddd8cc;
```

Typography:
- Hebrew UI: `Heebo`
- English article text: `Georgia, "Times New Roman", serif`

Visual rules:
- warm parchment background
- dark bark header
- strong serif/LTR article islands
- no generic AI aesthetic
- no icon libraries
- no emoji in UI chrome

Header:
- sticky dark header
- title: `קוראים אחרת`
- subtitle: `Socratic Reading Companion`
- optional small credit link is fine

---

### STEP 5: Technical Constraints

- prefer plain HTML/CSS/JS over framework-heavy output
- no backend
- no auth
- no database
- no localStorage/sessionStorage
- must work as a static Moodle-friendly artifact
- all copy and interactive text should be in Hebrew except article text
- use `user-select: none` on article text and translations

Language handling:
- English article -> English article text + Hebrew UI + Hebrew translations
- Hebrew article -> RTL article text, no translation toggle needed
- other language -> preserve original direction as appropriate, translations in Hebrew

---

### STEP 6: Deployment Guidance

For Moodle deployment, optimize for one of these:

1. static folder upload (`index.html` + assets)
2. single HTML file
3. iframe embed from a static host

If generating downloadable report HTML:
- make it explicitly RTL
- use `dir="rtl"` and `text-align:right`
- keep English article excerpts as LTR islands inside the report
- keep the downloaded file usable as a standalone hand-in artifact

---

### STEP 7: Output Expectations

Output:
- the code
- a short explanation of the data structure
- a short note explaining how another instructor would swap in a new article
- a short checklist of what the instructor must review manually:
  - tag key
  - Hebrew translations
  - Socratic questions
  - quiz
  - `fb` explanations
  - exported report HTML / RTL layout

Do not output generic placeholder content. Use the actual article.

## END OF PROMPT

Review the result carefully before deployment:
- AI over-tags claims
- AI under-tags hedging
- translations need human checking
- the best `fb` explanations explain why the sentence matters, not just what category it is
- make sure the quiz is genuinely conceptual
