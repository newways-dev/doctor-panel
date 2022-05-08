import React from 'react'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'

function HistoryDraft({ event }) {
  const convertedEvent = convertFromRaw(event[1].eventComments)
  const editorState = EditorState.createWithContent(convertedEvent)

  return <Editor editorState={editorState} readOnly={true} />
}

export default HistoryDraft
