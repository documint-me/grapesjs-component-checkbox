import textPosition from "./textPosition";
import boxType from "./boxType";

export default (editor, config = {}) => {
  textPosition(editor, config);
  boxType(editor, config);
};
