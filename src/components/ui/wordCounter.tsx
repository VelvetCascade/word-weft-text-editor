import { FaCircle } from 'react-icons/fa';
import React from 'react';
import { Editor } from '@tiptap/react';

type WordCounterProps = {
    editor: Editor;
};

export const WordCounter: React.FC<WordCounterProps> = ({ editor }) => {
    if (!editor) return null;

    const characters = editor.storage.characterCount.characters();
    const words = editor.storage.characterCount.words();

    return (
        <div className="flex items-center gap-2 ml-4 mb-2">
            <FaCircle className="size-5 shrink-0 toolbar-icon-text-dark" />
            <div className="text-sm toolbar-icon-text-dark">
                {characters} characters
                <br />
                {words} words
            </div>
        </div>
    );
};
