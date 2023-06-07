import loadComponents from "./components";
import loadBlocks from "./blocks";
import defaultOptions from "./options";
import style from "./style";

export default (editor, opts = {}) => {
  const options = {
    ...defaultOptions,
    ...opts,
  };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // Add style types
  style(editor, options);
};
