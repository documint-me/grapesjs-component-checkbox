import Toggle from "./Toggle";
import Label from "./Label";
import Checkbox from "./Checkbox";

export default (editor, config = {}) => {
  const dc = editor.DomComponents;
  const opts = {
    ...config,
    editor,
  };

  [Toggle, Label, Checkbox].forEach((c) => c(dc, opts));
};
