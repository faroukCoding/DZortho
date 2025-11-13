import { ExerciseSection } from './types';
export const LOGO_URL = '/images/1000009626.jpg';
export const WELCOME_IMAGE_URL = '/images/تعلّم، تحدّث، وابتسم مع OrthoLink! برنامج ذكي يرافق طفلك لتقوية مهارات النطق والتعبير بخطوات ممتعة وآمنة.png';

export const WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra",
  "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret",
  "Tizi Ouzou", "Algiers", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda",
  "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem",
  "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj",
  "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
  "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
  "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal",
  "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair",
  "El Meniaa"
];

export const TEXTS = {
  ar: {
    appName: "Ortholink",
    loginTitle: "تسجيل الدخول",
    signupTitle: "إنشاء حساب جديد",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    firstName: "الاسم الأول",
    lastName: "اللقب",
    workplace: "مكان العمل",
    wilaya: "الولاية",
    selectWilaya: "اختر ولايتك",
    role: "أنا",
    therapist: "أخصائي",
    parent: "ولي أمر",
    login: "دخول",
    signup: "تسجيل",
    noAccount: "ليس لديك حساب؟",
    haveAccount: "هل لديك حساب بالفعل؟",
    createAccount: "أنشئ حسابًا",
    welcome: "مرحباً بك",
    dashboard: "لوحة التحكم",
    logout: "تسجيل الخروج",
    therapistDashboard: "لوحة تحكم الأخصائي",
    parentDashboard: "لوحة تحكم ولي الأمر",
    viewExercises: "عرض التمارين",
    listen: "استمع",
    record: "سجل",
    stop: "إيقاف",
    play: "تشغيل",
    recording: "جاري التسجيل...",
    checkAnswer: "تحقق",
    correct: "صحيح!",
    tryAgain: "حاول مرة أخرى",
    masculine: "مذكر",
    feminine: "مؤنث",
    yourAnswer: "إجابتك:",
    start: "بداية",
    middle: "وسط",
    end: "نهاية",
    singular: "مفرد",
    plural: "جمع",
    allCorrect: "أحسنت! كل الإجابات صحيحة.",
    timeUp: "انتهى الوقت!",
    submit: "إرسال",
    wordsTyped: "الكلمات المكتوبة:",
    readingStage: "مرحلة القراءة",
    letsGo: "هيا بنا!",
  },
  en: {
    appName: "Ortholink",
    loginTitle: "Login",
    signupTitle: "Create New Account",
    email: "Email",
    password: "Password",
    firstName: "First Name",
    lastName: "Last Name",
    workplace: "Workplace",
    wilaya: "State (Wilaya)",
    selectWilaya: "Select your Wilaya",
    role: "I am a",
    therapist: "Therapist",
    parent: "Parent",
    login: "Login",
    signup: "Sign Up",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    createAccount: "Create an account",
    welcome: "Welcome",
    dashboard: "Dashboard",
    logout: "Logout",
    therapistDashboard: "Therapist Dashboard",
    parentDashboard: "Parent Dashboard",
    viewExercises: "View Exercises",
    listen: "Listen",
    record: "Record",
    stop: "Stop",
    play: "Play",
    recording: "Recording...",
    checkAnswer: "Check",
    correct: "Correct!",
    tryAgain: "Try Again",
    masculine: "Masculine",
    feminine: "Feminine",
    yourAnswer: "Your Answer:",
    start: "Start",
    middle: "Middle",
    end: "End",
    singular: "Singular",
    plural: "Plural",
    allCorrect: "Well done! All answers are correct.",
    timeUp: "Time's up!",
    submit: "Submit",
    wordsTyped: "Words Typed:",
    readingStage: "Reading Stage",
    letsGo: "Let's Go!",
  },
};


export const EXERCISE_SECTIONS: ExerciseSection[] = [
  // --- المرحلة الأولى: مرحلة القراءة (Reading Stage) ---
  {
    // القسم 1: التعليم الصوتي والإرشادات
    id: 'phonology-and-guides',
    title: { ar: 'القسم 1: التعليم الصوتي والإرشادات', en: 'Part 1: Phonology & Guides' },
    exercises: [
      {
        id: 'matching-word-picture',
        type: 'matching',
        title: { ar: 'مطابقة الكلمات بالصور', en: 'Matching Words with Pictures' },
        pairs: [
          { id: 'wp-1', source: { text: 'باب' }, target: { text: '', emoji: '🚪' } },
          { id: 'wp-2', source: { text: 'بيت' }, target: { text: '', emoji: '🏠' } },
          { id: 'wp-3', source: { text: 'مكتب' }, target: { text: '', emoji: '💼' } },
          { id: 'wp-4', source: { text: 'حمام' }, target: { text: '', emoji: '🛁' } },
          { id: 'wp-5', source: { text: 'غرفة' }, target: { text: '', emoji: '🛏️' } },
          { id: 'wp-6', source: { text: 'خزانة' }, target: { text: '', emoji: '🚪' } },
        ]
      },
      {
        id: 'letter-position',
        type: 'letter-position',
        title: { ar: 'تحديد موقع الحرف', en: 'Identifying Letter Position' },
        items: [
          { id: 1, word: 'مدرسة', letter: 'م', correctPosition: 'start' },
          { id: 2, word: 'سماء', letter: 'م', correctPosition: 'middle' },
          { id: 3, word: 'كريم', letter: 'م', correctPosition: 'end' },
          { id: 4, word: 'شمس', letter: 'س', correctPosition: 'end' },
          { id: 5, word: 'سيارة', letter: 'س', correctPosition: 'start' },
          { id: 6, word: 'عصير', letter: 'س', correctPosition: 'middle' },
          { id: 7, word: 'جرس', letter: 'ج', correctPosition: 'start' },
          { id: 8, word: 'فهد', letter: 'ف', correctPosition: 'start' },
        ],
      },
      {
        id: 'matching-animal-sound',
        type: 'matching',
        title: { ar: 'تصنيف أصوات الحيوانات', en: 'Classifying Animal Sounds' },
        pairs: [
          { id: 'as-1', source: { emoji: '🐈', text: 'قطة' }, target: { text: 'مواء' } },
          { id: 'as-2', source: { emoji: '🐎', text: 'حصان' }, target: { text: 'صهيل' } },
          { id: 'as-3', source: { emoji: '🦁', text: 'أسد' }, target: { text: 'زئير' } },
          { id: 'as-4', source: { emoji: '🐕', text: 'كلب' }, target: { text: 'نباح' } },
        ]
      },
      {
        id: 'reading-practice',
        type: 'reading',
        title: { ar: 'القراءة وتكوين الجمل', en: 'Reading and Sentence Formation' },
        items: [
          { id: 1, text: 'تفاحة', emoji: '🍎' },
          { id: 2, text: 'خوخ', emoji: '🍑' },
          { id: 3, text: 'أحمد يلعب الكرة', emoji: '👦⚽️' },
          { id: 4, text: 'خديجة تقطف الأزهار', emoji: '👧🌸' },
        ]
      },
      {
        id: 'timed-challenge-sh',
        type: 'timed-challenge',
        title: { ar: 'نشاط إملاء جماعي', en: 'Group Dictation Activity' },
        prompt: { ar: 'اكتب أكبر عدد من الكلمات التي تبدأ بحرف', en: 'Write as many words as you can that start with the letter' },
        letter: 'ش',
        duration: 60,
      },
      {
        id: 'pronunciation-guide',
        type: 'instructional-text',
        title: { ar: 'دليل النطق (للمدرب/ولي الأمر)', en: 'Pronunciation Guide (for Coach/Parent)' },
        content: {
            ar: [
                { title: 'تعليمات النطق (الحروف السهلة)', points: ['م: أضم الشفتين.', 'ب: فتح على الشمعة (نَفْخ).', 'ف: نضع اليد على الذقن لنشعر بالاهتزاز.', 'ت: نضع اليد أمام الفم لنحس بالهواء الخارج.', 'ل: تحريك اللسان بلمس سقف فمك.'] },
                { title: 'تعليمات النطق (الحروف الصعبة)', points: ['س: وضع ورقة خفيفة أمامه لتحريكها بالهواء.', 'ش: يضع يده أمام فمه ليحس بدفع الهواء.', 'ر: تقليد صوت دجاجة أو صهيل.'] },
            ],
            en: [
                { title: 'Pronunciation Instructions (Easy Letters)', points: ['M: Close the lips.', 'B: Like blowing out a candle.', 'F: Place hand on chin to feel the vibration.', 'T: Place hand in front of mouth to feel the air.', 'L: Touch the roof of the mouth with the tongue.'] },
                { title: 'Pronunciation Instructions (Difficult Letters)', points: ['S: Place a light paper in front of the mouth and make it move with the "S" sound.', 'SH: Place hand in front of the mouth to feel the air push.', 'R: Imitate the sound of a chicken or a horse neigh.'] },
            ],
        },
        notes: {
            ar: ['استخدام المرآة في جميع الأنشطة.', 'البدء بـ 3-4 حروف فقط في كل أسبوع.', 'التدريب على المدود والحركات بعد إتقان نطق الحروف.'],
            en: ['Use a mirror in all activities.', 'Start with only 3-4 letters per week.', 'Vowel and diacritic exercises will be covered after mastering the letters.']
        }
      },
    ]
  },
  {
    // القسم 2: تمارين النحو والصرف
    id: 'grammar-morphology',
    title: { ar: 'القسم 2: تمارين النحو والصرف', en: 'Part 2: Grammar & Morphology' },
    exercises: [
      {
        id: 'drag-drop-gender-classification',
        type: 'drag-drop-classification',
        title: { ar: 'تصنيف (مذكر/مؤنث)', en: 'Classification (Masculine/Feminine)' },
        categories: [
          { id: 'masculine', title: { ar: 'مذكر', en: 'Masculine' } },
          { id: 'feminine', title: { ar: 'مؤنث', en: 'Feminine' } },
        ],
        items: [
          { id: 'dd-1', text: 'كتاب', correctCategoryId: 'masculine' },
          { id: 'dd-2', text: 'أزهار', correctCategoryId: 'feminine' },
          { id: 'dd-3', text: 'أولاد', correctCategoryId: 'masculine' },
          { id: 'dd-4', text: 'تلميذة', correctCategoryId: 'feminine' },
          { id: 'dd-5', text: 'وردة', correctCategoryId: 'feminine' },
          { id: 'dd-6', text: 'رجال', correctCategoryId: 'masculine' },
          { id: 'dd-7', text: 'حقيبة', correctCategoryId: 'feminine' },
          { id: 'dd-8', text: 'كرسي', correctCategoryId: 'masculine' },
          { id: 'dd-9', text: 'بنات', correctCategoryId: 'feminine' },
          { id: 'dd-10', text: 'قمر', correctCategoryId: 'masculine' },
          { id: 'dd-11', text: 'باب', correctCategoryId: 'masculine' },
          { id: 'dd-12', text: 'مفتاح', correctCategoryId: 'masculine' },
        ],
      },
      {
        id: 'gender-selection',
        type: 'gender-classification',
        title: { ar: 'تحديد النوع بوضع علامة (✓)', en: 'Gender Selection' },
        items: [
            { id: 1, word: 'شمس', correctGender: 'feminine', emoji: '☀️' },
            { id: 2, word: 'قلم', correctGender: 'masculine', emoji: '✏️' },
            { id: 3, word: 'نملة', correctGender: 'feminine', emoji: '🐜' },
            { id: 4, word: 'وردة', correctGender: 'feminine', emoji: '🌹' },
            { id: 5, word: 'طفل', correctGender: 'masculine', emoji: '👶' },
            { id: 6, word: 'بنت', correctGender: 'feminine', emoji: '👧' },
        ]
      },
      {
        id: 'sentence-transform-fem-to-masc',
        type: 'text-transformation',
        title: { ar: 'تحويل الجمل (مؤنث ← مذكر)', en: 'Sentence Transformation (Feminine → Masculine)' },
        items: [
          { id: 1, prompt: 'ذهبت البنت إلى المدرسة', correctAnswer: 'ذهب الولد الى المدرسة' },
          { id: 2, prompt: 'رتَّبت الفتاة غرفتها', correctAnswer: 'رتب الولد غرفته' },
          { id: 3, prompt: 'شرحت المعلمة الدرس', correctAnswer: 'شرح المعلم الدرس' },
          { id: 4, prompt: 'فتحت الأم الباب', correctAnswer: 'فتح الاب الباب' },
        ],
      },
       {
        id: 'word-transform-singular-to-plural',
        type: 'text-transformation',
        title: { ar: 'تحويل المفرد إلى الجمع', en: 'Singular to Plural Conversion' },
        items: [
          { id: 1, prompt: 'قلم', correctAnswer: 'أقلام' },
          { id: 2, prompt: 'بيت', correctAnswer: 'بيوت' },
          { id: 3, prompt: 'شجرة', correctAnswer: 'أشجار' },
          { id: 4, prompt: 'جمهور', correctAnswer: 'جماهير' },
          { id: 5, prompt: 'باب', correctAnswer: 'أبواب' },
          { id: 6, prompt: 'حيوان', correctAnswer: 'حيوانات' },
        ],
      },
      {
        id: 'verb-transform-plural-to-singular',
        type: 'text-transformation',
        title: { ar: 'تحويل الأفعال (جمع ← مفرد)', en: 'Verb Transformation (Plural → Singular)' },
        items: [
            { id: 1, prompt: 'خرجوا', correctAnswer: 'خرج' },
            { id: 2, prompt: 'ذهبوا', correctAnswer: 'ذهب' },
            { id: 3, prompt: 'دخلوا', correctAnswer: 'دخل' },
            { id: 4, prompt: 'أكلوا', correctAnswer: 'أكل' },
            { id: 5, prompt: 'شربوا', correctAnswer: 'شرب' },
            { id: 6, prompt: 'لعبوا', correctAnswer: 'لعب' },
        ]
      },
      {
        id: 'sentence-word-classification-singular-plural',
        type: 'sentence-word-classification',
        title: { ar: 'تحديد المفرد والجمع في الجمل', en: 'Identify Singular and Plural in Sentences' },
        classifications: [
            { id: 'singular', title: { ar: 'مفرد', en: 'Singular' }, color: 'bg-secondary' },
            { id: 'plural', title: { ar: 'جمع', en: 'Plural' }, color: 'bg-accent' },
        ],
        items: [
            { id: 1, sentence: [
                { text: 'خرج', isTarget: false },
                { text: 'التلاميذ', isTarget: true, correctClassificationId: 'plural' },
                { text: 'من', isTarget: false },
                { text: 'المدرسة', isTarget: true, correctClassificationId: 'singular' },
            ]},
        ],
      },
      {
        id: 'word-coloring-singular-plural',
        type: 'word-coloring',
        title: { ar: 'تلوين المفرد والجمع', en: 'Coloring Singular and Plural' },
        groups: [
            { id: 'singular', title: { ar: 'مفرد', en: 'Singular' }, color: 'bg-secondary' },
            { id: 'plural', title: { ar: 'جمع', en: 'Plural' }, color: 'bg-green-500' },
        ],
        items: [
            { id: 1, word: 'كتب', correctGroupId: 'plural' },
            { id: 2, word: 'تلميذ', correctGroupId: 'singular' },
            { id: 3, word: 'حدائق', correctGroupId: 'plural' },
            { id: 4, word: 'كلب', correctGroupId: 'singular' },
            { id: 5, word: 'معلمات', correctGroupId: 'plural' },
            { id: 6, word: 'باب', correctGroupId: 'singular' },
            { id: 7, word: 'جمهور', correctGroupId: 'plural' },
            { id: 8, word: 'أقلام', correctGroupId: 'plural' },
            { id: 9, word: 'معلم', correctGroupId: 'singular' },
        ],
      },
      {
        id: 'matching-gender-sentences',
        type: 'matching',
        title: { ar: 'مطابقة الجمل (تذكير وتأنيث)', en: 'Sentence Matching (Masculine & Feminine)' },
        pairs: [
            { id: 'match-1', source: { text: 'الولد يكتب' }, target: { text: 'البنت تكتب' } },
            { id: 'match-2', source: { text: 'المعلم يشرح' }, target: { text: 'المعلمة تشرح' } },
        ]
      },
    ]
  },
  // --- المرحلة الثانية: مرحلة الكتابة (Writing Stage) ---
  {
    id: 'writing-stage',
    title: { ar: 'المرحلة الثانية: مرحلة الكتابة', en: 'Stage 2: Writing Stage' },
    exercises: [
      {
        id: 'pre-writing-draw-lines',
        type: 'free-draw',
        title: { ar: 'رسم أشكال وخطوط', en: 'Drawing Shapes and Lines' },
        prompt: { ar: 'استخدم المساحة أدناه لرسم الخطوط والأشكال التالية بحرية: L, T, X, O, S, Z, A, ~, C, ☐', en: 'Use the space below to freely draw the following lines and shapes: L, T, X, O, S, Z, A, ~, C, ☐' }
      },
      {
        id: 'auditory-coloring',
        type: 'auditory-letter-selection',
        title: { ar: 'تلوين الحرف المسموع', en: 'Coloring the Heard Letter' },
        items: [
          { id: 1, targetLetter: 'ق', options: ['ق', 'أ', 'ب'] },
          { id: 2, targetLetter: 'ش', options: ['خ', 'م', 'ش'] },
          { id: 3, targetLetter: 'ر', options: ['ل', 'ف', 'ر'] },
        ]
      },
      {
        id: 'vowel-recognition-guide',
        type: 'instructional-text',
        title: { ar: 'التعرف على الحركات القصيرة', en: 'Recognizing Short Vowels' },
        content: {
            ar: [
                { title: 'اربط الحركة بشكل الفم', points: ['الفتحة (ـَ): افتح فمك.', 'الضمة (ـُ): ضم شفتيك كأنك تنفخ بالونًا.', 'الكسرة (ـِ): ابتسم، اسحب شفتيك للأسفل قليلاً.'] },
            ],
            en: [
                { title: 'Connect the Vowel to the Mouth Shape', points: ['Fatha (ـَ): Open your mouth.', 'Damma (ـُ): Round your lips like you are blowing a balloon.', 'Kasra (ـِ): Smile, pulling your lips slightly down.'] },
            ],
        },
      },
      {
        id: 'match-letter-to-word',
        type: 'matching',
        title: { ar: 'ربط الحرف بالكلمة', en: 'Connect the Letter to the Word' },
        pairs: [
          { id: 'lw-1', source: { text: 'أ' }, target: { text: 'أرنب' } },
          { id: 'lw-2', source: { text: 'ن' }, target: { text: 'نحلة' } },
          { id: 'lw-3', source: { text: 'ب' }, target: { text: 'بطة' } },
          { id: 'lw-4', source: { text: 'ج' }, target: { text: 'جمل' } },
        ]
      },
      {
        id: 'unscramble-sentences',
        type: 'sentence-unscramble',
        title: { ar: 'نشاط تكوين الجمل القصيرة', en: 'Short Sentence Formation Activity' },
        items: [
          { id: 1, scrambled: ['الدرس', 'الولد', 'كتب'], correct: 'كتب الولد الدرس' },
          { id: 2, scrambled: ['البنت', 'الفستان', 'لبست'], correct: 'لبست البنت الفستان' },
          { id: 3, scrambled: ['شرحت', 'الدرس', 'الأستاذة'], correct: 'شرحت الأستاذة الدرس' },
        ]
      },
      {
        id: 'complete-sentence-with-image',
        type: 'sentence-completion',
        title: { ar: 'نشاط إكمال الجملة', en: 'Sentence Completion Activity' },
        items: [
            { id: 1, promptStart: 'أب يأكل', emoji: '🍎', correctWord: 'تفاحة' },
            { id: 2, promptStart: 'قرأ الولد', emoji: '📖', correctWord: 'كتابا' },
            { id: 3, promptStart: 'طبخت البنت', emoji: '🍲', correctWord: 'حساء' },
        ]
      },
      {
        id: 'role-playing-guide',
        type: 'instructional-text',
        title: { ar: 'لعب أدوار واستجوابات', en: 'Role-playing and Questions' },
        content: {
            ar: [
                { title: 'لعب الأدوار', points: ['اطلب من الطفل أن يلعب دور معلم يشرح درساً، أو فلاح يزرع أرضه.', 'شجعه على استخدام الحركات والصوت لتقليد الشخصية.'] },
                { title: 'الاستجواب (أسئلة شفهية)', points: ['بعد لعب الدور، اسأله: ماذا أحسست وأنت فلاح؟ ولماذا؟', 'بعد سماع قصة، اسأله: حول ماذا تدور القصة؟'] },
            ],
            en: [
                { title: 'Role-Playing', points: ['Ask the child to play the role of a teacher explaining a lesson, or a farmer planting his land.', 'Encourage them to use movements and their voice to imitate the character.'] },
                { title: 'Questioning (Oral questions)', points: ['After role-playing, ask them: How did you feel as a farmer? And why?', 'After hearing a story, ask: What is the story about?'] },
            ],
        },
      },
      {
        id: 'image-word-recall',
        type: 'image-word-association',
        title: { ar: 'استدعاء الكلمة من الصورة', en: 'Word Recall from Image' },
        items: [
            { id: 1, emoji: '☀️', correctAnswer: 'شمس' },
            { id: 2, emoji: '🐦', correctAnswer: 'طائر' },
            { id: 3, emoji: '🌸', correctAnswer: 'زهرة' },
            { id: 4, emoji: '⚽️', correctAnswer: 'كرة' },
            { id: 5, emoji: '🍇', correctAnswer: 'عنب' },
        ]
      },
    ]
  }
];
