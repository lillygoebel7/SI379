import './App.css';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';

import mugs from './items/mugs.png';
import pjs from './items/pjs.png';
import slippers from './items/slippers.png';
import blanket from './items/blanket.png';
import candy from './items/candy.png';
import socks from './items/socks.png';

const drawerWidth = 350;

// adds transition to my main cotent
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0, }),
    position: 'relative',
  }),
);

// adds transitions to app bar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

function App() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.quantity * parseFloat(item.price.replace('$', ''));
  }, 0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.label === item.label);
  
    // check if item already in cart
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (itemLabel) => {
    const updatedCartItems = cartItems
      .map((item) => item.label === itemLabel ? { ...item, quantity: item.quantity - 1 } : item )
      // only display items with a quantity of 1+
      .filter((item) => item.quantity > 0);
    setCartItems(updatedCartItems);
  };

  const updateCartItemQuantity = (itemLabel, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => item.label === itemLabel ? { ...item, quantity: newQuantity } : item );
    setCartItems(updatedCartItems);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                Holiday Wishlist
              </Typography>
              <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerOpen} sx={{ ...(open && { display: 'none' }) }}>
              <ShoppingCartIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
            <Main open={open} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }} >
              <DrawerHeader />
              <List>
                {[
                  { image: mugs, label: 'mugs', link: 'https://www.crateandbarrel.com/hudson-holiday-mugs-gift-set-of-4/s445698 ', price: '$24.69' },
                  { image: slippers, label: 'slippers', link: 'https://www.temu.com/ul/kuiper/un9.html?subj=goods-un&_bg_fs=1&_p_jump_id=894&_x_vst_scene=adg&goods_id=601099523176602&sku_id=17592245195793&adg_ctx=a-6868edcb~c-6f8466f2&_x_ads_sub_channel=shopping&_p_rfs=1&_x_ns_prz_type=-1&locale_override=211~en~USD&_x_ns_sku_id=17592245195793&mrk_rec=1&_x_ads_channel=google&_x_gmc_account=647900107&_x_login_type=Google&_x_ads_account=1919904652&_x_ads_set=20640824391&_x_ads_id=155069847592&_x_ads_creative_id=676803986041&_x_ns_source=g&_x_ns_gclid=CjwKCAiA98WrBhAYEiwA2WvhOuFCIHrsA99XfFyhbSs9-9BnfvDs1unAGOYyeRrJZp-WrIjHz2VIvRoCVTgQAvD_BwE&_x_ns_placement=&_x_ns_match_type=&_x_ns_ad_position=&_x_ns_product_id=17592245195793&_x_ns_target=&_x_ns_devicemodel=&_x_ns_wbraid=CjkKCQiA1MCrBhCWARIoADFTolNYeSUjBuDh8oxDiCe-_LtCqkZgQUgxdPOGx03H8DJ67_3xWhoCFmU&_x_ns_gbraid=0AAAAAo4mICFcRfL6VdYoodBv1MrooIEu5&_x_ns_targetid=pla-2258714514443&gad_source=1&gclid=CjwKCAiA98WrBhAYEiwA2WvhOuFCIHrsA99XfFyhbSs9-9BnfvDs1unAGOYyeRrJZp-WrIjHz2VIvRoCVTgQAvD_BwE ', price: '$6.50' },
                  { image: pjs, label: 'pjs', link: 'https://www.target.com/p/cheibear-family-christmas-pajamas-matching-sets-sleepwear-holiday-home-party-pajama-set/-/A-87988104 ', price: '$41.39' },
                  { image: socks, label: 'socks', link: 'https://oldnavy.gap.com/browse/product.do?pid=609246652&vid=1&tid=onpl000078&kwid=1&ap=7&gad_source=1&gclid=CjwKCAiA98WrBhAYEiwA2WvhOplMcwUEO5DpC6fD69STnRS0_vO9QF0Kcy_iLauQT8dahbXVpjZV7hoCuc8QAvD_BwE&gclsrc=aw.ds ', price: '$5.99' },
                  { image: blanket, label: 'blanket', link: 'https://www.homedepot.com/p/Lavish-Home-Oversized-Long-Pile-Chiffon-White-Faux-Fur-Hypoallergenic-Throw-Blanket-66HD-Throw030/309126273', price: '$28.96' },
                  { image: candy, label: 'candy canes', link: 'https://www.target.com/p/holiday-peppermint-candy-canes-12ct-5-7oz-favorite-day-8482/-/A-87940979?region_id=481481&ref=tgt_adv_xsp&AFID=google&fndsrc=tgtao&DFA=71700000108139148&CPNG=PLA_Snacks%2BCandy_Priority%2BShopping%7CSnacks%2BCandy_Ecomm_Food_Bev&adgroup=Snacks%2BCandy_Priority+TCINs&LID=700000001170770pgs&LNM=PRODUCT_GROUP&network=g&device=c&location=9016852&targetid=pla-1681397858631&gad_source=1&gclid=CjwKCAiA98WrBhAYEiwA2WvhOqvsicmkMIvz_lxGQqw0xNr_DV5ZIkmR-5GY6Q6q7oMw1xZv5oq0URoCEIkQAvD_BwE&gclsrc=aw.ds ', price: '$10.00' },
                ].map((item, index) => (
                  <ListItem key={index}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <img src={item.image} alt={item.label} style={{ width: '90px', height: '90px', marginRight: '10px' }} />
                      </AccordionSummary>
                      <AccordionDetails>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body1">Price: {item.price}</Typography>
                          <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 'small' }}> Link </a>
                          <Button onClick={() => addToCart(item)} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                            Add to Cart
                          </Button>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                ))}
              </List>
            </Main>
          <Drawer sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth }}} variant="persistent" anchor="right" open={open} >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
              <Divider />
              <List>
                <Typography variant="h6" paragraph>
                  Cart
                </Typography>
                {cartItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemButton>
                      <img src={item.image} alt={item.label} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                      <ListItemText primary={`${item.label}`} />
                      <ClearIcon variant="outlined" color="primary" onClick={() => removeFromCart(item.label)}>
                        Remove
                      </ClearIcon>
                      <TextField type="number" variant="outlined" size="small"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10) || 0;
                          updateCartItemQuantity(item.label, newQuantity);
                        }}
                        style={{ width: '70px', marginLeft: '10px' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Typography variant="h6" paragraph sx={{ marginLeft: 'auto', marginRight: '16px' }}>
                Total: ${totalPrice.toFixed(2)}
              </Typography>
          </Drawer>
        </Box>
      </header>
    </div>
  );
}

export default App;
