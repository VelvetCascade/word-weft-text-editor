import { MinimalTiptapEditor } from './components/minimal-tiptap'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from './lib/utils'
import { Hero } from './components/custom/hero'
import { BentoMinimalTiptap } from './components/custom/types'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { StarterKit } from '@tiptap/starter-kit'
import { createExtensions } from '@/components/minimal-tiptap/hooks/use-minimal-tiptap.ts'

export default function App() {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 flex flex-col">
                <RichTextEditor/>
            </div>
        </div>
    )
}

const formSchema = z.object({
  description: z
      .string({
        required_error: 'Description is required'
      })
      .min(1, 'Description is required')
})

type FormValues = z.infer<typeof formSchema>

export const RichTextEditor: React.FC = () => {
  const editorRef = useRef<Editor | null>(null)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: ''
    }
  })

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues('description') && editor.isEmpty) {
        editor.commands.setContent(form.getValues('description'))
      }
      editorRef.current = editor
    },
    [form]
  )

  const onSubmit = (values: FormValues) => {
    console.log('==Getting values from form==')
    console.log(editorRef.current?.getJSON())
    console.log("Posting Message")
    window.parent.postMessage(editorRef.current?.getHTML(), "https://wordweft.wixstudio.com/");
    console.log('Success: Values retrieved from form')

    setTimeout(() => {
      console.log('==Clearing form==')
      form.reset()
      console.log('Success: Form cleared')
    }, 1000)

    setTimeout(() => {
      console.log('==Clearing editor==')
      editorRef.current?.commands.clearContent()
      console.log('Success: Editor cleared')
    }, 2000)

    setTimeout(() => {
      console.log('==Resetting editor==')
      editorRef.current?.commands.setContent('')
      console.log('Success: Editor reset')
    }, 3000)

    setTimeout(() => {
      console.log('==Setting editor content==')
      editorRef.current?.commands.setContent(values.description)
      console.log('Success: Editor content set')
    }, 4000)
  }

  return (
      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-screen w-full">
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col">
                            <FormLabel className="sr-only">Description</FormLabel>
                            <FormControl>
                                <MinimalTiptapEditor
                                    {...field}
                                    throttleDelay={0}
                                    className={cn('flex-1 flex flex-col h-full', {
                                        'border-destructive focus-within:border-destructive': form.formState.errors.description
                                    })}
                                    editorContentClassName="flex-1"
                                    output="html"
                                    placeholder="Type your description here..."
                                    onCreate={handleCreate}
                                    autofocus={true}
                                    immediatelyRender={true}
                                    editable={true}
                                    injectCSS={false}
                                    editorClassName="focus:outline-none p-5 flex-1"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="p-4 border-t">
                    <Button type="submit" size="lg" className="w-full">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    )
}
