/**
 * Created by haoruitao on 16-9-10.
 */

function Adapter(){
    //第二页
    this.page2div = $("#page2 > div");
    this.pContainer = $("#page2 > div > div");
    this.pList = $("#page2 p");

    //第三页
    this.page3ul = $("#carousel-area ul");
    this.tags = $("#tags");


    Adapter.prototype.init = function(){
        this.page2div.css("padding",111 / 1332 * $(window).height() + "px 0 " + 200 / 1332 * $(window).height() + "px");

        this.pContainer.css("width",$(window).width() * 0.657333 + "px");

        console.log("parent",this.pList.length);

        this.pList.css("line-height",this.pList.parent().height() / (this.pList.length + 2) + "px");
        this.pList.css("font-size",32 / 750 * $(window).width() + "px");

        //width 0.757333
        //height 0.611862
        //.css("height",$(window).height() * 0.55 + "px")


        if($(window).width() < 500 && $(window).height() / $(window).width() <= 1.5) {
            this.page3ul.css("width", $(window).width() * 0.65 + "px").css("height", $(".current").height() + "px").css("margin", $(window).height() * 0.076577 + "px auto 0");
        }else if($(window).width() < 500 && $(window).height() / $(window).width() > 1.5) {
            this.page3ul.css("width", $(window).width() * 0.5 + "px").css("height", $(".current").height() + "px").css("margin", $(window).height() * 0.076577 + "px auto 0");
            //this.tags.css("bottom","13.5%");
            this.tags.css("bottom","10%");
        }else if($(window).width() > 500 && $(window).height() / $(window).width() <= 1.5){
            this.page3ul.css("width", $(window).width() * 0.55 + "px").css("height", $(".current").height() + "px").css("margin", $(window).height() * 0.076577 + "px auto 0");
            this.tags.css("bottom","10%");
        }else{
            this.page3ul.css("width", $(window).width() * 0.65 + "px").css("height", $(".current").height() + "px").css("margin", $(window).height() * 0.078 + "px auto 0");
            this.tags.css("bottom","13.5%");
        }
    }
}

function Loading(){
    this.source = [
        //第一页
        "images/1/bg1.png",
        "images/1/mask.png",
        "images/1/byzf.png",
        "images/1/continue.png",
        "images/1/arrow.png",
        //第二页
        "images/2/bg2.png",
        "images/2/dialog.png",
        //第三页
        "images/3/bg3.png",
        "images/3/by-hotel.png",
        "images/3/product-tag.png",
        "images/3/program-tag.png",
        "images/3/mobile-tag.png",
        "images/3/design-tag.png",
        "images/3/game-tag.png",
        "images/3/web-tag.png",
        "images/3/run-tag.png",
        "images/3/product.png",
        "images/3/program.png",
        "images/3/mobile.png",
        "images/3/design.png",
        "images/3/game.png",
        "images/3/web.png",
        "images/3/run.png",
        "images/3/tip.png",
        //第四页
        "images/4/bg4.png",
        "images/4/joinus.png"

    ];

    this.total = 0;
    this.per = 1 / this.source.length;

    this.drawText;

    Loading.prototype.loadIn = function(){
        var img = new Image();

        var self = this;

        img.onload = function(){
            self.total += self.per;

            self.source.pop();

            console.log("total" + self.total);

            //if (self.total >= 0 && self.total <= 0.3 && self.drawText != "冰") {
            //    S.draw("冰");
            //    self.drawText = "冰";
            //} else if (self.total > 0.3 && self.total <= 0.55 && self.drawText != "岩") {
            //    S.draw("岩");
            //    self.drawText = "岩";
            //} else if (self.total > 0.55 && self.total <= 0.8 && self.drawText != "作") {
            //    S.draw("作");
            //    self.drawText = "作";
            //} else if (self.total > 0.8 && self.total <= 1.1 && self.drawText != "坊") {
            //    S.draw("坊");
            //    self.drawText = "坊";
            //}

            var timer = setTimeout(function(){
                if(self.source.length != 0){
                    self.loadIn();
                }else{
                    //$("#mask canvas").hide();

                    $("#mask").css("opacity",0);
                    var timer1 = setTimeout(function(){
                        $("#mask").hide();

                        setCurrentTag(null,0);
                        var adapter = new Adapter();
                        adapter.init();

                        clearTimeout(timer1);
                    },1000);

                    //clearTimeout(timer);
                }
            },6000 / self.source.length);
        };
        img.src = this.source[this.source.length - 1];
    };
}

function Touch(){
    var self = this;
    this.fingerStart = 0;
    this.fingerEnd = 0;
    this.$pages = $(".page");
    this.nowPageId = 1;
    this.clientHeight = document.documentElement.clientHeight;

    this.target = true;

    this.tip = 0;

    //用来给前后页面添加动画
    this.$prePage = null;
    this.$nextPage = null;

    this.init = function(){
        this.$pages.on("touchstart",function(e){
            e.preventDefault();

            self.fingerStart = e.touches[0];
        });

        this.$pages.on("touchend",function(e){
            e.preventDefault();

            self.fingerEnd = e.changedTouches[0];

            self.nowPageId = parseInt($(this).attr("pageId")) + 1;

            self.$prePage = self.nowPageId == 1 ? null : $(".page")[self.nowPageId - 2];
            self.$nextPage = self.nowPageId == 4 ? null : $(".page")[self.nowPageId];

            if(self.target == true) {
                self.verticalScroll();
            }
        })
    };

    Touch.prototype.verticalScroll = function(){
        if(this.fingerStart.screenY - this.fingerEnd.screenY >= 30 && this.nowPageId != 4){
            //向下滑动
            if(this.nowPageId == 1){
                //this.target = false;

                $(".disappear").css("opacity",0);
                var timer = setTimeout(function(){
                    $("#content").animate({
                        marginTop:"-" + (self.clientHeight * self.nowPageId) + "px"
                    },function(){
                        $(".disappear").css("opacity",1);

                        //第二页的dialog显示
                        touch.target = false;
                        $("#page2 > div").css("opacity",1);
                        var timer = setTimeout(function(){
                            beginType();

                            clearTimeout(timer);
                        },500);
                    });

                    //self.target = true;
                    clearTimeout(timer);
                },600);
            }else if(this.nowPageId == 2){
                $("#content").animate({
                    marginTop: "-" + (this.clientHeight * this.nowPageId) + "px"
                },function(){
                    $("#page2 p").css("opacity",0);

                    //第二页的dialog隐藏
                    $("#page2 > div").css("opacity",0)
                })
            }else {
                $("#content").animate({
                    marginTop: "-" + (this.clientHeight * this.nowPageId) + "px"
                },function(){
                })
            }
        }else if(this.fingerEnd.screenY - this.fingerStart.screenY >= 30 && this.nowPageId != 1){
            //向上滑动
            if(self.nowPageId == 3){

                console.log("当前是第三页" + this.clientHeight * (this.nowPageId - 2));

                $("#content").animate({
                    marginTop: "-" + (this.clientHeight * (this.nowPageId - 2)) + "px"
                }, function(){
                    //第二页dialog显现
                    touch.target = false;
                    $("#page2 > div").css("opacity",1);
                    var timer = setTimeout(function(){
                        beginType();

                        clearTimeout(timer);
                    },500)
                });
            }else if(self.nowPageId == 2){
                $("#content").animate({
                    marginTop: "-" + (this.clientHeight * (this.nowPageId - 2)) + "px"
                },function(){
                    $("#page2 p").css("opacity",0);

                    //第二页的dialog隐藏
                    $("#page2 > div").css("opacity",0);
                })
            }else {
                $("#content").animate({
                    marginTop: "-" + (this.clientHeight * (this.nowPageId - 2)) + "px"
                })
            }
        }
    }
}

function Carousel(touch){
    var self = this;
    this.touch = touch;
    this.carouselItems = document.querySelectorAll("#carousel-list li");
    //this.carouselArea = $("#carousel-area");

    this.carouselArea = $("#carousel-area > div");

    this.fingerStart;
    this.fingerEnd;

    this.tagsItems = document.querySelectorAll("#tags li");
    this.clickFingerStart;
    this.clickFingerEnd;
    //this.tagsItems = $("#tags li");

    this.currentId = 0;
    this.currentItem = $(".current");
    this.nextItem = $(".next");
    this.preItem = $(".pre");

    this.targetIsPlaying = false;
    this.targetIsClick = false;

    this.tip = 0;

    Carousel.prototype.init = function(){
        for(var i = 0;i < this.tagsItems.length;i++){
            this.tagsItems[i].index = i;
        }

        this.carouselArea.on('touchstart',function(e){
            e.preventDefault();

            self.fingerStart = e.touches[0];

            if(self.tip == 0){
                $(".tip").hide();

                self.tip = 1;
            }

            //self.touch.target = false;

            touch.target = false;
        }).on('touchend',function(e){
            e.preventDefault();

            self.fingerEnd = e.changedTouches[0];

            self.currentItem = $(".current");
            self.nextItem = $(".next");
            self.preItem = $(".pre");

            self.horizontalScroll();
        })

        //初始化下部tag
        for(var i = 0;i < this.tagsItems.length;i++){
            if(i <= 2){
                $(this.tagsItems[i]).css('transform-origin','right').css("transform","rotate(-" + ((3 - i) * 6) + "deg)").css("z-index",(i + 1) + "");
            }else if(i == 3){
                $(this.tagsItems[i]).css('z-index',(i + 1) + '');
            }else{
                $(this.tagsItems[i]).css('transform-origin','left').css("transform","rotate(" + ((i - 3) * 6) + "deg)").css("z-index",(7 - i) + "");
            }
            $(this.tagsItems[i]).css("left",35 * i / 50 + "rem");
        }

        $(this.tagsItems).on("touchstart",function(e){
            self.clickFingerStart = e.touches[0];
        }).on("touchend",function(e){
            self.clickFingerEnd = e.changedTouches[0];

            self.currentItem = $(".current");
            self.nextItem = $(".next");
            self.preItem = $(".pre");

            if(!self.targetIsPlaying && !self.targetIsClick) {
                if (self.clickFingerEnd.screenX == self.clickFingerStart.screenX && self.clickFingerEnd.screenY == self.clickFingerStart.screenY) {
                    self.targetIsClick = true;

                    var index = this.index;
                    if (index != self.currentId) {
                        self.preItem.addClass("click-disappear");
                        self.currentItem.addClass("click-disappear");
                        self.nextItem.addClass("click-disappear");
                        var timer = setTimeout(function () {
                            self.preItem.removeClass("click-disappear").removeClass("pre").addClass("normal");
                            self.currentItem.removeClass("click-disappear").removeClass("current").addClass("normal");
                            self.nextItem.removeClass("click-disappear").removeClass("next").addClass("normal");

                            var pre = 0 == index ? self.carouselItems.length - 1 : index - 1;
                            var next = self.carouselItems.length - 1 == index ? 0 : index + 1;

                            $(self.carouselItems[pre]).animate({
                                left: "0",
                                right: "20%",
                                top: "10%"
                            }, function () {
                                $(self.carouselItems[pre]).addClass("pre");
                            });

                            $(self.carouselItems[index]).animate({
                                left: "0",
                                right: "0",
                                top: "0"
                            }, function () {
                                $(self.carouselItems[index]).addClass("current");
                            });

                            $(self.carouselItems[next]).animate({
                                left: "20%",
                                right: "0",
                                top: "10%"
                            }, function () {
                                $(self.carouselItems[next]).addClass("next");
                            });

                            var timer1 = setTimeout(function () {
                                $(self.carouselItems[pre]).removeClass("normal");

                                clearTimeout(timer1);
                            }, 800);

                            var timer2 = setTimeout(function () {
                                $(self.carouselItems[next]).removeClass("normal");

                                clearTimeout(timer2)
                            }, 800)

                            var timer3 = setTimeout(function () {
                                $(self.carouselItems[index]).removeClass("normal");

                                self.targetIsClick = false;
                                clearTimeout(timer3);
                            }, 500)

                            clearTimeout(timer);
                        }, 300);

                        setCurrentTag(self.currentId, index);

                        self.currentId = index;
                    } else {
                        //无反应
                    }
                }
            }
        })

    };

    Carousel.prototype.horizontalScroll = function(){
        if(!this.targetIsPlaying && !this.targetIsClick) {
            if (this.fingerStart.screenX - this.fingerEnd.screenX >= 50) {
                self.targetIsPlaying = true;
                self.carouselNextPage();
            } else if (this.fingerEnd.screenX - this.fingerStart.screenX >= 50) {
                self.targetIsPlaying = true;
                self.carouselPrePage();
            } else {
                touch.target = true;
            }
        }
    }

    Carousel.prototype.carouselNextPage = function(){
        var id = this.currentId;

        this.currentId = this.currentId == this.carouselItems.length - 1 ? 0 : this.currentId + 1;
        var next = this.currentId == this.carouselItems.length - 1 ? 0 : this.currentId + 1;

        var timer1 = setTimeout((function(preItem){
            preItem.removeClass("pre").addClass("preLeave");
            clearTimeout(timer1);

            var timer2 = setTimeout((function(preItem){
                preItem.removeClass("preLeave").addClass("normal");
                clearTimeout(timer2);
            })(preItem),300);
        })(self.preItem),300);

        $(".current").animate({
            top:"10%",
            right:"20%",
            left:"0"
        },220,function(){
            $(".current").removeClass("current").addClass("pre");
        });

        $(".next").animate({
            top:"0",
            right:"0",
            left:"0"
        },220,function(){
            $(".next").removeClass("next").addClass("current");
        });

        $(this.carouselItems[next]).animate({
            top:"10%",
            right:"0",
            left:"20%"
        },220,function(){
            $(self.carouselItems[next]).removeClass("normal").addClass("next");
        })

        var time = setTimeout(function(){
            self.targetIsPlaying = false;

            clearTimeout(time);
        },400);

        setCurrentTag(id,this.currentId);
    }

    Carousel.prototype.carouselPrePage = function(){
        var id = this.currentId;

        this.currentId = this.currentId == 0 ? this.carouselItems.length - 1 : this.currentId - 1;
        var pre = this.currentId == 0 ? this.carouselItems.length - 1 : this.currentId - 1;

        var timer1 = setTimeout((function(nextItem){
            nextItem.removeClass("next").addClass("nextLeave");
            clearTimeout(timer1);

            var timer2 = setTimeout((function(nextItem){
                nextItem.removeClass("nextLeave").addClass("normal");
                clearTimeout(timer2);
            })(nextItem),300);
        })(self.nextItem),300);

        $(".current").animate({
            top:"10%",
            right:"0",
            left:"20%"
        },220,function(){
            $(".current").removeClass("current").addClass("next");
        });

        $(".pre").animate({
            top:"0",
            left:"0",
            right:"0"
        },220,function(){
            $(".pre").removeClass("pre").addClass("current");
        });

        $(this.carouselItems[pre]).animate({
            top:"10%",
            right:"20%",
            left:"0"
        },220,function(){
            $(self.carouselItems[pre]).removeClass("normal").addClass("pre");
        });

        var time = setTimeout(function(){
            self.targetIsPlaying = false;

            clearTimeout(time);
        },400);

        setCurrentTag(id,this.currentId);
    }
}

/*
distance 传入 rem值
 */

var distances = [
    0.6,
    0.44,
    0.4,
    0.36,
    0.4,
    0.44,
    0.6
];

function setCurrentTag(currentId,nextId){
    var fontSize = parseFloat(document.documentElement.style.fontSize);

    if(currentId != null) {
        var currentTag = $(document.querySelectorAll("#tags li")[currentId]);
        var nextTag = $(document.querySelectorAll("#tags li")[nextId]);

        var curretnLeft = parseFloat(currentTag.css("left"));
        var currentTop = parseFloat(currentTag.css("top"));
        var currentRotate = parseInt(currentTag.attr("rotate"));

        var nextLeft = parseFloat(nextTag.css("left"));
        var nextTop = parseFloat(nextTag.css("top"));
        var nextRotate = parseInt(nextTag.attr("rotate"));

        currentTag.css("left",curretnLeft - distances[currentId] * Math.sin(currentRotate / 180 * Math.PI) * fontSize + "px");
        currentTag.css("top", currentTop + distances[currentId] * Math.cos(currentRotate / 180 * Math.PI) * fontSize + "px");

        nextTag.css("left", nextLeft + distances[nextId] * Math.sin(nextRotate / 180 * Math.PI) * fontSize + "px");
        nextTag.css("top", nextTop - distances[nextId] * Math.cos(nextRotate / 180 * Math.PI) * fontSize + "px");

    }else{
        var nextTag = $(document.querySelectorAll("#tags li")[nextId]);
        var left = parseFloat(nextTag.css("left"));
        var top = 0.2 * fontSize;
        var rotate = parseInt(nextTag.attr("rotate"));

        nextTag.css("left", left + distances[nextId] * Math.sin(rotate / 180 * Math.PI) * fontSize + "px");
        nextTag.css("top", top - distances[nextId] * Math.cos(rotate / 180 * Math.PI) * fontSize + "px");
    }
}

function beginType(){
    var num = 0;

    typeit(num);
}

function typeit(num){
    $(pList[num]).css("opacity",1);

    if(num < pList.length){
        num++;
        var timer = setTimeout("typeit(" + num +")",200);
    }else {
        touch.target = true;

        clearTimeout(timer);
    }
}

/*
一个一个显示文字
 */

var touch = new Touch();
var carousel = new Carousel(touch);
var loading = new Loading();
var pList = document.querySelectorAll("#page2 p");

$(document).ready(function(){
    //var loading = new Loading();
    //loading.loadIn();

    //图片的懒加载
    //$("#mask").on("touchstart",function(e){
    //    e.preventDefault();
    //}).on("touchend",function(e){
    //    e.preventDefault();
    //});

    //先禁止掉

    //这个之间
    //S.init();

    $("#mask").on("touchstart",function(e){
        e.preventDefault();
    }).on("touchend",function(e){
        e.preventDefault();
    });

//    var canvas = document.getElementById("myCanvas");
//
//    canvas.width = $(window).width();
//    canvas.height = $(window).height();
//
//    var ctx = canvas.getContext("2d");
//
//    //context.fill = "rgba(0,0,0,0.7)";
//    //context.fillRect(0,0,canvas.width,canvas.height);
//
//    window.requestAnimFrame = (function(){
//        return  window.requestAnimationFrame       ||
//            window.webkitRequestAnimationFrame ||
//            window.mozRequestAnimationFrame    ||
//            function( callback ){
//                window.setTimeout(callback, 1000 / 60);
//            };
//    })();
//
//    //var lines = ["rgba(0,222,255, 0.2)",
//    //    "rgba(157,192,249, 0.2)",
//    //    "rgba(0,168,255, 0.2)"];
//
//    var lines = ["rgba(0,0,0,1)"]
//
//    var step = 0;
//    function loop() {
//        ctx.clearRect(0, 0, canvas.width, canvas.height);
////            ctx.fillStyle = "rgba(0,222,255, 0.2)";
//        //角度增加一度
//        step++;
//        //角度转换成弧度
//        for(var j = lines.length - 1; j >= 0; j--) {
//            ctx.fillStyle = lines[j];
//            //每个矩形的角度都不同，每个之间相差45度
//            var angle = (step+j*45)*Math.PI/180;
//            var deltaHeight   = Math.sin(angle) * 50;
//            var deltaHeightRight   = Math.cos(angle) * 50;
//            ctx.beginPath();
//            ctx.moveTo(0, canvas.height/2+deltaHeight);
//            ctx.bezierCurveTo(canvas.width /2, canvas.height/2+deltaHeight-50, canvas.width / 2, canvas.height/2+deltaHeightRight-50, canvas.width, canvas.height/2+deltaHeightRight);
//            ctx.lineTo(canvas.width, canvas.height);
//            ctx.lineTo(0, canvas.height);
//            ctx.lineTo(0, canvas.height/2+deltaHeight);
//            ctx.closePath();
//            ctx.fill();
//        }
//        requestAnimFrame(loop);
//    }
//    loop();


    loading.loadIn();

    touch.init();
    carousel.init();
    //这个之间

    //setCurrentTag(null,0);

    //setCurrentTag(30,null,0);


    //var init = new Init();
    //init.init();


    //var timer = setTimeout(function(){
    //    var init = new Init();
    //    init.init();
    //},500);
});

var S = {
    init: function () {
        var action = window.location.href,
            i = action.indexOf('?a=');

        S.Drawing.init('.canvas');

        //S.UI.simulate('Shape|Shifter|Type|to start|#rectangle|#countdown 3||');
        //S.UI.simulate('从|冰|岩|走|向|山|川|湖|海|#rectangle|#countdown 3||')
        //S.UI.simulate("产品|程序|前端|设计|移动|游戏|运营");


        //if (i !== -1) {
        //    S.UI.simulate(decodeURI(action).substring(i + 3));
        //} else {
        //    S.UI.simulate('Shape|Shifter|Type|to start|#rectangle|#countdown 3||');
        //}

        //S.Drawing.loop(function () {
        //    S.Shape.render();
        //});
    },

    draw: function(string){
        S.UI.simulate(string);

        S.Drawing.loop(function () {
            S.Shape.render();
        });
    }
};


S.Drawing = (function () {
    var canvas,
        context,
        renderFn
    requestFrame = window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    return {
        init: function (el) {
            canvas = document.getElementById("canvas");
            context = canvas.getContext('2d');
            this.adjustCanvas();

            window.addEventListener('resize', function (e) {
                S.Drawing.adjustCanvas();
            });
        },

        loop: function (fn) {
            renderFn = !renderFn ? fn : renderFn;
            this.clearFrame();
            renderFn();
            requestFrame.call(window, this.loop.bind(this));
        },

        adjustCanvas: function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        },

        clearFrame: function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
        },

        getArea: function () {
            return { w: canvas.width, h: canvas.height };
        },

        drawCircle: function (p, c) {
            context.fillStyle = c.render();
            context.beginPath();
            context.arc(p.x, p.y, p.z, 0, 2 * Math.PI, true);
            context.closePath();
            context.fill();
        }
    }
}());


S.UI = (function () {
    var input = document.querySelector('.ui-input'),
        ui = document.querySelector('.ui'),
        help = document.querySelector('.help'),
        commands = document.querySelector('.commands'),
        overlay = document.querySelector('.overlay'),
        canvas = document.querySelector('.canvas'),
        interval,
        isTouch = false, //('ontouchstart' in window || navigator.msMaxTouchPoints),
        currentAction,
        resizeTimer,
        time,
        maxShapeSize = 30,
        firstAction = true,
        sequence = [],
        cmd = '#';

    function formatTime(date) {
        var h = date.getHours(),
            m = date.getMinutes(),
            m = m < 10 ? '0' + m : m;
        return h + ':' + m;
    }

    function getValue(value) {
        return value && value.split(' ')[1];
    }

    function getAction(value) {
        value = value && value.split(' ')[0];
        return value && value[0] === cmd && value.substring(1);
    }

    function timedAction(fn, delay, max, reverse) {
        clearInterval(interval);
        currentAction = reverse ? max : 1;

        console.log("currentAction" + currentAction)

        fn(currentAction);

        if (!max || (!reverse && currentAction < max) || (reverse && currentAction > 0)) {
            interval = setInterval(function () {
                currentAction = reverse ? currentAction - 1 : currentAction + 1;
                fn(currentAction);

                if ((!reverse && max && currentAction === max) || (reverse && currentAction === 0)) {
                    clearInterval(interval);
                }
            }, delay);
        }
    }

    function reset(destroy) {
        clearInterval(interval);
        sequence = [];
        time = null;
        destroy && S.Shape.switchShape(S.ShapeBuilder.letter(''));
    }

    function performAction(value) {
        var action,
            value,
            current;

        sequence = typeof(value) === 'object' ? value : sequence.concat(value.split('|'));


        timedAction(function (index) {
            current = sequence.shift();

            console.log("sequence" + sequence)

            action = getAction(current);
            value = getValue(current);

            console.log("current" + current)
            console.log("action" + action)
            console.log("value" + value)

            switch (action) {
                case 'countdown':
                    value = parseInt(value) || 10;
                    value = value > 0 ? value : 10;

                    timedAction(function (index) {
                        if (index === 0) {
                            if (sequence.length === 0) {
                                S.Shape.switchShape(S.ShapeBuilder.letter(''));
                            } else {
                                performAction(sequence);
                            }
                        } else {
                            S.Shape.switchShape(S.ShapeBuilder.letter(index), true);
                        }
                    }, 1000, value, true);
                    break;

                case 'rectangle':
                    value = value && value.split('x');
                    value = (value && value.length === 2) ? value : [maxShapeSize, maxShapeSize / 2];

                    S.Shape.switchShape(S.ShapeBuilder.rectangle(Math.min(maxShapeSize, parseInt(value[0])), Math.min(maxShapeSize, parseInt(value[1]))));
                    break;

                case 'circle':
                    value = parseInt(value) || maxShapeSize;
                    value = Math.min(value, maxShapeSize);
                    S.Shape.switchShape(S.ShapeBuilder.circle(value));
                    break;

                case 'time':
                    var t = formatTime(new Date());

                    if (sequence.length > 0) {
                        S.Shape.switchShape(S.ShapeBuilder.letter(t));
                    } else {
                        timedAction(function () {
                            t = formatTime(new Date());
                            if (t !== time) {
                                time = t;
                                S.Shape.switchShape(S.ShapeBuilder.letter(time));
                            }
                        }, 1000);
                    }
                    break;

                default:
                    S.Shape.switchShape(S.ShapeBuilder.letter(current[0] === cmd ? 'What?' : current));
            }
        }, 2000, sequence.length);
    }

    return {
        simulate: function (action) {
            performAction(action);
        }
    }
}());

S.Point = function (args) {
    this.x = args.x;
    this.y = args.y;
    this.z = args.z;
    this.a = args.a;
    this.h = args.h;
};


S.Color = function (r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};

S.Color.prototype = {
    render: function () {
        return 'rgba(' + this.r + ',' +  + this.g + ',' + this.b + ',' + this.a + ')';
    }
};


S.Dot = function (x, y) {
    this.p = new S.Point({
        x: x,
        y: y,
        z: 5,
        a: 1,
        h: 0
    });

    this.e = 0.07;
    this.s = true;

    this.c = new S.Color(255, 255, 255, this.p.a);

    this.t = this.clone();
    this.q = [];
};

S.Dot.prototype = {
    clone: function () {
        return new S.Point({
            x: this.x,
            y: this.y,
            z: this.z,
            a: this.a,
            h: this.h
        });
    },

    _draw: function () {
        this.c.a = this.p.a;
        S.Drawing.drawCircle(this.p, this.c);
    },

    _moveTowards: function (n) {
        var details = this.distanceTo(n, true),
            dx = details[0],
            dy = details[1],
            d = details[2],
            e = this.e * d;

        if (this.p.h === -1) {
            this.p.x = n.x;
            this.p.y = n.y;
            return true;
        }

        if (d > 1) {
            this.p.x -= ((dx / d) * e);
            this.p.y -= ((dy / d) * e);
        } else {
            if (this.p.h > 0) {
                this.p.h--;
            } else {
                return true;
            }
        }

        return false;
    },

    _update: function () {
        if (this._moveTowards(this.t)) {
            var p = this.q.shift();

            if (p) {
                this.t.x = p.x || this.p.x;
                this.t.y = p.y || this.p.y;
                this.t.z = p.z || this.p.z;
                this.t.a = p.a || this.p.a;
                this.p.h = p.h || 0;
            } else {
                if (this.s) {
                    this.p.x -= Math.sin(Math.random() * 3.142);
                    this.p.y -= Math.sin(Math.random() * 3.142);
                } else {
                    this.move(new S.Point({
                        x: this.p.x + (Math.random() * 50) - 25,
                        y: this.p.y + (Math.random() * 50) - 25,
                    }));
                }
            }
        }

        d = this.p.a - this.t.a;
        this.p.a = Math.max(0.1, this.p.a - (d * 0.05));
        d = this.p.z - this.t.z;
        this.p.z = Math.max(1, this.p.z - (d * 0.05));
    },

    distanceTo: function (n, details) {
        var dx = this.p.x - n.x,
            dy = this.p.y - n.y,
            d = Math.sqrt(dx * dx + dy * dy);

        return details ? [dx, dy, d] : d;
    },

    move: function (p, avoidStatic) {
        if (!avoidStatic || (avoidStatic && this.distanceTo(p) > 1)) {
            this.q.push(p);
        }
    },

    render: function () {
        this._update();
        this._draw();
    }
}


S.ShapeBuilder = (function () {
    var gap = 13,
        shapeCanvas = document.createElement('canvas'),
        shapeContext = shapeCanvas.getContext('2d'),
        fontSize = 500,
        fontFamily = 'Avenir, Helvetica Neue, Helvetica, Arial, sans-serif';

    function fit() {
        shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap;
        shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap;
        shapeContext.fillStyle = 'red';
        shapeContext.textBaseline = 'middle';
        shapeContext.textAlign = 'center';
    }

    function processCanvas() {
        var pixels = shapeContext.getImageData(0, 0, shapeCanvas.width, shapeCanvas.height).data;
        dots = [],
            pixels,
            x = 0,
            y = 0,
            fx = shapeCanvas.width,
            fy = shapeCanvas.height,
            w = 0,
            h = 0;

        for (var p = 0; p < pixels.length; p += (4 * gap)) {
            if (pixels[p + 3] > 0) {
                dots.push(new S.Point({
                    x: x,
                    y: y
                }));

                w = x > w ? x : w;
                h = y > h ? y : h;
                fx = x < fx ? x : fx;
                fy = y < fy ? y : fy;
            }

            x += gap;

            if (x >= shapeCanvas.width) {
                x = 0;
                y += gap;
                p += gap * 4 * shapeCanvas.width;
            }
        }

        return { dots: dots, w: w + fx, h: h + fy };
    }

    function setFontSize(s) {
        shapeContext.font = 'bold ' + s + 'px ' + fontFamily;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function init() {
        fit();
        window.addEventListener('resize', fit);
    }

    // Init
    init();

    return {
        imageFile: function (url, callback) {
            var image = new Image(),
                a = S.Drawing.getArea();

            image.onload = function () {
                shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
                shapeContext.drawImage(this, 0, 0, a.h * 0.6, a.h * 0.6);
                callback(processCanvas());
            };

            image.onerror = function () {
                callback(S.ShapeBuilder.letter('What?'));
            }

            image.src = url;
        },

        circle: function (d) {
            var r = Math.max(0, d) / 2;
            shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
            shapeContext.beginPath();
            shapeContext.arc(r * gap, r * gap, r * gap, 0, 2 * Math.PI, false);
            shapeContext.fill();
            shapeContext.closePath();

            return processCanvas();
        },

        letter: function (l) {
            var s = 0;

            setFontSize(fontSize);
            s = Math.min(fontSize,
                (shapeCanvas.width / shapeContext.measureText(l).width) * 0.8 * fontSize,
                (shapeCanvas.height / fontSize) * (isNumber(l) ? 1 : 0.45) * fontSize);
            setFontSize(s);

            shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
            shapeContext.fillText(l, shapeCanvas.width / 2, shapeCanvas.height / 2);

            return processCanvas();
        },

        rectangle: function (w, h) {
            var dots = [],
                width = gap * w,
                height = gap * h;

            for (var y = 0; y < height; y += gap) {
                for (var x = 0; x < width; x += gap) {
                    dots.push(new S.Point({
                        x: x,
                        y: y,
                    }));
                }
            }

            return { dots: dots, w: width, h: height };
        }
    };
}());


S.Shape = (function () {
    var dots = [],
        width = 0,
        height = 0,
        cx = 0,
        cy = 0;

    function compensate() {
        var a = S.Drawing.getArea();

        cx = a.w / 2 - width / 2;
        cy = a.h / 2 - height / 2;
    }

    return {
        shuffleIdle: function () {
            var a = S.Drawing.getArea();

            for (var d = 0; d < dots.length; d++) {
                if (!dots[d].s) {
                    dots[d].move({
                        x: Math.random() * a.w,
                        y: Math.random() * a.h
                    });
                }
            }
        },

        switchShape: function (n, fast) {
            var size,
                a = S.Drawing.getArea();

            width = n.w;
            height = n.h;

            compensate();

            if (n.dots.length > dots.length) {
                size = n.dots.length - dots.length;
                for (var d = 1; d <= size; d++) {
                    dots.push(new S.Dot(a.w / 2, a.h / 2));
                }
            }

            var d = 0,
                i = 0;

            while (n.dots.length > 0) {
                i = Math.floor(Math.random() * n.dots.length);
                dots[d].e = fast ? 0.25 : (dots[d].s ? 0.14 : 0.11);

                if (dots[d].s) {
                    dots[d].move(new S.Point({
                        z: Math.random() * 20 + 10,
                        a: Math.random(),
                        h: 18
                    }));
                } else {
                    dots[d].move(new S.Point({
                        z: Math.random() * 5 + 5,
                        h: fast ? 18 : 30
                    }));
                }

                dots[d].s = true;
                dots[d].move(new S.Point({
                    x: n.dots[i].x + cx,
                    y: n.dots[i].y + cy,
                    a: 1,
                    z: 5,
                    h: 0
                }));

                n.dots = n.dots.slice(0, i).concat(n.dots.slice(i + 1));
                d++;
            }

            for (var i = d; i < dots.length; i++) {
                if (dots[i].s) {
                    dots[i].move(new S.Point({
                        z: Math.random() * 20 + 10,
                        a: Math.random(),
                        h: 20
                    }));

                    dots[i].s = false;
                    dots[i].e = 0.04;
                    dots[i].move(new S.Point({
                        x: Math.random() * a.w,
                        y: Math.random() * a.h,
                        a: 0.3, //.4
                        z: Math.random() * 4,
                        h: 0
                    }));
                }
            }
        },

        render: function () {
            for (var d = 0; d < dots.length; d++) {
                dots[d].render();
            }
        }
    }
}());