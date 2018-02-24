/**
 * Created by GXiong on 2017/5/7.
 */
/***1 异步加载页头和页尾***/
$(function(){
    $('#top').load('data/1_header.php',function(){
        var s = location.search; //当前地址栏中URL中的查询字符串部分
        var loginName = s.substring(s.indexOf('=')+1);
        console.log(loginName);
        if(loginName!==''){
            $('#welcome').html('欢迎回来：'+loginName);
            $(document.body).on('click','#cart',function(){
                location.href="shopcart.html?loginName="+loginName;
            });
        }
    });
    $('#nav').load('data/3_nav.php');
    $('#footer').load('data/2_footer.php');
});

$('#order').on('click','a',function(e){
    e.preventDefault();
    $(this).addClass("hover").parent().siblings().children(".hover").removeClass("hover");
});
$('#order>li').on('click',function(e){
    console.log("a");
    e.preventDefault();
    $('.order-sign').css('background-image','img/order-up.png');
});
//function goTop(){
//    a1.onclick=function(e){
//        alert(document.body.scrollTop);
//        var timer=setInterval(function(){
//            var top=document.body.scrollTop;
//            if(top<=10){
//                clearInterval(timer);
//                timer=null;
//            }
//            top-=100;
//            document.body.scrollTop=top;
//
//        },3);
//    }
//}

/***2 点击登录按钮，异步验证用户名和密码 ****/
var loginName = null; //当前登录的用户名


/***3 产品列表页加载完成，异步请求第1页记录 ****/
$(function(){
    loadProduct(1);
    loadHotsale();
})
//为分页条中超链接代理事件监听
$('#pager').on('click','a', function(e){
    e.preventDefault();
    var timer=setInterval(function(){
        var top=document.body.scrollTop;
        if(top<=10){
            clearInterval(timer);
            timer=null;
        }
        top-=100;
        document.body.scrollTop=top;
    },3);
    var pid = $(this).attr('href'); //目标页号
    loadProduct(pid);
})
///异步分页加载商品列表
function loadProduct(pid){
    //$.get  $.getJSON  $.ajax
    //$.ajax( {
    //    type: 'GET',   //POST、PUT、DELETE、HEAD
    //    url: 'x.php',
    //    data: {uname:'tom',upwd:'123'},  //k=v&k=v,
    //    beforeSend: fn,  	//请求发送之前的回调
    //    success: fn,		//响应成功的回调
    //    error: fn,			//响应失败的回调
    //    complete: fn		//响应完成的回调(无论成功还是失败)
    //} );

    $.getJSON('data/11_flower-list.php',{'pid':pid,'f':btnf},function(pager){
        //console.log('开始处理响应数据-产品列表');
        //console.log(pager);
        //1 构建产品列表的内容
        var html = '';
        $.each(pager.data, function(i,p){
            var description = p.pmiaoshu.slice(0,15);
            html += `
        <li class="fs-list">
                                <div class="li-div-box">
                                    <div class="li-div-border">
                                        <a href="#"><img src="${p.ppic}" width="216" alt=""/></a>
                                        <div class="fs-content">
                                            <p class="over-f fs-content-name">
                                                <a style="font-size: 14px;" href="#">${p.pname}</a>
                                                <span class="fs-price flo-r">
                                                    <span class="price-sale">&yen;<span style="font-size:20px;">${p.pprice1}</span></span>
                                                    <s>&yen;${p.pprice2}</s>
                                                </span>
                                            </p>
                                            <p title="${p.pmiaoshu}" class="over-f" style="width: 200px; height:16px;">${description}...</p>
                                            <div class="salenum over-f">
                                                <span>${p.pxiaoliang}已购买</span>
                                                <a class="join-cart flo-r">
                                                    加入购物车
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
            `;
        });
        $('#product-list').html(html);
        //2 构建分页条中的内容
        var pagerHtml = '';
        //console.log(pagerHtml);
        if(pager.pid-2>0){
            pagerHtml += `<li class="big-pager-list"><a href="${pager.pid-2} ">${pager.pid-2}</a></li> `;
        }
        if(pager.pid-1>0){
            pagerHtml += `<li class="big-pager-list"><a href="${pager.pid-1}" >${pager.pid-1}</a></li> `;
        }
        pagerHtml += `<li class="show big-pager-list"><a href="#">${pager.pid}</a></li> `;
        if(pager.pid+1<=pager.pageCount){
            pagerHtml += `<li class="big-pager-list"><a href="${pager.pid+1}">${pager.pid+1}</a></li> `;
        }
        if(pager.pid+2<=pager.pageCount){
            pagerHtml += `<li class="big-pager-list"><a href="${pager.pid+2}">${pager.pid+2}</a></li> `;
        }
        //console.log(pagerHtml);
        $('#pager').html(pagerHtml);
    })
}
///热销商品
function loadHotsale(){
    $.getJSON('data/4_hot-sale.php',function(data){
        var html = '';
        $.each(data,function(i,p){
            var description = p.pmiaoshu.slice(0,24);
            html += `
        <div class="hotsale-list text-c">
                                <a href="#"><img src="${p.ppic}" alt="${description}" width="180"/></a>
                                <div class="hot-title text-c">
                                    <a href="#">${p.pkind}/${p.pname}-${description}</a>
                                </div>
                                <div class="hot-price text-c">
                                    <span class="price-sign">&yen;</span>
                                    <span class="price-num">${p.pprice1}</span>
                                </div>
                            </div>
      `;
        });
        $('#hotsale').html(html);
    })
}

function loadOrdernumber(){
    $.getJSON('data/12_order-number.php',function(data){
        var html = '';
        $.each(data,function(i,p){
            var description = p.pmiaoshu.slice(0,24);
            html += `
        <div class="hotsale-list text-c">
                                <a href="#"><img src="${p.ppic}" alt="${description}" width="180"/></a>
                                <div class="hot-title text-c">
                                    <a href="#">${p.pkind}/${p.pname}-${description}</a>
                                </div>
                                <div class="hot-price text-c">
                                    <span class="price-sign">&yen;</span>
                                    <span class="price-num">${p.pprice1}</span>
                                </div>
                            </div>
      `;
        });
        $('#hotsale').html(html);
    })
}


