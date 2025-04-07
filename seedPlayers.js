import mongoose from "mongoose";
import db from "./db/connection.js";
import Player from "./models/Player.js";
import Post from "./models/Post.js";

const players = [
    {
      name: "Shohei Ohtani",
      era: "2018–present",
      team: "Los Angeles Dodgers",
      image: "https://img.mlbstatic.com/mlb-photos/image/upload/ar_9:16,g_auto,q_auto:good,w_2608,c_fill,f_jpg/v1/people/660271/action/vertical/current"
    },
    {
      name: "Aaron Judge",
      era: "2016–present",
      team: "New York Yankees",
      image: "https://nypost.com/wp-content/uploads/sites/2/2022/06/20220626_YankeesAstros052CS.jpg"
    },
    {
      name: "Mookie Betts",
      era: "2014–present",
      team: "Los Angeles Dodgers",
      image: "https://cdn.vox-cdn.com/thumbor/j83gHlE3ZwO9Jxi5AhW-mW3h_xI=/0x0:4096x2731/1200x800/filters:focal(1762x377:2416x1031)/cdn.vox-cdn.com/uploads/chorus_image/image/70931525/usa_today_18397044.0.jpg"
    },
    {
      name: "Bobby Witt Jr.",
      era: "2021–present",
      team: "Kansas City Royals",
      image: "https://a.espncdn.com/photo/2024/0614/r1345836_1296x729_16-9.jpg"
    },
    {
      name: "Juan Soto",
      era: "2018–present",
      team: "New York Mets",
      image: "https://a.espncdn.com/photo/2024/1205/mlb_juan_soto_mets_cr_16x9_608x342.jpg"
    },
    {
      name: "Fernando Tatis Jr.",
      era: "2019–present",
      team: "San Diego Padres",
      image: "https://static01.nyt.com/images/2021/02/19/sports/19kepner-padres-print1/18kepner-padres-1-mediumSquareAt3X.jpg"
    },
    {
      name: "Kyle Tucker",
      era: "2018–present",
      team: "Chicago Cubs",
      image: "https://cdn.vox-cdn.com/thumbor/d5IrUMLZ1af-FVcLfXJPHkU8FJI=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/25460018/usa_today_23344145.jpg"
    },
    {
      name: "Freddie Freeman",
      era: "2010–present",
      team: "Los Angeles Dodgers",
      image: "https://www.usatoday.com/gcdn/authoring/authoring-images/2024/10/26/USAT/75858831007-usatsi-24586247.jpg?crop=3121,3120,x782,y0"
    },
    {
      name: "Vladimir Guerrero Jr.",
      era: "2019–present",
      team: "Toronto Blue Jays",
      image: "https://media.gettyimages.com/id/2173199140/photo/arlington-texas-vladimir-guerrero-jr-27-of-the-toronto-blue-jays-celebrates-as-he-runs-the.jpg?s=612x612&w=gi&k=20&c=g4MWYLLevTit3bOSz9DN6psSgv2idvLhesQpLc-FzPo="
    },
    {
      name: "José Ramírez",
      era: "2013–present",
      team: "Cleveland Guardians",
      image: "https://c8.alamy.com/comp/2MB09WR/cleveland-guardians-jose-ramirez-slides-into-home-plate-to-score-against-the-tampa-bay-rays-during-the-fourth-inning-of-a-baseball-game-saturday-july-30-2022-in-st-petersburg-fla-ap-photoscott-audette-2MB09WR.jpg"
    },
    {
      name: "Corey Seager",
      era: "2015–present",
      team: "Texas Rangers",
      image: "https://www.therangerreport.com/wp-content/uploads/2022/03/2f82f367498a6a7ce96ca67b93231ee5.jpg"
    },
    {
      name: "Paul Skenes",
      era: "2023–present",
      team: "Pittsburgh Pirates",
      image: "https://npr.brightspotcdn.com/dims4/default/230e66d/2147483647/strip/true/crop/7490x4993+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fe7%2F6b%2Ff95a0ed14b0ab82c4937ff866a6e%2Fap24157862680288.jpg"
    },
    {
      name: "Francisco Lindor",
      era: "2015–present",
      team: "New York Mets",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRuwcQXviGN0luLjnCpDThnT01yHhTvLAHgA&s"
    },
    {
      name: "Elly De La Cruz",
      era: "2023–present",
      team: "Cincinnati Reds",
      image: "https://static01.nyt.com/images/2023/06/30/multimedia/30mlb-elly-mania-bwfh/30mlb-elly-mania-bwfh-mediumSquareAt3X.jpg"
    },
    {
      name: "Ronald Acuña Jr.",
      era: "2018–present",
      team: "Atlanta Braves",
      image: "https://media-s3-us-east-1.ceros.com/players-tribune/images/2024/03/27/e1209f426bb92da6bd68c5dd749c6fcc/190617-br-mets-kl-0488-2.jpg"
    }
  ];


  const insertData = async () => {
    try {
      await db.once("open", async () => {
        console.log(" Connected to MongoDB Atlas");
  
        await Post.deleteMany();         
        await Player.deleteMany();       
  
        await Player.insertMany(players);
  
        mongoose.connection.close();
      });
    } catch (err) {
      console.error("Error seeding database:", err);
      mongoose.connection.close();
    }
  };
  
  insertData();