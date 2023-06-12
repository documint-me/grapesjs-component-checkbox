import textPosition from "./textPosition";
import boxType from "./boxType";
import boxIcon from "./boxIcon";
import alignment from "./alignment";

export default (editor, config = {}) => {
  textPosition(editor, config);
  boxType(editor, config);
  boxIcon(editor, config);
  alignment(editor, config);
};
