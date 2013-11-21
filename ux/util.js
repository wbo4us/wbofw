Ext.ns('Ext.ux.util');

Ext.ux.util.StoreClone = function (source) {
    var target = Ext.create ('Ext.data.Store', {
        model: source.model
    });

    Ext.each (source.getRange (), function (record) {
        var newRecordData = Ext.clone (record.copy().data);
        var model = new source.model (newRecordData, newRecordData.id);

        target.add (model);
    });

    return target;
}