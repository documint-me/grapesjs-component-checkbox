import { TYPES } from "../consts";

export default (domComponents, { editor, ...config }) => {
  const { iconProps = {} } = config;
  const type = iconProps.type || TYPES.icon;

  const def = {
    model: {
      defaults: {
        name: "Icon",
        tagName: "i",
        draggable: `[data-gs-type="${TYPES.checkbox}"]`, // this can be DRAGGED INTO THESE components
        droppable: false,
        highlightable: false,
        layerable: false,
        selectable: false,
        hoverable: false,
        traits: [],
        ...config.iconProps,
      },

      setIcon(icon) {
        // Change icon class
      },
    },
  };

  // Force defaults
  const { styles = "" } = def.model.defaults;
  const defaultStyles = ` [data-gjs-type="${type}"]{ color: inherit; }`;
  def.model.defaults.styles = styles + defaultStyles;

  domComponents.addType(type, def);
};
