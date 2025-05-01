import {NodeViewContent, NodeViewWrapper} from '@tiptap/react'
import React from 'react'
import ReactSpoiler from "react-spoiler";

const Component: React.FC = (props) => {
    return (
        <NodeViewWrapper style={{ textAlign: props.node.attrs.textAlign }}>
            <ReactSpoiler blur={10}>
                <NodeViewContent className="content is-editable" />
            </ReactSpoiler>
        </NodeViewWrapper>
    )
}

export default Component;