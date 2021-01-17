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
})(DNGameState);
