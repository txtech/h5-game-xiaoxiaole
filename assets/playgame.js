//add by nada mode 1
DNGameState = (function(K5) {
    function P5() {
        K5.call(this);
        this.liveTime = C7N8y.W8U;
        this.gameObjects = [];
        this.gui = [];
        this.newGameObjects = [];
        this.initiliazed = C7N8y.Q72;
        this.consoleH = C7N8y.b8U;
        this.haveFill = C7N8y.Q72;
    }
    __extends(P5, K5);
    P5.prototype.getShader = function() {
        return this.shaderShape;
    };
    P5.prototype.addShader = function(m5) {
        this.shaderShape = new createjs.Shape();
        this.shaderShape.graphics.beginFill(C7N8y.C82);
        this.shaderShape.graphics.drawRect(C7N8y.W8U, C7N8y.W8U, Constants.ASSETS_WIDTH, Constants.ASSETS_HEIGHT);
        this.shaderShape.graphics.endFill();
        this.addChild(this.shaderShape);
        this.shaderShape.alpha = C7N8y.W8U;
        createjs.Tween.get(this.shaderShape).wait(C7N8y.c32).to({
            alpha: C7N8y.B22
        }, C7N8y.x7U, createjs.Ease.linear);
    };
    P5.prototype.consolePrint = function(m5) {
        var b5 = new createjs.Text(m5, C7N8y.B42, C7N8y.C82);
        this.addChild(b5);
        b5.x = C7N8y.r72;
        b5.y = this.consoleH;
        this.consoleH += C7N8y.j92;
    };
    P5.prototype.isInitiliazed = function() {
        return this.initiliazed;
    };
    P5.prototype.onMouseDown = function(m5, b5) {
        DNGUIObject.wasHandlerThisFrame = false;
        for (var h5 = 0; C7N8y.N04(h5, this.gui.length); h5++) {
            this.gui[h5].onMouseDown(m5, b5);
        }
    };
    P5.prototype.onMouseMove = function(m5, b5) {
        DNGUIObject.wasHandlerThisFrame = false;
        for (var h5 = 0; C7N8y.H04(h5, this.gui.length); h5++) {
            this.gui[h5].onMouseMove(m5, b5);
        }
    };
    P5.prototype.onMouseUp = function(m5, b5) {
        DNGUIObject.wasHandlerThisFrame = false;
        for (var h5 = 0; C7N8y.X04(h5, this.gui.length); h5++) {
            this.gui[h5].onMouseUp(m5, b5);
        }
    };
    P5.prototype.addGuiObject = function(m5) {
        this.gui.push(m5);
        this.addGameObject(m5);
    };
    P5.prototype.update = function(m5) {
        this.liveTime += m5;
        this.newGameObjects = [];
        for (var b5 = 0; C7N8y.C04(b5, this.gameObjects.length); b5++) {
            var h5 = this.gameObjects[b5];
            h5.update(m5);
            if (h5.isDead()) {
                h5.onDead();
            } else {
                this.newGameObjects.push(h5);
            }
        }
        this.gameObjects = this.newGameObjects;
    };
    P5.prototype.forceUpdate = function(m5) {
        for (var b5 = 0; C7N8y.I04(b5, this.gameObjects.length); b5++) {
            this.gameObjects[b5].forceUpdate(m5);
        }
    };
    P5.prototype.addGameObject = function(m5) {
        this.gameObjects.push(m5);
    };
    P5.prototype.addGameObjectAt = function(m5, b5) {
        this.gameObjects.push(m5);
        if (b5) {
            b5.addChild(m5);
        }
    };
    P5.prototype.addGameObjectAtPos = function(m5, b5, h5, O5) {
        this.gameObjects.push(m5);
        if (b5) {
            b5.addChild(m5);
            m5.x = h5;
            m5.y = O5;
        }
    };
    P5.prototype.cleanup = function() {};
    P5.prototype.resume = function() {};
    P5.prototype.init = function() {
        this.initiliazed = C7N8y.s22;
    };
    P5.prototype.onOrientationChanged = function(m5) {
        if (DNGameConfig.needShowRotateScreen) {
            if (m5) {
                DNStateManager.g_instance.pushState(new PortraitLockState());
            }
        }
    };
    P5.prototype.alignByCenter = function(m5) {
        if (!Constants.g_isPC) {
            this.y = C7N8y.i04((Constants.SCREEN_HEIGHT - Constants.ASSETS_HEIGHT), C7N8y.A8U);
        } else {
            return;
        }
        if (m5) {
            if (C7N8y.b24(Constants.ASSETS_HEIGHT, Constants.SCREEN_HEIGHT) && !this.haveFill) {
                this.haveFill = C7N8y.s22;
                var b5 = DNAssetsManager.g_instance.getImage(Images.FILL_BOTTOM);
                this.addChild(b5);
                var h5 = DNAssetsManager.g_instance.getImage(Images.FILL_TOP);
                this.addChild(h5);
                var O5 = C7N8y.N7U;
                var W5 = C7N8y.v24((Constants.SCREEN_HEIGHT - Constants.ASSETS_HEIGHT), C7N8y.A8U);
                b5.y = C7N8y.k24(Constants.ASSETS_HEIGHT, C7N8y.T8U);
                h5.y = -O5 + C7N8y.T8U;
                if (C7N8y.O24(W5, O5)) {
                    b5.scaleY = (C7N8y.o24(W5, O5));
                    h5.scaleY = (C7N8y.y24(W5, O5));
                }
            }
        }
    };
    P5.prototype.loadLayout = function(m5, b5) {
        for (var h5 = 0; C7N8y.R24(h5, m5.length); h5++) {
            var O5 = m5[h5];
            var W5 = this.loadGUIObject(O5, b5);
            if (O5.children) {
                this.loadLayout(O5.children, W5);
            }
        }
    };
    P5.prototype.loadGUIObject = function(m5, b5) {
        var h5 = "Parsing layout error. Cant find type: ";
        var O5 = m5.x;
        var W5 = m5.y;
        var R5 = m5.rotation || C7N8y.W8U;
        var G5 = m5.name;
        var S5 = m5.picture;
        var t5;
        switch (m5.type) {
            case Layouts.TYPE_LOGO_PLACEHOLDER:
                t5 = new DNLogoPlaceholder(m5.max_width || C7N8y.b8U, m5.max_height || C7N8y.G82);
                break;
            case Layouts.TYPE_SKEW:
                t5 = new Skewer(S5);
                break;
            case Layouts.TYPE_BUTTON:
                t5 = new DNButton(S5);
                break;
            case Layouts.TYPE_STATIC_PICTURE:
                t5 = new DNStaticPicture(S5);
                break;
            case Layouts.TYPE_PLACEHOLDER:
                t5 = new DNPlaceholder();
                break;
            case Layouts.TYPE_JELLY_BUTTON:
                t5 = new DNJellyButton(S5);
                break;
            case Layouts.TYPE_TEXT_FIELD:
                t5 = new DNTextField(m5.text, m5.font);
                break;
            case Layouts.TYPE_FLAT_BUTTON:
                t5 = new DNFlatButton(S5);
                break;
            case Layouts.TYPE_PROGRESS_BAR:
                t5 = new DNProgressBar(C7N8y.S22, S5);
                break;
        }
        if (t5) {
            t5.name = G5;
            t5.x = O5;
            t5.y = W5;
            t5.rotation = R5;
            this.addGuiObject(t5);
            b5.addChild(t5);
            t5.scaleX = t5.scaleY = (m5.scale || 1);
            t5.alpha = m5.alpha || C7N8y.T8U;
        } else {
            console.log(h5, m5.type);
        }
        return t5;
    };
    P5.prototype.findGUIObject = function(m5) {
        for (var b5 = 0; C7N8y.V24(b5, this.gui.length); b5++) {
            if (C7N8y.K24(this.gui[b5].name, m5)) {
                return this.gui[b5];
            }
        }
        return null;
    };
    P5.prototype.onPause = function() {};
    P5.prototype.onResume = function() {};
    P5.prototype.onRestart = function() {};
    return P5;
})(createjs.Container),

MainMenuState = (function(W5) {
    function R5() {
        var m5 = 4000;
        var b5 = 0.95;
        var h5 = 1.05;
        var O5 = this;
        W5.call(this);
        this.someThing = C7N8y.s22;
        this.loadLayout(CurLayouts.MAIN_MENU_LAYOUT, this);
        createjs.Tween.get(this.findGUIObject(C7N8y.p72), {
            loop: C7N8y.s22
        }).to({
            scaleX: +h5,
            scaleY: +h5
        }, C7N8y.N7U, createjs.Ease.linear).to({
            scaleX: +b5,
            scaleY: +b5
        }, C7N8y.c32, createjs.Ease.linear).to({
            scaleX: C7N8y.T8U,
            scaleY: C7N8y.T8U
        }, C7N8y.N7U, createjs.Ease.linear).wait(m5);
        this.findGUIObject(Layouts.NAME_BUTTON_PLAY).setHandler(function() {
            return DNStateManager.g_instance.pushState(new CoolTransitionInState(new SelectLevelState()));
        });
        this.findGUIObject(Layouts.NAME_BUTTON_MORE_GAMES).setHandler(function() {
            return O5.onMoreGamesTouch();
        });
        this.title = this.findGUIObject(C7N8y.N12);
        this.soundButtonPlace = this.findGUIObject(Layouts.NAME_SOUND_PLACE);
        this.setSoundButton();
        this.addGameObjectAtPos(new Cloud(C7N8y.Q72), this.findGUIObject(C7N8y.R62), C7N8y.Y7U, C7N8y.r72);
        this.addGameObjectAtPos(new Cloud(C7N8y.Q72), this.findGUIObject(C7N8y.R62), C7N8y.c32, C7N8y.J5m);
        this.addGameObjectAtPos(new Cloud(C7N8y.Q72), this.findGUIObject(C7N8y.R62), C7N8y.b8U, C7N8y.R02);
    }
    __extends(R5, W5);
    R5.prototype.init = function() {
        var m5 = 100000;
        var b5 = 1500;
        var h5 = 1100;
        var O5 = this;
        W5.prototype.init.call(this);
        this.addGameObject(new Jellier(this.findGUIObject(C7N8y.C72), C7N8y.D8U, C7N8y.q72, C7N8y.q72));
        createjs.Tween.get(this.findGUIObject(C7N8y.C72)).wait(C7N8y.b8U).to({
            y: C7N8y.c32
        }, C7N8y.x7U, createjs.Ease.cubicOut);
        createjs.Tween.get(this.findGUIObject(C7N8y.N12)).wait(C7N8y.x7U).to({
            scaleX: C7N8y.T8U,
            scaleY: C7N8y.T8U,
            alpha: C7N8y.T8U
        }, C7N8y.F02, createjs.Ease.backOut);
        createjs.Tween.get(this.findGUIObject(C7N8y.t52)).wait(h5).to({
            scaleX: C7N8y.T8U,
            scaleY: C7N8y.T8U,
            alpha: C7N8y.T8U,
            rotation: C7N8y.j5m
        }, C7N8y.F02, createjs.Ease.backOut);
        createjs.Tween.get(this.findGUIObject(Layouts.NAME_BUTTON_MORE_GAMES)).wait(C7N8y.f52).to({
            x: C7N8y.N7U
        }, C7N8y.Y7U, createjs.Ease.backOut);
        createjs.Tween.get(this.findGUIObject(Layouts.NAME_SOUND_PLACE)).wait(C7N8y.f52).to({
            x: C7N8y.D24(C7N8y.L32, C7N8y.N7U)
        }, C7N8y.Y7U, createjs.Ease.backOut);
        createjs.Tween.get(this.findGUIObject(C7N8y.p72)).wait(h5).to({
            y: C7N8y.Y7U
        }, C7N8y.Y7U, createjs.Ease.backOut);
        createjs.Tween.get(this.findGUIObject(C7N8y.L12)).wait(b5).to({
            alpha: C7N8y.T8U
        }, C7N8y.X52, createjs.Ease.linear);
        this.addGameObject(new DNTimer(C7N8y.z72, m5, function() {
            return O5.addCandy();
        }));
    };
    R5.prototype.addCandy = function() {
        var m5 = 570;
        if (C7N8y.s24(this.liveTime, C7N8y.Y72)) {
            this.addGameObjectAtPos(new FallingCandy(), this.findGUIObject(C7N8y.R62), Utils.RandomRange(C7N8y.c52, m5), C7N8y.j5m);
        }
    };
    R5.prototype.onSoundTouch = function() {
        DNSoundManager.g_instance.setSoundEnabled(!DNSoundManager.g_instance.isSoundEnabled());
        this.setSoundButton();
    };
    R5.prototype.setSoundButton = function() {
        var m5 = this;
        this.soundButtonPlace.removeAllChildren();
        var b5 = DNSoundManager.g_instance.isSoundEnabled();
        var h5 = new DNFlatButton(b5 ? Images.BUTTON_SOUND_ON : Images.BUTTON_SOUND_OFF, function() {
            return m5.onSoundTouch();
        });
        this.soundButtonPlace.addChild(h5);
        this.addGuiObject(h5);
    };
    R5.prototype.onMoreGamesTouch = function() {
        SG.redirectToPortal();
    };
    return R5;
})(DNGameState),
PopupState = (function(b5) {
    function h5() {
        var m5 = 0.4;
        b5.call(this);
        this.panel = DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.MESSAGE_WINDOW);
        this.hiddingNow = C7N8y.Q72;
        this.shader = new createjs.Shape();
        this.shader.graphics.beginFill(C7N8y.C82);
        this.shader.graphics.drawRect(C7N8y.W8U, C7N8y.W8U, Constants.ASSETS_WIDTH, Constants.ASSETS_HEIGHT);
        this.shader.graphics.endFill();
        this.addChild(this.shader);
        this.shader.alpha = C7N8y.W8U;
        createjs.Tween.get(this.shader).wait(C7N8y.z8U).to({
            alpha: m5
        }, C7N8y.x7U, createjs.Ease.linear);
        this.panel.alpha = C7N8y.W8U;
        createjs.Tween.get(this.panel).to({
            alpha: C7N8y.T8U
        }, C7N8y.b8U, createjs.Ease.linear);
        this.addChild(this.panel);
        this.panel.x = C7N8y.Y24(Constants.ASSETS_WIDTH, C7N8y.V72);
        this.panel.y = C7N8y.P24(Constants.ASSETS_HEIGHT, C7N8y.V72);
        this.panel.scaleX = C7N8y.Z72;
        this.panel.scaleY = C7N8y.Z72;
        createjs.Tween.get(this.panel).to({
            scaleX: C7N8y.T8U,
            scaleY: C7N8y.T8U
        }, C7N8y.z8U, createjs.Ease.backOut);
    }
    __extends(h5, b5);
    h5.prototype.hide = function() {
        if (!this.hiddingNow) {
            createjs.Tween.removeTweens(this.shader);
            createjs.Tween.removeTweens(this.panel);
            createjs.Tween.get(this.shader).to({
                alpha: C7N8y.W8U
            }, C7N8y.z8U, createjs.Ease.linear).call(function() {
                return DNStateManager.g_instance.popState();
            });
            createjs.Tween.get(this.panel).to({
                y: -C7N8y.c32
            }, C7N8y.c32, createjs.Ease.backIn);
            createjs.Tween.get(this.panel).to({
                alpha: C7N8y.W8U
            }, C7N8y.c32, createjs.Ease.linear);
            this.hiddingNow = C7N8y.s22;
        }
    };
    h5.prototype.onRestartTouch = function() {
        DNStateManager.g_instance.pushState(new SelectBoosterState(PlayState.g_curLevel));
    };
    h5.prototype.onExitTouch = function() {
        DNStateManager.g_instance.pushState(new CoolTransitionInState(new SelectLevelState()));
    };
    return h5;
})(DNGameState),

//add by nada mode 1
CoolTransitionInState = (function(h5) {
    function O5(m5) {
        var b5 = this;
        h5.call(this);
        this.pic = DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.TRANSITION_BALL);
        this.nextState = m5;
        this.addChild(this.pic);
        this.pic.x = -C7N8y.x7U;
        this.pic.y = C7N8y.Y5w(Constants.SCREEN_HEIGHT, C7N8y.A8U);
        this.pic.scaleX = this.pic.scaleY = C7N8y.P5w(Constants.SCREEN_HEIGHT, this.pic.getBounds().height, 1.2);
        createjs.Tween.get(this.pic).to({
            x: C7N8y.X5w(Constants.ASSETS_WIDTH, C7N8y.A8U),
            rotation: C7N8y.w8U
        }, Constants.COOL_TRANSITION_SPEED, createjs.Ease.linear).call(function() {
            return b5.onFinishShade();
        });
    }
    __extends(O5, h5);
    O5.prototype.onFinishShade = function() {
        DNStateManager.g_instance.changeState(this.nextState);
        DNStateManager.g_instance.pushState(new CoolTransitionOutState());
    };
    O5.prototype.setNextState = function(m5) {
        this.nextState = m5;
    };
    O5.prototype.alignByCenter = function() {};
    return O5;
})(DNGameState),
CoolTransitionOutState = (function(b5) {
    function h5() {
        var m5 = 320;
        b5.call(this);
        this.pic = DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.TRANSITION_BALL);
        this.addChild(this.pic);
        this.pic.x = C7N8y.C5w(Constants.ASSETS_WIDTH, C7N8y.A8U);
        this.pic.y = C7N8y.I5w(Constants.SCREEN_HEIGHT, C7N8y.A8U);
        this.pic.scaleX = this.pic.scaleY = C7N8y.i5w(Constants.SCREEN_HEIGHT, this.pic.getBounds().height, 1.2);
        this.pic.rotation = C7N8y.w8U;
        createjs.Tween.get(this.pic).to({
            x: Constants.ASSETS_WIDTH + C7N8y.x7U,
            rotation: m5
        }, Constants.COOL_TRANSITION_SPEED, createjs.Ease.linear).call(function() {
            return DNStateManager.g_instance.popState();
        });
    }
    __extends(h5, b5);
    h5.prototype.alignByCenter = function() {};
    return h5;
})(DNGameState),

MapEditorState = (function(F3) {
    var Q5 = "DIRT";
    var u5 = "STRAWBERRY";
    var d3 = "STONE";
    var h3 = "CHOCOLATE";
    var n3 = "CAGE";
    var f3 = "CANDY";
    var j3 = "FORM";
    var r3 = function(m5) {
        E3.INPUT_MODE_CAGE = m5;
    };
    var Z3 = function(m5) {
        E3.INPUT_MODE_FORM = m5;
    };
    var Q3 = function(m5) {
        E3.INPUT_MODE_STONE = m5;
    };
    var e3 = function(m5) {
        E3.INPUT_MODE_CANDY = m5;
    };
    var q3 = function(m5) {
        E3.INPUT_MODE_CHOCOLATE = m5;
    };
    var g0 = function(m5) {
        E3.INPUT_MODE_DIRT = m5;
    };

    function E3(m5) {
        var b5 = this;
        F3.call(this);
        this.fieldWidth = C7N8y.D8U + C7N8y.A8U;
        this.fieldHeight = C7N8y.D8U;
        this.dirtLayer = new createjs.Container();
        this.underChipsLayer = new createjs.Container();
        this.backChipsLayer = new createjs.Container();
        this.holeLayer = new createjs.Container();
        this.edgesLayer = new createjs.Container();
        this.frontChipsLayer = new createjs.Container();
        this.effectsLayer = new createjs.Container();
        this.allModes = [E3.INPUT_MODE_FORM, E3.INPUT_MODE_CANDY, E3.INPUT_MODE_CAGE, E3.INPUT_MODE_CHOCOLATE, E3.INPUT_MODE_STONE, E3.INPUT_MODE_STRAWBERRY, E3.INPUT_MODE_DIRT];
        this.inputMode = E3.INPUT_MODE_FORM;
        this.inputModeText = new createjs.Text(j3, C7N8y.g72, C7N8y.C82);
        this.loseTypeMoves = C7N8y.s22;
        this.loseCounter = C7N8y.J12;
        this.colorsCount = C7N8y.S8U;
        this.allGoals = [C7N8y.B12, C7N8y.i7U, C7N8y.n12, C7N8y.i72, C7N8y.c72, C7N8y.i62, C7N8y.n62, C7N8y.W62, C7N8y.i12, C7N8y.Z12];
        this.goal = this.allGoals[C7N8y.W8U];
        this.goalCounter = C7N8y.W8U;
        this.bombCounter = C7N8y.J12;
        this.bombProb = C7N8y.W8U;
        this.level = m5;
        this.addChild(DNAssetsManager.g_instance.getImage(Images.MAIN_MENU_BACK));
        var h5 = new createjs.Container();
        this.loadLayout(CurLayouts.MAP_EDITOR_LAYOUT, h5);
        this.findGUIObject(C7N8y.l42).setHandler(function() {
            return b5.onMovesTouch();
        });
        this.findGUIObject(C7N8y.D7U).setHandler(function() {
            return b5.onTimeTouch();
        });
        this.findGUIObject(C7N8y.D7U).visible = C7N8y.Q72;
        this.findGUIObject(C7N8y.n5m).addChild(this.inputModeText);
        this.inputModeText.textAlign = "right";
        this.inputModeText.x = C7N8y.a92;
        this.inputModeText.x = C7N8y.N8U;
        this.findGUIObject(Layouts.NAME_BUTTON_RESTART).setHandler(function() {
            return b5.onRestartTouch();
        });
        this.findGUIObject(Layouts.NAME_BUTTON_PLAY).setHandler(function() {
            return b5.onPlayTouch();
        });
        this.findGUIObject(C7N8y.v8U).setHandler(function() {
            return b5.onShuffleTouch();
        });
        this.findGUIObject(C7N8y.Q42).setHandler(function() {
            return b5.onColorsCountTouch();
        });
        for (var O5 = C7N8y.W8U; C7N8y.t1w(O5, this.allGoals.length); O5++) {
            this.findGUIObject(this.allGoals[O5]).setHandler(function() {
                return b5.nextGoal();
            });
        }
        this.findGUIObject(C7N8y.A42).setHandler(function() {
            return b5.onPlusTouch();
        });
        this.findGUIObject(C7N8y.X02).setHandler(function() {
            return b5.onMinusTouch();
        });
        this.findGUIObject(C7N8y.u7U).setHandler(function() {
            return b5.onPlusGoalTouch();
        });
        this.findGUIObject(C7N8y.n02).setHandler(function() {
            return b5.onMinusGoalTouch();
        });
        this.findGUIObject(C7N8y.X7U).setHandler(function() {
            return b5.nextBombCounter();
        });
        this.findGUIObject(C7N8y.K82).setHandler(function() {
            return b5.nextBombProb();
        });
        for (var O5 = C7N8y.W8U; C7N8y.B1w(O5, C7N8y.f8U); O5++) {
            this.addGameObjectAtPos(new Cloud(C7N8y.s22), this, Utils.RandomRange(C7N8y.W8U, C7N8y.L32), Utils.RandomRange(C7N8y.N7U, C7N8y.g92));
        }
        E3.g_instance = this;
        var W5 = GameData.getInstance().getLevelDef(m5);
        this.field = new Array(this.fieldWidth);
        for (var O5 = C7N8y.W8U; C7N8y.U1w(O5, this.fieldWidth); O5++) {
            this.field[O5] = new Array(this.fieldHeight);
        }
        this.addChild(this.holeLayer);
        this.addChild(this.dirtLayer);
        this.addChild(this.edgesLayer);
        this.addChild(this.underChipsLayer);
        this.addChild(this.backChipsLayer);
        this.addChild(this.frontChipsLayer);
        this.addChild(this.effectsLayer);
        this.spawnDefinedChips(W5.chips);
        this.loadFormFieldForm();
        this.rebuildEdges();
        this.fieldDirt = new Array(this.fieldWidth);
        for (var O5 = C7N8y.W8U; C7N8y.u1w(O5, this.fieldWidth); O5++) {
            this.fieldDirt[O5] = new Array(this.fieldHeight);
        }
        for (var R5 = C7N8y.W8U; C7N8y.m6w(R5, this.fieldWidth); R5++) {
            for (var G5 = C7N8y.W8U; C7N8y.p6w(G5, this.fieldHeight); G5++) {
                this.fieldDirt[R5][G5] = C7N8y.W8U;
            }
        }
        this.addChild(h5);
        this.updateLoseLabel();
        this.updateGoal();
        this.updateGoalCounter();
        this.update(C7N8y.W8U);
    }
    var R0 = function(m5) {
        E3.INPUT_MODE_STRAWBERRY = m5;
    };
    __extends(E3, F3);
    E3.prototype.updateGoal = function() {
        for (var m5 = 0; C7N8y.h6w(m5, this.allGoals.length); m5++) {
            this.findGUIObject(this.allGoals[m5]).visible = (C7N8y.L6w(this.goal, this.allGoals[m5]));
        }
    };
    E3.prototype.updateGoalCounter = function() {
        this.findGUIObject(C7N8y.w7U).setText(this.goalCounter.toString());
    };
    E3.prototype.onPlusGoalTouch = function() {
        if (C7N8y.A6w(this.goal, C7N8y.B12)) {
            this.goalCounter += C7N8y.z42;
        } else {
            this.goalCounter++;
        }
        this.updateGoalCounter();
    };
    E3.prototype.onMinusGoalTouch = function() {
        if (C7N8y.W6w(this.goal, C7N8y.B12)) {
            this.goalCounter -= C7N8y.z42;
        } else {
            this.goalCounter--;
        }
        if (C7N8y.G6w(this.goalCounter, C7N8y.W8U)) {
            this.goalCounter = C7N8y.W8U;
        }
        this.updateGoalCounter();
    };
    E3.prototype.nextGoal = function() {
        var m5 = this.allGoals.indexOf(this.goal);
        m5++;
        if (C7N8y.f6w(m5, this.allGoals.length)) {
            m5 = 0;
        }
        this.goal = this.allGoals[m5];
        this.updateGoal();
    };
    E3.prototype.onMovesTouch = function() {
        this.findGUIObject(C7N8y.l42).visible = C7N8y.Q72;
        this.findGUIObject(C7N8y.D7U).visible = C7N8y.s22;
        this.loseTypeMoves = C7N8y.Q72;
        this.updateLoseLabel();
    };
    E3.prototype.onTimeTouch = function() {
        this.findGUIObject(C7N8y.l42).visible = C7N8y.s22;
        this.findGUIObject(C7N8y.D7U).visible = C7N8y.Q72;
        this.loseTypeMoves = C7N8y.s22;
        this.updateLoseLabel();
    };
    E3.prototype.onPlusTouch = function() {
        if (this.loseTypeMoves) {
            this.loseCounter++;
        } else {
            this.loseCounter += C7N8y.f8U;
        }
        this.updateLoseLabel();
    };
    E3.prototype.onMinusTouch = function() {
        if (this.loseTypeMoves) {
            this.loseCounter--;
        } else {
            this.loseCounter -= C7N8y.f8U;
        }
        if (C7N8y.S6w(this.loseCounter, C7N8y.W8U)) {
            this.loseCounter = C7N8y.W8U;
        }
        this.updateLoseLabel();
    };
    E3.prototype.updateLoseLabel = function() {
        if (this.loseTypeMoves) {
            this.findGUIObject(C7N8y.I02).setText(this.loseCounter.toString());
        } else {
            this.findGUIObject(C7N8y.I02).setText(Utils.IntToTimeString(this.loseCounter));
        }
    };
    E3.prototype.setDirtAt = function(m5, b5) {
        if (++this.fieldDirt[m5][b5] >= C7N8y.L8U) {
            this.fieldDirt[m5][b5] = C7N8y.W8U;
        }
        this.recalcDirt();
    };
    E3.prototype.resetDirtAt = function(m5, b5) {
        this.fieldDirt[m5][b5] = C7N8y.W8U;
        this.recalcDirt();
    };
    E3.prototype.recalcDirt = function() {
        this.dirtLayer.removeAllChildren();
        for (var m5 = C7N8y.W8U; C7N8y.c6w(m5, this.fieldWidth); m5++) {
            for (var b5 = C7N8y.W8U; C7N8y.j6w(b5, this.fieldHeight); b5++) {
                if (C7N8y.Q6w(this.fieldDirt[m5][b5], C7N8y.W8U)) {
                    var h5 = DNAssetsManager.g_instance.getCenteredImageWithProxy(C7N8y.l6w(this.fieldDirt[m5][b5], C7N8y.T8U) ? Images.DIRT_1 : Images.DIRT_2);
                    h5.x = this.getXPosByXIndex(m5);
                    h5.y = C7N8y.Z6w(this.getYPosByYIndex(b5), Constants.CELL_SIZE / C7N8y.A8U);
                    this.dirtLayer.addChild(h5);
                }
            }
        }
    };
    E3.prototype.onPauseClick = function() {
        DNStateManager.g_instance.pushState(new PauseState());
    };
    E3.prototype.spawnDefinedChips = function(m5) {
        for (var b5 = C7N8y.W8U; C7N8y.J6w(b5, this.fieldWidth); b5++) {
            for (var h5 = C7N8y.W8U; C7N8y.e6w(h5, this.fieldHeight); h5++) {
                this.createChipWithColorID(b5, h5, C7N8y.a6w((C7N8y.d8U - h5), C7N8y.G32) + C7N8y.g7w(b5, C7N8y.D32), m5[h5][b5]);
            }
        }
    };
    E3.prototype.loadFormFieldForm = function() {
        var m5 = GameData.getInstance().getLevelDef(this.level);
        var b5 = m5.form;
        for (var h5 = C7N8y.W8U; C7N8y.E7w(h5, this.fieldWidth); h5++) {
            for (var O5 = C7N8y.W8U; C7N8y.M7w(O5, this.fieldHeight); O5++) {
                if (C7N8y.r7w(b5[O5][h5], C7N8y.W8U)) {
                    this.field[h5][O5].convertToHole();
                }
            }
        }
    };
    E3.prototype.rebuildEdges = function() {
        this.edgesLayer.removeAllChildren();
        this.holeLayer.removeAllChildren();
        for (var m5 = C7N8y.W8U; C7N8y.F7w(m5, this.fieldWidth); m5++) {
            for (var b5 = C7N8y.W8U; C7N8y.T7w(b5, this.fieldHeight); b5++) {
                if (this.field[m5][b5].isHole()) {
                    var h5 = C7N8y.d7w(this.getXPosByXIndex(m5), Constants.CELL_SIZE / C7N8y.A8U);
                    var O5 = C7N8y.x7w(this.getYPosByYIndex(b5), Constants.CELL_SIZE);
                    if ((C7N8y.w7w(b5, C7N8y.W8U) && !this.field[m5][C7N8y.z7w(b5, C7N8y.T8U)].isHole()) && (C7N8y.q7w(m5, C7N8y.W8U) && !this.field[C7N8y.n7w(m5, C7N8y.T8U)][b5].isHole())) {
                        var W5 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        W5.x = C7N8y.N7w(h5, C7N8y.S8U);
                        W5.y = C7N8y.H7w(O5, C7N8y.S8U);
                        this.edgesLayer.addChild(W5);
                    }
                    if ((C7N8y.X7w(b5, C7N8y.W8U) && !this.field[m5][C7N8y.C7w(b5, C7N8y.T8U)].isHole()) && (C7N8y.I7w(m5, this.fieldWidth - C7N8y.T8U) && !this.field[m5 + C7N8y.T8U][b5].isHole())) {
                        var R5 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        R5.x = h5 + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        R5.y = C7N8y.i7w(O5, C7N8y.S8U);
                        R5.rotation = +C7N8y.c82;
                        this.edgesLayer.addChild(R5);
                    }
                    if ((C7N8y.b8w(b5, this.fieldHeight - C7N8y.T8U) && !this.field[m5][b5 + C7N8y.T8U].isHole()) && (C7N8y.v8w(m5, C7N8y.W8U) && !this.field[C7N8y.k8w(m5, C7N8y.T8U)][b5].isHole())) {
                        var G5 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        G5.x = C7N8y.O8w(h5, C7N8y.S8U);
                        G5.y = O5 + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        G5.rotation = -C7N8y.c82;
                        this.edgesLayer.addChild(G5);
                    }
                    if ((C7N8y.o8w(b5, this.fieldHeight - C7N8y.T8U) && !this.field[m5][b5 + C7N8y.T8U].isHole()) && (C7N8y.y8w(m5, this.fieldWidth - C7N8y.T8U) && !this.field[m5 + C7N8y.T8U][b5].isHole())) {
                        var S5 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        S5.x = h5 + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        S5.y = O5 + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        S5.rotation = -C7N8y.c52;
                        this.edgesLayer.addChild(S5);
                    }
                } else {
                    var t5 = DNAssetsManager.g_instance.getImage(Images.CELL);
                    this.holeLayer.addChild(t5);
                    t5.x = C7N8y.R8w(this.getXPosByXIndex(m5), Constants.CELL_SIZE / C7N8y.A8U);
                    t5.y = C7N8y.V8w(this.getYPosByYIndex(b5), Constants.CELL_SIZE);
                    if (C7N8y.K8w(m5, C7N8y.W8U) && this.field[C7N8y.D8w(m5, C7N8y.T8U)][b5].isHole()) {
                        var K5 = DNAssetsManager.g_instance.getImage(Images.BORDER_SIDE);
                        K5.rotation = -C7N8y.c82;
                        K5.x = C7N8y.s8w(t5.x, C7N8y.S8U);
                        K5.y = t5.y + Constants.CELL_SIZE;
                        this.edgesLayer.addChildAt(K5, C7N8y.W8U);
                    }
                    if (C7N8y.Y8w(m5, this.fieldWidth - C7N8y.T8U) && this.field[m5 + C7N8y.T8U][b5].isHole()) {
                        var P5 = DNAssetsManager.g_instance.getImage(Images.BORDER_SIDE);
                        P5.rotation = -C7N8y.c82;
                        P5.x = t5.x + Constants.CELL_SIZE - C7N8y.S8U;
                        P5.y = t5.y + Constants.CELL_SIZE;
                        this.edgesLayer.addChildAt(P5, C7N8y.W8U);
                    }
                    if (C7N8y.P8w(b5, C7N8y.W8U) && this.field[m5][C7N8y.t8w(b5, C7N8y.T8U)].isHole()) {
                        var g3 = DNAssetsManager.g_instance.getImage(Images.BORDER_SIDE);
                        g3.x = t5.x;
                        g3.y = C7N8y.B8w(t5.y, C7N8y.S8U);
                        this.edgesLayer.addChildAt(g3, C7N8y.W8U);
                    }
                    if (C7N8y.U8w(b5, this.fieldHeight - C7N8y.T8U) && this.field[m5][b5 + C7N8y.T8U].isHole()) {
                        var J5 = DNAssetsManager.g_instance.getImage(Images.BORDER_SIDE);
                        J5.x = t5.x;
                        J5.y = t5.y + Constants.CELL_SIZE - C7N8y.S8U;
                        this.edgesLayer.addChildAt(J5, C7N8y.W8U);
                    }
                    if ((C7N8y.u8w(b5, C7N8y.W8U) && this.field[m5][C7N8y.m5u(b5, C7N8y.T8U)].isHole()) && (C7N8y.p5u(m5, C7N8y.W8U) && this.field[C7N8y.h5u(m5, C7N8y.T8U)][b5].isHole())) {
                        var W5 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        W5.x = C7N8y.L5u(t5.x, C7N8y.S8U);
                        W5.y = C7N8y.A5u(t5.y, C7N8y.S8U);
                        this.edgesLayer.addChild(W5);
                    }
                    if ((C7N8y.W5u(b5, C7N8y.W8U) && this.field[m5][C7N8y.G5u(b5, C7N8y.T8U)].isHole()) && (C7N8y.f5u(m5, this.fieldWidth - C7N8y.T8U) && this.field[m5 + C7N8y.T8U][b5].isHole())) {
                        var R5 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        R5.x = t5.x + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        R5.y = C7N8y.S5u(t5.y, C7N8y.S8U);
                        R5.rotation = +C7N8y.c82;
                        this.edgesLayer.addChild(R5);
                    }
                    if ((C7N8y.c5u(b5, this.fieldHeight - C7N8y.T8U) && this.field[m5][b5 + C7N8y.T8U].isHole()) && (C7N8y.j5u(m5, C7N8y.W8U) && this.field[C7N8y.Q5u(m5, C7N8y.T8U)][b5].isHole())) {
                        var G5 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        G5.x = C7N8y.l5u(t5.x, C7N8y.S8U);
                        G5.y = t5.y + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        G5.rotation = -C7N8y.c82;
                        this.edgesLayer.addChild(G5);
                    }
                    if ((C7N8y.Z5u(b5, this.fieldHeight - C7N8y.T8U) && this.field[m5][b5 + C7N8y.T8U].isHole()) && (C7N8y.J5u(m5, this.fieldWidth - C7N8y.T8U) && this.field[m5 + C7N8y.T8U][b5].isHole())) {
                        var S5 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        S5.x = t5.x + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        S5.y = t5.y + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        S5.rotation = -C7N8y.c52;
                        this.edgesLayer.addChild(S5);
                    }
                }
            }
        }
    };
    E3.prototype.createChipWithColorID = function(m5, b5, h5, O5) {
        var W5 = new MapEditorChip(O5, m5, b5);
        W5.setIncexes(m5, b5);
        this.addGameObjectAtPos(W5, this.backChipsLayer, this.getXPosByXIndex(m5), this.getYPosByYIndex(b5));
        this.field[m5][b5] = W5;
    };
    E3.prototype.getXPosByXIndex = function(m5) {
        return C7N8y.e5u(m5, Constants.CELL_SIZE) + C7N8y.a5u(Constants.CELL_SIZE, C7N8y.A8U) + Constants.FIELD_OFFSET_X;
    };
    E3.prototype.getYPosByYIndex = function(m5) {
        return C7N8y.g3u(m5, Constants.CELL_SIZE) + C7N8y.E3u(Constants.CELL_SIZE, C7N8y.A8U) + Constants.FIELD_OFFSET_Y;
    };
    E3.prototype.onMouseDown = function(m5, b5) {
        F3.prototype.onMouseDown.call(this, m5, b5);
        b5 -= this.y;
        var h5 = this.findChipAt(m5, b5);
        if (h5) {
            switch (this.inputMode) {
                case E3.INPUT_MODE_FORM:
                    if (h5.isHole()) {
                        h5.convertHoleToChip();
                    } else {
                        h5.convertToHole();
                        this.resetDirtAt(h5.getIndexX(), h5.getIndexY());
                    }
                    break;
                case E3.INPUT_MODE_CANDY:
                    if (!h5.isHole()) {
                        h5.nextID();
                    }
                    break;
                case E3.INPUT_MODE_CAGE:
                    if (!h5.isHole()) {
                        if (h5.haveCage()) {
                            h5.removeCage();
                        } else {
                            h5.setCage();
                        }
                    }
                    break;
                case E3.INPUT_MODE_CHOCOLATE:
                    if (!h5.isHole()) {
                        h5.convertToChocolate();
                    }
                    break;
                case E3.INPUT_MODE_STONE:
                    if (!h5.isHole()) {
                        h5.convertToStoneHeart();
                    }
                    break;
                case E3.INPUT_MODE_STRAWBERRY:
                    if (!h5.isHole()) {
                        h5.convertToStrawberry();
                    }
                    break;
                case E3.INPUT_MODE_DIRT:
                    if (!h5.isHole()) {
                        this.setDirtAt(h5.getIndexX(), h5.getIndexY());
                    }
                    break;
            }
            this.rebuildEdges();
        }
    };
    E3.prototype.findChipAt = function(m5, b5) {
        for (var h5 = C7N8y.W8U; C7N8y.M3u(h5, this.fieldWidth); h5++) {
            for (var O5 = C7N8y.W8U; C7N8y.r3u(O5, this.fieldHeight); O5++) {
                var W5 = this.field[h5][O5];
                if (W5) {
                    if ((C7N8y.F3u(Math.abs(W5.x - m5), Constants.CELL_SIZE / C7N8y.A8U)) && (C7N8y.T3u(W5.y, b5) && C7N8y.d3u(W5.y, b5 + Constants.CELL_SIZE))) {
                        return W5;
                    }
                }
            }
        }
        return C7N8y.S22;
    };
    E3.prototype.onRestartTouch = function() {
        this.inputModeText.text = this.inputMode;
        var m5 = this.allModes.indexOf(this.inputMode);
        m5 = C7N8y.x3u((m5 + 1), this.allModes.length);
        this.inputMode = this.allModes[m5];
        this.inputModeText.text = this.inputMode;
    };
    E3.prototype.onPlayTouch = function() {
        this.generageLevel();
        DNStateManager.g_instance.pushState(new PlayState(-C7N8y.T8U, C7N8y.Q72, []));
    };
    E3.prototype.generageLevel = function() {
        var m5 = GameData.getInstance().mapEditorLevel;
        for (var b5 = C7N8y.W8U; C7N8y.w3u(b5, this.fieldWidth); b5++) {
            for (var h5 = C7N8y.W8U; C7N8y.z3u(h5, this.fieldHeight); h5++) {
                m5.form[h5][b5] = (this.field[b5][h5].isHole() ? C7N8y.W8U : C7N8y.T8U);
                if (this.field[b5][h5].isHole()) {
                    m5.chips[h5][b5] = C7N8y.W8U;
                } else {
                    if (this.field[b5][h5].isStoneHeart()) {
                        m5.chips[h5][b5] = C7N8y.c8U;
                    } else {
                        if (this.field[b5][h5].isStrawberry()) {
                            m5.chips[h5][b5] = C7N8y.D8U;
                        } else {
                            if (this.field[b5][h5].isChocolate()) {
                                m5.chips[h5][b5] = -C7N8y.T8U;
                            } else {
                                m5.chips[h5][b5] = this.field[b5][h5].getColorID() + (this.field[b5][h5].haveCage() ? C7N8y.J12 : C7N8y.W8U);
                            }
                        }
                    }
                }
            }
        }
        var O5 = C7N8y.Q72;
        for (var b5 = C7N8y.W8U; C7N8y.q3u(b5, this.fieldWidth); b5++) {
            for (var h5 = C7N8y.W8U; C7N8y.n3u(h5, this.fieldHeight); h5++) {
                if (C7N8y.N3u(this.fieldDirt[b5][h5], C7N8y.W8U)) {
                    O5 = C7N8y.s22;
                }
            }
        }
        if (O5) {
            var W5 = new Array(this.fieldHeight);
            for (var R5 = C7N8y.W8U; C7N8y.H3u(R5, this.fieldHeight); R5++) {
                W5[R5] = new Array(this.fieldWidth);
            }
            for (var b5 = C7N8y.W8U; C7N8y.X3u(b5, this.fieldWidth); b5++) {
                for (var h5 = C7N8y.W8U; C7N8y.C3u(h5, this.fieldHeight); h5++) {
                    W5[h5][b5] = this.fieldDirt[b5][h5];
                }
            }
            m5.dirt = W5;
        } else {
            m5.dirt = C7N8y.S22;
        }
        if (this.loseTypeMoves) {
            m5.moves = this.loseCounter;
            m5.time = C7N8y.W8U;
        } else {
            m5.moves = C7N8y.W8U;
            m5.time = this.loseCounter;
        }
        m5.score_goal_count = C7N8y.W8U;
        m5.chip_goal = C7N8y.W8U;
        m5.chip_types = this.colorsCount;
        switch (this.goal) {
            case C7N8y.B12:
                m5.goal = PlayState.GOAL_SCORE;
                m5.score_goal_count = this.goalCounter;
                break;
            case C7N8y.i7U:
                m5.goal = PlayState.GOAL_STRAWBERRY;
                break;
            case C7N8y.n12:
                m5.goal = PlayState.GOAL_DIRT;
                break;
            case C7N8y.i72:
                m5.goal = PlayState.GOAL_COUNT;
                m5.chip_goal = C7N8y.T8U;
                m5.chip_goal_count = this.goalCounter;
                break;
            case C7N8y.c72:
                m5.goal = PlayState.GOAL_COUNT;
                m5.chip_goal = C7N8y.A8U;
                m5.chip_goal_count = this.goalCounter;
                break;
            case C7N8y.i62:
                m5.goal = PlayState.GOAL_COUNT;
                m5.chip_goal = C7N8y.L8U;
                m5.chip_goal_count = this.goalCounter;
                break;
            case C7N8y.n62:
                m5.goal = PlayState.GOAL_COUNT;
                m5.chip_goal = C7N8y.S8U;
                m5.chip_goal_count = this.goalCounter;
                break;
            case C7N8y.W62:
                m5.goal = PlayState.GOAL_COUNT;
                m5.chip_goal = C7N8y.f8U;
                m5.chip_goal_count = this.goalCounter;
                break;
            case C7N8y.i12:
                m5.goal = PlayState.GOAL_COUNT;
                m5.chip_goal = C7N8y.x8U;
                m5.chip_goal_count = this.goalCounter;
                break;
            case C7N8y.Z12:
                m5.goal = PlayState.GOAL_COUNT;
                m5.chip_goal = C7N8y.d8U;
                m5.chip_goal_count = this.goalCounter;
                break;
        }
        m5.bombCounter = this.bombCounter;
        m5.bombProb = C7N8y.I3u(this.bombProb, C7N8y.G82);
        console.log(JSON.stringify(m5));
    };
    E3.prototype.nextBombCounter = function() {
        this.bombCounter++;
        if (C7N8y.i3u(this.bombCounter, C7N8y.Z92)) {
            this.bombCounter = C7N8y.T8U;
        }
        this.findGUIObject(C7N8y.S5m).setText(this.bombCounter.toString());
    };
    E3.prototype.nextBombProb = function() {
        this.bombProb += C7N8y.A8U;
        if (C7N8y.b0u(this.bombProb, C7N8y.G82)) {
            this.bombProb = C7N8y.W8U;
        }
        this.findGUIObject(C7N8y.M82).setText(this.bombProb.toString());
    };
    E3.prototype.onShuffleTouch = function() {
        for (var m5 = C7N8y.W8U; C7N8y.v0u(m5, this.fieldWidth); m5++) {
            for (var b5 = C7N8y.W8U; C7N8y.k0u(b5, this.fieldHeight); b5++) {
                if (!this.field[m5][b5].isHole()) {
                    this.field[m5][b5].randomID(this.colorsCount);
                }
            }
        }
    };
    E3.prototype.onColorsCountTouch = function() {
        this.colorsCount++;
        if (C7N8y.O0u(this.colorsCount, C7N8y.D8U)) {
            this.colorsCount = C7N8y.L8U;
        }
        this.findGUIObject(C7N8y.v42).setText(this.colorsCount.toString());
    };
    Z3(j3);
    e3(f3);
    r3(n3);
    q3(h3);
    Q3(d3);
    R0(u5);
    g0(Q5);
    return E3;
})(DNGameState),

//add by nada mode 1
PauseState = (function(g3) {
    function J5() {
        var b5 = function(m5) {
            P5.x = m5;
        };
        var h5 = function() {
            K5.x = -C7N8y.N7U;
        };
        var O5 = function(m5) {
            t5.x = m5;
        };
        var W5 = function(m5) {
            K5.y = m5;
        };
        var R5 = function() {
            t5.y = -C7N8y.b42;
        };
        var G5 = function(m5) {
            P5.y = m5;
        };
        var S5 = this;
        g3.call(this);
        var t5 = new DNJellyButton(Images.BUTTON_CLOSE, function() {
            return S5.hide();
        });
        this.panel.addChild(t5);
        this.addGuiObject(t5);
        O5(C7N8y.R5m);
        R5();
        var K5 = new DNJellyButton(Images.BUTTON_RESTART, function() {
            return S5.onRestartTouch();
        });
        this.panel.addChild(K5);
        this.addGuiObject(K5);
        h5();
        W5(C7N8y.a52);
        var P5 = new DNJellyButton(Images.BUTTON_EXIT, function() {
            return S5.onExitTouch();
        });
        this.panel.addChild(P5);
        this.addGuiObject(P5);
        b5(C7N8y.W8U);
        G5(C7N8y.a52);
        this.setSoundButton();
    }
    __extends(J5, g3);
    J5.prototype.setSoundButton = function() {
        var m5 = this;
        if (this.soundButton && this.soundButton.parent) {
            this.soundButton.parent.removeChild(this.soundButton);
        }
        var b5 = DNSoundManager.g_instance.isSoundEnabled();
        this.soundButton = new DNJellyButton(b5 ? Images.BUTTON_SOUND_ON : Images.BUTTON_SOUND_OFF, function() {
            return m5.onSoundTouch();
        });
        this.panel.addChild(this.soundButton);
        this.addGuiObject(this.soundButton);
        this.soundButton.x = C7N8y.N7U;
        this.soundButton.y = C7N8y.a52;
    };
    J5.prototype.update = function(m5) {
        g3.prototype.update.call(this, m5);
    };
    J5.prototype.onSoundTouch = function() {
        DNSoundManager.g_instance.setSoundEnabled(!DNSoundManager.g_instance.isSoundEnabled());
        this.setSoundButton();
    };
    return J5;
})(PopupState),
PlayState = (function(c3) {
    var l3 = "LOSE_TYPE_TIME";
    var S3 = "LOSE_TYPE_MOVES";
    var x3 = "INPUT_STATE_MATCHING";
    var J3 = "INPUT_STATE_SHIFT";
    var b0 = "INPUT_STATE_WAIT_SPAWN";
    var G3 = "INPUT_STATE_LOCK";
    var W3 = "INPUT_STATE_WAIT_SELECTION";
    var n0 = "LOSE_REASON_BOMB";
    var N0 = "LOSE_REASON_MOVES";
    var K0 = "LOSE_REASON_TIME";
    var k0 = function(m5) {
        B5.INPUT_STATE_WAIT_SPAWN = m5;
    };
    var M0 = function(m5) {
        B5.INPUT_STATE_LOCK = m5;
    };
    var O0 = function(m5) {
        B5.LOSE_TYPE_TIME = m5;
    };
    var d0 = function() {
        B5.g_curLevel = -C7N8y.T8U;
    };
    var X3 = function(m5) {
        B5.LOSE_TYPE_MOVES = m5;
    };
    var I3 = function(m5) {
        B5.INPUT_STATE_MATCHING = m5;
    };
    var H3 = function(m5) {
        B5.GOAL_DIRT = m5;
    };
    var w3 = function(m5) {
        B5.GOAL_COUNT = m5;
    };

    function B5(b5, h5, O5) {
        var W5 = "LEVEL";
        var R5 = function(m5) {
            B5.g_curLevel = m5;
        };
        var G5 = this;
        c3.call(this);
        this.matchInARow = C7N8y.W8U;
        this.inputState = C7N8y.S22;
        this.loseType = C7N8y.S22;
        this.dirtCount = C7N8y.W8U;
        this.fieldWidth = C7N8y.D8U + C7N8y.A8U;
        this.fieldHeight = C7N8y.D8U;
        this.bombProb = C7N8y.j72;
        this.bombCounter = C7N8y.R12;
        this.selectedChip = C7N8y.S22;
        this.swapChip1 = C7N8y.S22;
        this.swapChip2 = C7N8y.S22;
        this.lastMovedChip = C7N8y.S22;
        this.dirtLayer = new createjs.Container();
        this.underChipsLayer = new createjs.Container();
        this.backChipsLayer = new createjs.Container();
        this.holeLayer = new createjs.Container();
        this.edgesLayer = new createjs.Container();
        this.frontChipsLayer = new createjs.Container();
        this.effectsLayer = new createjs.Container();
        this.inputStateTime = C7N8y.W8U;
        this.score = C7N8y.W8U;
        this.tmpScore = C7N8y.W8U;
        this.moves = C7N8y.a92;
        this.time = C7N8y.w62;
        this.findedMatchPos1 = C7N8y.S22;
        this.findedMatchPos2 = C7N8y.S22;
        this.moveHint = C7N8y.S22;
        this.chipTypesCount = C7N8y.f8U;
        this.awesomeEffectTime = C7N8y.W8U;
        this.superbEffectTime = C7N8y.W8U;
        this.waitLose = C7N8y.Q72;
        this.waitLoseTime = C7N8y.W8U;
        this.waitWin = C7N8y.Q72;
        this.stars = C7N8y.W8U;
        this.waitWinTime = C7N8y.W8U;
        this.wasChocolateClear = C7N8y.s22;
        this.showHint = C7N8y.Q72;
        this.lastDropSoundTime = -C7N8y.J12;
        this.lastDropID = -C7N8y.T8U;
        this.lastSound = C7N8y.S22;
        this.needRunSplashTime = C7N8y.s22;
        this.lolipop = C7N8y.Q72;
        if (Constants.DEBUG_MODE) {
            console.log(W5, b5);
        }
        R5(b5);
        this.addChild(DNAssetsManager.g_instance.getImage(Images.MAIN_MENU_BACK));
        var S5 = new createjs.Container();
        this.loadLayout(CurLayouts.PLAYSTATE_LAYOUT, S5);
        this.findGUIObject(Layouts.NAME_PAUSE).setHandler(function() {
            return G5.onPauseClick();
        });
        this.goalLabel = (this.findGUIObject(Layouts.NAME_GOAL_LABEL));
        for (var t5 = C7N8y.W8U; C7N8y.s0u(t5, C7N8y.f8U); t5++) {
            this.addGameObjectAtPos(new Cloud(C7N8y.s22), this, Utils.RandomRange(C7N8y.W8U, C7N8y.L32), Utils.RandomRange(C7N8y.N7U, C7N8y.g92));
        }
        B5.g_instance = this;
        var K5 = GameData.getInstance().getLevelDef(b5);
        this.bombProb = K5.bombProb;
        this.bombCounter = K5.bombCounter;
        this.chipTypesCount = K5.chip_types;
        this.field = new Array(this.fieldWidth);
        for (var t5 = C7N8y.W8U; C7N8y.Y0u(t5, this.fieldWidth); t5++) {
            this.field[t5] = new Array(this.fieldHeight);
        }
        NADA_Hooks.gameCurrentlevel(K5,b5);
        this.addChild(this.holeLayer);
        this.addChild(this.dirtLayer);
        this.addChild(this.edgesLayer);
        this.addChild(this.underChipsLayer);
        this.addChild(this.backChipsLayer);
        this.addChild(this.frontChipsLayer);
        this.addChild(this.effectsLayer);
        this.matchInARow = C7N8y.W8U;
        this.goal = K5.goal;
        this.spawnDefinedChips(K5.chips);
        var P5 = K5.form;
        for (var g3 = C7N8y.W8U; C7N8y.P0u(g3, this.fieldWidth); g3++) {
            for (var J5 = C7N8y.W8U; C7N8y.t0u(J5, this.fieldHeight); J5++) {
                if (C7N8y.B0u(P5[J5][g3], C7N8y.W8U)) {
                    this.field[g3][J5].convertToHole();
                    this.holeLayer.addChild(this.field[g3][J5]);
                    var F3 = C7N8y.U0u(this.getXPosByXIndex(g3), Constants.CELL_SIZE / C7N8y.A8U);
                    var Q5 = C7N8y.u0u(this.getYPosByYIndex(J5), Constants.CELL_SIZE);
                    if ((C7N8y.m2u(J5, C7N8y.W8U) && C7N8y.p2u(P5[J5 - C7N8y.T8U][g3], C7N8y.W8U)) && (C7N8y.h2u(g3, C7N8y.W8U) && C7N8y.L2u(P5[J5][g3 - C7N8y.T8U], C7N8y.W8U))) {
                        var u5 = function() {
                            h3.y = C7N8y.A2u(Q5, C7N8y.S8U);
                        };
                        var d3 = function() {
                            h3.x = C7N8y.W2u(F3, C7N8y.S8U);
                        };
                        var h3 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        d3();
                        u5();
                        this.edgesLayer.addChild(h3);
                    }
                    if ((C7N8y.G2u(J5, C7N8y.W8U) && C7N8y.f2u(P5[J5 - C7N8y.T8U][g3], C7N8y.W8U)) && (C7N8y.S2u(g3, this.fieldWidth - C7N8y.T8U) && C7N8y.c2u(P5[J5][g3 + C7N8y.T8U], C7N8y.W8U))) {
                        var n3 = function() {
                            r3.x = F3 + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        };
                        var f3 = function() {
                            r3.y = C7N8y.j2u(Q5, C7N8y.S8U);
                        };
                        var j3 = function() {
                            r3.rotation = +C7N8y.c82;
                        };
                        var r3 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        n3();
                        f3();
                        j3();
                        this.edgesLayer.addChild(r3);
                    }
                    if ((C7N8y.Q2u(J5, this.fieldHeight - C7N8y.T8U) && C7N8y.l2u(P5[J5 + C7N8y.T8U][g3], C7N8y.W8U)) && (C7N8y.Z2u(g3, C7N8y.W8U) && C7N8y.J2u(P5[J5][g3 - C7N8y.T8U], C7N8y.W8U))) {
                        var Z3 = function() {
                            q3.rotation = -C7N8y.c82;
                        };
                        var Q3 = function() {
                            q3.x = C7N8y.e2u(F3, C7N8y.S8U);
                        };
                        var e3 = function() {
                            q3.y = Q5 + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        };
                        var q3 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        Q3();
                        e3();
                        Z3();
                        this.edgesLayer.addChild(q3);
                    }
                    if ((C7N8y.a2u(J5, this.fieldHeight - C7N8y.T8U) && C7N8y.g4u(P5[J5 + C7N8y.T8U][g3], C7N8y.W8U)) && (C7N8y.E4u(g3, this.fieldWidth - C7N8y.T8U) && C7N8y.M4u(P5[J5][g3 + C7N8y.T8U], C7N8y.W8U))) {
                        var g0 = function() {
                            m3.x = F3 + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        };
                        var E3 = function() {
                            m3.rotation = -C7N8y.c52;
                        };
                        var R0 = function() {
                            m3.y = Q5 + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        };
                        var m3 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        g0();
                        R0();
                        E3();
                        this.edgesLayer.addChild(m3);
                    }
                } else {
                    var N3 = DNAssetsManager.g_instance.getImage(Images.CELL);
                    this.holeLayer.addChild(N3);
                    N3.x = C7N8y.r4u(this.getXPosByXIndex(g3), Constants.CELL_SIZE / C7N8y.A8U);
                    N3.y = C7N8y.F4u(this.getYPosByYIndex(J5), Constants.CELL_SIZE);
                    if (C7N8y.T4u(g3, C7N8y.W8U) && C7N8y.d4u(P5[J5][g3 - C7N8y.T8U], C7N8y.W8U)) {
                        var v0 = function() {
                            T0.x = C7N8y.x4u(N3.x, C7N8y.S8U);
                        };
                        var z0 = function() {
                            T0.y = N3.y + Constants.CELL_SIZE;
                        };
                        var D0 = function() {
                            T0.rotation = -C7N8y.c82;
                        };
                        var T0 = DNAssetsManager.g_instance.getImage(Images.BORDER_SIDE);
                        D0();
                        v0();
                        z0();
                        this.edgesLayer.addChildAt(T0, C7N8y.W8U);
                    }
                    if (C7N8y.w4u(g3, this.fieldWidth - C7N8y.T8U) && C7N8y.z4u(P5[J5][g3 + C7N8y.T8U], C7N8y.W8U)) {
                        var q0 = function() {
                            P0.rotation = -C7N8y.c82;
                        };
                        var w0 = function() {
                            P0.y = N3.y + Constants.CELL_SIZE;
                        };
                        var V0 = function() {
                            P0.x = N3.x + Constants.CELL_SIZE - C7N8y.S8U;
                        };
                        var P0 = DNAssetsManager.g_instance.getImage(Images.BORDER_SIDE);
                        q0();
                        V0();
                        w0();
                        this.edgesLayer.addChildAt(P0, C7N8y.W8U);
                    }
                    if (C7N8y.q4u(J5, C7N8y.W8U) && C7N8y.n4u(P5[J5 - C7N8y.T8U][g3], C7N8y.W8U)) {
                        var I0 = function() {
                            H0.y = C7N8y.N4u(N3.y, C7N8y.S8U);
                        };
                        var U0 = function(m5) {
                            H0.x = m5.x;
                        };
                        var H0 = DNAssetsManager.g_instance.getImage(Images.BORDER_SIDE);
                        U0(N3);
                        I0();
                        this.edgesLayer.addChildAt(H0, C7N8y.W8U);
                    }
                    if (C7N8y.H4u(J5, this.fieldHeight - C7N8y.T8U) && C7N8y.X4u(P5[J5 + C7N8y.T8U][g3], C7N8y.W8U)) {
                        var p5 = function() {
                            k5.y = N3.y + Constants.CELL_SIZE - C7N8y.S8U;
                        };
                        var v5 = function(m5) {
                            k5.x = m5.x;
                        };
                        var k5 = DNAssetsManager.g_instance.getImage(Images.BORDER_SIDE);
                        v5(N3);
                        p5();
                        this.edgesLayer.addChildAt(k5, C7N8y.W8U);
                    }
                    if ((C7N8y.C4u(J5, C7N8y.W8U) && C7N8y.I4u(P5[J5 - C7N8y.T8U][g3], C7N8y.W8U)) && (C7N8y.i4u(g3, C7N8y.W8U) && C7N8y.b9u(P5[J5][g3 - C7N8y.T8U], C7N8y.W8U))) {
                        var L5 = function() {
                            h3.y = C7N8y.v9u(N3.y, C7N8y.S8U);
                        };
                        var o5 = function() {
                            h3.x = C7N8y.k9u(N3.x, C7N8y.S8U);
                        };
                        var h3 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        o5();
                        L5();
                        this.edgesLayer.addChild(h3);
                    }
                    if ((C7N8y.O9u(J5, C7N8y.W8U) && C7N8y.o9u(P5[J5 - C7N8y.T8U][g3], C7N8y.W8U)) && (C7N8y.y9u(g3, this.fieldWidth - C7N8y.T8U) && C7N8y.R9u(P5[J5][g3 + C7N8y.T8U], C7N8y.W8U))) {
                        var A5 = function() {
                            r3.rotation = +C7N8y.c82;
                        };
                        var y5 = function() {
                            r3.x = N3.x + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        };
                        var f5 = function() {
                            r3.y = C7N8y.V9u(N3.y, C7N8y.S8U);
                        };
                        var r3 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        y5();
                        f5();
                        A5();
                        this.edgesLayer.addChild(r3);
                    }
                    if ((C7N8y.K9u(J5, this.fieldHeight - C7N8y.T8U) && C7N8y.D9u(P5[J5 + C7N8y.T8U][g3], C7N8y.W8U)) && (C7N8y.s9u(g3, C7N8y.W8U) && C7N8y.Y9u(P5[J5][g3 - C7N8y.T8U], C7N8y.W8U))) {
                        var V5 = function() {
                            q3.rotation = -C7N8y.c82;
                        };
                        var j5 = function() {
                            q3.x = C7N8y.P9u(N3.x, C7N8y.S8U);
                        };
                        var s5 = function() {
                            q3.y = N3.y + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        };
                        var q3 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        j5();
                        s5();
                        V5();
                        this.edgesLayer.addChild(q3);
                    }
                    if ((C7N8y.t9u(J5, this.fieldHeight - C7N8y.T8U) && C7N8y.B9u(P5[J5 + C7N8y.T8U][g3], C7N8y.W8U)) && (C7N8y.U9u(g3, this.fieldWidth - C7N8y.T8U) && C7N8y.u9u(P5[J5][g3 + C7N8y.T8U], C7N8y.W8U))) {
                        var Z5 = function() {
                            m3.x = N3.x + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        };
                        var Y5 = function() {
                            m3.rotation = -C7N8y.c52;
                        };
                        var D5 = function() {
                            m3.y = N3.y + Constants.CELL_SIZE + C7N8y.D8U - C7N8y.S8U;
                        };
                        var m3 = DNAssetsManager.g_instance.getImage(Images.BORDER_CORNER);
                        Z5();
                        D5();
                        Y5();
                        this.edgesLayer.addChild(m3);
                    }
                }
            }
        }
        this.holeLayer.cache(C7N8y.W8U, C7N8y.W8U, Constants.ASSETS_WIDTH, Constants.ASSETS_HEIGHT, C7N8y.T8U);
        this.edgesLayer.cache(C7N8y.W8U, C7N8y.W8U, Constants.ASSETS_WIDTH, Constants.ASSETS_HEIGHT, C7N8y.T8U);
        this.fieldDirt = new Array(this.fieldWidth);
        for (var t5 = C7N8y.W8U; C7N8y.m1u(t5, this.fieldWidth); t5++) {
            this.fieldDirt[t5] = new Array(this.fieldHeight);
        }
        var U5 = K5.dirt;
        if (U5) {
            for (var g3 = C7N8y.W8U; C7N8y.p1u(g3, this.fieldWidth); g3++) {
                for (var J5 = C7N8y.W8U; C7N8y.h1u(J5, this.fieldHeight); J5++) {
                    if (C7N8y.L1u(U5[J5][g3], C7N8y.W8U)) {
                        var p3 = function() {
                            l5.name = (C7N8y.A1u(U5[J5][g3], C7N8y.T8U) ? Images.DIRT_1 : Images.DIRT_2);
                        };
                        this.dirtCount++;
                        var l5 = DNAssetsManager.g_instance.getCenteredImageWithProxy(C7N8y.W1u(U5[J5][g3], C7N8y.T8U) ? Images.DIRT_1 : Images.DIRT_2);
                        p3();
                        l5.x = this.getXPosByXIndex(g3);
                        l5.y = C7N8y.G1u(this.getYPosByYIndex(J5), Constants.CELL_SIZE / C7N8y.A8U);
                        this.dirtLayer.addChild(l5);
                        this.fieldDirt[g3][J5] = l5;
                    }
                }
            }
        }
        this.addChild(this.scoreLabel);
        this.scoreLabel = (this.findGUIObject(Layouts.NAME_SCORE));
        this.moves = K5.moves;
        this.time = K5.time;
        var A3 = this.findGUIObject(C7N8y.e12);
        if (C7N8y.f1u(this.moves, C7N8y.W8U)) {
            this.loseType = B5.LOSE_TYPE_MOVES;
            this.movesLabel = (this.findGUIObject(Layouts.NAME_MOVES));
            this.movesLabel.setText(this.moves.toString());
            this.movesLabel.x = C7N8y.Z92;
            A3.addChild(DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.MOVES_ICON));
        }
        if (C7N8y.S1u(this.time, C7N8y.W8U)) {
            this.loseType = B5.LOSE_TYPE_TIME;
            this.timeLabel = (this.findGUIObject(Layouts.NAME_MOVES));
            A3.addChild(DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.TIME_ICON));
            A3.scaleX = A3.scaleY = C7N8y.Z72;
            this.timeLabel.scaleX = this.timeLabel.scaleY = C7N8y.B22;
            this.timeLabel.y += C7N8y.S8U;
        }
        var L3 = C7N8y.S22;
        switch (this.goal) {
            case B5.GOAL_DIRT:
                L3 = DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.DIRT_1);
                this.goalLabel.setText(this.dirtCount.toString());
                break;
            case B5.GOAL_COUNT:
                this.goalChipID = K5.chip_goal;
                this.chipGoalCount = K5.chip_goal_count;
                this.goalLabel.setText(this.chipGoalCount.toString());
                L3 = DNAssetsManager.g_instance.getCenteredImageWithProxy(C7N8y.w02 + this.goalChipID);
                break;
            case B5.GOAL_SCORE:
                L3 = DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.SCORE_ICON);
                this.scoreGoalCount = K5.score_goal_count;
                this.goalLabel.setText(this.scoreGoalCount.toString());
                break;
            case B5.GOAL_STRAWBERRY:
                L3 = DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.STRAWBERRY);
                this.goalLabel.setText(this.calcStrawberryCount().toString());
                break;
        }
        var e5 = Math.max(L3.getBounds().width, L3.getBounds().height);
        L3.scaleX = L3.scaleY = C7N8y.c1u(C7N8y.r72, e5);
        this.findGUIObject(C7N8y.e82).addChild(L3);
        this.addChild(S5);
        if (h5) {
            var z3 = new TaskEffect(K5);
            this.addGameObject(z3);
            this.addChild(z3);
        }
        for (var t5 = C7N8y.W8U; C7N8y.j1u(t5, O5.length); t5++) {
            this.activateBooster(O5[t5]);
        }
        this.booster1 = new ActivateBoosterButton(Images.BOOSTER_LOLIPOP, GameData.BOOSTER_LOLIPOP);
        this.findGUIObject(C7N8y.k92).addChild(this.booster1);
        this.addGuiObject(this.booster1);
        if (C7N8y.Q1u(this.loseType, B5.LOSE_TYPE_MOVES)) {
            this.booster2 = new ActivateBoosterButton(Images.BOOSTER_MOVES, GameData.BOOSTER_MOVES);
        } else {
            this.booster2 = new ActivateBoosterButton(Images.BOOSTER_TIME, GameData.BOOSTER_TIME);
        }
        this.findGUIObject(C7N8y.J42).addChild(this.booster2);
        this.addGuiObject(this.booster2);
        this.update(C7N8y.W8U);
        try {
            SG_Hooks.start('PlayState');
        } catch (m5) {
            var q0 = "error SG_Hooks start;";
            console.log(q0);
        }
    }
    var E0 = function(m5) {
        B5.LOSE_REASON_MOVES = m5;
    };
    var Y0 = function(m5) {
        B5.INPUT_STATE_WAIT_SELECTION = m5;
    };
    var F0 = function(m5) {
        B5.INPUT_STATE_SHIFT = m5;
    };
    var u0 = function(m5) {
        B5.LOSE_REASON_BOMB = m5;
    };
    var M3 = function(m5) {
        B5.GOAL_SCORE = m5;
    };
    var i0 = function(m5) {
        B5.LOSE_REASON_TIME = m5;
    };
    var t0 = function(m5) {
        B5.GOAL_STRAWBERRY = m5;
    };
    __extends(B5, c3);
    B5.prototype.onPauseClick = function() {
        if (B5.g_curLevel != -C7N8y.T8U) {
            DNStateManager.g_instance.pushState(new PauseState());
        } else {
            DNStateManager.g_instance.popState();
        }
    };
    B5.prototype.calcStrawberryCount = function() {
        var m5 = C7N8y.W8U;
        for (var b5 = C7N8y.W8U; C7N8y.l1u(b5, this.fieldWidth); b5++) {
            for (var h5 = C7N8y.W8U; C7N8y.Z1u(h5, this.fieldHeight); h5++) {
                if (this.field[b5][h5] && this.field[b5][h5].isStrawberry()) {
                    if (C7N8y.J1u(this.field[b5][h5].getState(), Chip.STATE_FALL_DOWN)) {
                        m5++;
                    }
                }
            }
        }
        return m5;
    };
    B5.prototype.runSplashTime = function() {
        if (C7N8y.e1u(this.loseType, B5.LOSE_TYPE_MOVES)) {
            this.addGameObject(new SplashTimeEffect(Math.min(Math.floor(C7N8y.a1u(this.moves, C7N8y.L8U)) + C7N8y.T8U, C7N8y.d8U)));
        } else {
            this.addGameObject(new SplashTimeEffect(Math.min(Math.floor(C7N8y.g6u(this.time, C7N8y.D8U)) + C7N8y.T8U, C7N8y.d8U)));
        }
        this.addGameObjectAt(new SplashTimeMessage(), this);
    };
    B5.prototype.createChip = function(m5, b5, h5) {
        var O5 = Utils.RandomRangeInt(C7N8y.T8U, this.chipTypesCount);
        var W5 = new Chip(O5, m5, b5, this.getYPosByYIndex(b5), h5);
        W5.setIncexes(m5, b5);
        this.addGameObjectAtPos(W5, this.backChipsLayer, this.getXPosByXIndex(m5), -Constants.CELL_SIZE);
        this.field[m5][b5] = W5;
        if (C7N8y.E6u(Math.random(), this.bombProb)) {
            W5.convertToBomb(this.bombCounter);
        }
    };
    B5.prototype.createChipWithColorID = function(m5, b5, h5, O5) {
        var W5 = new Chip(O5, m5, b5, this.getYPosByYIndex(b5), h5);
        W5.setIncexes(m5, b5);
        this.addGameObjectAtPos(W5, this.backChipsLayer, this.getXPosByXIndex(m5), -Constants.CELL_SIZE);
        this.field[m5][b5] = W5;
    };
    B5.prototype.getXPosByXIndex = function(m5) {
        return C7N8y.M6u(m5, Constants.CELL_SIZE) + C7N8y.r6u(Constants.CELL_SIZE, C7N8y.A8U) + Constants.FIELD_OFFSET_X;
    };
    B5.prototype.getYPosByYIndex = function(m5) {
        return C7N8y.F6u(m5, Constants.CELL_SIZE) + C7N8y.T6u(Constants.CELL_SIZE, C7N8y.A8U) + Constants.FIELD_OFFSET_Y;
    };
    B5.prototype.update = function(m5) {
        c3.prototype.update.call(this, m5);
        if (this.waitWin && C7N8y.d6u(this.inputState, B5.INPUT_STATE_WAIT_SELECTION)) {
            this.waitWinTime += m5;
            if (C7N8y.x6u(this.waitWinTime, 0.9)) {
                if (B5.g_curLevel == -1) {
                    DNStateManager.g_instance.popState();
                } else {
                    DNStateManager.g_instance.pushState(new WinState(B5.g_curLevel, this.score, this.stars));
                }
                return;
            }
        }
        if (this.waitLose) {
            this.waitLoseTime += m5;
            if (C7N8y.w6u(this.waitLoseTime, 2.4)) {
                if (B5.g_curLevel == -1) {
                    DNStateManager.g_instance.popState();
                } else {
                    DNStateManager.g_instance.pushState(new GameOverState(B5.g_curLevel, this.score, this.loseReason));
                }
                return;
            }
        }
        if (C7N8y.z6u(this.loseType, B5.LOSE_TYPE_TIME) && !this.waitWin && !this.waitLose) {
            this.time -= m5;
            if (C7N8y.q6u(this.time, 0)) {
                this.time = 0;
                this.lose(B5.LOSE_REASON_TIME);
            }
            this.timeLabel.setText(Utils.IntToTimeString(Math.round(this.time)));
        }
        this.inputStateTime += m5;
        if (C7N8y.n6u(this.inputState, B5.INPUT_STATE_WAIT_SELECTION)) {
            if (this.moveHint) {
                if (this.moveHint.isDead()) {
                    this.moveHint = null;
                } else {
                    this.moveHint.hide();
                }
            }
        }
        switch (this.inputState) {
            case B5.INPUT_STATE_WAIT_SELECTION:
                var b5 = 3;
                if (C7N8y.N6u(this.inputStateTime, b5) && this.moveHint && !this.moveHint.parent && !this.moveHint.isHidding()) {
                    if (!this.waitWin && !this.waitLose) {
                        this.addGameObjectAt(this.moveHint, this);
                    }
                }
                break;
            case B5.INPUT_STATE_WAIT_SPAWN:
                if (this.allChipsNormal()) {
                    this.matchMatches(this.findMatches());
                }
                break;
            case B5.INPUT_STATE_SHIFT:
                if (this.allChipsNormal()) {
                    this.matchMatches(this.findMatches());
                }
                break;
            case B5.INPUT_STATE_MATCHING:
                if (C7N8y.H6u(this.inputStateTime, Constants.MATCH_TIME / 2)) {
                    this.shiftChips();
                }
                break;
        }
        if (C7N8y.X6u(this.tmpScore, this.score)) {
            this.tmpScore += 17;
            if (C7N8y.C6u(this.tmpScore, this.score)) {
                this.tmpScore = this.score;
            }
            var h5 = this.tmpScore.toString();
            switch (h5.length) {
                case 1:
                    h5 = "0000" + h5;
                    break;
                case 2:
                    h5 = "000" + h5;
                    break;
                case 3:
                    h5 = "00" + h5;
                    break;
                case 4:
                    h5 = "0" + h5;
                    break;
            }
            this.scoreLabel.setText(h5);
        }
    };
    B5.prototype.allChipsNormal = function() {
        for (var m5 = C7N8y.W8U; C7N8y.I6u(m5, this.fieldWidth); m5++) {
            for (var b5 = C7N8y.W8U; C7N8y.i6u(b5, this.fieldHeight); b5++) {
                if (C7N8y.b7u(this.field[m5][b5], C7N8y.S22) && !this.field[m5][b5].isNormal()) {
                    return C7N8y.Q72;
                }
            }
        }
        return C7N8y.s22;
    };
    B5.prototype.canExchange = function(m5, b5) {
        if (C7N8y.v7u(m5, b5)) {
            return C7N8y.Q72;
        }
        if (m5.isHole() || b5.isHole()) {
            return C7N8y.Q72;
        }
        var h5 = (C7N8y.k7u(m5.getIndeces().x, b5.getIndeces().x));
        var O5 = (C7N8y.O7u(m5.getIndeces().y, b5.getIndeces().y));
        return (C7N8y.o7u(Math.abs(h5), C7N8y.T8U) && C7N8y.y7u(O5, C7N8y.W8U)) || (C7N8y.R7u(Math.abs(O5), C7N8y.T8U) && C7N8y.V7u(h5, C7N8y.W8U));
    };
    B5.prototype.exchangeChips = function(m5, b5) {
        var h5 = this;
        var O5 = m5.x;
        var W5 = m5.y;
        var R5 = m5.getIndexX();
        var G5 = m5.getIndexY();
        var S5 = b5.x;
        var t5 = b5.y;
        var K5 = b5.getIndexX();
        var P5 = b5.getIndexY();
        this.field[R5][G5] = b5;
        this.field[K5][P5] = m5;
        m5.exchange(K5, P5);
        b5.exchange(R5, G5);
        this.swapChip1 = m5;
        this.swapChip2 = b5;
        createjs.Tween.get(m5).to({
            x: S5,
            y: t5
        }, C7N8y.K7u(Constants.EXCHANGE_TIME, C7N8y.b82), createjs.Ease.linear).call(function() {
            return h5.onExchangeEnded();
        });
        createjs.Tween.get(b5).to({
            x: O5,
            y: W5
        }, C7N8y.D7u(Constants.EXCHANGE_TIME, C7N8y.b82), createjs.Ease.linear);
        this.selectedChip = C7N8y.S22;
        this.setInpunState(B5.INPUT_STATE_LOCK);
    };
    B5.prototype.addConverToBonusEffect = function(m5) {
        this.addGameObjectAtPos(new ConvertToBonusEffect(m5), this.underChipsLayer, m5.x, C7N8y.s7u(m5.y, Constants.CELL_SIZE / C7N8y.A8U));
    };
    B5.prototype.matchMatches = function(m5) {
        if (C7N8y.Y7u(m5.length, 0)) {
            switch (this.matchInARow) {
                case 0:
                    DNSoundManager.g_instance.play(DNSoundManager.SOUND_MATCH_1);
                    break;
                case 1:
                    DNSoundManager.g_instance.play(DNSoundManager.SOUND_MATCH_2);
                    break;
                case 2:
                    DNSoundManager.g_instance.play(DNSoundManager.SOUND_MATCH_3);
                    break;
                case 3:
                    DNSoundManager.g_instance.play(DNSoundManager.SOUND_MATCH_4);
                    break;
                default:
                    DNSoundManager.g_instance.play(DNSoundManager.SOUND_MATCH_5);
                    break;
            }
            var b5 = false;
            for (var h5 = 0; C7N8y.P7u(h5, m5.length); h5++) {
                for (var O5 = 0; C7N8y.t7u(O5, m5[h5].length); O5++) {
                    m5[h5][O5].match(Chip.MATCH_REASON_SIMPLE);
                }
                if (C7N8y.B7u(m5[h5].length, 4)) {
                    var W5 = false;
                    for (var R5 = 0; C7N8y.U7u(R5, m5[h5].length); R5++) {
                        if (C7N8y.u7u(m5[h5][R5], this.lastMovedChip)) {
                            W5 = true;
                            b5 = true;
                            this.lastMovedChip.convertToBonus(Chip.BONUS_4, C7N8y.m8u(Math.random(), 0.5));
                            this.lastMovedChip = null;
                            break;
                        }
                    }
                    if (!W5) {
                        b5 = true;
                        m5[h5][Utils.RandomRangeInt(1, 2)].convertToBonus(Chip.BONUS_4);
                    }
                }
                if (C7N8y.p8u(m5[h5].length, 5)) {
                    var W5 = false;
                    for (var R5 = 0; C7N8y.h8u(R5, m5[h5].length); R5++) {
                        if (C7N8y.L8u(m5[h5][R5], this.lastMovedChip)) {
                            b5 = true;
                            W5 = true;
                            this.lastMovedChip.convertToBonus(Chip.BONUS_5);
                            this.lastMovedChip = null;
                            break;
                        }
                    }
                    if (!W5) {
                        b5 = true;
                        m5[h5][Utils.RandomRangeInt(1, C7N8y.A8u(m5[h5].length, 2))].convertToBonus(Chip.BONUS_5);
                    }
                }
            }
            if (!b5) {
                for (var h5 = 0; C7N8y.W8u(h5, m5.length); h5++) {
                    for (var O5 = 0; C7N8y.G8u(O5, m5[h5].length); O5++) {
                        if (m5[h5][O5].isDoubleMatched()) {
                            m5[h5][O5].convertToBonus(Chip.BONUS_BOMB);
                            h5 = 100;
                            break;
                        }
                    }
                }
            }
            this.setInpunState(B5.INPUT_STATE_MATCHING);
        } else {
            this.shiftChips();
        }
    };
    B5.prototype.matchBonus = function(m5, b5) {
        if (C7N8y.f8u(m5.getBonusType(), Chip.BONUS_4)) {
            DNSoundManager.g_instance.play(DNSoundManager.SOUND_LINE);
            var h5 = m5.isHorizontal();
            if (h5) {
                var O5 = m5.getIndexY();
                for (var W5 = C7N8y.W8U; C7N8y.S8u(W5, this.fieldWidth); W5++) {
                    if (C7N8y.c8u(this.field[W5][O5], C7N8y.S22)) {
                        this.field[W5][O5].match(Chip.MATCH_REASON_BONUS_EFFECT_4_HOR);
                    }
                }
                this.addGameObjectAtPos(new KillLineEffect(new createjs.Point(+C7N8y.Q02, C7N8y.W8U)), this, m5.x, C7N8y.j8u(m5.y, Constants.CELL_SIZE / C7N8y.A8U));
                this.addGameObjectAtPos(new KillLineEffect(new createjs.Point(-C7N8y.Q02, C7N8y.W8U)), this, m5.x, C7N8y.Q8u(m5.y, Constants.CELL_SIZE / C7N8y.A8U));
            } else {
                var R5 = m5.getIndexX();
                for (var W5 = C7N8y.W8U; C7N8y.l8u(W5, this.fieldHeight); W5++) {
                    if (C7N8y.Z8u(this.field[R5][W5], C7N8y.S22)) {
                        this.field[R5][W5].match(Chip.MATCH_REASON_BONUS_EFFECT_4_VERT);
                    }
                }
                this.addGameObjectAtPos(new KillLineEffect(new createjs.Point(C7N8y.W8U, -C7N8y.Q02)), this, m5.x, C7N8y.J8u(m5.y, Constants.CELL_SIZE / C7N8y.A8U));
                this.addGameObjectAtPos(new KillLineEffect(new createjs.Point(C7N8y.W8U, +C7N8y.Q02)), this, m5.x, C7N8y.e8u(m5.y, Constants.CELL_SIZE / C7N8y.A8U));
            }
        }
        if (C7N8y.a8u(m5.getBonusType(), Chip.BONUS_5)) {
            DNSoundManager.g_instance.play(DNSoundManager.SOUND_KILL_COLOR);
            m5.match(Chip.MATCH_REASON_I_AM_BONUS);
            var G5 = new createjs.Point(m5.x, m5.y);
            var S5 = b5.getColorID();
            if (S5 != -C7N8y.T8U) {
                for (var t5 = C7N8y.W8U; C7N8y.g5O(t5, this.fieldWidth); t5++) {
                    for (var K5 = C7N8y.W8U; C7N8y.E5O(K5, this.fieldHeight); K5++) {
                        if (C7N8y.M5O(this.field[t5][K5], C7N8y.S22)) {
                            if (C7N8y.r5O(this.field[t5][K5].getColorID(), S5)) {
                                var P5 = new createjs.Point(this.field[t5][K5].x, C7N8y.F5O(this.field[t5][K5].y, Constants.CELL_SIZE / C7N8y.A8U));
                                this.addGameObjectAtPos(new KillColorEffect(G5, P5), this, G5.x, G5.y);
                                this.field[t5][K5].match(Chip.MATCH_REASON_BONUS_EFFECT_5);
                            }
                        }
                    }
                }
            }
        }
        if (C7N8y.T5O(m5.getBonusType(), Chip.BONUS_BOMB)) {
            this.boom(m5);
            m5.match(Chip.MATCH_REASON_I_AM_BONUS);
            b5.match(Chip.MATCH_REASON_EXCHANGE_WIHT_BONUS);
        }
        this.setInpunState(B5.INPUT_STATE_MATCHING);
    };
    B5.prototype.forcedMatchBonus = function(m5) {
        this.splashTimeBoom(m5);
        m5.match(Chip.MATCH_REASON_I_AM_BONUS);
    };
    B5.prototype.boom = function(m5) {
        DNSoundManager.g_instance.play(DNSoundManager.SOUND_BOOM);
        var b5 = m5.getIndexX();
        var h5 = m5.getIndexY();
        var O5 = C7N8y.T8U;
        for (var W5 = C7N8y.d5O(b5, O5); C7N8y.x5O(W5, b5 + O5); W5++) {
            for (var R5 = C7N8y.w5O(h5, O5); C7N8y.z5O(R5, h5 + O5); R5++) {
                if (this.validCoords(W5, R5) && C7N8y.q5O(this.field[W5][R5], C7N8y.S22)) {
                    this.field[W5][R5].match(Chip.MATCH_REASON_BONUS_EFFECT_4_HOR);
                }
            }
        }
        this.addGameObjectAtPos(new AutoreleaseEffect(), this, m5.x, m5.y);
    };
    B5.prototype.splashTimeBoom = function(m5) {
        DNSoundManager.g_instance.playSinglePerFrame(DNSoundManager.SOUND_BOOM);
        var b5 = m5.getIndexX();
        var h5 = m5.getIndexY();
        var O5 = C7N8y.T8U;
        for (var W5 = C7N8y.n5O(b5, O5); C7N8y.N5O(W5, b5 + O5); W5++) {
            for (var R5 = C7N8y.H5O(h5, O5); C7N8y.X5O(R5, h5 + O5); R5++) {
                if (this.validCoords(W5, R5) && C7N8y.C5O(this.field[W5][R5], C7N8y.S22) && !this.field[W5][R5].isBonus()) {
                    this.field[W5][R5].match(C7N8y.c7U);
                }
            }
        }
        this.addGameObjectAtPos(new AutoreleaseEffect(), this, m5.x, m5.y);
    };
    B5.prototype.validCoords = function(m5, b5) {
        return C7N8y.I5O(m5, C7N8y.W8U) && C7N8y.i5O(m5, this.fieldWidth) && C7N8y.b3O(b5, C7N8y.W8U) && C7N8y.v3O(b5, this.fieldHeight);
    };
    B5.prototype.onExchangeEnded = function() {
        var m5 = (C7N8y.k3O(this.swapChip1, null) || C7N8y.O3O(this.swapChip2, null));
        var b5 = false;
        if (m5) {
            if (this.swapChip1.isBonus()) {
                b5 = true;
            }
            if (this.swapChip2.isBonus()) {
                b5 = true;
            }
        }
        var h5 = this.findMatches();
        if (C7N8y.o3O(h5.length, 0)) {
            if (!b5) {
                if (m5) {
                    this.exchangeChips(this.swapChip1, this.swapChip2);
                    this.swapChip1 = null;
                    this.swapChip2 = null;
                } else {
                    this.setInpunState(B5.INPUT_STATE_WAIT_SELECTION);
                }
            }
        } else {
            this.decreseMoves();
            this.matchMatches(h5);
            this.checkStrawberryLand(this.swapChip1);
            this.checkStrawberryLand(this.swapChip2);
        }
        if (m5 && b5) {
            if (this.swapChip1.isBonus()) {
                this.matchBonus(this.swapChip1, this.swapChip2);
            }
            if (this.swapChip2.isBonus()) {
                this.matchBonus(this.swapChip2, this.swapChip1);
            }
            this.decreseMoves();
            this.checkStrawberryLand(this.swapChip1);
            this.checkStrawberryLand(this.swapChip2);
        }
    };
    B5.prototype.decreseMoves = function() {
        if (C7N8y.y3O(this.loseType, B5.LOSE_TYPE_MOVES)) {
            this.moves--;
            if (C7N8y.R3O(this.moves, C7N8y.W8U)) {
                this.moves = C7N8y.W8U;
            }
            this.movesLabel.setText(this.moves.toString());
        }
    };
    B5.prototype.findMatches = function() {
        var m5 = Array();
        for (var b5 = C7N8y.W8U; C7N8y.V3O(b5, this.fieldHeight); b5++) {
            for (var h5 = C7N8y.W8U; C7N8y.K3O(h5, this.fieldWidth);) {
                var O5 = -C7N8y.T8U;
                var W5 = C7N8y.W8U;
                var R5 = [];
                for (var G5 = h5; C7N8y.D3O(G5, this.fieldWidth); G5++) {
                    if (C7N8y.s3O(this.field[G5][b5], C7N8y.S22) || this.field[G5][b5].isBonus() || this.field[G5][b5].getColorID() == -C7N8y.T8U) {
                        break;
                    } else {
                        if (O5 == -C7N8y.T8U) {
                            O5 = this.field[G5][b5].getColorID();
                        }
                    }
                    if (C7N8y.Y3O(this.field[G5][b5].getColorID(), O5)) {
                        R5.push(this.field[G5][b5]);
                        W5++;
                    } else {
                        break;
                    }
                }
                if (C7N8y.P3O(W5, C7N8y.L8U)) {
                    m5.push(R5);
                }
                if (C7N8y.t3O(W5, C7N8y.W8U)) {
                    h5 += W5;
                } else {
                    h5++;
                }
            }
        }
        for (var h5 = C7N8y.W8U; C7N8y.B3O(h5, this.fieldWidth); h5++) {
            for (var b5 = C7N8y.W8U; C7N8y.U3O(b5, this.fieldHeight); b5) {
                var O5 = -C7N8y.T8U;
                var W5 = C7N8y.W8U;
                var R5 = [];
                for (var G5 = b5; C7N8y.u3O(G5, this.fieldHeight); G5++) {
                    if (C7N8y.m0O(this.field[h5][G5], C7N8y.S22) || this.field[h5][G5].isBonus() || this.field[h5][G5].getColorID() == -C7N8y.T8U) {
                        break;
                    } else {
                        if (O5 == -C7N8y.T8U) {
                            O5 = this.field[h5][G5].getColorID();
                        }
                    }
                    if (C7N8y.p0O(this.field[h5][G5].getColorID(), O5)) {
                        R5.push(this.field[h5][G5]);
                        W5++;
                    } else {
                        break;
                    }
                }
                if (C7N8y.h0O(W5, C7N8y.L8U)) {
                    m5.push(R5);
                }
                if (C7N8y.L0O(W5, C7N8y.W8U)) {
                    b5 += W5;
                } else {
                    b5++;
                }
            }
        }
        return m5;
    };
    B5.prototype.onMouseUp = function(m5, b5) {
        c3.prototype.onMouseUp.call(this, m5, b5);
        this.selectedChip = C7N8y.S22;
    };
    B5.prototype.onMouseDown = function(m5, b5) {
        c3.prototype.onMouseDown.call(this, m5, b5);
        if (this.waitLose || this.waitWin) {
            return;
        }
        b5 -= this.y;
        if (C7N8y.A0O(this.inputState, B5.INPUT_STATE_WAIT_SELECTION)) {
            return;
        }
        if (this.isLolipop()) {
            var h5 = this.findChipAt(m5, b5);
            if (h5 && !h5.isHole() && !h5.isStrawberry()) {
                h5.match(Chip.MATCH_REASON_BONUS_EFFECT_5);
                this.setInpunState(B5.INPUT_STATE_MATCHING);
                this.stopLolipop();
                DNSoundManager.g_instance.play(DNSoundManager.SOUND_LIGHTING);
                var O5 = DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.LIGHTING);
                this.addChild(O5);
                O5.x = h5.x;
                O5.y = C7N8y.W0O(h5.y, C7N8y.j92);
                O5.alpha = C7N8y.W8U;
                createjs.Tween.get(O5).to({
                    alpha: C7N8y.T8U
                }, C7N8y.c32, createjs.Ease.linear).wait(C7N8y.c32).to({
                    alpha: C7N8y.W8U
                }, C7N8y.c32, createjs.Ease.linear);
                createjs.Tween.get(O5).to({
                    rotation: C7N8y.J12
                }, C7N8y.b8U, createjs.Ease.linear).to({
                    rotation: -C7N8y.J12
                }, C7N8y.b8U, createjs.Ease.linear).to({
                    rotation: C7N8y.J12
                }, C7N8y.b8U, createjs.Ease.linear).to({
                    rotation: -C7N8y.J12
                }, C7N8y.b8U, createjs.Ease.linear);
            }
            return;
        }
        var h5 = this.checkChipSelection(m5, b5);
        if (h5) {
            if (C7N8y.G0O(h5, this.selectedChip)) {
                return;
            }
            if (!this.selectedChip) {
                this.selectedChip = h5;
                this.selectedChip.select();
            } else {
                if (this.canExchange(this.selectedChip, h5)) {
                    this.lastMovedChip = this.selectedChip;
                    this.exchangeChips(this.selectedChip, h5);
                    DNSoundManager.g_instance.play(DNSoundManager.SOUND_EXCHANGE);
                } else {
                    this.selectedChip.deselect();
                    this.selectedChip = h5;
                    this.selectedChip.select();
                }
            }
        }
    };
    B5.prototype.onMouseMove = function(m5, b5) {
        c3.prototype.onMouseMove.call(this, m5, b5);
        if (C7N8y.f0O(this.inputState, B5.INPUT_STATE_WAIT_SELECTION)) {
            return;
        }
        this.onMouseDown(m5, b5);
    };
    B5.prototype.shiftChips = function() {
        this.matchInARow++;
        var m5 = C7N8y.Q72;
        for (var b5 = C7N8y.W8U; C7N8y.S0O(b5, this.fieldWidth); b5++) {
            for (var h5 = C7N8y.c0O(this.fieldHeight, C7N8y.T8U); C7N8y.j0O(h5, C7N8y.W8U); h5--) {
                var O5 = this.field[b5][h5];
                if (!O5) {
                    continue;
                }
                if (!O5.movable()) {
                    continue;
                }
                for (var W5 = C7N8y.Q0O(this.fieldHeight, C7N8y.T8U); C7N8y.l0O(W5, h5); W5--) {
                    if (C7N8y.Z0O(this.field[b5][W5], C7N8y.S22)) {
                        m5 = C7N8y.s22;
                        var R5 = W5;
                        this.field[b5][h5].shiftDown(R5, this.getYPosByYIndex(R5));
                        this.field[b5][R5] = this.field[b5][h5];
                        this.field[b5][h5] = C7N8y.S22;
                        break;
                    }
                }
            }
        }
        if (m5) {
            this.setInpunState(B5.INPUT_STATE_SHIFT);
        } else {
            this.spawnNewChips();
        }
    };
    B5.prototype.spawnNewChips = function() {
        var m5 = C7N8y.W8U;
        for (var b5 = C7N8y.W8U; C7N8y.J0O(b5, this.fieldWidth); b5++) {
            var h5 = -C7N8y.T8U;
            for (var O5 = C7N8y.e0O(this.fieldHeight, C7N8y.T8U); C7N8y.a0O(O5, C7N8y.W8U); O5--) {
                if (C7N8y.g2O(this.field[b5][O5], C7N8y.S22)) {
                    if (h5 == -C7N8y.T8U) {
                        h5 = O5;
                    }
                    m5++;
                    this.createChip(b5, O5, C7N8y.E2O((h5 - O5), C7N8y.G32));
                }
            }
        }
        if (C7N8y.M2O(m5, C7N8y.W8U)) {
            this.setInpunState(B5.INPUT_STATE_WAIT_SPAWN);
        } else {
            this.setInpunState(B5.INPUT_STATE_WAIT_SELECTION);
            this.onStartNextMove();
        }
    };
    B5.prototype.spawnDefinedChips = function(m5) {
        for (var b5 = C7N8y.W8U; C7N8y.r2O(b5, this.fieldWidth); b5++) {
            for (var h5 = C7N8y.W8U; C7N8y.F2O(h5, this.fieldHeight); h5++) {
                this.createChipWithColorID(b5, h5, C7N8y.T2O((C7N8y.d8U - h5), C7N8y.G32) + C7N8y.d2O(b5, C7N8y.D32), m5[h5][b5]);
            }
        }
        this.setInpunState(B5.INPUT_STATE_WAIT_SPAWN);
    };
    B5.prototype.checkChipSelection = function(m5, b5) {
        for (var h5 = C7N8y.W8U; C7N8y.x2O(h5, this.fieldWidth); h5++) {
            for (var O5 = C7N8y.W8U; C7N8y.w2O(O5, this.fieldHeight); O5++) {
                var W5 = this.field[h5][O5];
                if (W5 && W5.movable()) {
                    if ((C7N8y.z2O(Math.abs(W5.x - m5), Constants.CELL_SIZE / C7N8y.A8U)) && (C7N8y.q2O(W5.y, b5) && C7N8y.n2O(W5.y, b5 + Constants.CELL_SIZE))) {
                        return W5;
                    }
                }
            }
        }
        return C7N8y.S22;
    };
    B5.prototype.findChipAt = function(m5, b5) {
        for (var h5 = C7N8y.W8U; C7N8y.N2O(h5, this.fieldWidth); h5++) {
            for (var O5 = C7N8y.W8U; C7N8y.H2O(O5, this.fieldHeight); O5++) {
                var W5 = this.field[h5][O5];
                if (W5) {
                    if ((C7N8y.X2O(Math.abs(W5.x - m5), Constants.CELL_SIZE / C7N8y.A8U)) && (C7N8y.C2O(W5.y, b5) && C7N8y.I2O(W5.y, b5 + Constants.CELL_SIZE))) {
                        return W5;
                    }
                }
            }
        }
        return C7N8y.S22;
    };
    B5.prototype.setNegateInpunStateTime = function() {
        this.inputStateTime = -C7N8y.q72;
    };
    B5.prototype.setInpunState = function(m5) {
        this.inputState = m5;
        this.inputStateTime = C7N8y.W8U;
        if (C7N8y.i2O(this.inputState, B5.INPUT_STATE_WAIT_SELECTION)) {
            this.matchInARow = C7N8y.W8U;
            if (this.findMoves()) {
                if (this.showHint) {
                    var b5 = this.field[this.findedMatchPos1.x][this.findedMatchPos1.y];
                    var h5 = this.field[this.findedMatchPos2.x][this.findedMatchPos2.y];
                    this.moveHint = new MoveHint(C7N8y.b4O(this.findedMatchPos1.y, this.findedMatchPos2.y));
                    this.moveHint.x = C7N8y.v4O((b5.x + h5.x), C7N8y.A8U);
                    this.moveHint.y = C7N8y.k4O((b5.y + h5.y) / C7N8y.A8U, Constants.CELL_SIZE / C7N8y.A8U);
                    this.showHint = C7N8y.Q72;
                }
            } else {
                if (this.moveHint) {
                    if (this.moveHint.isDead()) {
                        this.moveHint = C7N8y.S22;
                    } else {
                        this.moveHint.hide();
                    }
                }
                for (var O5 = C7N8y.W8U; C7N8y.O4O(O5, C7N8y.G82); O5++) {
                    var W5 = this.field[Utils.RandomRangeInt(C7N8y.W8U, C7N8y.o4O(this.fieldWidth, C7N8y.T8U))][Utils.RandomRangeInt(C7N8y.W8U, C7N8y.y4O(this.fieldHeight, C7N8y.T8U))];
                    if (W5.isChip() && !W5.haveCage()) {
                        W5.convertToBonus([Chip.BONUS_BOMB, Chip.BONUS_4, Chip.BONUS_5][Utils.RandomRangeInt(C7N8y.W8U, C7N8y.A8U)]);
                        break;
                    }
                }
            }
            if (C7N8y.R4O(this.loseType, B5.LOSE_TYPE_MOVES)) {
                if (C7N8y.V4O(this.moves, C7N8y.W8U)) {
                    this.lose(B5.LOSE_REASON_MOVES);
                }
            }
        }
    };
    B5.prototype.takeStockMatch = function(m5) {
        var b5 = m5.getIndexX();
        var h5 = m5.getIndexY();
        if (C7N8y.K4O(this.field[b5][h5], m5)) {
            if (C7N8y.D4O(this.goal, B5.GOAL_COUNT)) {
                if (C7N8y.s4O(m5.getColorID(), this.goalChipID)) {
                    this.chipGoalCount--;
                    if (C7N8y.Y4O(this.chipGoalCount, C7N8y.W8U)) {
                        this.chipGoalCount = C7N8y.W8U;
                        this.win();
                    }
                    this.goalLabel.setText(this.chipGoalCount.toString());
                }
            }
        }
    };
    B5.prototype.clearCell = function(m5) {
        var b5 = m5.getIndexX();
        var h5 = m5.getIndexY();
        if (C7N8y.P4O(this.field[b5][h5], m5)) {
            if (C7N8y.t4O(this.goal, B5.GOAL_COUNT)) {
                if (C7N8y.B4O(m5.getColorID(), this.goalChipID)) {
                    this.chipGoalCount--;
                    if (C7N8y.U4O(this.chipGoalCount, C7N8y.W8U)) {
                        this.chipGoalCount = C7N8y.W8U;
                        this.win();
                    }
                    this.goalLabel.setText(this.chipGoalCount.toString());
                }
            }
            if (C7N8y.u4O(m5.getMatchReason(), Chip.MATCH_REASON_BONUS_EFFECT_5) || C7N8y.m9O(m5.getMatchReason(), Chip.MATCH_REASON_BONUS_EFFECT_4_HOR) || C7N8y.p9O(m5.getMatchReason(), Chip.MATCH_REASON_BONUS_EFFECT_4_VERT)) {
                this.runParticleEffect(m5.x, C7N8y.h9O(m5.y, Constants.CELL_SIZE / C7N8y.A8U));
            }
            this.field[b5][h5] = C7N8y.S22;
        }
        this.tryClearDirt(b5, h5);
        if (!m5.isStoneHeart()) {
            this.tryClearStoneHeart(b5, h5);
        }
        if (!m5.isChocolate()) {
            this.tryClearChocolate(b5, h5);
        }
    };
    B5.prototype.tryClearDirt = function(m5, b5) {
        var h5 = this.fieldDirt[m5][b5];
        if (h5) {
            if (C7N8y.L9O(h5.name, Images.DIRT_1)) {
                this.fieldDirt[m5][b5] = C7N8y.S22;
                if (--this.dirtCount == C7N8y.W8U) {
                    this.win();
                }
                createjs.Tween.get(h5).to({
                    alpha: C7N8y.W8U
                }, C7N8y.c32, createjs.Ease.linear);
            } else {
                h5.visible = C7N8y.Q72;
                var O5 = DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.DIRT_1);
                O5.name = Images.DIRT_1;
                O5.x = this.getXPosByXIndex(m5);
                O5.y = C7N8y.A9O(this.getYPosByYIndex(b5), Constants.CELL_SIZE / C7N8y.A8U);
                this.dirtLayer.addChild(O5);
                this.fieldDirt[m5][b5] = O5;
            }
        }
        if (C7N8y.W9O(this.goal, B5.GOAL_DIRT)) {
            this.goalLabel.setText(this.dirtCount.toString());
        }
    };
    B5.prototype.tryClearStoneHeart = function(m5, b5) {
        var h5;
        h5 = this.getChipAt(m5 + C7N8y.T8U, b5);
        if (h5 && h5.isStoneHeart()) {
            h5.fallDown();
        }
        h5 = this.getChipAt(C7N8y.G9O(m5, C7N8y.T8U), b5);
        if (h5 && h5.isStoneHeart()) {
            h5.fallDown();
        }
        h5 = this.getChipAt(m5, b5 + C7N8y.T8U);
        if (h5 && h5.isStoneHeart()) {
            h5.fallDown();
        }
        h5 = this.getChipAt(m5, C7N8y.f9O(b5, C7N8y.T8U));
        if (h5 && h5.isStoneHeart()) {
            h5.fallDown();
        }
    };
    B5.prototype.tryClearChocolate = function(m5, b5) {
        var h5;
        h5 = this.getChipAt(m5 + C7N8y.T8U, b5);
        if (h5 && h5.isChocolate()) {
            h5.fallDown();
            this.wasChocolateClear = C7N8y.s22;
        }
        h5 = this.getChipAt(C7N8y.S9O(m5, C7N8y.T8U), b5);
        if (h5 && h5.isChocolate()) {
            h5.fallDown();
            this.wasChocolateClear = C7N8y.s22;
        }
        h5 = this.getChipAt(m5, b5 + C7N8y.T8U);
        if (h5 && h5.isChocolate()) {
            h5.fallDown();
            this.wasChocolateClear = C7N8y.s22;
        }
        h5 = this.getChipAt(m5, C7N8y.c9O(b5, C7N8y.T8U));
        if (h5 && h5.isChocolate()) {
            h5.fallDown();
            this.wasChocolateClear = C7N8y.s22;
        }
    };
    B5.prototype.finishLevel = function() {
        for (var m5 = C7N8y.W8U; C7N8y.j9O(m5, this.fieldWidth); m5++) {
            for (var b5 = C7N8y.W8U; C7N8y.Q9O(b5, this.fieldHeight); b5++) {
                if (C7N8y.l9O(this.field[m5][b5], C7N8y.S22) && this.field[m5][b5].isNormal()) {
                    this.field[m5][b5].fallDown();
                }
            }
        }
    };
    B5.prototype.lose = function(m5) {
        if (!this.waitWin && !this.waitLose) {
            this.loseReason = m5;
            this.waitLose = C7N8y.s22;
            switch (m5) {
                case B5.LOSE_REASON_MOVES:
                    this.addGameObjectAt(new TimeIsUpEffect(Images.LOSE_MOVES), this);
                    break;
                case B5.LOSE_REASON_BOMB:
                    this.addGameObjectAt(new TimeIsUpEffect(Images.LOSE_BOMB), this);
                    break;
                case B5.LOSE_REASON_TIME:
                    this.addGameObjectAt(new TimeIsUpEffect(Images.LOSE_TIME), this);
                    break;
            }
            DNSoundManager.g_instance.play(DNSoundManager.SOUND_LOSE);
        }
    };
    B5.prototype.win = function() {
        if (!this.waitWin && !this.waitLose) {
            this.waitWin = C7N8y.s22;
            this.stars = this.calcStarsCount();
            DNSoundManager.g_instance.play(DNSoundManager.SOUND_WIN);
        }
    };
    B5.prototype.addPointsAt = function(m5, b5) {
        if (C7N8y.Z9O(m5.getBonusType(), C7N8y.S22)) {
            var h5 = C7N8y.j92;
            switch (b5) {
                case Chip.MATCH_REASON_EXCHANGE_WIHT_BONUS:
                    h5 = C7N8y.j92;
                    break;
                case Chip.MATCH_REASON_BONUS_EFFECT_5:
                    h5 = C7N8y.G82;
                    break;
                case Chip.MATCH_REASON_BONUS_EFFECT_4_HOR:
                    h5 = C7N8y.c82;
                    break;
                case Chip.MATCH_REASON_BONUS_EFFECT_4_VERT:
                    h5 = C7N8y.i32;
                    break;
                case Chip.MATCH_REASON_I_AM_BONUS:
                    h5 = C7N8y.N7U;
                    break;
                default:
                    h5 = C7N8y.j92 + C7N8y.J9O(this.matchInARow, C7N8y.S12);
                    break;
            }
            var O5 = new FlyingPoints(h5);
            this.score += h5;
            var W5 = m5.x;
            var R5 = C7N8y.e9O(m5.y, Constants.CELL_SIZE / C7N8y.A8U);
            if (this.tryShowAwesome(W5, R5)) {
                return;
            }
            if (this.tryShowSuperb(W5, R5)) {
                return;
            }
            this.addGameObjectAtPos(O5, this.effectsLayer, W5, R5);
            if (C7N8y.a9O(this.goal, B5.GOAL_SCORE)) {
                if (C7N8y.g1O(this.score, this.scoreGoalCount)) {
                    this.win();
                }
            }
        }
    };
    B5.prototype.tryShowSuperb = function(m5, b5) {
        if (C7N8y.E1O(this.matchInARow, C7N8y.L8U) && C7N8y.M1O(this.superbEffectTime, this.liveTime)) {
            this.superbEffectTime = this.liveTime;
            var h5 = new SuperbEffect();
            this.addGameObjectAtPos(h5, this, m5, b5);
            DNSoundManager.g_instance.play(DNSoundManager.SOUND_AWESOME);
            if (C7N8y.r1O(h5.x, C7N8y.i32)) {
                h5.x = C7N8y.i32;
            }
            if (C7N8y.F1O(h5.x, Constants.ASSETS_WIDTH - C7N8y.i32)) {
                h5.x = C7N8y.T1O(Constants.ASSETS_WIDTH, C7N8y.i32);
            }
            this.score += C7N8y.z42;
            return C7N8y.s22;
        }
        return C7N8y.Q72;
    };
    B5.prototype.tryShowAwesome = function(m5, b5) {
        if (C7N8y.d1O(this.matchInARow, C7N8y.A8U) && C7N8y.x1O(this.awesomeEffectTime, this.liveTime)) {
            this.awesomeEffectTime = this.liveTime;
            var h5 = new ShowAwesomeEffect();
            this.addGameObjectAtPos(h5, this, m5, b5);
            DNSoundManager.g_instance.play(DNSoundManager.SOUND_AWESOME);
            if (C7N8y.w1O(h5.x, C7N8y.i32)) {
                h5.x = C7N8y.i32;
            }
            if (C7N8y.z1O(h5.x, Constants.ASSETS_WIDTH - C7N8y.i32)) {
                h5.x = C7N8y.q1O(Constants.ASSETS_WIDTH, C7N8y.i32);
            }
            this.score += C7N8y.b8U;
            return C7N8y.s22;
        }
        return C7N8y.Q72;
    };
    B5.prototype.findMoves = function() {
        var m5 = [
            [C7N8y.A8U, -C7N8y.T8U],
            [C7N8y.L8U, C7N8y.W8U],
            [C7N8y.A8U, C7N8y.T8U]
        ];
        var b5 = [
            [-C7N8y.T8U, -C7N8y.T8U],
            [-C7N8y.A8U, C7N8y.W8U],
            [-C7N8y.T8U, C7N8y.T8U]
        ];
        var h5 = [
            [C7N8y.T8U, -C7N8y.T8U],
            [C7N8y.T8U, C7N8y.T8U]
        ];
        for (var O5 = C7N8y.W8U; C7N8y.n1O(O5, this.fieldHeight); O5++) {
            for (var W5 = C7N8y.W8U; C7N8y.N1O(W5, this.fieldWidth - C7N8y.T8U); W5++) {
                if (C7N8y.H1O(this.field[W5][O5].getColorID(), this.field[W5 + C7N8y.T8U][O5].getColorID())) {
                    if (this.findPattern(W5, O5, this.field[W5][O5].getColorID(), m5, W5 + C7N8y.A8U, O5)) {
                        this.showHint = C7N8y.s22;
                        return C7N8y.s22;
                    }
                    if (this.findPattern(W5, O5, this.field[W5][O5].getColorID(), b5, C7N8y.X1O(W5, C7N8y.T8U), O5)) {
                        this.showHint = C7N8y.s22;
                        return C7N8y.s22;
                    }
                }
            }
        }
        for (var O5 = C7N8y.W8U; C7N8y.C1O(O5, this.fieldHeight); O5++) {
            for (var W5 = C7N8y.W8U; C7N8y.I1O(W5, this.fieldWidth - C7N8y.A8U); W5++) {
                if (C7N8y.i1O(this.field[W5][O5].getColorID(), this.field[W5 + C7N8y.A8U][O5].getColorID())) {
                    if (this.findPattern(W5, O5, this.field[W5][O5].getColorID(), h5, W5 + C7N8y.T8U, O5)) {
                        this.showHint = C7N8y.s22;
                        return C7N8y.s22;
                    }
                }
            }
        }
        var R5 = [
            [-C7N8y.T8U, C7N8y.A8U],
            [C7N8y.W8U, C7N8y.L8U],
            [C7N8y.T8U, C7N8y.A8U]
        ];
        var G5 = [
            [-C7N8y.T8U, -C7N8y.T8U],
            [C7N8y.W8U, -C7N8y.A8U],
            [C7N8y.T8U, -C7N8y.T8U]
        ];
        var S5 = [
            [-C7N8y.T8U, C7N8y.T8U],
            [C7N8y.T8U, C7N8y.T8U]
        ];
        for (var O5 = C7N8y.W8U; C7N8y.b6O(O5, this.fieldHeight - C7N8y.T8U); O5++) {
            for (var W5 = C7N8y.W8U; C7N8y.v6O(W5, this.fieldWidth); W5++) {
                if (C7N8y.k6O(this.field[W5][O5].getColorID(), this.field[W5][O5 + C7N8y.T8U].getColorID())) {
                    if (this.findPattern(W5, O5, this.field[W5][O5].getColorID(), R5, W5, O5 + C7N8y.A8U)) {
                        this.showHint = C7N8y.s22;
                        return C7N8y.s22;
                    }
                    if (this.findPattern(W5, O5, this.field[W5][O5].getColorID(), G5, W5, C7N8y.O6O(O5, C7N8y.T8U))) {
                        this.showHint = C7N8y.s22;
                        return C7N8y.s22;
                    }
                }
            }
        }
        for (var O5 = C7N8y.W8U; C7N8y.o6O(O5, this.fieldHeight - C7N8y.A8U); O5++) {
            for (var W5 = C7N8y.W8U; C7N8y.y6O(W5, this.fieldWidth); W5++) {
                if (C7N8y.R6O(this.field[W5][O5].getColorID(), this.field[W5][O5 + C7N8y.A8U].getColorID())) {
                    if (this.findPattern(W5, O5, this.field[W5][O5].getColorID(), S5, W5, O5 + C7N8y.T8U)) {
                        this.showHint = C7N8y.s22;
                        return C7N8y.s22;
                    }
                }
            }
        }
        for (var O5 = C7N8y.W8U; C7N8y.V6O(O5, this.fieldHeight); O5++) {
            for (var W5 = C7N8y.W8U; C7N8y.K6O(W5, this.fieldWidth); W5++) {
                if (this.field[W5][O5].isBonus()) {
                    if (this.validCoords(C7N8y.D6O(W5, C7N8y.T8U), O5) && (this.field[C7N8y.s6O(W5, C7N8y.T8U)][O5].isChip() || this.field[C7N8y.Y6O(W5, C7N8y.T8U)][O5].isBonus())) {
                        return C7N8y.s22;
                    }
                    if (this.validCoords(W5 + C7N8y.T8U, O5) && (this.field[W5 + C7N8y.T8U][O5].isChip() || this.field[W5 + C7N8y.T8U][O5].isBonus())) {
                        return C7N8y.s22;
                    }
                    if (this.validCoords(W5, O5 + C7N8y.T8U) && (this.field[W5][O5 + C7N8y.T8U].isChip() || this.field[W5][O5 + C7N8y.T8U].isBonus())) {
                        return C7N8y.s22;
                    }
                    if (this.validCoords(W5, C7N8y.P6O(O5, C7N8y.T8U)) && (this.field[W5][C7N8y.t6O(O5, C7N8y.T8U)].isChip() || this.field[W5][C7N8y.B6O(O5, C7N8y.T8U)].isBonus())) {
                        return C7N8y.s22;
                    }
                }
            }
        }
        return C7N8y.Q72;
    };
    B5.prototype.findPattern = function(m5, b5, h5, O5, W5, R5) {
        if (C7N8y.U6O(h5, 0)) {
            return false;
        }
        if (C7N8y.u6O(W5, 0) || C7N8y.m7O(W5, this.fieldWidth) || C7N8y.p7O(R5, 0) || C7N8y.h7O(R5, this.fieldHeight)) {
            return false;
        }
        if (this.field[W5][R5] && !this.field[W5][R5].movable()) {
            return false;
        }
        for (var G5 = 0; C7N8y.L7O(G5, O5.length); G5++) {
            var S5 = this.getColorAt(m5 + O5[G5][0], b5 + O5[G5][1]);
            if (C7N8y.A7O(S5, 0)) {
                continue;
            }
            if (C7N8y.W7O(S5, h5)) {
                if (this.field[W5][R5].haveCage()) {
                    continue;
                }
                if (this.field[m5 + O5[G5][0]][b5 + O5[G5][1]].haveCage()) {
                    continue;
                }
                this.findedMatchPos1 = new createjs.Point(W5, R5);
                this.findedMatchPos2 = new createjs.Point(m5 + O5[G5][0], b5 + O5[G5][1]);
                return true;
            }
        }
        return false;
    };
    B5.prototype.setHintIndeces = function(m5, b5, h5, O5) {
        this.findedMatchPos1 = new createjs.Point(m5, b5);
        this.findedMatchPos2 = new createjs.Point(h5, O5);
    };
    B5.prototype.getChipAt = function(m5, b5) {
        if (C7N8y.G7O(m5, C7N8y.W8U) || C7N8y.f7O(b5, C7N8y.W8U) || C7N8y.S7O(m5, this.fieldWidth) || C7N8y.c7O(b5, this.fieldHeight) || !this.field[m5][b5] || this.field[m5][b5].isHole()) {
            return C7N8y.S22;
        }
        return this.field[m5][b5];
    };
    B5.prototype.getColorAt = function(m5, b5) {
        if (C7N8y.j7O(m5, C7N8y.W8U) || C7N8y.Q7O(b5, C7N8y.W8U) || C7N8y.l7O(m5, this.fieldWidth) || C7N8y.Z7O(b5, this.fieldHeight) || !this.field[m5][b5] == C7N8y.S22) {
            return -C7N8y.T8U;
        }
        return this.field[m5][b5].getColorID();
    };
    B5.prototype.onShiftEnded = function(m5) {
        if (C7N8y.J7O(this.liveTime, this.lastDropSoundTime + C7N8y.I32)) {
            this.lastDropSoundTime = this.liveTime;
            var b5 = Utils.RandomRangeInt(C7N8y.W8U, C7N8y.A8U);
            for (var h5 = C7N8y.W8U; C7N8y.e7O(b5, this.lastDropID) && C7N8y.a7O(h5, C7N8y.J12); h5++) {
                b5 = Utils.RandomRangeInt(C7N8y.W8U, C7N8y.A8U);
            }
            this.lastDropID = b5;
            switch (b5) {
                case C7N8y.W8U:
                    DNSoundManager.g_instance.play(DNSoundManager.SOUND_DROP_1);
                    break;
                case C7N8y.T8U:
                    DNSoundManager.g_instance.play(DNSoundManager.SOUND_DROP_2);
                    break;
                case C7N8y.A8U:
                    DNSoundManager.g_instance.play(DNSoundManager.SOUND_DROP_3);
                    break;
            }
        }
        this.checkStrawberryLand(m5);
    };
    B5.prototype.checkStrawberryLand = function(m5) {
        if (m5 && m5.isStrawberry()) {
            var b5 = m5.getIndexX();
            for (var h5 = m5.getIndexY() + C7N8y.T8U; C7N8y.g8O(h5, this.fieldHeight); h5++) {
                if (!this.field[b5][h5].isHole()) {
                    return;
                }
            }
            m5.flyAway();
            this.addChild(m5);
        }
    };
    B5.prototype.runParticleEffect = function(m5, b5) {
        var h5 = C7N8y.h62;
        var O5 = Utils.RandomRangeInt(C7N8y.L8U, C7N8y.S8U);
        for (var W5 = C7N8y.W8U; C7N8y.E8O(W5, O5); W5++) {
            var R5 = Utils.RadToGrad(Utils.RandomRange(C7N8y.W8U, C7N8y.j5m));
            var G5 = new HeartParticle(C7N8y.M8O(Math.cos(R5), h5), C7N8y.r8O(Math.sin(R5), h5));
            this.addGameObject(G5);
            this.addChild(G5);
            G5.x = m5 + Utils.RandomRange(-Constants.CELL_SIZE / C7N8y.L8U, C7N8y.F8O(Constants.CELL_SIZE, C7N8y.L8U));
            G5.y = b5 + Utils.RandomRange(-Constants.CELL_SIZE / C7N8y.L8U, C7N8y.T8O(Constants.CELL_SIZE, C7N8y.L8U));
        }
    };
    B5.prototype.onStrawberrySaveQuick = function() {
        if (C7N8y.d8O(this.goal, B5.GOAL_STRAWBERRY)) {
            var m5 = this.calcStrawberryCount();
            if (C7N8y.x8O(m5, C7N8y.W8U)) {
                this.win();
            }
        }
    };
    B5.prototype.onStrawberrySave = function() {
        if (C7N8y.w8O(this.goal, B5.GOAL_STRAWBERRY)) {
            this.goalLabel.setText(this.calcStrawberryCount().toString());
        }
    };
    B5.prototype.checkChocolateMultiply = function() {
        if (!this.wasChocolateClear) {
            var m5 = [];
            var b5 = [{
                x: 0,
                y: +1
            }, {
                x: 0,
                y: -1
            }, {
                x: +1,
                y: 0
            }, {
                x: -1,
                y: 0
            }];
            for (var h5 = 0; C7N8y.z8O(h5, this.fieldWidth); h5++) {
                for (var O5 = 0; C7N8y.q8O(O5, this.fieldHeight); O5++) {
                    if (this.field[h5][O5] && this.field[h5][O5].isChocolate()) {
                        m5.push(this.field[h5][O5]);
                    }
                }
            }
            if (C7N8y.n8O(m5.length, 0)) {
                Utils.shuffle(m5);
                for (var W5 = 0; C7N8y.N8O(W5, m5.length); W5++) {
                    var R5 = m5[W5];
                    Utils.shuffle(b5);
                    for (var G5 = 0; C7N8y.H8O(G5, b5.length); G5++) {
                        var h5 = b5[G5]["x"];
                        var O5 = b5[G5]["y"];
                        if (this.validCoords(h5 + R5.getIndexX(), O5 + R5.getIndexY())) {
                            var S5 = this.field[h5 + R5.getIndexX()][O5 + R5.getIndexY()];
                            if (S5.isChip() && !S5.haveCage()) {
                                S5.convertToChocolateWithAnim();
                                this.setInpunState(B5.INPUT_STATE_WAIT_SELECTION);
                                return;
                            }
                        }
                    }
                }
            }
        }
    };
    B5.prototype.onStartNextMove = function() {
        var m5 = ((2E0, 9.9E1) <= 64.0E1 ? (1.08E3, 10000000) : (67., 124));
        this.checkChocolateMultiply();
        this.wasChocolateClear = C7N8y.Q72;
        if (this.waitWin) {
            if (this.needRunSplashTime) {
                this.needRunSplashTime = C7N8y.Q72;
                this.runSplashTime();
                this.waitWinTime = -m5;
            } else {
                if (this.killAllBonuses()) {
                    this.setInpunState(B5.INPUT_STATE_MATCHING);
                } else {
                    this.waitWinTime = C7N8y.W8U;
                }
            }
        } else {
            for (var b5 = C7N8y.W8U; C7N8y.X8O(b5, this.fieldWidth); b5++) {
                for (var h5 = C7N8y.W8U; C7N8y.C8O(h5, this.fieldHeight); h5++) {
                    if (this.field[b5][h5] && this.field[b5][h5].isBomb()) {
                        this.field[b5][h5].onDecreseMoves();
                    }
                }
            }
        }
    };
    B5.prototype.killAllBonuses = function() {
        var m5 = C7N8y.W8U;
        for (var b5 = C7N8y.W8U; C7N8y.I8O(b5, this.fieldWidth); b5++) {
            for (var h5 = C7N8y.W8U; C7N8y.i8O(h5, this.fieldHeight); h5++) {
                if (this.field[b5][h5] && this.field[b5][h5].isBonus()) {
                    this.forcedMatchBonus(this.field[b5][h5]);
                    m5++;
                }
            }
        }
        return C7N8y.b5p(m5, C7N8y.W8U);
    };
    B5.prototype.convertRandomChipToBonus = function() {
        for (var m5 = C7N8y.W8U; C7N8y.v5p(m5, C7N8y.G82); m5++) {
            var b5 = Utils.RandomRangeInt(C7N8y.T8U, C7N8y.k5p(this.fieldWidth, C7N8y.A8U));
            var h5 = Utils.RandomRangeInt(C7N8y.W8U, C7N8y.O5p(this.fieldHeight, C7N8y.T8U));
            var O5 = this.field[b5][h5];
            if (O5 && O5.isChip() && !O5.haveCage()) {
                O5.convertToSplashTimeBonus();
                DNSoundManager.g_instance.play(DNSoundManager.SOUND_MATCH_5);
                break;
            }
        }
        this.onCreateBonusDuringSplashTime();
    };
    B5.prototype.runAllBonuses = function() {
        var m5 = [];
        var b5 = C7N8y.T8U;
        for (var h5 = C7N8y.W8U; C7N8y.o5p(h5, this.fieldWidth); h5++) {
            for (var O5 = C7N8y.y5p(this.fieldHeight, C7N8y.T8U); C7N8y.R5p(O5, C7N8y.W8U); O5--) {
                if (this.field[h5][O5] && this.field[h5][O5].isBonus()) {
                    m5.push(this.field[h5][O5]);
                }
            }
        }
        this.addGameObject(new BonusSplasher(m5));
    };
    B5.prototype.onCreateBonusDuringSplashTime = function() {
        if (C7N8y.V5p(this.loseType, B5.LOSE_TYPE_MOVES)) {
            this.moves -= C7N8y.L8U;
            if (C7N8y.K5p(this.moves, C7N8y.W8U)) {
                this.moves = C7N8y.W8U;
            }
            this.movesLabel.setText(this.moves.toString());
        }
    };
    B5.prototype.saveByBooster = function(m5) {
        this.waitLose = C7N8y.Q72;
        this.waitLoseTime = C7N8y.W8U;
        switch (m5) {
            case B5.LOSE_REASON_MOVES:
                this.activateBooster(GameData.BOOSTER_MOVES);
                break;
            case B5.LOSE_REASON_TIME:
                this.activateBooster(GameData.BOOSTER_TIME);
                break;
            case B5.LOSE_REASON_BOMB:
                this.activateBooster(GameData.BOOSTER_BOMB);
                break;
        }
    };
    B5.prototype.activateBooster = function(m5) {
        GameData.getInstance().spendBooster(m5);
        switch (m5) {
            case GameData.BOOSTER_MOVES:
                this.moves += C7N8y.f8U;
                this.movesLabel.setText(this.moves.toString());
                break;
            case GameData.BOOSTER_TIME:
                this.time += C7N8y.a92;
                this.timeLabel.setText(Utils.IntToTimeString(Math.round(this.time)));
                break;
            case GameData.BOOSTER_BOMB:
                this.increseAllBombsCounters();
                break;
            case GameData.BOOSTER_4:
                this.convertRandomChipToBonus4();
                break;
            case GameData.BOOSTER_5:
                this.convertRandomChipToBonus5();
                break;
            case GameData.BOOSTER_LOLIPOP:
                this.runLolipopBooster();
                break;
        }
    };
    B5.prototype.increseAllBombsCounters = function() {
        for (var m5 = C7N8y.W8U; C7N8y.D5p(m5, this.fieldWidth); m5++) {
            for (var b5 = C7N8y.W8U; C7N8y.s5p(b5, this.fieldHeight); b5++) {
                if (this.field[m5][b5] && this.field[m5][b5].isBomb()) {
                    this.field[m5][b5].increaseBombCounter();
                }
            }
        }
    };
    B5.prototype.convertRandomChipToBonus4 = function() {
        for (var m5 = C7N8y.W8U; C7N8y.Y5p(m5, C7N8y.G82); m5++) {
            var b5 = Utils.RandomRangeInt(C7N8y.T8U, C7N8y.P5p(this.fieldWidth, C7N8y.A8U));
            var h5 = Utils.RandomRangeInt(C7N8y.W8U, C7N8y.t5p(this.fieldHeight, C7N8y.T8U));
            var O5 = this.field[b5][h5];
            if (O5 && O5.isChip() && !O5.haveCage()) {
                O5.convertToStartBonus4();
                break;
            }
        }
    };
    B5.prototype.convertRandomChipToBonus5 = function() {
        for (var m5 = C7N8y.W8U; C7N8y.B5p(m5, C7N8y.G82); m5++) {
            var b5 = Utils.RandomRangeInt(C7N8y.T8U, C7N8y.U5p(this.fieldWidth, C7N8y.A8U));
            var h5 = Utils.RandomRangeInt(C7N8y.W8U, C7N8y.u5p(this.fieldHeight, C7N8y.T8U));
            var O5 = this.field[b5][h5];
            if (O5 && O5.isChip() && !O5.haveCage()) {
                O5.convertToStartBonus5();
                break;
            }
        }
    };
    B5.prototype.runLolipopBooster = function() {
        this.lolipop = C7N8y.s22;
        this.lolipopEffect = new RunLolipopEffect();
        this.addGameObjectAt(this.lolipopEffect, this);
    };
    B5.prototype.isLolipop = function() {
        return this.lolipop;
    };
    B5.prototype.stopLolipop = function() {
        if (this.lolipopEffect) {
            this.lolipopEffect.hide();
            this.lolipopEffect = C7N8y.S22;
        }
        this.lolipop = C7N8y.Q72;
    };
    B5.prototype.calcStarsCount = function() {
        if (C7N8y.m3p(this.loseType, B5.LOSE_TYPE_MOVES)) {
            if (C7N8y.p3p(this.moves, C7N8y.d8U)) {
                return C7N8y.L8U;
            }
            if (C7N8y.h3p(this.moves, C7N8y.S8U)) {
                return C7N8y.A8U;
            }
        } else {
            if (C7N8y.L3p(this.time, C7N8y.U62)) {
                return C7N8y.L8U;
            }
            if (C7N8y.A3p(this.time, C7N8y.a92)) {
                return C7N8y.A8U;
            }
        }
        return C7N8y.T8U;
    };
    B5.prototype.resume = function() {
        this.booster1.updateCaption();
        this.booster2.updateCaption();
    };
    d0();
    i0(K0);
    E0(N0);
    u0(n0);
    Y0(W3);
    M0(G3);
    k0(b0);
    F0(J3);
    I3(x3);
    H3(C7N8y.D82);
    w3(C7N8y.O82);
    t0(C7N8y.d32);
    M3(C7N8y.a82);
    X3(S3);
    O0(l3);
    return B5;
})(DNGameState),
PortraitLockState = (function(R5) {
    function G5() {
        var m5 = "#4aa4c2";
        var b5 = function() {
            W5.x = C7N8y.G3p(Constants.ASSETS_WIDTH, C7N8y.A8U);
        };
        var h5 = function() {
            W5.y = C7N8y.W3p(Constants.ASSETS_HEIGHT, C7N8y.A8U);
        };
        R5.call(this);
        var O5 = new createjs.Shape();
        O5.graphics.beginFill(m5);
        O5.graphics.drawRect(C7N8y.W8U, C7N8y.W8U, Constants.ASSETS_WIDTH, Constants.ASSETS_HEIGHT);
        O5.graphics.endFill();
        this.addChild(O5);
        var W5 = DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.ROTATE);
        this.addChild(W5);
        b5();
        h5();
    }
    __extends(G5, R5);
    G5.prototype.onOrientationChanged = function(m5) {
        if (!m5) {
            DNStateManager.g_instance.popState();
        }
    };
    return G5;
})(DNGameState),

//add by nada mode 1
PreloaderState = (function(S5) {
    function t5(b5, h5, O5, W5) {
        var R5 = "#666666";
        var G5 = this;
        S5.call(this);
        this.loadingBar = new DNLoadingBar(C7N8y.C82, C7N8y.Z22, R5, C7N8y.Z22);
        new DNAssetsManager(b5, h5, O5, W5, function(m5) {
            return G5.handleProgress(m5);
        });
        this.addChild(this.loadingBar);
        this.loadingBar.x = C7N8y.f3p(Constants.ASSETS_WIDTH, C7N8y.A8U);
        this.loadingBar.y = C7N8y.S3p(Constants.ASSETS_HEIGHT, C7N8y.A8U);
    }
    __extends(t5, S5);
    t5.prototype.handleProgress = function(m5) {
        this.loadingBar.setProgress(m5.loaded);
    };
    t5.prototype.onOrientationChanged = function(m5) {};
    return t5;
})(DNGameState),


//add by nada mode 1
SelectLevelState = (function(C0) {
    function s0(m5) {
        var b5 = "map_";
        var h5 = 576;
        var O5 = 602;
        var W5 = ((1.400E2, 135.4E1) >= 25 ? (1.334E3, 228) : (124, 92));
        var R5 = ((34, 71.) <= (147., 6.48E2) ? (0x166, 417) : (13.49E2, 3.35E2));
        var G5 = 304;
        var S5 = 226;
        var t5 = 178;
        var K5 = ((23.8E1, 129.4E1) < (63.40E1, 0x15F) ? 62.80E1 : (1.266E3, 126) > 0x234 ? (28.1E1, .71) : 54 <= (0x234, 113) ? (0xC7, 301) : (1.302E3, 0xEC));
        var P5 = 392;
        var g3 = 487;
        var J5 = ((23.6E1, 0x1C8) < 0xFD ? (23., 59.) : 126 < (1., 0x89) ? (124., 536) : (3.820E2, 0x97) >= 0x1BE ? 3.320E2 : (64.7E1, 0x138));
        var F3 = 218;
        var Q5 = 332;
        var u5 = 476;
        var d3 = (32. < (0x223, 0x1DB) ? (0x17B, 442) : (0x1D9, 18) > 0x255 ? "A" : (100, 71));
        var h3 = ((126, 99.60E1) >= (11.4E2, 0x150) ? (96., 491) : (0x118, 0x18D));
        var n3 = 567;
        var f3 = 587;
        var j3 = 630;
        var r3 = 690;
        var Z3 = 636;
        var Q3 = ((0x36, 93.80E1) < (0x78, 0x1F9) ? (74., 0x73) : (95.30E1, 112.0E1) > (0x254, 0xC8) ? (0x6A, 786) : (7.41E2, 0x147));
        var e3 = 589;
        var q3 = 472;
        var g0 = ((95., 10.) >= 83. ? 'C' : (0x12, 131.9E1) >= (1.74E2, 68) ? (0x52, 781) : (0x66, 34));
        var E3 = ((0x1C0, 106) >= 10.72E2 ? "it" : (108.0E1, 0x17E) <= 127 ? (106, 49.7E1) : 9.56E2 >= (0xDF, 14) ? (0x5, 776) : (22.20E1, 13.55E2));
        var R0 = 824;
        var m3 = 122;
        var N3 = 982;
        var v0 = 1125;
        var z0 = 1209;
        var D0 = 196;
        var T0 = 1175;
        var q0 = 334;
        var w0 = 1109;
        var V0 = 439;
        var P0 = 1136;
        var I0 = (0x17A < (6.99E2, 0xBA) ? 247 : 50 >= (101, 58.) ? 0x22B : 1.103E3 >= (0xE1, 1.0110E3) ? (0xD6, 564) : (9.86E2, 63));
        var U0 = 1246;
        var H0 = 632;
        var p5 = ((0xA0, 0x93) >= (8.83E2, 17) ? (1.072E3, 1364) : (0xCA, 30));
        var v5 = 649;
        var k5 = (0x186 < (0x19B, 9.44E2) ? (0x1AB, 1483) : (7.37E2, 70.) >= 71 ? (0x103, 0x218) : (114., 5.600E2) < 5.020E2 ? (50.90E1, 34) : (149.20E1, 2.38E2));
        var L5 = 625;
        var o5 = ((0x104, 103.) > (0x176, 0x190) ? "=" : (73.9E1, 67.) >= 1.355E3 ? 5.770E2 : 7.21E2 >= (36, 72.) ? (58., 1559) : (0x15A, 133.));
        var A5 = 514;
        var y5 = 1537;
        var f5 = ((116.7E1, 91.5E1) <= 1.01E2 ? (1., 102.) : 140. <= (1.067E3, 105.) ? 'b' : (40, 0xE9) < 99.4E1 ? (6.30E1, 366) : (0x1EE, 1.150E2));
        var V5 = ((116., 0x18A) < (0xEB, 37) ? 7.80E1 : (12.14E2, 45.1E1) > 1. ? (143.6E1, 1514) : (12.70E1, 2.7E1) >= (0x22E, 6.310E2) ? 106. : (0x1A1, 0x18));
        var j5 = ((0x243, 66.) < 0xE6 ? (1.349E3, 223) : (9.1E2, 0x5) >= (125., 0x1A1) ? 0.001 : 37.80E1 <= (139.8E1, 82.) ? 0.001 : (9.44E2, 3.550E2));
        var s5 = 1596;
        var Z5 = 117;
        var Y5 = 1714;
        var D5 = (77. < (124, 42.7E1) ? (147, 1874) : (74, 0xF9));
        var U5 = 1984;
        var p3 = 2041;
        var l5 = 2014;
        var A3 = 1987;
        var L3 = 509;
        var e5 = 2083;
        var z3 = ((92., 147.) <= (1.247E3, 139.9E1) ? (9.43E2, 2211) : (19., 72));
        var c3 = ((1.454E3, 116.) < 0xC7 ? (35, 634) : (0x23F, 0x11F));
        var l3 = 2349;
        var S3 = 603;
        var x3 = (0x1C8 >= (91., 17.90E1) ? (0x5, 2461) : (0x15B, 77.30E1));
        var J3 = 531;
        var b0 = 2481;
        var G3 = ((0x228, 2.86E2) > 78.7E1 ? .18 : (0xCE, 32) > 10 ? (3.85E2, 362) : (17.8E1, 124.10E1));
        var W3 = 2419;
        var n0 = 214;
        var N0 = 2509;
        var K0 = ((123., 0x5B) >= (14.17E2, 41) ? (123.60E1, 109) : 18. >= (130., 101.) ? 26 : (8.75E2, 0x1E2) >= 13.530E2 ? 26 : (96., 50));
        var k0 = 2629;
        var M0 = 2789;
        var O0 = (135 >= (13.57E2, 0.) ? (83, 2923) : (8., 0x100));
        var d0 = 2984;
        var X3 = 247;
        var I3 = (128 < (58., 0x21C) ? (5.44E2, 2918) : (8.9E1, 135));
        var H3 = 377;
        var w3 = 2888;
        var B5 = 2973;
        var E0 = ((2.11E2, 8.1E1) >= (14.4E1, 13.64E2) ? 44. : 92.10E1 <= (1.70E1, 149.70E1) ? (60., 623) : (0x252, 0x32));
        var Y0 = 3108;
        var F0 = ((133., 51) <= (4.01E2, 0x7F) ? (0x1FF, 652) : (48., 51.0E1));
        var u0 = 3239;
        var M3 = 639;
        var i0 = 3341;
        var t0 = ((0x130, 139.) < 0xB2 ? (7.390E2, 535) : (0xC6, 111) <= (38, 83.) ? (114, 10.4E2) : (59.7E1, 0x239));
        var i3 = 3335;
        var a5 = 375;
        var T3 = 3314;
        var B0 = 3394;
        var m2 = (120.5E1 > (77, 9.1E1) ? (47, 3515) : (12.56E2, 0xF0));
        var b2 = "undefined";
        if (typeof m5 === b2) {
            var o2 = function() {
                m5 = -C7N8y.T8U;
            };
            o2();
        }
        var p2 = this;
        C0.call(this);
        this.touchPointY = C7N8y.W8U;
        this.layer = new createjs.Container();
        this.tween = C7N8y.S22;
        this.ySpeed = C7N8y.W8U;
        this.yAcc = C7N8y.b82;
        this.calcSpeedCache = C7N8y.W8U;
        this.slidePositions = [];
        this.levelsPositions = [C7N8y.L62, m2, C7N8y.A82, B0, C7N8y.k52, T3, a5, i3, t0, i0, M3, u0, F0, Y0, E0, B5, C7N8y.z52, w3, H3, I3, X3, d0, C7N8y.u52, O0, C7N8y.z62, M0, C7N8y.w62, k0, K0, N0, n0, W3, G3, b0, J3, x3, S3, l3, c3, z3, S3, e5, L3, A3, H3, l5, C7N8y.E5m, p3, C7N8y.M02, U5, C7N8y.x82, D5, C7N8y.v62, Y5, Z5, s5, j5, V5, f5, y5, A5, o5, L5, k5, v5, p5, H0, U0, I0, P0, V0, w0, q0, T0, D0, z0, C7N8y.R82, v0, C7N8y.O62, N3, m3, R0, C7N8y.k5m, E3, C7N8y.i5m, g0, q3, C7N8y.N52, e3, Q3, Z3, r3, j3, f3, n3, h3, d3, u5, Q5, C7N8y.U8U, F3, J5, C7N8y.i32, g3, C7N8y.v62, P5, C7N8y.T82, K5, t5, S5, G5, C7N8y.U7U, R5, W5, t0, C7N8y.d5m, O5, C7N8y.w8U, h5, C7N8y.o62];
        this.addChild(this.layer);
        for (var o0 = C7N8y.W8U; C7N8y.Y0p(o0, C7N8y.S8U); o0++) {
            var A2 = function() {
                L2.y = C7N8y.P0p(C7N8y.h3m, o0);
            };
            var L2 = DNAssetsManager.g_instance.getImage(b5 + (o0 + C7N8y.T8U));
            this.layer.addChild(L2);
            A2();
        }
        this.mapH = C7N8y.t0p(C7N8y.h3m, C7N8y.S8U);
        this.layer.y = -C7N8y.b82;
        if (m5 == -C7N8y.T8U) {
            var k2 = function() {
                m5 = C7N8y.B0p(GameData.getInstance().levelsAvailable(), C7N8y.T8U);
            };
            k2();
        }
        this.loadLayout(CurLayouts.SELECT_LEVEL_LAYOUT, this);
        for (var o0 = C7N8y.W8U; C7N8y.U0p(o0, this.levelsPositions.length / C7N8y.A8U); o0++) {
            var X0 = new SelectLevelButton(Images.LEVEL_BUTTON, o0);
            this.addGuiObject(X0);
            this.layer.addChild(X0);
            X0.x = (this.levelsPositions[C7N8y.u0p(o0, C7N8y.A8U)]);
            X0.y = this.levelsPositions[C7N8y.m2p(o0, C7N8y.A8U) + C7N8y.T8U];
            if (C7N8y.p2p(o0, m5)) {
                X0.shine();
                this.layer.y = +Constants.ASSETS_HEIGHT / C7N8y.A8U - X0.y;
            }
        }
        this.checkConstrains();
        this.findGUIObject(Layouts.NAME_STARS).setText(GameData.getInstance().totalStars().toString());
        this.findGUIObject(Layouts.NAME_SCORE).setText(GameData.getInstance().getTotalScore().toString());
        this.findGUIObject(Layouts.NAME_BUTTON_BACK).setHandler(function() {
            return p2.onExitTouch();
        });
        this.findGUIObject(Layouts.NAME_GOLD).setText(GameData.getInstance().getGold().toString());
    }
    __extends(s0, C0);
    s0.prototype.resume = function() {
        this.findGUIObject(Layouts.NAME_GOLD).setText(GameData.getInstance().getGold().toString());
    };
    s0.prototype.onExitTouch = function() {
        DNStateManager.g_instance.pushState(new CoolTransitionInState(new MainMenuState()));
    };
    s0.prototype.onMouseDown = function(m5, b5) {
        C0.prototype.onMouseDown.call(this, m5, b5);
        this.touchPointY = C7N8y.h2p(this.layer.y, b5);
        this.slidePositions.length = 0;
        this.slidePositions.push({
            liveTime: this.liveTime,
            y: b5
        });
    };
    s0.prototype.update = function(m5) {
        C0.prototype.update.call(this, m5);
        if (!DNStateManager.g_instance.isMouseDownNow()) {
            if (C7N8y.L2p(this.ySpeed, C7N8y.W8U)) {
                this.layer.y += C7N8y.A2p(this.ySpeed, m5);
                if (C7N8y.W2p(this.ySpeed, C7N8y.W8U)) {
                    this.ySpeed -= C7N8y.G2p(m5, this.yAcc);
                    if (C7N8y.f2p(this.ySpeed, C7N8y.W8U)) {
                        this.ySpeed = C7N8y.W8U;
                    }
                } else {
                    this.ySpeed += C7N8y.S2p(m5, this.yAcc);
                    if (C7N8y.c2p(this.ySpeed, C7N8y.W8U)) {
                        this.ySpeed = C7N8y.W8U;
                    }
                }
            }
        }
        this.checkConstrains();
    };
    s0.prototype.onMouseMove = function(m5, b5) {
        C0.prototype.onMouseMove.call(this, m5, b5);
        this.layer.y = b5 + this.touchPointY;
        this.checkConstrains();
        this.slidePositions.push({
            liveTime: this.liveTime,
            y: b5
        });
        if (C7N8y.j2p(this.slidePositions.length, 100)) {
            this.calcSpeedCache = this.calcYSpeed();
            this.slidePositions.length = 0;
        }
    };
    s0.prototype.checkConstrains = function() {
        var m5 = C7N8y.Q2p(C7N8y.C8U, C7N8y.j92);
        if (C7N8y.l2p(this.layer.y, m5)) {
            this.layer.y = m5;
            this.ySpeed = C7N8y.W8U;
        }
        if (Constants.g_isPC) {
            if (C7N8y.Z2p(this.layer.y, Constants.ASSETS_HEIGHT - this.mapH)) {
                this.layer.y = C7N8y.J2p(Constants.ASSETS_HEIGHT, this.mapH);
                this.ySpeed = C7N8y.W8U;
            }
        } else {
            if (C7N8y.e2p(this.layer.y, Constants.SCREEN_HEIGHT - this.mapH)) {
                this.layer.y = C7N8y.a2p(Constants.SCREEN_HEIGHT, this.mapH);
                this.ySpeed = C7N8y.W8U;
            }
        }
    };
    s0.prototype.onMouseUp = function(m5, b5) {
        C0.prototype.onMouseUp.call(this, m5, b5);
        this.slidePositions.push({
            liveTime: this.liveTime,
            y: b5
        });
        this.ySpeed = this.calcYSpeed();
    };
    s0.prototype.calcYSpeed = function() {
        if (C7N8y.g4p(this.slidePositions.length, 2)) {
            return this.calcSpeedCache;
        }
        var m5 = 0.2;
        var b5;
        for (b5 = C7N8y.E4p(this.slidePositions.length, 2); C7N8y.M4p(b5, 0); --b5) {
            if (C7N8y.r4p(this.liveTime - this.slidePositions[b5]["liveTime"], m5)) {
                break;
            }
        }
        var h5 = C7N8y.F4p(this.liveTime, this.slidePositions[b5]["liveTime"]);
        if (C7N8y.T4p(h5, 0.00001)) {
            return 0;
        }
        return C7N8y.d4p((this.slidePositions[this.slidePositions.length - 1]["y"] - this.slidePositions[b5]["y"]), h5);
    };
    s0.prototype.alignByCenter = function(m5) {};
    return s0;
})(DNGameState),
ShadeInState = (function(h5) {
    function O5(m5) {
        var b5 = this;
        h5.call(this);
        this.nextState = C7N8y.S22;
        this.nextState = m5;
        this.shader = new createjs.Shape();
        this.shader.graphics.beginFill(C7N8y.Z22);
        this.shader.graphics.drawRect(C7N8y.W8U, C7N8y.W8U, Constants.ASSETS_WIDTH, Constants.SCREEN_HEIGHT);
        this.shader.graphics.endFill();
        this.addChild(this.shader);
        this.shader.alpha = C7N8y.W8U;
        createjs.Tween.get(this.shader, {
            loop: C7N8y.Q72
        }).to({
            alpha: C7N8y.T8U
        }, C7N8y.z8U, createjs.Ease.linear).call(function() {
            return b5.onFinishShade();
        });
    }
    __extends(O5, h5);
    O5.prototype.onFinishShade = function() {
        DNStateManager.g_instance.changeState(this.nextState);
        DNStateManager.g_instance.pushState(new ShadeOutState());
    };
    O5.prototype.setNextState = function(m5) {
        this.nextState = m5;
    };
    return O5;
})(DNGameState),
ShadeOutState = (function(b5) {
    function h5() {
        var m5 = this;
        b5.call(this);
        this.shader = new createjs.Shape();
        this.shader.graphics.beginFill(C7N8y.Z22);
        this.shader.graphics.drawRect(C7N8y.W8U, C7N8y.W8U, Constants.ASSETS_WIDTH, Constants.SCREEN_HEIGHT);
        this.shader.graphics.endFill();
        this.addChild(this.shader);
        createjs.Tween.get(this.shader, {
            loop: C7N8y.Q72
        }).to({
            alpha: C7N8y.W8U
        }, C7N8y.z8U, createjs.Ease.linear).call(function() {
            return m5.onFinishShade();
        });
    }
    __extends(h5, b5);
    h5.prototype.onFinishShade = function() {
        DNStateManager.g_instance.popState();
    };
    return h5;
})(DNGameState),

//add by nada mode 1
    BuyMoreBoostersState = (function(j3) {
        function r3(b5) {
            var h5 = 140;
            var O5 = ": ";
            var W5 = "bold 27px Times New Roman";
            var R5 = function() {
                h3.x = -C7N8y.h62 - C7N8y.G82;
            };
            var G5 = function() {
                n3.y = -C7N8y.J12;
            };
            var S5 = function(m5) {
                n3.lineWidth = m5;
            };
            var t5 = function(m5) {
                n3.textAlign = m5;
            };
            var K5 = function(m5) {
                f3.y = m5;
            };
            var P5 = function() {
                d3.y = -C7N8y.b42;
            };
            var g3 = function() {
                h3.y = -C7N8y.d02 - C7N8y.a92;
            };
            var J5 = function() {
                d3.x = +C7N8y.k5m;
            };
            var F3 = this;
            j3.call(this);
            this.notEnouthLabel = new createjs.Text(DNStringManager.getInstance().getString(DNStringManager.NOT_ENOUGH_GOLD), W5, C7N8y.y5m);
            this.externalBooster = b5;
            var Q5 = b5.picName;
            var u5 = b5.boosterName;
            var d3 = new DNJellyButton(Images.BUTTON_CLOSE, function() {
                return F3.hide();
            });
            this.panel.addChild(d3);
            this.addGuiObject(d3);
            J5();
            P5();
            this.booster = new SelectBoosterButton(Q5, u5);
            this.panel.addChild(this.booster);
            this.booster.x = +C7N8y.W8U;
            this.booster.y = -C7N8y.j92 - C7N8y.a92 - C7N8y.J12;
            var h3 = DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.GOLD_ICON);
            this.panel.addChild(h3);
            R5();
            g3();
            this.goldLabel = new DNTextField(GameData.getInstance().getGold().toString(), DNFontDef.FONT);
            this.panel.addChild(this.goldLabel);
            this.goldLabel.x = -C7N8y.j92 - C7N8y.G82;
            this.goldLabel.y = -C7N8y.N7U - C7N8y.S12 - C7N8y.J12;
            var n3 = new createjs.Text(DNStringManager.getInstance().getString(DNStringManager.PRICE) + O5 + GameData.getInstance().getBoostPrice(u5), C7N8y.g72, C7N8y.y5m);
            t5(C7N8y.V02);
            S5(C7N8y.z8U);
            G5();
            this.panel.addChild(n3);
            this.panel.addChild(this.notEnouthLabel);
            this.notEnouthLabel.y = C7N8y.R92;
            this.notEnouthLabel.textAlign = "center";
            this.notEnouthLabel.lineWidth = 430;
            this.notEnouthLabel.alpha = C7N8y.W8U;
            var f3 = new DNJellyButton(Images.BUTTON_BUY, function() {
                return F3.onBuyTouch();
            });
            this.panel.addChild(f3);
            this.addGuiObject(f3);
            K5(h5);
            f3.scaleX = f3.scaleY = C7N8y.w22;
        }
        __extends(r3, j3);
        r3.prototype.onBuyTouch = function() {
            var m5 = GameData.getInstance().getBoostPrice(this.booster.boosterName);
            if (C7N8y.A64(GameData.getInstance().getGold(), m5)) {
                GameData.getInstance().addBooster(this.booster.boosterName);
                GameData.getInstance().addGold(-m5);
                this.booster.updateCaption();
                this.goldLabel.setText(GameData.getInstance().getGold().toString());
                this.externalBooster.updateCaption();
            } else {
                createjs.Tween.removeTweens(this.notEnouthLabel);
                createjs.Tween.get(this.notEnouthLabel).to({
                    alpha: C7N8y.T8U
                }, C7N8y.z8U, createjs.Ease.linear).wait(C7N8y.x7U).to({
                    alpha: C7N8y.W8U
                }, C7N8y.z8U, createjs.Ease.linear);
            }
        };
        return r3;
    })(PopupState),

    //add by nada mode 1
    GameOverState = (function(u5) {
        function d3(b5, h5, O5) {
            debugger
            var W5 = function() {
                P5.x = -C7N8y.q62;
            };
            var R5 = function(m5) {
                P5.y = m5;
            };
            var G5 = function() {
                g3.x = +C7N8y.q62;
            };
            var S5 = function() {
                J5.y = -C7N8y.k52;
            };
            var t5 = function(m5) {
                g3.y = m5;
            };
            var K5 = this;
            u5.call(this);
            this.loseReason = O5;
            var P5 = new DNJellyButton(Images.BUTTON_RESTART, function() {
                return K5.onRestartTouch();
            });
            this.panel.addChild(P5);
            this.addGuiObject(P5);
            W5();
            R5(C7N8y.d02);
            P5.scaleX = P5.scaleY = C7N8y.l72;
            var g3 = new DNJellyButton(Images.BUTTON_EXIT, function() {
                return K5.onExitTouch();
            });
            this.panel.addChild(g3);
            this.addGuiObject(g3);
            G5();
            t5(C7N8y.d02);
            g3.scaleX = g3.scaleY = C7N8y.l72;
            switch (this.loseReason) {
                case PlayState.LOSE_REASON_BOMB:
                    this.booster = new SaveBoosterButton(Images.BOOSTER_BOMB, GameData.BOOSTER_BOMB, function() {
                        return K5.onBoosterTouch();
                    });
                    break;
                case PlayState.LOSE_REASON_MOVES:
                    this.booster = new SaveBoosterButton(Images.BOOSTER_MOVES, GameData.BOOSTER_MOVES, function() {
                        return K5.onBoosterTouch();
                    });
                    break;
                case PlayState.LOSE_REASON_TIME:
                    this.booster = new SaveBoosterButton(Images.BOOSTER_TIME, GameData.BOOSTER_TIME, function() {
                        return K5.onBoosterTouch();
                    });
                    break;
            }
            this.panel.addChild(this.booster);
            this.addGuiObject(this.booster);
            this.booster.x = +C7N8y.W8U;
            this.booster.y = -C7N8y.j92;
            var J5 = DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.GAMEOVER_CAPTION);
            this.panel.addChild(J5);
            S5();
            try {
                if (DNSoundManager.g_instance.isSoundEnabled()) {
                    var F3 = function(m5) {
                        musicFlag = m5;
                    };
                    createjs.Sound.stop();
                    F3(C7N8y.s22);
                } else {
                    var Q5 = function(m5) {
                        musicFlag = m5;
                    };
                    Q5(C7N8y.Q72);
                }
                SG_Hooks.levelUp(b5, h5, function() {
                    if (musicFlag) createjs.Sound.play('music', 'none', 0, 0, -1, 1);
                });
            } catch (m5) {
                console.log(m5);
            }
        }
        __extends(d3, u5);
        d3.prototype.onBoosterTouch = function() {
            var m5 = GameData.getInstance().getBoostersCount(this.booster.boosterName);
            if (C7N8y.u2w(m5, C7N8y.W8U)) {
                PlayState.g_instance.saveByBooster(this.loseReason);
                this.hide();
            } else {
                DNStateManager.g_instance.pushState(new BuyMoreBoostersState(this.booster));
            }
        };
        return d3;
    })(PopupState),

    //add by nada mode 1
    SelectBoosterState = (function(e3) {
        function q3(b5) {
            var h5 = function(m5) {
                u5.y = m5;
            };
            var O5 = function() {
                Q5.y = -C7N8y.b42;
            };
            var W5 = function() {
                Z3.y = -C7N8y.a92;
            };
            var R5 = function() {
                d3.y = -C7N8y.c52;
            };
            var G5 = function(m5) {
                Z3.x = m5;
            };
            var S5 = function(m5) {
                d3.lineWidth = m5;
            };
            var t5 = function() {
                Q3.y = -C7N8y.a92;
            };
            var K5 = function(m5) {
                d3.textAlign = m5;
            };
            var P5 = function(m5) {
                u5.x = m5;
            };
            var g3 = function() {
                Q3.x = +C7N8y.d02;
            };
            var J5 = function() {
                Q5.x = +C7N8y.k5m;
            };
            var F3 = this;
            e3.call(this);
            this.level = b5;
            var Q5 = new DNJellyButton(Images.BUTTON_CLOSE, function() {
                return F3.hide();
            });
            this.panel.addChild(Q5);
            this.addGuiObject(Q5);
            J5();
            O5();
            var u5 = new DNJellyButton(Images.BUTTON_PLAY, function() {
                return F3.onPlayTouch();
            });
            this.panel.addChild(u5);
            this.addGuiObject(u5);
            P5(C7N8y.W8U);
            h5(C7N8y.d02);
            var d3 = new createjs.Text(DNStringManager.getInstance().getString(DNStringManager.SELECT_BOOSTER), C7N8y.g72, C7N8y.y5m);
            K5(C7N8y.V02);
            S5(C7N8y.z8U);
            R5();
            this.panel.addChild(d3);
            if (C7N8y.l3p(GameData.getInstance().getLevelDef(b5).moves, C7N8y.W8U)) {
                var h3 = function() {
                    f3.y = -C7N8y.a92;
                };
                var n3 = function() {
                    f3.x = -C7N8y.d02;
                };
                var f3 = new SelectBoosterButton(Images.BOOSTER_MOVES, GameData.BOOSTER_MOVES);
                this.panel.addChild(f3);
                this.addGuiObject(f3);
                n3();
                h3();
            }
            if (C7N8y.Z3p(GameData.getInstance().getLevelDef(b5).time, C7N8y.W8U)) {
                var j3 = function() {
                    f3.x = -C7N8y.d02;
                };
                var r3 = function() {
                    f3.y = -C7N8y.a92;
                };
                var f3 = new SelectBoosterButton(Images.BOOSTER_TIME, GameData.BOOSTER_TIME);
                this.panel.addChild(f3);
                this.addGuiObject(f3);
                j3();
                r3();
            }
            var Z3 = new SelectBoosterButton(Images.BOOSTER_4, GameData.BOOSTER_4);
            this.panel.addChild(Z3);
            this.addGuiObject(Z3);
            G5(C7N8y.W8U);
            W5();
            var Q3 = new SelectBoosterButton(Images.BOOSTER_5, GameData.BOOSTER_5);
            this.panel.addChild(Q3);
            this.addGuiObject(Q3);
            g3();
            t5();
            this.boosters = [f3, Z3, Q3];
        }
        __extends(q3, e3);
        q3.prototype.onPlayTouch = function() {
            var m5 = [];
            for (var b5 = 0; C7N8y.J3p(b5, this.boosters.length); b5++) {
                if (this.boosters[b5].checked) {
                    m5.push(this.boosters[b5].boosterName);
                }
            }
            DNStateManager.g_instance.pushState(new CoolTransitionInState(new PlayState(this.level, true, m5)));
        };
        return q3;
    })(PopupState),

    WinState = (function(w0) {
        function V0(b5, h5, O5) {
            var W5 = 1700;
            var R5 = function() {
                r3.x = -C7N8y.G82;
            };
            var G5 = function() {
                r3.y = C7N8y.w1p(C7N8y.W8U, C7N8y.S12);
            };
            var S5 = function() {
                q3.y = C7N8y.F1p(C7N8y.J12, C7N8y.A8U, C7N8y.S12);
            };
            var t5 = function(m5) {
                j3.x = m5;
            };
            var K5 = function() {
                f3.x = C7N8y.z1p(Constants.ASSETS_WIDTH, C7N8y.A8U);
            };
            var P5 = function(m5) {
                f3.y = m5;
            };
            var g3 = function() {
                Z3.x = -C7N8y.G82;
            };
            var J5 = function(m5) {
                q3.alpha = m5;
            };
            var F3 = function() {
                Z3.y = C7N8y.R1p(C7N8y.W8U, C7N8y.w62, C7N8y.S12);
            };
            var Q5 = function() {
                Q3.y = C7N8y.W1p(C7N8y.J12, C7N8y.w62, C7N8y.S12);
            };
            var u5 = function(m5) {
                j3.y = m5;
            };
            var d3 = function() {
                Q3.x = -C7N8y.R92;
            };
            var h3 = function(m5) {
                f3.alpha = m5;
            };
            var n3 = this;
            w0.call(this);
            this.needAddGold = C7N8y.Q72;
            //add by nada save 当前等级,当前分数,当前星级
            GameData.getInstance().onWinLevel(b5, h5, O5);
            var f3 = DNAssetsManager.g_instance.getCenteredImageWithProxy(Images.MAIN_MENU_RAINBOW);
            this.addChild(f3);
            K5();
            P5(C7N8y.f5m);
            h3(C7N8y.W8U);
            createjs.Tween.get(f3).wait(W5).to({
                alpha: C7N8y.T8U
            }, C7N8y.B7U, createjs.Ease.linear);
            this.addChild(this.panel);
            var j3 = new DNJellyButton(Images.BUTTON_PLAY, function() {
                return n3.onNextTouch();
            });
            this.panel.addChild(j3);
            this.addGuiObject(j3);
            t5(C7N8y.W8U);
            u5(C7N8y.d02);
            var r3 = DNAssetsManager.g_instance.getImage(Images.GOLD_ICON);
            this.panel.addChild(r3);
            R5();
            G5();
            this.goldLabel = new DNTextField(GameData.getInstance().getGold().toString(), DNFontDef.FONT);
            this.panel.addChild(this.goldLabel);
            this.goldLabel.x = -C7N8y.R92;
            this.goldLabel.y = C7N8y.q1p(C7N8y.J12, C7N8y.S12);
            var Z3 = DNAssetsManager.g_instance.getImage(Images.SCORE_ICON);
            this.panel.addChild(Z3);
            g3();
            F3();
            var Q3 = new DNTextField(h5.toString(), DNFontDef.FONT);
            this.panel.addChild(Q3);
            d3();
            Q5();
            //add by nada 添加金币规则：星级*15
            //var e3 = C7N8y.n1p(O5, C7N8y.W12);
            var e3 = C7N8y.n1p(O5, NADA_GAME_CONFIG.winRewardGold);
            var q3 = new DNTextField(C7N8y.r32 + e3, DNFontDef.FLYING_POINTS);
            this.panel.addChild(q3);
            q3.x = this.goldLabel.x + this.goldLabel.getBounds().width + 10;
            S5();
            J5(C7N8y.W8U);
            q3.scaleX = q3.scaleY = C7N8y.V72;
            createjs.Tween.get(q3).wait(C7N8y.Q02).to({
                scaleX: C7N8y.T8U,
                scaleY: C7N8y.T8U,
                alpha: C7N8y.T8U
            }, C7N8y.u5m, createjs.Ease.backOut).wait(C7N8y.x7U).call(function() {
                return n3.runAddGold();
            }).to({
                alpha: C7N8y.W8U
            }, C7N8y.u5m, createjs.Ease.linear);
            this.oldGold = GameData.getInstance().getGold();
            GameData.getInstance().addGold(e3);
            this.newGold = GameData.getInstance().getGold();
            var g0 = [C7N8y.l72, C7N8y.t72, C7N8y.l72];
            for (var E3 = C7N8y.W8U; C7N8y.N1p(E3, C7N8y.L8U); E3++) {
                var R0 = function() {
                    v0.y = -C7N8y.N8U;
                };
                var m3 = function() {
                    var m5 = ((2, 0x3E) > (0x193, 52.) ? (84.10E1, 95) : (0x176, 1.321E3));
                    v0.x = -m5 + E3 * m5;
                };
                var N3 = function(m5) {
                    v0.alpha = m5;
                };
                var v0 = DNAssetsManager.g_instance.getCenteredImageWithProxy(C7N8y.H1p(E3, O5) ? Images.PERFECT_STAR_ON : Images.PERFECT_STAR_OFF);
                this.panel.addChild(v0);
                m3();
                R0();
                var z0 = C7N8y.X1p(C7N8y.b8U, E3) + C7N8y.Y7U;
                v0.scaleX = v0.scaleY = C7N8y.j72;
                createjs.Tween.get(v0).wait(z0).to({
                    scaleX: g0[E3],
                    scaleY: g0[E3]
                }, C7N8y.u5m, createjs.Ease.backOut);
                N3(C7N8y.W8U);
                createjs.Tween.get(v0).wait(z0).to({
                    alpha: 1
                }, 300, createjs.Ease.linear).call(function() {
                    return DNSoundManager.g_instance.play(DNSoundManager.SOUND_MATCH_5);
                });
            }
            try {
                if (DNSoundManager.g_instance.isSoundEnabled()) {
                    var D0 = function(m5) {
                        musicFlag = m5;
                    };
                    createjs.Sound.stop();
                    D0(C7N8y.s22);
                } else {
                    var T0 = function(m5) {
                        musicFlag = m5;
                    };
                    T0(C7N8y.Q72);
                }
                //add by nada 添加 e3 金币
                SG_Hooks.levelUp(b5, h5,e3, function() {
                    if (musicFlag) createjs.Sound.play('music', 'none', 0, 0, -1, 1);
                });
            } catch (m5) {
                var q0 = "error SG_Hooks.levelUp(level, score);";
                console.log(q0);
            }
        }
        __extends(V0, w0);
        V0.prototype.runAddGold = function() {
            this.needAddGold = C7N8y.s22;
        };
        V0.prototype.update = function(m5) {
            w0.prototype.update.call(this, m5);
            if (this.needAddGold) {
                this.oldGold += C7N8y.C1p(m5, C7N8y.y12);
                if (C7N8y.I1p(this.oldGold, this.newGold)) {
                    this.oldGold = this.newGold;
                }
                this.goldLabel.setText(Math.round(this.oldGold).toString());
            }
        };
        V0.prototype.onNextTouch = function() {
            DNStateManager.g_instance.pushState(new CoolTransitionInState(new SelectLevelState()));
        };
        return V0;
    })(PopupState);
