import React, {useState, useEffect, useRef, useCallback} from 'react';
import {MinimalTiptapEditor} from "@/components/minimal-tiptap";
import {Editor} from "@tiptap/react";

export const ReaderRichTextEditor: React.FC = () => {

    const editorRef = useRef<Editor | null>(null)
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
            if (editor.isEmpty) {
                editor.commands.setContent(content)
            }
            editorRef.current = editor
        },
        []
    )

    // Set up event listener for messages from Wix when component mounts
    useEffect(() => {
        const handleMessage = (event) => {
            const trustedOrigins = ['http://localhost:5173', 'https://wordweft.wixstudio.com'];

            if (!trustedOrigins.includes(event.origin)) {
                console.warn(`Rejected message from untrusted origin: ${event.origin}`);
                return;
            }

            if (event.data) {
                // Update content state with data received from Wix
                editorRef.current?.commands.setContent(event.data);
                console.log("Received content from Wix:", event.data);
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
            content={content}
            output="html"
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