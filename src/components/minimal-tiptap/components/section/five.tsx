import * as React from 'react'
import type { Editor } from '@tiptap/react'
import type { FormatAction } from '../../types'
import type { toggleVariants } from '@/components/ui/toggle'
import type { VariantProps } from 'class-variance-authority'
import { CaretDownIcon, CodeIcon, DividerHorizontalIcon, PlusIcon, QuoteIcon } from '@radix-ui/react-icons'
import {LuSubscript, LuSuperscript} from "react-icons/lu";
import { LinkEditPopover } from '../link/link-edit-popover'
import { ToolbarSection } from '../toolbar-section'
import {TbListDetails} from "react-icons/tb";
import {CiTextAlignCenter, CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight} from "react-icons/ci";
import {IoIosRedo, IoIosUndo} from "react-icons/io";

type InsertElementAction = 'codeBlock' | 'blockquote' | 'horizontalRule' | 'details' | 'subscript' | 'superscript' | 'ta-left' |'ta-center'|'ta-right' | 'ta-justify' | 'undo'| 'redo'
interface InsertElement extends FormatAction {
  value: InsertElementAction
}

const formatActions: InsertElement[] = [
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
    value: 'subscript',
    label: 'Subscript',
    icon: <LuSubscript className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().toggleSubscript().run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().toggleSubscript().run(),
    shortcuts: ['mod', 'alt', '-']
  },
  {
    value: 'superscript',
    label: 'Superscript',
    icon: <LuSuperscript className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().toggleSuperscript().run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().toggleSuperscript().run(),
    shortcuts: ['mod', 'alt', '-']
  },
  {
    value: 'ta-left',
    label: 'Left Align',
    icon: <CiTextAlignLeft className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().setTextAlign('left').run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().setTextAlign('left').run(),
    shortcuts: ['mod', 'alt', '-']
  },
  {
    value: 'ta-right',
    label: 'Right Align',
    icon: <CiTextAlignRight className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().setTextAlign('right').run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().setTextAlign('right').run(),
    shortcuts: ['mod', 'alt', '-']
  },
  {
    value: 'ta-center',
    label: 'Center Align',
    icon: <CiTextAlignCenter className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().setTextAlign('center').run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().setTextAlign('center').run(),
    shortcuts: ['mod', 'alt', '-']
  },
  {
    value: 'ta-justify',
    label: 'Justify',
    icon: <CiTextAlignJustify className="size-5 toolbar-text-icon-color" />,
    action: editor => editor.chain().focus().setTextAlign('justify').run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().setTextAlign('justify').run(),
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
  return (
    <>
      <LinkEditPopover editor={editor} size={size} variant={variant} />
      {/*<ImageEditDialog editor={editor} size={size} variant={variant} />*/}
      <ToolbarSection
        editor={editor}
        actions={formatActions}
        activeActions={activeActions}
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
