import React from 'react';
import './App.css';
import VMList from "./components/VMList";
import ShutdownButton from "./components/ShutdownButton";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Box, Paper, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Badge, Avatar, InputBase, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ComputerIcon from '@mui/icons-material/Computer';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import StorageIcon from '@mui/icons-material/Storage';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import MemoryIcon from '@mui/icons-material/Memory';
import SpeedIcon from '@mui/icons-material/Speed';

// Creazione di un tema personalizzato ispirato a Joy UI
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0072E5',      // Blu più vivace tipico di Joy UI
      light: '#3399FF',
      dark: '#0059B3',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9C27B0',      // Viola per il secondario
      light: '#BA68C8',
      dark: '#7B1FA2',
    },
    background: {
      default: '#F3F6FD',   // Sfondo leggermente più chiaro e azzurrato
      paper: '#FFFFFF',
    },
    error: {
      main: '#EB0014',
      light: '#FF4D6A',
      dark: '#C70011',
    },
    warning: {
      main: '#F5A623',      // Arancione più vivace
      light: '#FFD07F',
      dark: '#B77516',
    },
    info: {
      main: '#0288d1',
      light: '#5EB8FF',
      dark: '#01579B',
    },
    success: {
      main: '#1DB45A',      // Verde più vivace
      light: '#6AE79C',
      dark: '#147A3D',
    },
    grey: {
      50: '#F8FAFC',
      100: '#EAEFF4',
      200: '#D9E2EC',
      300: '#CBD5E1',
      400: '#9AA5B1',
      500: '#7B8794',
      600: '#616E7C',
      700: '#52606D',
      800: '#3E4C59',
      900: '#323F4B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Public Sans", "Roboto", "Helvetica", "Arial", sans-serif',  // Aggiunto Public Sans, font tipico di Joy UI
    h1: {
      fontSize: '2.5rem',
      fontWeight: 800,       // Più bold per i titoli
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 800,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,       // Bordi più arrotondati come in Joy UI
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,   // Bottoni più arrotondati
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          ':hover': {
            boxShadow: '0px 4px 12px rgba(0, 114, 229, 0.2)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          ':hover': {
            boxShadow: '0px 6px 16px rgba(0, 114, 229, 0.25)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05), 0px 1px 12px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.05)',
          backgroundColor: '#FFFFFF',
          color: '#0072E5',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          marginBottom: 4,
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 114, 229, 0.08)',
            color: '#0072E5',
            '&:hover': {
              backgroundColor: 'rgba(0, 114, 229, 0.12)',
            },
            '& .MuiListItemIcon-root': {
              color: '#0072E5',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.04), 0px 1px 12px rgba(0, 0, 0, 0.06)',
          borderRadius: 16,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const drawerWidth = 280;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Macchine Virtuali', icon: <ComputerIcon />, selected: true },
    { text: 'Storage', icon: <StorageIcon /> },
    { text: 'Rete', icon: <NetworkCheckIcon /> },
    { text: 'Risorse', icon: <MemoryIcon /> },
    { text: 'Prestazioni', icon: <SpeedIcon /> },
    { text: 'Impostazioni', icon: <SettingsIcon /> },
    { text: 'Aiuto', icon: <HelpIcon /> }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Toolbar sx={{ minHeight: '70px', px: { xs: 2, sm: 4 } }}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.main', 
                  width: 42, 
                  height: 42, 
                  mr: 2,
                  boxShadow: '0 4px 12px rgba(0, 114, 229, 0.3)'
                }}
              >
                <ComputerIcon />
              </Avatar>
              <Typography variant="h5" component="div" sx={{ fontWeight: 800, color: 'grey.900', letterSpacing: '-0.01em' }}>
                Hyper-V Manager
              </Typography>
            </Box>
            
            <Box sx={{ flexGrow: 1, ml: 4, display: { xs: 'none', md: 'flex' } }}>
              <Paper
                component="form"
                elevation={0}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: 400, 
                  borderRadius: 3, 
                  px: 2, 
                  py: 0.8, 
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    borderColor: 'rgba(0, 0, 0, 0.12)'
                  },
                  '&:focus-within': {
                    backgroundColor: '#fff',
                    borderColor: 'primary.main',
                    boxShadow: '0 0 0 3px rgba(0, 114, 229, 0.15)'
                  }
                }}
              >
                <SearchIcon sx={{ color: 'grey.500', mr: 1 }} />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Cerca macchine virtuali..."
                  inputProps={{ 'aria-label': 'cerca macchine virtuali' }}
                />
              </Paper>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                color="primary" 
                sx={{ 
                  mr: 1, 
                  bgcolor: 'rgba(0, 114, 229, 0.08)', 
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(0, 114, 229, 0.15)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Badge 
                  badgeContent={4} 
                  color="error"
                  sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <ShutdownButton />
              <Avatar 
                sx={{ 
                  ml: 1.5, 
                  width: 40, 
                  height: 40, 
                  bgcolor: 'primary.light',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  border: '2px solid #fff',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }
                }}
              >
                A
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth, 
              px: 2,
              borderRadius: '0 16px 16px 0',
            },
          }}
        >
          <Toolbar sx={{ minHeight: '70px' }} />
          <Box sx={{ overflow: 'auto', my: 2 }}>
            <Box sx={{ px: 2, mb: 3 }}>
              <Typography variant="subtitle2" color="grey.600" sx={{ mb: 1, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                Menu Principale
              </Typography>
            </Box>
            <List component="nav" sx={{ px: 1 }}>
              {menuItems.map((item, index) => (
                <ListItem 
                  button 
                  key={item.text} 
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index)}
                  sx={{ 
                    mb: 0.8, 
                    py: 1.5,
                    px: 2,
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0, 114, 229, 0.08)',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '20%',
                        height: '60%',
                        width: 4,
                        backgroundColor: 'primary.main',
                        borderRadius: '0 4px 4px 0',
                      }
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 114, 229, 0.05)',
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 40, 
                    color: selectedIndex === index ? 'primary.main' : 'grey.600',
                    transition: 'transform 0.2s',
                    transform: selectedIndex === index ? 'scale(1.2)' : 'scale(1)'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: selectedIndex === index ? 700 : 500,
                      fontSize: '0.95rem',
                    }} 
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth, 
              px: 2,
              borderRadius: '0 16px 16px 0',
              boxShadow: '2px 0 20px rgba(0, 0, 0, 0.04)'
            },
          }}
        >
          <Toolbar sx={{ minHeight: '70px' }} />
          <Box sx={{ overflow: 'auto', my: 2 }}>
            <Box sx={{ px: 2, mb: 3 }}>
              <Typography variant="subtitle2" color="grey.600" sx={{ mb: 1, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                Menu Principale
              </Typography>
            </Box>
            <List component="nav" sx={{ px: 1 }}>
              {menuItems.map((item, index) => (
                <ListItem 
                  button 
                  key={item.text} 
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index)}
                  sx={{ 
                    mb: 0.8, 
                    py: 1.5,
                    px: 2,
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0, 114, 229, 0.08)',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '20%',
                        height: '60%',
                        width: 4,
                        backgroundColor: 'primary.main',
                        borderRadius: '0 4px 4px 0',
                      }
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 114, 229, 0.05)',
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 40, 
                    color: selectedIndex === index ? 'primary.main' : 'grey.600',
                    transition: 'transform 0.2s',
                    transform: selectedIndex === index ? 'scale(1.2)' : 'scale(1)'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: selectedIndex === index ? 700 : 500,
                      fontSize: '0.95rem',
                    }} 
                  />
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ px: 3, mt: 4, mb: 2 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<ComputerIcon />}
                sx={{ 
                  py: 1.5, 
                  borderRadius: 3,
                  backgroundColor: 'primary.main',
                  boxShadow: '0 4px 12px rgba(0, 114, 229, 0.3)',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0, 114, 229, 0.4)'
                  }
                }}
              >
                Nuova VM
              </Button>
            </Box>
          </Box>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
          <Toolbar sx={{ minHeight: '70px' }} />
          <Box sx={{ mb: 4 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2, md: 3 }, 
                mb: 4, 
                borderRadius: 4,
                background: 'linear-gradient(120deg, #E1F0FF 0%, #F3F6FD 100%)',
                border: '1px solid rgba(0, 114, 229, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    width: 48, 
                    height: 48, 
                    mr: 2,
                    boxShadow: '0 4px 12px rgba(0, 114, 229, 0.3)'
                  }}
                >
                  <DashboardIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, color: 'grey.900', mb: 0.5 }}>
                    Dashboard Macchine Virtuali
                  </Typography>
                  <Typography variant="body1" color="grey.600">
                    Gestisci e monitora tutte le tue macchine virtuali Hyper-V
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <VMList />
          </Box>
          
          <Box component="footer" sx={{ p: 2, mt: 'auto', textAlign: 'center' }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Hyper-V Manager
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
