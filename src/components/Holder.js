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

  const defDeepCopy = JSON.parse(JSON.stringify(def));

  // Force defaults
  const { styles = "" } = def.model.defaults;
  const defaultStyles = ` [data-gjs-type="${type}"]{ color: inherit; }`;
  def.model.defaults.styles = styles + defaultStyles;

  domComponents.addType(type, def);

  const defaultStyles2 = ` [data-gjs-type="${type}-2"]{ color: inherit; display: flex; width: auto; align-items: center; justify-content: center; }`;
  defDeepCopy.model.defaults.attributes = {};
  defDeepCopy.model.defaults.styles = styles + defaultStyles2;

  domComponents.addType(type + "-2", defDeepCopy);
};
