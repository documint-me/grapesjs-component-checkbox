import { TYPES } from "../consts";

export default (domComponents, { editor, ...config }) => {
  const { labelProps = {} } = config;
  const type = labelProps.type || TYPES.label;

  const def = {
    extend: 'text',
    model: {
      defaults: {
        name: "Label",
        tagName: 'label',
        components: 'Label',
        draggable: `[data-gs-type="${TYPES.checkbox}"]`, // this can be DRAGGED INTO THESE components
        droppable: false,
        highlightable: false,
        layerable: false,
        selectable: false,
        hoverable: false,
        traits: [],
        ...config.labelProps,
      },

      init() {},
    },
  };

  // Force defaults
  const { styles = "" } = def.model.defaults;
  const defaultStyles = ` [data-gjs-type="${type}"]{ display: flex; }`;
  def.model.defaults.styles = styles + defaultStyles;

  domComponents.addType(type, def);
};
