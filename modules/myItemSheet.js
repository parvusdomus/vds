export default class vdsItemSheet extends ItemSheet{
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["vds", "sheet", "item"],
        width: 600,
        height: 450,
        resizable: true,
      });
    }
    get template(){
        return `systems/vds/templates/sheets/items/${this.item.type}.html`;
    }

  }