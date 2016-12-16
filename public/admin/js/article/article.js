$(function () {
	$('.i-checks').iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
    });
    $('.selectpicker').selectpicker({
  		liveSearch:true,
  		showSubtext:true
    });
    $('.tagsinput').tagsinput({
        tagClass: 'label label-primary',
        cancelConfirmKeysOnEmpty:true
    });
    layui.use('layedit', function(){
		var layedit = layui.layedit,$ = layui.jquery;

		//构建一个默认的编辑器
		var index = layedit.build('lead',{
			height: 180,
			tool: [
				'strong' //加粗
				,'italic' //斜体
				,'underline' //下划线
				,'del' //删除线

				,'|' //分割线

				,'left' //左对齐
				,'center' //居中对齐
				,'right' //右对齐
				,'link' //超链接
				,'unlink' //清除链接
				,'face' //表情
			]
		});
	  
  	});

  	var editor = editormd('editor',{
		width   : "100%",
		height  : 640,
		syncScrolling : "single",
		toolbarAutoFixed: true,
		gotoLine:false,
		emoji:false,
		autoFocus:false,
		saveHTMLToTextarea:true,
		path    : "/vendors/editor/lib/",
		imageUpload : true,
		imageUploadURL : '/admin/article/upload'
    });

    $('.col-sm-offset-2').on('click','.submit-article',function () {
    	$('form').submit();
    });
});