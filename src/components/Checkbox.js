import { TYPES } from "../consts";

export const protectedCss = `
[data-gjs-type="${TYPES.checkbox}"] input {
  display: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: inherit;
  border: none;
  background-color: rgba(0,0,0,0);
  box-sizing: border-box;
  width: 100%;
  position: relative;
  padding: 5px;
  z-index: 1;
}
[data-gjs-type="${TYPES.checkbox}"] i {
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  box-sizing: border-box;
  display: block;
  height: 14px;
  margin: 0 5px;
  width: 6px;
}
[data-gjs-type="${TYPES.checkbox}"] [data-type="radio"] i {
  height: 1px;
  width: 1px;
  margin: 3px;
}
[data-gjs-type="${TYPES.checkbox}"] [data-type="xbox"] i {
  display: contents;
}
[data-gjs-type="${TYPES.checkbox}"] [data-type="xbox"] i:before,
[data-gjs-type="${TYPES.checkbox}"] [data-type="xbox"] i:after {
  position: absolute;
  left: 7.5px;
  content: ' ';
  height: 17px;
  border-width: 0;
  border-color: inherit;
  border-style: solid;
}
[data-gjs-type="${TYPES.checkbox}"] [data-type="xbox"] i:before {
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
}
[data-gjs-type="${TYPES.checkbox}"] [data-type="xbox"] i:after {
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
[data-gjs-type="${TYPES.checkbox}"] input:checked + i {
  border-color: inherit;
  border-width: 0 2px 2px 0;
  border-style: solid;
}
[data-gjs-type="${TYPES.checkbox}"] [data-type="radio"] input:checked + i {
  border-width: 11px 11px 0 0;
  border-radius: 50%;
}
[data-gjs-type="${TYPES.checkbox}"] [data-type="xbox"] input:checked + i:before,
[data-gjs-type="${TYPES.checkbox}"] [data-type="xbox"] input:checked + i:after {
  border-width: 0 2px 0 0;
}
[data-gjs-type="${TYPES.checkbox}"] [data-gjs-type="${TYPES.holder}"] {
  margin: 0 3px;
  padding: 0;
  width: 17px;
  height: 17px;
  display: block;
  cursor: pointer;
  background-color: rgba(0,0,0,.1);
  border: none;
  box-shadow: none;
  border-radius: 2px;
  box-sizing: border-box;
  position: relative;
}
[data-gjs-type="${TYPES.checkbox}"] [data-gjs-type="${TYPES.holder}"][data-type="radio"] {
  border-radius: 50%;
}
`;

export default (domComponents, { editor, ...config }) => {
  const { checkboxProps = {} } = config;
  const type = checkboxProps.type || TYPES.checkbox;

  const def = {
    model: {
      defaults: {
        name: "Checkbox",
        traits: [
          {
            name: "data-value",
            type: "select",
            options: [
              { value: "static", name: "Static" },
              { value: "variable", name: "Variable" },
            ],
            label: "Value",
          },
          {
            name: "varName",
            label: "Variable Name",
            parent: "data-value=variable",
            placeholder: "e.g. var",
            changeProp: true,
          },
          {
            name: "varTrue",
            label: "True Value",
            parent: "data-value=variable",
            placeholder: "true",
            changeProp: true,
          },
          {
            name: "checked",
            parent: "data-value=static",
            type: "checkbox",
            changeProp: true,
          },
        ],
        attributes: {
          "data-value": "static",
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

        this.on("change:attributes:data-value", this.handleValueChange);
        this.on("change:varName", this.handleVariableChange);
        this.on("change:checked", this.handleCheckedChange);

        this.afterInit();
      },

      afterInit() {},

      handleValueChange() {
        const value = this.getAttributes()["data-value"];
        if (value === "static") this.handleCheckedChange();
        else this.handleVariableChange();
      },

      handleVariableChange() {
        const varName = this.get("varName");
        this.getCheckbox().addAttributes({
          checked: false,
          "data-helper": varName ? `{{${varName}}}` : '',
        });
      },

      handleCheckedChange() {
        const checked = !!this.get("checked");
        this.getCheckbox().addAttributes({ checked });
      },

      getHolder0() {
        try {
          return this.components().models[0];
        } catch (error) {
          return false;
        }
      },

      getHolder() {
        try {
          return this.components().models[0].components().models[0];
        } catch (error) {
          return false;
        }
      },

      getLabel() {
        try {
          return this.components().models[0].components().models[1];
        } catch (error) {
          return false;
        }
      },

      getCheckbox() {
        try {
          return this.components().models[0].components().models[0].components()
            .models[0];
        } catch (error) {
          return false;
        }
      },

      getCheckIcon() {
        try {
          return this.components().models[0].components().models[0].components()
            .models[1];
        } catch (error) {
          return false;
        }
      },
    },
  };

  // Force defaults
  const { styles = "" } = def.model.defaults;
  const defaultStyles = ` [data-gjs-type="${type}"]{ display: flex; align-items: center; justify-content: center; padding: 10px; }`;
  def.model.defaults.styles = styles + defaultStyles;

  domComponents.addType(type, def);
};
