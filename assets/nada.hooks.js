var NADA_GAME_CONFIG = {
    //闯关成功奖励金币(评判星级*基础金币)，默认一星15金币
    winRewardGold: 15,
    serverUrl: 'http://localhost:8980/js/f/xiao/hgameapi/',
};
var NADA_Hooks = {
    debug : false,
    spawn_new_speed: 20,
    initUserCloud : function (urlParameters){
        var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOiI1ZWI4ZTdhZi04ZmRiLTQ1NjgtYjVhZC1jMmFiM2YyOGY5MmMiLCJNb2JpbGUiOiIxMzYwNzEyMzcxNyIsIlVzZXJUeXBlIjoiNmMwZmYyNDktM2RhOC00NDk5LThkODEtNGZhNTgwNzIyMGQ4IiwiZXhwIjoxNjEwNDkyOTUwLjB9.vrdkMHVjZ54Xcf7XBMfeatSdCc6fAXO5AKQ4EHPUlUU";
        var uid = this.getUid({uid:token});
        var url = NADA_GAME_CONFIG.serverUrl+"getUserInfo?token="+uid;
        this.XHRPost(url,{token:uid},function (r) {
            try {
                var data = JSON.parse(r.response);
                SG_Hooks.debug && console.log('NadaHooks http response:' + data);
                if (!data || !data.ok){
                    return;
                }
                var result = data.result;
                if (result){
                    localStorage.setItem("GOLD",result.gold);
                    localStorage.setItem("TOTAL_SCORE",result.totalScore);
                    localStorage.setItem("LEVELS_COMPLETED",result.levelsCompleted);
                    localStorage.setItem("BOOSTERS_COUNT",result.boostersCount);
                    localStorage.setItem("STARS_PER_LEVEL",result.starsPerLevel);
                }
            }catch (e){
                console.log("NadaHooks json error"+e)
            }
        });
    },
    //初始化用户游戏数据
    initUserData : function ( storage ){
        SG_Hooks.debug && console.log('NadaHooks game init Data');
        //storage.setItem(this.gold,"301");
        //storage.setItem(this.total_score,"10001");
        storage.setItem(this.levels_completed,"60");
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
        SG_Hooks.debug && console.log('NadaHooks game currentlevel:' + level);
        SG_Hooks.debug && console.log('NadaHooks game totalLevels:' + totalLevels);
        SG_Hooks.debug && console.log('NadaHooks game currentlevel chip_goal:' + levelInfo.chip_goal);
        SG_Hooks.debug && console.log('NadaHooks game currentlevel chip_goal_count:' + levelInfo.chip_goal_count);
        //SG_Hooks.debug && console.log('NadaHooks game currentlevel info:' + JSON.stringify(levelInfo));
    },
    getGameConfig : function( key ){
        switch( key ){
            case 'spawn.new.speed' 	:  return this.spawn_new_speed;
        }
        return 0;
    },
    XHRPost : function (url,data,callback){
        try {
            var r = new XMLHttpRequest();
            r.open('POST',url,true);
            r.setRequestHeader("Content-type","application/json");
            r.send(JSON.stringify(data));
            r.onload = function(e){
                if (r.status === 200) {
                    callback(r)
                }else{
                    console.log("NadaHooks http failed")
                }
            };
            r.onerror = function(e){
                console.log("NadaHooks http error"+e)
            }
        }catch (m5){
            console.log("NadaHooks http error"+m5)
        }
    },
    getUid : function ( parameters ){
        var pid = parameters && parameters['uid'] !== undefined && parameters['uid'];
        if (pid && pid!=''){
            localStorage.setItem("uid",pid);
            return pid;
        }
        var uid = localStorage.getItem('uid');
        if (uid && uid!=''){
            return uid;
        }
        uid = this.uuid();
        localStorage.setItem("uid",pid);
        return uid;
    },
    uuid : function (){
        var len = 32;
        var radix = 16;
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if(len) {
            for(i = 0; i < len; i++)uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for(i = 0; i < 36; i++) {
                if(!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }
};
