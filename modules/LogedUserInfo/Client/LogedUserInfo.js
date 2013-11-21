Ext.define(thisModuleClass('LogedUserInfo'), {
    extend: 'Ext.window.Window',
    height: 485,
    width: 658,
    autoScroll: true,
	modal: true,
	data: null,
	gid: null,
	gname: null,
	//title: (this.data==0) ? 'Informasi User [Tambah]' : 'Informasi User [Edit]',

    initComponent: function() {
        var me = this;
		var thisModuleId = this.moduleId;
		var	txtUserID, txtUserName, txtPassword,txtPassword2,txtEmail,
			txtNama, txtLevelID, txtLevelName,
			chkActive, txtParam01, txtParam02,
			txtParam03, txtParam04, txtParam05,
			txtParam06, txtParam07,
			txtParam08, txtParam09, txtParam10;
		//var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
		
		Ext.define('UserWindow.UserModel', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'id', type:'int'}, 
				{name: 'user_id', type:'string'}, 
				{name: 'username', type:'string'}, 
				{name: 'password', type:'string'}, 
				{name: 'nama', type:'string'}, 
				{name: 'email', type:'string'}, 
				{name: 'level_id', type:'int'}, 
				{name: 'level_name', type:'string'}, 
				{name: 'wallpaper', type:'string'}, 
				{name: 'theme', type:'string'}, 
				{name: 'wpstretch', type:'int'}, 
				{name: 'active', type:'int'}, 
				{name: 'param01', type:'string'}, 
				{name: 'param02', type:'string'}, 
				{name: 'param03', type:'string'}, 
				{name: 'param04', type:'string'}, 
				{name: 'param05', type:'string'}, 
				{name: 'param06', type:'string'}, 
				{name: 'param07', type:'string'}, 
				{name: 'param08', type:'string'}, 
				{name: 'param09', type:'string'}, 
				{name: 'param10', type:'string'}, 			]
		});	
		
		var UserDS = Ext.create('Ext.data.Store', {
			model: 'UserWindow.UserModel',
			autoLoad: false,
			proxy : {
				type: 'ajax',
				url: thisAppURL,
				method:'GET',
				extraParams: { 
					Module: thisModuleId,
					option: 'logeduserinfo',
					action:'getLoged'
				},	
				reader: {
					type : 'json',
					root : 'result',
					successProperty : 'success'
				}
			},	
			listeners: {
				load : function (store, rec, success) {
					if (!success) {
						Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
					} else { 				
					//console.log(store);
						if (store.getTotalCount() > 0 ) {
							txtUserID.setValue(store.data.items[0].data.user_id);
							txtUserName.setValue(store.data.items[0].data.username);
							//txtPassword.setValue(store.data.items[0].data.username_map);
							//txtPassword2.setValue(store.data.items[0].data.username_map);
							txtEmail.setValue(store.data.items[0].data.email);
							txtNama.setValue(store.data.items[0].data.nama);
							txtLevelID.setValue(store.data.items[0].data.level_id);
							txtLevelName.setValue(store.data.items[0].data.level_name);
							//chkActive.setValue((store.data.items[0].data.active==1)?'true':'false');
							txtParam01.setValue(store.data.items[0].data.param01);
							//txtParam02.setValue(store.data.items[0].data.param02);
							//txtParam03.setValue(store.data.items[0].data.param03);
							//txtParam04.setValue(store.data.items[0].data.param04);
							//txtParam05.setValue(store.data.items[0].data.param05);
							//txtParam06.setValue(store.data.items[0].data.param06);
							txtParam07.setValue(store.data.items[0].data.param07);
							txtParam08.setValue(store.data.items[0].data.param08);
							txtParam09.setValue(store.data.items[0].data.param09);
							txtParam10.setValue(store.data.items[0].data.param10);	
						}
					}
				}
			}
		});
		
        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'panel',
                    //height: 185,
					autoHeight: true,
                    width: 665,
                    layout: {
                        type: 'column'
                    },
                    bodyPadding: 5,
                    title: '',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'container',
                            //height: 195,
							autoHeight: true,
                            width: 340,
                            defaults: {
                                anchor: '95%',
                                
                            },
                            layout: {
                                type: 'anchor'
                            },
                            columnWidth: 0.5,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    height: 90,
                                    width: 319,
                                    defaults: {
                                        anchor: '100%',
										plugins: ['clearbutton']
                                    },
                                    title: 'User Info',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: me.id+'txtUserID',
                                            fieldLabel: 'User ID',
											disabled: (this.data.status=='edit')?true:false,
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: me.id+'txtUserName',
                                            fieldLabel: 'Username',
											msgTarget: 'side',
											allowBlank:false,
											//afterLabelTextTpl: required,
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    height: 115,
                                    width: 323,
									fieldDefaults: {
										msgTarget: 'side',
										autoFitErrors: false
									},									
                                    defaults: {
                                        anchor: '100%',
                                       
                                    },
                                    title: 'Password [Kosongi untuk mengabaikan]',
									
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: me.id+'txtPassword',
                                            inputType: 'password',
                                            fieldLabel: 'Password',
											plugins: ['clearbutton']
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: me.id+'txtPassword2',
                                            inputType: 'password',
                                            fieldLabel: 'Retype',
											plugins: ['clearbutton']
                                        },
                                        {
                                            xtype: 'button',
											iconCls: 'icon-change-password',
                                            text: 'Update Password',
											handler: function() {
												var pwd1 = txtPassword.getValue();
												var pwd2 = txtPassword2.getValue();
												if (pwd1!=pwd2) {
													Ext.Msg.alert('Peringantan','Password yang dituliskan harus sama');
												} else {
													Ext.Ajax.request({
														url: thisAppURL,
														method:'GET',
														params: {
															Module : thisModuleId,
															option : 'logeduserinfo',
															action : 'savePassword',
															state : me.data.status,
															pgid: me.data.group_id,
															 _user_id : txtUserID.getValue(),
															 _password :txtPassword.getValue(),									
														},
														success: function(response){
															var text = response.responseText;
															console.log(text);
															if (text!=""){
																//Ext.MessageBox.hide();
																var resp=Ext.decode(text);
																if(resp.success){	
																	Ext.Msg.alert('User Otoritas', resp.msg)
																} else {
																	Ext.Msg.alert('Error::User Otoritas', resp.msg)
																}
															}else{
																//Ext.MessageBox.hide();
																Ext.Msg.alert('User Otoritas', 'Terjadi kesalahan di server kami')
															}		        					
														}
													});		
												}	
											} 
                                        }										
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 185,
                            width: 338,
                            columnWidth: 0.5,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    height: 150,
                                    width: 318,
                                    title: 'Extra Info',
									defaults: {
										plugins: ['clearbutton']
									},
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: me.id+'txtEmail',
                                            fieldLabel: 'Email',
                                            anchor: '100%'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: me.id+'txtNama',
                                            fieldLabel: 'Nama',
                                            anchor: '100%'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: me.id+'txtLevelID',
                                            fieldLabel: 'Level ID',
                                            anchor: '100%',
											disabled: true,
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: me.id+'txtLevelName',
                                            fieldLabel: 'Level Name',
                                            anchor: '100%',
											disabled: true,
                                        }
                                    ]
                                },
								/*
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chkActive',
                                    fieldLabel: 'Label',
                                    hideLabel: true,
                                    boxLabel: 'Active'
                                }
								*/
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 180,
                    width: 674,
                    layout: {
                        type: 'fit'
                    },
                    bodyPadding: 5,
                    collapsible: true,
                    title: 'Paramater Tambahan',
                    titleCollapse: true,
                    dock: 'top',
                    items: [
                        {
                            xtype: 'form',
                            frame: true,
                            height: 155,
                            width: 333,
                            defaults: {
                                anchor: '95%',
                                labelAlign: 'right',
                                plugins: ['clearbutton']
                            },
                            columnWidth: 0.5,
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: me.id+'txtParam01',
                                    fieldLabel: 'Footer',
                                    anchor: '95%'
                                },
                                {
                                    xtype: 'textfield',
                                    id: me.id+'txtParam02',
                                    fieldLabel: 'Param 02',
									hidden: true,
                                    anchor: '95%'
                                },
                                {
                                    xtype: 'textfield',
                                    id: me.id+'txtParam03',
                                    fieldLabel: 'Param 03',
									hidden: true,
                                    anchor: '95%'
                                },
                                {
                                    xtype: 'textfield',
                                    id: me.id+'txtParam04',
                                    fieldLabel: 'Param 04',
									hidden: true,
                                    anchor: '95%'
                                },
                                {
                                    xtype: 'textfield',
                                    id: me.id+'txtParam05',
                                    fieldLabel: 'Param 05',
									hidden: true,
                                    anchor: '95%'
                                },
                                {
                                    xtype: 'textfield',
                                    id: me.id+'txtParam06',
                                    fieldLabel: 'Param 06',
									hidden: true,
                                    anchor: '95%'
                                },							
                                {
                                    xtype: 'textfield',
                                    id: me.id+'txtParam08',
                                    fieldLabel: 'Responden',
									hidden: true,
                                    anchor: '95%'
                                },
                                {
                                    xtype: 'textfield',
                                    id: me.id+'txtParam09',
                                    fieldLabel: 'Pendata',
									hidden: true,
                                    anchor: '95%'
                                },
                                {
                                    xtype: 'textfield',
                                    id: me.id+'txtParam10',
                                    fieldLabel: 'Pemeriksa',
									hidden: true,
                                    anchor: '95%'
                                },	
                                {
                                    xtype: 'textfield',
                                    id: me.id+'txtParam07',
                                    fieldLabel: 'Entri Cepat',
									hidden: true,
                                    anchor: '95%'
                                }								
                            ]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    height: 40,
                    width: 666,
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'icon-save',
                            text: 'Simpan',
							handler: function() {
								//thisAppStatusBar.showBusy();
								// lakukan extract data disini
								Ext.Ajax.request({
									url: thisAppURL,
									method:'GET',
									params: {
										Module : thisModuleId,
										option : 'logeduserinfo',
										action : 'save',
										state : me.data.status,
										pgid: me.data.group_id,
										 _user_id : txtUserID.getValue(),
										 _username : txtUserName.getValue(),
										 //_password :txtPassword.getValue(),
										 _level_id : txtLevelID.getValue(),
										 _level_name : txtLevelName.getValue(),
										 _wallpaper : null,
										 _theme : null,
										 _wpstretch : null,
										 _email : txtEmail.getValue(),
										 _nama : txtNama.getValue(),
										 //_active : chkActive.getValue()?1:0,
										 _param01 : txtParam01.getValue(),
										 _param02 : txtParam02.getValue(),
										 _param03 : txtParam03.getValue(),
										 _param04 : txtParam04.getValue(),
										 _param05 : txtParam05.getValue(),
										 _param06 : txtParam06.getValue(),
										 _param07 : txtParam07.getValue(),
										 _param08 : txtParam08.getValue(),
										 _param09 : txtParam09.getValue(),
										 _param10 : txtParam10.getValue(),										
									},
									success: function(response){
										var text = response.responseText;
										console.log(text);
										if (text!=""){
											//Ext.MessageBox.hide();
											var resp=Ext.decode(text);
											if(resp.success){	
												Ext.Msg.alert('User Otoritas', resp.msg)
											} else {
												Ext.Msg.alert('Error::User Otoritas', resp.msg)
											}
										}else{
											//Ext.MessageBox.hide();
											Ext.Msg.alert('User Otoritas', 'Terjadi kesalahan di server kami')
										}		        					
									}
								});													
							}
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-cross',
                            text: 'Batal dan Tutup',
							handler: function(){
								me.close();
							}
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
		

		
		me.on('show', function(){
			//alert(this.gid);
			if (this.data.status == 'add'){
				me.setTitle('Informasi User [Tambah] :: Untuk Group '+this.data.group_id);
			} else {
				me.setTitle('Informasi User [Edit] :: Untuk User '+ this.data.data);
			}		
			txtUserID=Ext.getCmp(me.id+'txtUserID');
			txtUserName=Ext.getCmp(me.id+'txtUserName');
			txtPassword=Ext.getCmp(me.id+'txtPassword');
			txtPassword2=Ext.getCmp(me.id+'txtPassword2');
			txtEmail=Ext.getCmp(me.id+'txtEmail');
			txtNama=Ext.getCmp(me.id+'txtNama');
			txtLevelID=Ext.getCmp(me.id+'txtLevelID');
			txtLevelName=Ext.getCmp(me.id+'txtLevelName');
			//chkActive=Ext.getCmp('chkActive');
			txtParam01=Ext.getCmp(me.id+'txtParam01');
			txtParam02=Ext.getCmp(me.id+'txtParam02');
			txtParam03=Ext.getCmp(me.id+'txtParam03');
			txtParam04=Ext.getCmp(me.id+'txtParam04');
			txtParam05=Ext.getCmp(me.id+'txtParam05');
			txtParam06=Ext.getCmp(me.id+'txtParam06');
			txtParam07=Ext.getCmp(me.id+'txtParam07');
			txtParam08=Ext.getCmp(me.id+'txtParam08');
			txtParam09=Ext.getCmp(me.id+'txtParam09');
			txtParam10=Ext.getCmp(me.id+'txtParam10');
			//alert(this.data);
			if (this.data !=0) {
				UserDS.load({
					params:{
						_user_id: this.data.data,
					}
				});
			}
		});
    }
});