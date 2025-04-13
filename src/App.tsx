import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {WriterRichTextEditor} from "@/editors/WriterRichTextEditor.tsx";
import {ReaderRichTextEditor} from "@/editors/ReadOnlyRichTextEditor.tsx";
import {WriterWithContentSetRichTextEditor} from "@/editors/WriterWithContentSetRichTextEditor.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EditableRichTextEditor />}/>
                <Route path="/edit" element={<EditableWithContentSetRichTextEditor />}/>
                <Route path="/read" element={<ViewOnlyRichTextEditor />}/>
            </Routes>
        </BrowserRouter>
    )
}

const EditableWithContentSetRichTextEditor = () => {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 flex flex-col">
                <WriterWithContentSetRichTextEditor/>
            </div>
        </div>
    )
}

const EditableRichTextEditor = () => {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 flex flex-col">
                <WriterRichTextEditor/>
            </div>
        </div>
    )
}

const ViewOnlyRichTextEditor = () => {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 flex flex-col">
                <ReaderRichTextEditor/>
            </div>
        </div>
    )
}
