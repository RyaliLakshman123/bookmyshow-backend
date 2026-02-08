
// controllers/home-sections.controller.js
// This endpoint returns home screen sections (NOT the movies screen)

async function getHomeSections(req, res) {
  try {
    // Hardcoded home sections matching your iOS structure
    const response = [
      {
        success: true,
        sections: [
          // 1. Trending Carousel
          {
            id: "trending",
            title: "Trending Now",
            type: "poster_carousel",
            items: [
              {
                id: 603,
                title: "The Rajasaab",
                posterUrl: "https://image.tmdb.org/t/p/w1066_and_h600_face/9IBc1KNZmVHMwM4J9DWbc81CSTM.jpg",
                rating: 7.5
              },
              {
                id: 27205,
                title: "Avatar: Fire and Ash",
                posterUrl: "https://image.tmdb.org/t/p/original/ymtnjmwnExw1ZztBKQVkG0flooe.jpg",
                rating: 8.8
              },
              {
                id: 157336,
                title: "Dhuranhar",
                posterUrl: "https://image.tmdb.org/t/p/original/3GGum7CC3Nof0XcoqozMbCKxFb9.jpg",
                rating: 8.6
              },
              {
                id: 1511417,
                title: "Bhahubali: The Epic",
                posterUrl: "https://image.tmdb.org/t/p/w1066_and_h600_face/7TSIiZLDGA9hbBA6MdGa3krO7he.jpg",
                rating: 9.6
              },
              {
                id: 1407437,
                title: "Andhraking Taluka",
                posterUrl: "https://image.tmdb.org/t/p/original/f6vtDzjT5dnwytOmmzWjdFVzYSL.jpg",
                rating: 8.6
              }
            ]
          },

          // 2. Resume Section
          {
            id: "resume",
            title: "Resume",
            type: "resume",
            items: [
              {
                id: 1022453,
                title: "The Raja Saab",
                posterUrl: "https://image.tmdb.org/t/p/original/1zCsENKBDBO1BJHjTZDfroeGdzy.jpg",
                rating: 7.5,
                cinemas: "33 cinemas in Chennai",
                price: "₹54"
              },
              {
                id: 1396869,
                title: "Dies Irae",
                posterUrl: "https://image.tmdb.org/t/p/original/qnrrdmcPFBJig3CvkRtpfo5qgzH.jpg",
                rating: 8.2,
                cinemas: "28 cinemas in Chennai",
                price: "₹120"
              },
              {
                id: 1234731,
                title: "Anaconda",
                posterUrl: "https://image.tmdb.org/t/p/original/1X5w9OKSOpfZgEgscrN41az2Lsi.jpg",
                rating: 8,
                cinemas: "21 cinemas in Chennai",
                price: "₹150"
              }
            ]
          },

          // 3. Orders Section
          {
            id: "orders",
            title: "Your Orders",
            type: "orders",
            orderItems: [
              {
                id: "order_1",
                orderedOn: "19 Jan, 2026 at 04:21:57 PM",
                movieName: "The Raja Saab",
                language: "Telugu",
                posterUrl: "https://image.tmdb.org/t/p/original/vRvoFaGZexSkUSbpzDKblkSY8Bz.jpg",
                showTime: "Mon, 19 Jan, 2026 | 10:00 PM",
                theatre: "PVR: Nexus (Formerly Forum), Koramangala",
                tickets: "4 tickets: PC - E4, E5, E6, E7",
                audi: "AUDI 4",
                status: "failed",
                statusMessage: "We did not receive your payment."
              },
              {
                id: "order_2",
                orderedOn: "28 Nov, 2025 at 06:33:40 PM",
                movieName: "Andhra King Taluka",
                language: "Telugu",
                posterUrl: "https://image.tmdb.org/t/p/original/Ae3MyIuCf4JIKPqCpKv9KIcX09a.jpg",
                showTime: "Sat, 29 Nov, 2025 | 04:15 PM",
                theatre: "PVR: Nexus (Formerly Forum), Koramangala",
                tickets: "2 tickets: QR - L6, L5",
                audi: "AUDI 9",
                status: "finished",
                statusMessage: "Hope you enjoyed the Show!"
              },
              {
                id: "order_3",
                orderedOn: "31 Oct, 2025 at 02:49:05 PM",
                movieName: "Baahubali: The Epic",
                language: "Telugu",
                posterUrl: "https://image.tmdb.org/t/p/original/4UY6fVCD5AkCYsVvo7gCgyHy4rk.jpg",
                showTime: "Fri, 31 Oct, 2025 | 09:30 PM",
                theatre: "Urvashi Cinema: Bengaluru",
                tickets: "5 tickets: SL - 04, 05, 06, 07, 08",
                audi: "Urvashi Cinema",
                status: "finished",
                statusMessage: "Hope you enjoyed the Show!"
              },
              {
                id: "order_4",
                orderedOn: "19 Jan, 2026 at 04:21:57 PM",
                movieName: "Nari Nari Naduma Murari",
                language: "Telugu",
                posterUrl: "https://image.tmdb.org/t/p/original/jFBu7tS0mlEZwYTkjJcKH48bV4m.jpg",
                showTime: "Mon, 19 Jan, 2026 | 10:00 PM",
                theatre: "Urvashi Cinema: Bengaluru",
                tickets: "4 tickets: PC - E4, E5, E6, E7",
                audi: "AUDI 4",
                status: "finished",
                statusMessage: "Hope you enjoyed the Show!"
              },
              {
                id: "order_5",
                orderedOn: "12 Sep, 2025 at 05:13:35 PM",
                movieName: "Mirai",
                language: "Telugu",
                posterUrl: "https://image.tmdb.org/t/p/original/gVzWHYThVODV5MgccDoyQxPFXve.jpg",
                showTime: "Fri, 12 Sep, 2025 | 10:00 PM",
                theatre: "PVR: Phoenix Marketcity Mall, Whitefield Road",
                tickets: "6 tickets: Gold Class - L14, L15, L16, L17, L18, L19, L20",
                audi: "Urvashi Cinema",
                status: "finished",
                statusMessage: "Hope you enjoyed the Show!"
              },
              {
                id: "order_6",
                orderedOn: "29 Oct, 2025 at 10:59:05 PM",
                movieName: "Telusu kada",
                language: "Telugu",
                posterUrl: "https://image.tmdb.org/t/p/original/zCeinwOCqqMGQVdEXF5n42purUr.jpg",
                showTime: "Fri, 31 Oct, 2025 | 09:30 PM",
                theatre: "PVR: Phoenix Marketcity Mall, Whitefield Road",
                tickets: "2 tickets: PR - K4, K5",
                audi: "Urvashi Cinema",
                status: "finished",
                statusMessage: "Hope you enjoyed the Show!"
              },
              {
                id: "order_7",
                orderedOn: "30 Aug, 2025 at 07:40:00 PM",
                movieName: "Weapons",
                language: "English",
                posterUrl: "https://image.tmdb.org/t/p/original/pImCIWsg21NLWAeP5BwjAGztQWj.jpg",
                showTime: "Sat, 30 Aug, 2025 | 10:10 PM",
                theatre: "Cinepolis: Lulu Mall, Bengaluru",
                tickets: "4 tickets: EXECUTIVE - F8, F9, F10, F11",
                audi: "Urvashi Cinema",
                status: "finished",
                statusMessage: "Hope you enjoyed the Show!"
              },
              {
                id: "order_8",
                orderedOn: "18 Aug, 2025 at 11:04:33 PM",
                movieName: "Mahavatar Narsimha",
                language: "Telugu",
                posterUrl: "https://image.tmdb.org/t/p/original/uGTF87VyfjtwwqRlT2apQg5YnEp.jpg",
                showTime: "Tue, 19 Aug, 2025 | 10:30 PM",
                theatre: "PVR: VR Bengaluru, Whitefield Road",
                tickets: "4 tickets: PE - J11, J12, J13, J14",
                audi: "AUDI 06",
                status: "finished",
                statusMessage: "Hope you enjoyed the Show!"
              }
            ]
          },

          // 4. Movies Banner
          {
            id: "movies_banner",
            title: "Movies Banner",
            type: "movies_banner",
            items: [
              {
                id: 603,
                title: "Taskaree: The Smuggler's Web",
                posterUrl: "https://image.tmdb.org/t/p/original/bHm3RIoDc3TSKxUg0jPlO2NEmsk.jpg"
              },
              {
                id: 27205,
                title: "Avatar: Fire and Ash",
                posterUrl: "https://image.tmdb.org/t/p/original/kANnlXiwNcduix0aWHZnPq2VEUF.jpg"
              }
            ]
          },

          // 5. Now Showing
          {
            id: "movies_now_showing",
            title: "Now Showing",
            type: "movies_now_showing",
            items: [
              {
                id: 786892,
                title: "Furiosa",
                posterUrl: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
                rating: 7.9,
                language: "English",
                category: "new_release"
              },
              {
                id: 940721,
                title: "Godzilla x Kong",
                posterUrl: "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
                rating: 7.5,
                language: "English",
                category: "re_release"
              },
              {
                id: 940722,
                title: "Om Shanti Shanti",
                posterUrl: "https://image.tmdb.org/t/p/original/mALSJGjgjohkv56pZzpPJL2MOuj.jpg",
                rating: 9.1,
                language: "Telugu",
                category: "new_release"
              },
              {
                id: 940723,
                title: "Nari Nari Naduma Murari",
                posterUrl: "https://image.tmdb.org/t/p/original/ApoMpe7osBrG5YHNObRietuw1JM.jpg",
                rating: 9.1,
                language: "Telugu",
                category: "new_release"
              },
              {
                id: 940724,
                title: "Anaganaga Oka Raju",
                posterUrl: "https://image.tmdb.org/t/p/original/iCzGY1JD4DXqAjDKhsesKzs9vdK.jpg",
                rating: 9.1,
                language: "Telugu",
                category: "new_release"
              },
              {
                id: 940725,
                title: "Mana ShankaraVaraPrasad Garu",
                posterUrl: "https://image.tmdb.org/t/p/original/XwztOdwU6B6QJNyfyraj2IGK6r.jpg",
                rating: 9.1,
                language: "Telugu",
                category: "new_release"
              }
            ]
          },

          // 6. Coming Soon
          {
            id: "movies_coming_soon",
            title: "Coming Soon",
            type: "movies_coming_soon",
            items: [
              {
                id: 123,
                title: "Avatar 3",
                posterUrl: "https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg"
              }
            ]
          },

          // 7. Small Cards
          {
            id: "coming_soon",
            title: "Coming Soon",
            type: "small_cards",
            items: [
              {
                id: 123,
                title: "Avatar 3",
                posterUrl: "https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg"
              },
              {
                id: 456,
                title: "GTA The Movie",
                posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
              }
            ]
          }
        ]
      }
    ];

    console.log("✅ Sending home sections");
    res.json(response);

  } catch (error) {
    console.error("❌ HOME SECTIONS API ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getHomeSections };
