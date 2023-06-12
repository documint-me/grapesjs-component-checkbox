import Toggle from "./Toggle";
import Label from "./Label";
import Checkbox from "./Checkbox";
import Icon from "./Icon";
import Holder from "./Holder";

export default (editor, config = {}) => {
  const dc = editor.DomComponents;
  const opts = {
    ...config,
    editor,
  };

  [Toggle, Label, Icon, Holder, Checkbox].forEach((c) => c(dc, opts));
};
