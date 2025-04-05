import {MinimalTiptapEditor} from "@/components/minimal-tiptap";

export const ReaderRichTextEditor: React.FC = () => {

    return (
        <MinimalTiptapEditor
            {...{description: ""}}
            throttleDelay={0}
            editorContentClassName="flex-1"
            content={{
                "type": "doc",
                "content": [
                    {
                        "type": "paragraph",
                        "content": [
                            {
                                "type": "text",
                                "text": "hiiiii"
                            }
                        ]
                    }
                ]
            }
            }
            output="html"
            placeholder="Type your description here..."
            // onCreate={handleCreate}
            autofocus={true}
            immediatelyRender={true}
            editable={false}
            injectCSS={false}
            editorClassName="focus:outline-none p-5 flex-1"
            // content={}
        />
    )
}