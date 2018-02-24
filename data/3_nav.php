 <?php
 header('Content-Type: text/html;charset=UTF-8');
 ?>
 <div class="main-nav w1211">
            <p class="flo-l main-nav-name text-l" id="main-nav-name">
                <a href="#">商品分类
                    <b class="down flo-r"></b></b>
                </a>
                <div class="main-nav-menu" id="main-nav-menu" >
                    <h4>鲜花用途</h4>
                    <ul class="cate-list list-inline">
                        <li><a href="/aiqingxianhua/" target="_blank">爱情鲜花</a></li>
                        <li><a href="/youqingxianhua/" target="_blank">友情鲜花</a></li>
                        <li><a href="/shengriliwu/" target="_blank">生日鲜花</a></li>
                        <li><a href="/songzhangbeixianhua/" target="_blank">问候长辈</a></li>
                    </ul>
                    <h4>鲜花花材</h4>
                    <ul class="cate-list list-inline">
                        <li><a href="/meigui/" target="_blank">玫瑰</a></li>
                        <li><a href="/kangnaixin/" target="_blank">康乃馨</a></li>
                        <li><a href="/yujinxiang/" target="_blank">郁金香</a></li>
                        <li><a href="/baihe/" target="_blank">百合</a></li>
                        <li><a href="/matilian/" target="_blank">马蹄莲</a></li>
                        <li><a href="/xiangrikui/" target="_blank">向日葵</a></li>
                    </ul>
                    <h4>多肉绿植</h4>
                    <ul class="cate-list list-inline">
                        <li><a href="/meigui/" target="_blank">红色</a></li>
                        				<li><a href="/kangnaixin/" target="_blank">白色</a></li>
                        				<li><a href="/yujinxiang/" target="_blank">粉色</a></li>
                        				<li><a href="/baihe/" target="_blank">蓝色</a></li>
                        				<li><a href="/matilian/" target="_blank">紫色</a></li>
                        				<li><a href="/xiangrikui/" target="_blank">香槟</a></li>
                    </ul>
                </div>
            </p>
            <ul class="main-nav-kinds flo-l">
                <li><a href="#">首页</a></li>
                <li><a href="#">缤纷鲜花</a></li>
                <li><a href="#">绿植多肉</a></li>
                <li><a href="#">花艺周边</a></li>
                <li><a href="#">花语大全</a></li>
            </ul>
        </div>
        <script>
            //显示分类
            $("#main-nav-name").mouseenter(function(){
                $("#main-nav-menu").slideDown(function() {
                $("#main-nav-menu").css("display","block");})
            });
            $(".main-nav").mouseleave(function(){
                $("#main-nav-menu").slideUp(function() {
                    $("#main-nav-menu").css("display","none");})
            });
        </script>