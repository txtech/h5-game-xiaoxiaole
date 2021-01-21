var NADA_Hooks = {
    //serverUrl: 'http://localhost:9998/game/f/xiao/hgameapi/',
    serverUrl: ' http://47.110.43.93/game/f/xiao/hgameapi/',
    debug : false,
    spawn_new_speed: 20,
    win_reward_gold : 15,
    lose_punish_gold : 15,
    //初始化用户游戏数据
    getUserCloud : function (url){
        SG_Hooks.debug && console.log('NadaHooks game init Data');
        var uid = this.getUid(url);
        var gid = this.getGid(url);
        var reqData = {
            uid:uid,
            gid:gid
        };
        this.XHRPost(this.getUrl("getUserInfo"),reqData,function (r) {
            try {
                // SG_Hooks.debug && console.log('NadaHooks http response:' + r.response);
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
    addBooster : function (boosterId,needGold,level){
        if (!level || level == ''){
            level = this.getLocal("curLevel");
        }
        var reqData = {
            level: level,
            boosterId: boosterId,
            needGold: needGold,
            uid:  this.getLocal("uid"),
            gid:  this.getLocal("gid"),
            playId: this.getPlayId()
        };
        this.XHRPost(this.getUrl("addBooster"),reqData,function (r) {
            try {
                var data = JSON.parse(r.response);
                if (!data || !data.ok){
                    console.log("NadaHooks updateBooster faile"+data)
                }
            }catch (e){
                console.log("NadaHooks json error"+e)
            }
        });
    },
    spendBooster : function (boosterId,level){
        if (!level || level == ''){
            level = this.getLocal("curLevel");
        }
        var reqData = {
            level: level,
            boosterId: boosterId,
            uid:  this.getLocal("uid"),
            gid:  this.getLocal("gid"),
            playId: this.getPlayId()
        };
        this.XHRPost(this.getUrl("spendBooster"),reqData,function (r) {
            try {
                var data = JSON.parse(r.response);
                if (!data || !data.ok){
                    console.log("NadaHooks updateBooster faile"+data)
                }
            }catch (e){
                console.log("NadaHooks json error"+e)
            }
        });
    },
    selectLevel : function (level){
        SG_Hooks.debug && console.log('NadaHooks selectLevel :'+level);
        localStorage.setItem("curLevel",level);
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
        localStorage.setItem("gname",gameData.gname);
        localStorage.setItem("type",gameData.type);
        localStorage.setItem("name",gameData.name);
        localStorage.setItem("uid",gameData.uid);
        localStorage.setItem("gid",gameData.gid);
        if (gameData.boostersGold){
            localStorage.setItem("boostersGold",gameData.boostersGold);
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
            localStorage.setItem("BOOSTERS_COUNT",gameData.boostersCount);
        }
        if (gameData.starsPerLevel && gameData.starsPerLevel.length > 60){
            localStorage.setItem("STARS_PER_LEVEL",gameData.starsPerLevel);
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
    getTitle : function (){
        var title = "呵呵乐购";
        var name = NADA_Hooks.getLocal("name");
        var gname = NADA_Hooks.getLocal("gname");
        if (gname && gname!=''){
            title = gname;
        }
        if (name && name!=''){
            title = title +":"+ name;
        }
        return title;
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
    getUid : function ( parameters ){
        var uid = parameters && parameters['uid'] !== undefined && parameters['uid'];
        if (uid && uid!=''){
            localStorage.setItem("uid",uid);
            return uid;
        }
        uid = localStorage.getItem('uid');
        if (uid && uid!=''){
            return uid;
        }
        uid = this.uuid();
        localStorage.setItem("uid",uid);
        return uid;
    },
    getGid : function ( parameters ){
        var gid = parameters && parameters['gid'] !== undefined && parameters['gid'];
        if (gid && gid!=''){
            localStorage.setItem("gid",gid);
            return gid;
        }
        gid = localStorage.getItem('gid');
        if (gid && gid!=''){
            return gid;
        }
        return '';
    },
    getPlayId : function (){
        var playId = localStorage.getItem('playId');
        if (playId && playId!=''){
            return playId;
        }
        playId = this.uuid();
        localStorage.setItem("playId",playId);
        return playId;
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
