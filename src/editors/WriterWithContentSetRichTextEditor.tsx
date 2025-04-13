import { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";

const formSchema = z.object({
    description: z
        .string({
            required_error: 'Description is required'
        })
        .min(1, 'Description is required')
})

type FormValues = z.infer<typeof formSchema>

export const WriterWithContentSetRichTextEditor: React.FC = () => {
    const editorRef = useRef<Editor | null>(null)
    const [showPopup, setShowPopup] = useState(false);

    const [content] = useState({
        "type": "doc",
        "content": [
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "Waiting for content from Wix..."
                    }
                ]
            }
        ]
    });

    const handleChange = useCallback(
        () => {
            if(1 === Math.floor(Math.random() * 30) && editorRef.current != null){
                console.log("Sending Data to WIX for AutoSave");
                window.parent.postMessage(editorRef.current?.getJSON(), "https://wordweft.wixstudio.com/");

                // Show popup
                setShowPopup(true);
            }
        },
        [setShowPopup]
    )

    const hidePopup = useCallback(() => {
        setShowPopup(false);
    }, []);

    const handleCreate = useCallback(
        ({editor}: { editor: Editor }) => {
            editorRef.current = editor
            if (editor.isEmpty) {
                console.log("Editor Is empty");
                editor.commands.setContent(content)
                console.log("Default Content Successfully set");
            }
            console.log("Pinging Wix Studio for Content");
            window.parent.postMessage("Editor:Ready:Ping:Edit", "https://wordweft.wixstudio.com/");
            console.log("Pinged Wix Studio for Content");
        },
        []
    )

    useEffect(() => {
        const handleMessage = (event) => {
            console.log("Received some event")
            console.log(event)
            const trustedOrigins = ['http://localhost:5173', 'https://wordweft.wixstudio.com'];

            if (!trustedOrigins.includes(event.origin)) {
                console.warn(`Rejected message from untrusted origin: ${event.origin}`);
                return;
            }

            console.log("Editor is:", editorRef.current);
            console.log("Received content from Wix:", event.data);

            if (event.data) {
                // Update content state with data received from Wix
                console.log("Updating editor with data: ", event.data);
                editorRef.current?.commands.setContent(event.data);
            }
        };

        // Add event listener
        window.addEventListener('message', handleMessage);

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: ''
        }
    })

    const onSubmit = (values: FormValues) => {
        console.log('==Getting values from form==')
        console.log(editorRef.current?.getJSON())
        console.log("Posting Message")
        window.parent.postMessage(editorRef.current?.getJSON(), "https://wordweft.wixstudio.com/");
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
        <>
            <div className="relative">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-screen w-full">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
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
                                            onChange={handleChange}
                                            autoSaveShow={showPopup}
                                            autoSaveOnFinish={hidePopup}
                                        />
                                    </FormControl>
                                    <FormMessage/>
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
            </div>
        </>
    )
}