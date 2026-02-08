require("dotenv").config();

const express = require("express");
const cors = require("cors");

const homeRoutes = require("./routes/home.route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("✅ BookMyShow Backend Running");
});

// Orders endpoint - returns array of orders directly
app.get('/orders', (req, res) => {
  const orders = [
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
  ];
  
  res.json(orders);
});

// Home API
app.use("/", homeRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
