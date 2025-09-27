import { useState } from 'react';
import { motion } from 'motion/react';
import Button from '../../ui/Button';
import UmberText from '../../ui/UmberText';

const CompletionCard = ({ 
  title,
  description,
  completedEntities = {},
  onStartMastery,
  onComplete 
}) => {
  const [showCelebration, setShowCelebration] = useState(true);

  const achievements = [
    {
      icon: '🎯',
      title: 'first umber created',
      description: completedEntities.umber?.name || 'your first umber',
      completed: !!completedEntities.umber
    },
    {
      icon: '📂',
      title: 'first nest organized',
      description: completedEntities.nest?.name || 'your first nest',
      completed: !!completedEntities.nest
    },
    {
      icon: '📝',
      title: 'first item saved',
      description: completedEntities.item?.name || 'your first item',
      completed: !!completedEntities.item
    },
    {
      icon: '🎨',
      title: 'interface mastered',
      description: 'navigation and tools',
      completed: true
    }
  ];

  return (
    <div className="p-8">
      {/* Celebration Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Celebration Icon */}
        <motion.div
          className="text-6xl mb-4"
          animate={showCelebration ? { 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          🎉
        </motion.div>

        <UmberText variant="h2" className="text-umber-800 mb-3">
          {title}
        </UmberText>
        
        <UmberText variant="body" className="text-umber-600 leading-relaxed">
          {description}
        </UmberText>
      </motion.div>

      {/* Achievements List */}
      <motion.div
        className="space-y-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            className={`
              flex items-center space-x-4 p-4 rounded-lg border transition-all
              ${achievement.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200'
              }
            `}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + (index * 0.1) }}
          >
            <div className="text-2xl">{achievement.icon}</div>
            <div className="flex-1">
              <UmberText variant="small" className="font-medium text-umber-800">
                {achievement.title}
              </UmberText>
              <UmberText variant="tiny" className="text-umber-600">
                {achievement.description}
              </UmberText>
            </div>
            {achievement.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
              >
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        className="bg-umber-50 rounded-lg p-6 mb-8 border border-umber-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <UmberText variant="small" className="text-umber-700 text-center mb-3 font-medium">
          your umber foundation:
        </UmberText>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-umber-800">1</div>
            <UmberText variant="tiny" className="text-umber-600">umber</UmberText>
          </div>
          <div>
            <div className="text-2xl font-bold text-umber-800">1</div>
            <UmberText variant="tiny" className="text-umber-600">nest</UmberText>
          </div>
          <div>
            <div className="text-2xl font-bold text-umber-800">1</div>
            <UmberText variant="tiny" className="text-umber-600">item</UmberText>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        {/* Primary Action */}
        <Button
          onClick={onComplete}
          className="w-full py-3"
        >
          start curating
        </Button>

        {/* Secondary Action */}
        {onStartMastery && (
          <Button
            variant="ghost"
            onClick={onStartMastery}
            className="w-full py-2 text-umber-600"
          >
            show me advanced features
          </Button>
        )}
      </motion.div>

      {/* Footer Message */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <UmberText variant="tiny" className="text-umber-500">
          you can always revisit this guide from the settings menu
        </UmberText>
      </motion.div>
    </div>
  );
};

export default CompletionCard;
