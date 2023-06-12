export default function (editor, opts = {}) {
  opts = {
    name: "checkbox-text-position",
    selectedClassName: "selected",
    defaultValues: {
      position: "right",
    },
    labelLeft: "Left",
    labelRight: "Right",
    labelTop: "Top",
    labelBottom: "Bottom",
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
            <label class="gjs-radio-item-label" for="checkbox-text-top">${labelTop}</label>
          </div>
          <div class="gjs-radio-item">
            <input type="radio" class="gjs-sm-radio" id="checkbox-text-right" name="pos" value="right" ${
              defaultValues.position === "right" ? "checked" : ""
            }>
            <label class="gjs-radio-item-label" for="checkbox-text-right">${labelRight}</label>
          </div>
          <div class="gjs-radio-item">
            <input type="radio" class="gjs-sm-radio" id="checkbox-text-bottom" name="pos" value="bottom" ${
              defaultValues.position === "bottom" ? "checked" : ""
            }>
            <label class="gjs-radio-item-label" for="checkbox-text-bottom">${labelBottom}</label>
          </div>
          <div class="gjs-radio-item">
            <input type="radio" class="gjs-sm-radio" id="checkbox-text-left" name="pos" value="left" ${
              defaultValues.position === "left" ? "checked" : ""
            }>
            <label class="gjs-radio-item-label" for="checkbox-text-left">${labelLeft}</label>
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

      this.em.on("component:selected", () => this.updateUI());

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
    },

    setLabelPosition(inPos) {
      const { pos, label, checkbox } = this.getLabelPosition();

      // set style based on value from UI
      const dir =
        inPos === "" || inPos === "bottom"
          ? { "flex-direction": inPos === "" ? "column-reverse" : "column" }
          : { "flex-direction": "row" };
      label.addStyle({ order: inPos === "left" ? "-1" : "1" });
      checkbox.addStyle(dir);
    },

    getLabelPosition() {
      const checkbox = this.em.getSelected();

      if (!checkbox || !checkbox.getLabel) return {};

      const label = checkbox.getLabel();

      if (!label || !label.getStyle) return {};

      const order = label.getStyle().order;
      const direction = checkbox.getStyle()["flex-direction"];

      return {
        pos:
          direction === "column"
            ? "bottom"
            : direction === "column-reverse"
            ? "top"
            : order === "-1"
            ? "left"
            : "right",
        label,
        checkbox,
      };
    },

    // Clean memory if necessary
    destroy() {},
  });
}
