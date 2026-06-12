function sendWebhook(message) {

    fetch("https://discord.com/api/webhooks/1505977380085305444/bQ0lNlWKdU_hMducap-CNu2W727gQs4XgDRRoELtw0w-XgyyZp5yjhjdVuB6x5nzvg7A", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: message
        })

    });

}

const links = {

    windows: {
        msg: "Download Windows",
        url: "https://github.com/celtmen-cpu/Night-Rush/releases/download/0.29/windows-v0.29.exe"
    },

    mac: {
        msg: "Download Mac",
        url: "https://github.com/celtmen-cpu/Night-Rush/releases/download/0.29/Ninja-Runner.mac-v0.29.dmg"
    },

    android: {
        msg: "Download Android",
        url: "https://github.com/celtmen-cpu/Night-Rush/releases/download/0.29/android-v0.29.apk"
    },
        
    iphone: {
        msg: "Download iphone",
        url: "https://github.com/celtmen-cpu/Night-Rush/releases/download/0.29/NightRush.ipa"
    }

};

Object.keys(links).forEach(p => {

    document.querySelector("." + p).addEventListener("click", () => {

        sendWebhook(links[p].msg);
        window.location.href = links[p].url;

    });

});
