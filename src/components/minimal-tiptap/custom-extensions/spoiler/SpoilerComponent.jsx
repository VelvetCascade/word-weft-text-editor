import {NodeViewContent, NodeViewWrapper} from '@tiptap/react'
import React from 'react'
import ReactSpoiler from "react-spoiler";

export default props => {
    return (
        <NodeViewWrapper>
            <ReactSpoiler blur={10}>
                <NodeViewContent className="content is-editable" />
            </ReactSpoiler>
        </NodeViewWrapper>
    )
}