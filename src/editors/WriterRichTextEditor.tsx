import { useCallback, useRef, useState } from 'react'
import { Editor } from '@tiptap/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx'
import { MinimalTiptapEditor } from '@/components/minimal-tiptap'
import { cn } from '@/lib/utils.ts'
import { Button } from '@/components/ui/button.tsx'
import { z } from 'zod'
// import PropertiesReader from 'properties-reader';
//
// const properties = PropertiesReader('src/config.properties');

const formSchema = z.object({
  description: z
    .string({
      required_error: 'Description is required'
    })
    .min(0, 'Description is required')
})

type FormValues = z.infer<typeof formSchema>

export const WriterRichTextEditor: React.FC = () => {
  const editorRef = useRef<Editor | null>(null)
  const [lastSaveTime, setLastSaveTime] = useState(Date.now())
  let AUTO_SAVE_INTERVAL = 60000
  console.log("time::::", AUTO_SAVE_INTERVAL)// Autosave every 6 seconds
  const [showPopup, setShowPopup] = useState(false)

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

  const handleChange = useCallback(() => {
    const currentTime = Date.now()

    // Check if enough time has passed since the last save
    if (AUTO_SAVE_INTERVAL == null){
      AUTO_SAVE_INTERVAL = 60000
    }
    if (currentTime - lastSaveTime >= AUTO_SAVE_INTERVAL && editorRef.current != null) {
      console.log('Sending Data to WIX Fir AutoSave')
      let dataToBeSentToWix = {
        eventType: 'auto_save',
        stats: {
          characterCount: editorRef.current.storage.characterCount.characters(),
          wordCount: editorRef.current.storage.characterCount.words()
        },
        content: editorRef.current?.getJSON()
      }
      console.log(dataToBeSentToWix)
      window.parent.postMessage(dataToBeSentToWix, 'https://wordweft.wixstudio.com/')

      // Update the last save time
      setLastSaveTime(currentTime)

      // Show popup
      setShowPopup(true)
    }
  }, [setShowPopup, lastSaveTime])

  const hidePopup = useCallback(() => {
    setShowPopup(false)
  }, [])

  const onSubmit = (values: FormValues) => {
    console.log('==Getting values from form==')

    console.log('Posting Message')
    let dataToBeSentToWix = {
      eventType: 'final_save',
      stats: {
        characterCount: editorRef.current?.storage.characterCount.characters(),
        wordCount: editorRef.current?.storage.characterCount.words()
      },
      content: editorRef.current?.getJSON()
    }
    console.log(dataToBeSentToWix)
    window.parent.postMessage(dataToBeSentToWix, 'https://wordweft.wixstudio.com/')
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
                  placeholder="From thoughts to threads - Your story starts here..."
                  onCreate={handleCreate}
                  autofocus={true}
                  immediatelyRender={true}
                  editable={true}
                  injectCSS={false}
                  editorClassName="focus:outline-none p-5 flex-1"
                  onChange={handleChange}
                  autoSaveShow={showPopup}
                  autoSaveOnFinish={hidePopup}
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