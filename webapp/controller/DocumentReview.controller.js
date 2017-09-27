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
			
			this.getView().byId("xmlns").setValue(( invoice.Comprobante.Addenda.grupominera._xmlnx === undefined ) ? "" : invoice.Comprobante.Addenda.grupominera._xmlx);
		     this.getView().byId("office").setValue(( invoice.Comprobante.Addenda.grupominera._oficinadepago === undefined ) ? "" : invoice.Comprobante.Addenda.grupominera._oficinadepago);
			 this.getView().byId("provider").setValue(( invoice.Comprobante.Addenda.grupominera._proveedor === undefined ) ? "" : invoice.Comprobante.Addenda.grupominera._proveedor);
			 this.getView().byId("kindDocument").setValue(( invoice.Comprobante.Addenda.grupominera._tipodocumento === undefined ) ? "" : invoice.Comprobante.Addenda.grupominera._tipodocumento);
			 this.getView().byId("email").setValue(( invoice.Comprobante.Addenda.grupominera._emailconfirmacion === undefined ) ? "" : invoice.Comprobante.Addenda.grupominera._emailconfirmacion);
			 this.getView().byId("category").setValue(( invoice.Comprobante.Addenda.grupominera._categoria === undefined ) ? "" : invoice.Comprobante.Addenda.grupominera._categoria);
			 this.getView().byId("order").setValue(( invoice.Comprobante.Addenda.grupominera._pedido === undefined ) ? "" : invoice.Comprobante.Addenda.grupominera._pedido);
			
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