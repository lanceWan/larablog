var TableDatatablesAjax = function() {
  var datatableAjax = function(){

    var editor = new $.fn.dataTable.Editor( {
      "ajaxUrl": {
        "create": {
          method: 'POST',
          url: "/admin/link",
          data: function ( d ) {
            d._token = $('meta[name=csrf-token]').attr("content")
          }
        },
        "edit": {
          method: 'PUT',
          url: "/admin/link/_id_",
          data: function ( d ) {
            d._token = $('meta[name=csrf-token]').attr("content")
          }
        },
        "remove": {
          method: 'DELETE',
          url: "/admin/link/_id_",
          data: function ( d ) {
            d._token = $('meta[name=csrf-token]').attr("content")
          }
        }
      },
      table: ".dataTablesAjax",
      idSrc:  'encodeId',
      fields: [
        {
          "label": "ID",
          "name" : "encodeId",
        },
        {
          "label": "网站名称",
          "name" : "name",
        },
        { 
          "label": "网站链接",
          "name": "url",
        },{ 
          "label": "网站描述",
          "name": "description",
        }
      ]
    });

		var ajax_datatable = $('.dataTablesAjax').DataTable({
			"processing": true,
      "serverSide": true,
      "searching" : true,
      "searchDelay": 800,
      "search": {
        "regex": true
      },
      "ajax": {
        'url' : '/admin/link/ajaxIndex',
      },
      "pagingType": "full_numbers",
      "orderCellsTop": true,
      "dom" : '<"html5buttons"B>lTfgitp',
      "buttons": [
        { extend: "create", editor: editor },
        { extend: "edit",   editor: editor },
        { extend: "remove", editor: editor },
        {extend: 'csv',title: 'link'},
        {extend: 'pdf', title: 'link'},
        {extend: 'print',
         customize: function (win){
            $(win.document.body).addClass('white-bg');
            $(win.document.body).css('font-size', '10px');
            $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
          }
        }
      ],
      "columns": [
        {
        	"data": "encodeId",
        	"name" : "id",
      	},
        {
        	"data": "name",
        	"name" : "name",
        	"orderable" : false,
        },
        { 
          "data": "url",
          "name": "url",
          "orderable" : false,
        },{ 
          "data": "description",
          "name": "description",
          "orderable" : false,
        }
    	],
      select: {
        style:    'os',
        selector: 'td:first-child'
      },
      "language": {
        url: '/admin/i18n'
      }
    });

    $('.dataTablesAjax').on( 'click', 'tbody td:not(:first-child)', function (e) {
        editor.inline( this, {
            onBlur: 'submit'
        } );
    } );

  };
	return {
		init : datatableAjax
	}
}();
$(function () {
  TableDatatablesAjax.init();
});