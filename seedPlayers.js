import db from "./db/connection.js"
import Player from "./models/Player.js"

const insertData = async () => {
    // reset db
    await db.dropDatabase();

    const players = [
        {
            name: "Pedro Martínez",
            era: "1992–2009",
            team: "Boston Red Sox",
            image: "https://wordpress.wbur.org/wp-content/uploads/2015/01/0106_pedro-2004-1000x823.jpg"
        },
        {
            name: "Vladimir Guerrero",
            era: "1996–2011",
            team: "Anaheim Angels",
            image: "https://baseballhall.org/sites/default/files/Guerrero%20Vladimir%20498-2003_Bat_NBLMangin_3.jpg"
        },
        {
            name: "Juan Marichal",
            era: "1960–1975",
            team: "San Francisco Giants",
            image: "https://neilleifer.com/cdn/shop/products/1073_1200x1200_crop_center.jpg?v=1659038714"
        },
        {
            name: "Robinson Canó",
            era: "2005–present",
            team: "New York Yankees",
            image: "https://cdn.vox-cdn.com/thumbor/ahVtNtcY4UDJP6PB_Vl5oXWyoXQ=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/25220493/127884076.jpg"
        },
        {
            name: "Manny Ramírez",
            era: "1993–2011",
            team: "Boston Red Sox",
            image: "https://cdn.vox-cdn.com/thumbor/TMKH_018hrVaXp7rPGTtG-TL7Vw=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/12323305/77404391.jpg.jpg"
        },
        {
            name: "David Ortiz",
            era: "1997–2016",
            team: "Boston Red Sox",
            image: "https://baseballhall.org/sites/default/files/Ortiz%20David%20274-2010-87_Act_HoFUseOnly_0.jpg"
        },
        {
            name: "Sammy Sosa",
            era: "1989–2007",
            team: "Chicago Cubs",
            image: "https://hips.hearstapps.com/hmg-prod/images/sammy-sosa-189155-1-402.jpg?crop=1xw:1.0xh;center,top&resize=640:*"
        },
        {
            name: "José Ramírez",
            era: "2013–present",
            team: "Cleveland Guardians",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Jose_Ramirez_%2852968360805%29_%28cropped%29.jpg"
        },
        {
            name: "Albert Pujols",
            era: "2001–2021",
            team: "St. Louis Cardinals",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Albert_Pujols_on_May_19%2C_2008.jpg"
        },
        {
            name: "Tony Fernández",
            era: "1983–2001",
            team: "Toronto Blue Jays",
            image: " https://cdn.vox-cdn.com/thumbor/t5yi1jauuGeBbYjg9wcxDs-IXNg=/1400x1400/filters:forma[…].vox-cdn.com/uploads/chorus_asset/file/23249734/918358886.jpg"
        }
    ];

    await Player.create(players)

    await db.close()
}

insertData()