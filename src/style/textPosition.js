export default function (editor, opts = {}) {
  opts = {
    name: "checkbox-text-position",
    selectedClassName: "selected",
    defaultValues: {
      position: "right",
    },
    labelLeft: "fas fa-arrow-left",
    labelRight: "fas fa-arrow-right",
    labelTop: "fas fa-arrow-up",
    labelBottom: "fas fa-arrow-down",
    ...opts,
  };

  const { name, defaultValues, labelLeft, labelRight, labelTop, labelBottom } =
    opts;
  const sm = editor.StyleManager;

  sm.addType(name, {
    // Create the UI
    create({ change }) {
      const el = document.createElement("div");
      el.classList.add(name, "gjs-sm-property--full");
      el.innerHTML = `<div class="gjs-field gjs-field-radio">
        <div class="gjs-radio-items">
          <div class="gjs-radio-item">
            <input type="radio" class="gjs-sm-radio" id="checkbox-text-top" name="pos" value="top" ${
              defaultValues.position === "top" ? "checked" : ""
            }>
            <label class="gjs-radio-item-label gjs-sm-icon ${labelTop}" for="checkbox-text-top"></label>
          </div>
          <div class="gjs-radio-item">
            <input type="radio" class="gjs-sm-radio" id="checkbox-text-right" name="pos" value="right" ${
              defaultValues.position === "right" ? "checked" : ""
            }>
            <label class="gjs-radio-item-label gjs-sm-icon ${labelRight}" for="checkbox-text-right"></label>
          </div>
          <div class="gjs-radio-item">
            <input type="radio" class="gjs-sm-radio" id="checkbox-text-bottom" name="pos" value="bottom" ${
              defaultValues.position === "bottom" ? "checked" : ""
            }>
            <label class="gjs-radio-item-label gjs-sm-icon ${labelBottom}" for="checkbox-text-bottom"></label>
          </div>
          <div class="gjs-radio-item">
            <input type="radio" class="gjs-sm-radio" id="checkbox-text-left" name="pos" value="left" ${
              defaultValues.position === "left" ? "checked" : ""
            }>
            <label class="gjs-radio-item-label gjs-sm-icon ${labelLeft}" for="checkbox-text-left"></label>
          </div>
        </div>
      </div>
      `;

      this.inputEl = el;

      const radios = el.querySelectorAll('[name="pos"]');
      radios.forEach((radio) => {
        radio.addEventListener("change", ({ target }) => {
          this.setLabelPosition(target.value);
        });
      });

      editor.on("component:selected", () => this.updateUI());

      return el;
    },

    // Propagate UI changes to target
    emit({ updateStyle }, { css, partial }) {},

    // Update UI when target is changed
    updateUI() {
      const { pos, label } = this.getLabelPosition();

      // set UI value based on label flex order
      const inputIn =
        this.inputEl && this.inputEl.querySelector(`[value="${pos}"]`);
      inputIn && (inputIn.checked = true);
      this.updateAlignment(pos === "" || pos === "bottom")
    },

    setLabelPosition(inPos) {
      const { pos, label, checkbox } = this.getLabelPosition();

      // set style based on value from UI
      const dir =
        inPos === "" || inPos === "bottom"
          ? { "flex-direction": inPos === "" ? "column-reverse" : "column", "align-items": "center" }
          : { "flex-direction": "row", "align-items": "center" };
      label.addStyle({ order: inPos === "left" ? "-1" : "1" });
      checkbox.addStyle(dir);
      this.updateAlignment(inPos === "" || inPos === "bottom")
    },

    getLabelPosition() {
      const checkbox = editor.getSelected();

      if (!checkbox || !checkbox.getLabel || !checkbox.getHolder0) return {};

      const label = checkbox.getLabel();

      if (!label || !label.getStyle) return {};

      const order = label.getStyle().order;
      const direction = checkbox.getHolder0().getStyle()["flex-direction"];

      return {
        pos:
          direction === "column"
            ? "bottom"
            : direction === "column-reverse"
            ? ""
            : order === "-1"
            ? "left"
            : "right",
        label,
        checkbox: checkbox.getHolder0(),
      };
    },

    updateAlignment(isCol) {
      const al = sm.getProperty('label', 'checkbox-alignment');
      if (al && al.view && al.view.$el) {
        if (isCol) {
          al.view.$el.show()
        } else {
          al.view.$el && al.view.$el.hide()
        }
      }
    },

    // Clean memory if necessary
    destroy() {},
  });
}
