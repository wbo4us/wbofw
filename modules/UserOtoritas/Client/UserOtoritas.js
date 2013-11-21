Ext.define(thisModuleClass('UserOtoritas'), {
    extend: 'Ext.panel.Panel',
	//requires: ['Ext.grid.*'],
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
			//me.userTreeDS.load();
			me.gridOtoritas = Ext.getCmp(me.id+'-gridOtoritas');
			me.pnlUser = Ext.getCmp(me.id+'-pnlUser');
		},
	},
	

	wordWrapRenderer: function(value){
		return '<div style="white-space:normal !important;">' + value + '</div>';
	},	
	

    initComponent: function() {
        var me = this;
		//console.log('Panel ID: ' + me.id);
		var thisModuleId = this.moduleId;
		var selected_node;
		var selected_id;
		
		Ext.define('ModuleActionModel', {
			extend: 'Ext.data.Model',
			fields: [
				{ name: 'selected', type: 'int' },
				{name: 'module_id', type:'string'}, 
				{name: 'module', type:'string'}, 
				{name: 'name', type:'string'}, 
				{name: 'description', type:'string'}, 
				{name: 'menu', type:'string'}, 
				{name: 'iconcls', type:'string'}, 
				{name: 'icon', type:'string'}, 
				{name: 'action_id', type:'string'}, 
				{name: 'option', type:'string'}, 
				{name: 'action', type:'string'}, 
				{name: 'action_desc', type:'string'}, 
				{name: 'group_id', type: 'string',
					convert: function(v, rec) {
						return rec.data.module + ' [' + rec.data.description + ']';
					}
				},
			]
		});

		me.userTreeDS = Ext.create('Ext.data.TreeStore', {
			//autoLoad: true,
			proxy : {
				type: 'ajax',
				url: thisAppURL,
				method:'GET',
				extraParams: { 
					Module: thisModuleId,
					option: 'userotoritas',
					action:'listUserGroup',
					idtree: thisAppName + '-tree-user'
				},			
			},
			listeners: {
				load : function(store, rec, success){
					//console.log(store);
					if (!success) {
						Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
					}				
				}
			}			
		});
		
		me.moduleActionDS = Ext.create('Ext.data.Store', {
			model: 'ModuleActionModel',
			autoLoad: true,
			groupField: 'group_id',
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
					messageProperty : 'msg',
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
				},
				load : function(store, rec, success){
					if (!success) {
						
						Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
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
						{header: 'Module', dataIndex:'module_id', width:100, sortable: true, hidden: true}, 
						{header: 'name', dataIndex:'name', width:100, sortable: true, hidden: true}, 
						//{header: 'description', dataIndex:'description', width:200, sortable: true, hidden: true, renderer: me.wordWrapRenderer}, 
						{header: 'menu', dataIndex:'menu', width:100, sortable: true, hidden: true}, 
						{header: 'iconcls', dataIndex:'iconcls', width:100, sortable: true, hidden: true}, 
						{header: 'icon', dataIndex:'icon', width:100, sortable: true, hidden: true}, 
						{header: 'action_id', dataIndex:'action_id', width:100, sortable: true, hidden: true}, 
						{header: 'Opsi', dataIndex:'option', width:100, sortable: true, hidden: false}, 
						{header: 'Aksi', dataIndex:'action', width:100, sortable: true, hidden: false}, 
						{header: 'Nama Aksi', dataIndex:'action_desc', width:400, sortable: true, hidden: false, renderer: me.wordWrapRenderer}, 
                    ],
                    viewConfig: {
						forceFit: true,
						getRowClass : function (record, index) { 
							//alert(index);
							var data = record.data; 
							var checked = (data.selected === 1) ? true : false;
							me.gridOtoritas.getSelectionModel().select(record, checked);
							console.log(me.id+'-gridOtoritas' + ' :: ' + index + ' ::: ' + data.selected + ' :: ' + checked);
							//Ext.getCmp(me.id+'-gridOtoritas').getSelectionModel().select(record, checked);
							/*
							
							switch (data.selected) { 
								case 1 : 
									//alert(data.action)
									me.gridOtoritas.getSelectionModel().select(index, true);
									console.log(index + ' ::: ' + data.selected)
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
						  */
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
											pdata.mode_id = selected_id;
											pdata.module_id = item.data.module_id;
											pdata.action_id = item.data.action_id;
											arr_data.push(pdata);
										});
										//console.log(arr_data)
										//console.log(Ext.JSON.encode(selected));
										Ext.Ajax.request({
											url: thisAppURL,
											method:'POST',
											params: {
												Module : thisModuleId,
												option : 'userotoritas',
												action : 'save',
												//pdata : Ext.JSON.encode(arr_data),
												//pdata : Ext.JSON.encode(arr_data),
											},
											jsonData : Ext.JSON.encode(arr_data), 
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
                    width: 200,
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
							frame: false, 
							width: 200,
                            flex: 4,
							store: me.userTreeDS,
							rootVisible: false, 
							//collapsible: true,
							//useArrows: true,
							viewConfig: {
								autoScroll: true
							},
							//loadMask: {msg: 'Loading...'},	
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
										if (!record.data.leaf) {
											me.gridOtoritas.setTitle('Hak akses untuk group : '+record.data.text);
											selected_node = 'group';
											selected_id = tid[1];
										} else {
											me.gridOtoritas.setTitle('Hak akses untuk user : '+record.data.text);
											selected_node = 'user';
											selected_id = tid[2];
										}
										me.moduleActionDS.load();
									}
								}
								
							},
							dockedItems: [
								{
									xtype: 'toolbar',
									height: 32,
									width: 350,
									dock: 'top',
									layout: {
										align: 'middle',
										type: 'hbox'
									},
									items: [
										{
											xtype: 'button',
											iconCls: 'ua-group',
											text: 'Group',
											menu: {
												xtype: 'menu',
												items: [
													{
														xtype: 'menuitem',
														iconCls: 'ua-group-add',
														text: 'Tambah'
													},
													{
														xtype: 'menuitem',
														iconCls: 'ua-group-edit',
														text: 'Edit'
													},
													{
														xtype: 'menuitem',
														iconCls: 'ua-group-del',
														text: 'Hapus'
													}
												]
											}
										},
										{
											xtype: 'tbseparator'
										},
										{
											xtype: 'button',
											iconCls: 'ua-user',
											text: 'User',
											menu: {
												xtype: 'menu',
												items: [
													{
														xtype: 'menuitem',
														iconCls: 'ua-user-add',
														text: 'Tambah',
														handler: function(){
															if (me.pnlUser.getSelectionModel().hasSelection()) {
																var record = me.pnlUser.getSelectionModel().getSelection();
																//console.log(record);
																var tid = record[0].data.id.split('.');
																if ((tid[1] != '') && (!tid[2])) {	
																	var module = new Object();
																	module.id = thisAppName+'-userinfo';
																	module.text = 'Informasi User';
																	module.module = 'UserInfo';
																	var param = new Object();
																	param.data = '';
																	param.status = 'add';
																	param.group_id = tid[1]
																	thisApp.launchModuleWindow(UserData.user_id,module,param);	
															} else {
																	Ext.Msg.alert('User Otoritas', 'Tidak ada group yang dipilih. Pilih group dulu!')
																}
															} else {
																Ext.Msg.alert('User Otoritas', 'Tidak ada group yang dipilih. Pilih group dulu!')
															}
														}															
													},
													{
														xtype: 'menuitem',
														iconCls: 'ua-user-edit',
														text: 'Edit',
														handler: function(){
															if (me.pnlUser.getSelectionModel().hasSelection()) {
																var record = me.pnlUser.getSelectionModel().getSelection();
																//console.log(record);
																var tid = record[0].data.id.split('.');
																if (tid[2] != 0) {	
																	var module = new Object();
																	module.id = thisAppName+'-userinfo';
																	module.text = 'Informasi User';
																	module.module = 'UserInfo';
																	var param = new Object();
																	param.data = tid[2];
																	param.status = 'edit';
																	thisApp.launchModuleWindow(UserData.user_id,module,param);	
																}
															} else {
																Ext.Msg.alert('User Otoritas', 'Tidak ada user yang dipilih. Pilih user dulu!')
															}
														}
													},
													{
														xtype: 'menuitem',
														iconCls: 'ua-user-del',
														text: 'Hapus'
													}
												]
											}
										},
										{
											xtype: 'tbseparator'
										},
										{
											xtype: 'button',
											iconCls:'icon-refresh',
											text: 'Refresh',
											handler: function() {
												me.userTreeDS.reload();
											}
										}
									]
								}
							]							
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