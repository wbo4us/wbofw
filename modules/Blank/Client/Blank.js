Ext.define('mapdss.Modules.UserOtoritas.Client.UserOtoritas', {
    extend: 'Ext.panel.Panel',
	//requires: ['Ext.grid.*'],
    height: 337,
    width: 717,
    layout: {
        type: 'border'
    },
	title: '',
	gridOtoritas: null,
	pnlUser: null,
	moduleActionDS: null,
	userTreeDS: null,
	
	listeners: {
		boxready: function() {
			var me = this;
			me.gridOtoritas = Ext.getCmp(me.id+'-gridOtoritas');
			me.pnlUser = Ext.getCmp(me.id+'-pnlUser');
		},
	},
	

	wordWrapRenderer: function(value){
		return '<div style="white-space:normal !important;">' + value + '</div>';
	},	
	

    initComponent: function() {
        var me = this;
		var thisModuleId = this.moduleId;
		var selected_node;
		
		Ext.define('ModuleActionModel', {
			extend: 'Ext.data.Model',
			fields: [
				{ name: 'selected', type: 'integer' },
				{name: 'module_id', type:'string'}, 
				{name: 'name', type:'string'}, 
				{name: 'description', type:'string'}, 
				{name: 'menu', type:'string'}, 
				{name: 'iconcls', type:'string'}, 
				{name: 'icon', type:'string'}, 
				{name: 'action_id', type:'string'}, 
				{name: 'option', type:'string'}, 
				{name: 'action', type:'string'}, 
				{name: 'action_desc', type:'string'}, 
			]
		});

		me.userTreeDS = Ext.create('Ext.data.TreeStore', {
			autoLoad: true,
			proxy : {
				type: 'ajax',
				url: thisAppURL,
				method:'GET',
				extraParams: { 
					Module: thisModuleId,
					option: 'userotoritas',
					action:'listUserGroup',
					idtree: 'mapdss-tree-user'
				},
			},			
		});
		
		me.moduleActionDS = Ext.create('Ext.data.Store', {
			model: 'ModuleActionModel',
			autoLoad: true,
			groupField: 'name',
			//pageSize: 25,
			proxy : {
				type: 'ajax',
				url: thisAppURL,
				method:'GET',
				extraParams: { 
					Module: thisModuleId,
					option: 'userotoritas',
					action:'list',
				},	
				reader: {
					type : 'json',
					root : 'result',
					successProperty : 'success',
					totalProperty : 'total',
				}
			},	
			listeners: {
				beforeload : function(store){	
					if (me.pnlUser.getSelectionModel().hasSelection()) {
						var record = me.pnlUser.getSelectionModel().getSelection();
						//console.log(record);
						var tid = record[0].data.id.split('.');		
						store.proxy.extraParams.gid=tid[1];
						store.proxy.extraParams.uid=tid[2];					
					}
				}
			}
		});
		
        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'gridpanel',
					id: me.id+'-gridOtoritas',
                    title: 'Otoritas User',
                    region: 'center',
					store: me.moduleActionDS,
                    columns: [
						{header: 'module_id', dataIndex:'module_id', width:100, sortable: true, hidden: true}, 
						{header: 'name', dataIndex:'name', width:100, sortable: true, hidden: false}, 
						{header: 'description', dataIndex:'description', width:200, sortable: true, hidden: false, renderer: me.wordWrapRenderer}, 
						{header: 'menu', dataIndex:'menu', width:100, sortable: true, hidden: true}, 
						{header: 'iconcls', dataIndex:'iconcls', width:100, sortable: true, hidden: true}, 
						{header: 'icon', dataIndex:'icon', width:100, sortable: true, hidden: true}, 
						{header: 'action_id', dataIndex:'action_id', width:100, sortable: true, hidden: true}, 
						{header: 'option', dataIndex:'option', width:100, sortable: true, hidden: false}, 
						{header: 'action', dataIndex:'action', width:100, sortable: true, hidden: false}, 
						{header: 'action_desc', dataIndex:'action_desc', width:200, sortable: true, hidden: false, renderer: me.wordWrapRenderer}, 
                    ],
                    viewConfig: {
						forceFit: true,
						getRowClass : function (record, index) { 
							//alert(index);
							var data = record.data; 
							//alert(data.selected)
							switch (data.selected) { 
								case 1 : 
									//alert(data.action)
									me.gridOtoritas.getSelectionModel().select(index, true);
									//Ext.getCmp(thisModuleId+'-gridOtoritas').getSelectionModel().select(index, true);
									break; 
								case 0 : 
									me.gridOtoritas.getSelectionModel().deselect(index);
									//Ext.getCmp(thisModuleId+'-gridOtoritas').getSelectionModel().deselect(index);
									break; 
								default :
									me.gridOtoritas.getSelectionModel().deselect(index);
									//Ext.getCmp(thisModuleId+'-gridOtoritas').getSelectionModel().deselect(index);
						  }//end switch 

						}, 							
                    },
					features: [
						{
							ftype: 'grouping',
							hideGroupedHeader: true,
							groupHeaderTpl: 'Modul : {name} ({rows.length} action{[values.rows.length > 1 ? "s" : ""]})',
						},		
					],
					selModel: Ext.create('Ext.selection.CheckboxModel', {
						mode:'SIMPLE',
					}),					
                    dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'bottom',
							items: [					
								{
									xtype: 'button',
									iconCls: 'icon-save',
									text: 'Simpan Perubahan',
									handler: function() {
										var records = me.gridOtoritas.getSelectionModel().getSelection();
										var arr_data = [];
										var arr_module = [];
										//selected.push({tipe:selected_node});
										Ext.each(records, function (item) {
											var pdata = new Object();
											pdata.mode = selected_node;
											pdata.mode_id = 'admin';
											pdata.module_id = item.data.module_id;
											pdata.action_id = item.data.action_id;
											arr_data.push(pdata);
										});
										//console.log(Ext.JSON.encode(selected));
										Ext.Ajax.request({
											url: thisAppURL,
											method:'GET',
											params: {
												Module : thisModuleId,
												option : 'userotoritas',
												action : 'save',
												pdata : Ext.JSON.encode(arr_data),
											},
											success: function(response){
												var text = response.responseText;
												if (text!=""){
		
													var resp=Ext.decode(text);
													if(resp.success){	
														Ext.Msg.alert('User Otoritas', resp.msg)
													}
												}else{
													//Ext.MessageBox.hide();
													Ext.Msg.alert('User Otoritas', 'Terjadi kesalahan di server')
												}		        					
											}
										});
									},
								},
								{
									xtype: 'tbseparator'
								},					
								{
									xtype: 'pagingtoolbar',
									width: 360,
									displayInfo: true,
									store: me.moduleActionDS,
									dock: 'bottom'
								}
							]
						}
                    ]
                },
                {
                    xtype: 'container',
                    width: 150,
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    region: 'west',
                    split: true,
                    items: [
                        {
                            xtype: 'treepanel',
							id: me.id+'-pnlUser',
                            title: 'Daftar User',
                            flex: 3,
							store: me.userTreeDS,
							rootVisible: false,
							//collapsible: true,
							useArrows: true,
							viewConfig: {
								autoScroll: true
							},
							loadMask: {msg: 'Loading...'},	
							listeners: {
								beforeload: function(){
									this.setLoading('Loading data user-group', true);
								},								
								load: function(){
									this.setLoading(false);
								},										
								itemclick: {
									fn: function(view, record, item, index, event) {
										var tid = record.data.id.split('.');
										me.moduleActionDS.load();
										if (!record.data.leaf) {
											me.gridOtoritas.setTitle('Hak akses untuk group : '+record.data.text);
											selected_node = 'group';
										} else {
											me.gridOtoritas.setTitle('Hak akses untuk user : '+record.data.text);
											selected_node = 'user';
										}
									}
								}
							}
                        },
                        {
                            xtype: 'panel',
                            title: 'Keterangan',
                            flex: 1
                        }
                    ]
                }			
            ]
        });

        me.callParent(arguments);
    }
});