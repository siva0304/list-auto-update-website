function openTab(tabName) {
    document.querySelectorAll(".tabContent").forEach(el => el.style.display = "none");
    document.getElementById(tabName).style.display = "block";

    loadData(tabName);
}

async function loadData(tab) {
    if (tab === "prices") {
        const res = await fetch("data/prices.json");
        const data = await res.json();

        document.getElementById("prices").innerHTML = `
            <h2>Prices JSON</h2>
            GST: ${data.gst}% <br>
            Delivery: ${data.delivery_charge} <br>
            Packing: ${data.packing_charge}
        `;
    }

    else if (tab === "products") {
        const res = await fetch("data/products.csv");
        const text = await res.text();

        const rows = text.trim().split("\n").map(r => r.split(","));
        let html = `<h2>Products CSV</h2><table>`;

        rows.forEach(r => {
            html += "<tr>";
            r.forEach(c => html += `<td>${c}</td>`);
            html += "</tr>";
        });

        html += "</table>";
        document.getElementById("products").innerHTML = html;
    }

    else if (tab === "offers") {
        const res = await fetch("data/offers.json");
        const data = await res.json();

        document.getElementById("offers").innerHTML = `
            <h2>Offers</h2>
            Today's Offer: ${data.today_offer} <br>
            Coupon Code : ${data.coupon}
        `;
    }

    else if (tab === "settings") {
        const res = await fetch("data/settings.json");
        const data = await res.json();

        document.getElementById("settings").innerHTML = `
            <h2>Settings</h2>
            Currency: ${data.currency} <br>
            Version : ${data.version}
        `;
    }
}

// Default tab open
openTab("prices");

// Auto refresh every 10 sec
setInterval(() => {
    const activeTab = document.querySelector(".tabContent:not([style*='display: none'])");
    if (activeTab) loadData(activeTab.id);
}, 10000);
