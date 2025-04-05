import React, { useState, useEffect } from 'react';
import {MinimalTiptapEditor} from "@/components/minimal-tiptap";

export const ReaderRichTextEditor: React.FC = () => {
    // State to store the content received from Wix
    const [content, setContent] = useState({
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

    // Set up event listener for messages from Wix when component mounts
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data) {
                // Update content state with data received from Wix
                setContent(event.data);
                console.log("Received content from Wix:", event.data);
                console.log(event.data);
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
            // onCreate={handleCreate}
            autofocus={true}
            immediatelyRender={true}
            editable={false}
            injectCSS={false}
            editorClassName="focus:outline-none p-5 flex-1"
        />
    );
};