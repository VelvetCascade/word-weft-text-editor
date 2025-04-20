import * as React from 'react'
import type { Editor } from '@tiptap/react'
import type { VariantProps } from 'class-variance-authority'
import type { toggleVariants } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'
import {
  CaretDownIcon,
  TableIcon,
  PlusIcon,
  TrashIcon,
  MixerHorizontalIcon,
  DividerHorizontalIcon,
  CheckIcon
} from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { ToolbarButton } from '../toolbar-button'
import { ShortcutKey } from '../shortcut-key'

interface TableAction {
  label: string
  action: (editor: Editor) => void
  isActive?: (editor: Editor) => boolean
  icon?: React.ReactNode
  shortcuts?: string[]
  divider?: boolean
}

const tableActions: TableAction[] = [
  {
    label: 'Insert table',
    action: (editor) => editor.chain().focus().insertTable({ rows: 2, cols: 1, withHeaderRow: true }).run(),
    icon: <TableIcon className="ml-1 mr-2 size-4" />,
    shortcuts: ['mod', 'shift', 'T']
  },
  {
    divider: true,
    label: '',
    action: () => {}
  },
  {
    label: 'Add column before',
    action: (editor) => editor.chain().focus().addColumnBefore().run(),
    shortcuts: ['mod', 'alt', 'left']
  },
  {
    label: 'Add column after',
    action: (editor) => editor.chain().focus().addColumnAfter().run(),
    shortcuts: ['mod', 'alt', 'right']
  },
  {
    label: 'Delete column',
    action: (editor) => editor.chain().focus().deleteColumn().run(),
    shortcuts: ['mod', 'shift', 'X']
  },
  {
    divider: true,
    label: '',
    action: () => {}
  },
  {
    label: 'Add row before',
    action: (editor) => editor.chain().focus().addRowBefore().run(),
    shortcuts: ['mod', 'alt', 'up']
  },
  {
    label: 'Add row after',
    action: (editor) => editor.chain().focus().addRowAfter().run(),
    shortcuts: ['mod', 'alt', 'down']
  },
  {
    label: 'Delete row',
    action: (editor) => editor.chain().focus().deleteRow().run(),
    shortcuts: ['mod', 'shift', 'Delete']
  },
  {
    divider: true,
    label: '',
    action: () => {}
  },
  {
    label: 'Delete table',
    action: (editor) => editor.chain().focus().deleteTable().run(),
    icon: <TrashIcon className="mr-2 size-4" />,
    shortcuts: ['mod', 'alt', 'delete']
  },
  {
    divider: true,
    label: '',
    action: () => {}
  },
  {
    label: 'Merge cells',
    action: (editor) => editor.chain().focus().mergeCells().run(),
    icon: <MixerHorizontalIcon className="mr-2 size-4" />,
    shortcuts: ['mod', 'shift', 'M']
  },
  {
    label: 'Split cell',
    action: (editor) => editor.chain().focus().splitCell().run(),
    shortcuts: ['mod', 'shift', 'S']
  },
  {
    divider: true,
    label: '',
    action: () => {}
  },
  {
    label: 'Toggle header column',
    action: (editor) => editor.chain().focus().toggleHeaderColumn().run(),
    isActive: (editor) => editor.isActive({ columns: true }),
    shortcuts: ['mod', 'shift', 'C']
  },
  {
    label: 'Toggle header row',
    action: (editor) => editor.chain().focus().toggleHeaderRow().run(),
    isActive: (editor) => editor.isActive({ rows: true }),
    shortcuts: ['mod', 'shift', 'R']
  },
  {
    label: 'Toggle header cell',
    action: (editor) => editor.chain().focus().toggleHeaderCell().run(),
    isActive: (editor) => editor.isActive('tableHeader'),
    shortcuts: ['mod', 'shift', 'H']
  },
  {
    divider: true,
    label: '',
    action: () => {}
  },
  {
    label: 'Fix tables',
    action: (editor) => editor.chain().focus().fixTables().run(),
    shortcuts: ['mod', 'shift', 'F']
  },
  {
    label: 'Go to next cell',
    action: (editor) => editor.chain().focus().goToNextCell().run(),
    shortcuts: ['tab']
  },
  {
    label: 'Go to previous cell',
    action: (editor) => editor.chain().focus().goToPreviousCell().run(),
    shortcuts: ['shift', 'tab']
  }
]

interface SectionTableProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
}

export const SectionTable: React.FC<SectionTableProps> = React.memo(
  ({ editor, size, variant }) => {
    const isTableActive = editor.isActive('table')

    const renderTableActionMenuItem = React.useCallback(
      (action: TableAction) => {
        if (action.divider) {
          return <DropdownMenuSeparator key={`divider-${action.label}`} />
        }

        return (
          <DropdownMenuItem
            key={action.label}
            onClick={() => action.action(editor)}
            className={cn('flex flex-row items-center justify-between gap-4', {
              'bg-accent': action.isActive && action.isActive(editor)
            })}
            aria-label={action.label}
          >
            <div className="flex items-center">
              {action.icon}
              <span>{action.label}</span>
            </div>
            {action.shortcuts && <ShortcutKey keys={action.shortcuts} />}
          </DropdownMenuItem>
        )
      },
      [editor]
    )

    return (
      <div className="flex space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToolbarButton
              isActive={isTableActive}
              tooltip="Table options"
              aria-label="Table options"
              pressed={isTableActive}
              className="w-auto toolbar-text-icon-color"
              size={size}
              variant={variant}
            >
              <TableIcon className="ml-1 mr-2 size-5" />
              <span className="mr-2">Table</span>
              <CaretDownIcon className="size-5" />
            </ToolbarButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60">
            {tableActions.map(renderTableActionMenuItem)}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
)

SectionTable.displayName = 'SectionTable'

export default SectionTable