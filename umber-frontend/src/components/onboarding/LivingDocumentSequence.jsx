import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import UmberText from '../ui/UmberText';

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
const LivingDocumentSequence = ({ 
  userName = 'friend', 
  onComplete, 
  shouldFade = false,
  className = '' 
}) => {
  // Living Document State
  const [documentLines, setDocumentLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [editingPhase, setEditingPhase] = useState('typing'); // 'typing', 'strikethrough', 'italicizing', 'newline'
  
  const documentSequence = [
    { text: `welcome, ${userName}, to umber.`, style: 'normal', size: 'text-9xl', weight: 'font-bold' },
    { text: `we're here to help your future self thank you`, style: 'normal', size: 'text-3xl', weight: 'font-light' },
    { text: `we're here to help your future self thank you`, style: 'strikethrough', size: 'text-3xl', weight: 'font-light' },
    { text: `we're here to help your future self thank you`, style: 'italic', size: 'text-3xl', weight: 'font-light' },
    { text: `let's build your space`, style: 'normal', size: 'text-2xl', weight: 'font-medium' }
  ];
  
  const typeCurrentLine = () => {
    const currentLine = documentSequence[currentLineIndex];
    if (!currentLine) return;
    
    if (currentCharIndex <= currentLine.text.length) {
      const newLines = [...documentLines];
      newLines[currentLineIndex] = {
        ...currentLine,
        displayText: currentLine.text.slice(0, currentCharIndex)
      };
      setDocumentLines(newLines);
      
      setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
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
        setEditingPhase('strikethrough');
        setCurrentLineIndex(2);
        const newLines = [...documentLines];
        newLines[2] = { ...documentSequence[2], displayText: documentSequence[2].text };
        setDocumentLines(newLines);
        
        setTimeout(() => {
          setEditingPhase('italicizing');
          setCurrentLineIndex(3);
          const italicLines = [...newLines];
          italicLines[3] = { ...documentSequence[3], displayText: documentSequence[3].text };
          setDocumentLines(italicLines);
          
          setTimeout(() => {
            setEditingPhase('newline');
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
    if (currentLineIndex < documentSequence.length && editingPhase === 'typing') {
      typeCurrentLine();
    } else if (editingPhase === 'newline' && currentLineIndex === 4) {
      typeCurrentLine();
    }
  }, [currentCharIndex, currentLineIndex, editingPhase]);
  
  const getLineStyle = (line, index) => {
    let className = `${line.size} ${line.weight} text-umber-700 dark:text-umber-200 mb-4`;
    
    if (line.style === 'strikethrough') {
      className += ' line-through opacity-60';
    } else if (line.style === 'italic') {
      className += ' italic text-umber-600 dark:text-umber-300';
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
        rotateY: shouldFade ? 45 : 0
      }}
      transition={{ 
        duration: shouldFade ? 1.5 : 0.8,
        rotateY: { duration: 1.5, ease: "easeInOut" }
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
            {index === currentLineIndex && (editingPhase === 'typing' || editingPhase === 'newline') && (
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

export default LivingDocumentSequence;
