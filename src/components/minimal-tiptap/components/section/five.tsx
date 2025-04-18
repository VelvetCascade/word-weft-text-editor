import * as React from 'react'
import type { Editor } from '@tiptap/react'
import type { FormatAction } from '../../types'
import type { toggleVariants } from '@/components/ui/toggle'
import type { VariantProps } from 'class-variance-authority'
import { CaretDownIcon, CodeIcon, DividerHorizontalIcon, PlusIcon, QuoteIcon } from '@radix-ui/react-icons'
import { LuSubscript, LuSuperscript } from "react-icons/lu"
import { LinkEditPopover } from '../link/link-edit-popover'
import { ToolbarSection } from '../toolbar-section'
import { TbListDetails } from "react-icons/tb"
import { CiTextAlignCenter, CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight } from "react-icons/ci"
import { IoIosRedo, IoIosUndo } from "react-icons/io"
import { ToolbarButton } from '../toolbar-button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

type InsertElementAction = 'codeBlock' | 'blockquote' | 'horizontalRule' | 'details' | 'subscript' | 'superscript' | 'ta-left' |'ta-center'|'ta-right' | 'ta-justify' | 'undo'| 'redo'
interface InsertElement extends FormatAction {
  value: InsertElementAction
}


const standardFormatActions: InsertElement[] = [
  {
    value: 'codeBlock',
    label: 'Code block',
    icon: <CodeIcon className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().toggleCodeBlock().run(),
    isActive: editor => editor.isActive('codeBlock'),
    canExecute: editor => editor.can().chain().focus().toggleCodeBlock().run(),
    shortcuts: ['mod', 'alt', 'C']
  },
  {
    value: 'blockquote',
    label: 'Blockquote',
    icon: <QuoteIcon className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().toggleBlockquote().run(),
    isActive: editor => editor.isActive('blockquote'),
    canExecute: editor => editor.can().chain().focus().toggleBlockquote().run(),
    shortcuts: ['mod', 'shift', 'B']
  },
  {
    value: 'horizontalRule',
    label: 'Divider',
    icon: <DividerHorizontalIcon className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().setHorizontalRule().run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().setHorizontalRule().run(),
    shortcuts: ['mod', 'alt', '-']
  },
  {
    value: 'details',
    label: 'Details',
    icon: <TbListDetails className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().setDetails().run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().setDetails().run(),
    shortcuts: ['mod', 'alt', '-']
  },
  {
    value: 'undo',
    label: 'Undo',
    icon: <IoIosUndo className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().undo().run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().undo().run(),
    shortcuts: ['mod', 'alt', '-']
  },
  {
    value: 'redo',
    label: 'Redo',
    icon: <IoIosRedo className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().redo().run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().redo().run(),
    shortcuts: ['mod', 'alt', '-']
  }
]


const scriptFormatActions: InsertElement[] = [
  {
    value: 'subscript',
    label: 'Subscript',
    icon: <LuSubscript className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().toggleSubscript().run(),
    isActive: editor => editor.isActive('subscript'),
    canExecute: editor => editor.can().chain().focus().toggleSubscript().run(),
    shortcuts: ['mod', 'alt', '-']
  },
  {
    value: 'superscript',
    label: 'Superscript',
    icon: <LuSuperscript className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().toggleSuperscript().run(),
    isActive: editor => editor.isActive('superscript'),
    canExecute: editor => editor.can().chain().focus().toggleSuperscript().run(),
    shortcuts: ['mod', 'alt', '-']
  }
]

const alignFormatActions: InsertElement[] = [
  {
    value: 'ta-left',
    label: 'Left Align',
    icon: <CiTextAlignLeft className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().setTextAlign('left').run(),
    isActive: editor => editor.isActive({ textAlign: 'left' }),
    canExecute: editor => editor.can().chain().focus().setTextAlign('left').run(),
    shortcuts: ['mod', 'alt', '-']
  },
  {
    value: 'ta-center',
    label: 'Center Align',
    icon: <CiTextAlignCenter className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().setTextAlign('center').run(),
    isActive: editor => editor.isActive({ textAlign: 'center' }),
    canExecute: editor => editor.can().chain().focus().setTextAlign('center').run(),
    shortcuts: ['mod', 'alt', '-']
  },
  {
    value: 'ta-right',
    label: 'Right Align',
    icon: <CiTextAlignRight className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().setTextAlign('right').run(),
    isActive: editor => editor.isActive({ textAlign: 'right' }),
    canExecute: editor => editor.can().chain().focus().setTextAlign('right').run(),
    shortcuts: ['mod', 'alt', '-']
  },
  {
    value: 'ta-justify',
    label: 'Justify',
    icon: <CiTextAlignJustify className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().setTextAlign('justify').run(),
    isActive: editor => editor.isActive({ textAlign: 'justify' }),
    canExecute: editor => editor.can().chain().focus().setTextAlign('justify').run(),
    shortcuts: ['mod', 'alt', '-']
  }
]


const formatActions: InsertElement[] = [
  ...standardFormatActions,
  ...scriptFormatActions,
  ...alignFormatActions
]

interface SectionFiveProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
  activeActions?: InsertElementAction[]
  mainActionCount?: number
}

export const SectionFive: React.FC<SectionFiveProps> = ({
                                                          editor,
                                                          activeActions = formatActions.map(action => action.value),
                                                          mainActionCount = 0,
                                                          size,
                                                          variant
                                                        }) => {

  const getCurrentAlignment = React.useCallback(() => {
    for (const align of alignFormatActions) {
      if (align.isActive(editor)) {
        return align;
      }
    }
    return alignFormatActions[0];
  }, [editor]);

  const currentAlignment = getCurrentAlignment();

  return (
    <>
      <LinkEditPopover editor={editor} size={size} variant={variant} />

      {/* Script Format Dropdown (Subscript/Superscript) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ToolbarButton
            isActive={editor.isActive('subscript') || editor.isActive('superscript')}
            tooltip="Script Format"
            aria-label="Script Format"
            className="toolbar-text-icon-color mx-1"
            size={size}
            variant={variant}
          >
            {editor.isActive('subscript') ? (
              <LuSubscript className="size-5" />
            ) : editor.isActive('superscript') ? (
              <LuSuperscript className="size-5" />
            ) : (
              <LuSuperscript className="size-5" />
            )}
            <CaretDownIcon className="size-2 ml-1" />
          </ToolbarButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {scriptFormatActions.map((action) => (
            <DropdownMenuItem
              key={action.value}
              onClick={() => action.action(editor)}
              className="flex items-center gap-2"
            >
              {action.icon}
              <span>{action.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ToolbarButton
            isActive={editor.isActive({ textAlign: 'left' }) ||
              editor.isActive({ textAlign: 'center' }) ||
              editor.isActive({ textAlign: 'right' }) ||
              editor.isActive({ textAlign: 'justify' })}
            tooltip="Text Alignment"
            aria-label="Text Alignment"
            className="toolbar-text-icon-color mx-1"
            size={size}
            variant={variant}
          >
            {currentAlignment.icon}
            <CaretDownIcon className="size-2 ml-1" />
          </ToolbarButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {alignFormatActions.map((action) => (
            <DropdownMenuItem
              key={action.value}
              onClick={() => action.action(editor)}
              className="flex items-center gap-2"
            >
              {action.icon}
              <span>{action.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Standard Toolbar Section with remaining items */}
      <ToolbarSection
        editor={editor}
        actions={standardFormatActions}
        activeActions={activeActions.filter(action =>
          !scriptFormatActions.some(a => a.value === action) &&
          !alignFormatActions.some(a => a.value === action)
        )}
        mainActionCount={mainActionCount}
        dropdownIcon={
          <>
            <PlusIcon className="size-5" />
            <CaretDownIcon className="size-5" />
          </>
        }
        dropdownTooltip="Insert elements"
        size={size}
        variant={variant}
      />
    </>
  )
}

SectionFive.displayName = 'SectionFive'

export default SectionFive