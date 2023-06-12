export default function (editor, opts = {}) {
  opts = {
    name: "checkbox-alignment",
    selectedClassName: "selected",
    defaultValues: {
      align: "center",
    },
    labelLeft: "Left",
    labelCenter: "Center",
    labelRight: "Right",
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
              <label class="gjs-radio-item-label" for="checkbox-align-left">${labelLeft}</label>
            </div>
            <div class="gjs-radio-item">
              <input type="radio" class="gjs-sm-radio" id="checkbox-align-center" name="align" value="center" ${
                defaultValues.align === "center" ? "checked" : ""
              }>
              <label class="gjs-radio-item-label" for="checkbox-align-center">${labelCenter}</label>
            </div>
            <div class="gjs-radio-item">
              <input type="radio" class="gjs-sm-radio" id="checkbox-text-bottom" name="align" value="right" ${
                defaultValues.align === "right" ? "checked" : ""
              }>
              <label class="gjs-radio-item-label" for="checkbox-text-bottom">${labelRight}</label>
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

      this.em.on("component:selected", () => this.updateUI());

      return el;
    },

    // Propagate UI changes to target
    emit({ updateStyle }, { css, partial }) {},

    // Update UI when target is changed
    updateUI() {
      const {
        direction = "",
        alignItems,
        justifyContent,
      } = this.getAlignment();
      const align = !direction.includes("column")
        ? justifyContent.includes("start")
          ? ""
          : justifyContent === "center"
          ? "center"
          : "right"
        : alignItems.includes("start")
        ? ""
        : alignItems === "center"
        ? "center"
        : "right";

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
            "justify-content": "center",
          }
        : {
            "align-items": "center",
            "justify-content":
              inAlign === ""
                ? "flex-start"
                : inAlign === "center"
                ? "center"
                : "flex-end",
          };
      checkbox.addStyle(align);
    },

    getAlignment() {
      const checkbox = this.em.getSelected();

      if (!checkbox) return {};

      const direction = checkbox.getStyle()["flex-direction"];
      const alignItems = checkbox.getStyle()["align-items"] || "center";
      const justifyContent = checkbox.getStyle()["justify-content"] || "center";

      return {
        direction,
        checkbox,
        alignItems,
        justifyContent,
      };
    },

    // Clean memory if necessary
    destroy() {},
  });
}
