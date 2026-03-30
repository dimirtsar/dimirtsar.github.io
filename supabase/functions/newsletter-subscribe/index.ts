import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface SubscribeRequest {
  email: string;
}

async function sendEmailViaResend(
  toEmail: string,
  subject: string,
  htmlContent: string
): Promise<boolean> {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');

  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'dtsarenko.com <noreply@dtsarenko.com>',
        to: [toEmail],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', response.status, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return false;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { email }: SubscribeRequest = await req.json();

    if (!email || !email.trim()) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email: email.toLowerCase().trim() }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'Ця email адреса вже підписана на розсилку' }),
          {
            status: 409,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to subscribe' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const subscriberEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Дякуємо за підписку!</h2>
        <p style="color: #666; line-height: 1.6;">
          Ви успішно підписались на розсилку dtsarenko.com.
          Тепер ви будете отримувати найновіші статті та оновлення про теплові насоси та інженерні рішення.
        </p>
        <p style="color: #666; line-height: 1.6;">
          Якщо ви отримали цей лист помилково, просто проігноруйте його.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">
          © 2026 dtsarenko.com
        </p>
      </div>
    `;

    const adminEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Нова підписка на розсилку</h2>
        <p style="color: #666; line-height: 1.6;">
          Email: <strong>${email}</strong>
        </p>
        <p style="color: #666; line-height: 1.6;">
          Дата: ${new Date().toLocaleString('uk-UA')}
        </p>
      </div>
    `;

    const emailsSent = await Promise.all([
      sendEmailViaResend(
        email.toLowerCase().trim(),
        'Підтвердження підписки - dtsarenko.com',
        subscriberEmail
      ),
      sendEmailViaResend(
        'tsarenko.da@gmail.com',
        'Нова підписка на розсилку',
        adminEmail
      ),
    ]);

    const allEmailsSent = emailsSent.every(sent => sent);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully subscribed to newsletter',
        emailSent: allEmailsSent,
        data,
      }),
      {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
