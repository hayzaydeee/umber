import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import UmberText from "../ui/UmberText";

/**
 * Animation Options for Onboarding Text Sequences
 * Contains multiple reusable text animation patterns
 */

// ============================================================================
// SEQUENCE 1: LIVING DOCUMENT EDIT SESSION
// ============================================================================
/**
 * Living Document Edit Session Component
 * Creates a typewriter experience with strikethrough and italic effects
 *
 * Sequence:
 * 1. Types welcome message
 * 2. Types affirmation
 * 3. Applies strikethrough to affirmation
 * 4. Converts strikethrough to italic
 * 5. Types final call-to-action
 * 6. Triggers completion callback
 */
export const LivingDocumentSequence = ({
  userName = "friend",
  onComplete,
  shouldFade = false,
  className = "",
}) => {
  // Living Document State
  const [documentLines, setDocumentLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [editingPhase, setEditingPhase] = useState("typing"); // 'typing', 'strikethrough', 'italicizing', 'newline'

  const documentSequence = [
    {
      text: `welcome, ${userName}, to umber.`,
      style: "normal",
      size: "text-9xl",
      weight: "font-bold",
    },
    {
      text: `we're here to help your future self thank you`,
      style: "normal",
      size: "text-3xl",
      weight: "font-light",
    },
    {
      text: `we're here to help your future self thank you`,
      style: "strikethrough",
      size: "text-3xl",
      weight: "font-light",
    },
    {
      text: `we're here to help your future self thank you`,
      style: "italic",
      size: "text-3xl",
      weight: "font-light",
    },
    {
      text: `let's build your space`,
      style: "normal",
      size: "text-2xl",
      weight: "font-medium",
    },
  ];

  const typeCurrentLine = () => {
    const currentLine = documentSequence[currentLineIndex];
    if (!currentLine) return;

    if (currentCharIndex <= currentLine.text.length) {
      const newLines = [...documentLines];
      newLines[currentLineIndex] = {
        ...currentLine,
        displayText: currentLine.text.slice(0, currentCharIndex),
      };
      setDocumentLines(newLines);

      setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, 50);
    } else {
      // Line complete - handle next phase
      handleLineComplete();
    }
  };

  const handleLineComplete = () => {
    if (currentLineIndex === 0) {
      // First line done, start second line
      setTimeout(() => {
        setCurrentLineIndex(1);
        setCurrentCharIndex(0);
      }, 800);
    } else if (currentLineIndex === 1) {
      // Second line done, start strikethrough effect
      setTimeout(() => {
        setEditingPhase("strikethrough");
        setCurrentLineIndex(2);
        const newLines = [...documentLines];
        newLines[2] = {
          ...documentSequence[2],
          displayText: documentSequence[2].text,
        };
        setDocumentLines(newLines);

        setTimeout(() => {
          setEditingPhase("italicizing");
          setCurrentLineIndex(3);
          const italicLines = [...newLines];
          italicLines[3] = {
            ...documentSequence[3],
            displayText: documentSequence[3].text,
          };
          setDocumentLines(italicLines);

          setTimeout(() => {
            setEditingPhase("newline");
            setCurrentLineIndex(4);
            setCurrentCharIndex(0);
          }, 1500);
        }, 1000);
      }, 1000);
    } else if (currentLineIndex === 4) {
      // Final line done, trigger completion
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
    }
  };

  // Initialize typing
  useEffect(() => {
    if (
      currentLineIndex < documentSequence.length &&
      editingPhase === "typing"
    ) {
      typeCurrentLine();
    } else if (editingPhase === "newline" && currentLineIndex === 4) {
      typeCurrentLine();
    }
  }, [currentCharIndex, currentLineIndex, editingPhase]);

  const getLineStyle = (line, index) => {
    let className = `${line.size} ${line.weight} text-umber-700 dark:text-umber-200 mb-4`;

    if (line.style === "strikethrough") {
      className += " line-through opacity-60";
    } else if (line.style === "italic") {
      className += " italic text-umber-600 dark:text-umber-300";
    }

    return className;
  };

  return (
    <motion.div
      className={`text-left min-h-[400px] p-8 ${className}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: shouldFade ? 0 : 1,
        scale: shouldFade ? 0.8 : 1,
        rotateY: shouldFade ? 45 : 0,
      }}
      transition={{
        duration: shouldFade ? 1.5 : 0.8,
        rotateY: { duration: 1.5, ease: "easeInOut" },
      }}
    >
      {documentLines.map((line, index) => (
        <motion.div
          key={`${index}-${line.style}`}
          className={getLineStyle(line, index)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <UmberText>
            {line.displayText}
            {index === currentLineIndex &&
              (editingPhase === "typing" || editingPhase === "newline") && (
                <motion.span
                  className="border-r-2 border-umber-600 ml-1"
                  animate={{ opacity: showCursor ? [1, 0] : 0 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
          </UmberText>
        </motion.div>
      ))}
    </motion.div>
  );
};

// ============================================================================
// SEQUENCE 2: COLLABORATIVE WRITING
// ============================================================================
/**
 * Collaborative Writing Component
 * Simulates multiple writers contributing to a document in real-time
 *
 * Sequence:
 * 1. System types welcome message
 * 2. Assistant adds affirmation (indented)
 * 3. Future-self adds call-to-action (further indented)
 * Each writer has distinct cursor color and typing speed
 */
export const CollaborativeWritingSequence = ({
  userName = "friend",
  onComplete,
  shouldFade = false,
  className = "",
}) => {
  // Collaborative Writing State
  const [lines, setLines] = useState([]);
  const [currentWriterIndex, setCurrentWriterIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [activeCursorPosition, setActiveCursorPosition] = useState({
    line: 0,
    char: 0,
  });

  const collaborativeSequence = [
    {
      writer: "system",
      text: `welcome ${userName}, to umber!`,
      style:
        "text-7xl font-bold text-umber-700 dark:text-umber-200 font-family-display",
      cursorColor: "border-umber-600",
      typingSpeed: 80,
      pauseAfter: 800,
    },
    {
      writer: "system",
      text: `we're here to help you know why you want what you want,`,
      style: "text-5xl font-light text-umber-600 dark:text-umber-300",
      cursorColor: "border-umber-600",
      typingSpeed: 60,
      pauseAfter: 1000,
      indent: "",
    },
    {
      writer: "system",
      text: `and just to make your wishlisting look better, and feel easier.`,
      style: "text-3xl font-medium text-umber-700 dark:text-umber-200",
      cursorColor: "border-umber-600",
      typingSpeed: 70,
      pauseAfter: 1200,
      indent: "",
    },
    {
      writer: "system",
      text: `let's build your space together, shall we?`,
      style: "text-3xl font-medium text-umber-700 dark:text-umber-200",
      cursorColor: "border-umber-600",
      typingSpeed: 70,
      pauseAfter: 1200,
      indent: "",
    },
  ];

  const typeCurrentWriter = () => {
    const currentWriter = collaborativeSequence[currentWriterIndex];
    if (!currentWriter) return;

    const fullText = (currentWriter.indent || "") + currentWriter.text;

    if (currentCharIndex <= fullText.length) {
      const newLines = [...lines];
      newLines[currentWriterIndex] = {
        ...currentWriter,
        displayText: fullText.slice(0, currentCharIndex),
        isTyping: true,
      };
      setLines(newLines);
      setActiveCursorPosition({
        line: currentWriterIndex,
        char: currentCharIndex,
      });

      setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, currentWriter.typingSpeed);
    } else {
      // Current writer finished
      const newLines = [...lines];
      newLines[currentWriterIndex] = {
        ...currentWriter,
        displayText: (currentWriter.indent || "") + currentWriter.text,
        isTyping: false,
      };
      setLines(newLines);

      setTimeout(() => {
        if (currentWriterIndex < collaborativeSequence.length - 1) {
          setCurrentWriterIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        } else {
          // All writers finished
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1000);
        }
      }, currentWriter.pauseAfter);
    }
  };

  // Initialize collaborative writing
  useEffect(() => {
    if (currentWriterIndex < collaborativeSequence.length) {
      typeCurrentWriter();
    }
  }, [currentCharIndex, currentWriterIndex]);

  const getCursorForLine = (lineIndex) => {
    const line = lines[lineIndex];
    if (!line || !line.isTyping) return null;

    return (
      <motion.span
        className={`border-r-2 ${line.cursorColor} ml-1`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
    );
  };

  return (
    <motion.div
      className={`text-left min-h-[400px] p-8 font-display ${className}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: shouldFade ? 0 : 1,
        scale: shouldFade ? 0.9 : 1,
        rotateX: shouldFade ? 15 : 0,
      }}
      transition={{
        duration: shouldFade ? 1.8 : 0.8,
        rotateX: { duration: 1.8, ease: "easeInOut" },
      }}
    >
      {/* Writer Status Indicator */}
      <motion.div
        className="mb-8 text-sm text-umber-500 dark:text-umber-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {currentWriterIndex < collaborativeSequence.length && (
          <motion.span
            key={currentWriterIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-umber-600"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            system is typing...
          </motion.span>
        )}
      </motion.div>

      {/* Collaborative Lines */}
      <div className="space-y-6">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            className={`${line.style} mb-4 whitespace-pre-wrap`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <UmberText>
              {line.displayText}
              {getCursorForLine(index)}
            </UmberText>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ============================================================================
// SEQUENCE 3: CODE COMMENT EVOLUTION
// ============================================================================
/**
 * Code Comment Evolution Component
 * Simulates code development with evolving comment styles
 *
 * Sequence:
 * 1. Types welcome message as code
 * 2. Adds single-line comment (//)
 * 3. Transforms to multi-line comment
 * 4. Adds final code statement
 */
export const CodeCommentEvolutionSequence = ({
  userName = "friend",
  onComplete,
  shouldFade = false,
  className = "",
}) => {
  // Code Evolution State
  const [codeLines, setCodeLines] = useState([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const codeSequence = [
    {
      type: "code",
      text: `welcome, ${userName}, to umber.`,
      style: "text-6xl font-mono text-umber-700 dark:text-umber-200",
      prefix: "",
      typingSpeed: 70,
    },
    {
      type: "singleComment",
      text: `// we're here to help your future self thank you`,
      style: "text-2xl font-mono text-green-600 dark:text-green-400",
      prefix: "",
      typingSpeed: 50,
      transformDelay: 1500,
    },
    {
      type: "multiComment",
      text: `/* we're here to help your future self thank you */`,
      style: "text-2xl font-mono text-blue-600 dark:text-blue-400",
      prefix: "",
      isTransform: true,
    },
    {
      type: "finalCode",
      text: `let's build your space`,
      style:
        "text-3xl font-mono font-semibold text-purple-700 dark:text-purple-300",
      prefix: "",
      typingSpeed: 60,
    },
  ];

  const typeCurrentStage = () => {
    const currentStageData = codeSequence[currentStage];
    if (!currentStageData) return;

    if (currentStageData.isTransform) {
      // Handle transformation (single -> multi comment)
      const newLines = [...codeLines];
      newLines[currentStage] = {
        ...currentStageData,
        displayText: currentStageData.text,
        isComplete: true,
      };
      setCodeLines(newLines);
      setIsTyping(false);

      setTimeout(() => {
        if (currentStage < codeSequence.length - 1) {
          setCurrentStage((prev) => prev + 1);
          setCurrentCharIndex(0);
          setIsTyping(true);
        } else {
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 2000);
        }
      }, 1500);

      return;
    }

    const fullText = currentStageData.prefix + currentStageData.text;

    if (currentCharIndex <= fullText.length) {
      const newLines = [...codeLines];
      newLines[currentStage] = {
        ...currentStageData,
        displayText: fullText.slice(0, currentCharIndex),
        isComplete: false,
      };
      setCodeLines(newLines);

      setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, currentStageData.typingSpeed);
    } else {
      // Stage complete
      const newLines = [...codeLines];
      newLines[currentStage] = {
        ...codeLines[currentStage],
        isComplete: true,
      };
      setCodeLines(newLines);
      setIsTyping(false);

      const delay = currentStageData.transformDelay || 1000;

      setTimeout(() => {
        if (currentStage < codeSequence.length - 1) {
          setCurrentStage((prev) => prev + 1);
          setCurrentCharIndex(0);
          setIsTyping(true);
        } else {
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 2000);
        }
      }, delay);
    }
  };

  // Initialize code evolution
  useEffect(() => {
    if (currentStage < codeSequence.length && isTyping) {
      typeCurrentStage();
    }
  }, [currentCharIndex, currentStage, isTyping]);

  const getSyntaxHighlight = (line, index) => {
    if (line.type === "singleComment") {
      return `${line.style} italic`;
    } else if (line.type === "multiComment") {
      return `${line.style} italic`;
    } else if (line.type === "finalCode") {
      return `${line.style} tracking-wide`;
    }
    return line.style;
  };

  return (
    <motion.div
      className={`text-left min-h-[400px] p-8 bg-gray-900 dark:bg-gray-800 rounded-lg border border-gray-700 ${className}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: shouldFade ? 0 : 1,
        scale: shouldFade ? 0.85 : 1,
        rotateX: shouldFade ? 10 : 0,
      }}
      transition={{
        duration: shouldFade ? 1.5 : 0.8,
        rotateX: { duration: 1.5, ease: "easeInOut" },
      }}
    >
      {/* Code Editor Header */}
      <motion.div
        className="mb-6 flex items-center gap-2 pb-4 border-b border-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-4 text-sm text-gray-400 font-mono">welcome.js</span>
      </motion.div>

      {/* Code Lines */}
      <div className="space-y-4 font-mono">
        {codeLines.map((line, index) => (
          <motion.div
            key={index}
            className="flex items-start"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* Line numbers */}
            <span className="text-gray-500 text-sm w-8 text-right mr-4 mt-1">
              {index + 1}
            </span>

            {/* Code content */}
            <div className={getSyntaxHighlight(line, index)}>
              <UmberText>
                {line.displayText}
                {index === currentStage && isTyping && (
                  <motion.span
                    className="border-r-2 border-gray-400 ml-1 animate-pulse"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </UmberText>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subtle syntax highlighting overlay effects */}
      {currentStage === 1 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.1), transparent)",
          }}
        />
      )}
    </motion.div>
  );
};

// ============================================================================
// SEQUENCE 4: MANUSCRIPT EDITING
// ============================================================================
/**
 * Manuscript Editing Component
 * Simulates a manuscript being edited with corrections and emphasis
 *
 * Sequence:
 * 1. Types welcome message
 * 2. Types affirmation with mistake
 * 3. Strikes through and corrects mistake
 * 4. Adds bold emphasis to key word
 * 5. Types final underlined call-to-action
 */
export const ManuscriptEditingSequence = ({
  userName = "friend",
  onComplete,
  shouldFade = false,
  className = "",
}) => {
  // Manuscript State
  const [manuscriptLines, setManuscriptLines] = useState([]);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showEditingCursor, setShowEditingCursor] = useState(false);

  const manuscriptSequence = [
    {
      type: "title",
      text: `Welcome, ${userName}, to Umber.`,
      style: "text-7xl font-serif text-umber-800 dark:text-umber-100",
      typingSpeed: 80,
      pauseAfter: 1200,
    },
    {
      type: "draft",
      text: `We're here to help your past self thank you`,
      style: "text-2xl font-serif text-gray-700 dark:text-gray-300",
      typingSpeed: 60,
      pauseAfter: 1500,
    },
    {
      type: "correction",
      originalText: `We're here to help your past self thank you`,
      correctedText: `We're here to help your future self thank you`,
      style: "text-2xl font-serif text-gray-700 dark:text-gray-300",
      strikeStyle:
        "text-2xl font-serif text-red-500 dark:text-red-400 line-through opacity-60",
      isEdit: true,
      pauseAfter: 2000,
    },
    {
      type: "emphasis",
      text: `We're here to help your **future** self thank you`,
      style: "text-2xl font-serif text-gray-700 dark:text-gray-300",
      boldStyle: "font-bold text-umber-700 dark:text-umber-200",
      isEmphasis: true,
      pauseAfter: 1500,
    },
    {
      type: "finalCall",
      text: `Let's build your space`,
      style:
        "text-3xl font-serif font-medium text-umber-800 dark:text-umber-100 underline decoration-2 underline-offset-4",
      typingSpeed: 70,
      pauseAfter: 2000,
    },
  ];

  const processCurrentPhase = () => {
    const currentPhaseData = manuscriptSequence[currentPhase];
    if (!currentPhaseData) return;

    if (currentPhaseData.isEdit) {
      // Handle correction phase
      const newLines = [...manuscriptLines];

      // First show strikethrough
      newLines[currentPhase] = {
        ...currentPhaseData,
        displayText: currentPhaseData.originalText,
        showStrike: true,
        isComplete: false,
      };
      setManuscriptLines(newLines);
      setShowEditingCursor(true);

      setTimeout(() => {
        // Then show correction
        newLines[currentPhase] = {
          ...currentPhaseData,
          displayText: currentPhaseData.correctedText,
          showStrike: false,
          isComplete: true,
        };
        setManuscriptLines(newLines);
        setShowEditingCursor(false);

        setTimeout(() => {
          moveToNextPhase();
        }, currentPhaseData.pauseAfter);
      }, 1500);

      return;
    }

    if (currentPhaseData.isEmphasis) {
      // Handle emphasis phase
      const newLines = [...manuscriptLines];
      newLines[currentPhase] = {
        ...currentPhaseData,
        displayText: currentPhaseData.text,
        isComplete: true,
      };
      setManuscriptLines(newLines);

      setTimeout(() => {
        moveToNextPhase();
      }, currentPhaseData.pauseAfter);

      return;
    }

    // Handle regular typing
    const fullText = currentPhaseData.text;

    if (currentCharIndex <= fullText.length) {
      const newLines = [...manuscriptLines];
      newLines[currentPhase] = {
        ...currentPhaseData,
        displayText: fullText.slice(0, currentCharIndex),
        isComplete: false,
      };
      setManuscriptLines(newLines);

      setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, currentPhaseData.typingSpeed);
    } else {
      // Phase complete
      const newLines = [...manuscriptLines];
      newLines[currentPhase] = {
        ...manuscriptLines[currentPhase],
        isComplete: true,
      };
      setManuscriptLines(newLines);
      setIsTyping(false);

      setTimeout(() => {
        moveToNextPhase();
      }, currentPhaseData.pauseAfter);
    }
  };

  const moveToNextPhase = () => {
    if (currentPhase < manuscriptSequence.length - 1) {
      setCurrentPhase((prev) => prev + 1);
      setCurrentCharIndex(0);
      setIsTyping(true);
    } else {
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
    }
  };

  // Initialize manuscript
  useEffect(() => {
    if (currentPhase < manuscriptSequence.length) {
      if (
        isTyping &&
        !manuscriptSequence[currentPhase].isEdit &&
        !manuscriptSequence[currentPhase].isEmphasis
      ) {
        processCurrentPhase();
      } else if (
        manuscriptSequence[currentPhase].isEdit ||
        manuscriptSequence[currentPhase].isEmphasis
      ) {
        processCurrentPhase();
      }
    }
  }, [currentCharIndex, currentPhase, isTyping]);

  const renderLine = (line, index) => {
    if (line.isEmphasis) {
      // Render with bold emphasis
      const parts = line.displayText.split("**");
      return (
        <span>
          {parts.map((part, partIndex) => {
            if (partIndex === 1) {
              return (
                <strong key={partIndex} className={line.boldStyle}>
                  {part}
                </strong>
              );
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </span>
      );
    }

    return line.displayText;
  };

  return (
    <motion.div
      className={`text-center min-h-[500px] p-12 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg shadow-lg ${className}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: shouldFade ? 0 : 1,
        scale: shouldFade ? 0.9 : 1,
        rotateX: shouldFade ? 5 : 0,
      }}
      transition={{
        duration: shouldFade ? 1.5 : 0.8,
        rotateX: { duration: 1.5, ease: "easeInOut" },
      }}
    >
      {/* Manuscript Header */}
      <motion.div
        className="mb-8 pb-4 border-b border-amber-200 dark:border-amber-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-sm text-amber-700 dark:text-amber-300 font-serif italic">
          Draft #3 • {new Date().toLocaleDateString()}
        </div>
      </motion.div>

      {/* Manuscript Lines */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {manuscriptLines.map((line, index) => (
          <motion.div
            key={index}
            className="text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className={line.showStrike ? line.strikeStyle : line.style}>
              <UmberText>
                {renderLine(line, index)}
                {index === currentPhase && (isTyping || showEditingCursor) && (
                  <motion.span
                    className={`border-r-2 ml-1 ${
                      showEditingCursor ? "border-red-500" : "border-gray-600"
                    }`}
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </UmberText>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Editing indicators */}
      {showEditingCursor && (
        <motion.div
          className="absolute top-4 right-4 text-xs text-red-500 font-serif italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          editing...
        </motion.div>
      )}

      {/* Subtle paper texture overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M0 0h20v20H0V0zm10 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
};

// ============================================================================
// SEQUENCE 6: TERMINAL COMMAND LINE
// ============================================================================

export const TerminalCommandSequence = ({ userName, onComplete }) => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const commands = [
    {
      command: `welcome_user --name=${userName} --destination=umber`,
      output: [
        `✓ User ${userName} authenticated`,
        `✓ Destination: umber workspace`,
        `✓ Access granted`,
      ],
      delay: 800,
    },
    {
      command: `echo "we're here to help your future self thank you"`,
      output: [`we're here to help your future self thank you`],
      delay: 600,
    },
    {
      command: `mkdir your_space && cd your_space`,
      output: [
        `Directory created: your_space/`,
        `Changed directory to: your_space/`,
      ],
      delay: 500,
    },
    {
      command: `./build_together.sh`,
      output: [
        `Building collaborative environment...`,
        `[████████████████████] 100%`,
        `✓ Environment ready`,
        `✓ Welcome complete`,
      ],
      delay: 1000,
    },
  ];

  useEffect(() => {
    const runTerminalSequence = async () => {
      // Initial prompt
      setLines([{ type: "system", text: "Welcome to Umber Terminal v2.1.0" }]);
      await sleep(500);

      for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];

        // Add prompt line
        setLines((prev) => [
          ...prev,
          { type: "prompt", text: "$ ", command: cmd.command, typing: true },
        ]);
        setIsTyping(true);

        // Type the command
        await typeCommand(cmd.command, i);

        // Mark command as complete
        setLines((prev) =>
          prev.map((line, idx) =>
            idx === prev.length - 1 ? { ...line, typing: false } : line
          )
        );
        setIsTyping(false);

        await sleep(300);

        // Add output lines
        for (const outputLine of cmd.output) {
          await sleep(200);
          setLines((prev) => [...prev, { type: "output", text: outputLine }]);

          // Special animation for progress bar
          if (outputLine.includes("████")) {
            await animateProgressBar();
          }
        }

        await sleep(cmd.delay);
      }

      // Final prompt
      await sleep(500);
      setLines((prev) => [
        ...prev,
        {
          type: "final",
          text: `${userName}@umber:~/your_space$ ready_to_build`,
        },
      ]);

      await sleep(1000);
      onComplete();
    };

    const typeCommand = async (command, commandIndex) => {
      for (let i = 0; i <= command.length; i++) {
        setCurrentLine(command.slice(0, i));
        setLines((prev) =>
          prev.map((line, idx) =>
            idx === prev.length - 1
              ? { ...line, currentText: command.slice(0, i) }
              : line
          )
        );
        await sleep(60 + Math.random() * 40);
      }
    };

    const animateProgressBar = async () => {
      const frames = [
        "[░░░░░░░░░░░░░░░░░░░░] 0%",
        "[█░░░░░░░░░░░░░░░░░░░] 15%",
        "[███░░░░░░░░░░░░░░░░░] 30%",
        "[██████░░░░░░░░░░░░░░] 45%",
        "[██████████░░░░░░░░░░] 60%",
        "[██████████████░░░░░░] 75%",
        "[██████████████████░░] 90%",
        "[████████████████████] 100%",
      ];

      for (const frame of frames) {
        setLines((prev) =>
          prev.map((line, idx) =>
            line.text.includes("████") ? { ...line, text: frame } : line
          )
        );
        await sleep(150);
      }
    };

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    runTerminalSequence();

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [userName, onComplete]);

  const renderLine = (line, index) => {
    if (line.type === "system") {
      return <div className="text-green-400 font-bold mb-2">{line.text}</div>;
    }

    if (line.type === "prompt") {
      return (
        <div className="flex items-center">
          <span className="text-yellow-400">umber@terminal</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$ </span>
          <span className="text-green-300">
            {line.currentText || line.command}
            {line.typing && showCursor && (
              <span className="bg-green-400 text-black ml-1 animate-pulse">
                █
              </span>
            )}
          </span>
        </div>
      );
    }

    if (line.type === "output") {
      const isSuccess = line.text.includes("✓");
      const isProgress = line.text.includes("█") || line.text.includes("░");

      return (
        <div
          className={`ml-4 ${
            isSuccess
              ? "text-green-400"
              : isProgress
              ? "text-cyan-400"
              : "text-gray-300"
          }`}
        >
          {line.text}
        </div>
      );
    }

    if (line.type === "final") {
      return (
        <div className="flex items-center text-green-400 font-bold">
          {line.text}
          {showCursor && (
            <span className="bg-green-400 text-black ml-1 animate-pulse">
              █
            </span>
          )}
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8"
    >
      {/* Terminal Window */}
      <motion.div
        className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-400 text-sm ml-4">umber@terminal: ~</div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm leading-relaxed min-h-[300px] max-h-[500px] overflow-y-auto">
          <AnimatePresence>
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-1"
              >
                {renderLine(line, index)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Scan line effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-1"
          animate={{ y: [0, 400, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Terminal info */}
      <motion.div
        className="mt-4 text-center text-gray-600 font-mono text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Terminal access established. Welcome to the system, {userName}.
      </motion.div>
    </motion.div>
  );
};

// Default export for easy importing
const AnimationOptions = {
  LivingDocumentSequence,
  CollaborativeWritingSequence,
  CodeCommentEvolutionSequence,
  ManuscriptEditingSequence,
};

export default AnimationOptions;
