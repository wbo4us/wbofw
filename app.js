var thisAppName = 'wbofw',
cpRight = 'Copyright &copy; wboFW',
appVersion = 'DEVEL' /* 'DEVEL', 'PROD' */;

function loadCss(filename) {
	file = filename + '.css';
	var fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", file);
	document.getElementsByTagName("head")[0].appendChild(fileref)
}

function thisModuleClient(module) {
	return thisAppName + '.Modules.' + module + '.Client.' + module;
}

function thisModuleClass(module) {
	return thisAppName + '.Modules.' + module + '.Client.' + module;
}

Ext.require('Ext.Ajax', function () {
	Ext.Ajax.disableCaching = false;
});

Ext.Loader.setConfig({
	enabled : true
});

if (appVersion == 'DEVEL') {
	Ext.Loader.setPath({
		//'Ext' : './extjs/src',
		'wbofw.Modules' : './modules',
		'Ext.ux' : './ux'
		//'Ext.ux' : './ux'
	});
} else {
	Ext.Loader.setPath({
		'wbofw.Modules' : './modules-min',
		'Ext.ux' : './ux-min'
	});
}



var thisAppURL = 'service.php';

var thisApp;

Ext.require('Ext.ux.form.ClearButton', function () {
	loadCss('ux/form/css/ClearButton');
});

Ext.require('Ext.ux.statusbar.StatusBar', function () {
	loadCss('ux/statusbar/css/statusbar');
});


Ext.require('Ext.ux.form.FieldHelpText', function () {
loadCss('ux/form/css/FieldHelpText');
});


var thisAppStatusBar = Ext.create('Ext.ux.statusbar.StatusBar', {
		id : thisAppName + '-app-statusbar',
		defaultText : 'Ready',
		//height: 30,
		defaultIconCls : 'x-status-valid',
		text : 'Ready',
		//iconCls: 'x-status-valid',
		items : [
			'-', {
				xtype : 'label',
				html : thisAppTitle + ' | ' + cpRight,
			},
			'->',
			'-', {
				xtype : 'label',
				html : 'Selamat Datang <b> [ ' + UserData.nama + ' ] </b>',
			}, {
				xtype : 'tbspacer',
				width : 10
			}, {
				xtype : 'container',
				id : 'ajax_connect',
				width : 20,
				height : 16
			}, {
				xtype : 'tbspacer',
				width : 10
			},
			//Ext.create('Ext.toolbar.TextItem', {text: Ext.Date.format(new Date(), 'g:i:s A')})
		],
	});

//Ext.QuickTips.init();

Ext.application({
	name : thisAppName,
	requires : [
		//'Ext.ux.window.Notification',
		'Ext.ux.util',
		thisAppName + '.Modules.DataModule.Client.DataModule',
	],
	stBar : null,
	loadCss : function (filename) {
		file = 'modules/' + filename + '/Client/Resources/style.css';
		var fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", file);
		document.getElementsByTagName("head")[0].appendChild(fileref)
	},

	treeClik : function (record) {
		var pid = thisAppName + '-panel-utama-tab-' + record.get('id');
		var tab = Ext.getCmp(pid);
		var txt = record.get('text');
		var pnlUtama = Ext.getCmp(thisAppName + '-panel-utama');
		if (record.isLeaf()) {
			if (!tab) {
				//var mod = me.getModule(record.get('id'));
				var module = new Object();
				module.id = record.raw.id;
				module.module = record.raw.module;
				module.text = record.raw.text;
				if (record.raw.onview == 'window') {
					this.launchModuleWindow(UserData.user_id, module, {});
				} else {
					this.launchModule(UserData.user_id, module, {});
				}
				//me.launchModule('admin', record, {});
			} else {
				pnlUtama.setActiveTab(tab);
			}
		}
	},
	launchModule : function (user, module, param) {

		var me = this;
		Ext.getBody().mask('Sedang proses membuka module ' + module.text);
		Ext.Ajax.request({
			url : thisAppURL,
			method : 'GET',
			params : {
				Module : 'lib',
				option : 'module',
				action : 'checkOtoritas',
				mod : module.id,
				user : user,
			},
			success : function (result, request) {
				var resultJSON = new Ext.decode(result.responseText);
				if (resultJSON.success == true) {
					var pnlUtama = Ext.getCmp(thisAppName + '-panel-utama');
					me.loadCss(module.module);
					Ext.require(thisModuleClient(module.module), function (opt) {
						var pnl = Ext.create(thisModuleClass(module.module), {
								id : thisAppName + '-panel-utama-tab-' + module.id,
								icon: 'modules/'+ module.module +'/icon.png',
								title : module.text + '&nbsp;&nbsp;&nbsp;&nbsp',
								moduleId : module.module,
								closable : true,
							});
						pnlUtama.add(pnl);
						pnlUtama.setActiveTab(pnl);
						Ext.getBody().unmask();
						me.stBar.clearStatus({
							useDefaults : true
						});
					});
				} else {
					//Ext.Msg.alert('Status',resultJSON.msg);
					Ext.Msg.alert('Status', 'Maaf, anda tidak punya akses ke module ini!');
				}
			},
		});

	},

	launchModuleWindow : function (user, module, param) {

		var me = this;

		Ext.getBody().mask('Sedang proses membuka module ' + module.text);

		Ext.Ajax.request({
			url : thisAppURL,
			method : 'GET',
			params : {
				Module : 'lib',
				option : 'module',
				action : 'checkOtoritas',
				mod : module.id,
				user : user,
			},
			success : function (result, request) {
				var resultJSON = new Ext.decode(result.responseText);
				//console.log(resultJSON);
				if (resultJSON.success == true) {
					//var clientjs = 'simnangkis.Modules.' + module.module + '.Client.' + module.module;
					me.loadCss(module.module);
					Ext.require(thisModuleClient(module.module), function () {
						var pnl = Ext.create(thisModuleClass(module.module), {
								id : thisAppName + '-window' + module.id,
								icon: 'modules/'+ module.module +'/icon.png',
								title : module.text + '&nbsp;&nbsp;&nbsp;&nbsp',
								moduleId : module.module,
								closable : true,
								data : param,
							}).show();
						Ext.getBody().unmask();	
					});
				} else {
					Ext.Msg.alert('ALERT', 'Maaf, anda tidak punya akses ke module ini!');
				}
			},
		});

	},

	checkModuleOtoritas : function (user, module) {
		//console.log('checkModuleOtoritas');

		var allowed = false;
		Ext.Ajax.request({
			url : 'service.php',
			method : 'GET',
			params : {
				Module : 'lib',
				option : 'module',
				action : 'checkOtoritas',
				mod : module.raw.id,
				user : user,
			},
			success : function (result, request) {
				var resultJSON = new Ext.decode(result.responseText);
				if (resultJSON.success == true) {
					//console.log('allowed success : ' + allowed);
					allowed = true;
				}
			},
		});
		//console.log('allowed : ' + allowed);
		return allowed;
	},

	getModule : function (id) {
		var rec = menuDS.searchById(id);
		return rec;
	},

	getWinHeight : function () {
		return Ext.getCmp(thisAppName + '-main-viewport').getHeight();
	},

	getWinWidth : function () {
		return Ext.getCmp(thisAppName + '-main-viewport').getWidth();
	},

	createSettingButton : function () {
		//console.log(window.location);
		var me = this;
		var tmp_config = {};
		if (UserData.isAdmin == 1) {
			tmp_config = {
				xtype : 'splitbutton',
				text : 'Setting',
				//scale: 'large',
				//rowspan: 3,
				iconCls : 'icon-setting',
				//height: 25,
				iconAlign : 'left',
				//arrowAlign:'bottom',
				menu : [{
						text : 'Otoritas User',
						iconCls : 'icon-user-oto',
						hight : 25,
						handler : function () {
							var module = new Object();
							module.id = thisAppName + '-userotoritas';
							module.module = 'UserOtoritas';
							module.text = 'Otoritas User';
							me.launchModule(UserData.user_id, module, {});
						}
					}
				]
			}
		}

		return tmp_config;
	},

	cloneTree : function(aTree, store){
		// Dilanjutkan klo sudah selo ya...
		var dtree = aTree.cloneConfig({store: store})
	},
	
	filterTree: function ( aTree, aText ) {
		if( !aText ) {
		 return;
		}
		  // Regular expression to find a word in a text
		var lRegExp = new RegExp( Ext.escapeRe( aText ), 'i' );
		  // Recursive function to search inside the tree
		var lRecursiveFindChildren = function( aInputTree ) {
		 if( aInputTree.isLeaf( ) ) {
		  return lRegExp.test( aInputTree.data.text );
	  
		 // Remove this condition if you only want to search in the leafs
		 } else if( lRegExp.test( aInputTree.data.text ) ) {
		  return true;
		 }
		 else{
		  var lChildren = aInputTree.childNodes;
		  var lLength = lChildren.length - 1;
		  var lMatch = null;
		  var lCMatch = false;
		  for ( var i = lLength; i >= 0 ; i-- ) {
		   // Calling again the function to find if children match
		   lMatch = lRecursiveFindChildren( lChildren[ i ] );
		   if( !lMatch && lMatch != undefined ) {
			lChildren[ i ].remove( );
		   } else {
			lChildren[ i ].expand( );
			lCMatch = true;
		   }
		  }
		  return lCMatch;
		 }
		}
		lRecursiveFindChildren( aTree.getRootNode( ) );
	   },

	launch : function () {
		//Ext.QuickTips.init();
		var me = this;
		thisApp = this;
		//console.log(mapdss);
		me.stBar = thisAppStatusBar;

		Ext.Ajax.on({
			beforerequest : function () {
				Ext.getCmp('ajax_connect').addCls('ajax_connect');
				me.stBar.showBusy('Tunggu sebentar, sedang proses ajax ....');
				//me.stBar.showBusy();
			},
			requestcomplete : function () {
				Ext.getCmp('ajax_connect').removeCls('ajax_connect');
				me.stBar.clearStatus({
					useDefaults : true
				});
			}
		});
		var TreeMenuClone

		var menuTreeDS = Ext.create('Ext.data.TreeStore', {
				//autoLoad: true,
				proxy : {
					type : 'ajax',
					url : thisAppURL,
					method : 'GET',
					extraParams : {
						Module : 'lib',
						option : 'module',
						action : 'get_user_modules',
						_user_id : UserData.user_id,
						idtree : thisAppName + '-tree-menu'
					},
				},
				listeners: {
					load : function(store){
					}
				}
			});

		Ext.create('Ext.container.Viewport', {
			frame : true,
			id : thisAppName + '-main-viewport',
			//height : 585,
			padding : 3,
			//width : 860,
			layout : {
				type : 'border'
			},
			items : [{
					xtype : 'panel',
					width : 200,
					collapsible : true,
					title : 'Menu Utama',
					region : 'west',
					split : true,
					layout : 'fit',
					dockedItems : [{
							xtype : 'toolbar',
							dock : 'top',
							items : [{
									xtype : 'button',
									iconCls : 'icon-refresh-menu',
									qtip : 'Refresh Menu',
									handler : function () {
										menuTreeDS.reload();
									}
								}, '-',
								{
                                    xtype: 'textfield',
									id: me.id + '-searchMenu',
                                    width: 100,
                                    //fieldLabel: 'RW',
									name: 'searchMenu',
                                    //labelAlign: 'top',
									emptyText: 'Cari Menu',
									qtip: 'Pencarian menu, kriteria minimal 3 char',
									plugins: ['clearbutton'],
									listeners: {
										focus: function (view, record, item, index, even) {
												this.setValue("");
										},										
										change: function (obj, val) {
												var TreeMenu = Ext.getCmp(thisAppName + '-panel-menu');
												if (val.length > 2) {
														me.filterTree(TreeMenu, val);
												} 
											
										}
									}
								}, '-',
								'->', {
									xtype : 'button',
									iconCls : 'icon-open-module',
									qtip : 'Buka Modul',
									handler : function () {
										var pnlMenu = Ext.getCmp(thisAppName + '-panel-menu');
										if (pnlMenu.getSelectionModel().hasSelection()) {
											var records = pnlMenu.getSelectionModel().getSelection();
											var record = records[0];
											console.log(record.raw);
											var pid = thisAppName + '-panel-utama-tab-' + record.raw.id;
											var tab = Ext.getCmp(pid);
											var txt = record.raw.text;
											var pnlUtama = Ext.getCmp(thisAppName + '-panel-utama');
											if (record.isLeaf()) {
												if (!tab) {
													//var mod = me.getModule(record.get('id'));
													var module = new Object();
													module.id = record.raw.id;
													module.module = record.raw.module;
													module.text = record.raw.text;
													if (record.raw.onview == 'window') {
														me.launchModuleWindow(UserData.user_id, module, {});
													} else {
														me.launchModule(UserData.user_id, module, {});
													}
												} else {
													pnlUtama.setActiveTab(tab);
												}
											}
										} else {
											Ext.Msg.alert('Peringatan', 'Tidak ada modul yang dipilih. Pilih modul dulu!')
										}
									}
								}
							]
						}
					],
					items : [{
							xtype : 'treepanel',
							id : thisAppName + '-panel-menu',
							//height: 307,
							width : 180,
							frame : false,
							store : menuTreeDS, //menuDS,
							//title: 'Main Menu',
							flex : 3, 
							//cls: 'my-cool-tree',
							//singleExpand: true,
							rootVisible : false,
							bodyPadding : 8,
							border : false,

							bodyCls : 'tree-background',
							useArrows : true,
							viewConfig : {
								autoScroll : true,
								baseCls : 'navpanel'
							},
							listeners : {
								itemclick : function (view, record, item, index, e) {
									if (Ext.is.iOS || Ext.is.Android || Ext.is.Blackberry) {
										me.treeClik(record);
									}
								},
								itemdblclick : {
									fn : function (view, record, item, index, e) {
										me.treeClik(record);
									}
								}
							}
						},
						/*{
						xtype: 'panel',
						//height: 167,
						width: 155,
						title: 'Keterangan',
						autoScroll: true,
						//flex: 1,
						}
						 */
					]
				},
				{
					xtype : 'panel',
					height : 40,
					region : 'north',
					dockedItems : [{
							xtype : 'toolbar',
							autoHeight : true,
							dock : 'top',
							items : [
								{
									xtype : 'label',
									height : 25,
									//width: 200,
									padding : '0px 0px 0px 10px',
									style : '{font-size: 16px; font-weight: bold; margin: 0px; color: #555; text-shadow: 1px 1px 1px #fff;}',
									text : thisAppTitle,
								},
								'->',
								/* Jika admin maka buat splitbutton Setting */
								me.createSettingButton(), {
									xtype : 'tbspacer',
									width : 10,
								}, {
									xtype : 'splitbutton',
									text : 'Profile',
									//scale: 'large',
									//rowspan: 3,
									iconCls : 'icon-profile',
									//ui: 'red-button',
									//height: 25,
									iconAlign : 'left',
									//arrowAlign:'bottom',
									menu : [{
											text : 'User Info',
											iconCls : 'icon-user-info',
											height : 25,
											handler : function () {
												var module = {};
												module.id = thisAppName + '-logeduserinfo';
												module.text = 'Informasi User';
												module.module = 'LogedUserInfo';
												var param = new Object();
												param.data = UserData.user_id;
												param.status = 'edit';
												me.launchModuleWindow(UserData.user_id, module, param);
											}
										},  {
											text : 'Logout',
											iconCls : 'icon-logout',
											height : 25,
											handler : function () {
												window.location.href = 'logout.php';
											}
										},
									]
								}, {
									xtype : 'tbspacer',
									width : 15,
								},
							]
						}
					]

				}, {
					xtype : 'panel',
					height : 27,
					region : 'south',
					id : thisAppName + '-panel-status',
					split : false,
					tbar : me.stBar,
				}, {
					xtype : 'tabpanel',
					id : thisAppName + '-panel-utama',
					activeTab : 0,
					cls : thisAppName + '-panel-container',
					defaults : {
						autoScroll : true,
						bodyPadding : 5,
					},
					region : 'center',
					frame : true,
					items : [{
							xtype : 'panel',
							title : 'Halaman Utama',
							bodyCls : 'tab-mainpage',
							layout : {
								type : 'hbox',
							    align : 'stretch',
								pack  : 'start',
							},
							items : [{
								xtype : 'panel',
								id : 'xwall-mainpage',
								//bodyCls : 'back-mainpage',
								width : 400,
								//height : 250,
								margin: '10px',
								border: false,
								hidden: true,
								html:'asdasjdlakjsldj'
							}, {
								flex:1,
								hidden: false,
								border : false,
								html : '<b>Application Framework WBO</b> adalah sebuah framework '+
									'pengembangan aplikasi berbasis web dengan extjs versi 4.2 gpl (www.sencha.com)<br><br>'+	
									
									'Framework ini akan mempermudah seorang developer aplikasi untuk membuat '+
									'sebuah aplikasi berbasis web. Modul-modul yang dikembangkan dalam aplikasi'+
									'diletakan dalam folder <b>./modules</b>'+
									'<br><br>'+
								
									'silahkan kontak wbo4us@gmail.com jika anda ingin bertanya tentang framework aplikasi ini'
							}]
							// listeners : {
							//	boxready
								// resize : function( cmp, width, height, eOpts ) {
									// var left = width > 900 ? (width-900)/2 : 0,
										// top = height > 421 ? (height-421)/2 : 0;
									// Ext.getCmp('xwall-mainpage').setPosition(left,top);
								// }
							// }
						}
					]
				}
			] 
		});
		hideLayer();
		//debugger;
	},

});
