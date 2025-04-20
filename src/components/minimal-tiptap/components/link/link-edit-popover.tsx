import * as React from 'react'
import type { Editor } from '@tiptap/react'
import type { VariantProps } from 'class-variance-authority'
import type { toggleVariants } from '@/components/ui/toggle'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FaYoutube } from "react-icons/fa";
import { ToolbarButton } from '../toolbar-button'
import { LinkEditBlock } from './link-edit-block'

interface LinkEditPopoverProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
}

const LinkEditPopover = ({ editor, size, variant }: LinkEditPopoverProps) => {
  const [open, setOpen] = React.useState(false)

  const { from, to } = editor.state.selection
  const text = editor.state.doc.textBetween(from, to, ' ')

  const onSetLink = React.useCallback(
    (url: string) => {

      const validateUrl = (url: string): boolean => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
        const match = url.match(regExp)
        console.log(match)
        console.log(!!(match && match[2].length === 11))
        return !!(match && match[2].length === 11);
      }
      if (validateUrl(url)) {
        editor.commands.setYoutubeVideo({
          src: url,
          width: 640,
          height: 480
        })

        editor.commands.enter()
        setOpen(false)
      }
    },
    [editor]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ToolbarButton
          isActive={editor.isActive('link')}
          tooltip="Youtube"
          aria-label="Insert link"
          disabled={editor.isActive('codeBlock')}
          size={size}
          variant={variant}
        >
          <FaYoutube className="size-5 toolbar-text-icon-color" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-80" align="end" side="bottom">
        <LinkEditBlock onSave={onSetLink} defaultText={text} />
      </PopoverContent>
    </Popover>
  )
}

export { LinkEditPopover }
