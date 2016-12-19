$(function () {
	new Clipboard('.copytext');
	$('.ibox-content').on('click','.deleteFile',function () {
		var _this = $(this);
		var imgName = _this.attr('data-name');
		$.ajax({
			url:'/admin/media/'+imgName,
			dataType:'json',
			success:function (response) {
				var message = response.status ? '删除成功':'删除失败';
				if (response.status) {
					_this.parentsUntil('div.ibox').parent().addClass('animated bounceOut').remove();
				}
				layer.msg(message);
			}
		});
	});
});