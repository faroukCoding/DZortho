
export type Role = 'therapist' | 'parent';

export type Language = 'ar' | 'en';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  workplace?: string;
  wilaya?: string;
}

// --- Base Exercise Types ---

export interface ReadingItem {
  id: number;
  text: string;
  emoji: string;
}

export interface ReadingExercise {
  id:string;
  type: 'reading';
  title: { ar: string; en: string; };
  items: ReadingItem[];
}

export interface TextTransformationItem {
    id: number;
    prompt: string;
    correctAnswer: string;
}

export interface TextTransformationExercise {
    id: string;
    type: 'text-transformation';
    title: { ar: string; en: string; };
    items: TextTransformationItem[];
}

export interface DragDropClassificationItem {
    id: string;
    text: string;
    correctCategoryId: string;
}
export interface DragDropClassificationCategory {
    id: string;
    title: { ar: string; en: string; };
}
export interface DragDropClassificationExercise {
    id: string;
    type: 'drag-drop-classification';
    title: { ar: string; en: string; };
    categories: DragDropClassificationCategory[];
    items: DragDropClassificationItem[];
}

export interface GenderClassificationItem {
    id: number;
    word: string;
    correctGender: 'masculine' | 'feminine';
    emoji: string;
}

export interface GenderClassificationExercise {
    id: string;
    type: 'gender-classification';
    title: { ar: string; en: string; };
    items: GenderClassificationItem[];
}

export interface WordColoringItem {
    id: number;
    word: string;
    correctGroupId: string;
}
export interface WordColoringGroup {
    id: string;
    title: { ar: string; en: string; };
    color: string;
}
export interface WordColoringExercise {
    id: string;
    type: 'word-coloring';
    title: { ar: string; en: string; };
    groups: WordColoringGroup[];
    items: WordColoringItem[];
}

// FIX: Export LetterPosition type to be used in other files.
export type LetterPosition = 'start' | 'middle' | 'end';

export interface LetterPositionItem {
    id: number;
    word: string;
    letter: string;
    correctPosition: LetterPosition;
}
export interface LetterPositionExercise {
    id: string;
    type: 'letter-position';
    title: { ar: string; en: string; };
    items: LetterPositionItem[];
}

// --- New Advanced/Game-like Exercise Types ---

export interface MatchingPair {
    id: string;
    source: { text: string; emoji?: string; };
    target: { text: string; emoji?: string; };
}
export interface MatchingExercise {
    id: string;
    type: 'matching';
    title: { ar: string; en: string; };
    pairs: MatchingPair[];
}


export interface SentenceWordClassificationWord {
    text: string;
    isTarget: boolean; // Is this a word to be classified?
    correctClassificationId?: string;
}
export interface SentenceWordClassificationItem {
    id: number;
    sentence: SentenceWordClassificationWord[];
}
export interface SentenceWordClassificationExercise {
    id: string;
    type: 'sentence-word-classification';
    title: { ar: string; en: string; };
    classifications: { id: string; title: { ar: string; en: string; }; color: string; }[];
    items: SentenceWordClassificationItem[];
}


export interface TimedChallengeExercise {
    id: string;
    type: 'timed-challenge';
    title: { ar: string; en: string; };
    prompt: { ar: string; en: string; };
    letter: string;
    duration: number; // in seconds
}


export interface InstructionalText {
    id: string;
    type: 'instructional-text';
    title: { ar: string; en: string; };
    content: {
        ar: { title: string; points: string[]; }[];
        en: { title: string; points: string[]; }[];
    };
    notes?: { ar: string[]; en: string[]; };
}


// --- Union Type for All Exercises ---

export type AnyExercise = 
    | ReadingExercise
    | TextTransformationExercise
    | DragDropClassificationExercise
    | GenderClassificationExercise
    | WordColoringExercise
    | LetterPositionExercise
    | MatchingExercise
    | SentenceWordClassificationExercise
    | TimedChallengeExercise
    | InstructionalText;

export interface ExerciseSection {
    id: string;
    title: { ar: string; en: string; };
    exercises: AnyExercise[];
}