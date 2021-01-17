var SG_Hooks = {
    debug : true,
    getLanguage : function( supportedLanguages ){
        SG_Hooks.debug && console.log('Hooks game languag');
		return SG.initLangs(supportedLanguages);
	},
	start : function(t){
        SG_Hooks.debug && console.log('Hooks game started:'+t);
        SG.trigger({type:'start'});
	},
    //add by nada 添加 gold 金币参数
	levelUp : function( level, score, gold,start,callback){
        SG_Hooks.debug && console.log('Hooks game gold:' + gold );
        SG_Hooks.debug && console.log('Hooks game levelup:' + level );
        SG_Hooks.debug && console.log('Hooks game levelup score:' + score);
		SG.trigger({type:'levelUp', level:level, lastLevelScore:score}, callback);
        NADA_Hooks.updateGamelevelUp(level, score, gold,start);
        // updateShare(level+1,score);
        // Play68.setRankingLevelScoreDesc(level+1,score);
	},
	gameOver : function( level, score, callback){
        SG_Hooks.debug && console.log('Hooks game over level:' + level);
        SG_Hooks.debug && console.log('Hooks game over score:' + score);
		SG.trigger({type:'gameOver', score:score}, callback);
	},
    gameCompleted : function( score, callback ){
        debugger
        SG_Hooks.debug && console.log('Hooks game completed:' + score);
        SG.trigger({type:'gameCompleted', score:score}, callback);
    },
    // state: on|off
    gamePause : function( state, callback ){
        debugger
        SG_Hooks.debug && console.log('Hooks game pause:' + state);
        SG.trigger({type:'gamePause', state:state}, callback);
    },
    gameRestart : function( callback ){
        debugger
        SG_Hooks.debug && console.log('Hooks game restart:');
        SG.trigger({type:'gameRestart'}, callback);
    },
    selectMainMenu : function(callback){
        debugger
        SG_Hooks.debug && console.log('Hooks game selectMainMenu:');
        SG.trigger({type:'selectMainMenu'}, callback);
    },
    selectLevel : function( level, callback ){
        NADA_Hooks.selectLevel(level);
        SG_Hooks.debug && console.log('Hooks game selectLevel:'+level);
        SG.trigger({type:'selectLevel', level:level}, callback);
    },
    // state: on|off
    setSound : function( state, callback ){
        debugger
        SG_Hooks.debug && console.log('Hooks game setSound:'+state);
        SG.trigger({type:'gameCompleted', state:state}, callback);
    },
    //方向;目标;定向
    setOrientationHandler : function(f){
        SG_Hooks.debug && console.log('Hooks game setOrientationHandler');
		SG.setOrientationHandler( f );
	},
    //调整大小
	setResizeHandler: function ( f ){
        SG_Hooks.debug && console.log('Hooks game setResizeHandler');
		SG.setResizeHandler(f);
	}
};
