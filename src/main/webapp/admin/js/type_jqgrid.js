jQuery(function ($) {
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";

    jQuery(grid_selector).jqGrid({
        url: 'api/admin/type',
        datatype: "json",
        colNames: [' ', 'ID', '分类名称', '别名', '标记'],
        colModel: [
            {
                name: 'myac', index: '', width: 80, fixed: true, sortable: false, resize: false,
                formatter: 'actions',
                formatoptions: {
                    keys: true,
                    delOptions: {
                        recreateForm: true,
                        beforeShowForm: beforeDeleteCallback,
                        url: "api/admin/type/delete"
                    }
                }
            },
            {name: 'id', index: 'id', width: 60, sorttype: "int", editable: false},
            {name: 'typeName', index: 'typeName', width: 150, sortable: false, editable: true},
            {name: 'alias', index: 'alias', width: 150, editable: true, editoptions: {size: "20", maxlength: "30"}},
            {
                name: 'remark',
                index: 'remark',
                width: 150,
                editable: true,
                edittype: "textarea",
                editoptions: {rows: "3", cols: "20"}
            }

        ],
        editurl: "api/admin/type/update",
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: pager_selector,
        altRows: true,

        multiselect: false,
        multiboxonly: true,

        loadComplete: function () {
            var table = this;
            setTimeout(function () {
                updatePagerIcons(table);
                enableTooltips(table);
            }, 0);
        },
        caption: _res['admin.type.manage'],
        height: 421,

        autowidth: true

    });

    //navButtons
    jQuery(grid_selector).jqGrid('navGrid', pager_selector,
        { 	//navbar options
            edit: true,
            editicon: 'icon-pencil blue',
            add: true,
            addicon: 'icon-plus-sign purple',
            del: false,
            delicon: 'icon-trash red',
            search: false,
            searchicon: 'icon-search orange',
            refresh: true,
            refreshicon: 'icon-refresh green',
            view: false,
            viewicon: 'icon-zoom-in grey'
        },
        {
            //edit record form
            //closeAfterEdit: true,
            recreateForm: true,
            beforeShowForm: function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                style_edit_form(form);
            },
            url: "api/admin/type/update"
        },
        {
            //new record form
            closeAfterAdd: true,
            recreateForm: true,
            viewPagerButtons: false,
            beforeShowForm: function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                style_edit_form(form);
            },
            url: "api/admin/type/add"
        },
        {},
        {},
        {}
    );
});