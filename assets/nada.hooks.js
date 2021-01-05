var NADA_Hooks = {
    debug : true,
    gold : "GOLD",
    total_score: "TOTAL_SCORE",
    levels_completed: "LEVELS_COMPLETED",
    boosters_count: "BOOSTERS_COUNT",
    stars_per_level: "STARS_PER_LEVEL",
    initGameData : function ( storage ){
        SG_Hooks.debug && console.log('NadaHooks game init Data');
        //storage.setItem(this.gold,"301");
        //storage.setItem(this.total_score,"10001");
        storage.setItem(this.levels_completed,"2");
        //storage.setItem(this.boosters_count,"[1,1,1,3,1,2]");
        //storage.setItem(this.stars_per_level,"[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]");
    },
    updateGameData : function (vgold,vtotalScore,vlevelsCompleted,vstarsPerLevel,vboostersCount){
        SG_Hooks.debug && console.log('NadaHooks game update vgold:'+vgold);
        SG_Hooks.debug && console.log('NadaHooks game update vtotalScore:'+vtotalScore);
        SG_Hooks.debug && console.log('NadaHooks game update vlevelsCompleted:'+vlevelsCompleted);
        SG_Hooks.debug && console.log('NadaHooks game update vstarsPerLevel:'+vstarsPerLevel);
        SG_Hooks.debug && console.log('NadaHooks game update vboostersCount:'+vboostersCount);
    }
};
