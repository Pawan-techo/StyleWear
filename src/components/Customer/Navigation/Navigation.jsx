import Logo from "../../../assets/Logo.png";
import { Fragment, useEffect, useState } from "react";
import navigation from "./NavigationData";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SignInSignUpModal from "../../Auth/SignInSignUpModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../state/Auth/Action";
import { getCart } from "../../../state/Cart/Action";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleCategoryClick = (category, section, item) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    setOpen(false);
  };

  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state)=>state.cart);
  const [openModal, setOpenModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);
 
  useEffect(() => {
    if (auth.user) {
      handleClose();
      setOpenModal(false);
    }
    
  }, [auth.user]);

  const handleCartClick = () => {
    if (auth.user) {
      window.location.href = "/cart";
    } else {
      setOpenModal(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
     window.location.href = "/";
  };
  const handleOrderHistory =()=>{
     if (auth.user) {
      window.location.href = "/orders/history";
    } 
  }
  useEffect(()=>{
    if(auth.jwt){
      dispatch(getCart());
    }
  },[auth.jwt])
  return (
    <div className="bg-white">
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <p
                                onClick={() =>
                                  handleCategoryClick(category, section, item)
                                }
                                className="cursor-pointer -m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <p className="text-gray-700 font-medium">Account</p>
              <ul className="space-y-4">
                {jwt ? (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          setOpen(false);
                          navigate("/account/profile");
                        }}
                        className="w-full text-left text-gray-700 hover:text-gray-900"
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setOpen(false);
                          handleOrderHistory();
                        }}
                        className="w-full text-left text-gray-700 hover:text-gray-900"
                      >
                        Orders
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left text-gray-700 hover:text-gray-900"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      {!jwt && (
                        <button
                          onClick={() => {
                            setOpenModal(true);
                          }}
                          className="ml-auto relative inline-flex items-center px-5 py-2 text-sm font-semibold 
               text-gray-700 hover:text-white hover:bg-indigo-500 border border-gray-300 
               rounded overflow-hidden transition-all duration-300 group cursor-pointer lg:hidden"
                        >
                          Sign in / Sign up
                        </button>
                      )}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="relative overflow-hidden bg-gray-800 to-pink-600">
          <span
            className="block whitespace-nowrap text-white text-sm sm:text-base font-semibold py-2 px-4 animate-marquee"
            style={{
              animation: "marquee 30s linear infinite",
            }}
          >
            🎉 Season Sale is Live! Get up to 50% OFF on all fashion categories
            👗👕 | Free Delivery on Orders Over ₹499 🚚 | New Arrivals Every
            Week 🌟 | Shop Now →
          </span>

          <style>
            {`
      @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
    `}
          </style>
        </p>

        <nav aria-label="Top" className=" max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <img alt="logo" src={Logo} className="h-14 w-auto" />
                </a>
              </div>
              <div className="flex flex-1 items-center justify-end lg:hidden">
                <button onClick={handleCartClick} className="relative p-2 mr-2">
                  <ShoppingBagIcon className="h-6 w-6 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                    {cart?.cart?.totalItem}
                  </span>
                </button>
                {auth.user?.firstName ? (
                  <>
                    <IconButton onClick={handleClick} size="small">
                      <Avatar
                        sx={{
                          bgcolor: deepPurple[500],
                          width: 36,
                          height: 36,
                        }}
                      >
                        {auth.user?.firstName[0].toUpperCase()}
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleClose}
                      PaperProps={{
                        elevation: 3,
                        sx: { mt: 1, minWidth: 140 },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          navigate("/account/profile");
                        }}
                      >
                        Profile
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleOrderHistory();
                        }}
                      >
                        Orders
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleLogout();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        navigate("/register");
                      }}
                      className="px-4 py-2 text-sm border rounded text-gray-700 
        hover:bg-indigo-500 hover:text-white transition cursor-pointer"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:text-indigo-600">
                              {category.name}
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600"
                              />
                            </PopoverButton>
                          </div>
                          <PopoverPanel className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                              <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="group relative text-base sm:text-sm"
                                    >
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                      />
                                      <a
                                        href={item.href}
                                        className="mt-6 block font-medium text-gray-900"
                                      >
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0 z-10"
                                        />
                                        {item.name}
                                      </a>
                                      <p aria-hidden="true" className="mt-1">
                                        Shop now
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                  {category.sections.map((section) => (
                                    <div key={section.name}>
                                      <p className="font-medium text-gray-900">
                                        {section.name}
                                      </p>
                                      <ul className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                        {section.items.map((item) => (
                                          <li key={item.name} className="flex">
                                            <p
                                              onClick={() => {
                                                navigate(
                                                  `/${category.id}/${section.id}/${item.id}`
                                                );
                                                close();
                                                setOpen(false);
                                              }}
                                              className="cursor-pointer hover:text-gray-800"
                                            >
                                              {item.name}
                                            </p>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </>
                      )}
                    </Popover>
                  ))}
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {/* Search */}
                <div className="relative flex-1 max-w-md lg:max-w-xs ml-4">
                  <label htmlFor="search" className="sr-only">
                    Search products
                  </label>
                  <div className="relative text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                      placeholder="Search for products..."
                      type="search"
                    />
                  </div>
                </div>
                <div className="ml-2 flow-root lg:ml-1">
                  <a
                    onClick={handleCartClick}
                    className="cursor-pointer group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-400 group-hover:text-gray-800">
                      {cart?.cart?.totalItem}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>

                {auth.user?.firstName ? (
                  <>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: deepPurple[500],
                            width: 40,
                            height: 40,
                          }}
                        >
                          {auth.user?.firstName[0].toUpperCase()}
                        </Avatar>
                      </IconButton>
                    </Tooltip>

                    <Menu
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleClose}
                      PaperProps={{
                        elevation: 3,
                        sx: { mt: 1.5, minWidth: 150 },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          navigate("/account/profile");
                        }}
                      >
                        Profile
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleOrderHistory();
                        }}
                      >
                        Orders
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleLogout();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        navigate("/register");
                      }}
                      className="relative inline-flex items-center px-5 py-2 mt-1 mr-1 text-sm font-semibold 
             text-gray-700 hover:text-white border border-gray-300 
             rounded overflow-hidden transition-all duration-300 group cursor-pointer"
                    >
                      <span
                        className="absolute inset-0 bg-indigo-500 scale-0 group-hover:scale-100 
                  transition-transform duration-300 origin-center"
                      ></span>
                      <span className="relative z-10">Sign in / Sign up</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <SignInSignUpModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </div>
  );
}
