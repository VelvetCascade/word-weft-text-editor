import { emojiCategories } from '@/components/minimal-tiptap/components/Emoji/emoji-list.tsx'

export interface EmojiItem {
  emoji: string
  name: string
}

/**
 * Filter emojis by search term
 * @param searchTerm The term to search for
 * @returns Object with categories containing matching emojis
 */
export const filterEmojisByTerm = (searchTerm: string): Record<string, EmojiItem[]> => {
  if (!searchTerm.trim()) {
    return emojiCategories
  }

  const term = searchTerm.toLowerCase()
  const results: Record<string, EmojiItem[]> = {}

  Object.entries(emojiCategories).forEach(([category, emojis]) => {
    const filteredCategory = emojis.filter(emoji =>
      emoji.name.toLowerCase().includes(term)
    )

    if (filteredCategory.length > 0) {
      results[category] = filteredCategory
    }
  })

  return results
}

/**
 * Get frequently used emojis from localStorage or use defaults
 * @param defaultEmojis Fallback emoji list
 * @returns Array of frequently used emojis
 */
export const getFrequentEmojis = (defaultEmojis: EmojiItem[]): EmojiItem[] => {
  try {
    const saved = localStorage.getItem('tiptap-frequent-emojis')
    return saved ? JSON.parse(saved) : defaultEmojis
  } catch (e) {
    return defaultEmojis
  }
}

/**
 * Update frequently used emojis list
 * @param emoji The emoji that was just used
 * @param currentList Current list of frequently used emojis
 * @param maxItems Maximum number of items to keep in the list
 */
export const updateFrequentEmojis = (
  emoji: string,
  currentList: EmojiItem[],
  maxItems: number = 5
): EmojiItem[] => {

  const emojiName = findEmojiName(emoji)
  if (!emojiName) return currentList

  const newItem = { emoji, name: emojiName }

  const filteredList = currentList.filter(item => item.emoji !== emoji)

  const newList = [newItem, ...filteredList].slice(0, maxItems)

  try {
    localStorage.setItem('tiptap-frequent-emojis', JSON.stringify(newList))
  } catch (e) {
    console.error('Failed to save emojis to localStorage:', e.message);
  }

  return newList
}

/**
 * Find the name of an emoji character
 * @param emoji The emoji character
 * @returns The name of the emoji or undefined
 */
export const findEmojiName = (emoji: string): string | undefined => {
  for (const category of Object.values(emojiCategories)) {
    const found = category.find(item => item.emoji === emoji)
    if (found) return found.name
  }
  return undefined
}