/**
 * Crisp Live Chat Widget
 * 
 * This script loads the Crisp chat widget for real-time customer support.
 * Crisp offers a generous free tier perfect for early-stage startups:
 * - Live chat widget
 * - Team inbox
 * - Mobile app notifications
 * - Basic automation
 * 
 * To activate:
 * 1. Sign up at https://crisp.chat
 * 2. Get your Website ID from Settings > Website Settings
 * 3. Replace YOUR_CRISP_WEBSITE_ID below with your actual ID
 * 4. The chat widget will appear on all pages
 */

// Crisp Chat Configuration
// Replace YOUR_CRISP_WEBSITE_ID with your actual Crisp Website ID
window.$crisp = [];
window.CRISP_WEBSITE_ID = "YOUR_CRISP_WEBSITE_ID";

(function() {
    // Only load if we have a valid website ID
    if (window.CRISP_WEBSITE_ID === "YOUR_CRISP_WEBSITE_ID") {
        console.log("[Crisp] Chat widget not loaded: Please set your CRISP_WEBSITE_ID in js/crisp-chat.js");
        return;
    }
    
    d = document;
    s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
})();

// Configure Crisp settings
window.$crisp.push(["do", "chat:hide"]); // Start hidden, show after delay

// Show chat after visitor has been on page for 10 seconds
setTimeout(function() {
    if (window.$crisp) {
        window.$crisp.push(["do", "chat:show"]);
        
        // Optional: Open chat automatically on pricing page after 30 seconds
        if (window.location.pathname.includes("pricing")) {
            setTimeout(function() {
                window.$crisp.push(["do", "chat:open"]);
                window.$crisp.push(["set", "message:text", ["Hi! Have questions about our pricing? I'm here to help! 👋"]]);
            }, 20000); // 20 seconds after showing
        }
    }
}, 10000); // 10 seconds initial delay

// Track page views in Crisp (helps understand user journey)
window.$crisp.push(["set", "session:event", [[["page_view", { 
    path: window.location.pathname,
    title: document.title
}]]]]);
