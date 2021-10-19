// Copyright (c) 2021, Jigar Tarpara and contributors
// For license information, please see license.txt

frappe.ui.form.on('Update Naming Series', {
    series: function (frm) {
        frappe.call({
            method: "conceptual.conceptual.doctype.update_naming_series.update_naming_series.get_count",
            args: {
                prefix: frm.doc.series,
            },
            callback: function (r) {
                if (r.message) {
                    frm.set_value("counter", r.message);
                }
            }
        });
    },
    update_btn: function (frm) {
        frappe.call({
            method: "conceptual.conceptual.doctype.update_naming_series.update_naming_series.update_count",
            args: {
                prefix: frm.doc.series,
                count: frm.doc.counter
            },
            callback: function (r) {
                if (r.message) {
                    frm.set_value("counter", r.message);
                }
            }
        });
    },
    add_series: function (frm) {
        frappe.call({
            method: "conceptual.conceptual.doctype.update_naming_series.update_naming_series.insert_series",
            args: {
                series: frm.doc.series_name
            },
            callback: function (r) {
                if (r.message) {
                    frappe.msgprint(r.message);
                }
            }
        });
    }
});

frappe.ui.form.on("Update Naming Series", "onload", function (frm) {
    frappe.call({
        method: "conceptual.conceptual.doctype.update_naming_series.update_naming_series.get_series",
        callback: function (r) {
            $.each(r.message, function (key, value) {
                set_field_options(key, value);
            });
        }
    });
})