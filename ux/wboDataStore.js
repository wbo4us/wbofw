Ext.ns('Ext.ux');

Ext.define('Ext.ux.wboDataStore', {
	extend: 'Ext.data.Store',
	requires: ['Ext.window.MessageBox'],
	alias: 'widget.wbostore',
    proxy: {
        type: 'ajax',
		method:'GET',
        url: thisAppURL,  
		reader: {
			type : 'json',
			root : 'result',
			successProperty : 'success',
			totalProperty : 'total',
			messageProperty : 'msg',
		}
    },
    listeners: {
		load : function(store, rec, success){
			if (!success) {
				Ext.Msg.alert('Alert', store.getProxy().getReader().rawData.msg);
			}				
		}	
    }
});