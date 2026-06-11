import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Validate parameters
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message parameters are required." },
        { status: 400 }
      );
    }

    const leadData = {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone: phone || "N/A",
      company: company || "N/A",
      message,
    };

    // 1. Save locally to leads.json in the workspace root directory so no leads are ever lost
    const leadsFilePath = path.join(process.cwd(), "leads.json");
    let existingLeads = [];
    
    try {
      if (fs.existsSync(leadsFilePath)) {
        const fileContent = fs.readFileSync(leadsFilePath, "utf8");
        existingLeads = JSON.parse(fileContent);
      }
    } catch (readErr) {
      console.error("Error reading existing leads.json:", readErr);
    }

    existingLeads.push(leadData);

    try {
      fs.writeFileSync(leadsFilePath, JSON.stringify(existingLeads, null, 2), "utf8");
    } catch (writeErr) {
      console.error("Error saving lead locally to leads.json:", writeErr);
    }

    // 2. Log to server console
    console.log("\n=================== NEW LEAD INGESTED ===================");
    console.log(`Timestamp: ${leadData.timestamp}`);
    console.log(`Name     : ${leadData.name}`);
    console.log(`Email    : ${leadData.email}`);
    console.log(`Phone    : ${leadData.phone}`);
    console.log(`Company  : ${leadData.company}`);
    console.log(`Message  : ${leadData.message}`);
    console.log("=========================================================\n");

    // 3. Send email via a free lead form service (FormSubmit.co)
    const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL || "founder@mlarcai.com";
    try {
      const emailResponse = await fetch(`https://formsubmit.co/ajax/${notificationEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Phone: phone || "N/A",
          Company: company || "N/A",
          Message: message,
          _subject: `[ML Arc Portfolio Lead] - ${name} (${company || "Individual"})`,
        }),
      });

      if (!emailResponse.ok) {
        const errBody = await emailResponse.text();
        console.error("FormSubmit API responded with error:", errBody);
        return NextResponse.json({
          success: true,
          message: "Lead recorded locally, but email forwarding service failed.",
          warning: "FormSubmit service error.",
        });
      }
    } catch (emailErr) {
      console.error("Error sending email via FormSubmit:", emailErr);
      return NextResponse.json({
        success: true,
        message: "Lead recorded locally, but email forwarding failed.",
        warning: "Network routing error.",
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Lead credentials processed and logged successfully." 
    });
  } catch (error) {
    console.error("Lead submission endpoint failure:", error);
    return NextResponse.json(
      { error: "Internal server error processing lead transmission." },
      { status: 500 }
    );
  }
}
