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
} from '../types';
import { TEXTS, EXERCISE_SECTIONS } from '../constants';

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


// --- Exercise Card Components ---

const ReadingCard: React.FC<{ exercise: ReadingExerciseType; language: Language; onCorrect: () => void }> = ({ exercise, language, onCorrect }) => {
  const texts = TEXTS[language];
  
  useEffect(() => {
    // This exercise is for practice, so we mark it "correct" on mount
    onCorrect();
  }, [onCorrect]);

  const handleListen = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-4">
      {exercise.items.map(item => (
        <motion.div
          key={item.id}
          className="p-4 border border-gray-200 rounded-lg bg-yellow-50 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm"
          whileHover={{ scale: 1.03, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl">{item.emoji}</span>
            <p className="text-xl font-medium text-dark">{item.text}</p>
          </div>
          <button onClick={() => handleListen(item.text)} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-green-600 transition-colors font-semibold">
            {texts.listen}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

const TextTransformationCard: React.FC<{ exercise: TextTransformationExercise; language: Language; onCorrect: () => void }> = ({ exercise, language, onCorrect }) => {
    const texts = TEXTS[language];
    const [answers, setAnswers] = useState<{[key: number]: string}>({});
    const [results, setResults] = useState<{[key: number]: boolean | null}>({});

    const handleCheck = (id: number) => {
        const isCorrect = answers[id]?.trim() === exercise.items.find(i => i.id === id)?.correctAnswer.trim();
        setResults(prev => ({ ...prev, [id]: isCorrect }));
        if (isCorrect) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            onCorrect();
        }
    };

    return (
        <div className="space-y-4">
            {exercise.items.map(item => (
                <div key={item.id} className="p-4 border rounded-lg bg-yellow-50 shadow-sm space-y-2">
                    <p className="font-semibold text-lg text-dark">{item.prompt}</p>
                    <div className="flex gap-2 items-center">
                        <input 
                            type="text"
                            value={answers[item.id] || ''}
                            onChange={(e) => setAnswers(prev => ({ ...prev, [item.id]: e.target.value }))}
                            className={`flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                results[item.id] === true ? 'border-green-500 ring-green-300' : 
                                results[item.id] === false ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-secondary'
                            }`}
                        />
                        <button onClick={() => handleCheck(item.id)} disabled={results[item.id] === true} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400">
                            {texts.checkAnswer}
                        </button>
                    </div>
                     {results[item.id] === false && <p className="text-red-500">{texts.tryAgain}</p>}
                </div>
            ))}
        </div>
    );
};

const GenderClassificationCard: React.FC<{ exercise: GenderClassificationExercise; language: Language; onCorrect: () => void }> = ({ exercise, language, onCorrect }) => {
    const texts = TEXTS[language];
    const [selected, setSelected] = useState<{[key: number]: string | null}>({});
    const [isWrong, setIsWrong] = useState<number | null>(null);

    const handleSelect = (itemId: number, gender: 'masculine' | 'feminine') => {
        const item = exercise.items.find(i => i.id === itemId);
        if (!item || selected[itemId]) return;

        if(item.correctGender === gender) {
            setSelected(prev => ({ ...prev, [itemId]: gender }));
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            onCorrect();
            setIsWrong(null);
        } else {
            setIsWrong(itemId);
            setTimeout(() => setIsWrong(null), 820); // Corresponds to shake animation duration
        }
    };

    return (
         <div className="space-y-4">
            {exercise.items.map(item => (
                <div key={item.id} className={`p-4 border rounded-lg bg-yellow-50 shadow-sm space-y-3 ${isWrong === item.id ? 'animate-shake' : ''}`}>
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">{item.emoji}</span>
                        <p className="text-xl font-medium text-dark">{item.word}</p>
                    </div>
                    <div className="flex gap-2">
                        {(['masculine', 'feminine'] as const).map(gender => (
                            <button 
                                key={gender}
                                onClick={() => handleSelect(item.id, gender)}
                                disabled={!!selected[item.id]}
                                className={`px-4 py-2 rounded-lg font-semibold transition-colors w-full
                                    ${selected[item.id] === gender ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-100 border border-gray-300 disabled:bg-gray-200'}
                                `}
                            >
                                {texts[gender]}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const DragDropClassificationCard: React.FC<{ exercise: DragDropClassificationExercise; language: Language; onCorrect: () => void }> = ({ exercise, language, onCorrect }) => {
    const [items, setItems] = useState(exercise.items);
    const [droppedItems, setDroppedItems] = useState<{[key: string]: typeof exercise.items}>({});
    const sensors = useSensors(useSensor(PointerSensor));

    function handleDragEnd(event: DragEndEvent) {
        const { over, active } = event;
        if (over) {
            const itemId = active.id as string;
            const categoryId = over.id as string;
            const item = items.find(i => i.id === itemId);

            if (item && item.correctCategoryId === categoryId) {
                setItems(prev => prev.filter(i => i.id !== itemId));
                setDroppedItems(prev => ({
                    ...prev,
                    [categoryId]: [...(prev[categoryId] || []), item],
                }));
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                onCorrect();
            } else {
                 // Optional: Add shake animation for wrong drop
            }
        }
    }
    
    const DraggableItem: React.FC<{ item: { id: string; text: string } }> = ({ item }) => {
        const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: item.id });
        const style = transform ? { 
            transform: CSS.Translate.toString(transform),
            zIndex: 10,
         } : undefined;

        return (
            <div 
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
                className="px-4 py-2 bg-accent text-dark rounded-full shadow-md cursor-grab active:cursor-grabbing"
            >
                {item.text}
            </div>
        );
    };

    const DroppableCategory: React.FC<{ category: any, children: React.ReactNode }> = ({ category, children }) => {
        const { setNodeRef, isOver } = useDroppable({ id: category.id });
        return (
            <div 
                ref={setNodeRef}
                className={`p-4 border-2 border-dashed rounded-lg min-h-[150px] transition-colors ${isOver ? 'border-secondary bg-orange-100' : 'border-gray-300'}`}
            >
                <h5 className="font-bold text-center mb-2 text-dark">{category.title[language]}</h5>
                <div className="space-y-2">
                    {children}
                </div>
            </div>
        );
    };


    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="space-y-4">
                <div className="p-4 bg-yellow-100 rounded-lg flex flex-wrap gap-2 justify-center min-h-[50px]">
                    {items.map(item => <DraggableItem key={item.id} item={item} />)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exercise.categories.map(category => (
                        <DroppableCategory key={category.id} category={category}>
                            {(droppedItems[category.id] || []).map(item => (
                                <div key={item.id} className="px-3 py-1 bg-green-500 text-white rounded-lg text-center shadow">
                                    {item.text}
                                </div>
                            ))}
                        </DroppableCategory>
                    ))}
                </div>
            </div>
        </DndContext>
    );
};

const WordColoringCard: React.FC<{ exercise: WordColoringExercise; language: Language; onCorrect: () => void }> = ({ exercise, language, onCorrect }) => {
    const [selectedGroup, setSelectedGroup] = useState(exercise.groups[0].id);
    const [assignments, setAssignments] = useState<{[key: number]: string}>({});

    const handleWordClick = (itemId: number) => {
        const item = exercise.items.find(i => i.id === itemId);
        if (!item || assignments[itemId]) return;

        if (item.correctGroupId === selectedGroup) {
            setAssignments(prev => ({...prev, [itemId]: selectedGroup}));
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            onCorrect();
        }
    };
    
    return (
        <div className="space-y-4">
            <div className="flex justify-center gap-2 p-2 bg-gray-100 rounded-lg">
                {exercise.groups.map(group => (
                    <button 
                        key={group.id}
                        onClick={() => setSelectedGroup(group.id)}
                        className={`px-4 py-2 rounded-lg font-semibold w-full transition-all ${selectedGroup === group.id ? `${group.color} text-white shadow-lg` : 'bg-white'}`}
                    >
                        {group.title[language]}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {exercise.items.map(item => {
                    const assignedGroup = exercise.groups.find(g => g.id === assignments[item.id]);
                    return (
                        <button 
                            key={item.id}
                            onClick={() => handleWordClick(item.id)}
                            disabled={!!assignments[item.id]}
                            className={`px-4 py-2 text-lg rounded-lg shadow-sm transition-all ${
                                assignedGroup ? `${assignedGroup.color} text-white` : 'bg-yellow-100 hover:bg-yellow-200'
                            }`}
                        >
                            {item.word}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const LetterPositionCard: React.FC<{ exercise: LetterPositionExercise; language: Language; onCorrect: () => void }> = ({ exercise, language, onCorrect }) => {
    const texts = TEXTS[language];
    const [selected, setSelected] = useState<{[key: number]: LetterPosition | null}>({});
    
    const handleSelect = (itemId: number, position: LetterPosition) => {
        const item = exercise.items.find(i => i.id === itemId);
        if (!item || selected[itemId]) return;

        if (item.correctPosition === position) {
            setSelected(prev => ({...prev, [itemId]: position}));
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            onCorrect();
        }
    };

    return (
        <div className="space-y-4">
            {exercise.items.map(item => (
                <div key={item.id} className="p-4 border rounded-lg bg-yellow-50 shadow-sm space-y-3">
                    <p className="text-xl font-bold text-center text-dark">
                        {item.word.split('').map((char, i) => 
                            <span key={i} className={char === item.letter ? 'text-secondary font-extrabold' : ''}>{char}</span>
                        )}
                    </p>
                    <div className="flex justify-center gap-2">
                         {(['start', 'middle', 'end'] as const).map(pos => (
                             <button
                                key={pos}
                                onClick={() => handleSelect(item.id, pos)}
                                disabled={!!selected[item.id]}
                                className={`px-4 py-2 rounded-lg font-semibold transition-colors
                                    ${selected[item.id] === pos ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-100 border'}
                                `}
                             >
                                {texts[pos]}
                             </button>
                         ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const MatchingCard: React.FC<{ exercise: MatchingExercise; language: Language; onCorrect: () => void }> = ({ exercise, language, onCorrect }) => {
    const [sources, setSources] = useState(exercise.pairs.map(p => p.source));
    const [targets, setTargets] = useState(exercise.pairs.map(p => p.target).sort(() => Math.random() - 0.5)); // Shuffle targets
    const [completedPairs, setCompletedPairs] = useState<string[]>([]);
    
    function handleDragEnd(event: DragEndEvent) {
        const { over, active } = event;
        if (over) {
            const sourceId = active.id as string; // text or emoji
            const targetId = over.id as string; // text or emoji
            const correctPair = exercise.pairs.find(p => (p.source.text || p.source.emoji) === sourceId && (p.target.text || p.target.emoji) === targetId);

            if(correctPair) {
                setSources(prev => prev.filter(s => (s.text || s.emoji) !== sourceId));
                setTargets(prev => prev.filter(t => (t.text || t.emoji) !== targetId));
                setCompletedPairs(prev => [...prev, correctPair.id]);
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                onCorrect();
            }
        }
    }

    const DraggableSource: React.FC<{ source: { text: string; emoji?: string; } }> = ({ source }) => {
        const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: source.text || source.emoji! });
        const style = transform ? { transform: CSS.Translate.toString(transform), zIndex: 10 } : undefined;
        
        return (
            <div ref={setNodeRef} style={style} {...listeners} {...attributes}
                className="p-3 bg-yellow-100 rounded-lg text-center font-semibold cursor-grab active:cursor-grabbing shadow">
                {source.emoji && <span className="text-2xl">{source.emoji}</span>} {source.text}
            </div>
        );
    };

    const DroppableTarget: React.FC<{ target: { text: string; emoji?: string; } }> = ({ target }) => {
        const { setNodeRef, isOver } = useDroppable({ id: target.text || target.emoji! });
        
        return (
            <div ref={setNodeRef} className={`p-3 rounded-lg text-center font-semibold transition-colors shadow ${isOver ? 'bg-orange-200' : 'bg-yellow-100'}`}>
                 {target.emoji && <span className="text-2xl">{target.emoji}</span>} {target.text}
            </div>
        );
    };

    return (
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <div className="space-y-4">
                <div className="flex justify-between gap-4">
                    <div className="w-1/2 space-y-2">
                        {sources.map((source, index) => (
                             <DraggableSource key={index} source={source} />
                        ))}
                    </div>
                    <div className="w-1/2 space-y-2">
                         {targets.map((target, index) => (
                             <DroppableTarget key={index} target={target} />
                        ))}
                    </div>
                </div>
                 {completedPairs.length > 0 && (
                    <div className="border-t pt-4 mt-4 space-y-2">
                        {completedPairs.map(id => {
                            const pair = exercise.pairs.find(p => p.id === id)!;
                            return (
                                <div key={id} className="p-2 bg-green-100 rounded-lg flex justify-center items-center gap-4 text-green-800">
                                    <span>{pair.source.emoji}{pair.source.text}</span>
                                    <span>✅</span>
                                    <span>{pair.target.emoji}{pair.target.text}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DndContext>
    );
};

const SentenceWordClassificationCard: React.FC<{ exercise: SentenceWordClassificationExercise; language: Language; onCorrect: () => void }> = ({ exercise, language, onCorrect }) => {
    const [assignments, setAssignments] = useState<{[key: number]: {[key: number]: string}}>({});
    
    const handleWordClick = (itemIndex: number, wordIndex: number, classificationId: string) => {
        const item = exercise.items[itemIndex];
        const word = item.sentence[wordIndex];
        if (!word.isTarget) return;

        if (word.correctClassificationId === classificationId) {
            setAssignments(prev => ({
                ...prev,
                [itemIndex]: { ...(prev[itemIndex] || {}), [wordIndex]: classificationId }
            }));
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            onCorrect();
        }
    };
    
    return (
        <div className="space-y-6">
            {exercise.items.map((item, itemIndex) => (
                <div key={item.id} className="p-4 border rounded-lg bg-yellow-50 shadow-sm space-y-3">
                    <p className="text-xl font-bold text-center text-dark flex flex-wrap justify-center gap-x-2">
                        {item.sentence.map((word, wordIndex) => {
                            const assignment = assignments[itemIndex]?.[wordIndex];
                            const classification = exercise.classifications.find(c => c.id === assignment);
                            return (
                                <span 
                                    key={wordIndex} 
                                    onClick={() => word.isTarget && !assignment && handleWordClick(itemIndex, wordIndex, exercise.classifications.find(c => c.title.ar === 'مفرد' || c.title.ar === 'جمع')!.id)} // Simplified click
                                    className={`px-2 py-1 rounded transition-colors ${word.isTarget ? 'cursor-pointer hover:bg-yellow-200' : ''} ${classification ? `${classification.color} text-white` : ''}`}
                                >
                                    {word.text}
                                </span>
                            );
                        })}
                    </p>
                </div>
            ))}
             <div className="flex justify-center gap-2 mt-4">
                {exercise.classifications.map(c => <span key={c.id} className={`px-3 py-1 text-sm text-white rounded-full ${c.color}`}>{c.title[language]}</span>)}
            </div>
        </div>
    );
};

const TimedChallengeCard: React.FC<{ exercise: TimedChallengeExercise; language: Language; onCorrect: () => void }> = ({ exercise, language, onCorrect }) => {
    const texts = TEXTS[language];
    const [timeLeft, setTimeLeft] = useState(exercise.duration);
    const [isActive, setIsActive] = useState(true);
    const [words, setWords] = useState('');

    useEffect(() => {
        if (!isActive) return;
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsActive(false);
            onCorrect();
        }
    }, [timeLeft, isActive, onCorrect]);
    
    return (
        <div className="space-y-4 text-center">
            <div className="text-5xl font-bold text-secondary">{timeLeft}s</div>
            <p className="text-lg">{exercise.prompt[language]}: <span className="font-bold text-2xl text-primary">{exercise.letter}</span></p>
            <textarea 
                value={words}
                onChange={e => setWords(e.target.value)}
                disabled={!isActive}
                className="w-full h-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100"
            />
            {!isActive && <p className="font-bold text-green-600">{texts.timeUp}</p>}
        </div>
    );
};

const InstructionalTextCard: React.FC<{ exercise: InstructionalText; language: Language; onCorrect: () => void }> = ({ exercise, language, onCorrect }) => {
    useEffect(() => {
        onCorrect(); // Mark as complete on view
    }, [onCorrect]);

    const content = exercise.content[language];
    const notes = exercise.notes?.[language];

    return (
        <div className="space-y-4 text-dark">
            {content.map((section, index) => (
                <div key={index}>
                    <h5 className="font-bold text-lg mb-2 text-secondary">{section.title}</h5>
                    <ul className="list-disc list-inside space-y-1">
                        {section.points.map((point, pIndex) => <li key={pIndex}>{point}</li>)}
                    </ul>
                </div>
            ))}
            {notes && (
                 <div className="mt-4 pt-4 border-t border-dashed">
                    <h5 className="font-bold text-lg mb-2 text-secondary">ملاحظات</h5>
                     <ul className="list-disc list-inside space-y-1">
                         {notes.map((note, nIndex) => <li key={nIndex}>{note}</li>)}
                     </ul>
                 </div>
            )}
        </div>
    );
};


// --- Main Exercises Component ---

const Exercises: React.FC<{ language: Language }> = ({ language }) => {
  const [scores, setScores] = useState<Record<string, boolean>>({});

  const totalExercises = useMemo(() => EXERCISE_SECTIONS.reduce((acc, section) => acc + section.exercises.length, 0), []);

  const handleCorrect = (exerciseId: string) => {
    setScores(prev => ({ ...prev, [exerciseId]: true }));
  };
  
  const completedCount = Object.keys(scores).length;
  const progress = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  return (
    <>
      <div className="sticky top-20 z-40 bg-gradient-to-br from-yellow-100 via-green-50 to-yellow-100 py-4 px-2 mb-8 shadow-sm rounded-lg">
          <ProgressBar progress={progress} />
      </div>

      {EXERCISE_SECTIONS.map(section => (
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
    </>
  );
};

export default Exercises;