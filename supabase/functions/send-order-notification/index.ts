
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderNotificationRequest {
  orderId: string;
  userEmail: string;
  userName: string;
  orderItems: Array<{
    product_name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  language: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, userEmail, userName, orderItems, total, language }: OrderNotificationRequest = await req.json();
    
    console.log("Sending order notification for order:", orderId);
    console.log("Language:", language);

    // Create an HTML table of order items
    const itemsTable = `
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb;">${language === 'en' ? 'Product' : 'สินค้า'}</th>
            <th style="padding: 10px; text-align: center; border-bottom: 1px solid #e5e7eb;">${language === 'en' ? 'Quantity' : 'จำนวน'}</th>
            <th style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb;">${language === 'en' ? 'Price' : 'ราคา'}</th>
          </tr>
        </thead>
        <tbody>
          ${orderItems.map(item => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.product_name}</td>
              <td style="padding: 10px; text-align: center; border-bottom: 1px solid #e5e7eb;">${item.quantity}</td>
              <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb;">${item.price.toFixed(2)} ฿</td>
            </tr>
          `).join('')}
          <tr>
            <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">${language === 'en' ? 'Total:' : 'ยอดรวม:'}</td>
            <td style="padding: 10px; text-align: right; font-weight: bold;">${total.toFixed(2)} ฿</td>
          </tr>
        </tbody>
      </table>
    `;

    // Customer email
    const customerEmailResponse = await resend.emails.send({
      from: "SIAMTECH Online <orders@siamtech-example.com>",
      to: [userEmail],
      subject: language === 'en' ? `Order Confirmation #${orderId.substring(0, 8)}` : `ยืนยันคำสั่งซื้อ #${orderId.substring(0, 8)}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #111827; font-size: 24px; margin-bottom: 10px;">
              ${language === 'en' ? 'Thank you for your order!' : 'ขอบคุณสำหรับคำสั่งซื้อของคุณ!'}
            </h1>
            <p style="color: #6b7280; font-size: 16px;">
              ${language === 'en' ? 'Order #' : 'คำสั่งซื้อ #'}${orderId.substring(0, 8)}
            </p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #111827; font-size: 18px; margin-bottom: 15px;">
              ${language === 'en' ? 'Order Summary' : 'สรุปคำสั่งซื้อ'}
            </h2>
            ${itemsTable}
          </div>
          
          <div style="margin-bottom: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
            <h2 style="color: #111827; font-size: 18px; margin-bottom: 15px;">
              ${language === 'en' ? 'What\'s Next?' : 'ขั้นตอนต่อไป'}
            </h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
              ${language === 'en' 
                ? 'We\'re processing your order and will send you another email once your items have shipped.' 
                : 'เรากำลังดำเนินการตามคำสั่งซื้อของคุณและจะส่งอีเมลอีกฉบับเมื่อจัดส่งสินค้าของคุณแล้ว'}
            </p>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>
              ${language === 'en' 
                ? 'If you have any questions, please contact our customer support.' 
                : 'หากคุณมีคำถามใด ๆ โปรดติดต่อฝ่ายสนับสนุนลูกค้าของเรา'}
            </p>
            <p>SIAMTECH Online</p>
          </div>
        </div>
      `,
    });

    console.log("Customer email sent:", customerEmailResponse);

    // Admin notification email
    const adminEmailResponse = await resend.emails.send({
      from: "SIAMTECH Order System <orders@siamtech-example.com>",
      to: ["admin@siamtech-example.com"], // Replace with your admin email
      subject: `New Order #${orderId.substring(0, 8)} - ${userName}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="margin-bottom: 30px;">
            <h1 style="color: #111827; font-size: 24px; margin-bottom: 10px;">
              New Order Received
            </h1>
            <p style="color: #6b7280; font-size: 16px;">
              Order #${orderId.substring(0, 8)}
            </p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h2 style="color: #111827; font-size: 18px; margin-bottom: 10px;">
              Customer Information
            </h2>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${userName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${userEmail}</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #111827; font-size: 18px; margin-bottom: 15px;">
              Order Details
            </h2>
            ${itemsTable}
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>This is an automated notification from your SIAMTECH Online store.</p>
          </div>
        </div>
      `,
    });

    console.log("Admin email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Order notification emails sent successfully" 
      }),
      {
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
      }
    );
  } catch (error) {
    console.error("Error sending order notification:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
      }
    );
  }
});
