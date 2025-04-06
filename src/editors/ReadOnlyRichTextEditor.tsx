import React, {useState, useEffect, useRef, useCallback} from 'react';
import {MinimalTiptapEditor} from "@/components/minimal-tiptap";
import {Editor} from "@tiptap/react";

export const ReaderRichTextEditor: React.FC = () => {

    const editorRef = useRef<Editor | null>(null)

    const messageQueue = useRef<any[]>([]);

    // State to store the content received from Wix
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

    const handleCreate = useCallback(
        ({editor}: { editor: Editor }) => {
            if (editor.isEmpty && messageQueue.current.length == 0) {
                console.log("Editor Is empty and no queue data present");
                editor.commands.setContent(content)
                console.log("Default Content Successfully set");
            }
            else if(editor.isEmpty){
                const queuedData = messageQueue.current.shift();
                console.log("Editor Is empty but queue data present", queuedData);
                editor.commands.setContent(queuedData);
                console.log("Content Successfully set");
            }
            editorRef.current = editor
            window.parent.postMessage(editorRef.current.getHTML(), "https://wordweft.wixstudio.com/");
        },
        []
    )

    // Set up event listener for messages from Wix when component mounts
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
                if(editorRef.current){
                    console.log("Updating editor with data: ", event.data);
                    editorRef.current.commands.setContent(event.data);
                }
                else{
                    console.log("Pushing Data to Queue", event.data);
                    messageQueue.current.push(event.data);
                }
            }
        };

        // Add event listener
        window.addEventListener('message', handleMessage);

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <MinimalTiptapEditor
            {...{description: ""}}
            throttleDelay={0}
            editorContentClassName="flex-1"
            output="json"
            placeholder="Type your description here..."
            onCreate={handleCreate}
            autofocus={true}
            immediatelyRender={true}
            editable={false}
            injectCSS={false}
            editorClassName="focus:outline-none p-5 flex-1"
        />
    );
};