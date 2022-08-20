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

    getData() {
        const data = super.getData();
        if (this.actor.type == 'Human' || this.actor.type == 'Immortal') {
          this._prepareCharacterItems(data);
        }
        return data;
    }

    _prepareCharacterItems(sheetData) {
        const actorData = sheetData;
  
        // Inicializo arrays para meter los objetos por tipo.
         const Items = [];
         const Armors = [];
         const Skills = [];
         // Ordena los objetos por tipo y los mete en el array correspondiente
        for (let i of sheetData.items) {
          let item = i.system;
          i.img = i.img || DEFAULT_TOKEN;
          if (i.type === 'Item') {
            Items.push(i);
          }
          else if (i.type === 'Armor') {
            Armors.push(i);
          }
           else if (i.type === "Skill") {
             Skills.push(i);
           }
        }
        //Asigno cada array al actordata
        actorData.Items = Items;
        actorData.Armors = Armors;
        actorData.Skills = Skills;
    }

    /*COSAS DE EVENTOS Y CLICKS VARIOS */

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

        html.find('a.item-edit').click(ev=>{
            ev.preventDefault();
            const dataset = ev.currentTarget.dataset;
            const item = this.actor.items.get(dataset.itemid);
            item.sheet.render(true);
            return;
        });

		html.find('a.item-delete').click(ev=>{
            ev.preventDefault();
            const dataset = ev.currentTarget.dataset;
            Dialog.confirm({
                title: "Delete Item",
                content: "Are you sure you want to delete this Item?",
                yes: () => this.actor.deleteEmbeddedDocuments("Item", [dataset.itemid]),
                no: () => {},
                defaultYes: false
            });
            return;
        });

        html.find('.mod_advance').click(ev => {
            const element = ev.currentTarget;
            const dataset = element.dataset;
            const skill=dataset.itemid;
            const update = {};
            update.data = {};
            var item=this.actor.items.get(skill);
            var advance_curr = Number(item.system.Advance);
            var valor_minimo=0;
            var valor_nuevo=advance_curr+1
            if (valor_nuevo>5){valor_nuevo=valor_minimo}
            item.update ({ 'system.Advance': valor_nuevo });
        });

        html.find('.item_damage').click(ev => {
            const element = ev.currentTarget;
            const dataset = element.dataset;
            const skill=dataset.itemid;
            const update = {};
            update.data = {};
            var item=this.actor.items.get(skill);
            var dam_curr = Number(item.system.Hits.value);
            var dam_max = Number(item.system.Hits.max);
            var valor_minimo=0;
            var valor_nuevo=dam_curr+1
            if (valor_nuevo>dam_max){valor_nuevo=valor_minimo}
            console.log ("VALOR")
            console.log (valor_nuevo)
            item.update ({ 'system.Hits.value': valor_nuevo });
        });




    }
    
}