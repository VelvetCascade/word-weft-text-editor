import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {WriterRichTextEditor} from "@/editors/WriterRichTextEditor.tsx";
import {ReaderRichTextEditor} from "@/editors/ReadOnlyRichTextEditor.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EditableRichTextEditor />}/>
                <Route path="/read" element={<ViewOnlyRichTextEditor />}/>
            </Routes>
        </BrowserRouter>
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
