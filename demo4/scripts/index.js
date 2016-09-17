function drawWave(id, lineArr, waveHeight, controlHeight) {
    var canvas = document.getElementById(id),
        ctx = canvas.getContext('2d'),
        lines = lineArr,
        step = 0;
    canvas.width = $(canvas).width();
    canvas.height = $(canvas).height();

    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    }());

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        step++;
        for (var j = lines.length - 1; j >= 0; j--) {
            ctx.fillStyle = lines[j];
            var angle = (step + j * 135) * Math.PI / 180;
            var deltaHeight = Math.sin(angle) * waveHeight;
            var deltaHeightRight = Math.cos(angle) * waveHeight;
            ctx.beginPath();
            ctx.moveTo(0, canvas.height * controlHeight + deltaHeight);
            ctx.bezierCurveTo(canvas.width * 0.4, canvas.height * controlHeight + deltaHeight - controlHeight * 100, canvas.width * 0.6, canvas.height * controlHeight + deltaHeightRight, canvas.width, canvas.height * controlHeight + deltaHeightRight);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(0, canvas.height * controlHeight + deltaHeight);
            ctx.closePath();
            ctx.fill();
        }
        requestAnimFrame(loop);
    }
    loop();
}

function loadHeight(flag, step) {
    var progress, progressNum, opacity;
    step++;
    if (flag) {
        progressNum = 0.5 + 0.1 * step * step;

    } else {
        progressNum = 0.5 + 0.05 * step * step;
    }
    progressNum = (progressNum > 100) ? 100 : progressNum;
    opacity = (1 - progressNum < 0.6) ? 0.6 : (1 - progressNum);
    progress = Math.ceil(progressNum * 100);
    progressText = progress + '%';
    $('.number').text(progressText);
    $('#loading').css({
        opacity: opacity
    });
    $('.load-height').height(Math.ceil($(window).height() * progressNum));
    if (progress < 100) {
        setTimeout(function() {
            loadHeight(flag, step);
        }, 500);
    } else {
        $('#loading').addClass('hide');
        $('#page1').addClass('active');
        $('#page2').removeClass('hide');
        $('#page3').removeClass('hide');
        $('#page4').removeClass('hide');
        $('#wave-shake').css({
            opacity: 1
        });
    }
}

$(function() {
    var fingerStart = 0,
        fingerEnd = 0,
        rotate = 0,
        myTime2, originTime2, endTime2;

    drawWave('wave', ["rgba(105, 105, 106, 0.2)"], 20, 0.3);

    //预加载文件
    var manifest = ['images/origin/share.png', 'images/min/earth.png', 'images/min/boat.png', 'images/min/grass.png', 'images/min/introduce.png', 'images/min/grass-land.png', 'images/min/map-road.png', 'images/min/moon-ring.png', 'images/min/moon-ring-big.png', 'images/min/mountain.png', 'images/min/page2-bg.png', 'images/min/page2-content2.png', 'images/min/rudder2.png', 'images/min/sky.png'];
    var queue = new createjs.LoadQueue(true);
    // queue.installPlugin(createjs.Sound);
    // queue.on('fileload',handleFileLoad);
    queue.on("progress", handleFileProgress);
    queue.on("complete", loadComplete);
    var myTime = new Date(),
        orginTime = myTime.getTime(),
        endTime = 0;
    // setTimeout(function() {
    //     queue.loadManifest(manifest);
    // }, 2000);
    queue.loadManifest(manifest);

    // function handleFileLoad(e) {
    //     // alert(e.item.id);
    //     if(e.item.id === 'music') {
    //         var music = document.getElementById('music-play');
    //         music.className = 'play';
    //         music.play();
    //         $('#music-control').css({
    //             opacity: 1
    //         });
    //     }
    // }

    function handleFileProgress(e) {
        var progress = Math.ceil(queue.progress * 100 || 0),
            // progressNum = (progress / 100 > 0.15) ? (progress / 100) : 0.15,
            progressNum = progress / 100,
            opacity = (1 - progressNum < 0.6) ? 0.6 : (1 - progressNum);
        progress += '%';
        $('.number').text(progress);
        $('#loading').css({
            opacity: opacity
        });
        // console.log(progressNum);
        $('.load-height').height(Math.ceil($(window).height() * progressNum));
    }

    function loadComplete(e) {
        // myTime = new Date(),
        //     endTime = myTime.getTime();
        // if (endTime - orginTime > 3000) {
        //     setTimeout(function() {
        //         loadHeight(1, 0);
        //     }, 500);
        // } else {
        //     setTimeout(function() {
        //         loadHeight(0, 0);
        //     }, 500);
        // }
        $('#loading').addClass('hide');
        $('#page1').addClass('active');
        $('#page2').removeClass('hide');
        $('#page3').removeClass('hide');
        $('#page4').removeClass('hide');
        $('#wave-shake').css({
            opacity: 1
        });
    }

    drawWave('wave-shake', ['rgba(29, 64, 78, 0.2)', 'rgba(140,237,255,0.6)'], 10, 0.1);

    // document.addEventListener("WeixinJSBridgeReady", function() {
    //     var music = document.getElementById('music-play');
    //     music.className = 'play';
    //     music.play();
    // }, false);

    // $('#music-control').on('tap', function() {
    //     var music = document.getElementById('music-play');
    //     if (music.className === 'stop') {
    //         music.className = 'play';
    //         music.play();
    //     } else if (music.className === 'play') {
    //         music.className = 'stop';
    //         music.pause();
    //     }
    // });

    $('.page').on('touchstart', function(e) {
        e.preventDefault();
        var touchobj = e.touches[0];
        fingerStart = touchobj.screenY;
    }).on('touchend', function(e) {
        var touchobj = e.changedTouches[0],
            $this = $(this),
            pageId = parseInt($this.attr('page-id')) + 1,
            prePage = $($('.page')[pageId - 2]),
            nextPage = $($('.page')[pageId]);
        // console.log(pageId);
        fingerEnd = touchobj.screenY;
        // console.log($this, pageId);

        alert("fingerStart" + fingerStart + "End" + fingerEnd);

        if (fingerStart - fingerEnd > 30 && pageId !== 4) {
            if (pageId === 1) {
                $this.addClass('slide');
                if (!nextPage.hasClass('active')) {
                    setTimeout(function() {
                        nextPage.addClass('active');
                    }, 1500);
                    if (!parseInt($('#page2').attr('anim-finish'))) {
                        myTime2 = new Date();
                        originTime2 = myTime2.getTime();
                        console.log(myTime2, originTime2);
                    }
                    // setTimeout(function() {
                    //     console.log(nextPage);
                    //     nextPage.attr('slide-up', 1);
                    //     // alert($('#page2').attr('slide-up'));
                    // }, 18000);
                }
            } else if (pageId === 2) {
                myTime2 = new Date();
                endTime2 = myTime2.getTime();
                console.log(endTime2, originTime2, endTime2 - originTime2);
                if (endTime2 - originTime2 > 17600) {
                    // alert($('#page2').attr('slideUp'));
                    $this.addClass('slide').attr('anim-finish', 1);
                    nextPage.addClass('active');
                    setTimeout(function() {
                        $('.group1').addClass('current');
                    }, 500);
                }
            }
        } else if (fingerStart - fingerEnd < -30 && pageId !== 1) {
            if (pageId === 4) {
                prePage.removeClass('slide');
                $('.group6').addClass('current');
                // setTimeout(function() {
                //     $('#box6').attr('disabled', 0);
                // }, 2000);
            }
            if (pageId === 2) {
                prePage.removeClass('slide');
            }
        }
    });

    $('.rudder').on('tap', function(e) {
        var curPage = $($('.page')[0]),
            nextPage = $($('.page')[1]);
        curPage.addClass('slide');
        if (!parseInt($('#page2').attr('anim-finish')) && !$('#page2').hasClass('active')) {
            myTime2 = new Date();
            originTime2 = myTime2.getTime();
            console.log(myTime2, originTime2);
        }
        setTimeout(function() {
            nextPage.addClass('active');
        }, 1500);
    });

    //转动船舵
    $('#rudder-rotate').on('tap', rotateRudder);

    function rotateRudder(e) {
        $(e.target).off('tap');
        var $this = $(this),
            group = $('.group'),
            groupBox = $('.group-box'),
            currentGroup = Math.abs(rotate / 60),
            nextGroup = currentGroup + 1;
        // console.log($this);
        // console.log(rotate, currentGroup, nextGroup);
        rotate -= 60;
        if (rotate === -300) {
            // $('.rotate-rudder').addClass('small-rudder');
            $('.rudder-text').text('点击前进');
        }
        if (rotate === -360) {
            // $('.rotate-rudder').removeClass('small-rudder');
            // $('.rudder-text').text('点击查看各组介绍');
            rotate = -300;
            $(group[currentGroup]).removeClass('current');
            $('#page3').addClass('slide');
            setTimeout(function() {
                $('#page4').addClass('active');
            }, 1000);
            $this.on('tap', rotateRudder);
            return;
            // nextGroup = 0;
            // $(groupBox[currentGroup]).attr('disabled', 1);
            // $(groupBox[0]).removeClass('slide');
            // $(groupBox[1]).removeClass('slide');
            // $(groupBox[2]).removeClass('slide');
            // $(groupBox[3]).removeClass('slide');
            // $(groupBox[4]).removeClass('slide');
        } else {
            $(groupBox[currentGroup]).addClass('slide').attr('disabled', 1);
        }
        $this.css({
            transform: 'rotate(' + rotate + 'deg)',
            'webkit-transform': 'rotate(' + rotate + 'deg)'
        });
        $(group[currentGroup]).removeClass('current');
        $(groupBox[nextGroup]).attr('disabled', 1);
        setTimeout(function() {
            $(group[nextGroup]).addClass('current');
        }, 600);
        setTimeout(function() {
            $(groupBox[currentGroup]).attr('disabled', 0);
            $(groupBox[nextGroup]).attr('disabled', 0);
            $this.on('tap', rotateRudder);
        }, 2300);
    }

    function slideGroup(groupId, group) {
        var $this = $($('.group-box')[groupId - 1]),
            groupBox = $('.group-box'),
            currentGroup = groupId - 1,
            nextGroup = groupId;
        rotate -= 60;
        // if (currentGroup === 4) {
        //     $('.rotate-rudder').addClass('small-rudder');
        // }
        if (rotate === -360) {
            rotate = -300;
            $(group[currentGroup]).removeClass('current');
            $('#page3').addClass('slide');
            return;
        }
        $('#rudder-rotate').css({
            transform: 'rotate(' + rotate + 'deg)',
            'webkit-transform': 'rotate(' + rotate + 'deg)'
        });
        $(group[currentGroup]).removeClass('current');
        $(groupBox[currentGroup]).addClass('slide');
        setTimeout(function() {
            $(group[nextGroup]).addClass('current');
        }, 600);
        // console.log($this,$(group[nextGroup]));
        setTimeout(function() {
            $this.attr('disabled', 0);
            $(groupBox[nextGroup]).attr('disabled', 0);
        }, 2300);
    }

    function slideGroup2(groupId, group) {
        var $this = $($('.group-box')[groupId - 1]),
            groupBox = $('.group-box'),
            currentGroup = groupId - 1,
            nextGroup = groupId - 2;
        rotate += 60;
        $('#rudder-rotate').css({
            transform: 'rotate(' + rotate + 'deg)',
            'webkit-transform': 'rotate(' + rotate + 'deg)'
        });
        if (currentGroup === 5) {
            $('.rudder-text').text('点击前进');
        }
        $(group[currentGroup]).removeClass('current');
        $(groupBox[nextGroup]).removeClass('slide');
        setTimeout(function() {
            $(group[nextGroup]).addClass('current');
            // $this.attr('disabled', 0);
        }, 600);
        setTimeout(function() {
            $this.attr('disabled', 0);
            $(groupBox[nextGroup]).attr('disabled', 0);
        }, 2300);
    }

    $('.group-box').on('touchstart', function(e) {
        e.preventDefault();
        var touchobj = e.touches[0];
        fingerStart = touchobj.screenY;
    }).on('touchend', function(e) {
        var touchobj = e.changedTouches[0],
            group = $('.group'),
            $this = $(this),
            groupId = parseInt($this.attr('box-id')),
            nextGroup = $($('.group-box')[groupId]);
        fingerEnd = touchobj.screenY;
        if (parseInt($this.attr('disabled')) === 1) {
            return;
        }
        $this.attr('disabled', 1);
        nextGroup.attr('disabled', 1);
        // console.log(groupId);
        if (fingerStart - fingerEnd > 30) {
            if (groupId === 6) {
                $('#page3').addClass('slide');
                $(group[groupId - 1]).removeClass('current');
                setTimeout(function() {
                    $('#page4').addClass('active');
                }, 1200);
                setTimeout(function() {
                    $this.attr('disabled', 0);
                }, 2000);
            } else if (groupId === 5) {
                $('.rudder-text').text('点击前进');
                $this.addClass('slide');
                slideGroup(groupId, group);
            } else {
                slideGroup(groupId, group);
            }
        } else if (fingerStart - fingerEnd < -30) {
            if (groupId === 6) {
                slideGroup2(groupId, group);
                $('.rudder-text').text('点击查看各组介绍');
            } else if (groupId === 1) {
                $('#page2').removeClass('slide');
                $(group[groupId - 1]).removeClass('current');
                setTimeout(function() {
                    $this.attr('disabled', 0);
                }, 2000);
            } else {
                slideGroup2(groupId, group);
            }
        }
    });
    $('.join-button').on('tap', function() {
        window.location.href = 'http://cvs.bingyan.net';
    });
    $('.watch-video').on('tap', function() {
        window.location.href = 'http://v.qq.com/page/x/a/z/x01876ahjaz.html';
    });
});
