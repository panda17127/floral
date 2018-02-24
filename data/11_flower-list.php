<?php
/**
*向客户端分页返回商品详情，以JSON格式
*/
header('Content-Type: application/json;charset=UTF-8');

@$f = $_REQUEST['btnf'];//按钮名称
@$pid = $_REQUEST['pid'];//@表压制错误消息的显示
if(!$pid){		//客户端未提交pno
	$pid=1;
}else {			//客户端提交了pno
	$pid = intval($pid);  //把字符串解析为整数
}

////分页数据对象//////
$pager = [
	'recordCount'=>0,
	'pageSize'=>16,
	'pageCount'=>0,
	'pid'=>$pid,
	'data'=>[]
];



/**begin：构建分页数据**/
$conn = mysqli_connect('127.0.0.1', 'root', '', 'fl', 3306);

////SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

////SQL2: 查询满足条件的总记录数
$sql = "SELECT COUNT(*) FROM fl_product";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$pager['recordCount'] = intval($row['COUNT(*)']);
$pager['pageCount'] = ceil($pager['recordCount']/$pager['pageSize']);

////SQL3: 查询出当前页中指定的数据
$start = ($pager['pid']-1)*$pager['pageSize'];	//从哪一行开始读取
$count = $pager['pageSize']; //一次最多读取的行数
if(btnf==='num'){
	$sql = "SELECT pid,pname,ppic,pprice1,pprice2,pxiaoliang,pmiaoshu FROM fl_product order by pxiaoliang LIMIT $start,$count";
}else if(btnf==='price'){
	$sql = "SELECT pid,pname,ppic,pprice1,pprice2,pxiaoliang,pmiaoshu FROM fl_product order by pprice1 LIMIT $start,$count";
}else{
	$sql = "SELECT pid,pname,ppic,pprice1,pprice2,pxiaoliang,pmiaoshu FROM fl_product LIMIT $start,$count";
}
$result = mysqli_query($conn,$sql);
while(($p=mysqli_fetch_assoc($result))!==null){
	$pager['data'][] = $p;
}
/**end：构建分页数据**/


echo json_encode($pager);