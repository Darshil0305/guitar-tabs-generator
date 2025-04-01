// Extract video ID from YouTube URL
export const extractVideoId = (url: string): string | null => {
  // Handle standard YouTube URL format
  const standardRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(standardRegex);
  
  return match ? match[1] : null;
};

// For dev/test - if we want to use the mock data instead of the API service
const USE_MOCK_DATA = false;  // Use the real API

// API endpoint for tab generation
const API_ENDPOINT = 'http://localhost:5000/api/generate-tabs';

// Get song information from video ID
export const getSongInfo = async (videoId: string) => {
  if (USE_MOCK_DATA) {
    // Mock data implementation (original code)
    return new Promise((resolve) => {
      setTimeout(() => {
        // Predefined songs for demo
        const songDatabase: Record<string, { title: string; artist: string }> = {
          'dQw4w9WgXcQ': { 
            title: 'Never Gonna Give You Up', 
            artist: 'Rick Astley' 
          },
          '1qU9RXQ3hPQ': { 
            title: 'Hotel California', 
            artist: 'Eagles' 
          },
          'EPfmNxkEaJc': { 
            title: 'Free Fallin', 
            artist: 'Tom Petty' 
          },
          'ZN_8B3xCgHM': { 
            title: 'Nothing Else Matters', 
            artist: 'Metallica' 
          },
          'YR5ApYxkU-U': { 
            title: 'Purple Haze', 
            artist: 'Jimi Hendrix' 
          },
        };
        
        // Lookup the song in our "database" or generate random info for other video IDs
        const song = songDatabase[videoId] || {
          title: `Song Title (ID: ${videoId})`,
          artist: 'Unknown Artist'
        };
        
        resolve({
          ...song,
          videoId
        });
      }, 1000); // Simulate network delay
    });
  } else {
    // Use the API endpoint - we'll get this info from the tab generation response
    // so this is just a placeholder to maintain interface compatibility
    return {
      title: `Loading... (ID: ${videoId})`,
      artist: 'Loading...',
      videoId
    };
  }
};

// Generate guitar tabs based on song and options
export const generateTabs = async (
  videoId: string, 
  useCapo: boolean, 
  isFingerStyle: boolean,
  useSourceSeparation: boolean = true
) => {
  if (USE_MOCK_DATA) {
    // Original mock implementation updated to match new API response format
    return new Promise((resolve) => {
      setTimeout(() => {
        const tabsDatabase: Record<string, { 
          standard: string; 
          capo: string;
          fingerstyle: string;
          fingerstyleCapo: string;
        }> = {
          // Rick Astley - Never Gonna Give You Up
          'dQw4w9WgXcQ': {
            standard: `
E|------------------------------|------------------------------|
B|------------------------------|------------------------------|
G|------------------------------|------------------------------|
D|--2--2--4--2--0--------------|--2--2--4--2--0--------------|
A|------------------2--0--------|------------------2--0--------|
E|------------------------------|------------------------------|

E|------------------------------|------------------------------|
B|------------------------------|------------------------------|
G|------------------------------|------------------------------|
D|--2--2--4--2--0--------------|--2--2--4--2--0--------------|
A|------------------2--0--------|------------------2--0--------|
E|------------------------------|------------------------------|

Never gonna give you up, never gonna let you down
          `,
            capo: `
E|------------------------------|------------------------------|
B|------------------------------|------------------------------|
G|------------------------------|------------------------------|
D|--0--0--2--0-----------------|--0--0--2--0-----------------|
A|----------------3--2--0-------|----------------3--2--0-------|
E|------------------------------|------------------------------|

E|------------------------------|------------------------------|
B|------------------------------|------------------------------|
G|------------------------------|------------------------------|
D|--0--0--2--0-----------------|--0--0--2--0-----------------|
A|----------------3--2--0-------|----------------3--2--0-------|
E|------------------------------|------------------------------|

Never gonna give you up, never gonna let you down
Capo on 2nd fret
          `,
            fingerstyle: `
E|------------------------------|------------------------------|
B|------------------------------|------------------------------|
G|----4--2--0--------------------|----4--2--0--------------------|
D|--2--------------2--0---------|--2--------------2--0---------|
A|------------------2------------|------------------2------------|
E|--0---------------------------|--0---------------------------|

E|------------------------------|------------------------------|
B|------------------------------|------------------------------|
G|----4--2--0--------------------|----4--2--0--------------------|
D|--2--------------2--0---------|--2--------------2--0---------|
A|------------------2------------|------------------2------------|
E|--0---------------------------|--0---------------------------|

Never gonna give you up, never gonna let you down
          `,
            fingerstyleCapo: `
E|------------------------------|------------------------------|
B|------------------------------|------------------------------|
G|----2--0----------------------|----2--0----------------------|
D|--0--------------0------------|--0--------------0------------|
A|------------------3--2--0-----|------------------3--2--0-----|
E|------------------------------|------------------------------|

E|------------------------------|------------------------------|
B|------------------------------|------------------------------|
G|----2--0----------------------|----2--0----------------------|
D|--0--------------0------------|--0--------------0------------|
A|------------------3--2--0-----|------------------3--2--0-----|
E|------------------------------|------------------------------|

Never gonna give you up, never gonna let you down
Capo on 2nd fret
          `
          },
          // Default tab for any other video
          'default': {
            standard: `
E|----0-----0-----0-----0-------|----0-----0-----0-----0-------|
B|----1-----1-----1-----1-------|----1-----1-----1-----1-------|
G|----0-----0-----0-----0-------|----0-----0-----0-----0-------|
D|----2-----2-----2-----2-------|----2-----2-----2-----2-------|
A|----3-----3-----3-----3-------|----3-----3-----3-----3-------|
E|-----------------------------|-----------------------------|

E|----3-----3-----3-----3-------|----3-----3-----3-----3-------|
B|----0-----0-----0-----0-------|----0-----0-----0-----0-------|
G|----0-----0-----0-----0-------|----0-----0-----0-----0-------|
D|----0-----0-----0-----0-------|----0-----0-----0-----0-------|
A|----2-----2-----2-----2-------|----2-----2-----2-----2-------|
E|----3-----3-----3-----3-------|----3-----3-----3-----3-------|

Strumming Pattern: D DU UDU (Down, Down-Up, Up-Down-Up)
          `,
            capo: `
E|----0-----0-----0-----0-------|----0-----0-----0-----0-------|
B|----1-----1-----1-----1-------|----1-----1-----1-----1-------|
G|----0-----0-----0-----0-------|----0-----0-----0-----0-------|
D|----2-----2-----2-----2-------|----2-----2-----2-----2-------|
A|----3-----3-----3-----3-------|----3-----3-----3-----3-------|
E|-----------------------------|-----------------------------|

E|----3-----3-----3-----3-------|----3-----3-----3-----3-------|
B|----0-----0-----0-----0-------|----0-----0-----0-----0-------|
G|----0-----0-----0-----0-------|----0-----0-----0-----0-------|
D|----0-----0-----0-----0-------|----0-----0-----0-----0-------|
A|----2-----2-----2-----2-------|----2-----2-----2-----2-------|
E|----3-----3-----3-----3-------|----3-----3-----3-----3-------|

Strumming Pattern: D DU UDU (Down, Down-Up, Up-Down-Up)
Capo on 2nd fret
          `,
            fingerstyle: `
E|--0--------0-------------------|--0--------0-------------------|
B|------1--------1--------------|------1--------1--------------|
G|----------0--------0----------|----------0--------0----------|
D|-----------------------------|-----------------------------|
A|-----------------------------|-----------------------------|
E|--3--------3--------3---------|--3--------3--------3---------|

E|--3--------3-------------------|--3--------3-------------------|
B|------0--------0--------------|------0--------0--------------|
G|----------0--------0----------|----------0--------0----------|
D|----------0--------0----------|----------0--------0----------|
A|-----------------------------|-----------------------------|
E|--3--------3--------3---------|--3--------3--------3---------|

Thumb plays bass notes (low E, A), fingers play melody
          `,
            fingerstyleCapo: `
E|--0--------0-------------------|--0--------0-------------------|
B|------1--------1--------------|------1--------1--------------|
G|----------0--------0----------|----------0--------0----------|
D|-----------------------------|-----------------------------|
A|-----------------------------|-----------------------------|
E|--3--------3--------3---------|--3--------3--------3---------|

E|--3--------3-------------------|--3--------3-------------------|
B|------0--------0--------------|------0--------0--------------|
G|----------0--------0----------|----------0--------0----------|
D|----------0--------0----------|----------0--------0----------|
A|-----------------------------|-----------------------------|
E|--3--------3--------3---------|--3--------3--------3---------|

Thumb plays bass notes (low E, A), fingers play melody
Capo on 2nd fret
          `
          }
        };
        
        // Get the appropriate tab based on the options
        const tabSet = tabsDatabase[videoId] || tabsDatabase['default'];
        
        let tabContent = '';
        let strummingPattern = '';
        
        if (useCapo && isFingerStyle) {
          tabContent = tabSet.fingerstyleCapo;
          strummingPattern = "N/A (Fingerstyle with Capo)";
        } else if (useCapo && !isFingerStyle) {
          tabContent = tabSet.capo;
          strummingPattern = "D DU UDU (Down, Down-Up, Up-Down-Up)";
        } else if (!useCapo && isFingerStyle) {
          tabContent = tabSet.fingerstyle;
          strummingPattern = "N/A (Fingerstyle)";
        } else {
          tabContent = tabSet.standard;
          strummingPattern = "D DU UDU (Down, Down-Up, Up-Down-Up)";
        }
        
        // Return in the same format as the API
        resolve({
          tabContent,
          strummingPattern
        });
      }, 2000); // Simulate the tab generation processing time
    });
  } else {
    // Use the actual API endpoint to generate tabs
    try {
      console.log('Starting API request for video:', videoId);
      
      // Check if API is reachable first
      try {
        const healthCheck = await fetch('http://localhost:5000/api/health', { 
          method: 'GET',
          mode: 'cors'
        });
        if (!healthCheck.ok) {
          throw new Error(`API health check failed: ${healthCheck.status}`);
        }
        console.log('API health check passed');
      } catch (healthError: any) {
        console.error('API health check failed:', healthError);
        throw new Error(`Cannot reach the API server. Ensure the Flask server is running at http://localhost:5000. Error: ${healthError.message}`);
      }
      
      // Construct the URL to use for tab generation
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const requestBody = {
        url: videoUrl,
        use_capo: useCapo,
        is_fingerstyle: isFingerStyle,
        use_source_separation: useSourceSeparation
      };
      
      console.log('Making tab generation request with body:', requestBody);
      
      // Make a POST request to the API
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(requestBody),
      });
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error text:', errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      console.log('API response received, parsing JSON...');
      const data = await response.json();
      console.log('API response data:', data);
      
      // Validate the response structure
      if (!data || !data.tabs || typeof data.tabs.tab_content !== 'string' || !data.song_details) {
        throw new Error('Invalid API response format');
      }
      
      // Update song details globally (since the API gives more accurate info)
      const songEvent = new CustomEvent('song-details-updated', { 
        detail: {
          title: data.song_details.title || 'Unknown Song',
          artist: data.song_details.artist || 'Unknown Artist',
          videoId: data.song_details.videoId || videoId,
        }
      });
      window.dispatchEvent(songEvent);
      
      // Return the tab content AND strumming pattern for display
      return {
        tabContent: data.tabs.tab_content,
        strummingPattern: data.tabs.strumming_pattern || "Not available"
      };
    } catch (error: any) {
      console.error('Error generating tabs:', error);
      // Switch to mock data if API fails
      console.log('Falling back to mock data due to API error');
      // Return a custom error message as tab content
      return {
        tabContent: `
E|----------------------------------|
B|----------------------------------|
G|----------------------------------|
D|----------------------------------|
A|----------------------------------|
E|----------------------------------|

ERROR CONNECTING TO API:
${error.message}

Please make sure:
1. The Flask server is running at http://localhost:5000
2. FFmpeg is installed and in your system PATH
3. There are no CORS issues with your browser
`,
        strummingPattern: "Not available"
      };
    }
  }
}; 