// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyAIi0Qlg3-wbuaPXUQFPl2YtpeDqPRnT-Q",
  apiKey: "import.meta.env.VITE_FIREBASE_API_KEY",
  authDomain: "btechbabaiii.firebaseapp.com",
  databaseURL: "https://btechbabaiii-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "btechbabaiii",
  storageBucket: "btechbabaiii.appspot.com",
  messagingSenderId: "87207859004",
  appId: "1:87207859004:web:3fdc0b7b4e199031d24439",
  measurementId: "G-W2KY8M4DLQ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Retrieve URL parameters
const urlParams = new URLSearchParams(window.location.search);
const college = urlParams.get('college');
const semester = urlParams.get('semester');
const branch = urlParams.get('branch');

// Fetch data from Firebase
fetchData(college, semester, branch);

function fetchData(college, semester, branch) {
  const path = `${college}/${branch}/${semester}`;
  const dbRef = database.ref(path);

  dbRef.get().then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      displayResults(data);
    } else {
      console.log("No data available for this selection");
      displayNoResults();
    }
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
}

// Function to display results
function displayResults(data) {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = ''; // Clear previous results
  
  data.forEach(item => {
    const resultHTML = `
              <div class="rounded-lg border bg-gray-900 text-white p-4 shadow-sm">
                <h3 class="text-2xl font-bold mb-2">${item.subject}</h3>
                <p class="mb-2">Previous Year:<a href="${item.pdfUrl}" class="text-blue-400" target="_blank">Download</a></p>
                <p class="mb-2">Chapter 1 <a href="${item.chap1}" class="text-blue-400" target="_blank">Download</a></p>
                <p class="mb-2">Chapter 2 <a href="${item.chap2}" class="text-blue-400" target="_blank">Download</a></p>
                <p class="mb-2">Chapter 3 <a href="${item.chap3}" class="text-blue-400" target="_blank">Download</a></p>
                <p class="mb-2">Chapter 4 <a href="${item.chap4}" class="text-blue-400" target="_blank">Download</a></p>
                <p class="mb-2">Chapter 5 <a href="${item.chap5}" class="text-blue-400" target="_blank">Download</a></p>
                <p>YouTube Playlist: <a href="${item.youtubePlaylist}" class="text-blue-400" target="_blank">Watch</a></p>
              </div>`;
    resultsContainer.innerHTML += resultHTML;
  });
}

// Function to display no results
function displayNoResults() {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '<p class="text-xl text-gray-300">No results found for the selected options.</p>';
}
