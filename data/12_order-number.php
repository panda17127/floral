<?php
	header("Content-Type:application;charset:utf-8");
    @$f = $_REQUEST['btnf'];		//产品编号
    
	$conn = mysqli_connect('127.0.0.1','root','','fl',3306);
	$sql = "SET NAMES UTF8";
	mysqli_query($conn,$sql);
	if(btnf){
	}
	$sql = "select cid,ctitle from fl_product ORDER BY cid DESC  LIMIT 0,8 ";
	$result = mysqli_query($conn,$sql);

	$output=[];
	#注意mysqli_fetch_assoc()
	while(($row=mysqli_fetch_assoc($result))!==null){
		$output[]=$row;
	}
	echo json_encode($output);
?>