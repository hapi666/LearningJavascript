
	var $trs=$("#goods tr");
	var amount = 0;
      for(var i=0;i<$trs.length;i++){
    	var money = parseInt($trs.eq(i).children().eq(2).html());
    	amount += money;
    }
    $("totalMoney").html(amount);