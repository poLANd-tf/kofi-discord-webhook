import 'dotenv/config'
import { Filter } from 'bad-words';
import express from 'express';
const app = express()
import bodyParser from 'body-parser';
import { EmbedBuilder, WebhookClient } from 'discord.js';
const hook = new WebhookClient({ url: process.env["WEBHOOK_URL"] });
const port = process.env["PORT"] ?? 8070
const devMode = process.env["DEV_MODE"] ?? false
const endpoint = process.env["ENDPOINT"] ?? "/webhook-kofi"
const filter = new Filter();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post(endpoint, async (req, res) => {
    // console.log(req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) return res.sendStatus(204)
    let data;
    try {
        data = JSON.parse(req.body["data"])
    } catch (error) {
        return res.sendStatus(400)
    }
    if (data.verification_token != process.env["VERIFICATION_TOKEN"]) return res.sendStatus(403)
    const date = new Date(data.timestamp).getTime()
    if (devMode) {
        console.log(data)
    }
    if (data.type === "Donation" || data.type === "Subscription") {
        sendEmbed(data, date, true, false).then(() => { res.sendStatus(200) })
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

// Functions
function sendEmbed(data, date, isPublic, type) {
    var interName = filter.clean(data.fromName) || "unknown";
    var interMessage = data.message.replace(/`/g, "");
    interMessage = filter.clean(interMessage);
    if (isPublic) {
        const embed = new EmbedBuilder()
            .setAuthor({
                name: "New Ko-Fi donation!",
                iconURL: "https://poland.tf/wp-content/uploads/2024/01/favicon.png",
            })
            .addFields(
                {
                    name: interName,
                    value: "have donated",
                    inline: false
                },
                {
                    name: data.amount + " " + data.currency,
                    value: "`" + interMessage + "`" ?? "`-`",
                    inline: false
                },
            )
            .setImage("https://c.tenor.com/xBTPckHid1oAAAAC/tenor.gif")
            .setThumbnail("https://poland.tf/wp-content/uploads/2024/01/favicon.png")
            .setColor("#dd3a3a")
            .setFooter({
                text: "poLANd.tf donation bot",
                iconURL: "https://poland.tf/wp-content/uploads/2024/01/favicon.png",
            })
        timestamp: new Date().toISOString();

        return hook.send({ embeds: [embed] });
    } else {
        const embed = new EmbedBuilder()
            .setAuthor({
                name: "New Ko-Fi donation!",
                iconURL: "https://poland.tf/wp-content/uploads/2024/01/favicon.png",
            })
            .addFields(
                {
                    name: interName,
                    value: "have donated",
                    inline: false
                },
                {
                    name: data.amount + " " + data.currency,
                    value: "`[REDACTED]`",
                    inline: false
                },
            )
            .setImage("https://c.tenor.com/xBTPckHid1oAAAAC/tenor.gif")
            .setThumbnail("https://poland.tf/wp-content/uploads/2024/01/favicon.png")
            .setColor("#dd3a3a")
            .setFooter({
                text: "poLANd.tf donation bot",
                iconURL: "https://poland.tf/wp-content/uploads/2024/01/favicon.png",
            })
        timestamp: new Date().toISOString();

        return hook.send({ embeds: [embed] });
    }
}
