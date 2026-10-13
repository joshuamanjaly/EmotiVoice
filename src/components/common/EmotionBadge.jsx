import React from 'react';
import { getEmotionConfig } from '../../utils/emotionHelpers';

export const EmotionBadge = ({ emotion, showEmoji = true, className = '', size = 'md' }) => {
  const config = getEmotionConfig(emotion);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5 font-medium',
    lg: 'px-3.5 py-1.5 text-sm gap-2 font-semibold',
    xl: 'px-5 py-2 text-base gap-2.5 font-bold',
  }[size] || 'px-2.5 py-1 text-xs gap-1.5 font-medium';

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-all ${config.badgeClass} ${sizeClasses} ${className}`}
      style={{
        backgroundColor: config.bgColor,
        borderColor: config.borderColor,
      }}
    >
      {showEmoji && <span>{config.emoji}</span>}
      <span>{config.name}</span>
    </span>
  );
};
