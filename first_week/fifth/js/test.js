function add_shoppingcart(btn){//将btn(dom)转换为jQuery对象
    //先获取商品名字和单价还有库存以备后面使用
    var $tds = $(btn).parent().siblings();
    //$tds.eq(0)是jQuery对象  $tds[0]是DOM对象
    var name = $tds.eq(0).html();//string
    var price = $tds.eq(1).html();//string
    var stock = $tds.eq(3).html();//string
    
    //查看库存是否还有<=0
    if(stock <= 0){
    	return;	
    }
    	
    //无论购物车中是否有该商品,库存都要-1
    $tds.eq(3).html(--stock);
    
    //在添加之前确定该商品在购物车中是否存在,若存在,则数量+1,若不存在则创建行
    var $trs = $("#goods>tr");
    for(var i=0;i<$trs.length;i++){
    	var $gtds = $trs.eq(i).children();
    	var gName = $gtds.eq(0).html();
    	if(name == gName){//若存在
    	   var num = parseInt($gtds.eq(2).children().eq(1).val());
    	   $gtds.eq(2).children().eq(1).val(++num);//数量+1
    	   //金额从新计算
    	   $gtds.eq(3).html(price*num);
    	   return;//后面代码不再执行
        }
    }
    //若不存在,创建后追加
    var li =
    	"<tr>"+
        "<td>"+name+"</td>"+
        "<td>"+price+"</td>"+
        "<td align='center'>"+
            "<input type='button' value='-' onclick='decrease(this);'/> "+
            "<input type='text' size='3' readonly value='1'/> "+
            "<input type='button' value='+' onclick='increase(this);'/>"+
        "</td>"+
        "<td>"+price+"</td>"+
        "<td align='center'>"+
            "<input type='button' value='x' onclick='del(this);'/>"+
        "</td>"+
        "</tr>";
    	//追加到#goods后面
    	$("#goods").append($(li));
    	
    	//总计功能
    	total();
}
      
      //辅助方法--单击购物车中的"+"  "-"  "x"按钮是找到相关商品所在td,以jQuery对象返回
function findStock(btn){
    var name = $(btn).parent().siblings().eq(0).html();//获取商品名字
    //注意table默认有行分组,若此处使用 $("#table1>tr:gt(0)")则找不到任何tr
    var $trs = $("#table1>tbody>tr:gt(0)");
    for(var i=0;i<$trs.length;i++){
      var fName = $trs.eq(i).children().eq(0).html();
      if(name == fName){//找到匹配的商品
    	return $trs.eq(i).children().eq(3);
	  }
    }
}
      
//增加"+"功能
function increase(btn){
    //获取该商品库存看是否<=0
    var $stock = findStock(btn);
    var stock = $stock.html();
    if(stock <= 0){
      return;
    }
    //库存-1  
    $stock.html(--stock);
    //购物车数据改变
    var $td = $(btn).prev();
    var num = parseInt($td.val());//number
    //num此时为number类型(在计算时会自动转换为number类型)
    $td.val(++num);
    //获取单价,再加计算前要先转换为number类型
    var price = parseInt($(btn).parent().prev().html());
    $(btn).parent().next().html(num*price);	
    //总计功能
    total();
}
      
//减少"-"功能
function decrease(btn){
    //该商品数量=1时候不能再减少
    var num = parseInt($(btn).next().val());
    if(num <= 1){
      return;	
    }
    var $stock = findStock(btn);
    //库存+1
    var stock = $stock.html();
    $stock.html(++stock);
    //商品数量-1
    $(btn).next().val(--num);
    //从新计算金额
    var price = parseInt($(btn).parent().prev().html());
    $(btn).parent().next().html(price*num);	
    //总计功能
    total();
}
//"x"删除按钮功能
function del(btn){
    //将商品数量归还库存
    var $stock = findStock(btn);
    var stock = parseInt($stock.html());
    var num = parseInt($(btn).parent().prev().prev().children().eq(1).val());
    $stock.html(num + stock);
    //清空改行商品列表
    $(btn).parent().parent().remove();
    //总计功能
    total();
}
//总计功能
function total(){
    //获取所有购物车中的trs
    var $trs = $("#goods tr");
    var amount = 0;
    for(var i=0;i<$trs.length;i++){
    	var money = parseInt($trs.eq(i).children().eq(3).html());
    	amount += money;
    }
    //写入总计栏
    $("#total").html(amount);
}