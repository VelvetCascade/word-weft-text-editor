import * as React from 'react'
import type { Editor } from '@tiptap/react'
import type { Level } from '@tiptap/extension-heading'
import type { FormatAction } from '../../types'
import type { VariantProps } from 'class-variance-authority'
import type { toggleVariants } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'
import { CaretDownIcon, LetterCaseCapitalizeIcon, CheckIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ToolbarButton } from '../toolbar-button'
import { ShortcutKey } from '../shortcut-key'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useTheme } from '../../hooks/use-theme'

interface TextStyle extends Omit<FormatAction, 'value' | 'icon' | 'action' | 'isActive' | 'canExecute'> {
  element: keyof React.JSX.IntrinsicElements
  level?: Level
  className: string
}

interface FontFamilyStyle extends Omit<FormatAction, 'value' | 'icon' | 'action' | 'isActive' | 'canExecute'> {
  fontFamily: string
  className: string
}

interface ColorItem {
  cssVar: string
  label: string
  darkLabel?: string
}

interface ColorPalette {
  label: string
  colors: ColorItem[]
  inverse: string
}

const formatActions: TextStyle[] = [
  {
    label: 'Normal Text',
    element: 'span',
    className: 'grow ',
    shortcuts: ['mod', 'alt', '0']
  },
  {
    label: 'Heading 1',
    element: 'h1',
    level: 1,
    className: 'm-0 grow text-3xl font-extrabold',
    shortcuts: ['mod', 'alt', '1']
  },
  {
    label: 'Heading 2',
    element: 'h2',
    level: 2,
    className: 'm-0 grow text-xl font-bold',
    shortcuts: ['mod', 'alt', '2']
  },
  {
    label: 'Heading 3',
    element: 'h3',
    level: 3,
    className: 'm-0 grow text-lg font-semibold ',
    shortcuts: ['mod', 'alt', '3']
  },
  {
    label: 'Heading 4',
    element: 'h4',
    level: 4,
    className: 'm-0 grow text-base font-semibold ',
    shortcuts: ['mod', 'alt', '4']
  },
  {
    label: 'Heading 5',
    element: 'h5',
    level: 5,
    className: 'm-0 grow text-sm font-normal ',
    shortcuts: ['mod', 'alt', '5']
  },
  {
    label: 'Heading 6',
    element: 'h6',
    level: 6,
    className: 'm-0 grow text-sm font-normal ',
    shortcuts: ['mod', 'alt', '6']
  }
]

const fontFamilyActions: FontFamilyStyle[] = [
  {
    label: 'Sans Serif',
    fontFamily: 'sans-serif',
    className: 'grow font-sans',
    shortcuts: ['mod', 'shift', '1']
  },
  {
    label: 'Serif',
    fontFamily: 'serif',
    className: 'grow font-serif',
    shortcuts: ['mod', 'shift', '2']
  },
  {
    label: 'Monospace',
    fontFamily: 'monospace',
    className: 'grow font-mono',
    shortcuts: ['mod', 'shift', '3']
  },
  {
    label: 'Cursive',
    fontFamily: 'cursive',
    className: 'grow',
    shortcuts: ['mod', 'shift', '4']
  },
  {
    label: 'Fantasy',
    fontFamily: 'fantasy',
    className: 'grow',
    shortcuts: ['mod', 'shift', '5']
  }
]

const COLORS: ColorPalette[] = [
  {
    label: 'Palette 1',
    inverse: 'hsl(var(--background))',
    colors: [
      { cssVar: 'black', label: 'Default' },
      { cssVar: 'var(--mt-accent-bold-blue)', label: 'Bold blue' },
      { cssVar: 'var(--mt-accent-bold-teal)', label: 'Bold teal' },
      { cssVar: 'var(--mt-accent-bold-green)', label: 'Bold green' },
      { cssVar: 'var(--mt-accent-bold-orange)', label: 'Bold orange' },
      { cssVar: 'var(--mt-accent-bold-red)', label: 'Bold red' },
      { cssVar: 'var(--mt-accent-bold-purple)', label: 'Bold purple' }
    ]
  },
  {
    label: 'Palette 2',
    inverse: 'hsl(var(--background))',
    colors: [
      { cssVar: 'var(--mt-accent-gray)', label: 'Gray' },
      { cssVar: 'var(--mt-accent-blue)', label: 'Blue' },
      { cssVar: 'var(--mt-accent-teal)', label: 'Teal' },
      { cssVar: 'var(--mt-accent-green)', label: 'Green' },
      { cssVar: 'var(--mt-accent-orange)', label: 'Orange' },
      { cssVar: 'var(--mt-accent-red)', label: 'Red' },
      { cssVar: 'var(--mt-accent-purple)', label: 'Purple' }
    ]
  },
  {
    label: 'Palette 3',
    inverse: 'hsl(var(--foreground))',
    colors: [
      { cssVar: 'yellow', label: 'Yellow', darkLabel: 'Yellow' },
      { cssVar: 'var(--mt-accent-blue-subtler)', label: 'Blue subtle' },
      { cssVar: 'var(--mt-accent-teal-subtler)', label: 'Teal subtle' },
      { cssVar: 'var(--mt-accent-green-subtler)', label: 'Green subtle' },
      { cssVar: 'var(--mt-accent-yellow-subtler)', label: 'Yellow subtle' },
      { cssVar: 'var(--mt-accent-red-subtler)', label: 'Red subtle' },
      { cssVar: 'var(--mt-accent-purple-subtler)', label: 'Purple subtle' }
    ]
  }
]

const MemoizedColorButton = React.memo<{
  color: ColorItem
  isSelected: boolean
  inverse: string
  onClick: (value: string) => void
}>(({ color, isSelected, inverse, onClick }) => {
  const isDarkMode = useTheme()
  const label = isDarkMode && color.darkLabel ? color.darkLabel : color.label

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ToggleGroupItem
          tabIndex={0}
          className="relative size-7 rounded-md p-0"
          value={color.cssVar}
          aria-label={label}
          style={{ backgroundColor: color.cssVar }}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            onClick(color.cssVar)
          }}
        >
          {isSelected && <CheckIcon className="absolute inset-0 m-auto size-6" style={{ color: inverse }} />}
        </ToggleGroupItem>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
})

MemoizedColorButton.displayName = 'MemoizedColorButton'

const MemoizedColorPicker = React.memo<{
  palette: ColorPalette
  selectedColor: string
  inverse: string
  onColorChange: (value: string) => void
}>(({ palette, selectedColor, inverse, onColorChange }) => (
  <ToggleGroup
    type="single"
    value={selectedColor}
    onValueChange={(value: string) => {
      if (value) onColorChange(value)
    }}
    className="gap-1.5"
  >
    {palette.colors.map((color, index) => (
      <MemoizedColorButton
        key={index}
        inverse={inverse}
        color={color}
        isSelected={selectedColor === color.cssVar}
        onClick={onColorChange}
      />
    ))}
  </ToggleGroup>
))

MemoizedColorPicker.displayName = 'MemoizedColorPicker'

interface SectionOneProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
  activeLevels?: Level[]
}

export const SectionOne: React.FC<SectionOneProps> = React.memo(
  ({ editor, activeLevels = [1, 2, 3, 4, 5, 6], size, variant }) => {
    const [activeFontFamily, setActiveFontFamily] = React.useState()
    const color = editor.getAttributes('textStyle')?.color || 'hsl(var(--foreground))'
    const [selectedColor, setSelectedColor] = React.useState(color)

    const filteredActions = React.useMemo(
      () => formatActions.filter(action => !action.level || activeLevels.includes(action.level)),
      [activeLevels]
    )

    // Text style handling
    const handleStyleChange = React.useCallback(
      (level?: Level) => {
        if (level) {
          editor.chain().focus().toggleHeading({ level }).run()
        } else {
          editor.chain().focus().setParagraph().run()
        }
      },
      [editor]
    )

    // Font family handling
    const handleFontFamilyChange = React.useCallback(
      (fontFamily: string) => {
        editor.chain().focus().setFontFamily(fontFamily).run()
        setActiveFontFamily(fontFamily)
      },
      [editor]
    )

    // Color handling
    const handleColorChange = React.useCallback(
      (value: string) => {
        setSelectedColor(value)
        editor.chain().setColor(value).run()
      },
      [editor]
    )

    // React.useEffect(() => {
    //     // Set default font family when component mounts
    //     if (editor && editor.isEditable) {
    //         handleFontFamilyChange(fontFamilyActions[0].fontFamily)
    //     }
    // }, [editor, handleFontFamilyChange])

    React.useEffect(() => {
      setSelectedColor(color)
    }, [color])

    const isFontFamilyActive = React.useCallback(
      (fontFamily: string) => {
        return editor.isActive('textStyle', { fontFamily })
      },
      [editor]
    )

    // Get current text style
    const getCurrentTextStyle = React.useCallback(() => {
      for (const level of activeLevels) {
        if (editor.isActive('heading', { level })) {
          return formatActions.find(action => action.level === level)
        }
      }
      if (editor.isActive('paragraph')) {
        return formatActions[0]
      }
      return formatActions[0]
    }, [editor, activeLevels])

    // Get current font family
    const getCurrentFontFamily = React.useCallback(() => {
      for (const style of fontFamilyActions) {
        if (isFontFamilyActive(style.fontFamily)) {
          return style
        }
      }
      // Return the first item as default, but don't apply it automatically
      return fontFamilyActions[0]
    }, [isFontFamilyActive])

    const currentTextStyle = getCurrentTextStyle()
    const currentFontFamily = getCurrentFontFamily()

    const renderTextStyleMenuItem = React.useCallback(
      ({ label, element: Element, level, className, shortcuts }: TextStyle) => (
        <DropdownMenuItem
          key={label}
          onClick={() => handleStyleChange(level)}
          className={cn('flex flex-row items-center justify-between gap-4', {
            'bg-accent': level ? editor.isActive('heading', { level }) : editor.isActive('paragraph')
          })}
          aria-label={label}
        >
          <Element className={className}>{label}</Element>
          <ShortcutKey keys={shortcuts} />
        </DropdownMenuItem>
      ),
      [editor, handleStyleChange]
    )

    const renderFontFamilyMenuItem = React.useCallback(
      ({ label, fontFamily, className, shortcuts }: FontFamilyStyle) => (
        <DropdownMenuItem
          key={fontFamily}
          onClick={() => handleFontFamilyChange(fontFamily)}
          className={cn('flex flex-row items-center justify-between gap-4', {
            'bg-accent': isFontFamilyActive(fontFamily)
          })}
          aria-label={label}
        >
          <span className={className} style={{ fontFamily }}>{label}</span>
          <ShortcutKey keys={shortcuts} />
        </DropdownMenuItem>
      ),
      [handleFontFamilyChange, isFontFamilyActive]
    )

    return (
      <div className="flex space-x-2">
        {/* Text Style Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToolbarButton
              isActive={editor.isActive('heading')}
              tooltip="Text styles"
              aria-label="Text styles"
              pressed={editor.isActive('heading')}
              className="w-auto min-w-25 toolbar-text-icon-color"
              disabled={editor.isActive('codeBlock')}
              size={size}
              variant={variant}
            >
              <span className="mr-2 flex-grow text-center">{currentTextStyle?.label || 'Normal Text'}</span>
              <CaretDownIcon className="size-5" />
            </ToolbarButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-full">
            {filteredActions.map(renderTextStyleMenuItem)}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Font Family Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToolbarButton
              isActive={editor.isActive('textStyle', { fontFamily: currentFontFamily.fontFamily })}
              tooltip="Font Family"
              aria-label="Font Family"
              pressed={editor.isActive('textStyle', { fontFamily: currentFontFamily.fontFamily })}
              className="w-auto min-w-25 toolbar-text-icon-color"
              disabled={editor.isActive('codeBlock')}
              size={size}
              variant={variant}
            >
  <span
    className="mr-2 flex-grow text-center"
    style={{
      fontFamily: editor.isActive('textStyle', { fontFamily: currentFontFamily.fontFamily }) ?
        currentFontFamily.fontFamily : ''
    }}
  >
    {currentFontFamily.label}
  </span>
              <CaretDownIcon className="size-5" />
            </ToolbarButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-full">
            {fontFamilyActions.map(renderFontFamilyMenuItem)}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Color Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <ToolbarButton tooltip="Text color" aria-label="Text color" className="w-12" size={size} variant={variant}>
              <div
                className="flex items-center justify-center size-6 rounded border border-gray-300"
                style={{ backgroundColor: '#EED7BF' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                  style={{ color: selectedColor }}
                >
                  <path d="M4 20h16" />
                  <path d="m6 16 6-12 6 12" />
                  <path d="M8 12h8" />
                </svg>
              </div>
            </ToolbarButton>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-full">
            <div className="space-y-1.5">
              {COLORS.map((palette, index) => (
                <MemoizedColorPicker
                  key={index}
                  palette={palette}
                  inverse={palette.inverse}
                  selectedColor={selectedColor}
                  onColorChange={handleColorChange}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)

SectionOne.displayName = 'SectionOne'

export default SectionOne