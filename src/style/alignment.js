export default function (editor, opts = {}) {
  opts = {
    name: "checkbox-alignment",
    selectedClassName: "selected",
    defaultValues: {
      align: "center",
    },
    labelLeft: "fas fa-objects-align-left",
    labelCenter: "fas fa-objects-align-center-horizontal",
    labelRight: "fas fa-objects-align-right",
    ...opts,
  };

  const { name, defaultValues, labelLeft, labelRight, labelCenter } = opts;
  const sm = editor.StyleManager;

  sm.addType(name, {
    // Create the UI
    create({ change }) {
      const el = document.createElement("div");
      el.classList.add(name, "gjs-sm-property--full");
      el.innerHTML = `<div class="gjs-field gjs-field-radio">
          <div class="gjs-radio-items">
            <div class="gjs-radio-item">
              <input type="radio" class="gjs-sm-radio" id="checkbox-align-left" name="align" value="left" ${
                defaultValues.align === "left" ? "checked" : ""
              }>
              <label class="gjs-radio-item-label gjs-sm-icon ${labelLeft}" for="checkbox-align-left"></label>
            </div>
            <div class="gjs-radio-item">
              <input type="radio" class="gjs-sm-radio" id="checkbox-align-center" name="align" value="center" ${
                defaultValues.align === "center" ? "checked" : ""
              }>
              <label class="gjs-radio-item-label gjs-sm-icon ${labelCenter}" for="checkbox-align-center"></label>
            </div>
            <div class="gjs-radio-item">
              <input type="radio" class="gjs-sm-radio" id="checkbox-align-bottom" name="align" value="right" ${
                defaultValues.align === "right" ? "checked" : ""
              }>
              <label class="gjs-radio-item-label gjs-sm-icon ${labelRight}" for="checkbox-align-bottom"></label>
            </div>
          </div>
        </div>
        `;

      this.inputEl = el;

      const radios = el.querySelectorAll('[name="align"]');
      radios.forEach((radio) => {
        radio.addEventListener("change", ({ target }) => {
          this.setAlignment(target.value);
        });
      });

      editor.on("component:selected", () => this.updateUI());

      return el;
    },

    // Propagate UI changes to target
    emit({ updateStyle }, { css, partial }) {},

    // Update UI when target is changed
    updateUI() {
      const { direction = "", alignItems } = this.getAlignment();
      const align = direction.includes("column")
        ? alignItems.includes("start")
          ? ""
          : alignItems === "center"
          ? "center"
          : "right"
        : "center";

      // set UI value based on label flex order
      const inputIn =
        this.inputEl && this.inputEl.querySelector(`[value="${align}"]`);
      inputIn && (inputIn.checked = true);
    },

    setAlignment(inAlign) {
      const { checkbox, direction = "" } = this.getAlignment();

      const align = direction.includes("column")
        ? {
            "align-items":
              inAlign === ""
                ? "flex-start"
                : inAlign === "center"
                ? "center"
                : "flex-end",
          }
        : {
            "align-items": "center",
          };
      checkbox.addStyle(align);
    },

    getAlignment() {
      const checkbox = editor.getSelected();

      if (!checkbox || !checkbox.getHolder0) return {};

      const box = checkbox.getHolder0();

      if (!box || !box.getStyle) return {};

      const direction = box.getStyle()["flex-direction"];
      const alignItems = box.getStyle()["align-items"] || "center";

      return {
        direction,
        checkbox: box,
        alignItems,
      };
    },

    // Clean memory if necessary
    destroy() {},
  });
}
