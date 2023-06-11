export default function (editor, opts = {}) {
  opts = {
    name: "checkbox-text-position",
    selectedClassName: "selected",
    defaultValues: {
      position: "right",
    },
    labelLeft: "Left",
    labelRight: "Right",
    ...opts,
  };

  const { name, defaultValues, labelLeft, labelRight } = opts;
  const sm = editor.StyleManager;

  sm.addType(name, {
    // Create the UI
    create({ change }) {
      const el = document.createElement("div");
      el.classList.add(name, "gjs-sm-property--full");
      el.innerHTML = `<div class="gjs-field gjs-field-radio">
        <div class="gjs-radio-items">
          <div class="gjs-radio-item">
            <input type="radio" class="gjs-sm-radio" id="checkbox-text-left" name="pos" value="left" ${
              defaultValues.position === "left" ? "checked" : ""
            }>
            <label class="gjs-radio-item-label" for="checkbox-text-left">${labelLeft}</label>
          </div>
          <div class="gjs-radio-item">
            <input type="radio" class="gjs-sm-radio" id="checkbox-text-right" name="pos" value="right" ${
              defaultValues.position === "right" ? "checked" : ""
            }>
            <label class="gjs-radio-item-label" for="checkbox-text-right">${labelRight}</label>
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
      const { pos, label } = this.getLabelPosition();

      // set style based on value from UI
      label.addStyle({ order: inPos === "right" ? "1" : "-1" });
    },

    getLabelPosition() {
      const checkbox = this.em.getSelected();

      if (!checkbox || !checkbox.getLabel) return {};

      const label = checkbox.getLabel();

      if (!label || !label.getStyle) return {};

      const style = label.getStyle().order;

      return { pos: style === "-1" ? "" : "right", label };
    },

    // Clean memory if necessary
    destroy() {},
  });
}
