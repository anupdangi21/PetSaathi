import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';

const EsewaIntegrationMarket = ({amount}) => {
    useEffect(() => {
        const secretKey = "8gBm/:&EnhH.1/q";
        const transactionUUID = `txn_${Date.now()}`;
        const productCode = "EPAYTEST";
        const totalAmount = amount;
        const signedFieldNames = "total_amount,transaction_uuid,product_code";
    
        const signature = CryptoJS.HmacSHA256(
          `total_amount=${totalAmount},transaction_uuid=${transactionUUID},product_code=${productCode}`,
          secretKey
        ).toString(CryptoJS.enc.Base64);
    
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    
        const formData = {
          amount: amount,
          tax_amount: 0,
          total_amount: totalAmount,
          transaction_uuid: transactionUUID,
          product_code: productCode,
          product_service_charge: 0,
          product_delivery_charge: 0,
          success_url: "http://localhost:5173/payment/success/marketplace",
          failure_url: "http://localhost:5173/payment/failure",
          signed_field_names: signedFieldNames,
          signature: signature,
        };
    
        Object.entries(formData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });
    
        document.body.appendChild(form);
        form.submit();
    
        return () => {
          document.body.removeChild(form);
        };
      }, [amount]);
    
      return null;
    };

export default EsewaIntegrationMarket
