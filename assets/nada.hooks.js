var NADA_Hooks = {
    serverUrl: 'http://localhost:9998/game/f/xiao/hgameapi/',
    //serverUrl: ' http://47.110.43.93/game/f/xiao/hgameapi/',
    debug : false,
    spawn_new_speed: 20,
    win_reward_gold : 15,
    lose_punish_gold : 15,
    //初始化用户游戏数据
    getUserCloud : function (urlParameters){
        SG_Hooks.debug && console.log('NadaHooks game init Data');
        var token = this.getToken({token:urlParameters});
        var reqData = {
            token:token
        };
        this.XHRPost(this.getUrl("getUserInfo"),reqData,function (r) {
            try {
                SG_Hooks.debug && console.log('NadaHooks http response:' + r.response);
                var data = JSON.parse(r.response);
                if (!data || !data.ok){
                    SG_Hooks.getPlayId();
                    return;
                }
                NADA_Hooks.initUserData(data.result);
            }catch (e){
                console.log("NadaHooks json error"+e)
            }
        });
    },
    updateGamelevelUp : function (level, score, gold,start){
        var reqData = {
            level: level,
            gold: gold,
            score: score,
            start: start,
            token: this.getToken(),
            uid:  this.getLocal("uid"),
            gid:  this.getLocal("gid"),
            playId: this.getPlayId()
        };
        this.XHRPost(this.getUrl("updateGamelevelUp"),reqData,function (r) {
            try {
                var data = JSON.parse(r.response);
                if (!data || !data.ok){
                    console.log("NadaHooks updateGamelevelUp faile"+data)
                }
            }catch (e){
                console.log("NadaHooks json error"+e)
            }
        });
    },
    updateGameOver : function (status){
        SG_Hooks.debug && console.log('NadaHooks game update vgold:'+status);
    },
    updateUserData : function (vgold,vtotalScore,vlevelsCompleted,vstarsPerLevel,vboostersCount){
        SG_Hooks.debug && console.log('NadaHooks game update vgold:'+vgold);
        SG_Hooks.debug && console.log('NadaHooks game update vtotalScore:'+vtotalScore);
        SG_Hooks.debug && console.log('NadaHooks game update vlevelsCompleted:'+vlevelsCompleted);
        SG_Hooks.debug && console.log('NadaHooks game update vstarsPerLevel:'+vstarsPerLevel);
        SG_Hooks.debug && console.log('NadaHooks game update vboostersCount:'+vboostersCount);
    },
    getGameConfig : function( key ){
        switch( key ){
            case 'spawn.new.speed':
                return this.spawn_new_speed;
        }
        switch( key ){
            case 'win.reward.gold':
                var winGold = this.getLocal("winGold");
                if (winGold){
                    return winGold;
                }
                return this.win_reward_gold;
        }
        switch( key ){
            case 'lose.punish.gold':
                var loseGold = this.getLocal("loseGold");
                if (loseGold){
                    return loseGold;
                }
                return this.lose_punish_gold;
        }
        return 0;
    },
    initUserData : function (gameData){
        if (!gameData){
            return;
        }
        if (gameData.name){
            localStorage.setItem("name",gameData.name);
        }
        if (gameData.uid){
            localStorage.setItem("uid",gameData.uid);
        }
        if (gameData.gid){
            localStorage.setItem("gid",gameData.gid);
        }
        if (gameData.winGold >= 0){
            localStorage.setItem("winGold",gameData.winGold);
        }
        if (gameData.gold >= 0){
            localStorage.setItem("loseGold",gameData.loseGold);
        }
        if (gameData.gold >= 0){
            localStorage.setItem("GOLD",gameData.gold);
        }
        if (gameData.totalScore >= 0){
            localStorage.setItem("TOTAL_SCORE",gameData.totalScore);
        }
        if (gameData.levelsCompleted >= 0){
            localStorage.setItem("LEVELS_COMPLETED",gameData.levelsCompleted);
        }
        if (gameData.boostersCount && gameData.boostersCount.length > 6 ){
            if (JSON.parse(gameData.boostersCount).length === 6){
                localStorage.setItem("BOOSTERS_COUNT",gameData.boostersCount);
            }
        }
        if (gameData.starsPerLevel && gameData.starsPerLevel.length > 60){
            if (JSON.parse(gameData.starsPerLevel).length === 60){
                localStorage.setItem("STARS_PER_LEVEL",gameData.starsPerLevel);
            }
        }
    },
    getLocal : function (key){
        if (!key){
            return '';
        }
        if (!localStorage){
            return '';
        }
        return localStorage.getItem(key);
    },
    initLocalStorage : function (key,value){
        if (!key || key == ''){
            return;
        }
        if (!this.getLocal(key)){
            localStorage.setItem(key,value);
        }
    },
    getUrl : function (key){
        if (!key || key == ''){
            return '';
        }
        return  NADA_Hooks.serverUrl+key;
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
    getToken : function ( parameters ){
        var token = parameters && parameters['tokne'] !== undefined && parameters['tokne'];
        if (token && token!=''){
            localStorage.setItem("token",token);
            return token;
        }
        token = localStorage.getItem('token');
        if (token && token!=''){
            return token;
        }
        token = this.uuid();
        localStorage.setItem("token",token);
        return token;
    },
    getPlayId : function (){
        var playId = localStorage.getItem('playId');
        if (playId && playId!=''){
            return playId;
        }
        playId = this.uuid();
        localStorage.setItem("playId",playId);
        return token;
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
