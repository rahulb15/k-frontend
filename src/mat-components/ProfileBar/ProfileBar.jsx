/* eslint-disable */

// import React, { Fragment, useEffect, useState } from 'react';
// import { Avatar, Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
// import Link from 'next/link';
// import { ImProfile } from 'react-icons/im';
// import { IoLogOut } from 'react-icons/io5';
// import { MdLaunch } from 'react-icons/md';
// import { useAccountContext } from 'src/contexts';
// import { useWalletConnectClient } from 'src/contexts/WalletConnectContext';
// import userService from 'src/services/user.service';
// import { motion } from 'framer-motion';

// const sideNavWidth = 280;

// const MotionListItem = motion(ListItem);
// const MotionAvatar = motion(Avatar);

// const listItemVariants = {
//   hidden: { opacity: 0, x: -20 },
//   visible: { opacity: 1, x: 0 },
//   hover: {
//     scale: 1.05,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     transition: { duration: 0.2 }
//   }
// };

// const avatarVariants = {
//   hidden: { scale: 0.8, opacity: 0 },
//   visible: { scale: 1, opacity: 1 },
// };

// const CustomListItem = ({ href, icon: Icon, text, onClick }) => (
//   <Link href={href || '#'} passHref>
//     <MotionListItem
//       button
//       component="a"
//       variants={listItemVariants}
//       initial="hidden"
//       animate="visible"
//       whileHover="hover"
//       whileTap={{ scale: 0.95 }}
//       onClick={onClick}
//       sx={{
//         mb: 2,
//         borderRadius: '12px',
//         position: 'relative',
//         overflow: 'hidden',
//         '&::before': {
//           content: '""',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
//           transform: 'translateX(-100%)',
//           transition: 'transform 0.3s ease-out',
//         },
//         '&:hover::before': {
//           transform: 'translateX(100%)',
//         },
//       }}
//     >
//       <ListItemIcon>
//         <Icon color="#f6f6f6" size={24} />
//       </ListItemIcon>
//       <ListItemText
//         primary={text}
//         primaryTypographyProps={{
//           fontSize: '1.2rem',
//           fontWeight: 'medium',
//         }}
//       />
//     </MotionListItem>
//   </Link>
// );

// export default function ProfileBar({ container }) {
//   const [panelOpen, setPanelOpen] = useState(false);
//   const account = useAccountContext();
//   const { disconnect } = useWalletConnectClient();

//   const handleDrawerToggle = () => setPanelOpen(!panelOpen);

//   const logout = async () => {
//     const response = await userService.logout();
//     console.log(response, 'response');
//     account.logoutWalletConnect();
//     disconnect();
//   };

//   const getUser = async () => {
//     const response = await userService.getUserInit();
//     if (response?.data?.status === 'success') {
//       localStorage.setItem('token', response?.data?.token);
//       await account.authWalletConnect(response?.data?.data.walletAddress);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   return (
//     <Fragment>
//       <IconButton onClick={handleDrawerToggle}>
//         <Avatar
//           src={account?.user?.profileImage || '/assets-images/client-logo3.png'}
//           alt="user photo"
//           sx={{ cursor: 'pointer', width: 42, height: 42 }}
//         />
//       </IconButton>

//       <Drawer
//         container={container}
//         variant="temporary"
//         anchor="right"
//         open={panelOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: sideNavWidth,
//             background: '#21210b',
//             color: '#f6f6f6',
//             boxShadow: '0 0 15px rgba(0,0,0,0.5)',
//           },
//         }}
//       >
//         <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', py: 4, px: 2 }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
//             <MotionAvatar
//               src={account?.user?.profileImage || '/assets-images/client-logo3.png'}
//               alt="user photo"
//               sx={{ width: 120, height: 120, mb: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
//               variants={avatarVariants}
//               initial="hidden"
//               animate="visible"
//               transition={{ duration: 0.5 }}
//             />
//             <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
//               {account?.user?.name || 'User'}
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 2, wordBreak: 'break-all', textAlign: 'center', opacity: 0.8 }}>
//               {`${account.walletAddressContect.slice(0, 6)}...${account.walletAddressContect.slice(-4)}`}
//             </Typography>
//           </Box>

//           <Divider sx={{ bgcolor: 'rgba(246, 246, 246, 0.2)', mb: 3 }} />

//           <List sx={{ flexGrow: 1 }}>
//             <CustomListItem href="/author" icon={ImProfile} text="Profile" />
//             <CustomListItem href="/launchpad-list" icon={MdLaunch} text="My Launchpad" />
//             <CustomListItem icon={IoLogOut} text="Logout" onClick={logout} />
//           </List>
//         </Box>
//       </Drawer>
//     </Fragment>
//   );
// }

// import React, { Fragment, useEffect, useState } from 'react';
// import { Avatar, Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
// import Link from 'next/link';
// import { ImProfile } from 'react-icons/im';
// import { IoLogOut } from 'react-icons/io5';
// import { MdLaunch } from 'react-icons/md';
// import { useAccountContext } from 'src/contexts';
// import { useWalletConnectClient } from 'src/contexts/WalletConnectContext';
// import userService from 'src/services/user.service';
// import { motion } from 'framer-motion';

// const sideNavWidth = 280;

// const MotionListItem = motion(ListItem);
// const MotionAvatar = motion(Avatar);
// const MotionBox = motion(Box);

// const listItemVariants = {
//   hidden: { opacity: 0, x: -20 },
//   visible: { opacity: 1, x: 0 },
//   hover: {
//     scale: 1.05,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     transition: { duration: 0.2 }
//   }
// };

// const avatarVariants = {
//   hidden: { scale: 0.8, opacity: 0, y: 50 },
//   visible: { scale: 1, opacity: 1, y: 0 },
// };

// const CustomListItem = ({ href, icon: Icon, text, onClick }) => (
//   <Link href={href || '#'} passHref>
//     <MotionListItem
//       button
//       component="a"
//       variants={listItemVariants}
//       initial="hidden"
//       animate="visible"
//       whileHover="hover"
//       whileTap={{ scale: 0.95 }}
//       onClick={onClick}
//       sx={{
//         mb: 2,
//         borderRadius: '12px',
//         position: 'relative',
//         overflow: 'hidden',
//         '&::before': {
//           content: '""',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
//           transform: 'translateX(-100%)',
//           transition: 'transform 0.3s ease-out',
//         },
//         '&:hover::before': {
//           transform: 'translateX(100%)',
//         },
//       }}
//     >
//       <ListItemIcon>
//         <Icon color="#f6f6f6" size={24} />
//       </ListItemIcon>
//       <ListItemText
//         primary={text}
//         primaryTypographyProps={{
//           fontSize: '1.2rem',
//           fontWeight: 'medium',
//         }}
//       />
//     </MotionListItem>
//   </Link>
// );

// export default function ProfileBar({ container }) {
//   const [panelOpen, setPanelOpen] = useState(false);
//   const account = useAccountContext();
//   const { disconnect } = useWalletConnectClient();

//   const handleDrawerToggle = () => setPanelOpen(!panelOpen);

//   const logout = async () => {
//     const response = await userService.logout();
//     console.log(response, 'response');
//     account.logoutWalletConnect();
//     disconnect();
//   };

//   const getUser = async () => {
//     const response = await userService.getUserInit();
//     if (response?.data?.status === 'success') {
//       localStorage.setItem('token', response?.data?.token);
//       await account.authWalletConnect(response?.data?.data.walletAddress);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   return (
//     <Fragment>
//       <IconButton onClick={handleDrawerToggle}>
//         <Avatar
//           src={account?.user?.profileImage || '/assets-images/client-logo3.png'}
//           alt="user photo"
//           sx={{ cursor: 'pointer', width: 42, height: 42 }}
//         />
//       </IconButton>

//       <Drawer
//         container={container}
//         variant="temporary"
//         anchor="right"
//         open={panelOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: sideNavWidth,
//             background: '#21210b',
//             color: '#f6f6f6',
//             boxShadow: '0 0 15px rgba(0,0,0,0.5)',
//           },
//         }}
//       >
//         <MotionBox
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           sx={{
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <Box
//             sx={{
//               height: '200px',
//               position: 'relative',
//               overflow: 'hidden',
//               '&::after': {
//                 content: '""',
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 height: '50%',
//                 background: 'linear-gradient(to top, #21210b, transparent)',
//               },
//             }}
//           >
//             <Box
//               component="img"
//               src={account?.user?.coverImage || '/assets-images/default-cover.jpg'}
//               alt="Cover"
//               sx={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//               }}
//             />
//           </Box>

//           <Box sx={{ mt: '-50px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
//             <MotionAvatar
//               src={account?.user?.profileImage || '/assets-images/client-logo3.png'}
//               alt="user photo"
//               sx={{
//                 width: 100,
//                 height: 100,
//                 border: '4px solid #21210b',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
//               }}
//               variants={avatarVariants}
//               initial="hidden"
//               animate="visible"
//               transition={{ duration: 0.5, delay: 0.2 }}
//             />
//             <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
//               {account?.user?.name || 'User'}
//             </Typography>
//             <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
//               {`${account.walletAddressContect.slice(0, 6)}...${account.walletAddressContect.slice(-4)}`}
//             </Typography>
//           </Box>

//           <Divider sx={{ my: 3, bgcolor: 'rgba(246, 246, 246, 0.2)' }} />

//           <List sx={{ flexGrow: 1, px: 2 }}>
//             <CustomListItem href="/author" icon={ImProfile} text="Profile" />
//             <CustomListItem href="/launchpad-list" icon={MdLaunch} text="My Launchpad" />
//             <CustomListItem icon={IoLogOut} text="Logout" onClick={logout} />
//           </List>
//         </MotionBox>
//       </Drawer>
//     </Fragment>
//   );
// }

// import React, { Fragment, useEffect, useState, useRef } from 'react';
// import { Avatar, Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Slider, Paper } from '@mui/material';
// import Link from 'next/link';
// import { ImProfile } from 'react-icons/im';
// import { IoLogOut } from 'react-icons/io5';
// import { MdLaunch } from 'react-icons/md';
// import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeMute, FaVolumeUp, FaRandom, FaRedoAlt } from 'react-icons/fa';
// import { useAccountContext } from 'src/contexts';
// import { useWalletConnectClient } from 'src/contexts/WalletConnectContext';
// import userService from 'src/services/user.service';
// import { motion } from 'framer-motion';

// const sideNavWidth = 280;

// const MotionListItem = motion(ListItem);
// const MotionAvatar = motion(Avatar);
// const MotionBox = motion(Box);

// const listItemVariants = {
//   hidden: { opacity: 0, x: -20 },
//   visible: { opacity: 1, x: 0 },
//   hover: {
//     scale: 1.05,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     transition: { duration: 0.2 }
//   }
// };

// const avatarVariants = {
//   hidden: { scale: 0.8, opacity: 0, y: 50 },
//   visible: { scale: 1, opacity: 1, y: 0 },
// };

// const CustomListItem = ({ href, icon: Icon, text, onClick }) => (
//   <Link href={href || '#'} passHref>
//     <MotionListItem
//       button
//       component="a"
//       variants={listItemVariants}
//       initial="hidden"
//       animate="visible"
//       whileHover="hover"
//       whileTap={{ scale: 0.95 }}
//       onClick={onClick}
//       sx={{
//         mb: 2,
//         borderRadius: '12px',
//         position: 'relative',
//         overflow: 'hidden',
//         '&::before': {
//           content: '""',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
//           transform: 'translateX(-100%)',
//           transition: 'transform 0.3s ease-out',
//         },
//         '&:hover::before': {
//           transform: 'translateX(100%)',
//         },
//       }}
//     >
//       <ListItemIcon>
//         <Icon color="#f6f6f6" size={24} />
//       </ListItemIcon>
//       <ListItemText
//         primary={text}
//         primaryTypographyProps={{
//           fontSize: '1.2rem',
//           fontWeight: 'medium',
//         }}
//       />
//     </MotionListItem>
//   </Link>
// );
// const playlist = [
//     { id: 1, title: "Sunflower", artist: "Post Malone, Swae Lee", duration: 180, cover: "/audio/spiderman.jpeg", file: "/audio/song1.mp3" },
//     { id: 2, title: "Shape-of-You", artist: "Ed Sheeran", duration: 210, cover: "/audio/Shape-of-You.jpg", file: "/audio/song2.mp3" },
//     { id: 3, title: "Give Me Everything", artist: "Pitbull", duration: 195, cover: "/audio/tonight-pitbull.jpeg", file: "/audio/song3.mp3" },
//   ];

//   const MusicPlayer = () => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//     const [volume, setVolume] = useState(1);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isLooping, setIsLooping] = useState(false);

//     const audioRef = useRef(null);
//     const currentTrack = playlist[currentTrackIndex];

//     const formatTime = (time) => {
//       const minutes = Math.floor(time / 60);
//       const seconds = Math.floor(time % 60);
//       return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//     };

//     const handlePlayPause = () => {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     };

//     const handlePrevious = () => {
//       setCurrentTrackIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : playlist.length - 1));
//     };

//     const handleNext = () => {
//       setCurrentTrackIndex((prevIndex) => (prevIndex < playlist.length - 1 ? prevIndex + 1 : 0));
//     };

//     const handleVolumeChange = (event, newValue) => {
//         // Ensure that newValue is a valid finite number
//         if (typeof newValue === 'number' && isFinite(newValue)) {
//           setVolume(newValue);
//           audioRef.current.volume = newValue;
//           setIsMuted(newValue === 0);
//         } else {
//           console.error("Invalid volume value:", newValue);
//         }
//       };

//     const toggleMute = () => {
//       setIsMuted(!isMuted);
//       audioRef.current.volume = isMuted ? volume : 0;
//     };

//     const handleTimeUpdate = () => {
//       setCurrentTime(audioRef.current.currentTime);
//     };

//     const handleSeek = (event, newValue) => {
//       audioRef.current.currentTime = newValue;
//       setCurrentTime(newValue);
//     };

//     const toggleLoop = () => {
//       setIsLooping(!isLooping);
//       audioRef.current.loop = !isLooping;
//     };

//     useEffect(() => {
//       audioRef.current.src = currentTrack.file;
//       if (isPlaying) {
//         audioRef.current.play();
//       }
//     }, [currentTrackIndex]);

//     const ControlButton = ({ icon: Icon, onClick, isActive = false }) => (
//       <IconButton
//         sx={{
//           color: 'white',
//           padding: '4px',
//           '&:hover': {
//             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//           },
//           transition: 'all 0.3s ease',
//         }}
//         onClick={onClick}
//       >
//         <Icon color={isActive ? '#1db954' : 'white'} size={16} />
//       </IconButton>
//     );

//     return (
//       <Paper elevation={3} sx={{
//         p: 1,
//         borderRadius: '12px',
//         background: 'linear-gradient(45deg, #1e1e1e, #2a2a2a)',
//         color: 'white',
//         width: '100%',
//         maxWidth: '300px',
//       }}>
//         <Box
//           sx={{
//             width: '100%',
//             height: '200px', // Adjusted for better visibility
//             position: 'relative',
//             overflow: 'hidden',
//             borderRadius: '8px',
//             mb: 1,
//           }}
//         >
//           <Box
//             component="img"
//             src={currentTrack.cover}
//             alt={`${currentTrack.title} cover`}
//             sx={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover',
//             }}
//           />
//         </Box>
//         <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'bold', mb: 0.5 }}>{currentTrack.title}</Typography>
//         <Typography variant="caption" noWrap sx={{ mb: 1, opacity: 0.8, display: 'block' }}>{currentTrack.artist}</Typography>

//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//           <Typography variant="caption" sx={{ mr: 1 }}>{formatTime(currentTime)}</Typography>
//           <Slider
//             size="small"
//             value={currentTime}
//             max={currentTrack.duration}
//             onChange={handleSeek}
//             sx={{
//               color: '#1db954',
//               flexGrow: 1,
//               mx: 1,
//               '& .MuiSlider-thumb': {
//                 width: 8,
//                 height: 8,
//               },
//             }}
//           />
//           <Typography variant="caption" sx={{ ml: 1 }}>{formatTime(currentTrack.duration)}</Typography>
//         </Box>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Box sx={{ display: 'flex' }}>
//             <ControlButton icon={FaStepBackward} onClick={handlePrevious} />
//             <IconButton
//               sx={{
//                 color: 'white',
//                 mx: 1,
//                 width: 32,
//                 height: 32,
//                 backgroundColor: '#1db954',
//                 '&:hover': {
//                   backgroundColor: '#1ed760',
//                 },
//               }}
//               onClick={handlePlayPause}
//             >
//               {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
//             </IconButton>
//             <ControlButton icon={FaStepForward} onClick={handleNext} />
//           </Box>
//           {/* <Box sx={{ display: 'flex' }}>
//             <ControlButton icon={FaRedoAlt} onClick={toggleLoop} isActive={isLooping} />
//           </Box> */}
//         </Box>

//         <Box
//   sx={{
//     display: 'flex',
//     alignItems: 'center',
//     mt: 1,
//     overflow: 'hidden', // Prevent overflow
//     width: '100%', // Ensure it doesn't cause horizontal scrolling
//   }}
// >
//   <ControlButton
//     icon={isMuted ? FaVolumeMute : FaVolumeUp}
//     onClick={toggleMute}
//   />
//   {/* <Slider
//     size="small"
//     value={isMuted ? 0 : volume}
//     min={0}
//     max={1}
//     step={0.1}
//     onChange={handleVolumeChange}
//     sx={{
//       color: '#1db954',
//       flexGrow: 1,
//       ml: 1,
//       '& .MuiSlider-thumb': {
//         width: 6, // Reduced thumb size
//         height: 6, // Reduced thumb size
//       },
//       '& .MuiSlider-rail, .MuiSlider-track': {
//         height: 4, // Reduced slider height
//       },
//     }}
//   /> */}
// </Box>

//         <audio
//           ref={audioRef}
//           onTimeUpdate={handleTimeUpdate}
//           onEnded={handleNext}
//         />
//       </Paper>
//     );
//   };

// export default function ProfileBar({ container }) {
//   const [panelOpen, setPanelOpen] = useState(false);
//   const account = useAccountContext();
//   const { disconnect } = useWalletConnectClient();

//   const handleDrawerToggle = () => setPanelOpen(!panelOpen);

//   const logout = async () => {
//     const response = await userService.logout();
//     console.log(response, 'response');
//     account.logoutWalletConnect();
//     disconnect();
//   };

//   const getUser = async () => {
//     const response = await userService.getUserInit();
//     if (response?.data?.status === 'success') {
//       localStorage.setItem('token', response?.data?.token);
//       await account.authWalletConnect(response?.data?.data.walletAddress);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   return (
//     <Fragment>
//       <IconButton onClick={handleDrawerToggle}>
//         <Avatar
//           src={account?.user?.profileImage || '/assets-images/client-logo3.png'}
//           alt="user photo"
//           sx={{ cursor: 'pointer', width: 42, height: 42 }}
//         />
//       </IconButton>

//       <Drawer
//         container={container}
//         variant="temporary"
//         anchor="right"
//         open={panelOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: sideNavWidth,
//             background: '#21210b',
//             color: '#f6f6f6',
//             boxShadow: '0 0 15px rgba(0,0,0,0.5)',
//           },
//         }}
//       >
//         <MotionBox
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           sx={{
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <Box
//             sx={{
//               height: '200px',
//               position: 'relative',
//               overflow: 'hidden',
//               '&::after': {
//                 content: '""',
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 height: '50%',
//                 background: 'linear-gradient(to top, #21210b, transparent)',
//               },
//             }}
//           >
//             <Box
//               component="img"
//               src={account?.user?.coverImage || '/assets-images/default-cover.jpg'}
//               alt="Cover"
//               sx={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//               }}
//             />
//           </Box>

//           <Box sx={{ mt: '-50px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
//             <MotionAvatar
//               src={account?.user?.profileImage || '/assets-images/client-logo3.png'}
//               alt="user photo"
//               sx={{
//                 width: 100,
//                 height: 100,
//                 border: '4px solid #21210b',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
//               }}
//               variants={avatarVariants}
//               initial="hidden"
//               animate="visible"
//               transition={{ duration: 0.5, delay: 0.2 }}
//             />
//             <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
//               {account?.user?.name || 'User'}
//             </Typography>
//             <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
//               {`${account.walletAddressContect.slice(0, 6)}...${account.walletAddressContect.slice(-4)}`}
//             </Typography>
//           </Box>

//           <Divider sx={{ my: 3, bgcolor: 'rgba(246, 246, 246, 0.2)' }} />

//           <List sx={{ flexGrow: 1, px: 2 }}>
//             <CustomListItem href="/author" icon={ImProfile} text="Profile" />
//             <CustomListItem href="/launchpad-list" icon={MdLaunch} text="My Launchpad" />
//             <CustomListItem icon={IoLogOut} text="Logout" onClick={logout} />
//           </List>

//           <Box sx={{ p: 2, mt: 'auto' }}>
//             <MusicPlayer />
//           </Box>
//         </MotionBox>
//       </Drawer>
//     </Fragment>
//   );
// }

{
    /* <Image
src="/auth-images/verified.png"
alt="Verified"
style={{
    marginRight: "5px",
}}
width={20}
height={20}
/> */
}

import React, { Fragment, useEffect, useState, useRef } from "react";
import {
    Avatar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Slider,
    Paper,
    CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { ImProfile } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import { MdLaunch } from "react-icons/md";
import {
    FaPlay,
    FaPause,
    FaStepForward,
    FaStepBackward,
    FaVolumeMute,
    FaVolumeUp,
    FaRandom,
    FaRedoAlt,
} from "react-icons/fa";
import { useAccountContext } from "src/contexts";
import { useWalletConnectClient } from "src/contexts/WalletConnectContext";
import userService from "src/services/user.service";
import { motion } from "framer-motion";
import MusicWaveEffect from "./MusicWaveEffect";
import { MdVerified } from "react-icons/md";
import axios from "axios";
import musicService from "src/services/music.service";
import { useAudioPlayer } from "src/contexts/AudioPlayerContext";
import { useUI } from 'src/contexts/UIContext';

const sideNavWidth = 280;

const MotionListItem = motion(ListItem);
const MotionAvatar = motion(Avatar);
const MotionBox = motion(Box);

const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: {
        scale: 1.05,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transition: { duration: 0.2 },
    },
};

const avatarVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: { scale: 1, opacity: 1, y: 0 },
};

const CustomListItem = ({ href, icon: Icon, text, onClick }) => (
    <Link href={href || "#"} passHref>
        <MotionListItem
            button
            component="a"
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            sx={{
                mb: 2,
                borderRadius: "12px",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                    transform: "translateX(-100%)",
                    transition: "transform 0.3s ease-out",
                },
                "&:hover::before": {
                    transform: "translateX(100%)",
                },
                "&:hover": {
                    color: "#b2b500",
                },
            }}
        >
            <ListItemIcon>
                <Icon color="#f6f6f6" size={24} />
            </ListItemIcon>
            <ListItemText
                primary={text}
                primaryTypographyProps={{
                    fontSize: "1.2rem",
                    fontWeight: "medium",
                }}
            />
        </MotionListItem>
    </Link>
);
const playlist = [
    {
        id: 1,
        title: "Sunflower",
        artist: "Post Malone, Swae Lee",
        duration: 180,
        cover: "/audio/spiderman.jpeg",
        file: "/audio/song1.mp3",
    },
    {
        id: 2,
        title: "Shape-of-You",
        artist: "Ed Sheeran",
        duration: 210,
        cover: "/audio/Shape-of-You.jpg",
        file: "/audio/song2.mp3",
    },
    {
        id: 3,
        title: "Give Me Everything",
        artist: "Pitbull",
        duration: 195,
        cover: "/audio/tonight-pitbull.jpeg",
        file: "/audio/song3.mp3",
    },
];

// const MusicPlayer = ({ setIsPlaying, isPlaying }) => {
//     // const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//     const [volume, setVolume] = useState(1);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isLooping, setIsLooping] = useState(false);

//     const audioRef = useRef(null);
//     const currentTrack = playlist[currentTrackIndex];

//     const formatTime = (time) => {
//         const minutes = Math.floor(time / 60);
//         const seconds = Math.floor(time % 60);
//         return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//     };

//     const handlePlayPause = () => {
//         if (isPlaying) {
//             audioRef.current.pause();
//         } else {
//             audioRef.current.play();
//         }
//         setIsPlaying(!isPlaying);
//     };

//     const handlePrevious = () => {
//         setCurrentTrackIndex((prevIndex) =>
//             prevIndex > 0 ? prevIndex - 1 : playlist.length - 1
//         );
//     };

//     const handleNext = () => {
//         setCurrentTrackIndex((prevIndex) =>
//             prevIndex < playlist.length - 1 ? prevIndex + 1 : 0
//         );
//     };

//     const handleVolumeChange = (event, newValue) => {
//         // Ensure that newValue is a valid finite number
//         if (typeof newValue === "number" && isFinite(newValue)) {
//             setVolume(newValue);
//             audioRef.current.volume = newValue;
//             setIsMuted(newValue === 0);
//         } else {
//             console.error("Invalid volume value:", newValue);
//         }
//     };

//     const toggleMute = () => {
//         setIsMuted(!isMuted);
//         audioRef.current.volume = isMuted ? volume : 0;
//     };

//     const handleTimeUpdate = () => {
//         setCurrentTime(audioRef.current.currentTime);
//     };

//     const handleSeek = (event, newValue) => {
//         audioRef.current.currentTime = newValue;
//         setCurrentTime(newValue);
//     };

//     const toggleLoop = () => {
//         setIsLooping(!isLooping);
//         audioRef.current.loop = !isLooping;
//     };

//     useEffect(() => {
//         audioRef.current.src = currentTrack.file;
//         if (isPlaying) {
//             audioRef.current.play();
//         }
//         setIsPlaying(isPlaying);
//     }, [currentTrackIndex, isPlaying]);

//     const ControlButton = ({ icon: Icon, onClick, isActive = false }) => (
//         <IconButton
//             sx={{
//                 color: "white",
//                 padding: "4px",
//                 "&:hover": {
//                     backgroundColor: "rgba(255, 255, 255, 0.1)",
//                 },
//                 transition: "all 0.3s ease",
//             }}
//             onClick={onClick}
//         >
//             <Icon color={isActive ? "#b2b500" : "white"} size={16} />
//         </IconButton>
//     );

//     return (
//         <Paper
//             elevation={3}
//             sx={{
//                 p: 1,
//                 borderRadius: "12px",
//                 background: "linear-gradient(45deg, #1e1e1e, #2a2a2a)",
//                 color: "white",
//                 width: "100%",
//                 maxWidth: "300px",
//             }}
//         >
//             <Box
//                 sx={{
//                     width: "100%",
//                     height: "200px", // Adjusted for better visibility
//                     position: "relative",
//                     overflow: "hidden",
//                     borderRadius: "8px",
//                     mb: 1,
//                 }}
//             >
//                 <Box
//                     component="img"
//                     src={currentTrack.cover}
//                     alt={`${currentTrack.title} cover`}
//                     sx={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                     }}
//                 />
//             </Box>
//             <Typography
//                 variant="subtitle2"
//                 noWrap
//                 sx={{ fontWeight: "bold", mb: 0.5 }}
//             >
//                 {currentTrack.title}
//             </Typography>
//             <Typography
//                 variant="caption"
//                 noWrap
//                 sx={{ mb: 1, opacity: 0.8, display: "block" }}
//             >
//                 {currentTrack.artist}
//             </Typography>

//             <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                 <Typography variant="caption" sx={{ mr: 1 }}>
//                     {formatTime(currentTime)}
//                 </Typography>
//                 <Slider
//                     size="small"
//                     value={currentTime}
//                     max={currentTrack.duration}
//                     onChange={handleSeek}
//                     sx={{
//                         color: "#b2b500",
//                         flexGrow: 1,
//                         mx: 1,
//                         "& .MuiSlider-thumb": {
//                             width: 8,
//                             height: 8,
//                         },
//                     }}
//                 />
//                 <Typography variant="caption" sx={{ ml: 1 }}>
//                     {formatTime(currentTrack.duration)}
//                 </Typography>
//             </Box>

//             <Box
//                 sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                 }}
//             >
//                 <Box sx={{ display: "flex" }}>
//                     <ControlButton
//                         icon={FaStepBackward}
//                         onClick={handlePrevious}
//                     />
//                     <IconButton
//                         sx={{
//                             color: "white",
//                             mx: 1,
//                             width: 32,
//                             height: 32,
//                             backgroundColor: "#b2b500",
//                             "&:hover": {
//                                 backgroundColor: "#1ed760",
//                             },
//                         }}
//                         onClick={handlePlayPause}
//                     >
//                         {isPlaying ? (
//                             <FaPause size={16} />
//                         ) : (
//                             <FaPlay size={16} />
//                         )}
//                     </IconButton>
//                     <ControlButton icon={FaStepForward} onClick={handleNext} />
//                 </Box>
//                 {/* <Box sx={{ display: 'flex' }}>
//             <ControlButton icon={FaRedoAlt} onClick={toggleLoop} isActive={isLooping} />
//           </Box> */}
//             </Box>

//             <Box
//                 sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     mt: 1,
//                     overflow: "hidden", // Prevent overflow
//                     width: "100%", // Ensure it doesn't cause horizontal scrolling
//                 }}
//             >
//                 <ControlButton
//                     icon={isMuted ? FaVolumeMute : FaVolumeUp}
//                     onClick={toggleMute}
//                 />
//                 {/* <Slider
//     size="small"
//     value={isMuted ? 0 : volume}
//     min={0}
//     max={1}
//     step={0.1}
//     onChange={handleVolumeChange}
//     sx={{
//       color: '#1db954',
//       flexGrow: 1,
//       ml: 1,
//       '& .MuiSlider-thumb': {
//         width: 6, // Reduced thumb size
//         height: 6, // Reduced thumb size
//       },
//       '& .MuiSlider-rail, .MuiSlider-track': {
//         height: 4, // Reduced slider height
//       },
//     }}
//   /> */}
//             </Box>

//             <audio
//                 ref={audioRef}
//                 onTimeUpdate={handleTimeUpdate}
//                 onEnded={handleNext}
//             />
//         </Paper>
//     );
// };

const MusicPlayer = ({ setGlobalIsPlaying }) => {
    const {
        isPlaying,
        tracks,
        currentTrackIndex,
        currentTime,
        duration,
        isMuted,
        handlePlayPause,
        handlePrevious,
        handleNext,
        handleSeek,
        toggleMute,
    } = useAudioPlayer();

    // Sync global playing state with context
    useEffect(() => {
        setGlobalIsPlaying(isPlaying);
    }, [isPlaying, setGlobalIsPlaying]);

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const ControlButton = ({ icon: Icon, onClick, isActive = false }) => (
        <IconButton
            sx={{
                color: "white",
                padding: "4px",
                "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                transition: "all 0.3s ease",
            }}
            onClick={onClick}
        >
            <Icon color={isActive ? "#b2b500" : "white"} size={16} />
        </IconButton>
    );

    if (!tracks.length) {
        return (
            <Paper
                elevation={3}
                sx={{
                    p: 1,
                    borderRadius: "12px",
                    background: "linear-gradient(45deg, #1e1e1e, #2a2a2a)",
                    color: "white",
                    width: "100%",
                    maxWidth: "300px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "200px",
                    }}
                >
                    <Typography>No music tracks available</Typography>
                </Box>
            </Paper>
        );
    }

    const currentTrack = tracks[currentTrackIndex];

    return (
        <Paper
            elevation={3}
            sx={{
                p: 1,
                borderRadius: "12px",
                background: "linear-gradient(45deg, #1e1e1e, #2a2a2a)",
                color: "white",
                width: "100%",
                maxWidth: "300px",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "200px",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "8px",
                    mb: 1,
                }}
            >
                <Box
                    component="img"
                    src={currentTrack?.coverUrl || "/assets-images/default-cover.jpg"}
                    alt={`${currentTrack?.title} cover`}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                        },
                    }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets-images/default-cover.jpg";
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "50%",
                        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                        pointerEvents: "none",
                    }}
                />
            </Box>

            <Typography variant="subtitle2" noWrap sx={{ fontWeight: "bold", mb: 0.5 }}>
                {currentTrack?.title || "No Track Selected"}
            </Typography>
            <Typography variant="caption" noWrap sx={{ mb: 1, opacity: 0.8, display: "block" }}>
                {currentTrack?.artist || "Unknown Artist"}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="caption" sx={{ mr: 1 }}>
                    {formatTime(currentTime)}
                </Typography>
                <Slider
                    size="small"
                    value={currentTime}
                    max={duration || 100}
                    onChange={(_, newValue) => handleSeek(newValue)}
                    sx={{
                        color: "#b2b500",
                        flexGrow: 1,
                        mx: 1,
                        "& .MuiSlider-thumb": {
                            width: 8,
                            height: 8,
                        },
                    }}
                />
                <Typography variant="caption" sx={{ ml: 1 }}>
                    {formatTime(duration)}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex" }}>
                    <ControlButton icon={FaStepBackward} onClick={handlePrevious} />
                    <IconButton
                        sx={{
                            color: "white",
                            mx: 1,
                            width: 32,
                            height: 32,
                            backgroundColor: "#b2b500",
                            "&:hover": {
                                backgroundColor: "#1ed760",
                            },
                        }}
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                    </IconButton>
                    <ControlButton icon={FaStepForward} onClick={handleNext} />
                </Box>
            </Box>

            <Box sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
                overflow: "hidden",
                width: "100%",
            }}>
                <ControlButton
                    icon={isMuted ? FaVolumeMute : FaVolumeUp}
                    onClick={toggleMute}
                />
            </Box>
        </Paper>
    );
};
export default function ProfileBar({ container }) {
    const { isPanelOpen, setIsPanelOpen } = useUI();
    const [panelOpen, setPanelOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const account = useAccountContext();
    const { disconnect } = useWalletConnectClient();
    const isVerified = account?.user?.verified || false; // You'll need to get this from your user data

    // const handleDrawerToggle = () => setPanelOpen(!panelOpen);
    const handleDrawerToggle = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const logout = async () => {
        const response = await userService.logout();
        console.log(response, "response");
        account.logoutWalletConnect();
        await disconnect();
    };

    const getUser = async () => {
        const response = await userService.getUserInit();
        if (response?.data?.status === "success") {
            localStorage.setItem("token", response?.data?.token);
            await account.authWalletConnect(response?.data?.data.walletAddress);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {isPlaying && (
                    <MusicWaveEffect
                        isPlaying={isPlaying}
                        onClick={handleDrawerToggle}
                    />
                )}
                <Box sx={{ position: "relative" }}>
                    <IconButton onClick={handleDrawerToggle}>
                        <Avatar
                            src={account?.user?.profileImage || ""}
                            alt="user photo"
                            sx={{
                                cursor: "pointer",
                                width: 42,
                                height: 42,
                                border: isVerified
                                    ? "2px solid #b2b500"
                                    : "none",
                            }}
                        />
                    </IconButton>
                    {isVerified && (
                        <MdVerified
                            size={16}
                            color="#b2b500"
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                backgroundColor: "#21210b",
                                borderRadius: "50%",
                            }}
                        />
                    )}
                </Box>
            </Box>

            <Drawer
                container={container}
                variant="temporary"
                anchor="right"
                // open={panelOpen}
                open={isPanelOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: sideNavWidth,
                        background: "#21210b",
                        color: "#f6f6f6",
                        boxShadow: "0 0 15px rgba(0,0,0,0.5)",
                    },
                }}
            >
                <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            height: "200px",
                            position: "relative",
                            overflow: "hidden",
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "50%",
                                background:
                                    "linear-gradient(to top, #21210b, transparent)",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src={
                                account?.user?.coverImage ||
                                "/assets-images/NoDATA/Designer1.jpeg"
                            }
                            alt="Cover"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            mt: "-50px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            zIndex: 1,
                        }}
                    >
                        <Box sx={{ position: "relative" }}>
                            <MotionAvatar
                                src={account?.user?.profileImage || ""}
                                alt="user photo"
                                sx={{
                                    width: 100,
                                    height: 100,
                                    border: isVerified
                                        ? "4px solid #b2b500"
                                        : "4px solid #21210b",
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                                }}
                                variants={avatarVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.5, delay: 0.2 }}
                            />
                            {isVerified && (
                                <MdVerified
                                    size={24}
                                    color="#b2b500"
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: "#21210b",
                                        borderRadius: "50%",
                                        padding: "2px",
                                    }}
                                />
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 2,
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{ fontWeight: "bold" }}
                            >
                                {account?.user?.name || "User"}
                            </Typography>
                            {isVerified && (
                                <MdVerified
                                    size={24}
                                    color="#b2b500"
                                    style={{ marginLeft: "8px" }}
                                />
                            )}
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{ mt: 1, opacity: 0.8, fontSize: "1.5rem" }}
                        >
                            {`${account?.walletAddressContect?.slice(
                                0,
                                8
                            )}...${account?.walletAddressContect?.slice(-4)}`}
                        </Typography>
                    </Box>

                    <Divider
                        sx={{ my: 3, bgcolor: "rgba(246, 246, 246, 0.2)" }}
                    />

                    <List sx={{ flexGrow: 1, px: 2 }}>
                        <CustomListItem
                            href="/author"
                            icon={ImProfile}
                            text="Profile"
                        />
                        <CustomListItem
                            href="/launchpad-list"
                            icon={MdLaunch}
                            text="My Launchpad"
                        />
                        <CustomListItem
                            icon={IoLogOut}
                            text="Logout"
                            onClick={logout}
                        />
                    </List>

                    <Box sx={{ p: 2, mt: "auto" }}>
                        <MusicPlayer
                            setGlobalIsPlaying={setIsPlaying}
                            globalIsPlaying={isPlaying}
                        />
                    </Box>
                </MotionBox>
            </Drawer>
        </Fragment>
    );
}
