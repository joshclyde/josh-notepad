import { type EditorState, type SerializedEditorState } from "lexical";
import { useCallback, useEffect, useState } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

const theme = {
  // Theme styling goes here
  //...
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

export const NoteEditor = ({
  onChange: onChangeProp,
  initialEditorState,
}: {
  onChange: (editorState: EditorState) => void;
  initialEditorState: SerializedEditorState;
}) => {
  const initialConfig: InitialConfigType = {
    namespace: "MyEditor",
    theme,
    editorState: JSON.stringify(initialEditorState) || undefined,
    onError,
  };

  const [editorState, setEditorState] = useState<EditorState>();

  const onChange = useCallback(
    (newEditorState: EditorState) => {
      setEditorState(newEditorState);
      onChangeProp(newEditorState);
    },
    [setEditorState],
  );

  if (editorState) {
    console.log(JSON.stringify(editorState.toJSON()));
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div>
        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none" />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <MyOnChangePlugin onChange={onChange} />
      </div>
    </LexicalComposer>
  );
};
