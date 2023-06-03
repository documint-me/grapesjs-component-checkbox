import { TYPES } from "../consts";

export default (domComponents, { editor, ...config }) => {
  const { toggleProps = {} } = config;
  const type = toggleProps.type || TYPES.toggle;

  const def = {
    model: {
      defaults: {
        name: "Toggle",
        tagName: 'input',
        draggable: `[data-gs-type="${TYPES.checkbox}"]`, // this can be DRAGGED INTO THESE components
        droppable: false,
        highlightable: false,
        layerable: false,
        selectable: false,
        copyable: false,
        hoverable: false,
        attributes: { type: 'checkbox' }, // OR radio
        traits: [],
        ...config.toggleProps,
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
