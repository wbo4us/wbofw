
/* Status dalam pekerjaan */
Ext.define(thisModuleClass('DataModule') + '.StatusPekerjaan', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_status_dalam_pekerjaan', type:'int', sortType: 'asInt'}, 
		{name: 'status_dalam_pekerjaan', type:'string'}, 
		{name: 'status_dalam_pekerjaan_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_status_dalam_pekerjaan + '. ' + rec.data.status_dalam_pekerjaan;
			}
		},					
	]    
});

wbofw.DS.StatusPekerjaanDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.StatusPekerjaan',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listStatusPekerjaan',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
		}
	},	
	sorters: [{ property: 'id_status_dalam_pekerjaan',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data Status Pekerjaan ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});
