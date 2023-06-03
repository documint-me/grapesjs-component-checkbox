import { TYPES } from "../consts";

export default (domComponents, { editor, ...config }) => {
  const { checkboxProps = {} } = config;
  const type = checkboxProps.type || TYPES.checkbox;

  const def = {
    model: {
      defaults: {
        name: "Checkbox",
        traits: [], // Value/true/false/variable 
        ...config.checkboxProps,
      },

      init() {},
    },
  };

  // Force defaults
  const { styles = "" } = def.model.defaults;
  const defaultStyles = ` [data-gjs-type="${type}"]{ display: flex; align-items: center; justify-content: center; }`;
  def.model.defaults.styles = styles + defaultStyles;

  domComponents.addType(type, def);
};
