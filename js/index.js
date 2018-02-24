/**
 * Created by GXiong on 2017/5/4.
 */

/***1 异步加载页头和页尾***/
$(function(){
    $('#top').load('data/1_header.php',function(){
        var s = location.search; //当前地址栏中URL中的查询字符串部分
        var loginName = s.substring(s.indexOf('=')+1);
        if(loginName){
            $('#welcome').html('欢迎回来：'+loginName);
            $(document.body).on('click','#cart',function(){
                location.href="shopcart.html?loginName="+loginName;
                console.log("a1");
            });
        }else{
            $(document.body).on('click','#cart',function(){
                location.href="login.html";
                console.log("a2");
            });
        }
    });
    $('#footer').load('data/2_footer.php');
});



function addFavorite() {
    var a = window.location, t = document.title, i = navigator.userAgent.toLowerCase();
    if (i.indexOf("360se") > -1)
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    else if (i.indexOf("msie 8") > -1)
        window.external.AddToFavoritesBar(a, t);
    else if (document.all)
        try {
        window.external.addFavorite(a, t)
    } catch (a) {
        alert("您的浏览器不支持,请按 Ctrl+D 手动收藏!")
    }
    else window.sidebar ?window.sidebar.addPanel(t, a, "") : alert("您的浏览器不支持,请按 Ctrl+D 手动收藏!")
}


//轮播
/*广告图片数组*/
var imgs=[
    {"i":0,"img":"img/banner/banner1.jpg"},
    {"i":1,"img":"img/banner/banner2.jpg"},
    {"i":2,"img":"img/banner/banner3.jpg"}
];


/********************广告轮播*************************/
var adv={
    LIWIDTH:0,//用来保存每个li的宽度
    DISTANCE:0,//保存总距离
    DURATION:1000,//保存总时间
    STEPS:200,//保存总步数
    interval:0,//保存步频
    step:0,//保存步长
    moved:0,//保存已经移动的位移
    timer:null,//保存定时器序号
    WAIT:5000,//自动轮播之间的等待时间
    canAuto:true,//标示是否可以启动自动轮播
    init:function(){
        //获得id为slider的div的宽，保存在LIWIDTH中
        this.LIWIDTH=parseFloat($('#slider').width());
        //计算interval：DURATION/STEPS
        this.interval=this.DURATION/this.STEPS;
        //更新页面
        this.updateView();

        //为id为indexs的ul绑定鼠标进入事件为move
        $("#indexs").on("mouseover",function(e){
            var target=e.target;
            if(target.nodeName=="LI"){
                var n=target.innerHTML-$("#indexs .hover").html();
                this.move(n);
            }
        }.bind(this));

        //调用autoMove，启动自动轮播
        this.autoMove();
        //为id为slider绑定鼠标进入事件
        $("#slider").on("mouseover",function(){
            //将canAuto为false
            this.canAuto=false;
        }.bind(this));
        //为id为slider绑定鼠标移除事件
        $("#slider").on("mouseout",function(){
            //将canAuto为true
            this.canAuto=true;
        }.bind(this));
    },
    updateView:function(){//将数组内容更新到页面
        for(var i=0,htmlImgs="",htmlIdxs="";i<imgs.length;i++)
        {
            htmlImgs+="<li><img src='"+imgs[i].img+"'></li>"
            htmlIdxs+="<li>"+(i+1)+"</li>"
        }
        //$("#imgs").innerHTML=htmlImgs;
        $("#imgs").html(htmlImgs);

        //console.log(this.LIWIDTH);
        //console.log(this.LIWIDTH*imgs.length);
        var imgsWidth=this.LIWIDTH*imgs.length+"px";
        $("#imgs").css("width",imgsWidth);
        $("#indexs").html(htmlIdxs);
        $("#indexs li").eq(imgs[0].i).addClass("hover");
    },
    move:function(n){//启动一次移动
        //停止动画，清除timer---防止动画叠加
        clearInterval(this.timer);
        this.timer=null;
        if(n<0){//如果右移
            imgs=imgs.splice(imgs.length+n,-n).concat(imgs);
            this.updateView();
            var left=$("#imgs").position().left;
            var start=left-this.LIWIDTH*(-n);
            $("#imgs").css("left",start+"px");
            var end=0;
        }else{//如果左移
            //获得id为imgs当前的left，保存在变量start中
            //用LIWIDTH*n,保存在变量end中
            var start=$("#imgs").position().left;
            var end=-this.LIWIDTH*n;
        }
        //求DISTANCE：-(end-start)
        //求step：DISTANCE/STEPS
        //启动周期性定时器：moveStep,间隔interval，序号保存在timer中
        this.DISTANCE=-(end-start);
        this.step=this.DISTANCE/this.STEPS;
        this.timer = setInterval(this.moveStep.bind(this,n),this.interval);
    },
    moveStep:function(n){//移动一步
        //获得id为imgs的ul的left
        //设置id为imgs的ul的left为left-step
        //moved+1
        //如果moved==STEPS
        //停止定时器，清除timer，moved归0
        var left=$("#imgs").position().left-this.step+"px";
        $("#imgs").css("left",left);
        this.moved++;
        if(this.moved==this.STEPS){
            clearInterval(this.timer);
            this.timer=null;
            this.moved=0;
            if(n>0){//如果左移
                //删除数组开头的n个元素，拼接到结尾
                imgs=imgs.concat(imgs.splice(0,n));
                this.updateView();//更新界面:
            }
            //清除id为imgs的left
            $("#imgs").css("left","");
            //调用自动轮播autoMove
            this.autoMove();
        }
    },
    autoMove:function(){//启动自动轮播
        //启动一次性定时器，任务：move，参数为1，等待时间为WAIT
        this.timer=setTimeout(
            function(){
                if(this.canAuto){
                    this.move(1);
                }else{
                    this.autoMove();
                }
            }.bind(this),this.WAIT
        );
    }
}
adv.init();

//显示热销产品

$(function(){
    loadHotsale();
    loadProductshow1();
    loadProductshow2();
    loadProductshow3();
    loadProductshow4();
    loadProductnews();
    loadProductsenses();
});


function loadHotsale(){
    $.getJSON('data/4_hot-sale.php',function(data){
        var html = '';
        $.each(data,function(i,p){
            var description = p.pmiaoshu.slice(0,15);
            html += `
        <li class="hot-sale-list mr-15">
						<div class="hs-zhezhao-box">
							<b class="hs-zhezhao"></b>
							<div class="hs-zhezhao-content text-c">
								<h3><a href="#">${p.pname}</a></h3>
								<p title="${p.pmiaoshu}">${description}</p>
								<div class="hot-sale-pri">
									<span class="original-price">
										<b style="font-size:16px;">¥</b>
										<b style="font-size:18px;">${p.pprice1}</b>
									</span>
										<s>¥&nbsp;${p.pprice2}</s>
								</div>
							</div>
						</div>
						<a class="hot-sale-pic" href="#"><img src="${p.ppic}"></a>
					</li>
      `;
        });
        $('#hot-sale').html(html);
    })
}
//加载右边的图片
function loadProductshow1(){
    $.getJSON('data/5_show-right.php',function(data){
        var html = '';
        $.each(data,function(i,p){
            var description = p.pmiaoshu.slice(0,20);
            html += `
        <a href="productdetail.html" target="_blank" class="product-show-list">
									<div class="product-show-jieshao">
										<div class="ps-jieshao-title1">${p.pname}</div>
										<div title="${p.pmiaoshu}" class="ps-jieshao-title2 text-mark-color1">${description}</div>
									</div>
									<div class="product-show-pic">
										<img title="${p.pname}" src="${p.ppic}"/>
									</div>
								</a>
      `;
        });
        $('#love').html(html);
    })
}
function loadProductshow2(){
    $.getJSON('data/6_show-right2.php',function(data){
        var html = '';
        $.each(data,function(i,p){
            var description = p.pmiaoshu.slice(0,20);
            html += `
        <a href="productdetail.html" target="_blank" class="product-show-list">
									<div class="product-show-jieshao">
										<div class="ps-jieshao-title1">${p.pname}</div>
										<div title="${p.pmiaoshu}" class="ps-jieshao-title2 text-mark-color1">${description}</div>
									</div>
									<div class="product-show-pic">
										<img title="${p.pname}" src="${p.ppic}"/>
									</div>
								</a>
      `;
        });
        $('#birthday').html(html);
    })
}
function loadProductshow3(){
    $.getJSON('data/7_show-right3.php',function(data){
        var html = '';
        $.each(data,function(i,p){
            var description = p.pmiaoshu.slice(0,12);
            html += `
        <a href="productdetail.html" target="_blank" class="product-show-list">
									<div class="product-show-jieshao">
										<div class="ps-jieshao-title1">${p.pname}</div>
										<div title="${p.pmiaoshu}" class="ps-jieshao-title2 text-mark-color1">${description}</div>
									</div>
									<div class="product-show-pic">
										<img title="${p.pname}" src="${p.ppic}"/>
									</div>
								</a>
      `;
        });
        $('#green').html(html);
    })
}
function loadProductshow4(){
    $.getJSON('data/8_show-right4.php',function(data){
        var html = '';
        $.each(data,function(i,p){
            var description = p.pmiaoshu.slice(0,12);
            html += `
        <a href="productdetail.html" target="_blank" class="product-show-list">
									<div class="product-show-jieshao">
										<div class="ps-jieshao-title1">${p.pname}</div>
										<div title="${p.pmiaoshu}" class="ps-jieshao-title2 text-mark-color1">${description}</div>
									</div>
									<div class="product-show-pic">
										<img title="${p.pname}" src="${p.ppic}"/>
									</div>
								</a>
      `;
        });
        $('#fleshiness').html(html);
    })
}

function loadProductsenses(){
    $.getJSON('data/9_news.php',function(data){
        var html = '';
        $.each(data,function(i,p){
            html += `
        <li class="sense-content-list">
								<div class="sense-pic flo-l">
									<a href="commonsenses.html"><img width=70 height="45" src="${p.npic}"></a>
								</div>
								<div class="sense-content flo-r">
									<a class="sense-content1" href="commonsenses.html">${p.ntitle}</a>
								</div>
							</li>
      `;
        });
        $('#news').html(html);
    })
}

function loadProductnews(){
    $.getJSON('data/10_senses.php',function(data){
        var html = '';
        $.each(data,function(i,p){
            html += `
               <p class="news-list pl-15"><a href="#">*&nbsp;&nbsp;${p.ctitle}</a></p>
            `;
        });
        $('#senses').html(html);
    });
}