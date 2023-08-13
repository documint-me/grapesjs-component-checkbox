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
        attributes: { type: "checkbox" }, // OR radio
        traits: [],
        ...config.toggleProps,
      },

      changeType() {},

      getWrapper() {
        try {
          return this.parent().parent().parent();
        } catch (error) {
          return false;
        }
      },

      toHTML(opts = {}) {
        const model = this;
        const attrs = [];
        const customTag = opts.tag;
        const tag = customTag || model.get("tagName");
        const sTag = model.get("void");
        const customAttr = opts.attributes;
        let attributes = this.getAttrToHTML();
        delete opts.tag;

        // Get custom attributes if requested
        if (customAttr) {
          attributes = customAttr;
        }

        for (let attr in attributes) {
          const val = attributes[attr];

          if (!val !== undefined && val !== null) {
            if (typeof val === "boolean") {
              val && attrs.push(attr);
            } else {
              let valueRes = "";
              if (
                opts.altQuoteAttr &&
                typeof val === "string" &&
                val.indexOf('"') >= 0
              ) {
                valueRes = `'${val.replace(/'/g, "&apos;")}'`;
              } else {
                const value =
                  typeof val === "string" ? val.replace(/"/g, "&quot;") : val;
                valueRes = `"${value}"`;
              }

              attrs.push(`${attr}=${valueRes}`);
            }
          }
        }

        const wrapper = this.getWrapper();
        let varName;
        let varTrue;
        if (wrapper) {
          varName = wrapper.get("varName");
          varTrue = wrapper.get("varTrue");
        }
        const helper = varName
          ? `{{$checked ${varName} ${varTrue ? `"${varTrue}"` : ""}}}`
          : "";

        const attrString = attrs.length ? ` ${attrs.join(" ")}` : "";
        const inner = model.getInnerHTML(opts);
        let code = `<${tag}${attrString} ${helper}${sTag ? "/" : ""}>${inner}`;
        !sTag && (code += `</${tag}>`);

        return code;
      },
    },
  };

  // Force defaults
  const { styles = "" } = def.model.defaults;
  const defaultStyles = ` [data-gjs-type="${type}"]{ color: inherit; }`;
  def.model.defaults.styles = styles + defaultStyles;

  domComponents.addType(type, def);
};
