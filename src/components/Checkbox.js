import { TYPES } from "../consts";

export default (domComponents, { editor, ...config }) => {
  const { checkboxProps = {} } = config;
  const type = checkboxProps.type || TYPES.checkbox;

  const def = {
    model: {
      defaults: {
        name: "Checkbox",
        text: "I'm a Checkbox",
        traits: [
          {
            name: "text",
            label: "Label Text",
            changeProp: true,
          },
          {
            name: "data-value",
            type: "select",
            options: [
              { value: "true", name: "Static" },
              { value: "false", name: "Variable" },
            ],
            label: "Value",
          },
          {
            name: "varName",
            label: "Variable Name",
            parent: "data-value=false",
            changeProp: true,
          },
          {
            name: "checked",
            parent: "data-value=true",
            type: "checkbox",
            changeProp: true,
          },
        ],
        attributes: {
          "data-value": "true"
        },
        ...config.checkboxProps,
      },

      init() {
        const model = this;
        const traits = model.getTraits();
        const attrs = model.getAttributes();
        const childTraits = traits.filter((trait) => trait.get("parent"));
        const selectTraits = traits.filter(
          (trait) => trait.get("type") === "select"
        );

        childTraits.forEach((trait) => {
          const parent = trait.get("parent");
          if (parent) {
            const values = parent.split("=");
            if (values[1]) {
              const def = attrs[values[0]];
              const dep = values[1];
              const isBool = typeof def === "boolean";
              const isNum = typeof def === "number";
              const parentValue = isBool
                ? dep === "true"
                  ? true
                  : false
                : isNum
                ? parseFloat(dep)
                : dep;
              if (def !== parentValue) {
                model.updateTrait(trait.get("name"), {
                  attributes: { style: "display: none;" },
                });
              }
            } else if (!attrs[parent]) {
              model.updateTrait(trait.get("name"), {
                attributes: { style: "display: none;" },
              });
            }
          }
        });

        selectTraits.forEach((trait) => {
          const name = trait.get("name");
          model.on(`change:attributes:${name}`, (ev) => {
            const myChildTraits = childTraits.filter(
              (trait) => trait.get("parent").split("=")[0] === name
            );
            myChildTraits.forEach((trait) => {
              const parent = trait.get("parent").split("=").pop();
              const changed = ev.changed.attributes[name];
              const isBool = typeof changed === "boolean";
              const isNum = typeof changed === "number";
              const parentValue = isBool
                ? parent === "true"
                  ? true
                  : false
                : isNum
                ? parseFloat(parent)
                : parent;
              const display = changed === parentValue ? "block" : "none";
              //@ts-ignore
              trait && (trait.view.el.style.display = display);
            });
          });
        });

        const comps = this.components().models[1].components();
        const tChild =  comps.length === 1 && comps.models[0];
        const chCnt = (tChild && tChild.is('textnode') && tChild.get('content')) || '';
        const text = chCnt || this.get('text');
        this.set('text', text);
        this.on('change:text', this.__onTextChange);
        (text !== chCnt) && this.__onTextChange();

        this.on('change:varName', this.handleVariableChange);
        this.on('change:checked', this.handleCheckedChange);
      },

      handleVariableChange() {
        const checked = this.get('varName')
        this.getCheckbox().addAttributes({ checked: `{{${checked}}}` })
      },

      handleCheckedChange() {
        const checked = this.get('checked')
        this.getCheckbox().addAttributes({ checked })
      },

      getLabel() {
        return this.components().models[1];
      },

      getCheckbox() {
        return this.components().models[0];
      },

      __onTextChange() {
        this.getLabel().setText(this.get('text'));
      },
    },
  };

  // Force defaults
  const { styles = "" } = def.model.defaults;
  const defaultStyles = ` [data-gjs-type="${type}"]{ display: flex; align-items: center; justify-content: center; }`;
  def.model.defaults.styles = styles + defaultStyles;

  domComponents.addType(type, def);
};
