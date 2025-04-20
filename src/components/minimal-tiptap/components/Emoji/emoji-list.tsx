export const emojiCategories = {
  smileys: [
    { emoji: '😀', name: 'grinning face' },
    { emoji: '😃', name: 'grinning face with big eyes' },
    { emoji: '😄', name: 'grinning face with smiling eyes' },
    { emoji: '😁', name: 'beaming face with smiling eyes' },
    { emoji: '😆', name: 'grinning squinting face' },
    { emoji: '😅', name: 'grinning face with sweat' },
    { emoji: '🤣', name: 'rolling on the floor laughing' },
    { emoji: '😂', name: 'face with tears of joy' },
    { emoji: '🙂', name: 'slightly smiling face' },
    { emoji: '🙃', name: 'upside-down face' },
    { emoji: '😉', name: 'winking face' },
    { emoji: '😊', name: 'smiling face with smiling eyes' },
    { emoji: '😇', name: 'smiling face with halo' },
    { emoji: '🥰', name: 'smiling face with hearts' },
    { emoji: '😍', name: 'smiling face with heart-eyes' },
    { emoji: '🤩', name: 'star-struck' }
  ],
  people: [
    { emoji: '👋', name: 'waving hand' },
    { emoji: '🤚', name: 'raised back of hand' },
    { emoji: '✋', name: 'raised hand' },
    { emoji: '🖖', name: 'vulcan salute' },
    { emoji: '👌', name: 'OK hand' },
    { emoji: '🤏', name: 'pinching hand' },
    { emoji: '✌️', name: 'victory hand' },
    { emoji: '🤞', name: 'crossed fingers' },
    { emoji: '🤟', name: 'love-you gesture' },
    { emoji: '🤘', name: 'sign of the horns' },
    { emoji: '👍', name: 'thumbs up' },
    { emoji: '👎', name: 'thumbs down' }
  ],
  nature: [
    { emoji: '🐶', name: 'dog face' },
    { emoji: '🐱', name: 'cat face' },
    { emoji: '🐭', name: 'mouse face' },
    { emoji: '🐹', name: 'hamster face' },
    { emoji: '🐰', name: 'rabbit face' },
    { emoji: '🦊', name: 'fox face' },
    { emoji: '🐻', name: 'bear face' },
    { emoji: '🐼', name: 'panda face' },
    { emoji: '🦁', name: 'lion face' },
    { emoji: '🐮', name: 'cow face' },
    { emoji: '🐷', name: 'pig face' },
    { emoji: '🐸', name: 'frog face' }
  ],
  food: [
    { emoji: '🍎', name: 'red apple' },
    { emoji: '🍐', name: 'pear' },
    { emoji: '🍊', name: 'orange' },
    { emoji: '🍋', name: 'lemon' },
    { emoji: '🍌', name: 'banana' },
    { emoji: '🍉', name: 'watermelon' },
    { emoji: '🍇', name: 'grapes' },
    { emoji: '🍓', name: 'strawberry' },
    { emoji: '🍈', name: 'melon' },
    { emoji: '🍒', name: 'cherries' },
    { emoji: '🍑', name: 'peach' },
    { emoji: '🥭', name: 'mango' }
  ],
  symbols: [
    { emoji: '❤️', name: 'red heart' },
    { emoji: '🧡', name: 'orange heart' },
    { emoji: '💛', name: 'yellow heart' },
    { emoji: '💚', name: 'green heart' },
    { emoji: '💙', name: 'blue heart' },
    { emoji: '💜', name: 'purple heart' },
    { emoji: '🖤', name: 'black heart' },
    { emoji: '💔', name: 'broken heart' },
    { emoji: '❣️', name: 'heart exclamation' },
    { emoji: '💕', name: 'two hearts' },
    { emoji: '💞', name: 'revolving hearts' },
    { emoji: '💓', name: 'beating heart' }
  ]
}

export const categoryLabels: Record<string, string> = {
  smileys: 'Smileys & Emotion',
  people: 'People & Body',
  nature: 'Animals & Nature',
  food: 'Food & Drink',
  symbols: 'Symbols'
}

export const categoryIcons: Record<string, string> = {
  smileys: '😀',
  people: '👋',
  nature: '🐶',
  food: '🍎',
  symbols: '❤️'
}

export const defaultFrequentEmojis = [
  { emoji: '👍', name: 'thumbs up' },
  { emoji: '😊', name: 'smiling face with smiling eyes' },
  { emoji: '❤️', name: 'red heart' },
  { emoji: '👏', name: 'clapping hands' },
  { emoji: '🎉', name: 'party popper' }
]