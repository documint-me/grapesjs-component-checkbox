import { TYPES } from "../consts";

export default (domComponents, { editor, ...config }) => {
  const { holderProps = {} } = config;
  const type = holderProps.type || TYPES.holder;

  const def = {
    model: {
      defaults: {
        name: "Holder",
        draggable: `[data-gs-type="${TYPES.checkbox}"]`, // this can be DRAGGED INTO THESE components
        droppable: false,
        highlightable: false,
        layerable: false,
        selectable: false,
        hoverable: false,
        traits: [],
        attributes: { "data-type": "checkbox" },
        ...config.holderProps,
      },
    },
  };

  // Force defaults
  const { styles = "" } = def.model.defaults;
  const defaultStyles = ` [data-gjs-type="${type}"]{ color: inherit; }`;
  def.model.defaults.styles = styles + defaultStyles;

  domComponents.addType(type, def);
};
