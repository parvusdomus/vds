import vdsActorSheet from "./modules/myActorSheet.js";
import { preloadHandlebarsTemplates } from "./modules/preloadTemplates.js";

Hooks.once("init", function(){
    console.log("test | Initializing Viking Death Squad");

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("vds", vdsActorSheet, {makeDefault: true, types: ["Human", "Immortal"]});

    console.log("test | CHARSHEETS READY"); 

    console.log ("test | LOADING TEMPLATES");
    preloadHandlebarsTemplates();
    console.log ("test | DONE LOADING TEMPLATES")
});