import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import confetti from 'canvas-confetti';
import { 
    AnyExercise, 
    Language, 
    ReadingExercise as ReadingExerciseType,
    TextTransformationExercise,
    DragDropClassificationExercise,
    GenderClassificationExercise,
    WordColoringExercise,
    LetterPosition,
    LetterPositionExercise,
    MatchingExercise,
    SentenceWordClassificationExercise,
    TimedChallengeExercise,
    InstructionalText,
    ExerciseSection,
    FreeDrawExercise,
    AuditoryLetterSelectionExercise,
    AuditoryLetterSelectionItem,
    SentenceUnscrambleExercise,
    SentenceCompletionExercise,
    ImageWordAssociationExercise,
} from '../types';
import { TEXTS, READING_SECTIONS, WRITING_SECTIONS } from '../constants';

// --- Helper Components ---

const StarRating: React.FC<{ score: number, total: number }> = ({ score, total }) => (
  <div className="flex">
    {[...Array(total)].map((_, i) => (
      <svg key={i} className={`w-6 h-6 ${i < score ? 'text-accent' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-4">
        <div 
            className="bg-primary h-4 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
        ></div>
    </div>
);

const SortableItem: React.FC<{id: string, children: React.ReactNode}> = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};

// --- Exercise Card Components ---
// (جميع مكونات التمارين تبقى كما هي بدون تغيير)
// ... [ReadingCard, TextTransformationCard, GenderClassificationCard, إلخ] ...

// --- Main Exercises Component ---

const Exercises: React.FC<{ language: Language }> = ({ language }) => {
  const [scores, setScores] = useState<Record<string, boolean>>({});
  const [currentStage, setCurrentStage] = useState<'reading' | 'writing'>('reading');

  const totalReadingExercises = useMemo(() => 
    READING_SECTIONS.reduce((acc, section) => acc + section.exercises.length, 0), 
    []
  );

  const totalWritingExercises = useMemo(() => 
    WRITING_SECTIONS.reduce((acc, section) => acc + section.exercises.length, 0), 
    []
  );

  const handleCorrect = (exerciseId: string) => {
    setScores(prev => ({ ...prev, [exerciseId]: true }));
  };
  
  const completedReadingCount = Object.keys(scores).filter(id => 
    READING_SECTIONS.some(section => 
      section.exercises.some(exercise => exercise.id === id)
    )
  ).length;

  const completedWritingCount = Object.keys(scores).filter(id => 
    WRITING_SECTIONS.some(section => 
      section.exercises.some(exercise => exercise.id === id)
    )
  ).length;

  const readingProgress = totalReadingExercises > 0 ? (completedReadingCount / totalReadingExercises) * 100 : 0;
  const writingProgress = totalWritingExercises > 0 ? (completedWritingCount / totalWritingExercises) * 100 : 0;

  return (
    <div>
      {/* Stage Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-2 shadow-lg flex gap-2">
          <button
            onClick={() => setCurrentStage('reading')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              currentStage === 'reading' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {TEXTS[language].readingStage}
          </button>
          <button
            onClick={() => setCurrentStage('writing')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              currentStage === 'writing' 
                ? 'bg-secondary text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {TEXTS[language].writingStage}
          </button>
        </div>
      </div>

      {/* Reading Stage Content */}
      {currentStage === 'reading' && (
        <div>
          <div className="sticky top-20 z-40 bg-gradient-to-br from-yellow-100 via-green-50 to-yellow-100 py-4 px-2 mb-8 shadow-sm rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-dark">
                {language === 'ar' ? 'تقدم مرحلة القراءة' : 'Reading Stage Progress'}
              </span>
              <span className="text-sm font-bold text-primary">
                {completedReadingCount}/{totalReadingExercises}
              </span>
            </div>
            <ProgressBar progress={readingProgress} />
          </div>

          {READING_SECTIONS.map(section => (
            <section key={section.id} className="mb-12">
              <h3 className="text-2xl font-bold font-cairo mb-6 p-4 bg-primary/80 text-white rounded-lg shadow-md text-center">
                {section.title[language]}
              </h3>
              <div className="space-y-8">
                {section.exercises.map(exercise => (
                  <div key={exercise.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-secondary">{exercise.title[language]}</h4>
                      <StarRating score={scores[exercise.id] ? 1 : 0} total={1} />
                    </div>
                    
                    {/* جميع مكونات التمارين */}
                    {exercise.type === 'reading' && <ReadingCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'text-transformation' && <TextTransformationCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'gender-classification' && <GenderClassificationCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'drag-drop-classification' && <DragDropClassificationCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'word-coloring' && <WordColoringCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'letter-position' && <LetterPositionCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'matching' && <MatchingCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'sentence-word-classification' && <SentenceWordClassificationCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'timed-challenge' && <TimedChallengeCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'instructional-text' && <InstructionalTextCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Writing Stage Content */}
      {currentStage === 'writing' && (
        <div>
          <div className="sticky top-20 z-40 bg-gradient-to-br from-yellow-100 via-green-50 to-yellow-100 py-4 px-2 mb-8 shadow-sm rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-dark">
                {language === 'ar' ? 'تقدم مرحلة الكتابة' : 'Writing Stage Progress'}
              </span>
              <span className="text-sm font-bold text-secondary">
                {completedWritingCount}/{totalWritingExercises}
              </span>
            </div>
            <ProgressBar progress={writingProgress} />
          </div>

          {WRITING_SECTIONS.map(section => (
            <section key={section.id} className="mb-12">
              <h3 className="text-2xl font-bold font-cairo mb-6 p-4 bg-secondary/80 text-white rounded-lg shadow-md text-center">
                {section.title[language]}
              </h3>
              <div className="space-y-8">
                {section.exercises.map(exercise => (
                  <div key={exercise.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-secondary">{exercise.title[language]}</h4>
                      <StarRating score={scores[exercise.id] ? 1 : 0} total={1} />
                    </div>
                    
                    {/* مكونات تمارين الكتابة */}
                    {exercise.type === 'free-draw' && <FreeDrawCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'auditory-letter-selection' && <AuditoryLetterSelectionCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'instructional-text' && <InstructionalTextCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'matching' && <MatchingCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'sentence-unscramble' && <SentenceUnscrambleCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'sentence-completion' && <SentenceCompletionCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                    {exercise.type === 'image-word-association' && <ImageWordAssociationCard exercise={exercise} language={language} onCorrect={() => handleCorrect(exercise.id)} />}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exercises;
