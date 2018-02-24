<?php
header('Content-Type: text/html;charset=UTF-8');
?>
<div id="top_box">
		<a href="javascript:addFavorite();" class="flo-l star">收藏网址</a>

		<ul class="flo-r">
			<li id="welcome">
				您好，欢迎来到
				<a href="login.html" target="_blank">[登录]</a>
				<a href="register.html" target="_blank">[免费注册]</a>
			</li>
			<li>
				<b></b><!-- 边框 -->
				<a href="usercenter.html" target="_blank">我的订单</a>
			</li>
			<li class="vip">
				<b></b><!-- 边框 -->
				<a style="cursor:pointer;" id="cart">会员购物车</a>
			</li>
			<li class="service">
				<b></b><!-- 边框 -->
				<div class="service-menu flo-r">
					<a  href="#">客户服务</a>
					<!-- 弹出菜单 -->
					<ul>
						<li>
							<a href="#">购物流程</a>
						</li>
						<li>
							<a href="#">隐私条款</a>
						</li>
						<li>
							<a href="#">安全条款</a>
						</li>
						<li>
							<a href="#">投诉说明</a>
						</li>
						<li>
							<a href="#">安全支付</a>
						</li>
					</ul>
				</div>
			</li>
			<li>
				<b></b><!-- 边框 -->
				floral&nbsp;:&nbsp;让喜欢成为习惯
			</li>
		</ul>
	</div>
	<div class="main-top-box w1211 over-f">
		<!--logo-->
		<div class="flo-l">
			<a class="main-top-logo" href="index.html"></a>
		</div>

		<!--搜索框-->
		<div class="main-top-searchbox flo-l">
			<form action="/search" method="get">
				<input name="k" type="text" class="top-search-input flo-l" id="top-seach-input" onkeyup="value=value.replace(/[^\a-zA-Z0-9\u4E00-\u9FA5]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" />
				<button type="submit" class="top-search-btn flo-l">搜索</button>
			</form>
			<div class="search-space"></div>
			<!--热门搜索-->
			<ul class="hot-word over-f">
				<li><a target="_blank" href="#">红玫瑰</a><s class="line"></s></li>
				<li><a target="_blank" href="#">爱情鲜花</a><s class="line"></s></li>
				<li><a target="_blank" href="#">生日鲜花</a><s class="line"></s></li>
				<li><a target="_blank" href="#">婚庆鲜花</a></li>
			</ul>
		</div>

		<!--购物车-->
		<div class="main-top-cart flo-l">
			<a id="cart"  class="cart" style="cursor:pointer;">
				<div class="cart-img flo-l"><img src="img/cart.gif" alt=""/></div>
				<span class="cart-text">我的花园</span>
			</a>
		</div>
	</div>