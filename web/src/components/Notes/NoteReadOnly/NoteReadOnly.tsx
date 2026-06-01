import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import type { SerializedEditorState } from "lexical";
import { useMemo } from "react";

export function ReadOnlyEditor({
  editorState,
  className,
}: {
  editorState: SerializedEditorState;
  className?: string;
}) {
  const initialConfig = useMemo(
    (): InitialConfigType => ({
      namespace: "MyReadOnlyEditor",
      editable: false,
      editorState: JSON.stringify(editorState) || undefined,
      theme: {},
      onError: (error) => console.error(error),
    }),
    [],
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {/* <div className="border border-purple p-2 m-2 rounded-md"> */}
      <div className={className}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-read-only" />}
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </LexicalComposer>
  );
}
