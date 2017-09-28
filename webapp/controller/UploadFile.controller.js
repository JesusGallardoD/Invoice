sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"../libs/xml2json"
], function(Controller,MessageBox,MessageToast,xml2json) {
	"use strict";

	return Controller.extend("com.gmexico.sup.invproccessInvoice.controller.UploadFile", {
		handleUploadPDFComplete: function(oEvent) {
		},
		handleUploadXMLComplete: function(oEvent) {
		},
		handleUploadPress: function(oEvent) {
			var oFileUploaderPDF = this.getView().byId("fileUploaderPDF");
			var oFileUploaderXML = this.getView().byId("fileUploaderXML");
			if (!oFileUploaderPDF.getValue() && !oFileUploaderXML.getValue()) {
				MessageToast.show("Choose a file first");
				return;
			}else{
				this.handleFileSelection();
			}
		},
		xmlToJson:function (xml) {
		  function parse(node, j) {
		    var nodeName = node.nodeName.replace(/^.+:/, '').toLowerCase();
		    var cur = null;
		    var text = $(node).contents().filter(function(x) {
		      return this.nodeType === 3;
		    });
		    if (text[0] && text[0].nodeValue.trim()) {
		      cur = text[0].nodeValue;
		    } else {
		      cur = {};
		      $.each(node.attributes, function() {
		        if (this.name.indexOf('xmlns:') !== 0) {
		          cur[this.name.replace(/^.+:/, '')] = this.value;
		        }
		      });
		      $.each(node.children, function() {
		        parse(this, cur);
		      });
		    }

		    j[nodeName] = cur;
		  }
		  var roots = $(xml);
		  var root = roots[roots.length-1];
		  var json = {};
		  parse(root, json);
		  return json;
		},
		waitForTextReadComplete: function (reader) {
			var that = this;
			reader.onloadend = function(event) {
		    var xmlData = event.target.result;
		    //var parser  = new DOMParser(), xmlDom = parser.parseFromString(xmlData, "text/xml");
    		var json = that.xmlToJson(xmlData);
    		var addenda = json.comprobante.addenda.grupominera;
    		var oModelInvoice = new sap.ui.model.json.JSONModel({
				xmlns: addenda.xmlnx,
				office: addenda.oficinadepago,
				provider: addenda.proveedor,
				kindDocument: addenda.tipodocumento,
				email:addenda.emailconfirmacion,
				category:addenda.categoria ,
				order:addenda.pedido
			});
			 sap.ui.getCore().setModel(oModelInvoice,"InvoiceModel");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
			oRouter.navTo("DocumentReview");

		  };
		},
		handleFileSelection: function () {
			var file = this.getView().byId("fileUploaderXML").oFileUpload.files[0];
			var reader = new FileReader();
			this.waitForTextReadComplete(reader);
			reader.readAsText(file);
		},
		handlePDFTypeMissmatch: function(oEvent) {
			var aFileTypes = oEvent.getSource().getFileType();
			jQuery.each(aFileTypes, function(key, value) {aFileTypes[key] = "*." +  value;});
			var sSupportedFileTypes = aFileTypes.join(", ");
			MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
									" is not supported. Choose one of the following types: " +
									sSupportedFileTypes);
		},
		handleXMLTypeMissmatch: function(oEvent) {
			var aFileTypes = oEvent.getSource().getFileType();
			jQuery.each(aFileTypes, function(key, value) {aFileTypes[key] = "*." +  value;});
			var sSupportedFileTypes = aFileTypes.join(", ");
			MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
									" is not supported. Choose one of the following types: " +
									sSupportedFileTypes);
		}
	});
});