var NADA_GAME_CONFIG = {
    //闯关成功奖励金币(评判星级*基础金币)，默认一星15金币
    winRewardGold: 15
};
var NADA_Hooks = {
    debug : false,
    gold : "GOLD",
    total_score: "TOTAL_SCORE",
    levels_completed: "LEVELS_COMPLETED",
    boosters_count: "BOOSTERS_COUNT",
    stars_per_level: "STARS_PER_LEVEL",
    //初始化用户游戏数据
    initUserData : function ( storage ){
        SG_Hooks.debug && console.log('NadaHooks game init Data');
        //storage.setItem(this.gold,"301");
        //storage.setItem(this.total_score,"10001");
        storage.setItem(this.levels_completed,"2");
        //storage.setItem(this.boosters_count,"[1,1,1,3,1,2]");
        //storage.setItem(this.stars_per_level,"[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]");
    },
    //更新用户游戏数据
    updateUserData : function (vgold,vtotalScore,vlevelsCompleted,vstarsPerLevel,vboostersCount){
        SG_Hooks.debug && console.log('NadaHooks game update vgold:'+vgold);
        SG_Hooks.debug && console.log('NadaHooks game update vtotalScore:'+vtotalScore);
        SG_Hooks.debug && console.log('NadaHooks game update vlevelsCompleted:'+vlevelsCompleted);
        SG_Hooks.debug && console.log('NadaHooks game update vstarsPerLevel:'+vstarsPerLevel);
        SG_Hooks.debug && console.log('NadaHooks game update vboostersCount:'+vboostersCount);
    },
    gameCurrentlevel : function( levelInfo, level,totalLevels){
        SG_Hooks.debug && console.log('Hooks game currentlevel:' + level);
        SG_Hooks.debug && console.log('Hooks game totalLevels:' + totalLevels);
        SG_Hooks.debug && console.log('Hooks game currentlevel chip_goal:' + levelInfo.chip_goal);
        SG_Hooks.debug && console.log('Hooks game currentlevel chip_goal_count:' + levelInfo.chip_goal_count);
        //SG_Hooks.debug && console.log('Hooks game currentlevel info:' + JSON.stringify(levelInfo));
    },
};
