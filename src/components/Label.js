import { TYPES } from "../consts";

export default (domComponents, { editor, ...config }) => {
  const { labelProps = {} } = config;
  const type = labelProps.type || TYPES.label;

  const def = {
    extend: "text",
    model: {
      defaults: {
        name: "Label",
        tagName: "label",
        draggable: `[data-gs-type="${TYPES.checkbox}"]`, // this can be DRAGGED INTO THESE components
        droppable: false,
        highlightable: false,
        layerable: false,
        selectable: false,
        hoverable: false,
        editable: false,
        traits: [],
        ...config.labelProps,
      },

      setText(text) {
        this.components(text);
      },
    },
  };

  // Force defaults
  const { styles = "" } = def.model.defaults;
  const defaultStyles = ` [data-gjs-type="${type}"]{ color: inherit; font-family: inherit; }`;
  def.model.defaults.styles = styles + defaultStyles;

  domComponents.addType(type, def);
};
