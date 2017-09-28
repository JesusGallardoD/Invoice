sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller,MessageToast,MessageBox) {
	"use strict";

	return Controller.extend("com.gmexico.sup.invproccessInvoice.controller.DocumentReview", {
		onInit: function() {
			var oModel = sap.ui.getCore().getModel("InvoiceModel",oModel);
			var invoice = JSON.parse(oModel.getJSON());
			 this.getView().byId("xmlns").setValue(( invoice.xmlnx === undefined ) ? "" : invoice.xmlnx);
		     this.getView().byId("office").setValue(( invoice.office === undefined ) ? "" : invoice.office);
			 this.getView().byId("provider").setValue(( invoice.provider === undefined ) ? "" : invoice.provider);
			 this.getView().byId("kindDocument").setValue(( invoice.kindDocument === undefined ) ? "" : invoice.kindDocument);
			 this.getView().byId("email").setValue(( invoice.email === undefined ) ? "" : invoice.email);
			 this.getView().byId("category").setValue(( invoice.category === undefined ) ? "" : invoice.category);
			 this.getView().byId("order").setValue(( invoice.order === undefined ) ? "" : invoice.order);

		},
		onPress: function(oEvent){
			var xmlx = this.getView().byId("xmlns").getValue();
			var office = this.getView().byId("office").getValue();
			var provider = this.getView().byId("provider").getValue();
			var kindDocument = this.getView().byId("kindDocument").getValue();
			var email = this.getView().byId("email").getValue();
			var category = this.getView().byId("category").getValue();
			var order = this.getView().byId("order").getValue();
			if(xmlx !== "" && office!=="" &&  provider!=="" && kindDocument !=="" && email!=="" && category!=="" && order!=="")
			{
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("main");
			}else{
				MessageToast.show("campos incompletos, por favor completa la forma");
			}
		}
	});
});