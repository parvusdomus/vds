export default class vdsActorSheet extends ActorSheet{
    /*get template(){
        return `systems/vds/templates/sheets/actors/${this.actor.type}-sheet.html`;

    }*/
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["Ysystem", "sheet", "actor"],
            template: "systems/vds/templates/sheets/actors/PJ-sheet.html",
            width: 800,
            height: 760,
            resizable: true,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".main_page", initial: "skills" }]
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        if (!this.options.editable) return;

        /*Modificar Stats*/
        html.find('.mod_skill').click(ev => {
            const element = ev.currentTarget;
            const dataset = element.dataset;
            const skill=dataset.skill;
            const update = {};
            update.data = {};
            var valor_actual=Number(this.actor.system[skill].value)
            var valor_minimo=Number(this.actor.system[skill].min)
            var valor_nuevo=valor_actual+1
            if (valor_nuevo>6){valor_nuevo=valor_minimo}
            const habilidad='system.'+skill+'.value'
            update[habilidad] = valor_nuevo;
            update.id = this.actor.id;
            this.actor.update(update, {diff: true});
        });

        html.find('.mod_rune').click(ev => {
            const element = ev.currentTarget;
            const dataset = element.dataset;
            const rune=dataset.rune;
            const update = {};
            update.data = {};
            var valor_actual=Number(this.actor.system[rune])
            var valor_nuevo=valor_actual+1
            if (valor_nuevo>3){valor_nuevo=0}
            const habilidad='system.'+rune
            update[habilidad] = valor_nuevo;
            update.id = this.actor.id;
            this.actor.update(update, {diff: true});
        });

        html.find('.mod_death').click(ev => {
            const element = ev.currentTarget;
            const update = {};
            update.data = {};
            var valor_actual=Number(this.actor.system.Deaths.value)
            var valor_maximo=Number(this.actor.system.Deaths.max)
            var valor_nuevo=valor_actual+1
            if (valor_nuevo>valor_maximo){valor_nuevo=0}
            const habilidad='system.Deaths.value'
            update[habilidad] = valor_nuevo;
            update.id = this.actor.id;
            this.actor.update(update, {diff: true});
        });



    }
    
}