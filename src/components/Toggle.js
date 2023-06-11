import { TYPES } from "../consts";

export default (domComponents, { editor, ...config }) => {
  const { toggleProps = {} } = config;
  const type = toggleProps.type || TYPES.toggle;

  const def = {
    model: {
      defaults: {
        name: "Toggle",
        tagName: "input",
        draggable: `[data-gs-type="${TYPES.checkbox}"]`, // this can be DRAGGED INTO THESE components
        droppable: false,
        highlightable: false,
        layerable: false,
        selectable: false,
        copyable: false,
        hoverable: false,
        attributes: { type: "checkbox", "data-type": "checkbox" }, // OR radio
        traits: [],
        ...config.toggleProps,
      },

      init() {},

      changeType() {},
    },
  };

  // Force defaults
  const { styles = "" } = def.model.defaults;
  const defaultStyles = ` [data-gjs-type="${type}"]{ color: inherit; }`;
  def.model.defaults.styles = styles + defaultStyles;

  domComponents.addType(type, def);
};
