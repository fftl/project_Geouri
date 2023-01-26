// import axios from "axios";
// import React, { useEffect, useState } from "react";
// function Youtube() {
//   const [playlist, setPlaylist] = useState([]);

//   useEffect(() => {
//     axios
//       .get(
//         "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&status=&playlistId=PLlrxD0HtieHi_bnhLrr-XdzY8mkA0B6AV&key=***REMOVED***"
//       )
//       .then((res) => {
//         console.log(res);
//         setPlaylist(res.data.items);
//       })
//       .catch(() => {});
//   }, []);
//   console.log(playlist);
// }

// export default Youtube;
