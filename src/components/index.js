import Toggle from "./Toggle";
import Label from "./Label";
import Checkbox from "./Checkbox";
import Icon from "./Icon";

export default (editor, config = {}) => {
  const dc = editor.DomComponents;
  const opts = {
    ...config,
    editor,
  };

  [Toggle, Label, Icon, Checkbox].forEach((c) => c(dc, opts));
};
