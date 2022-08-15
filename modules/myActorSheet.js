export default class vdsActorSheet extends ActorSheet{
    /*get template(){
        return `systems/vds/templates/sheets/actors/${this.actor.type}-sheet.html`;

    }*/
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["Ysystem", "sheet", "actor"],
            template: "systems/vds/templates/sheets/actors/PJ-sheet.html",
            width: 800,
            height: 700,
            resizable: true,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".main_page", initial: "skills" }]
        });
    }
    
}