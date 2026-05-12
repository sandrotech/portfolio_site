import { NextResponse } from "next/server";
import { readMessages } from "@/lib/messagesStore";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function GET() {
    const list = await readMessages();
    return NextResponse.json(list);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (
            !body.name ||
            typeof body.name !== "string" ||
            !body.email ||
            typeof body.email !== "string" ||
            !body.message ||
            typeof body.message !== "string"
        ) {
            return NextResponse.json(
                { error: "Campos inválidos" },
                { status: 400 }
            );
        }

        const name = body.name.trim();
        const email = body.email.trim();
        const message = body.message.trim();

        // Configuração do transportador do Nodemailer usando Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Configuração do e-mail a ser enviado
        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`, // O Gmail força o remetente a ser a própria conta SMTP, mas definimos o nome do remetente
            to: process.env.SMTP_USER, // Envia para você mesmo
            replyTo: email, // Permite responder diretamente ao e-mail do remetente
            subject: `Novo contato do Portfólio - ${name}`,
            text: `Nome: ${name}\nE-mail: ${email}\nMensagem:\n${message}`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body {
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        background-color: #0b0c10;
                        color: #c5c6c7;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 40px auto;
                        background-color: #1f2833;
                        border-radius: 12px;
                        overflow: hidden;
                        border: 1px solid #a855f7;
                        box-shadow: 0 4px 20px rgba(168, 85, 247, 0.15);
                    }
                    .header {
                        background: linear-gradient(135deg, #1f2833 0%, #0b0c10 100%);
                        padding: 30px;
                        text-align: center;
                        border-bottom: 2px solid #a855f7;
                    }
                    .header h1 {
                        color: #a855f7;
                        margin: 0;
                        font-size: 24px;
                        font-weight: 700;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                    }
                    .content {
                        padding: 30px;
                    }
                    .field {
                        margin-bottom: 20px;
                    }
                    .field-label {
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        color: #a855f7;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .field-value {
                        font-size: 16px;
                        color: #ffffff;
                        line-height: 1.5;
                        background-color: #0b0c10;
                        padding: 12px 15px;
                        border-radius: 8px;
                        border: 1px solid #1f2833;
                    }
                    .message-box {
                        font-style: italic;
                        border-left: 3px solid #a855f7;
                        white-space: pre-wrap;
                    }
                    .footer {
                        background-color: #0b0c10;
                        padding: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                        border-top: 1px solid #1f2833;
                    }
                    .footer a {
                        color: #a855f7;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Novo Contato do Portfólio</h1>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="field-label">Nome</div>
                            <div class="field-value">${name}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">E-mail</div>
                            <div class="field-value"><a href="mailto:${email}" style="color: #a855f7; text-decoration: none;">${email}</a></div>
                        </div>
                        <div class="field">
                            <div class="field-label">Mensagem</div>
                            <div class="field-value message-box">${message}</div>
                        </div>
                    </div>
                    <div class="footer">
                        Este e-mail foi gerado automaticamente pelo seu <a href="https://github.com/sandrotech">Portfólio Pessoal</a>.
                    </div>
                </div>
            </body>
            </html>
            `,
        };

        // Envia o e-mail
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Mensagem enviada com sucesso por e-mail!" }, { status: 201 });
    } catch (err: any) {
        console.error("Erro ao enviar e-mail:", err);
        return NextResponse.json(
            { error: err?.message ?? "Erro ao enviar e-mail" },
            { status: 500 }
        );
    }
}

