Ext.define('Ext.ux.grid.HybridSummary', {


    extend: 'Ext.grid.feature.GroupingSummary',


    alias: 'feature.hybridsummary',


    showTotalSummaryRow: true, // Can be used to disable the "total" summary row


    attachEvents: function() {
        var me = this;
        me.callParent();
        // Listen to container events on the view to catch events not catched by standard events
        me.mon(me.view, {
            containerclick: me.handleEvent,
            containermousedown: me.handleEvent,
            containermouseup: me.handleEvent,
            containerdblclick: me.handleEvent,
            containercontextmenu: me.handleEvent,
            containermouseover: me.handleEvent,
            containermouseout: me.handleEvent,
            containerkeydown: me.handleEvent,
            scope: me
        });


        // Regexp to match group id and extact name !!
        me.groupIdRe = new RegExp(me.view.id + '-bd-(.+)');


    },


    handleEvent: function(view, e, eOpts) {
        var me = this;
        // Check if event matches target!
        var target = e.getTarget('.x-grid-row-summary', view.getTargetEl());
        if (target) {
            var cell = e.getTarget(view.cellSelector, target),
                cellIndex = cell ? cell.cellIndex : -1;
            if (cellIndex !== -1) {
                var header = view.headerCt.getGridColumns()[cellIndex];
                // We will pass summary data instead of record index to the processEvent function
                var group = me.getGroup(target);
                var summaryData = {isSummary: true};
                if (group) {
                    summaryData.group = group;
                    summaryData.data = me.summaryData[group.name][header.id];
                } else {
                    summaryData.data = me.totalSummaryData[header.id];
                }
                // Let the column process the event in a standard way !!! (see i.e. actioncolumn)
                return header.processEvent(e.type, view, cell, summaryData, cellIndex, e);
            }
        }
    },


    /**
     * Here we try to find the group based on the summary row element
     * @param el
     */
    getGroup: function(el) {
        var me = this;
        el = Ext.get(el);
        var prev = el.prev();
        var match = prev.id.match(me.groupIdRe);
        if (match) {
            var name = match[1];
            return me.view.store.getGroups(name); 
        }
        return false;
    },


    /**
     * Generate "total" summary data
     */
    getFragmentTpl: function() {
        var me = this,
            fragments = me.callParent();


        if (this.showTotalSummaryRow) {
            me.totalSummaryData = Ext.grid.feature.Summary.prototype.generateSummaryData.call(this);
        }
        return fragments;
    },


    /**
     * Put the closeRows member functions in the template scope.
     */
    getTableFragments: Ext.grid.feature.Summary.prototype.getTableFragments,


    /**
     * Print the total summary row if not rendering a group.
     * This prevents generating a total summary row for each group since the groupîng fetaure uses recursion ...
     * When rendering a group, the name of the group is in the scope ...
     */
    closeRows: function() {
        return '</tpl><tpl if="!name">{[this.printSummaryRow()]}</tpl>';
    },


    /**
     * Override to get data for total summary row.
     * @param index
     */
    getPrintData: function(index){
        // GroupingSummary provides an index
        if (typeof index != 'undefined') {
            return this.callParent(arguments);
        } else if (this.showTotalSummaryRow) {
            // Get the data from the "total" summary ... (basically copied from the summary feature ...)
            var me = this,
                columns = me.view.headerCt.getColumnsForTpl(),
                i = 0,
                length = columns.length,
                data = [],
                active = me.totalSummaryData,  // Here is the modification (would be great to juste override this ...)
                column;


            for (; i < length; ++i) {
                column = columns[i];
                column.gridSummaryValue = this.getColumnValue(column, active);
                data.push(column);
            }
            return data;
        }
    }


});