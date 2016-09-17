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

        console.log("pContainerParent" + $(window).width());
        console.log("pContainer" + $(window).width() * 0.);

        this.pContainer.css("width",$(window).width() * 0.70 + "px");

        console.log("parent",this.pList.length);

        this.pList.css("line-height",this.pList.parent().height() / (this.pList.length + 2) + "px");


        this.pList.css("font-size",31 / 750 * $(window).width() + "px");

        if($(window).width() < 500 && $(window).height() / $(window).width() <= 1.5) {
            this.page3ul.css("width", $(window).width() * 0.65 + "px").css("height", $(".current").height() + "px").css("margin", $(window).height() * 0.076577 + "px auto 0");
        }else if($(window).width() < 500 && $(window).height() / $(window).width() > 1.5) {
            this.page3ul.css("width", $(window).width() * 0.65 + "px").css("height", $(".current").height() + "px").css("margin", $(window).height() * 0.076577 + "px auto 0");
            this.tags.css("bottom","13.5%");
            //this.tags.css("bottom","10%");
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
        //第四页
        "images/4/bg4.png",
        "images/4/joinus.png",
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
        //第二页
        "images/2/bg2.png",
        "images/2/dialog.png",
        //第一页
        "images/1/bg1.png",
        "images/1/mask.png",
        "images/1/byzf.png",
        "images/1/continue.png",
        "images/1/arrow.png"
    ];

    this.total = 0;
    this.per = 1 / this.source.length;

    Loading.prototype.loadIn = function(){
        var img = new Image();

        var self = this;

        $("#precent").text(parseInt(this.total * 100) + "%");

        img.onload = function(){
            self.total += self.per;

            self.source.pop();

            var timer = setTimeout(function(){
                if(self.source.length != 0){
                    self.loadIn();
                }else{
                    $("#preload").css("opacity",0);
                    $("#precent").css("opacity",0);
                    var timer1 = setTimeout(function(){
                        $("#preload").remove();
                        $("#precent").remove();
                    },600);

                    clearTimeout(timer);
                }
            },2000 / self.source.length);
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

    this.init = function(){
       this.$pages.on("touchstart",function(e){
            e.preventDefault();

            self.fingerStart = e.touches[0];
        }).on("touchmove",function(e) {
            e.preventDefault();

            self.fingerEnd = e.changedTouches[0];

            self.nowPageId = parseInt($(this).attr("pageId")) + 1;

            self.$prePage = self.nowPageId == 1 ? null : $(".page")[self.nowPageId - 2];
            self.$nextPage = self.nowPageId == 4 ? null : $(".page")[self.nowPageId];

            if (self.target == true) {
                self.verticalScroll();
            }
        })
    };

    Touch.prototype.verticalScroll = function(){

    	alert("start" + this.fingerStart.screenY + "end" + this.fingerEnd.screenY)

        if(this.fingerStart.screenY - this.fingerEnd.screenY >= 30 && this.nowPageId != 4){
            //向下滑动
            if(this.nowPageId == 1){
                //this.target = false;

                $(".disappear").css("opacity",0);
                var timer = setTimeout(function(){
                    $("#content").animate({
                        marginTop:"-" + (self.clientHeight * self.nowPageId) + "px"
                    },400,function(){
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

                                touch.target = true;
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

            touch.target = true;
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

            touch.target = true;
            clearTimeout(time);
        },400);

        setCurrentTag(id,this.currentId);
    }
}

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

var touch = new Touch();
var carousel = new Carousel(touch);
var loading = new Loading();
var pList = document.querySelectorAll("#page2 p");
var distances = [
    0.6,
    0.44,
    0.4,
    0.36,
    0.4,
    0.44,
    0.6
];

$("document").ready(function(){
    $(".mask").on("touchstart",function(e){
        e.preventDefault();
    }).on("touchend",function(e){
        e.preventDefault();
    });

    loading.loadIn();

    touch.init();
    carousel.init();

    var preload = new Preload(loading);
    preload.init();

    var timer = setTimeout(function(){
        setCurrentTag(null,0);
        var adapter = new Adapter();
        adapter.init();

        clearTimeout(timer);
    },500);

    $("#page4 > a").on("touchstart",function(e){
        e.preventDefault();

        window.location.href = "http://cvs.bingyan.net";
    })
})

function Preload(loading) {

    var self = this;

    this.canvas = document.getElementById('preload');
    this.ctx = this.canvas.getContext('2d');
    this.winHeight = $(window).height();
    this.winWidth = $(window).width();
    this.canvas.width = this.winWidth;
    this.canvas.height = this.winHeight;
    this.step = 0;
    this.angle = 0;
    this.deltaHeight = 0;
    this.deltaHeightRight = 0;

    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    this.loading = loading;

    this.imgBack = new Image();
    this.img = new Image();
    this.imgBack.src = './images/0/back.png';
    this.img.src = './images/0/front.png';
    this.img.onload = function() {
        self.imgH = self.img.height;
        self.imgW = self.img.width;

        var scale = Math.min(self.winWidth / self.imgW, self.winHeight / self.imgH, 1);
        self.imgW = this.width * scale * 0.75;
        self.imgH = this.height * scale * 0.75;
    };

    this.coordinate = {
        x1: this.canvas.width * 0.43,
        y1: this.canvas.height * (1 - this.loading.total + 0.2),
        x2: this.canvas.width * 0.57,
        y2: this.canvas.height * (1 - this.loading.total - 0.2),
        x3: this.canvas.width,
        y3: this.canvas.height * (1 - this.loading.total)
    };

    this.init = function() {
        self.update();

        $(window).resize(function() {
            self.canvas.width = $(window).width();
            self.canvas.height = $(window).height();
        });
    };

    this.update = function() {

        this.coordinate.y1 = -self.winHeight * 0.4 + this.canvas.height * (1 - this.loading.total + 0.2);
        this.coordinate.y2 = -self.winHeight * 0.4 + this.canvas.height * (1 - this.loading.total - 0.2);
        this.coordinate.y3 = -self.winHeight * 0.4 + this.canvas.height * (1 - this.loading.total);

        this.ctx.save();
        var c = this.coordinate;
        this.draw(c.x1, c.y1, c.x2, c.y2, c.x3, c.y3);
        this.ctx.restore();

        window.requestAnimFrame(self.update.bind(self));
    };

    this.draw = function(x1, y1, x2, y2, x3, y3) {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.drawImage(self.imgBack,
            self.winWidth / 2 - self.imgW / 2,
            self.winHeight / 3 - self.imgH / 2,
            self.imgW,
            self.imgH);

        this.step += 3;

        this.angle = this.step * Math.PI / 180;
        this.deltaHeight = Math.sin(self.angle) * 0;
        this.deltaHeightRight = Math.cos(self.angle) * 0;

        this.ctx.moveTo(0, y3 + self.deltaHeightRight);
        this.ctx.bezierCurveTo(x1, y1 + self.deltaHeight, x2, y2 + self.deltaHeightRight, x3, y3 + self.deltaHeightRight);
        //this.ctx.bezierCurveTo(x1 / 4, y1 + self.deltaHeight, x2 / 4, y2 + self.deltaHeightRight, x3 / 2, y3 + self.deltaHeightRight);
        //this.ctx.bezierCurveTo(x1 * 0.75, y1 + self.deltaHeight, x2 * 0.75, y2 + self.deltaHeightRight, x3, y3 + self.deltaHeightRight);
        this.ctx.lineTo(self.canvas.width, self.canvas.height);
        this.ctx.lineTo(0, self.canvas.height);
        this.ctx.closePath();
        //this.ctx.strokeStyle = '#fff';
        this.ctx.stroke();
        this.ctx.clip();
        this.ctx.drawImage(self.img,
            self.winWidth / 2 - self.imgW / 2,
            self.winHeight / 3 - self.imgH / 2,
            self.imgW,
            self.imgH);
        this.ctx.restore();
    };
}