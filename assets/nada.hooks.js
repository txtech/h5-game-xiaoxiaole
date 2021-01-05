var NADA_Hooks = {
    debug : true,
    gold : "GOLD",
    total_score: "TOTAL_SCORE",
    levels: "LEVELS_COMPLETED",
    boosters_count: "BOOSTERS_COUNT",
    stars_per_level: "STARS_PER_LEVEL",
    initGameData : function ( storage ){
        SG_Hooks.debug && console.log('Hooks game congfie Data');
        //storage.setItem(this.gold,303);
    }
};
