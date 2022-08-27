export async function statRoll(actor, stat_name, objetivo) 
{
    console.log ("-----------------")
    console.log ("FUNCION STAT ROLL")
    console.log ("-----------------")
    console.log ("ACTOR: "+ actor.name)
    console.log ("STAT_NAME: "+ stat_name)
    if (objetivo){console.log ("TARGET: "+ objetivo.name)}else{console.log ("TARGET: NONE")}
    let nDadosBase=actor.system[stat_name].value;
    let nDadosBonus=actor.system[stat_name].bonus;
    let nDadosTotal=actor.system[stat_name].total;
    console.log ("TIRADA")
    console.log ("-----------------")
    console.log ("Base: "+nDadosBase+" Bonus: "+nDadosBonus+" Total: "+nDadosTotal)
    console.log ("-----------------")

}

export async function skillRoll(actor, skill_name, objetivo) 
{
    console.log ("-----------------")
    console.log ("FUNCION SKILL ROLL")
    console.log ("-----------------")
    console.log ("ACTOR: "+ actor.name)
    console.log ("SKILL_NAME: "+ skill_name)
    if (objetivo){console.log ("TARGET: "+ objetivo.name)}else{console.log ("TARGET: NONE")}
    let skill = actor.items.find((k) =>  k.type==="Skill" && k.name === skill_name);
    let nDadosBase=skill.system.Level;
    let nDificultad=skill.system.Difficulty;
    console.log ("TIRADA")
    console.log ("-----------------")
    console.log ("Base: "+nDadosBase+" Difficulty: "+nDificultad)
    console.log ("-----------------")

}

