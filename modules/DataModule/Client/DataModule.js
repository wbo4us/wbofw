

Ext.define(thisModuleClass('DataModule') + '.Periode', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_periode', type:'string'}, 
		{name: 'keterangan', type:'string'}, 
		{name: 'is_current', type:'int'}, 	
	]    
});

Ext.define(thisModuleClass('DataModule') + '.Propinsi', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_prop', type:'string'}, 
		{name: 'propinsi', type:'string'}, 
		{name: 'propinsi_display', type:'string',
			convert : function(v, rec) {                        
				return '' + rec.data.id_prop + '. ' + rec.data.propinsi;
			}
		},		
	]    
});

Ext.define(thisModuleClass('DataModule') + '.Kabupaten', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_prop', type:'string'}, 
		{name: 'id_kab', type:'string'}, 
		{name: 'kabupaten', type:'string'}, 
		{name: 'kabupaten_display', type:'string',
			convert : function(v, rec) {                        
				return '' + rec.data.id_kab + '. ' + rec.data.kabupaten;
			}
		},					
	]    
});

Ext.define(thisModuleClass('DataModule') + '.Kecamatan', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_prop + '.' + rec.data.id_kab + '.' + rec.data.id_kec;
			}
		},		
		{name: 'parent_id', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_prop + '.' + rec.data.id_kab;
			}
		},		
		{name: 'id_prop', type:'string'}, 
		{name: 'id_kab', type:'string'}, 
		{name: 'id_kec', type:'string'}, 
		{name: 'kecamatan', type:'string'}, 
		{name: 'kecamatan_display', type:'string',
			convert : function(v, rec) {                        
				return '' + rec.data.id_kec + '. ' + rec.data.kecamatan;
			}
		},					
	]    
});

Ext.define(thisModuleClass('DataModule') + '.Kelurahan', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_prop + '.' + rec.data.id_kab + '.' + rec.data.id_kec + '.' + rec.data.id_kel;
			}
		},		
		{name: 'parent_id', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_prop + '.' + rec.data.id_kab + '.' + rec.data.id_kec;
			}
		},		
		{name: 'id_prop', type:'string'}, 
		{name: 'id_kab', type:'string'}, 
		{name: 'id_kec', type:'string'}, 
		{name: 'id_kel', type:'string'}, 
		{name: 'kelurahan', type:'string'}, 
		{name: 'kode_pos', type:'string'}, 
		{name: 'kelurahan_display', type:'string',
			convert : function(v, rec) {                        
				return '' + rec.data.id_kel + '. ' + rec.data.kelurahan;
			}
		},					
	]    
});

Ext.define(thisModuleClass('DataModule') + '.Dusun', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_prop + '.' + rec.data.id_kab + '.' + rec.data.id_kec + '.' + rec.data.id_kel + '.' + rec.data.id_dus;
			}
		},		
		{name: 'parent_id', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_prop + '.' + rec.data.id_kab + '.' + rec.data.id_kec + '.' + rec.data.id_kel;
			}
		},		
		{name: 'id_prop', type:'string'}, 
		{name: 'id_kab', type:'string'}, 
		{name: 'id_kec', type:'string'}, 
		{name: 'id_kel', type:'string'}, 
		{name: 'id_dus', type:'string', sortType: 'asInt'}, 
		{name: 'dusun', type:'string'}, 
		{name: 'dusun_display', type:'string',
			convert : function(v, rec) {                        
				return '' + rec.data.id_dus + '. ' + rec.data.dusun;
			}
		},					
	]
});

Ext.define(thisModuleClass('DataModule') + '.IKK', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_miskin', type:'string'}, 
		{name: 'miskin', type:'string'}, 	
	]    
});

/* Create Data Store */
Ext.ns('bumil.DS');
bumil.DS.PeriodeDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Periode',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listPeriode',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
		}
	},	
	sorters: [{ property: 'id_periode',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data Periode ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

bumil.DS.PropinsiDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Propinsi',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listPropinsi',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
		}
	},	
	sorters: [{ property: 'id_prop',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data Propinsi ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

bumil.DS.KabupatenDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Kabupaten',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listKabupaten',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
		}
	},	
	sorters: [{ property: 'id',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data Kabupaten ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

bumil.DS.KecamatanDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Kecamatan',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listKecamatan',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kec',
		}
	},	
	sorters: [{ property: 'id',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data Kecamatan ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

bumil.DS.KelurahanDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Kelurahan',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listKelurahan',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	sorters: [{ property: 'id',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data Desa/Kelurahan ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

bumil.DS.DusunDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Dusun',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listDusun',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	sorters: [{ property: 'id_dus',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data Dusun ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

bumil.DS.IKKDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.IKK',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listIKK',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data IKK ......"); 
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	



/* Create Class for ComboBox */
Ext.define(thisAppName+'.cboPeriode', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.cboperiode',
	//allowBlank: false,
	fieldLabel: 'Periode',
	queryMode: 'local',
	displayField: 'id_periode',
	valueField: 'id_periode',	
	typeAhead: true,
	forceSelection:true,
	triggerAction: 'all',
	minChars:1,
	listConfig: {
		loadingText: 'Load data...',
		emptyText: 'Pilih Periode....'
	},	
	value: UserData.periode || Ext.Date.format(new Date(), 'Y'),

	plugins: ['clearbutton'],		
	
	initComponent    : function() {
		this.callParent();
	}
});

Ext.define(thisAppName+'.cboPropinsi', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.cbopropinsi',
	//allowBlank: false,
	fieldLabel: 'Propinsi',
	queryMode: 'local',
	displayField: 'propinsi_display',
	valueField: 'id_prop',	
	typeAhead: true,
	forceSelection:true,
	triggerAction: 'all',
	minChars:1,
	listConfig: {
		loadingText: 'Load data...',
		emptyText: 'Pilih Propinsi....'
	},	
	value: '34',
	plugins: ['clearbutton'],		
	
	initComponent    : function() {
		this.callParent();
	}
});

Ext.define(thisAppName+'.cboKabupaten', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.cbokabupaten',
	//allowBlank: false,
	triggerAction: 'all',
	fieldLabel: 'Kabupaten/Kota',
	queryMode: 'local',
	displayField: 'kabupaten_display',
	valueField: 'id_kab',	
	typeAhead: true,
	forceSelection:true,
	minChars:1,
	listConfig: {
		loadingText: 'Load data...',
		emptyText: 'Pilih Kabupaten....'
	},		
	plugins: ['clearbutton'],
	value: '04',
	initComponent    : function() {
		this.callParent();
	}
});

Ext.define(thisAppName+'.cboKecamatan', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.cbokecamatan',
	//allowBlank: false,
	triggerAction: 'all',
	fieldLabel: 'Kecamatan',
	queryMode: 'local',
	displayField: 'kecamatan_display',
	valueField: 'id_kec',	
	typeAhead: true,
	forceSelection:true,
	minChars:1,
	listConfig: {
		loadingText: 'Load data...',
		emptyText: 'Pilih Kecamatan....'
	},		
	plugins: ['clearbutton'],
	initComponent    : function() {
		this.callParent();
	}
});

Ext.define(thisAppName+'.cboKelurahan', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.cbokelurahan',
	//allowBlank: false,
	triggerAction: 'all',
	fieldLabel: 'Desa',
	queryMode: 'local',
	displayField: 'kelurahan_display',
	valueField: 'id_kel',	
	typeAhead: true,
	forceSelection:true,
	minChars:1,
	listConfig: {
		loadingText: 'Load data...',
		emptyText: 'Pilih Kelurahan....'
	},		
	plugins: ['clearbutton'],
	initComponent    : function() {
		this.callParent();
	}
});

Ext.define(thisAppName+'.cboDusun', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.cbodusun',
	//allowBlank: false,
	triggerAction: 'all',
	fieldLabel: 'Dusun',
	queryMode: 'local',
	displayField: 'dusun_display',
	valueField: 'id_dus',	
	typeAhead: true,
	forceSelection:true,
	minChars:1,
	listConfig: {
		loadingText: 'Load data...',
		emptyText: 'Pilih Dusun....'
	},		
	plugins: ['clearbutton'],
	initComponent    : function() {
		this.callParent();
	}
});

Ext.define(thisModuleClass('DataModule') + '.Indikator', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_indikator', type:'string'}, 
		{name: 'id_periode', type:'string'}, 
		{name: 'nama_field', type:'string'}, 
		{name: 'no_baris', type:'int'}, 
		{name: 'indikator', type:'string'}, 
		{name: 'pilihan', type:'string'}, 
		{name: 'pilihan_display', type:'string'}, 
		{name: 'bobot_indikator', type:'string'}, 
		{name: 'pilihan_miskin', type:'int'}, 
		{name: 'nama_store', type:'string'}, 
		{name: 'level_muatan', type:'string'}, 
		{name: 'is_active', type:'int'}, 
		{name: 'is_used', type:'int'}, 
		{name: 'is_indikator', type:'int'}, 				
	]    
});

bumil.DS.IndikatorDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Indikator',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listIndikator',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data Indikator ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

Ext.define(thisModuleClass('DataModule') + '.Kelamin', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_kelamin', type:'string'}, 
		{name: 'kelamin', type:'string'},
		{name: 'kelamin_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_kelamin + '. ' + rec.data.kelamin;
			}
		},					
		
	]    
});

bumil.DS.KelaminDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Kelamin',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listKelamin',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data jenis kelamin ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

Ext.define(thisModuleClass('DataModule') + '.HubKeluarga', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_hub_keluarga', type:'string'}, 
		{name: 'hub_keluarga', type:'string'}, 	
		{name: 'hub_keluarga_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_hub_keluarga + '. ' + rec.data.hub_keluarga;
			}
		},					
	]    
});

bumil.DS.HubKeluargaDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.HubKeluarga',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listHubKeluarga',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	sorters: [{ property: 'id_hub_keluarga',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data hubungan keluarga ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

Ext.define(thisModuleClass('DataModule') + '.Pendidikan', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_pendidikan', type:'string', sortType: 'asInt'}, 
		{name: 'pendidikan', type:'string'}, 
		{name: 'pendidikan_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_pendidikan + '. ' + rec.data.pendidikan;
			}
		},					
	]    
});

bumil.DS.PendidikanDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Pendidikan',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listPendidikan',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	sorters: [{ property: 'id_pendidikan',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data pendidikan ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

Ext.define(thisModuleClass('DataModule') + '.StatusPendidikan', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_status_pendidikan', type:'string'}, 
		{name: 'status_pendidikan', type:'string'}, 
		{name: 'status_pendidikan_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_status_pendidikan + '. ' + rec.data.status_pendidikan;
			}
		},					
	]    
});

bumil.DS.StatusPendidikanDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.StatusPendidikan',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listStatusPendidikan',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	sorters: [{ property: 'id_status_pendidikan',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data status pendidikan ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	


Ext.define(thisModuleClass('DataModule') + '.Agama', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_agama', type:'int'}, 
		{name: 'agama', type:'string'}, 
		{name: 'agama_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_agama + '. ' + rec.data.agama;
			}
		},					
	]    
});

bumil.DS.AgamaDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Agama',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listAgama',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	sorters: [{ property: 'id_agama',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data agama ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

Ext.define(thisModuleClass('DataModule') + '.Nikah', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_nikah', type:'string'}, 
		{name: 'status_nikah', type:'string'}, 
		{name: 'status_nikah_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_nikah + '. ' + rec.data.status_nikah;
			}
		},					
	]    
});

bumil.DS.NikahDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Nikah',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listNikah',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	sorters: [{ property: 'id_nikah',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data status kawin ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

Ext.define(thisModuleClass('DataModule') + '.Difabel', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_difable', type:'string', sortType: 'asInt'}, 
		{name: 'difable', type:'string'}, 
		{name: 'difable_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_difable + '. ' + rec.data.difable;
			}
		},					
	]    
});

bumil.DS.DifabelDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Difabel',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listDifabel',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	sorters: [{ property: 'id_difable',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data jenis kecacatan ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

Ext.define(thisModuleClass('DataModule') + '.GolDarah', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_gol_darah', type:'string'}, 
		{name: 'gol_darah', type:'string'}, 
		{name: 'gol_darah_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_gol_darah + '. ' + rec.data.gol_darah;
			}
		},					
	]    
});

bumil.DS.GolDarahDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.GolDarah',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listGolDarah',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	sorters: [{ property: 'id_gol_darah',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data golongan darah ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

Ext.define(thisModuleClass('DataModule') + '.Pekerjaan', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_pekerjaan', type:'int'}, //, sortType: 'asInt'}, 
		{name: 'pekerjaan', type:'string'}, 
		{name: 'pekerjaan_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_pekerjaan + '. ' + rec.data.pekerjaan;
			}
		},					
	]    
});

bumil.DS.PekerjaanDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.Pekerjaan',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listPekerjaan',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	sorters: [{ property: 'id_pekerjaan',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data pekerjaan ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});	

Ext.define(thisModuleClass('DataModule') + '.JenisBantuan', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_jenis_bantuan', type:'string'}, 
		{name: 'jenis_bantuan', type:'string'}, 
		{name: 'tingkat', type:'string'}, 
		{name: 'tingkat_desc', type:'string'}, 
	]    
});

bumil.DS.JenisBantuanDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.JenisBantuan',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listJenisBantuan',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
			//idProperty : 'id_kel',
		}
	},	
	sorters: [{ property: 'id_jenis_bantuan',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data jenis bantuan ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});

/* Hubungan dalam rumah tangga */
Ext.define(thisModuleClass('DataModule') + '.HubRT', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_hub_rumah_tangga', type:'string'}, 
		{name: 'hub_rumah_tangga', type:'string'},
		{name: 'hub_rumah_tangga_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_hub_rumah_tangga + '. ' + rec.data.hub_rumah_tangga;
			}
		},					

	]    
});

bumil.DS.HubRTDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.HubRT',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listHubRT',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
		}
	},	
	sorters: [{ property: 'id_hub_rumah_tangga',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data hubungan dalam rumah tangga ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});

/* Kepemilikan Kartu Identitas*/
Ext.define(thisModuleClass('DataModule') + '.KepemilikanKartu', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_kepemilikan_kartu', type:'int', sortType: 'asInt'}, 
		{name: 'kepemilikan_kartu', type:'string'}, 
		{name: 'kepemilikan_kartu_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_kepemilikan_kartu + '. ' + rec.data.kepemilikan_kartu;
			}
		},					
	]    
});

bumil.DS.KepemilikanKartuDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.KepemilikanKartu',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listKepemilikanKartu',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
		}
	},	
	sorters: [{ property: 'id_kepemilikan_kartu',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data kepemilikan kartu ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});

/* Penyakit Kronis*/
Ext.define(thisModuleClass('DataModule') + '.PenyakitKronis', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_penyakit_kronis', type:'int', sortType: 'asInt'}, 
		{name: 'penyakit_kronis', type:'string'}, 
		{name: 'penyakit_kronis_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_penyakit_kronis + '. ' + rec.data.penyakit_kronis;
			}
		},					
	]    
});

bumil.DS.PenyakitKronisDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.PenyakitKronis',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listPenyakitKronis',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
		}
	},	
	sorters: [{ property: 'id_penyakit_kronis',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data Penyakit Kronis ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});

/* Partisipasi Sekolah */
Ext.define(thisModuleClass('DataModule') + '.PartisipasiSekolah', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_partisipasi_sekolah', type:'int', sortType: 'asInt'}, 
		{name: 'partisipasi_sekolah', type:'string'}, 
		{name: 'partisipasi_sekolah_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_partisipasi_sekolah + '. ' + rec.data.partisipasi_sekolah;
			}
		},					
	]    
});

bumil.DS.PartisipasiSekolahDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.PartisipasiSekolah',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listPartisipasiSekolah',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
		}
	},	
	sorters: [{ property: 'id_partisipasi_sekolah',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data Partisipasi Sekolah ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});

/* Lapangan Usaha*/
Ext.define(thisModuleClass('DataModule') + '.LapanganUsaha', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id_lapangan_usaha', type:'int', sortType: 'asInt'}, 
		{name: 'lapangan_usaha', type:'string'}, 
		{name: 'lapangan_usaha_display', type:'string',
			convert : function(v, rec) {                        
				return rec.data.id_lapangan_usaha + '. ' + rec.data.lapangan_usaha;
			}
		},					
	]    
});

bumil.DS.LapanganUsahaDS = Ext.create('Ext.data.Store', {
	model: thisModuleClass('DataModule') + '.LapanganUsaha',
	//autoLoad: true,
	proxy : {
		type: 'ajax',
		url: thisAppURL,
		method:'GET',
		extraParams: { 
			Module: 'DataModule',
			option: 'PUBLIC',
			action:'listLapanganUsaha',
		},	
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
		}
	},	
	sorters: [{ property: 'id_lapangan_usaha',direction: 'ASC'}],
	listeners: {
		beforeload : function(store){	
			Ext.getBody().mask("Mengambil data Lapangan Usaha ......");
		},
		load : function(store, rec, success){
			Ext.getBody().unmask();
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}				
	}
});

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

bumil.DS.StatusPekerjaanDS = Ext.create('Ext.data.Store', {
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
