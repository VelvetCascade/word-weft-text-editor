import * as React from 'react'
import type { Editor } from '@tiptap/react'
import type { FormatAction } from '../../types'
import type { toggleVariants } from '@/components/ui/toggle'
import type { VariantProps } from 'class-variance-authority'
import { CaretDownIcon, ListBulletIcon } from '@radix-ui/react-icons'
import { ToolbarSection } from '../toolbar-section'
import {HiMiniNumberedList} from "react-icons/hi2";

type ListItemAction = 'orderedList' | 'bulletList'
interface ListItem extends FormatAction {
  value: ListItemAction
}

const formatActions: ListItem[] = [
  {
    value: 'orderedList',
    label: 'Numbered list',
    icon: <HiMiniNumberedList className="size-5 toolbar-text-icon-color"/>,
    isActive: editor => editor.isActive('orderedList'),
    action: editor => editor.chain().focus().toggleOrderedList().run(),
    canExecute: editor => editor.can().chain().focus().toggleOrderedList().run(),
    shortcuts: ['mod', 'shift', '7']
  },
  {
    value: 'bulletList',
    label: 'Bullet list',
    icon: <ListBulletIcon className="size-5 toolbar-text-icon-color" />,
    isActive: editor => editor.isActive('bulletList'),
    action: editor => editor.chain().focus().toggleBulletList().run(),
    canExecute: editor => editor.can().chain().focus().toggleBulletList().run(),
    shortcuts: ['mod', 'shift', '8']
  }
]

interface SectionFourProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
  activeActions?: ListItemAction[]
  mainActionCount?: number
}

export const SectionFour: React.FC<SectionFourProps> = ({
  editor,
  activeActions = formatActions.map(action => action.value),
  mainActionCount = 0,
  size,
  variant
}) => {
  return (
    <ToolbarSection
      editor={editor}
      actions={formatActions}
      activeActions={activeActions}
      mainActionCount={mainActionCount}
      dropdownIcon={
        <>
          <ListBulletIcon className="size-5" />
          <CaretDownIcon className="size-5" />
        </>
      }
      dropdownTooltip="Lists"
      size={size}
      variant={variant}
    />
  )
}

SectionFour.displayName = 'SectionFour'

export default SectionFour
