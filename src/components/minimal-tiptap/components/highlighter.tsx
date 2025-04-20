import * as React from 'react'
import type { Editor } from '@tiptap/react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import ToolbarButton from '@/components/minimal-tiptap/components/toolbar-button.tsx'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx'
import { FaFillDrip } from "react-icons/fa6";
import { useTheme } from '../hooks/use-theme'
import type { VariantProps } from 'class-variance-authority'
import type { toggleVariants } from '@/components/ui/toggle.tsx'
import type { Level } from '@tiptap/extension-heading'
import { CheckIcon } from '@radix-ui/react-icons'



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

interface HighlighterProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
  activeLevels?: Level[]
}


const COLORS: ColorPalette[] = [
  {
    label: 'Palette 1',
    inverse: 'hsl(var(--background))',
    colors: [
      { cssVar: 'hsl(var(--foreground))', label: 'Default' },
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
      { cssVar: 'hsl(var(--background))', label: 'Unset Highlight' },
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

const HighlighterPopover: React.FC<HighlighterProps> = React.memo(
  ({ editor, size, variant }) => {
    const color = editor.getAttributes('highlight')?.color || 'hsl(var(--foreground))'
    const [selectedColor, setSelectedColor] = React.useState(color)
    const handleColorChange = React.useCallback(
      (value: string) => {
        console.log("colour:::", value)
        setSelectedColor(value)
        editor.chain().focus().toggleHighlight({color: value}).run()
      },
      [editor]
    )

    React.useEffect(() => {
      setSelectedColor(color)
    }, [color])

    return (
      <Popover>
        <PopoverTrigger asChild>
          <ToolbarButton tooltip="Highlight" aria-label="Highlight" className="w-7" size={size} variant={variant}>
            <div
              className="flex items-center justify-center size-6 rounded border border-gray-300"
              style={{ backgroundColor: '#EED7BF' }}
            >
              <FaFillDrip className="size-5" style={{ color: selectedColor }} />
              {/*<svg*/}
              {/*  xmlns="http://www.w3.org/2000/svg"*/}
              {/*  width="24"*/}
              {/*  height="24"*/}
              {/*  viewBox="0 0 24 24"*/}
              {/*  fill="none"*/}
              {/*  stroke="currentColor"*/}
              {/*  strokeWidth="2"*/}
              {/*  strokeLinecap="round"*/}
              {/*  strokeLinejoin="round"*/}
              {/*  className="size-5"*/}
              {/*  style={{ color: selectedColor }}*/}
              {/*>*/}
              {/*  <path d="M4 20h16" />*/}
              {/*  <path d="m6 16 6-12 6 12" />*/}
              {/*  <path d="M8 12h8" />*/}
              {/*</svg>*/}

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
    )
  }
)
export { HighlighterPopover }