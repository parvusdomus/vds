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
          this._calculaValores(data);
        }
        return data;
    }

    _prepareCharacterItems(sheetData) {
        const actorData = sheetData;
  
        // Inicializo arrays para meter los objetos por tipo.
         const Items = [];
         const Armors = [];
         const Skills = [];
         const Runes = [];
         // Ordena los objetos por tipo y los mete en el array correspondiente
        for (let i of sheetData.items) {
          let item = i.system;
          i.img = i.img || DEFAULT_TOKEN;
          if (i.type === 'Item') {
                if (Items.length < 10){
                    Items.push(i);
                }
                else
                {
                    ui.notifications.warn("You have the maximum number of items: 10. You can't add more until you delete some.");
                    this.actor.deleteEmbeddedDocuments("Item", [i._id])
                }
                
            }
          else if (i.type === 'Armor') {
                if (Armors.length < 4){
                    Armors.push(i);
                }
                else
                {
                    ui.notifications.warn("You have the maximum number of armors: 4. You can't add more until you delete some.");
                    this.actor.deleteEmbeddedDocuments("Item", [i._id])
                }
            }
           else if (i.type === "Skill") {
                if (Skills.length < 6){
                    Skills.push(i);
                }
                else
                {
                    ui.notifications.warn("You have the maximum number of skills: 7. You can't add more until you delete some.");
                    this.actor.deleteEmbeddedDocuments("Item", [i._id])
                }   
            }
            else if (i.type === "Rune") {
                if (Runes.length < 4){
                    Runes.push(i);
                }
                else
                {
                    ui.notifications.warn("You have the maximum number of runes: 4. You can't add more until you delete some.");
                    this.actor.deleteEmbeddedDocuments("Item", [i._id])
                }
               }
        }
        //Asigno cada array al actordata
        actorData.Items = Items;
        actorData.Armors = Armors;
        actorData.Skills = Skills;
        actorData.Runes = Runes;
    }

    //CALCULO LOS VALORES DE BONUS DE LAS CARACTERÍSTICAS
    _calculaValores(actorData) {
        const sheetData = actorData;
        console.log ("DATA")
        console.log (sheetData)
        let Power_Bonus=0;
        let Aim_Bonus=0;
        let Wits_Bonus=0;
        let Guts_Bonus=0;
        let Speed_Bonus=0;
        let Resolve_Bonus=0;
        for (let i of sheetData.items) {
            console.log ("ITEMS")
            console.log (i)
            if (i.type === "Rune"){
                if (i.system.Advance == 3){
                    Power_Bonus+=Number(i.system.Bonus.Power);
                    Aim_Bonus+=Number(i.system.Bonus.Aim);
                    Wits_Bonus+=Number(i.system.Bonus.Wits);
                    Guts_Bonus+=Number(i.system.Bonus.Guts);
                    Speed_Bonus+=Number(i.system.Bonus.Speed);
                    Resolve_Bonus+=Number(i.system.Bonus.Resolve);
                }
            } else
            if (i.type === "Item" || i.type === "Armor"){
                if (i.system.Hits.value < i.system.Hits.max){
                    Power_Bonus+=Number(i.system.Bonus.Power);
                    Aim_Bonus+=Number(i.system.Bonus.Aim);
                    Wits_Bonus+=Number(i.system.Bonus.Wits);
                    Guts_Bonus+=Number(i.system.Bonus.Guts);
                    Speed_Bonus+=Number(i.system.Bonus.Speed);
                    Resolve_Bonus+=Number(i.system.Bonus.Resolve); 
                }
            }
            else
            {
                Power_Bonus+=Number(i.system.Bonus.Power);
                Aim_Bonus+=Number(i.system.Bonus.Aim);
                Wits_Bonus+=Number(i.system.Bonus.Wits);
                Guts_Bonus+=Number(i.system.Bonus.Guts);
                Speed_Bonus+=Number(i.system.Bonus.Speed);
                Resolve_Bonus+=Number(i.system.Bonus.Resolve);
            }


            
        }
        let Power_Total= Power_Bonus + Number(this.actor.system.Power.value);
        let Aim_Total= Aim_Bonus + Number(this.actor.system.Aim.value);
        let Wits_Total= Wits_Bonus + Number(this.actor.system.Wits.value);
        let Guts_Total= Guts_Bonus + Number(this.actor.system.Guts.value);
        let Speed_Total= Speed_Bonus + Number(this.actor.system.Speed.value);
        let Resolve_Total= Resolve_Bonus + Number(this.actor.system.Resolve.value);

        this.actor.update ({ 'system.Power.bonus': Power_Bonus });
        this.actor.update ({ 'system.Aim.bonus': Aim_Bonus });
        this.actor.update ({ 'system.Wits.bonus': Wits_Bonus });
        this.actor.update ({ 'system.Guts.bonus': Guts_Bonus });
        this.actor.update ({ 'system.Speed.bonus': Speed_Bonus });
        this.actor.update ({ 'system.Resolve.bonus': Resolve_Bonus });

        this.actor.update ({ 'system.Power.total': Power_Total });
        this.actor.update ({ 'system.Aim.total': Aim_Total });
        this.actor.update ({ 'system.Wits.total': Wits_Total });
        this.actor.update ({ 'system.Guts.total': Guts_Total });
        this.actor.update ({ 'system.Speed.total': Speed_Total });
        this.actor.update ({ 'system.Resolve.total': Resolve_Total });
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

        html.find('.mod_skill').contextmenu(ev => {
            const element = ev.currentTarget;
            const dataset = element.dataset;
            const skill=dataset.skill;
            if (skill !== "Resolve"){return};
            const update = {};
            update.data = {};
            var valor_actual=Number(this.actor.system[skill].current)
            var valor_nuevo=valor_actual+1
            if (valor_nuevo>6){valor_nuevo=0}
            const habilidad='system.'+skill+'.current'
            update[habilidad] = valor_nuevo;
            update.id = this.actor.id;
            this.actor.update(update, {diff: true});
            console.log ("CURRENT RESOLVE")
            console.log (this.actor.system[skill].current)
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

        html.find('.mod_rune').click(ev => {
            const element = ev.currentTarget;
            const dataset = element.dataset;
            const rune=dataset.rune;
            const update = {};
            update.data = {};
            var item=this.actor.items.get(rune);
            var valor_actual=Number(item.system.Advance);
            var valor_nuevo=valor_actual+1;
            if (valor_nuevo>3){valor_nuevo=0};
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