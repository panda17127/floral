<?php
	header("Content-Type:application;charset:utf-8");

	$conn = mysqli_connect('127.0.0.1','root','','fl',3306);
	$sql = "SET NAMES UTF8";
	mysqli_query($conn,$sql);

	$sql = "select cid,ctitle from fl_commonsenses ORDER BY cid DESC  LIMIT 0,8 ";
	$result = mysqli_query($conn,$sql);
	$output=[];
	#注意mysqli_fetch_assoc()
	while(($row=mysqli_fetch_assoc($result))!==null){
		$output[]=$row;
	}
	echo json_encode($output);
?>