export default function (editor, opts = {}) {
  opts = {
    name: "checkbox-box-type",
    selectedClassName: "selected",
    defaultValues: {
      type: "checkbox",
    },
    options: [
      {
        value: "checkbox",
      },
      {
        label: "x box",
        value: "xbox",
      },
      {
        value: "radio",
      },
      {
        value: "custom",
      },
    ],
    ...opts,
  };

  const { name, defaultValues, options } = opts;
  const sm = editor.StyleManager;

  sm.addType(name, {
    // Create the UI
    create({ change }) {
      const el = document.createElement("div");
      el.classList.add(name, "gjs-sm-property--full");
      el.innerHTML = `<div class="gjs-field gjs-select">
        <span id="box-type">
          <select>
            ${options
              .map(
                (o) =>
                  `<option value="${o.value}" ${
                    defaultValues.type === o.value ? "selected" : ""
                  }>${o.label || o.value}</option>`
              )
              .join("")}
          </select>
        </span>
        <div class="gjs-sel-arrow">
          <div class="gjs-d-s-arrow"></div>
        </div>
      </div>
      `;

      this.inputEl = el;

      el.querySelector("select").addEventListener("change", ({ target }) => {
        this.setBoxType(target.value);
      });

      this.em.on("component:selected", () => this.updateUI());

      return el;
    },

    // Propagate UI changes to target
    emit({ updateStyle }, { css, partial }) {},

    // Update UI when target is changed
    updateUI() {
      const { box, boxType } = this.getBoxType();

      // set UI value based on label flex order
      const inputIn = this.inputEl && this.inputEl.querySelector("select");
      inputIn && (inputIn.value = boxType);
    },

    setBoxType(inType) {
      const { box, boxType } = this.getBoxType();

      // set style based on value from UI
      box.addAttributes({ type: inType });
    },

    getBoxType() {
      const checkbox = this.em.getSelected();

      if (!checkbox || !checkbox.getCheckbox) return {};

      const box = checkbox.getCheckbox();

      if (!box || !box.getAttributes) return {};

      const boxType = box.getAttributes().type;

      return { box, boxType };
    },

    // Clean memory if necessary
    destroy() {},
  });
}
