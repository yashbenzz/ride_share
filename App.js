import React, { useState, useRef } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  MenuItem, 
  Tabs, 
  Tab, 
  Paper, 
  Alert, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  Autocomplete,
  ThemeProvider,
  createTheme,
  IconButton,
  AppBar,
  Toolbar,
  Container
} from '@mui/material';
import { 
  Brightness4, 
  Brightness7, 
  DirectionsCar, 
  Map, 
  LocationOn, 
  MyLocation,
  Search,
  Person,
  Help,
  Language
} from '@mui/icons-material';
import axios from 'axios';
import MapView from './components/MapView';

const MIT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@learner\.manipal\.edu$/;

// Predefined Bengaluru locations (keeping existing list)
const BENGALURU_LOCATIONS = [
  "Manipal Institute of Technology, Bengaluru",
  "Kempegowda International Airport (BLR)",
  "Bangalore City Railway Station (SBC)",
  "Yeshwantpur Railway Station (YPR)",
  "Krishnarajapuram Railway Station (KJM)",
  "Whitefield Railway Station (WFD)",
  "Bangalore Cantonment Railway Station (BNC)",
  "Yelahanka Railway Station (YLNK)",
  "Banaswadi Railway Station (BAND)",
  "Hebbal Railway Station (HEBL)",
  "Chikkabanavara Railway Station (BAW)",
  "Dodjala Railway Station (DJL)",
  "Nelamangala Railway Station (NMGA)",
  "Rajanukunte Railway Station (RNKT)",
  "Devanahalli Railway Station (DHL)",
  "Nandi Halt Railway Station (NDLH)",
  "Chikkaballapur Railway Station (CBP)",
  "Doddaballapur Railway Station (DBU)",
  "Yelahanka Junction Railway Station (YLNK)",
  "Baiyappanahalli Railway Station (BYPL)",
  "Hosur Road Railway Station (HSRA)",
  "Electronic City Railway Station (ELC)",
  "Heelalige Railway Station (HLE)",
  "Anekal Road Railway Station (AEK)",
  "Jigani Railway Station (JIG)",
  "Hosur Railway Station (HSR)",
  // Metro Stations - Purple Line
  "Baiyappanahalli Metro Station",
  "Swami Vivekananda Road Metro Station",
  "Indiranagar Metro Station",
  "Halasuru Metro Station",
  "Trinity Metro Station",
  "MG Road Metro Station",
  "Cubbon Park Metro Station",
  "Vidhana Soudha Metro Station",
  "Sir M Visveshwaraya Metro Station",
  "Majestic Metro Station",
  "City Railway Station Metro",
  "Magadi Road Metro Station",
  "Hosahalli Metro Station",
  "Vijayanagar Metro Station",
  "Attiguppe Metro Station",
  "Deepanjali Nagar Metro Station",
  "Mysore Road Metro Station",
  "Nayandahalli Metro Station",
  "Rajarajeshwari Nagar Metro Station",
  "Jnanabharathi Metro Station",
  "Pattanagere Metro Station",
  "Kengeri Town Metro Station",
  "Kengeri Bus Terminal Metro Station",
  "Challaghatta Metro Station",
  // Metro Stations - Green Line
  "Nagasandra Metro Station",
  "Dasarahalli Metro Station",
  "Jalahalli Metro Station",
  "Peenya Industry Metro Station",
  "Peenya Metro Station",
  "Goraguntepalya Metro Station",
  "Yeshwantpur Metro Station",
  "Sandal Soap Factory Metro Station",
  "Mahalakshmi Metro Station",
  "Rajajinagar Metro Station",
  "Kuvempu Road Metro Station",
  "Srirampura Metro Station",
  "Sampige Road Metro Station",
  "Majestic Metro Station (Green Line)",
  "Chickpet Metro Station",
  "Krishna Rajendra Market Metro Station",
  "National College Metro Station",
  "Lalbagh Metro Station",
  "South End Circle Metro Station",
  "Jayanagar Metro Station",
  "Rashtreeya Vidyalaya Road Metro Station",
  "Banashankari Metro Station",
  "JP Nagar Metro Station",
  "Yelachenahalli Metro Station",
  "Konanakunte Cross Metro Station",
  "Doddakallasandra Metro Station",
  "Vajarahalli Metro Station",
  "Talaghattapura Metro Station",
  "Silk Institute Metro Station",
  // Metro Stations - Blue Line
  "Kempegowda International Airport Metro Station",
  "Airport City Metro Station",
  "Jakkur Cross Metro Station",
  "Kodigehalli Metro Station",
  "Hebbal Metro Station",
  "Kempapura Metro Station",
  "Veerannapalya Metro Station",
  "Nagawara Metro Station",
  "Kadugodi Tree Park Metro Station",
  "Hopefarm Channasandra Metro Station",
  "Whitefield Metro Station",
  "Whitefield Kadugodi Metro Station",
  "Garudacharpalya Metro Station",
  "Singayyanapalya Metro Station",
  "Kundalahalli Metro Station",
  "Nallurhalli Metro Station",
  "Sri Sathya Sai Hospital Metro Station",
  "Pattandur Agrahara Metro Station",
  "Seetharamapalya Metro Station",
  "Hoodi Metro Station",
  "ITPL Metro Station",
  "Benniganahalli Metro Station",
  "KR Pura Metro Station",
  "Baiyappanahalli Metro Station (Blue Line)",
  "Mahadevapura Metro Station",
  "Garudachar Palya Metro Station",
  "Hoodi Junction Metro Station",
  "Seetharama Palya Metro Station",
  "Kundalahalli Gate Metro Station",
  "Nallur Halli Metro Station",
  "Sri Sathya Sai Medical College Metro Station",
  "Pattandur Agrahara Metro Station",
  "Seetharama Palya Metro Station",
  "Hoodi Metro Station",
  "ITPL Metro Station",
  "Benniganahalli Metro Station",
  "KR Pura Metro Station",
  "Baiyappanahalli Metro Station",
  "Mahadevapura Metro Station",
  // Metro Stations - Yellow Line
  "Rashtreeya Vidyalaya Road Metro Station (Yellow Line)",
  "Ragigudda Metro Station",
  "Jayadeva Metro Station",
  "JP Nagar 4th Phase Metro Station",
  "JP Nagar 3rd Phase Metro Station",
  "JP Nagar 1st Phase Metro Station",
  "Uttarahalli Metro Station",
  "Vajarahalli Metro Station",
  "Thalaghattapura Metro Station",
  "Anjanapura Metro Station",
  // Metro Stations - Pink Line
  "Kalena Agrahara Metro Station",
  "Hosa Road Metro Station",
  "Bellandur Metro Station",
  "Kadubeesanahalli Metro Station",
  "Doddanekkundi Metro Station",
  "Marathahalli Metro Station",
  "ISRO Metro Station",
  "HSR Layout Metro Station",
  "Silk Board Metro Station",
  "BTM Layout Metro Station",
  "JP Nagar Metro Station (Pink Line)",
  "Yelachenahalli Metro Station (Pink Line)",
  // Major Bus Stands and Transport Hubs
  "Kempegowda Bus Station (Majestic)",
  "Shantinagar Bus Station",
  "Electronic City Bus Station",
  "Whitefield Bus Station",
  "Hebbal Bus Station",
  "Yelahanka Bus Station",
  "Yeshwantpur Bus Station",
  "Peenya Bus Station",
  "Jayanagar Bus Station",
  "Banashankari Bus Station",
  "JP Nagar Bus Station",
  "HSR Layout Bus Station",
  "BTM Layout Bus Station",
  "Koramangala Bus Station",
  "Indiranagar Bus Station",
  "Domlur Bus Station",
  "Ulsoor Bus Station",
  "MG Road Bus Station",
  "Cubbon Park Bus Station",
  "Vidhana Soudha Bus Station",
  "Majestic Bus Station",
  "City Market Bus Station",
  "Shivajinagar Bus Station",
  "Frazer Town Bus Station",
  "Cox Town Bus Station",
  "Richmond Town Bus Station",
  "Langford Town Bus Station",
  "Wilson Garden Bus Station",
  "Adugodi Bus Station",
  "Seshadripuram Bus Station",
  "Sampangiramnagar Bus Station",
  "Gandhi Nagar Bus Station",
  "RT Nagar Bus Station",
  "Sanjay Nagar Bus Station",
  "Nagarbhavi Bus Station",
  "Kengeri Bus Station",
  "RR Nagar Bus Station",
  "Uttarahalli Bus Station",
  "Bilekahalli Bus Station",
  "Bommanahalli Bus Station",
  "Hosur Road Bus Station",
  "Silk Board Bus Station",
  "BTM Layout Bus Station",
  // Popular Areas and Landmarks
  "Koramangala",
  "Indiranagar",
  "HSR Layout",
  "Electronic City",
  "Whitefield",
  "Marathahalli",
  "Bellandur",
  "Sarjapur Road",
  "JP Nagar",
  "Banashankari",
  "Jayanagar",
  "Basavanagudi",
  "Malleshwaram",
  "Rajajinagar",
  "Vijayanagar",
  "Hebbal",
  "Yelahanka",
  "Yeshwanthpur",
  "Peenya",
  "Mysore Road",
  "Bannerghatta Road",
  "Kanakapura Road",
  "Airport Road",
  "Old Airport Road",
  "Domlur",
  "Ulsoor",
  "Lavelle Road",
  "MG Road",
  "Brigade Road",
  "Commercial Street",
  "Cubbon Park",
  "Vidhana Soudha",
  "Majestic",
  "City Market",
  "Chickpet",
  "Shivajinagar",
  "Frazer Town",
  "Cox Town",
  "Richmond Town",
  "Langford Town",
  "Wilson Garden",
  "Adugodi",
  "Seshadripuram",
  "Sampangiramnagar",
  "Gandhi Nagar",
  "RT Nagar",
  "Sanjay Nagar",
  "Nagarbhavi",
  "Kengeri",
  "RR Nagar",
  "Uttarahalli",
  "Bilekahalli",
  "Bommanahalli",
  "Hosur Road",
  "Silk Board",
  "BTM Layout",
  "BTM 1st Stage",
  "BTM 2nd Stage",
  "BTM Layout 2nd Stage",
  "BTM Layout 1st Stage",
  "BTM Layout 3rd Stage",
  "BTM Layout 4th Stage",
  "BTM Layout 5th Stage",
  "BTM Layout 6th Stage",
  "BTM Layout 7th Stage",
  "BTM Layout 8th Stage",
  "BTM Layout 9th Stage",
  "BTM Layout 10th Stage"
];

function RideMatchingApp({ user, theme, toggleTheme, onLogout }) {
  const [activeTab, setActiveTab] = useState(0);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableRides, setAvailableRides] = useState([]);
  const [userRides, setUserRides] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
    setError('');
    setMessage('');
  };

  const handleCreateRide = async (e) => {
    e.preventDefault();
    if (!pickup || !dropoff || !date || !time) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/users/rides', {
        userEmail: user.email,
        pickup: { address: pickup, lat: 0, lng: 0 },
        dropoff: { address: dropoff, lat: 0, lng: 0 },
        date,
        time
      });
      setMessage('Ride created successfully!');
      setPickup('');
      setDropoff('');
      setDate('');
      setTime('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create ride.');
      setMessage('');
    }
  };

  const handleSearchRides = async () => {
    if (!pickup || !dropoff || !date) {
      setError('Pickup, dropoff, and date are required.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/users/rides/search', {
        params: {
          pickup: JSON.stringify({ address: pickup, lat: 0, lng: 0 }),
          dropoff: JSON.stringify({ address: dropoff, lat: 0, lng: 0 }),
          date,
          userEmail: user.email
        }
      });
      setAvailableRides(response.data.rides);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to search rides.');
    }
  };

  const handleJoinRide = async (rideId) => {
    try {
      const response = await axios.post(`http://localhost:3001/users/rides/${rideId}/join`, {
        userEmail: user.email
      });
      setMessage('Successfully joined ride!');
      setError('');
      handleSearchRides();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to join ride.');
      setMessage('');
    }
  };

  const handleCancelRide = async (rideId) => {
    try {
      const response = await axios.post(`http://localhost:3001/users/rides/${rideId}/cancel`, {
        userEmail: user.email
      });
      setMessage(response.data.message);
      setError('');
      loadUserRides();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to cancel ride.');
      setMessage('');
    }
  };

  const loadUserRides = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/rides/user/${user.email}`);
      setUserRides(response.data.rides);
    } catch (err) {
      setError('Failed to load your rides.');
    }
  };

  React.useEffect(() => {
    if (activeTab === 2) {
      loadUserRides();
    }
  }, [activeTab]);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex',
      background: theme?.palette?.background?.default || '#000',
      transition: 'all 0.5s ease'
    }}>
      {/* Left Panel - Dark Content Area */}
      <Box sx={{ 
        flex: 1, 
        background: theme?.palette?.background?.default || '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: '1px solid #333',
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(10px)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              MITravel
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                Welcome, {user.name}!
              </Typography>
              <IconButton onClick={toggleTheme} sx={{ color: '#fff' }}>
                {theme?.palette?.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Button 
                onClick={onLogout}
                variant="outlined" 
                sx={{ 
                  borderColor: '#667eea', 
                  color: '#667eea',
                  '&:hover': { borderColor: '#fff', color: '#fff' }
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
          
          <Typography variant="h2" sx={{ 
            fontWeight: 700,
            fontSize: '3rem',
            mb: 1,
            transition: 'font-size 0.5s ease'
          }}>
            Go anywhere with MITravel
          </Typography>
          <Typography variant="h6" sx={{ 
            color: '#ccc',
            fontWeight: 400,
            mb: 4
          }}>
            Connect with fellow MIT students, share rides, and explore Bengaluru together.
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, p: 4 }}>
          {activeTab === 0 && (
            <Box>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Create a New Ride
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MyLocation sx={{ mr: 1, color: '#667eea' }} />
                  <Typography variant="body1" sx={{ color: '#ccc' }}>
                    Where are you starting from?
                  </Typography>
                </Box>
                <Autocomplete
                  options={BENGALURU_LOCATIONS}
                  value={pickup}
                  onChange={(event, newValue) => {
                    console.log('Pickup selected:', newValue);
                    setPickup(newValue || '');
                  }}
                  onInputChange={(event, newInputValue) => {
                    if (!newInputValue) {
                      setPickup('');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Enter pickup location"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: '#fff',
                          borderRadius: 2,
                          '& fieldset': { border: 'none' },
                          '&:hover fieldset': { border: 'none' },
                          '&.Mui-focused fieldset': { border: 'none' },
                          '& input': {
                            color: '#000',
                            fontSize: '1rem',
                            fontWeight: 500
                          }
                        },
                        '& .MuiInputLabel-root': {
                          color: '#666'
                        }
                      }}
                    />
                  )}
                  freeSolo
                  clearOnBlur={false}
                  selectOnFocus
                  handleHomeEndKeys
                  filterOptions={(options, { inputValue }) => {
                    const filtered = options.filter(option =>
                      option.toLowerCase().includes(inputValue.toLowerCase())
                    );
                    return filtered;
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ mr: 1, color: '#667eea' }} />
                  <Typography variant="body1" sx={{ color: '#ccc' }}>
                    Where are you heading?
                  </Typography>
                </Box>
                <Autocomplete
                  options={BENGALURU_LOCATIONS}
                  value={dropoff}
                  onChange={(event, newValue) => {
                    console.log('Dropoff selected:', newValue);
                    setDropoff(newValue || '');
                  }}
                  onInputChange={(event, newInputValue) => {
                    if (!newInputValue) {
                      setDropoff('');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Enter destination"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: '#fff',
                          borderRadius: 2,
                          '& fieldset': { border: 'none' },
                          '&:hover fieldset': { border: 'none' },
                          '&.Mui-focused fieldset': { border: 'none' },
                          '& input': {
                            color: '#000',
                            fontSize: '1rem',
                            fontWeight: 500
                          }
                        },
                        '& .MuiInputLabel-root': {
                          color: '#666'
                        }
                      }}
                    />
                  )}
                  freeSolo
                  clearOnBlur={false}
                  selectOnFocus
                  handleHomeEndKeys
                  filterOptions={(options, { inputValue }) => {
                    const filtered = options.filter(option =>
                      option.toLowerCase().includes(inputValue.toLowerCase())
                    );
                    return filtered;
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      background: '#fff',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: 'none' }
                    }
                  }}
                />
                <TextField
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      background: '#fff',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: 'none' }
                    }
                  }}
                />
              </Box>

              <Button
                onClick={handleCreateRide}
                variant="contained"
                fullWidth
                sx={{
                  background: '#fff',
                  color: '#000',
                  py: 2,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': { background: '#f0f0f0' }
                }}
              >
                Create Ride
              </Button>
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Find Available Rides
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Search sx={{ mr: 2, color: '#667eea', fontSize: '2rem' }} />
                  <Typography variant="h6" sx={{ color: '#ccc', fontWeight: 500 }}>
                    Search for rides to your destination
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MyLocation sx={{ mr: 1, color: '#667eea' }} />
                    <Typography variant="body1" sx={{ color: '#ccc' }}>
                      Where are you starting from?
                    </Typography>
                  </Box>
                  <Autocomplete
                    options={BENGALURU_LOCATIONS}
                    value={pickup}
                    onChange={(event, newValue) => {
                      console.log('Search pickup selected:', newValue);
                      setPickup(newValue || '');
                    }}
                    onInputChange={(event, newInputValue) => {
                      if (!newInputValue) {
                        setPickup('');
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Enter pickup location"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            background: '#fff',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover fieldset': { border: 'none' },
                            '&.Mui-focused fieldset': { border: 'none' },
                            '& input': {
                              color: '#000',
                              fontSize: '1rem',
                              fontWeight: 500
                            }
                          },
                          '& .MuiInputLabel-root': {
                            color: '#666'
                          }
                        }}
                      />
                    )}
                    freeSolo
                    clearOnBlur={false}
                    selectOnFocus
                    handleHomeEndKeys
                    filterOptions={(options, { inputValue }) => {
                      const filtered = options.filter(option =>
                        option.toLowerCase().includes(inputValue.toLowerCase())
                      );
                      return filtered;
                    }}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ mr: 1, color: '#667eea' }} />
                    <Typography variant="body1" sx={{ color: '#ccc' }}>
                      Where are you heading?
                    </Typography>
                  </Box>
                  <Autocomplete
                    options={BENGALURU_LOCATIONS}
                    value={dropoff}
                    onChange={(event, newValue) => {
                      console.log('Search dropoff selected:', newValue);
                      setDropoff(newValue || '');
                    }}
                    onInputChange={(event, newInputValue) => {
                      if (!newInputValue) {
                        setDropoff('');
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Enter destination"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            background: '#fff',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover fieldset': { border: 'none' },
                            '&.Mui-focused fieldset': { border: 'none' },
                            '& input': {
                              color: '#000',
                              fontSize: '1rem',
                              fontWeight: 500
                            }
                          },
                          '& .MuiInputLabel-root': {
                            color: '#666'
                          }
                        }}
                      />
                    )}
                    freeSolo
                    clearOnBlur={false}
                    selectOnFocus
                    handleHomeEndKeys
                    filterOptions={(options, { inputValue }) => {
                      const filtered = options.filter(option =>
                        option.toLowerCase().includes(inputValue.toLowerCase())
                      );
                      return filtered;
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body1" sx={{ color: '#ccc' }}>
                    When do you want to travel?
                  </Typography>
                </Box>
                <TextField
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      background: '#fff',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: 'none' }
                    }
                  }}
                />
              </Box>
              <Button
                onClick={handleSearchRides}
                variant="contained"
                fullWidth
                sx={{
                  background: '#fff',
                  color: '#000',
                  py: 2,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  mb: 4,
                  '&:hover': { background: '#f0f0f0' }
                }}
              >
                Search Rides
              </Button>

              {availableRides.length > 0 && (
                <Box>
                  <Typography variant="h6" sx={{ 
                    mb: 3, 
                    fontWeight: 600,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <DirectionsCar sx={{ color: '#667eea' }} />
                    Available Rides ({availableRides.length})
                  </Typography>
                  <Grid container spacing={3}>
                    {availableRides.map((ride) => (
                      <Grid item xs={12} key={ride.id}>
                        <Card sx={{ 
                          background: 'rgba(255,255,255,0.05)', 
                          border: '1px solid #333',
                          borderRadius: 3,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                            borderColor: '#667eea'
                          }
                        }}>
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ color: '#fff', mb: 2, fontWeight: 600 }}>
                                  {ride.pickup.address} → {ride.dropoff.address}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                  <Typography variant="body2" sx={{ color: '#ccc', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    📅 Date: {ride.date}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: '#ccc', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    🕒 Time: {ride.time}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: '#ccc', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    👤 Created by: {ride.creator}
                                  </Typography>
                                </Box>
                              </Box>
                              <Chip 
                                label={`${ride.riders.length}/4 riders`} 
                                color="primary" 
                                sx={{ 
                                  background: '#667eea',
                                  fontWeight: 600,
                                  fontSize: '0.9rem'
                                }}
                              />
                            </Box>
                            <Button
                              onClick={() => handleJoinRide(ride.id)}
                              variant="outlined"
                              fullWidth
                              sx={{ 
                                borderColor: '#667eea', 
                                color: '#667eea',
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 600,
                                '&:hover': { 
                                  borderColor: '#fff', 
                                  color: '#fff',
                                  background: 'rgba(102, 126, 234, 0.1)'
                                }
                              }}
                            >
                              Join Ride
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {availableRides.length === 0 && (
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 4,
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 3,
                  border: '1px solid #333'
                }}>
                  <DirectionsCar sx={{ fontSize: '4rem', color: '#667eea', mb: 2, opacity: 0.7 }} />
                  <Typography variant="h6" sx={{ color: '#ccc', mb: 1 }}>
                    No rides found
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    Try adjusting your search criteria or create a new ride
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                My Rides
              </Typography>
              
              {userRides.length > 0 ? (
                <Grid container spacing={2}>
                  {userRides.map((ride) => (
                    <Grid item xs={12} key={ride.id}>
                      <Card sx={{ 
                        background: 'rgba(255,255,255,0.05)', 
                        border: '1px solid #333',
                        borderRadius: 2
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                                {ride.pickup.address} → {ride.dropoff.address}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#ccc' }}>
                                Date: {ride.date} | Time: {ride.time}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#ccc' }}>
                                Status: {ride.status}
                              </Typography>
                            </Box>
                            <Chip 
                              label={`${ride.riders.length}/4 riders`} 
                              color="primary" 
                              sx={{ background: '#667eea' }}
                            />
                          </Box>
                          {ride.status === 'active' && (
                            <Button
                              onClick={() => handleCancelRide(ride.id)}
                              variant="outlined"
                              color="error"
                              sx={{ 
                                borderColor: '#f44336', 
                                color: '#f44336',
                                '&:hover': { borderColor: '#fff', color: '#fff' }
                              }}
                            >
                              {ride.creator === user.email ? 'Cancel Ride' : 'Leave Ride'}
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" sx={{ color: '#ccc', textAlign: 'center' }}>
                  No rides found. Create a new ride to get started!
                </Typography>
              )}
            </Box>
          )}

          {activeTab === 3 && (
            <MapView rides={[...availableRides, ...userRides]} theme={theme} />
          )}
        </Box>

        {/* Navigation Tabs */}
        <Box sx={{ 
          p: 3, 
          borderTop: '1px solid #333',
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(10px)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {[
              { label: 'Create Ride', icon: <DirectionsCar /> },
              { label: 'Search Rides', icon: <Search /> },
              { label: 'My Rides', icon: <Person /> },
              { label: 'Map View', icon: <Map /> }
            ].map((tab, index) => (
              <Button
                key={index}
                onClick={() => setActiveTab(index)}
                sx={{
                  color: activeTab === index ? '#667eea' : '#ccc',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  '&:hover': { color: '#667eea' }
                }}
              >
                {tab.icon}
                <Typography variant="caption">{tab.label}</Typography>
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right Panel - Vibrant Illustration */}
      <Box sx={{ 
        flex: 1, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        position: 'relative',
        display: { xs: 'none', md: 'block' },
        transition: 'all 0.5s ease'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#fff',
          textAlign: 'center',
          p: 4
        }}>
          <Box sx={{ 
            fontSize: '10rem', 
            mb: 2,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            transition: 'font-size 0.5s ease',
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-10px)' },
            }
          }}>
            🚗
          </Box>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            fontSize: '2.5rem',
            transition: 'font-size 0.5s ease'
          }}>
            Ride Together
          </Typography>
          <Typography variant="h6" sx={{ 
            opacity: 0.9,
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            fontSize: '1.2rem',
            transition: 'font-size 0.5s ease'
          }}>
            Connect with fellow MIT students and share your journey through Bengaluru
          </Typography>
          
          {/* Full-screen indicator */}
          {/* Removed full-screen indicator */}
        </Box>
      </Box>
    </Box>
  );
}

function AuthForm({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    registerNumber: '',
    name: '',
    gender: '',
    phone: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/login' : '/register';
      
      // Transform the data to match backend expectations
      const apiData = isLogin ? {
        email: formData.email,
        password: formData.password
      } : {
        regNo: formData.registerNumber,
        name: formData.name,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        password: formData.password
      };
      
      const response = await axios.post(`http://localhost:3001/users${endpoint}`, apiData);
      
      if (response.data.message) {
        if (isLogin && response.data.user) {
          onLogin(response.data.user);
        } else if (!isLogin) {
          // After successful registration, switch to login
          setIsLogin(true);
          setFormData({ ...formData, password: '' });
          setError('Registration successful! Please sign in.');
        }
      } else {
        setError(response.data.error || 'An error occurred');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex',
      background: '#000'
    }}>
      {/* Left Panel - Dark Content Area */}
      <Box sx={{ 
        flex: 1, 
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header */}
        <Box sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          p: 3,
          borderBottom: '1px solid #333',
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(10px)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              MITravel
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#ccc' }}>Help</Typography>
              <Typography variant="body2" sx={{ color: '#ccc' }}>EN</Typography>
            </Box>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          maxWidth: 400, 
          width: '100%',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 3,
          p: 4,
          border: '1px solid #333',
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="h4" sx={{ 
            mb: 1,
            textAlign: 'center',
            fontWeight: 700
          }}>
            {isLogin ? 'Welcome Back' : 'Join MITravel'}
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: 4,
            textAlign: 'center',
            color: '#ccc'
          }}>
            {isLogin ? 'Sign in to your account' : 'Create your account and start sharing rides'}
          </Typography>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <TextField
                  fullWidth
                  label="Manipal Register Number"
                  value={formData.registerNumber}
                  onChange={(e) => setFormData({...formData, registerNumber: e.target.value})}
                  required
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      background: '#fff',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: 'none' }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666'
                    }
                  }}
                />
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      background: '#fff',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: 'none' }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666'
                    }
                  }}
                />
                <TextField
                  fullWidth
                  select
                  label="Gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  required
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      background: '#fff',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: 'none' }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666'
                    }
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      background: '#fff',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: 'none' }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666'
                    }
                  }}
                />
              </>
            )}
            
            <TextField
              fullWidth
              label="Email (@learner.manipal.edu)"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  background: '#fff',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' }
                },
                '& .MuiInputLabel-root': {
                  color: '#666'
                }
              }}
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  background: '#fff',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' }
                },
                '& .MuiInputLabel-root': {
                  color: '#666'
                }
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background: '#fff',
                color: '#000',
                py: 2,
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                mb: 2,
                '&:hover': { background: '#f0f0f0' }
              }}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>

            <Button
              fullWidth
              variant="text"
              onClick={() => setIsLogin(!isLogin)}
              sx={{
                color: '#667eea',
                '&:hover': { background: 'rgba(102, 126, 234, 0.1)' }
              }}
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </Button>
          </form>
        </Box>
      </Box>

      {/* Right Panel - Vibrant Illustration */}
      <Box sx={{ 
        flex: 1, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        position: 'relative',
        display: { xs: 'none', md: 'block' }
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#fff',
          textAlign: 'center',
          p: 4
        }}>
          <Box sx={{ 
            fontSize: '8rem', 
            mb: 2,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}>
            🚗
          </Box>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Go anywhere with MITravel
          </Typography>
          <Typography variant="h6" sx={{ 
            opacity: 0.9,
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}>
            Connect with fellow MIT students, share rides, and explore Bengaluru together.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('dark');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const themeConfig = createTheme({
    palette: {
      mode,
      primary: {
        main: '#667eea',
      },
      secondary: {
        main: '#764ba2',
      },
      background: {
        default: mode === 'dark' ? '#000' : '#f8f9fa',
        paper: mode === 'dark' ? '#1e1e1e' : '#fff',
      },
    },
  });

  return (
    <ThemeProvider theme={themeConfig}>
      {user ? (
        <Box sx={{
          minHeight: '100vh',
          background: themeConfig.palette.background.default,
          transition: 'all 0.5s ease',
          position: 'relative'
        }}>
          <RideMatchingApp 
            user={user} 
            theme={themeConfig} 
            toggleTheme={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            onLogout={handleLogout}
          />
        </Box>
      ) : (
        <AuthForm onLogin={handleLogin} />
      )}
    </ThemeProvider>
  );
}
