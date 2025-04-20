import * as React from 'react'
import type { Editor } from '@tiptap/react'
import type { toggleVariants } from '@/components/ui/toggle'
import type { VariantProps } from 'class-variance-authority'
import { FaRegSmile } from "react-icons/fa"
import { ToolbarButton } from '../toolbar-button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import {  emojiCategories, categoryLabels, categoryIcons, defaultFrequentEmojis } from '@/components/minimal-tiptap/components/Emoji/emoji-list.tsx'
import { filterEmojisByTerm, getFrequentEmojis, updateFrequentEmojis, EmojiItem } from '@/components/minimal-tiptap/components/Emoji/emoji-utils.tsx'
import { FormatAction } from '@/components/minimal-tiptap/types.ts'

type EmojiAction = 'emoji'
interface EmojiElement extends FormatAction {
  value: EmojiAction
}

const emojiAction: EmojiElement = {
  value: 'emoji',
  label: 'Emoji',
  icon: <FaRegSmile className="size-5 toolbar-text-icon-color" />,
  action: () => {},
  isActive: () => false,
  canExecute: editor => editor.can().chain().focus().run(),
  shortcuts: ['mod', 'shift', 'E']
}

interface EmojiProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
  activeActions?: EmojiAction[]
}

export const Emoji: React.FC<EmojiProps> = ({
                                                            editor,
                                                            activeActions = [emojiAction.value],
                                                            size,
                                                            variant
                                                          }) => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentCategory, setCurrentCategory] = React.useState('smileys')
  const [frequentEmojis, setFrequentEmojis] = React.useState<EmojiItem[]>(
    () => getFrequentEmojis(defaultFrequentEmojis)
  )

  const filteredEmojis = React.useMemo(() =>
      filterEmojisByTerm(searchTerm),
    [searchTerm]
  )

  const handleEmojiSelect = (emoji: string) => {
    editor.chain().focus().insertContent(emoji).run()

    const updated = updateFrequentEmojis(emoji, frequentEmojis)
    setFrequentEmojis(updated)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton
          tooltip="Insert Emoji"
          aria-label="Insert Emoji"
          className="toolbar-text-icon-color mx-1"
          size={size}
          variant={variant}
        >
          <FaRegSmile className="size-5" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4 border-b">
          <Input
            placeholder="Search emojis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {frequentEmojis.length > 0 && !searchTerm && (
          <div className="p-2 border-b">
            <h4 className="text-sm font-medium mb-2">Frequently Used</h4>
            <div className="flex flex-wrap gap-2">
              {frequentEmojis.map((item) => (
                <button
                  key={item.name}
                  className="hover:bg-muted rounded p-1 text-center text-xl cursor-pointer"
                  title={item.name}
                  onClick={() => handleEmojiSelect(item.emoji)}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-5 w-full border-b">
          {Object.keys(emojiCategories).map(category => (
            <button
              key={category}
              className={`p-2 text-center text-lg ${
                category === currentCategory ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
              }`}
              title={categoryLabels[category]}
              onClick={() => setCurrentCategory(category)}
            >
              {categoryIcons[category]}
            </button>
          ))}
        </div>

        <div className="h-48 overflow-y-auto p-2 scrollbar-transparent">
          {searchTerm ? (
            <div className="space-y-4">
              {Object.entries(filteredEmojis).map(([category, emojis]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium mb-2">{categoryLabels[category]}</h4>
                  <div className="grid grid-cols-8 gap-2">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji.name}
                        className="hover:bg-muted rounded p-1 text-center text-xl cursor-pointer"
                        title={emoji.name}
                        onClick={() => handleEmojiSelect(emoji.emoji)}
                      >
                        {emoji.emoji}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-8 gap-2">
              {emojiCategories[currentCategory as keyof typeof emojiCategories].map((emoji) => (
                <button
                  key={emoji.name}
                  className="hover:bg-muted rounded p-1 text-center text-xl cursor-pointer"
                  title={emoji.name}
                  onClick={() => handleEmojiSelect(emoji.emoji)}
                >
                  {emoji.emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

Emoji.displayName = 'Emoji'

export default Emoji