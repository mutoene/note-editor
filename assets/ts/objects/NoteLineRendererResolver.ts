import Lane from "./Lane";
import NoteLine from "./NoteLine";
import NoteLineRenderer, { INoteLineRenderer } from "./NoteLineRenderer";
import Pixi from "../Pixi";

export default class NoteLineRendererResolver {
  static resolve(noteLine: NoteLine): INoteLineRenderer {
    const headNote = Pixi.instance!.injected.editor!.currentChart!.timeline.notes.find(
      n => n.guid === noteLine.head
    )!;

    const customRenderer = Pixi.instance!.injected.editor!.currentChart!.musicGameSystem!.customNoteLineRenderers.find(
      cnlr => cnlr.target === headNote.type
    );

    if (!customRenderer) return NoteLineRenderer;

    if (customRenderer.rendererReference) {
      return {
        customRender: customRenderer.rendererReference as any,
        render: NoteLineRenderer.render
      };
    } else return NoteLineRenderer;
  }
}