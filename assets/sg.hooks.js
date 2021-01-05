var SG_Hooks = {
    debug : true,
    getLanguage : function( supportedLanguages ){
        SG_Hooks.debug && console.log('Hooks game languag');
		return SG.initLangs(supportedLanguages);
	},
	start : function(){
        SG_Hooks.debug && console.log('Hooks game started');
        SG.trigger({type:'start'});
	},
	levelUp : function( level, score, callback){
        SG_Hooks.debug && console.log('Hooks game level up:' + level + '/' + score);
		SG.trigger({type:'levelUp', level:level, lastLevelScore:score}, callback);
        // updateShare(level+1,score);
        // Play68.setRankingLevelScoreDesc(level+1,score);
	},
	gameOver : function( level, score, callback){
        SG_Hooks.debug && console.log('Hooks game over:' + level + '/' + score);
		SG.trigger({type:'gameOver', score:score}, callback);
	},
    gameCompleted : function( score, callback ){
        SG_Hooks.debug && console.log('Hooks game completed:' + score);
        SG.trigger({type:'gameCompleted', score:score}, callback);
    },
    gamePause : function( state, callback ){ // state: on|off
        SG_Hooks.debug && console.log('Hooks game pause:' + state);
        SG.trigger({type:'gamePause', state:state}, callback);
    },
    gameRestart : function( callback ){
        SG_Hooks.debug && console.log('Hooks game restart:');
        SG.trigger({type:'gameRestart'}, callback);
    },
    selectMainMenu : function(callback){
        SG_Hooks.debug && console.log('Hooks game selectMainMenu:');
        SG.trigger({type:'selectMainMenu'}, callback);
    },
    selectLevel : function( level, callback ){
        SG_Hooks.debug && console.log('Hooks game selectLevel:'+level);
        SG.trigger({type:'selectLevel', level:level}, callback);
    },
    setSound : function( state, callback ){ // state: on|off
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
