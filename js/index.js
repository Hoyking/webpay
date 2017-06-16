$('#buyButton').click(function() {
	let total = $("input[name='wsb_invoice_item_quantity[0]'").val() * $("input[name='wsb_invoice_item_price[0]'").val() +
							Number($("input[name='wsb_tax']").val()) - Number($("input[name='wsb_discount_price']").val());
	$("input[name='wsb_total']").val(total);
	let sha1 = require('sha1');
	let str = $("input[name='wsb_seed']").val() + $("input[name='wsb_storeid']").val() + 
						$("input[name='wsb_order_num']").val() + $("input[name='wsb_test']").val() + 
						$("input[name='wsb_currency_id']").val() + total +
						'128';
	$("input[name='wsb_signature']").val(sha1(str));
});